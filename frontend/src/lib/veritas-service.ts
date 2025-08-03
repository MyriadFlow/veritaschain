import { Wallet } from "@massalabs/wallet-provider";
import { Args, OperationStatus, Mas } from "@massalabs/massa-web3";
import { getWallets } from "@massalabs/wallet-provider";
import { Article as ArticleType, Author } from "./types";

// Real contract addresses on Massa blockchain - will be set when contracts are deployed
export const CONTRACTS = {
  ARTICLE_REGISTRY: process.env.NEXT_PUBLIC_ARTICLE_REGISTRY_ADDRESS || "",
  REPUTATION_SYSTEM: process.env.NEXT_PUBLIC_REPUTATION_SYSTEM_ADDRESS || "",
  PAYMENT_GATEWAY: process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_ADDRESS || "",
};

export interface Article {
  id: string;
  title: string;
  contentHash: string;
  author: string;
  price: number;
  timestamp: number;
  upvotes: number;
  downvotes: number;
  status: "pending" | "verified" | "rejected";
  excerpt?: string;
  voteCount?: number;
  publishedAt?: number;
  // Additional fields for full article display
  content?: string;
  coverImage?: string;
  subtitle?: string;
  category?: string;
  tags?: string[];
}

export interface JournalistStats {
  reputation: number;
  articlesPublished: number;
  totalEarnings: string;
  followers: number;
  verificationRate: number;
}

export class VeritasChainService {
  private wallet: Wallet | null = null;

  constructor() {
    console.log(
      "VeritasChain Service initialized with real blockchain integration"
    );
  }

  setWallet(wallet: Wallet) {
    this.wallet = wallet;
    console.log("Wallet connected to VeritasChain service");
  }

  async getWalletBalance(): Promise<string> {
    if (!this.wallet) {
      throw new Error("Wallet not connected");
    }

    try {
      const accounts = await this.wallet.accounts();
      if (!accounts.length) {
        throw new Error("No accounts available");
      }

      const account = accounts[0];
      const balance = await account.balance(true); // true for final balance
      const balanceInMas = parseFloat(balance.toString()) / 1e9;

      return balanceInMas.toFixed(4);
    } catch (error) {
      console.error("Error getting wallet balance:", error);
      throw new Error("Failed to get wallet balance");
    }
  }

  async testWalletConnection(): Promise<string> {
    if (!this.wallet) {
      throw new Error("Wallet not connected");
    }

    try {
      const accounts = await this.wallet.accounts();
      if (!accounts.length) {
        throw new Error("No accounts available in wallet");
      }

      const provider = accounts[0];
      const walletAddress = await provider.address;

      console.log("Wallet test successful:");
      console.log("- Address:", walletAddress);
      console.log("- Network:", process.env.NEXT_PUBLIC_MASSA_NODE_URL);
      console.log(
        "- Contracts available:",
        Object.keys(CONTRACTS).filter(
          (key) => CONTRACTS[key as keyof typeof CONTRACTS]
        )
      );

      return walletAddress;
    } catch (error) {
      console.error("Wallet connection test failed:", error);
      throw error;
    }
  }

