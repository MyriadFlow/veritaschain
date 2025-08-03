import { NextRequest, NextResponse } from "next/server";
import { VeritasChainService } from "@/lib/veritas-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, contentHash, price = 0, walletAddress } = body;

    if (!title || !contentHash) {
      return NextResponse.json(
        { error: "Title and content hash are required" },
        { status: 400 }
      );
    }

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required for publishing" },
        { status: 400 }
      );
    }

    const veritasService = new VeritasChainService();

    const articleId = await veritasService.publishArticle(
      title,
      contentHash,
      price
    );

    return NextResponse.json({
      success: true,
      data: {
        articleId,
        title,
        contentHash,
        price,
      },
    });
  } catch (error) {
    console.error("Error publishing article:", error);
    return NextResponse.json(
      {
        error: "Failed to publish article",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to publish articles." },
    { status: 405 }
  );
}
