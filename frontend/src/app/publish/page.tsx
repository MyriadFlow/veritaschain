"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/lib/wallet-provider";
import { veritasChainService } from "@/lib/veritas-service";
import { Upload, Eye, Globe, Shield, Save, Send } from "lucide-react";

interface ArticleDraft {
  title: string;
  subtitle: string;
  content: string;
  category: string;
  tags: string;
  monetization: string;
  price: string;
  stake: string;
  coverImagePreview?: string;
  timestamp: number;
  id: string;
}

export default function PublishPage() {
  const { isConnected, connect, loading, provider } = useWallet();
  const [isPublishing, setIsPublishing] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [article, setArticle] = useState({
    title: "",
    subtitle: "",
    content: "",
    category: "",
    tags: "",
    monetization: "free",
    price: "",
    stake: "10",
  });

  // Set wallet in service when connected
  useEffect(() => {
    if (isConnected && provider) {
      veritasChainService.setWallet(provider);
      console.log("Wallet set in veritas service for publishing");
    }
  }, [isConnected, provider]);

  const handleCoverImageSelect = (file: File) => {
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a JPEG, PNG, or WebP image");
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setCoverImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setCoverImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCoverImageUpload = async (file: File): Promise<string> => {
    setIsUploadingImage(true);
    try {
      const imageHash = await veritasChainService.uploadImageToIPFS(file);
      toast.success("Cover image uploaded successfully!");
      return imageHash;
    } catch (error) {
      console.error("Error uploading cover image:", error);
      toast.error("Failed to upload cover image");
      throw error;
    } finally {
      setIsUploadingImage(false);
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setCoverImagePreview(null);
  };

  const handlePublish = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!provider) {
      toast.error("Wallet provider not available");
      return;
    }

    // Ensure wallet is set in service
    veritasChainService.setWallet(provider);

    setIsPublishing(true);

    try {
      // First check if we can publish to blockchain (wallet balance, etc.)
      console.log("Checking wallet connection and balance...");

      // Upload cover image to IPFS if present
      let coverImageHash = "";
      if (coverImage) {
        console.log("Uploading cover image to IPFS...");
        coverImageHash = await handleCoverImageUpload(coverImage);
      }

      // Create article metadata object including all form data
      const articleMetadata = {
        content: article.content,
        subtitle: article.subtitle,
        category: article.category,
        tags: article.tags
          ? article.tags.split(",").map((tag) => tag.trim())
          : [],
        coverImage: coverImageHash,
        monetization: article.monetization,
        stake: article.stake,
        timestamp: Date.now(),
        platform: "VeritasChain",
      };

      // Upload complete metadata to IPFS
      console.log("Uploading article metadata to IPFS...");
      const contentHash = await veritasChainService.uploadToIPFS(
        JSON.stringify(articleMetadata)
      );
      console.log("Article metadata uploaded to IPFS:", contentHash);

      // Then publish article to blockchain with title, subtitle as description, and contentHash
      console.log("Publishing article to blockchain...");
      const articleId = await veritasChainService.publishArticle(
        article.title,
        contentHash,
        article.monetization === "paid" ? parseFloat(article.price) || 0 : 0
      );

      console.log("Article published with ID:", articleId);
      toast.success("Article published successfully to the blockchain!");

      // Reset form
      setArticle({
        title: "",
        subtitle: "",
        content: "",
        category: "",
        tags: "",
        monetization: "free",
        price: "",
        stake: "10",
      });
      setCoverImage(null);
      setCoverImagePreview(null);
    } catch (error) {
      console.error("Error publishing article:", error);
      toast.error("Failed to publish article. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  const saveDraft = () => {
    try {
      const draft = {
        ...article,
        coverImagePreview,
        timestamp: Date.now(),
        id: Date.now().toString(),
      };

      // Get existing drafts
      const existingDrafts =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("veritaschain_drafts") || "[]")
          : [];

      // Add new draft
      existingDrafts.push(draft);

      // Keep only last 10 drafts
      const recentDrafts = existingDrafts.slice(-10);

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "veritaschain_drafts",
          JSON.stringify(recentDrafts)
        );
      }
      toast.success("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Failed to save draft");
    }
  };

  const loadDrafts = () => {
    try {
      const drafts =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("veritaschain_drafts") || "[]")
          : [];
      return drafts;
    } catch (error) {
      console.error("Error loading drafts:", error);
      return [];
    }
  };

  const loadDraft = (draft: ArticleDraft) => {
    setArticle({
      title: draft.title || "",
      subtitle: draft.subtitle || "",
      content: draft.content || "",
      category: draft.category || "",
      tags: draft.tags || "",
      monetization: draft.monetization || "free",
      price: draft.price || "",
      stake: draft.stake || "10",
    });

    if (draft.coverImagePreview) {
      setCoverImagePreview(draft.coverImagePreview);
    }

    toast.success("Draft loaded successfully!");
  };

  // Load last draft on component mount - using useRef to avoid dependency issues
  const hasLoadedDraft = useRef(false);
  useEffect(() => {
    if (!hasLoadedDraft.current) {
      const drafts = loadDrafts();
      if (drafts.length > 0) {
        const lastDraft = drafts[drafts.length - 1];
        // Only auto-load if form is empty and user confirms
        if (
          !article.title &&
          !article.content &&
          typeof window !== "undefined" &&
          window.confirm("Load your last draft?")
        ) {
          loadDraft(lastDraft);
        }
      }
      hasLoadedDraft.current = true;
    }
  }, [article.title, article.content]);

  const handleSaveDraft = () => {
    saveDraft();
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold mb-3">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-medium mb-2">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, "<br/>");
  };

  if (!isConnected) {
    return (
      <div className='min-h-screen bg-white'>
        <Navigation />
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center'>
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-8'>
            <h1 className='font-serif text-3xl font-bold text-gray-900 mb-4'>
              Connect Your Wallet
            </h1>
            <p className='text-gray-600 mb-6'>
              You need to connect your Massa wallet to publish articles on
              VeritasChain.
            </p>
            <Button
              size='lg'
              className='bg-gray-900 hover:bg-gray-800'
              onClick={connect}
              disabled={loading}
            >
              {loading ? "Connecting..." : "Connect Wallet"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white'>
      <Navigation />

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Main Editor */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Header */}
            <div className='flex items-center justify-between'>
              <h1 className='font-serif text-3xl font-bold text-gray-900'>
                Write Your Story
              </h1>
              <div className='flex items-center space-x-3'>
                <Button
                  variant='outline'
                  onClick={handleSaveDraft}
                  className='flex items-center space-x-2'
                >
                  <Save className='h-4 w-4' />
                  <span>Save Draft</span>
                </Button>
                <Button
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className='flex items-center space-x-2 bg-gray-900 hover:bg-gray-800'
                >
                  <Send className='h-4 w-4' />
                  <span>{isPublishing ? "Publishing..." : "Publish"}</span>
                </Button>
              </div>
            </div>

            {/* Article Form */}
            <div className='space-y-6'>
              {/* Title */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Title
                </label>
                <input
                  type='text'
                  value={article.title}
                  onChange={(e) =>
                    setArticle({ ...article, title: e.target.value })
                  }
                  placeholder='Enter your article title...'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent font-serif text-xl'
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Subtitle
                </label>
                <input
                  type='text'
                  value={article.subtitle}
                  onChange={(e) =>
                    setArticle({ ...article, subtitle: e.target.value })
                  }
                  placeholder='Enter a compelling subtitle...'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-lg'
                />
              </div>

              {/* Content Editor */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Content
                </label>
                <textarea
                  value={article.content}
                  onChange={(e) =>
                    setArticle({ ...article, content: e.target.value })
                  }
                  placeholder='Write your story here... Use # for headings, ## for subheadings...'
                  rows={20}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent font-editorial text-lg leading-relaxed resize-none'
                />
                <p className='text-xs text-gray-500 mt-2'>
                  Tip: Use # for main headings, ## for subheadings. Content will
                  be stored on IPFS for permanent access.
                </p>
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Cover Image
                </label>
                {coverImagePreview ? (
                  <div className='relative'>
                    <img
                      src={coverImagePreview}
                      alt='Cover preview'
                      className='w-full h-48 object-cover rounded-lg'
                    />
                    <button
                      type='button'
                      onClick={removeCoverImage}
                      className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600'
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div
                    className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer'
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        document.getElementById("coverImageInput")?.click();
                      }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const files = Array.from(e.dataTransfer.files);
                      if (files.length > 0) {
                        handleCoverImageSelect(files[0]);
                      }
                    }}
                  >
                    <Upload className='h-8 w-8 text-gray-400 mx-auto mb-2' />
                    <p className='text-sm text-gray-600'>
                      Click to upload or drag and drop your cover image
                    </p>
                    <p className='text-xs text-gray-500 mt-1'>
                      Recommended: 1600x900 pixels, under 5MB
                    </p>
                    {isUploadingImage && (
                      <p className='text-xs text-blue-500 mt-2'>Uploading...</p>
                    )}
                  </div>
                )}
                <input
                  id='coverImageInput'
                  type='file'
                  accept='image/jpeg,image/jpg,image/png,image/webp'
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      handleCoverImageSelect(files[0]);
                    }
                  }}
                  className='hidden'
                />
              </div>

              {/* Category and Tags */}
              <div className='grid md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Category
                  </label>
                  <select
                    value={article.category}
                    onChange={(e) =>
                      setArticle({ ...article, category: e.target.value })
                    }
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                  >
                    <option value=''>Select a category</option>
                    <option value='politics'>Politics</option>
                    <option value='finance'>Finance</option>
                    <option value='technology'>Technology</option>
                    <option value='environment'>Environment</option>
                    <option value='health'>Health</option>
                    <option value='society'>Society</option>
                    <option value='investigation'>Investigation</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Tags
                  </label>
                  <input
                    type='text'
                    value={article.tags}
                    onChange={(e) =>
                      setArticle({ ...article, tags: e.target.value })
                    }
                    placeholder='blockchain, journalism, truth'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                  />
                  <p className='text-xs text-gray-500 mt-1'>
                    Separate tags with commas
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-1 space-y-6'>
            {/* Publishing Options */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <Globe className='h-5 w-5' />
                  <span>Publishing Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Monetization */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Monetization
                  </label>
                  <div className='space-y-2'>
                    <label className='flex items-center space-x-2'>
                      <input
                        type='radio'
                        name='monetization'
                        value='free'
                        checked={article.monetization === "free"}
                        onChange={(e) =>
                          setArticle({
                            ...article,
                            monetization: e.target.value,
                          })
                        }
                        className='text-gray-900'
                      />
                      <span className='text-sm'>Free to read</span>
                    </label>
                    <label className='flex items-center space-x-2'>
                      <input
                        type='radio'
                        name='monetization'
                        value='paid'
                        checked={article.monetization === "paid"}
                        onChange={(e) =>
                          setArticle({
                            ...article,
                            monetization: e.target.value,
                          })
                        }
                        className='text-gray-900'
                      />
                      <span className='text-sm'>Premium content</span>
                    </label>
                  </div>

                  {article.monetization === "paid" && (
                    <div className='mt-3'>
                      <label className='block text-xs text-gray-500 mb-1'>
                        Price (MAS)
                      </label>
                      <input
                        type='number'
                        value={article.price}
                        onChange={(e) =>
                          setArticle({ ...article, price: e.target.value })
                        }
                        placeholder='5.0'
                        step='0.1'
                        min='0'
                        className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm'
                      />
                    </div>
                  )}
                </div>

                {/* Stake Amount */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Reputation Stake (MAS)
                  </label>
                  <input
                    type='number'
                    value={article.stake}
                    onChange={(e) =>
                      setArticle({ ...article, stake: e.target.value })
                    }
                    placeholder='10'
                    step='1'
                    min='1'
                    className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                  />
                  <p className='text-xs text-gray-500 mt-1'>
                    Higher stakes increase trust but risk more if disputed
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Article Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <Shield className='h-5 w-5' />
                  <span>Guidelines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-3 text-sm text-gray-600'>
                  <div className='flex items-start space-x-2'>
                    <div className='w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0'></div>
                    <span>Fact-check all claims and provide sources</span>
                  </div>
                  <div className='flex items-start space-x-2'>
                    <div className='w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0'></div>
                    <span>Original content only - no plagiarism</span>
                  </div>
                  <div className='flex items-start space-x-2'>
                    <div className='w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0'></div>
                    <span>Maintain professional journalism standards</span>
                  </div>
                  <div className='flex items-start space-x-2'>
                    <div className='w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0'></div>
                    <span>Community will verify your article</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <Eye className='h-5 w-5' />
                  <span>Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={handlePreview}
                  disabled={!article.title && !article.content}
                >
                  Preview Article
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
            <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
              <div className='sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center'>
                <h2 className='text-xl font-semibold'>Article Preview</h2>
                <button
                  onClick={closePreview}
                  className='text-gray-500 hover:text-gray-700 text-2xl'
                >
                  ×
                </button>
              </div>

              <div className='p-6'>
                {/* Cover Image Preview */}
                {coverImagePreview && (
                  <div className='mb-6'>
                    <img
                      src={coverImagePreview}
                      alt='Article cover'
                      className='w-full h-64 object-cover rounded-lg'
                    />
                  </div>
                )}

                {/* Article Content */}
                <article className='prose prose-lg max-w-none'>
                  <h1 className='text-4xl font-bold mb-2'>
                    {article.title || "Untitled Article"}
                  </h1>
                  {article.subtitle && (
                    <p className='text-xl text-gray-600 mb-6'>
                      {article.subtitle}
                    </p>
                  )}

                  {/* Metadata */}
                  <div className='flex flex-wrap gap-4 mb-6 text-sm text-gray-500 border-b pb-4'>
                    {article.category && (
                      <span className='bg-gray-100 px-2 py-1 rounded'>
                        Category: {article.category}
                      </span>
                    )}
                    {article.tags && (
                      <span className='bg-gray-100 px-2 py-1 rounded'>
                        Tags: {article.tags}
                      </span>
                    )}
                    <span className='bg-gray-100 px-2 py-1 rounded'>
                      {article.monetization === "paid"
                        ? `Premium (${article.price} MAS)`
                        : "Free"}
                    </span>
                  </div>

                  {/* Article Content */}
                  {article.content ? (
                    <div
                      className='text-gray-800 leading-relaxed'
                      dangerouslySetInnerHTML={{
                        __html: `<p class="mb-4">${formatContent(
                          article.content
                        )}</p>`,
                      }}
                    />
                  ) : (
                    <p className='text-gray-500 italic'>No content yet...</p>
                  )}
                </article>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