  async getJournalistStats(address: string): Promise<JournalistStats> {
    if (!CONTRACTS.REPUTATION_SYSTEM || !CONTRACTS.ARTICLE_REGISTRY) {
      throw new Error(
        "Contracts not deployed. Please deploy smart contracts first."
      );
    }

    if (!this.wallet) {
      throw new Error("Wallet not connected");
    }

    try {
      console.log("Fetching journalist stats from blockchain for:", address);

      // Get wallet accounts
      const accounts = await this.wallet.accounts();
      if (!accounts.length) {
        throw new Error("No accounts available in wallet");
      }

      const account = accounts[0];

      // Get reputation and verification rate from ReputationSystem
      try {
        const reputationResult = await account.readSC({
          target: CONTRACTS.REPUTATION_SYSTEM,
          func: "getJournalistStats",
          parameter: new Args().addString(address),
        });

        console.log("Raw reputation result:", reputationResult);

        // Parse the result from reputation contract
        const reputationArgs = new Args(reputationResult.value);
        const reputation = reputationArgs.nextString();
        reputationArgs.nextString(); // Skip articlesPublished from reputation contract (will be 0)
        const totalEarnings = reputationArgs.nextString();
        const followers = reputationArgs.nextString();
        const verificationRate = reputationArgs.nextString();

        // Get actual article count from ArticleRegistry
        let actualArticlesPublished = "0";
        try {
          const articlesResult = await account.readSC({
            target: CONTRACTS.ARTICLE_REGISTRY,
            func: "getArticlesByAuthor",
            parameter: new Args().addString(address),
          });

          const articlesArgs = new Args(articlesResult.value);
          const articleIdsString = articlesArgs.nextString();

          // Count the actual articles
          if (articleIdsString && articleIdsString.trim() !== "") {
            const articleIds = articleIdsString
              .split(",")
              .filter((id) => id.trim() !== "");
            actualArticlesPublished = articleIds.length.toString();
          }
        } catch (articlesError) {
          console.warn("Failed to get article count, using 0:", articlesError);
        }

        console.log("Parsed values:", {
          reputation,
          articlesPublished: actualArticlesPublished,
          totalEarnings,
          followers,
          verificationRate,
        });

        return {
          reputation: Number(reputation),
          articlesPublished: Number(actualArticlesPublished),
          totalEarnings,
          followers: Number(followers),
          verificationRate: Number(verificationRate),
        };
      } catch (bcError) {
        console.error(
          "Blockchain call failed for getJournalistStats:",
          bcError
        );
        console.error("Error details:", {
          contractAddress: CONTRACTS.REPUTATION_SYSTEM,
          function: "getJournalistStats",
          parameter: address,
          error: bcError,
        });

        // Don't return fake data - let the UI handle the no-data case
        throw new Error("No journalist data found on blockchain");
      }
    } catch (error) {
      console.error("Error fetching journalist stats from blockchain:", error);
      throw new Error(
        "Failed to fetch journalist statistics from blockchain. Make sure contracts are deployed."
      );
    }
  }

