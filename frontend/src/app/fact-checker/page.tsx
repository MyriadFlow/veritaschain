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
  CheckCircle,
  AlertTriangle,
  Shield,
  DollarSign,
  Clock,
  Users,
  Target,
  Award,
  TrendingUp,
} from "lucide-react";

export default function FactCheckerPortal() {
  // Mock fact-checker data
  const factCheckerStats = {
    reputation: 92,
    verificationsCompleted: 78,
    accuracy: 94.8, // percentage
    totalEarned: 234.5, // in MAS
    currentStake: 150, // in MAS
    pendingDisputes: 3,
  };

  const pendingVerifications = mockArticles.slice(0, 3);
  const recentVerifications = mockArticles.slice(3, 6);
  const disputedArticles = mockArticles.slice(6, 8);

  return (
    <div className='min-h-screen bg-[#f8f7f4]'>
      <Navigation />

      {/* Header */}
      <section className='max-w-6xl mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900 font-serif'>
              Fact-Checker Portal
            </h1>
            <p className='text-gray-600 mt-2'>
              Verify content accuracy, stake tokens, earn rewards for truth
            </p>
          </div>
          <div className='flex items-center space-x-4'>
            <Link
              href='/verify/pending'
              className='px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center space-x-2'
            >
              <Clock className='h-4 w-4' />
              <span>Pending Reviews</span>
            </Link>
            <Link
              href='/verify/stake'
              className='px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2'
            >
              <DollarSign className='h-4 w-4' />
              <span>Manage Stakes</span>
            </Link>
          </div>
        </div>

        {/* Fact-Checker Stats */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8'>
          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Reputation
                </CardTitle>
                <Award className='h-4 w-4 text-yellow-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {factCheckerStats.reputation}/100
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Verifications
                </CardTitle>
                <CheckCircle className='h-4 w-4 text-green-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {factCheckerStats.verificationsCompleted}
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Accuracy
                </CardTitle>
                <Target className='h-4 w-4 text-blue-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {factCheckerStats.accuracy}%
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Earned
                </CardTitle>
                <TrendingUp className='h-4 w-4 text-green-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {factCheckerStats.totalEarned} MAS
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Staked
                </CardTitle>
                <Shield className='h-4 w-4 text-purple-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {factCheckerStats.currentStake} MAS
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Disputes
                </CardTitle>
                <AlertTriangle className='h-4 w-4 text-orange-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {factCheckerStats.pendingDisputes}
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Pending Verifications */}
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-gray-900 font-serif'>
                  Pending Verifications
                </h2>
                <Link
                  href='/verify/all'
                  className='text-purple-600 hover:text-purple-700 font-medium'
                >
                  View All →
                </Link>
              </div>

              <div className='space-y-4'>
                {pendingVerifications.map((article) => (
                  <Card
                    key={article.id}
                    className='hover:shadow-lg transition-shadow'
                  >
                    <CardHeader>
                      <div className='flex items-start justify-between'>
                        <div className='flex-1'>
                          <div className='flex items-center space-x-3 mb-2'>
                            <Badge
                              variant='outline'
                              className='bg-yellow-50 text-yellow-700 border-yellow-200'
                            >
                              ⏳ Pending Review
                            </Badge>
                            <Badge variant='secondary' className='text-xs'>
                              {article.category}
                            </Badge>
                          </div>

                          <CardTitle className='text-xl font-serif leading-tight mb-2'>
                            <Link
                              href={`/verify/${article.id}`}
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
                              <span>
                                Published{" "}
                                {new Date(
                                  article.publishedAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className='text-green-600 font-medium'>
                              Reward: 5-15 MAS
                            </div>
                          </div>
                        </div>

                        <div className='ml-4 flex flex-col space-y-2'>
                          <Link
                            href={`/verify/${article.id}`}
                            className='px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors'
                          >
                            Verify
                          </Link>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Disputed Articles */}
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-gray-900 font-serif'>
                  Active Disputes
                </h2>
                <Link
                  href='/disputes'
                  className='text-orange-600 hover:text-orange-700 font-medium'
                >
                  View All →
                </Link>
              </div>

              <div className='space-y-4'>
                {disputedArticles.map((article) => (
                  <Card
                    key={article.id}
                    className='border-orange-200 bg-orange-50'
                  >
                    <CardHeader>
                      <div className='flex items-start justify-between'>
                        <div className='flex-1'>
                          <div className='flex items-center space-x-3 mb-2'>
                            <Badge
                              variant='outline'
                              className='bg-orange-100 text-orange-800 border-orange-300'
                            >
                              ⚠️ Disputed
                            </Badge>
                            <Badge variant='secondary' className='text-xs'>
                              {article.category}
                            </Badge>
                          </div>

                          <CardTitle className='text-xl font-serif leading-tight mb-2'>
                            <Link
                              href={`/dispute/${article.id}`}
                              className='hover:text-gray-700'
                            >
                              {article.title}
                            </Link>
                          </CardTitle>

                          <CardDescription className='mb-3'>
                            Community has flagged potential accuracy issues.
                            Resolution needed.
                          </CardDescription>

                          <div className='flex items-center justify-between text-sm text-gray-600'>
                            <div className='flex items-center space-x-4'>
                              <span>Staked: 45 MAS</span>
                              <span>Votes: 12 for, 8 against</span>
                              <span>⏰ 2 days left</span>
                            </div>
                          </div>
                        </div>

                        <div className='ml-4 flex flex-col space-y-2'>
                          <Link
                            href={`/dispute/${article.id}`}
                            className='px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700 transition-colors'
                          >
                            Review
                          </Link>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className='bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6'>
              <h3 className='text-xl font-bold text-gray-900 font-serif mb-4'>
                How Fact-Checking Works on VeritasChain
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900'>
                    1. 🔍 Review Content
                  </h4>
                  <p className='text-sm text-gray-600'>
                    Examine articles for factual accuracy, source verification,
                    and journalistic standards.
                  </p>
                </div>
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900'>
                    2. 💰 Stake Tokens
                  </h4>
                  <p className='text-sm text-gray-600'>
                    Put MAS tokens at stake to back your verification decision -
                    accuracy or dispute.
                  </p>
                </div>
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900'>
                    3. 🏆 Earn Rewards
                  </h4>
                  <p className='text-sm text-gray-600'>
                    Successful verifications earn you rewards and increase your
                    fact-checker reputation.
                  </p>
                </div>
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900'>
                    4. ⚖️ Resolve Disputes
                  </h4>
                  <p className='text-sm text-gray-600'>
                    Participate in community voting to resolve disputed content
                    and maintain platform integrity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Recent Verifications */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                  <span>Recent Verifications</span>
                  <Link
                    href='/verify/history'
                    className='text-sm text-purple-600 hover:text-purple-700'
                  >
                    View All
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                {recentVerifications.map((article) => (
                  <div
                    key={article.id}
                    className='space-y-2 p-2 border-l-2 border-green-200 bg-green-50 rounded'
                  >
                    <div className='flex items-center justify-between'>
                      <Badge
                        variant='outline'
                        className='bg-green-100 text-green-800 text-xs'
                      >
                        ✅ Verified
                      </Badge>
                      <span className='text-xs text-gray-600'>+12 MAS</span>
                    </div>
                    <h4 className='font-medium text-sm leading-tight'>
                      {article.title}
                    </h4>
                    <div className='text-xs text-gray-600'>
                      Verified{" "}
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Fact-Checker Guilds */}
            <Card>
              <CardHeader>
                <CardTitle>Fact-Checker Guilds</CardTitle>
                <CardDescription>
                  Specialized verification groups
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='p-3 border rounded-lg hover:bg-gray-50 cursor-pointer'>
                  <div className='flex items-center justify-between mb-1'>
                    <h4 className='font-medium text-sm'>Science & Health</h4>
                    <Badge variant='outline' className='text-xs'>
                      Member
                    </Badge>
                  </div>
                  <p className='text-xs text-gray-600'>
                    34 active fact-checkers
                  </p>
                </div>

                <div className='p-3 border rounded-lg hover:bg-gray-50 cursor-pointer'>
                  <div className='flex items-center justify-between mb-1'>
                    <h4 className='font-medium text-sm'>Finance & Economics</h4>
                    <Badge variant='outline' className='text-xs'>
                      Join
                    </Badge>
                  </div>
                  <p className='text-xs text-gray-600'>
                    28 active fact-checkers
                  </p>
                </div>

                <div className='p-3 border rounded-lg hover:bg-gray-50 cursor-pointer'>
                  <div className='flex items-center justify-between mb-1'>
                    <h4 className='font-medium text-sm'>Environment</h4>
                    <Badge variant='outline' className='text-xs'>
                      Join
                    </Badge>
                  </div>
                  <p className='text-xs text-gray-600'>
                    19 active fact-checkers
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <Link
                  href='/verify/pending'
                  className='flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 p-2 hover:bg-gray-50 rounded'
                >
                  <Clock className='h-4 w-4' />
                  <span>Review Pending Articles</span>
                </Link>
                <Link
                  href='/disputes'
                  className='flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 p-2 hover:bg-gray-50 rounded'
                >
                  <AlertTriangle className='h-4 w-4' />
                  <span>Active Disputes</span>
                </Link>
                <Link
                  href='/verify/stake'
                  className='flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 p-2 hover:bg-gray-50 rounded'
                >
                  <Shield className='h-4 w-4' />
                  <span>Manage Stakes</span>
                </Link>
                <Link
                  href='/guilds'
                  className='flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 p-2 hover:bg-gray-50 rounded'
                >
                  <Users className='h-4 w-4' />
                  <span>Join Guilds</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
