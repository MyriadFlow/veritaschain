"use client";

import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { mockArticles } from "@/lib/mock-data";
import {
  FileText,
  Bookmark,
  Heart,
  TrendingUp,
  Search,
  Filter,
  Star,
  DollarSign,
  Users,
} from "lucide-react";

export default function ReaderHub() {
  // Mock reader data
  const readerStats = {
    articlesRead: 156,
    totalSpent: 45.7, // in MAS
    savedArticles: 23,
    followingJournalists: 12,
    votesGiven: 89,
  };

  const trendingArticles = mockArticles.slice(0, 4);
  const bookmarkedArticles = mockArticles.slice(4, 7);
  const followingJournalists = [
    { name: "Sarah Chen", reputation: 87, articles: 42 },
    { name: "Marcus Rodriguez", reputation: 93, articles: 38 },
    { name: "Dr. Amara Okafor", reputation: 91, articles: 29 },
  ];

  return (
    <div className='min-h-screen bg-[#f8f7f4]'>
      <Navigation />

      {/* Header */}
      <section className='max-w-6xl mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900 font-serif'>
              Reader Hub
            </h1>
            <p className='text-gray-600 mt-2'>
              Discover verified journalism, support independent reporters
            </p>
          </div>
          <div className='flex items-center space-x-4'>
            <Link
              href='/articles'
              className='px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center space-x-2'
            >
              <Search className='h-4 w-4' />
              <span>Browse Articles</span>
            </Link>
            <Link
              href='/authors'
              className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2'
            >
              <Users className='h-4 w-4' />
              <span>Find Journalists</span>
            </Link>
          </div>
        </div>

        {/* Reader Stats */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8'>
          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Articles Read
                </CardTitle>
                <FileText className='h-4 w-4 text-blue-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {readerStats.articlesRead}
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Total Spent
                </CardTitle>
                <DollarSign className='h-4 w-4 text-green-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {readerStats.totalSpent} MAS
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Saved Articles
                </CardTitle>
                <Bookmark className='h-4 w-4 text-purple-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {readerStats.savedArticles}
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Following
                </CardTitle>
                <Heart className='h-4 w-4 text-red-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {readerStats.followingJournalists}
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Votes Given
                </CardTitle>
                <TrendingUp className='h-4 w-4 text-orange-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {readerStats.votesGiven}
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Trending Articles */}
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-gray-900 font-serif'>
                  Trending Articles
                </h2>
                <Link
                  href='/articles?filter=trending'
                  className='text-green-600 hover:text-green-700 font-medium'
                >
                  View All →
                </Link>
              </div>

              <div className='space-y-4'>
                {trendingArticles.map((article, index) => (
                  <Card
                    key={article.id}
                    className='hover:shadow-lg transition-shadow'
                  >
                    <CardHeader>
                      <div className='flex items-start justify-between'>
                        <div className='flex-1'>
                          <div className='flex items-center space-x-3 mb-2'>
                            <Badge
                              variant='secondary'
                              className='bg-orange-100 text-orange-800'
                            >
                              #{index + 1} TRENDING
                            </Badge>
                            {article.status === "verified" && (
                              <Badge
                                variant='outline'
                                className='bg-green-50 text-green-700 border-green-200'
                              >
                                ✅ Verified
                              </Badge>
                            )}
                          </div>

                          <CardTitle className='text-xl font-serif leading-tight mb-2'>
                            <Link
                              href={`/article/${article.id}`}
                              className='hover:text-gray-700'
                            >
                              {article.title}
                            </Link>
                          </CardTitle>

                          <CardDescription className='mb-3'>
                            {article.excerpt}
                          </CardDescription>

                          <div className='flex items-center justify-between text-sm text-gray-600'>
                            <div className='flex items-center space-x-4'>
                              <span className='font-medium'>
                                {article.author.name}
                              </span>
                              <span>⭐ {article.author.reputation}/100</span>
                              <span>👍 {article.upvotes}</span>
                              <span>👀 {article.voteCount}</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                              {article.premium ? (
                                <span className='text-green-600 font-medium'>
                                  {article.price} MAS
                                </span>
                              ) : (
                                <span className='text-gray-500'>Free</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className='ml-4 flex flex-col space-y-2'>
                          <button className='p-2 text-gray-400 hover:text-red-500 transition-colors'>
                            <Heart className='h-4 w-4' />
                          </button>
                          <button className='p-2 text-gray-400 hover:text-blue-500 transition-colors'>
                            <Bookmark className='h-4 w-4' />
                          </button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Reader Actions */}
            <div className='bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6'>
              <h3 className='text-xl font-bold text-gray-900 font-serif mb-4'>
                How to Support Quality Journalism
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900'>
                    💰 Pay for Premium Content
                  </h4>
                  <p className='text-sm text-gray-600'>
                    Support journalists with micropayments for in-depth articles
                    and investigations.
                  </p>
                </div>
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900'>
                    💝 Tip Journalists
                  </h4>
                  <p className='text-sm text-gray-600'>
                    Send MAS tokens directly to journalists whose work you value
                    and appreciate.
                  </p>
                </div>
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900'>
                    👍 Vote on Quality
                  </h4>
                  <p className='text-sm text-gray-600'>
                    Help build journalist reputation by voting on article
                    accuracy and quality.
                  </p>
                </div>
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900'>
                    🔍 Support Fact-Checking
                  </h4>
                  <p className='text-sm text-gray-600'>
                    Participate in community verification to ensure content
                    accuracy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Following Journalists */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                  <span>Following</span>
                  <Link
                    href='/authors'
                    className='text-sm text-green-600 hover:text-green-700'
                  >
                    Find More
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                {followingJournalists.map((journalist, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center space-x-3'>
                      <div className='w-8 h-8 bg-gray-300 rounded-full'></div>
                      <div>
                        <p className='font-medium text-sm'>{journalist.name}</p>
                        <p className='text-xs text-gray-600'>
                          ⭐ {journalist.reputation}/100
                        </p>
                      </div>
                    </div>
                    <div className='text-xs text-gray-500'>
                      {journalist.articles} articles
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Bookmarked Articles */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                  <span>Bookmarked</span>
                  <Link
                    href='/bookmarks'
                    className='text-sm text-green-600 hover:text-green-700'
                  >
                    View All
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                {bookmarkedArticles.map((article) => (
                  <div key={article.id} className='space-y-2'>
                    <h4 className='font-medium text-sm leading-tight'>
                      <Link
                        href={`/article/${article.id}`}
                        className='hover:text-gray-700'
                      >
                        {article.title}
                      </Link>
                    </h4>
                    <div className='flex items-center justify-between text-xs text-gray-600'>
                      <span>{article.author.name}</span>
                      <span>
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <Link
                  href='/articles?filter=latest'
                  className='flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 p-2 hover:bg-gray-50 rounded'
                >
                  <FileText className='h-4 w-4' />
                  <span>Latest Articles</span>
                </Link>
                <Link
                  href='/articles?filter=verified'
                  className='flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 p-2 hover:bg-gray-50 rounded'
                >
                  <Star className='h-4 w-4' />
                  <span>Verified Content</span>
                </Link>
                <Link
                  href='/categories'
                  className='flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 p-2 hover:bg-gray-50 rounded'
                >
                  <Filter className='h-4 w-4' />
                  <span>Browse Categories</span>
                </Link>
                <Link
                  href='/connect'
                  className='flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 p-2 hover:bg-gray-50 rounded'
                >
                  <DollarSign className='h-4 w-4' />
                  <span>Add Funds</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