  async getArticlesByAuthor(authorAddress: string): Promise<Article[]> {
    if (!CONTRACTS.ARTICLE_REGISTRY) {
      throw new Error(
        "Article registry contract not deployed. Please deploy smart contracts first."
      );
    }

    if (!this.wallet) {
      throw new Error("Wallet not connected");
    }

    try {
      console.log(
        "Fetching articles from blockchain for author:",
        authorAddress
      );

      // Get wallet accounts
      const accounts = await this.wallet.accounts();
      if (!accounts.length) {
        throw new Error("No accounts available in wallet");
      }

      const account = accounts[0];

      // Make blockchain read call using the account directly
      const result = await account.readSC({
        target: CONTRACTS.ARTICLE_REGISTRY,
        func: "getArticlesByAuthor",
        parameter: new Args().addString(authorAddress),
      });

      // Parse the result from smart contract - it returns a comma-separated string of article IDs
      const resultArgs = new Args(result.value);
      const articleIdsString = resultArgs.nextString();

      console.log("Article IDs string from contract:", articleIdsString);

      // If no articles, return empty array
      if (!articleIdsString || articleIdsString.trim() === "") {
        console.log("No articles found for author");
        return [];
      }

      // Split the comma-separated string into individual article IDs
      const articleIds = articleIdsString
        .split(",")
        .filter((id) => id.trim() !== "");
      const articles: Article[] = [];

      // For each article ID, fetch the full article data
      for (const articleId of articleIds) {
        try {
          const articleResult = await account.readSC({
            target: CONTRACTS.ARTICLE_REGISTRY,
            func: "getArticle",
            parameter: new Args().addString(articleId.trim()),
          });

          const articleResultArgs = new Args(articleResult.value);
          const articleDataString = articleResultArgs.nextString();

          // Parse the pipe-separated article data
          // Format: id|authorAddress|title|description|ipfsContentHash|publicationTimestamp|lastUpdatedTimestamp|currentVersionHash|previousVersionHash|status|monetizationModel|price|totalViews|totalUpvotes|totalDownvotes
          const parts = articleDataString.split("|");

          if (parts.length >= 15) {
            const id = parts[0];
            const author = parts[1];
            const title = parts[2];
            const description = parts[3];
            const contentHash = parts[4];
            const publicationTimestamp = parseInt(parts[5]);
            // const lastUpdatedTimestamp = parseInt(parts[6]); // Unused for now
            // const currentVersionHash = parts[7]; // Unused for now
            // const previousVersionHash = parts[8]; // Unused for now
            const status = parts[9] as "pending" | "verified" | "rejected";
            // const monetizationModel = parts[10]; // Unused for now
            const price = parseInt(parts[11]);
            // const totalViews = parseInt(parts[12]); // Unused for now
            const upvotes = parseInt(parts[13]);
            const downvotes = parseInt(parts[14]);

            // Fetch content from IPFS for excerpt
            let excerpt = description || title;
            try {
              const ipfsResponse = await fetch(
                `https://gateway.pinata.cloud/ipfs/${contentHash}`
              );
              if (ipfsResponse.ok) {
                const ipfsData = await ipfsResponse.json();
                const content = ipfsData.content || "";
                excerpt =
                  content.length > 150
                    ? content.substring(0, 150) + "..."
                    : content || description || title;
              }
            } catch (ipfsError) {
              console.warn("Failed to fetch IPFS content:", ipfsError);
            }

            articles.push({
              id,
              title,
              contentHash,
              author,
              price: price / 100,
              timestamp: publicationTimestamp,
              upvotes,
              downvotes,
              status,
              excerpt,
              voteCount: upvotes + downvotes,
              publishedAt: publicationTimestamp,
            });
          }
        } catch (articleError) {
          console.warn(`Failed to fetch article ${articleId}:`, articleError);
        }
      }

      console.log("Articles fetched from blockchain:", articles);
      return articles;
    } catch (error) {
      console.error("Error fetching articles from blockchain:", error);
      throw new Error(
        "Failed to fetch articles from blockchain. Make sure contracts are deployed."
      );
    }
  }

  async getAllPublishedArticles(): Promise<ArticleType[]> {
    try {
      console.log("Fetching all published articles from blockchain");

      if (!CONTRACTS.ARTICLE_REGISTRY) {
        console.warn(
          "Article registry contract not deployed, returning empty array"
        );
        return [];
      }

      // Create a read-only connection using getWallets
      const wallets = await getWallets();

      if (!wallets || wallets.length === 0) {
        console.warn("No wallet providers available, returning empty array");
        return [];
      }

      const provider = wallets[0];
      const accounts = await provider.accounts();

      if (!accounts.length) {
        console.warn("No accounts available, returning empty array");
        return [];
      }

      const account = accounts[0];

      // First, get all published article IDs from the smart contract
      const articleCountResult = await account.readSC({
        target: CONTRACTS.ARTICLE_REGISTRY,
        func: "getArticleCount",
        parameter: new Args(),
      });

      const articleCountArgs = new Args(articleCountResult.value);
      const totalArticles = articleCountArgs.nextU64();

      const articles: ArticleType[] = [];

      // Iterate through all articles and fetch their details
      for (let i = 0; i < Number(totalArticles); i++) {
        try {
          const articleIdResult = await account.readSC({
            target: CONTRACTS.ARTICLE_REGISTRY,
            func: "getArticleByIndex",
            parameter: new Args().addU64(BigInt(i)),
          });

          const articleIdArgs = new Args(articleIdResult.value);
          const articleId = articleIdArgs.nextString();

          // Get the full article details
          const article = await this.getArticleById(articleId);
          if (article) {
            articles.push(article);
          }
        } catch (articleError) {
          console.warn(`Failed to fetch article at index ${i}:`, articleError);
        }
      }

      console.log(
        `Fetched ${articles.length} published articles from blockchain`
      );
      return articles;
    } catch (error) {
      console.error("Error fetching all published articles:", error);
      return []; // Return empty array instead of throwing error for generateStaticParams
    }
  }

