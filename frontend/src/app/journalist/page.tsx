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
  PenTool,
  DollarSign,
  Eye,
  TrendingUp,
  Plus,
  Edit,
  Users,
  Star,
} from "lucide-react";

export default function JournalistDashboard() {
  // Mock data for current journalist
  const currentJournalist = {
    name: "Sarah Chen",
    reputation: 87,
    articlesPublished: 42,
    totalEarnings: 1247.5, // in MAS
    followers: 2834,
    verificationRate: 95.2,
  };

  const myArticles = mockArticles.slice(0, 3); // Mock articles by current journalist

  return (
    <div className='min-h-screen bg-[#f8f7f4]'>
      <Navigation />

      {/* Header */}
      <section className='max-w-6xl mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900 font-serif'>
              Journalist Dashboard
            </h1>
            <p className='text-gray-600 mt-2'>
              Manage your articles, track earnings, and build your reputation
            </p>
          </div>
          <Link
            href='/publish'
            className='px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2'
          >
            <Plus className='h-4 w-4' />
            <span>New Article</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Reputation Score
                </CardTitle>
                <Star className='h-4 w-4 text-yellow-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {currentJournalist.reputation}/100
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Articles Published
                </CardTitle>
                <PenTool className='h-4 w-4 text-blue-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {currentJournalist.articlesPublished}
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Total Earnings
                </CardTitle>
                <DollarSign className='h-4 w-4 text-green-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {currentJournalist.totalEarnings} MAS
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Followers
                </CardTitle>
                <Users className='h-4 w-4 text-purple-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {currentJournalist.followers.toLocaleString()}
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
            <CardHeader>
              <div className='flex items-center space-x-3'>
                <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <PenTool className='h-5 w-5 text-blue-600' />
                </div>
                <div>
                  <CardTitle className='text-lg'>Publish Article</CardTitle>
                  <CardDescription>
                    Create and publish new journalism content
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
            <CardHeader>
              <div className='flex items-center space-x-3'>
                <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
                  <TrendingUp className='h-5 w-5 text-green-600' />
                </div>
                <div>
                  <CardTitle className='text-lg'>Analytics</CardTitle>
                  <CardDescription>
                    View article performance and engagement
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
            <CardHeader>
              <div className='flex items-center space-x-3'>
                <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center'>
                  <DollarSign className='h-5 w-5 text-purple-600' />
                </div>
                <div>
                  <CardTitle className='text-lg'>Earnings</CardTitle>
                  <CardDescription>
                    Track payments and withdraw funds
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* My Articles */}
        <div className='space-y-6'>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-bold text-gray-900 font-serif'>
              My Articles
            </h2>
            <Link
              href='/articles/manage'
              className='text-blue-600 hover:text-blue-700 font-medium'
            >
              View All →
            </Link>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {myArticles.map((article) => (
              <Card
                key={article.id}
                className='hover:shadow-lg transition-shadow'
              >
                <CardHeader>
                  <div className='flex items-center justify-between mb-2'>
                    <Badge
                      variant={
                        article.status === "verified" ? "default" : "secondary"
                      }
                    >
                      {article.status.toUpperCase()}
                    </Badge>
                    <Link href={`/article/${article.id}/edit`}>
                      <Edit className='h-4 w-4 text-gray-500 hover:text-gray-700' />
                    </Link>
                  </div>

                  <CardTitle className='text-lg font-serif leading-tight'>
                    <Link
                      href={`/article/${article.id}`}
                      className='hover:text-gray-700'
                    >
                      {article.title}
                    </Link>
                  </CardTitle>

                  <CardDescription className='line-clamp-2'>
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className='flex items-center justify-between text-sm text-gray-600'>
                    <div className='flex items-center space-x-4'>
                      <span className='flex items-center space-x-1'>
                        <Eye className='h-3 w-3' />
                        <span>{article.voteCount}</span>
                      </span>
                      <span>👍 {article.upvotes}</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <DollarSign className='h-3 w-3' />
                      <span>
                        {article.price ? `${article.price} MAS` : "Free"}
                      </span>
                    </div>
                  </div>

                  <div className='mt-3 text-xs text-gray-500'>
                    Published{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* VeritasChain Journalist Benefits */}
        <div className='mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8'>
          <h3 className='text-2xl font-bold text-gray-900 font-serif mb-4'>
            Why Publish on VeritasChain?
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='space-y-2'>
              <h4 className='font-semibold text-gray-900'>
                🔒 Censorship Resistance
              </h4>
              <p className='text-sm text-gray-600'>
                Your content is stored on IPFS and Massa blockchain, making it
                impossible to censor or delete.
              </p>
            </div>
            <div className='space-y-2'>
              <h4 className='font-semibold text-gray-900'>
                💰 Direct Monetization
              </h4>
              <p className='text-sm text-gray-600'>
                Earn MAS tokens directly from readers through micropayments,
                tips, and subscriptions.
              </p>
            </div>
            <div className='space-y-2'>
              <h4 className='font-semibold text-gray-900'>
                ⭐ Build Reputation
              </h4>
              <p className='text-sm text-gray-600'>
                Community verification builds your on-chain reputation,
                increasing trust and readership.
              </p>
            </div>
            <div className='space-y-2'>
              <h4 className='font-semibold text-gray-900'>🏛️ Join DAOs</h4>
              <p className='text-sm text-gray-600'>
                Collaborate with other journalists in Newsroom DAOs for
                investigative projects.
              </p>
            </div>
            <div className='space-y-2'>
              <h4 className='font-semibold text-gray-900'>🎨 NFT Articles</h4>
              <p className='text-sm text-gray-600'>
                Mint exclusive articles as NFTs for collectors and premium
                supporters.
              </p>
            </div>
            <div className='space-y-2'>
              <h4 className='font-semibold text-gray-900'>
                📊 Transparent Analytics
              </h4>
              <p className='text-sm text-gray-600'>
                All engagement metrics are verifiable on-chain, providing true
                performance insights.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
