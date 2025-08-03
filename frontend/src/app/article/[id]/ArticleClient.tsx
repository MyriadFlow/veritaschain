"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow, format } from "date-fns";
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Calendar,
  User,
  Shield,
  Share2,
  Bookmark,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { VeritasChainService } from "@/lib/veritas-service";
import { Article } from "@/lib/types";

interface ArticleClientProps {
  params: {
    id: string;
  };
}

export default function ArticleClient({ params }: ArticleClientProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!params.id) {
        console.error("No article ID provided");
        setLoading(false);
        return;
      }

      try {
        const veritasService = new VeritasChainService();
        const fetchedArticle = await veritasService.getArticleById(params.id);
        setArticle(fetchedArticle);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.id]);

  const handleVote = (voteType: "up" | "down") => {
    setUserVote(voteType);
    // Here you would typically send the vote to the blockchain
    console.log(`Voted ${voteType} on article ${params.id}`);
  };

  const renderContent = (content: string) => {
    const sections = content.split("\n\n");

    return sections.map((section, index) => {
      if (section.startsWith("# ")) {
        return (
          <h2
            key={index}
            className='text-2xl font-bold mt-8 mb-4 text-gray-900'
          >
            {section.replace("# ", "")}
          </h2>
        );
      }
      if (section.startsWith("## ")) {
        return (
          <h3
            key={index}
            className='text-xl font-semibold mt-6 mb-3 text-gray-900'
          >
            {section.replace("## ", "")}
          </h3>
        );
      }
      if (section.startsWith("- ")) {
        const items = section
          .split("\n")
          .filter((item) => item.startsWith("- "));
        return (
          <ul key={index} className='list-disc list-inside mb-4 text-gray-700'>
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className='mb-1'>
                {item.replace("- ", "")}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index} className='mb-4 text-gray-700 leading-relaxed'>
          {section}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-white'>
        <Navigation />
        <main className='container mx-auto px-4 py-8 max-w-4xl'>
          <div className='mb-8'>
            <Link href='/'>
              <Button variant='ghost' className='mb-4'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Articles
              </Button>
            </Link>
          </div>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-200 rounded mb-4'></div>
            <div className='h-4 bg-gray-200 rounded mb-2'></div>
            <div className='h-4 bg-gray-200 rounded mb-8'></div>
            <div className='h-64 bg-gray-200 rounded mb-8'></div>
            <div className='space-y-4'>
              <div className='h-4 bg-gray-200 rounded'></div>
              <div className='h-4 bg-gray-200 rounded'></div>
              <div className='h-4 bg-gray-200 rounded w-3/4'></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!article) {
    return (
      <div className='min-h-screen bg-white'>
        <Navigation />
        <main className='container mx-auto px-4 py-8 max-w-4xl'>
          <div className='mb-8'>
            <Link href='/'>
              <Button variant='ghost' className='mb-4'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Articles
              </Button>
            </Link>
          </div>

          <article className='prose prose-lg max-w-none'>
            <div className='text-center py-16'>
              <h1 className='text-3xl font-bold text-gray-900 mb-4'>
                Article Not Found
              </h1>
              <p className='text-gray-600 mb-8'>Article ID: {params.id}</p>
              <div className='bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto'>
                <h3 className='text-lg font-semibold text-red-900 mb-2'>
                  Article Not Available
                </h3>
                <p className='text-red-800 text-sm'>
                  This article could not be found on the blockchain. It may not
                  exist, or there might be an issue connecting to the Massa
                  network.
                </p>
                <div className='mt-4'>
                  <Link href='/articles'>
                    <Button className='bg-red-600 hover:bg-red-700 text-white'>
                      Browse All Articles
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white'>
      <Navigation />

      <main className='container mx-auto px-4 py-8 max-w-4xl'>
        <div className='mb-8'>
          <Link href='/'>
            <Button variant='ghost' className='mb-4'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Articles
            </Button>
          </Link>
        </div>

        <article className='prose prose-lg max-w-none'>
          {/* Article Header */}
          <header className='mb-8'>
            <div className='flex items-center gap-2 mb-4'>
              <Badge
                className={
                  article.status === "verified"
                    ? "bg-green-100 text-green-800"
                    : article.status === "under_review"
                    ? "bg-yellow-100 text-yellow-800"
                    : article.status === "published"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }
              >
                <Shield className='mr-1 h-3 w-3' />
                {article.status}
              </Badge>
              {article.category && (
                <Badge variant='outline'>{article.category}</Badge>
              )}
            </div>

            <h1 className='text-4xl font-bold text-gray-900 mb-4 leading-tight'>
              {article.title}
            </h1>

            {article.subtitle && (
              <p className='text-xl text-gray-600 mb-6 font-medium'>
                {article.subtitle}
              </p>
            )}

            <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6'>
              <div className='flex items-center gap-1'>
                <User className='h-4 w-4' />
                <span>{article.author.name}</span>
              </div>
              <div className='flex items-center gap-1'>
                <Calendar className='h-4 w-4' />
                <span>
                  {format(new Date(article.publishedAt), "MMMM d, yyyy")}
                </span>
              </div>
              <div className='flex items-center gap-1'>
                <Eye className='h-4 w-4' />
                <span>{article.voteCount || 0} views</span>
              </div>
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className='flex flex-wrap gap-2 mb-6'>
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant='secondary' className='text-xs'>
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Cover Image */}
          {article.coverImage && (
            <div className='mb-8'>
              <Image
                src={article.coverImage}
                alt={article.title}
                width={800}
                height={400}
                className='w-full h-64 object-cover rounded-lg'
              />
            </div>
          )}

          {/* Article Content */}
          <div className='mb-8'>
            {article.content ? (
              <div className='space-y-4'>{renderContent(article.content)}</div>
            ) : (
              <div className='bg-gray-50 border border-gray-200 rounded-lg p-6'>
                <p className='text-gray-600 text-center'>
                  Content loading from IPFS...
                </p>
                <p className='text-xs text-gray-500 text-center mt-2'>
                  Content Hash: {article.ipfsHash}
                </p>
              </div>
            )}
          </div>
        </article>

        {/* Article Actions */}
        <div className='border-t border-gray-200 pt-8 mb-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <Button
                  variant={userVote === "up" ? "default" : "outline"}
                  size='sm'
                  onClick={() => handleVote("up")}
                  className='flex items-center gap-2'
                >
                  <ThumbsUp className='h-4 w-4' />
                  {article.upvotes}
                </Button>
                <Button
                  variant={userVote === "down" ? "default" : "outline"}
                  size='sm'
                  onClick={() => handleVote("down")}
                  className='flex items-center gap-2'
                >
                  <ThumbsDown className='h-4 w-4' />
                  {article.downvotes}
                </Button>
              </div>
              <div className='text-sm text-gray-600'>
                <span className='font-medium'>
                  {(
                    (article.upvotes / (article.upvotes + article.downvotes)) *
                      100 || 0
                  ).toFixed(1)}
                  %
                </span>{" "}
                positive
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Button variant='outline' size='sm'>
                <Share2 className='mr-2 h-4 w-4' />
                Share
              </Button>
              <Button variant='outline' size='sm'>
                <Bookmark className='mr-2 h-4 w-4' />
                Save
              </Button>
              <Button variant='outline' size='sm'>
                <MessageCircle className='mr-2 h-4 w-4' />
                Comments
              </Button>
            </div>
          </div>
        </div>

        {/* Article Metadata */}
        <div className='bg-gray-50 rounded-lg p-6'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Article Information
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
            <div>
              <span className='font-medium text-gray-700'>Price:</span>
              <span className='ml-2 text-gray-600'>{article.price} MASSA</span>
            </div>
            <div>
              <span className='font-medium text-gray-700'>Content Hash:</span>
              <span className='ml-2 text-gray-600 font-mono text-xs'>
                {article.ipfsHash}
              </span>
            </div>
            <div>
              <span className='font-medium text-gray-700'>Published:</span>
              <span className='ml-2 text-gray-600'>
                {formatDistanceToNow(new Date(article.publishedAt))} ago
              </span>
            </div>
            <div>
              <span className='font-medium text-gray-700'>Status:</span>
              <span className='ml-2'>
                <Badge
                  className={
                    article.status === "verified"
                      ? "bg-green-100 text-green-800"
                      : article.status === "under_review"
                      ? "bg-yellow-100 text-yellow-800"
                      : article.status === "published"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }
                >
                  {article.status}
                </Badge>
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
