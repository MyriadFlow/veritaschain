import { Wallet } from "@massalabs/wallet-provider";
import { Args, OperationStatus, Mas } from "@massalabs/massa-web3";

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
    if (!CONTRACTS.REPUTATION_SYSTEM) {
      throw new Error(
        "Reputation contract not deployed. Please deploy smart contracts first."
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

      // Make blockchain read call using the account directly (like in the sandbox examples)
      try {
        const result = await account.readSC({
          target: CONTRACTS.REPUTATION_SYSTEM,
          func: "getJournalistStats",
          parameter: new Args().addString(address),
        });

        console.log("Raw blockchain result:", result);

        // Parse the result from smart contract
        const resultArgs = new Args(result.value);
        // The smart contract returns all values as strings: reputation, articlesPublished, totalEarnings, followers, verificationRate
        const reputation = resultArgs.nextString();
        const articlesPublished = resultArgs.nextString();
        const totalEarnings = resultArgs.nextString();
        const followers = resultArgs.nextString();
        const verificationRate = resultArgs.nextString();

        console.log("Parsed values:", {
          reputation,
          articlesPublished,
          totalEarnings,
          followers,
          verificationRate,
        });

        return {
          reputation: Number(reputation),
          articlesPublished: Number(articlesPublished),
          totalEarnings,
          followers: Number(followers),
          verificationRate: Number(verificationRate),
        };
      } catch (bcError) {
        console.error("Blockchain call failed for getJournalistStats:", bcError);
        console.error("Error details:", {
          contractAddress: CONTRACTS.REPUTATION_SYSTEM,
          function: "getJournalistStats",
          parameter: address,
          error: bcError
        });
        
        // If journalist doesn't exist yet, return default stats
        return {
          reputation: 0,
          articlesPublished: 0,
          totalEarnings: "0",
          followers: 0,
          verificationRate: 0,
        };
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
      const articleIds = articleIdsString.split(",").filter(id => id.trim() !== "");
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
            const lastUpdatedTimestamp = parseInt(parts[6]);
            const currentVersionHash = parts[7];
            const previousVersionHash = parts[8];
            const status = parts[9] as "pending" | "verified" | "rejected";
            const monetizationModel = parts[10];
            const price = parseInt(parts[11]);
            const totalViews = parseInt(parts[12]);
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
              price: price / 100, // Convert from cents if needed
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

  async publishArticle(
    title: string,
    contentHash: string,
    price: number = 0
  ): Promise<string> {
    if (!this.wallet) {
      throw new Error("Wallet not connected");
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

      // Get wallet accounts
      const accounts = await this.wallet.accounts();
      if (!accounts.length) {
        throw new Error("No accounts available in wallet");
      }

      const account = accounts[0];

      // Check if wallet has sufficient balance
      try {
        const walletAddress = await account.address;
        console.log("Wallet address:", walletAddress);
        console.log("Contract address:", CONTRACTS.ARTICLE_REGISTRY);
        console.log("Environment check:");
        console.log("- Node URL:", process.env.NEXT_PUBLIC_MASSA_NODE_URL);
        console.log(
          "- Article Registry:",
          process.env.NEXT_PUBLIC_ARTICLE_REGISTRY_ADDRESS
        );

        // Try to get balance using a different method if available
        // Let's see if the account has a balance method that works
        // const balance = await account.balance();
        // console.log("Wallet balance:", balance.toString());
      } catch (balanceError) {
        console.error("Error checking wallet info:", balanceError);
      }

      // Make blockchain call using the account directly
      // Note: Smart contract expects (title, description, ipfsHash)
      const operation = await account.callSC({
        target: CONTRACTS.ARTICLE_REGISTRY,
        func: "publishArticle",
        parameter: new Args()
          .addString(title)
          .addString(title) // Use title as description for now
          .addString(contentHash), // This is the IPFS hash
        coins: Mas.fromString("0.05"), // Provide coins for gas and storage costs
      });

      // Wait for operation to complete
      const status = await operation.waitSpeculativeExecution();

      if (status !== OperationStatus.SpeculativeSuccess) {
        throw new Error("Transaction failed");
      }

      const articleId = operation.id;
      console.log("Article published successfully on blockchain:", articleId);
      return articleId;
    } catch (error) {
      console.error("Error publishing article to blockchain:", error);
      throw new Error(
        "Failed to publish article to blockchain. Make sure contracts are deployed."
      );
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
