import { NextRequest, NextResponse } from "next/server";
import { VeritasChainService } from "@/lib/veritas-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const authorAddress = searchParams.get("author");

    if (!authorAddress) {
      return NextResponse.json(
        { error: "Author address is required" },
        { status: 400 }
      );
    }

    const veritasService = new VeritasChainService();
    const articles = await veritasService.getArticlesByAuthor(authorAddress);

    return NextResponse.json({
      success: true,
      data: articles,
    });
  } catch (error) {
    console.error("Error fetching articles by author:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch articles",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
