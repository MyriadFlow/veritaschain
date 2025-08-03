import ArticleClient from "./ArticleClient";
import { VeritasChainService } from "@/lib/veritas-service";
import type { Article } from "@/lib/types";

// Generate static params for static export
export async function generateStaticParams() {
  // During build time, we're in a server environment without browser APIs
  // Skip blockchain calls during build and use fallback static params
  if (typeof window === "undefined") {
    console.log("Build time: Using fallback static params for article routes");
    return [
      { id: "sample-article" },
      { id: "featured-article" },
      { id: "latest-news" },
    ];
  }

  try {
    // This code would only run in browser context (which won't happen during build)
    const veritasService = new VeritasChainService();
    const articles = await veritasService.getAllPublishedArticles();

    // Return the actual article IDs from the blockchain
    if (articles && articles.length > 0) {
      return articles.map((article: Article) => ({
        id: article.id,
      }));
    }
  } catch (error) {
    console.error("Error fetching articles for static generation:", error);
  }

  // Fallback: Always return at least one static param to satisfy Next.js requirements
  // This ensures the build succeeds even if blockchain is unavailable
  return [{ id: "sample-article" }];
}

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  return <ArticleClient params={params} />;
}
