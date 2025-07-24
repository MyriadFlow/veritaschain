"use client";

import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockArticles } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { formatDistanceToNow, format } from "date-fns";
import {
  Clock,
  User,
  Shield,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  Eye,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [isVoting, setIsVoting] = useState(false);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const article = mockArticles.find((a) => a.id === params.id);

  if (!article) {
    notFound();
  }

  const handleVote = async (voteType: "up" | "down") => {
    setIsVoting(true);
    // Simulate voting API call
    setTimeout(() => {
      setUserVote(voteType);
      setIsVoting(false);
    }, 1000);
  };

  const renderContent = (content: string) => {
    // Simple markdown-like rendering
    const sections = content.split("\n\n");

    return sections.map((section, index) => {
      if (section.startsWith("# ")) {
        return (
          <h1
            key={index}
            className='font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-8 mt-12 first:mt-0'
          >
            {section.replace("# ", "")}
          </h1>
        );
      } else if (section.startsWith("## ")) {
        return (
          <h2
            key={index}
            className='font-serif text-2xl md:text-3xl font-semibold text-gray-900 mb-6 mt-10'
          >
            {section.replace("## ", "")}
          </h2>
        );
      } else if (section.startsWith("### ")) {
        return (
          <h3
            key={index}
            className='font-serif text-xl md:text-2xl font-semibold text-gray-800 mb-4 mt-8'
          >
            {section.replace("### ", "")}
          </h3>
        );
      } else {
        return (
          <p
            key={index}
            className='font-editorial text-lg leading-relaxed text-gray-800 mb-6'
          >
            {section}
          </p>
        );
      }
    });
  };

  return (
    <div className='min-h-screen bg-white'>
      <Navigation />

      {/* Article Header */}
      <article className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Article Meta */}
        <div className='mb-8'>
          <div className='flex items-center space-x-3 mb-6'>
            <Badge
              variant='secondary'
              className='bg-red-100 text-red-800 font-medium'
            >
              {article.category}
            </Badge>
            <Badge variant='outline' className='flex items-center space-x-1'>
              <Shield className='h-3 w-3' />
              <span>Verified {article.verificationScore}%</span>
            </Badge>
          </div>

          {/* Title */}
          <h1 className='font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6'>
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className='text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light'>
            {article.subtitle}
          </p>

          {/* Article Meta Info */}
          <div className='flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8'>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center'>
                <User className='h-4 w-4' />
              </div>
              <div>
                <div className='font-medium text-gray-900'>
                  {article.author.name}
                </div>
                <div className='text-xs text-gray-500'>
                  {article.author.reputation}% reputation
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <Clock className='h-4 w-4' />
              <span>
                {format(new Date(article.publishedAt), "MMMM d, yyyy")}
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <Eye className='h-4 w-4' />
              <span>{article.readTime} min read</span>
            </div>
            <div className='flex items-center space-x-2'>
              <TrendingUp className='h-4 w-4' />
              <span>{article.voteCount} votes</span>
            </div>
          </div>

          {/* Social Actions */}
          <div className='flex items-center justify-between py-4 border-y border-gray-200'>
            <div className='flex items-center space-x-4'>
              <Button
                variant={userVote === "up" ? "default" : "outline"}
                size='sm'
                onClick={() => handleVote("up")}
                disabled={isVoting}
                className='flex items-center space-x-2'
              >
                <ThumbsUp className='h-4 w-4' />
                <span>{article.upvotes}</span>
              </Button>
              <Button
                variant={userVote === "down" ? "destructive" : "outline"}
                size='sm'
                onClick={() => handleVote("down")}
                disabled={isVoting}
                className='flex items-center space-x-2'
              >
                <ThumbsDown className='h-4 w-4' />
                <span>{article.downvotes}</span>
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='flex items-center space-x-2'
              >
                <MessageCircle className='h-4 w-4' />
                <span>Discuss</span>
              </Button>
            </div>

            <div className='flex items-center space-x-2'>
              <Button variant='ghost' size='sm'>
                <Bookmark className='h-4 w-4' />
              </Button>
              <Button variant='ghost' size='sm'>
                <Share2 className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className='aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden mb-12'>
          <div className='w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center'>
            <span className='text-gray-600'>Article Cover Image</span>
          </div>
        </div>

        {/* Premium Content Warning */}
        {article.premium && (
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='font-medium text-yellow-800 mb-2'>
                  Premium Content
                </h3>
                <p className='text-yellow-700 text-sm'>
                  This story requires a payment of {article.price} MAS to read
                  in full.
                </p>
              </div>
              <Button className='bg-yellow-600 hover:bg-yellow-700 text-white'>
                Unlock Story
              </Button>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className='article-content prose prose-lg max-w-none'>
          {renderContent(article.content)}
        </div>

        {/* Article Footer */}
        <div className='mt-16 pt-8 border-t border-gray-200'>
          {/* Author Bio */}
          <div className='bg-gray-50 rounded-lg p-6 mb-8'>
            <div className='flex items-start space-x-4'>
              <div className='w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center'>
                <User className='h-8 w-8 text-gray-600' />
              </div>
              <div className='flex-1'>
                <h3 className='font-serif text-xl font-semibold text-gray-900 mb-2'>
                  {article.author.name}
                </h3>
                <p className='text-gray-600 text-sm leading-relaxed mb-3'>
                  {article.author.bio}
                </p>
                <div className='flex items-center space-x-4 text-sm text-gray-500'>
                  <span>{article.author.articlesPublished} articles</span>
                  <span>•</span>
                  <span>{article.author.reputation}% reputation</span>
                  <span>•</span>
                  <span>
                    Joined{" "}
                    {formatDistanceToNow(new Date(article.author.joinedDate))}{" "}
                    ago
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Details */}
          <div className='bg-green-50 border border-green-200 rounded-lg p-6'>
            <h3 className='font-medium text-green-800 mb-3 flex items-center space-x-2'>
              <Shield className='h-5 w-5' />
              <span>Community Verification</span>
            </h3>
            <div className='grid md:grid-cols-3 gap-4 text-sm'>
              <div>
                <div className='text-green-900 font-medium'>
                  Verification Score
                </div>
                <div className='text-green-700'>
                  {article.verificationScore}%
                </div>
              </div>
              <div>
                <div className='text-green-900 font-medium'>Total Votes</div>
                <div className='text-green-700'>{article.voteCount}</div>
              </div>
              <div>
                <div className='text-green-900 font-medium'>Stake Amount</div>
                <div className='text-green-700'>
                  {article.stakingAmount} MAS
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
