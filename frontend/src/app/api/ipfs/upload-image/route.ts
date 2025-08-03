import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    // Use Pinata JWT for authentication
    const pinataJWT = process.env.PINATA_JWT;

    if (!pinataJWT) {
      console.warn(
        "PINATA_JWT not found, using mock IPFS hash for development"
      );

      // Return a mock hash for development
      const mockHash = `Qm${Math.random()
        .toString(36)
        .substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

      return NextResponse.json({
        hash: mockHash,
        success: true,
        mock: true,
      });
    }

    // Convert file to buffer for Pinata
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create FormData for Pinata file upload
    const pinataFormData = new FormData();
    const blob = new Blob([buffer], { type: file.type });
    pinataFormData.append("file", blob, file.name);

    // Add metadata
    pinataFormData.append(
      "pinataMetadata",
      JSON.stringify({
        name: `VeritasChain Image ${Date.now()}`,
        keyvalues: {
          platform: "VeritasChain",
          type: "image",
          originalName: file.name,
        },
      })
    );

    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${pinataJWT}`,
        },
        body: pinataFormData,
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

    console.log("Successfully uploaded image to IPFS:", data.IpfsHash);

    return NextResponse.json({
      hash: data.IpfsHash,
      success: true,
    });
  } catch (error) {
    console.error("Error uploading image to IPFS:", error);
    return NextResponse.json(
      {
        error: `Failed to upload image to IPFS: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
