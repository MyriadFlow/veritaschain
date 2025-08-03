import { NextRequest, NextResponse } from "next/server";
import { VeritasChainService } from "@/lib/veritas-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const journalistAddress = searchParams.get("journalist");

    if (!journalistAddress) {
      return NextResponse.json(
        { error: "Journalist address is required" },
        { status: 400 }
      );
    }

    const veritasService = new VeritasChainService();
    const stats = await veritasService.getJournalistStats(journalistAddress);

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching journalist stats:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch journalist statistics",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