  async getArticleById(articleId: string): Promise<ArticleType | null> {
    try {
      console.log("Fetching article from blockchain:", articleId);

      if (!CONTRACTS.ARTICLE_REGISTRY) {
        console.warn("Article registry contract not deployed, using mock data");
        return null;
      }

      // Create a read-only connection using getWallets
      const wallets = await getWallets();

      if (!wallets || wallets.length === 0) {
        console.warn("No wallet providers available, using mock data");
        return null;
      }

      const provider = wallets[0];
      const accounts = await provider.accounts();

      if (!accounts.length) {
        console.warn("No accounts available, using mock data");
        return null;
      }

      const account = accounts[0];

      const articleResult = await account.readSC({
        target: CONTRACTS.ARTICLE_REGISTRY,
        func: "getArticle",
        parameter: new Args().addString(articleId.trim()),
      });
      const articleResultArgs = new Args(articleResult.value);
      const articleDataString = articleResultArgs.nextString();

      // Parse the pipe-separated article data
      const parts = articleDataString.split("|");

      if (parts.length >= 15) {
        const id = parts[0];
        const author = parts[1];
        const title = parts[2];
        const description = parts[3];
        const contentHash = parts[4];
        const publicationTimestamp = parseInt(parts[5]);
        const status = parts[9] as "pending" | "verified" | "rejected";
        const price = parseInt(parts[11]);
        const upvotes = parseInt(parts[13]);
        const downvotes = parseInt(parts[14]);

        // Fetch full content from IPFS
        let content = description || title;
        let coverImage = "";
        let subtitle = "";
        let category = "";
        let tags: string[] = [];

        try {
          const ipfsResponse = await fetch(
            `https://gateway.pinata.cloud/ipfs/${contentHash}`
          );
          if (ipfsResponse.ok) {
            const ipfsData = await ipfsResponse.json();
            content = ipfsData.content || content;
            coverImage = ipfsData.coverImage || "";
            subtitle = ipfsData.subtitle || "";
            category = ipfsData.category || "";
            tags = ipfsData.tags || [];
          }
        } catch (ipfsError) {
          console.warn("Failed to fetch IPFS content:", ipfsError);
        }

        // Create author object
        const authorObj: Author = {
          id: author,
          name: author,
          bio: "Journalist on VeritasChain",
          avatar: "/images/default-avatar.png",
          reputation: upvotes - downvotes,
          articlesPublished: 1,
          totalVotes: upvotes + downvotes,
          joinedDate: new Date(publicationTimestamp * 1000).toISOString(),
          walletAddress: author,
          verified: status === "verified",
        };

        return {
          id,
          title,
          subtitle: subtitle || description,
          content,
          excerpt:
            content.length > 150 ? content.substring(0, 150) + "..." : content,
          coverImage: coverImage || "/images/default-article.png",
          author: authorObj,
          publishedAt: new Date(publicationTimestamp * 1000).toISOString(),
          updatedAt: new Date(publicationTimestamp * 1000).toISOString(),
          readTime: Math.ceil(content.length / 200), // Estimate reading time
          category: category || "News",
          tags: tags,
          verificationScore: status === "verified" ? 100 : 0,
          voteCount: upvotes + downvotes,
          upvotes,
          downvotes,
          status:
            status === "verified"
              ? "verified"
              : status === "rejected"
              ? "under_review"
              : "published",
          premium: price > 0,
          price: price / 100,
          chapters: [], // No chapters for now
          stakingAmount: 0, // Default staking amount
          ipfsHash: contentHash,
          transactionHash: articleId,
        };
      }

      return null;
    } catch (error) {
      console.error("Error fetching article from blockchain:", error);
      return null;
    }
  }

