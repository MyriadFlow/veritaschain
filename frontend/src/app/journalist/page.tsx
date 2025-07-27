"use client";

import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useWallet } from "@/lib/wallet-provider";
import {
  veritasChainService,
  Article,
  JournalistStats,
} from "@/lib/veritas-service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
  const { isConnected, address, connect, loading, provider } = useWallet();
  const [journalistStats, setJournalistStats] =
    useState<JournalistStats | null>(null);
  const [myArticles, setMyArticles] = useState<Article[]>([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingArticles, setLoadingArticles] = useState(false);

  // Set wallet in service when connected
  useEffect(() => {
    if (isConnected && provider) {
      veritasChainService.setWallet(provider);
    }
  }, [isConnected, provider]);

  // Load journalist stats when connected
  useEffect(() => {
    const loadData = async () => {
      if (isConnected && address) {
        try {
          setLoadingStats(true);
          setLoadingArticles(true);

          // Load stats and articles in parallel from real blockchain
          const [stats, articles] = await Promise.all([
            veritasChainService.getJournalistStats(address),
            veritasChainService.getArticlesByAuthor(address),
          ]);

          setJournalistStats(stats);
          setMyArticles(articles.slice(0, 3)); // Show only latest 3 on dashboard

          // Show success message
          toast.success("Dashboard data loaded successfully!");
        } catch (error) {
          console.error(
            "Error loading journalist data from blockchain:",
            error
          );
          toast.error("Failed to load dashboard data. Please try again.");
        } finally {
          setLoadingStats(false);
          setLoadingArticles(false);
        }
      }
    };

    loadData();
  }, [isConnected, address]);

  // Use real blockchain data instead of mock data
  const currentJournalist = {
    name: journalistStats ? "Verified Journalist" : "Journalist",
    address: address || "Not connected",
    reputation: journalistStats?.reputation || 0,
    articlesPublished: journalistStats?.articlesPublished || 0,
    totalEarnings: journalistStats?.totalEarnings || "0",
    followers: journalistStats?.followers || 0,
    verificationRate: journalistStats?.verificationRate || 0,
  };

  // Show connection prompt if not connected
  if (!isConnected) {
    return (
      <div className='min-h-screen bg-[#f8f7f4]'>
        <Navigation />
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center'>
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-8'>
            <PenTool className='h-16 w-16 text-blue-600 mx-auto mb-6' />
            <h1 className='font-serif text-3xl font-bold text-gray-900 mb-4'>
              Welcome to VeritasChain
            </h1>
            <p className='text-gray-600 mb-6 max-w-2xl mx-auto'>
              Connect your Massa wallet to access your journalist dashboard,
              publish articles, track earnings, and build your reputation in the
              decentralized journalism ecosystem.
            </p>
            <Button
              size='lg'
              className='bg-blue-600 hover:bg-blue-700'
              onClick={connect}
              disabled={loading}
            >
              {loading ? "Connecting..." : "Connect Massa Wallet"}
            </Button>
            <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left'>
              <div className='bg-white p-4 rounded-lg shadow-sm'>
                <h3 className='font-semibold text-gray-900 mb-2'>
                  🔒 Censorship Resistant
                </h3>
                <p className='text-sm text-gray-600'>
                  Your content is stored on IPFS and Massa blockchain, making it
                  impossible to censor.
                </p>
              </div>
              <div className='bg-white p-4 rounded-lg shadow-sm'>
                <h3 className='font-semibold text-gray-900 mb-2'>
                  💰 Direct Monetization
                </h3>
                <p className='text-sm text-gray-600'>
                  Earn MAS tokens directly from readers through micropayments
                  and tips.
                </p>
              </div>
              <div className='bg-white p-4 rounded-lg shadow-sm'>
                <h3 className='font-semibold text-gray-900 mb-2'>
                  ⭐ Build Reputation
                </h3>
                <p className='text-sm text-gray-600'>
                  Community verification builds your on-chain reputation and
                  credibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              Welcome back, {currentJournalist.name}
            </p>
            <p className='text-xs text-gray-500 mt-1'>
              Wallet: {currentJournalist.address}
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
                {loadingStats ? "..." : `${currentJournalist.reputation}/100`}
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
                {loadingStats ? "..." : currentJournalist.articlesPublished}
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
                {loadingStats
                  ? "..."
                  : `${currentJournalist.totalEarnings} MAS`}
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
                {loadingStats
                  ? "..."
                  : currentJournalist.followers.toLocaleString()}
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
            {loadingArticles ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className='animate-pulse'>
                  <CardHeader>
                    <div className='flex items-center justify-between mb-2'>
                      <div className='h-4 bg-gray-200 rounded w-20'></div>
                      <div className='h-4 w-4 bg-gray-200 rounded'></div>
                    </div>
                    <div className='h-6 bg-gray-200 rounded w-3/4 mb-2'></div>
                    <div className='h-4 bg-gray-200 rounded w-full'></div>
                  </CardHeader>
                  <CardContent>
                    <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                  </CardContent>
                </Card>
              ))
            ) : myArticles.length > 0 ? (
              myArticles.map((article) => (
                <Card
                  key={article.id}
                  className='hover:shadow-lg transition-shadow'
                >
                  <CardHeader>
                    <div className='flex items-center justify-between mb-2'>
                      <Badge
                        variant={
                          article.status === "verified"
                            ? "default"
                            : "secondary"
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
                      {new Date(
                        article.publishedAt || article.timestamp
                      ).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Empty state
              <div className='col-span-full text-center py-8'>
                <PenTool className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  No articles yet
                </h3>
                <p className='text-gray-600 mb-4'>
                  Start your journalism journey by publishing your first article
                </p>
                <Link
                  href='/publish'
                  className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
                >
                  <Plus className='h-4 w-4 mr-2' />
                  Publish First Article
                </Link>
              </div>
            )}
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
