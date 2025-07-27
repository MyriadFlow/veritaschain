"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/lib/wallet-provider";
import { veritasChainService } from "@/lib/veritas-service";
import { Upload, Eye, Globe, Shield, Save, Send } from "lucide-react";

export default function PublishPage() {
  const { isConnected, connect, loading, provider } = useWallet();
  const [isPublishing, setIsPublishing] = useState(false);
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

  const handlePublish = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsPublishing(true);

    try {
      // Upload content to IPFS first
      const contentHash = await veritasChainService.uploadToIPFS(
        article.content
      );

      // Publish article to blockchain
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
    } catch (error) {
      console.error("Error publishing article:", error);
      toast.error("Failed to publish article. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully!");
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
                <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer'>
                  <Upload className='h-8 w-8 text-gray-400 mx-auto mb-2' />
                  <p className='text-sm text-gray-600'>
                    Click to upload or drag and drop your cover image
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>
                    Recommended: 1600x900 pixels, under 5MB
                  </p>
                </div>
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
                <Button variant='outline' className='w-full'>
                  Preview Article
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