  async publishArticle(
    title: string,
    contentHash: string,
    price: number = 0
  ): Promise<string> {
    if (!this.wallet) {
      throw new Error(
        "Wallet not connected to VeritasChain service. Please ensure wallet is properly connected."
      );
    }

    if (!CONTRACTS.ARTICLE_REGISTRY) {
      throw new Error(
        "Article registry contract not deployed. Please deploy smart contracts first."
      );
    }

    try {
      console.log("Publishing article to blockchain:", {
        title,
        contentHash,
        price,
      });

      // Get wallet accounts and verify connection
      const accounts = await this.wallet.accounts();
      if (!accounts.length) {
        throw new Error("No accounts available in wallet");
      }

      const account = accounts[0];
      console.log("Using account:", await account.address);

      // Check wallet balance first
      try {
        const balance = await account.balance(true); // true for final balance
        const balanceInMas = parseFloat(balance.toString()) / 1e9; // Convert to MAS

        console.log(`Wallet balance: ${balanceInMas} MAS`);

        // Minimum required: 0.15 MAS for gas + storage costs (increased based on error)
        const minRequired = 0.15;
        if (balanceInMas < minRequired) {
          throw new Error(
            `Insufficient balance. You have ${balanceInMas} MAS but need at least ${minRequired} MAS. Please add funds to your wallet.`
          );
        }
      } catch (balanceError) {
        console.error("Error checking balance:", balanceError);
        throw new Error(
          "Unable to check wallet balance. Please ensure wallet is properly connected."
        );
      }

      // Make blockchain call with sufficient coins for storage
      const operation = await account.callSC({
        target: CONTRACTS.ARTICLE_REGISTRY,
        func: "publishArticle",
        parameter: new Args()
          .addString(title)
          .addString(title.substring(0, 100) + "...") // Use truncated title as description
          .addString(contentHash), // IPFS hash
        coins: Mas.fromString("0.1"), // Increased coins for storage costs
      });

      // Wait for operation to complete
      const status = await operation.waitSpeculativeExecution();

      if (status !== OperationStatus.SpeculativeSuccess) {
        throw new Error(`Transaction failed with status: ${status}`);
      }

      const articleId = operation.id;
      console.log("Article published successfully on blockchain:", articleId);
      return articleId;
    } catch (error) {
      console.error("Error publishing article to blockchain:", error);

      // Provide specific error messages based on the error type
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      if (errorMessage.includes("insufficient balance")) {
        throw new Error(
          "Insufficient wallet balance. Please add MAS tokens to your wallet."
        );
      } else if (errorMessage.includes("Insufficient balance")) {
        throw error; // Re-throw our custom balance error
      } else {
        throw new Error(`Failed to publish article: ${errorMessage}`);
      }
    }
  }

  async uploadToIPFS(content: string): Promise<string> {
    try {
      console.log("Uploading content to IPFS...");

      // Real IPFS upload using Pinata service
      const response = await fetch("/api/ipfs/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Failed to upload to IPFS");
      }

      const data = await response.json();
      console.log("Content uploaded to IPFS:", data.hash);
      return data.hash;
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      throw new Error("Failed to upload content to IPFS");
    }
  }

  async uploadImageToIPFS(file: File): Promise<string> {
    try {
      console.log("Uploading image to IPFS...", file.name);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("file", file);

      // Real IPFS image upload using Pinata service
      const response = await fetch("/api/ipfs/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image to IPFS");
      }

      const data = await response.json();
      console.log("Image uploaded to IPFS:", data.hash);
      return data.hash;
    } catch (error) {
      console.error("Error uploading image to IPFS:", error);
      throw new Error("Failed to upload image to IPFS");
    }
  }

  async getFromIPFS(hash: string): Promise<string> {
    try {
      console.log("Fetching content from IPFS:", hash);

      // Real IPFS retrieval
      const response = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`);

      if (!response.ok) {
        throw new Error("Failed to fetch from IPFS");
      }

      const content = await response.text();
      return content;
    } catch (error) {
      console.error("Error fetching from IPFS:", error);
      throw new Error("Failed to fetch content from IPFS");
    }
  }
}

export const veritasChainService = new VeritasChainService();
export default veritasChainService;
