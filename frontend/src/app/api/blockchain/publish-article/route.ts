// Real blockchain API for publishing articles
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, contentHash, price, contractAddress, walletAddress } =
      await request.json();

    if (!title || !contentHash || !contractAddress || !walletAddress) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    console.log("Publishing article to Massa blockchain:", {
      title,
      contentHash,
      price,
      contractAddress,
      walletAddress,
    });

    // Check if Massa node URL is available
    if (!process.env.NEXT_PUBLIC_MASSA_NODE_URL) {
      throw new Error("NEXT_PUBLIC_MASSA_NODE_URL environment variable not set");
    }

    const requestBody = {
      jsonrpc: "2.0",
      method: "send_operations",
      params: [{
        operation_type: "CallSC",
        target_address: contractAddress,
        target_function: "publishArticle",
        parameter: [title, contentHash, price.toString()],
        caller_address: walletAddress,
        max_gas: 1000000,
        coins: 0,
      }],
      id: 1,
    };

    console.log("Sending request to Massa node:", {
      url: process.env.NEXT_PUBLIC_MASSA_NODE_URL,
      body: requestBody,
    });

    // Make actual blockchain transaction to ArticleRegistry contract
    const response = await fetch(process.env.NEXT_PUBLIC_MASSA_NODE_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Blockchain call failed:", {
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      throw new Error(`Blockchain call failed: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("Massa blockchain response:", result);

    if (result.error) {
      console.error("Blockchain error:", result.error);
      throw new Error(`Blockchain error: ${result.error.message}`);
    }

    // Extract article ID from blockchain response
    const articleId = result.result?.operation_id || `article_${Date.now()}`;

    console.log(
      "Article published successfully on Massa blockchain:",
      articleId
    );
    return NextResponse.json({
      articleId,
      transactionId: result.result?.operation_id,
      success: true,
    });
  } catch (error) {
    console.error("Error publishing article to blockchain:", error);
    return NextResponse.json(
      {
        error: `Failed to publish article to blockchain: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
