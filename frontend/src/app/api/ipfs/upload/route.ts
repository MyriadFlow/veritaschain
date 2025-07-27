// Real IPFS upload API using Pinata
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Use Pinata JWT for authentication (newer method)
    const pinataJWT = process.env.PINATA_JWT;

    if (!pinataJWT) {
      console.error("PINATA_JWT not found in environment variables");
      return NextResponse.json(
        { error: "IPFS service not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${pinataJWT}`,
        },
        body: JSON.stringify({
          pinataContent: {
            content: content,
            timestamp: Date.now(),
            platform: "VeritasChain",
          },
          pinataMetadata: {
            name: `VeritasChain Article ${Date.now()}`,
            keyvalues: {
              platform: "VeritasChain",
              type: "article",
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Pinata API error:", response.status, errorText);
      throw new Error(
        `Failed to upload to Pinata: ${response.status} ${errorText}`
      );
    }

    const data = await response.json();

    console.log("Successfully uploaded to IPFS:", data.IpfsHash);

    return NextResponse.json({
      hash: data.IpfsHash,
      success: true,
    });
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    return NextResponse.json(
      {
        error: `Failed to upload to IPFS: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
