"use client";

import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { mockArticles } from "@/lib/mock-data";
import {
  PenTool,
  CheckCircle,
  Users,
  Shield,
  TrendingUp,
  FileText,
  Vote,
  Coins,
  Gavel,
} from "lucide-react";

export default function HomePage() {
  const featuredArticle = mockArticles[0];
  const popularArticles = mockArticles.slice(1, 4);

  return (
    <div className='min-h-screen bg-[#f8f7f4]'>
      <Navigation />

      {/* Hero Section - VeritasChain Mission */}
      <section className='max-w-6xl mx-auto px-4 py-12'>
        <div className='text-center space-y-8 mb-16'>
          <div className='space-y-4'>
            <h1 className='text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-serif'>
              VeritasChain
            </h1>
            <p className='text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed'>
              Decentralized journalism platform empowering independent
              reporters, combating misinformation, and restoring trust through
              blockchain transparency
            </p>
          </div>

          <div className='flex flex-wrap justify-center gap-4'>
            <Link
              href='/journalist'
              className='px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2'
            >
              <PenTool className='h-4 w-4' />
              <span>For Journalists</span>
            </Link>
            <Link
              href='/reader'
              className='px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2'
            >
              <FileText className='h-4 w-4' />
              <span>For Readers</span>
            </Link>
            <Link
              href='/fact-checker'
              className='px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2'
            >
              <CheckCircle className='h-4 w-4' />
              <span>For Fact-Checkers</span>
            </Link>
            <Link
              href='/governance'
              className='px-6 py-3 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2'
            >
              <Gavel className='h-4 w-4' />
              <span>DAO Governance</span>
            </Link>
          </div>
        </div>

        {/* Featured Article */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div className='space-y-8'>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3 text-sm'>
                <Badge
                  variant='secondary'
                  className='bg-red-100 text-red-800 font-medium'
                >
                  FEATURED
                </Badge>
                <Badge
                  variant='outline'
                  className='flex items-center space-x-1'
                >
                  <Shield className='h-3 w-3' />
                  <span>Verified</span>
                </Badge>
                <span className='text-gray-600'>
                  {new Date(featuredArticle.publishedAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>

              <h2 className='text-4xl font-bold text-gray-900 leading-tight font-serif'>
                {featuredArticle.title}
              </h2>

              <p className='text-xl text-gray-700 leading-relaxed'>
                {featuredArticle.excerpt}
              </p>

              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
                  <div>
                    <p className='font-medium text-gray-900'>
                      {featuredArticle.author.name}
                    </p>
                    <p className='text-sm text-gray-600'>
                      Reputation: {featuredArticle.author.reputation}/100
                    </p>
                  </div>
                </div>
                <div className='flex items-center space-x-2 text-sm text-gray-600'>
                  <span>👍 {featuredArticle.upvotes}</span>
                  <span>👁️ {featuredArticle.voteCount}</span>
                  <span>
                    💰{" "}
                    {featuredArticle.price
                      ? `${featuredArticle.price} MAS`
                      : "Free"}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href={`/article/${featuredArticle.id}`}
              className='inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors'
            >
              Read Full Article
              <svg
                className='ml-2 w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </Link>
          </div>

          <div className='aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden'>
            <div className='w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center'>
              <span className='text-gray-600 font-medium'>
                Featured Article Image
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className='bg-white py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8 text-center'>
            <div className='space-y-2'>
              <div className='text-3xl font-bold text-gray-900'>2,847</div>
              <div className='text-gray-600 font-medium'>
                Articles Published
              </div>
            </div>
            <div className='space-y-2'>
              <div className='text-3xl font-bold text-gray-900'>1,293</div>
              <div className='text-gray-600 font-medium'>
                Verified Journalists
              </div>
            </div>
            <div className='space-y-2'>
              <div className='text-3xl font-bold text-gray-900'>98.7%</div>
              <div className='text-gray-600 font-medium'>Accuracy Rate</div>
            </div>
            <div className='space-y-2'>
              <div className='text-3xl font-bold text-gray-900'>$847K</div>
              <div className='text-gray-600 font-medium'>
                Paid to Journalists
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Flow Sections - The Key Alignment */}
      <section className='max-w-6xl mx-auto px-4 py-16'>
        <div className='text-center space-y-4 mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 font-serif'>
            How VeritasChain Works
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Four key user roles work together to create a transparent,
            decentralized journalism ecosystem
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Journalist Flow */}
          <div className='bg-blue-50 p-8 rounded-lg space-y-4'>
            <div className='flex items-center space-x-3'>
              <div className='w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center'>
                <PenTool className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-xl font-bold text-gray-900'>Journalists</h3>
            </div>
            <ul className='space-y-2 text-gray-700'>
              <li>• Publish articles with IPFS content storage</li>
              <li>• Build on-chain reputation through community feedback</li>
              <li>• Earn MAS tokens through micropayments and tips</li>
              <li>• Mint articles as NFTs for exclusive ownership</li>
              <li>• Join Newsroom DAOs for collaborative projects</li>
            </ul>
            <div className='flex items-center space-x-4'>
              <Link
                href='/publish'
                className='inline-block text-blue-600 font-medium hover:text-blue-700'
              >
                Start Publishing →
              </Link>
              <Link
                href='/journalist'
                className='inline-block text-blue-600 font-medium hover:text-blue-700'
              >
                Dashboard →
              </Link>
            </div>
          </div>

          {/* Reader Flow */}
          <div className='bg-green-50 p-8 rounded-lg space-y-4'>
            <div className='flex items-center space-x-3'>
              <div className='w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center'>
                <FileText className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-xl font-bold text-gray-900'>Readers</h3>
            </div>
            <ul className='space-y-2 text-gray-700'>
              <li>• Browse verified, censorship-resistant articles</li>
              <li>• Pay for premium content with micropayments</li>
              <li>• Tip journalists directly for quality reporting</li>
              <li>• Vote on content quality and accuracy</li>
              <li>• Support fact-checking initiatives</li>
            </ul>
            <div className='flex items-center space-x-4'>
              <Link
                href='/articles'
                className='inline-block text-green-600 font-medium hover:text-green-700'
              >
                Browse Articles →
              </Link>
              <Link
                href='/reader'
                className='inline-block text-green-600 font-medium hover:text-green-700'
              >
                Reader Hub →
              </Link>
            </div>
          </div>

          {/* Fact-Checker Flow */}
          <div className='bg-purple-50 p-8 rounded-lg space-y-4'>
            <div className='flex items-center space-x-3'>
              <div className='w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center'>
                <CheckCircle className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-xl font-bold text-gray-900'>Fact-Checkers</h3>
            </div>
            <ul className='space-y-2 text-gray-700'>
              <li>• Stake tokens to verify content accuracy</li>
              <li>• Earn rewards for successful verification</li>
              <li>• Participate in dispute resolution processes</li>
              <li>• Join specialized Fact-Checking Guilds</li>
              <li>• Build reputation through accurate assessments</li>
            </ul>
            <div className='flex items-center space-x-4'>
              <Link
                href='/verify'
                className='inline-block text-purple-600 font-medium hover:text-purple-700'
              >
                Start Verifying →
              </Link>
              <Link
                href='/fact-checker'
                className='inline-block text-purple-600 font-medium hover:text-purple-700'
              >
                Fact-Checker Portal →
              </Link>
            </div>
          </div>

          {/* DAO Governance Flow */}
          <div className='bg-orange-50 p-8 rounded-lg space-y-4'>
            <div className='flex items-center space-x-3'>
              <div className='w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center'>
                <Gavel className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-xl font-bold text-gray-900'>DAO Members</h3>
            </div>
            <ul className='space-y-2 text-gray-700'>
              <li>• Vote on platform governance proposals</li>
              <li>• Manage community treasury allocation</li>
              <li>• Set dispute resolution parameters</li>
              <li>• Guide platform evolution and features</li>
              <li>• Participate in token-weighted decisions</li>
            </ul>
            <div className='flex items-center space-x-4'>
              <Link
                href='/proposals'
                className='inline-block text-orange-600 font-medium hover:text-orange-700'
              >
                View Proposals →
              </Link>
              <Link
                href='/governance'
                className='inline-block text-orange-600 font-medium hover:text-orange-700'
              >
                Governance Portal →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className='bg-gray-50 py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='space-y-12'>
            <div className='text-center space-y-4'>
              <h2 className='text-3xl font-bold text-gray-900 font-serif'>
                Latest Verified Articles
              </h2>
              <p className='text-gray-600 max-w-2xl mx-auto'>
                Community-verified journalism from independent reporters
                worldwide
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {popularArticles.map((article) => (
                <article
                  key={article.id}
                  className='bg-white p-6 rounded-lg shadow-sm space-y-4'
                >
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between text-sm'>
                      <Badge
                        variant='secondary'
                        className='bg-green-100 text-green-800 text-xs font-medium'
                      >
                        VERIFIED
                      </Badge>
                      <span className='text-gray-500'>
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className='text-xl font-bold text-gray-900 leading-tight font-serif'>
                      <Link
                        href={`/article/${article.id}`}
                        className='hover:text-gray-700'
                      >
                        {article.title}
                      </Link>
                    </h3>

                    <p className='text-gray-600 text-sm leading-relaxed'>
                      {article.excerpt}
                    </p>

                    <div className='flex items-center justify-between pt-2 border-t'>
                      <div className='flex items-center space-x-2'>
                        <div className='w-6 h-6 bg-gray-300 rounded-full'></div>
                        <span className='text-sm font-medium text-gray-900'>
                          {article.author.name}
                        </span>
                      </div>
                      <div className='flex items-center space-x-3 text-sm text-gray-600'>
                        <span>👍 {article.upvotes}</span>
                        <span>👁️ {article.voteCount}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className='text-center'>
              <Link
                href='/articles'
                className='inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors'
              >
                View All Articles
                <svg
                  className='ml-2 w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Features - Massa Alignment */}
      <section className='max-w-6xl mx-auto px-4 py-16'>
        <div className='text-center space-y-4 mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 font-serif'>
            Built on Massa Blockchain
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Leveraging Massa&apos;s unique features for the future of
            decentralized journalism
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <Card className='border-0 shadow-lg hover:shadow-xl transition-shadow'>
            <CardHeader>
              <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
                <Shield className='h-6 w-6 text-blue-600' />
              </div>
              <CardTitle>Autonomous Smart Contracts</CardTitle>
              <CardDescription>
                Self-executing verification processes, automated reputation
                updates, and scheduled content curation without manual triggers.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className='border-0 shadow-lg hover:shadow-xl transition-shadow'>
            <CardHeader>
              <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4'>
                <TrendingUp className='h-6 w-6 text-green-600' />
              </div>
              <CardTitle>DeWeb Hosting</CardTitle>
              <CardDescription>
                Complete decentralization with frontend hosted on-chain.
                Censorship-resistant access via .massa domains.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className='border-0 shadow-lg hover:shadow-xl transition-shadow'>
            <CardHeader>
              <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4'>
                <Coins className='h-6 w-6 text-purple-600' />
              </div>
              <CardTitle>Micropayments</CardTitle>
              <CardDescription>
                Low-fee transactions enable viable micropayments for content
                access, journalist tipping, and subscription models.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className='border-0 shadow-lg hover:shadow-xl transition-shadow'>
            <CardHeader>
              <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4'>
                <Users className='h-6 w-6 text-orange-600' />
              </div>
              <CardTitle>Parallel Processing</CardTitle>
              <CardDescription>
                32 parallel threads support high-throughput verification voting,
                massive community governance participation.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className='border-0 shadow-lg hover:shadow-xl transition-shadow'>
            <CardHeader>
              <div className='w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4'>
                <CheckCircle className='h-6 w-6 text-red-600' />
              </div>
              <CardTitle>Immutable Provenance</CardTitle>
              <CardDescription>
                Permanent record of article history, edits, and verification
                status with cryptographic source attribution.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className='border-0 shadow-lg hover:shadow-xl transition-shadow'>
            <CardHeader>
              <div className='w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4'>
                <Vote className='h-6 w-6 text-teal-600' />
              </div>
              <CardTitle>DAO Governance</CardTitle>
              <CardDescription>
                Token-weighted voting, automated proposal execution, and
                community-driven platform evolution.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-black text-white py-16'>
        <div className='max-w-4xl mx-auto px-4 text-center space-y-8'>
          <div className='space-y-4'>
            <h2 className='text-3xl lg:text-4xl font-bold font-serif'>
              Join the Truth Revolution
            </h2>
            <p className='text-xl text-gray-300 leading-relaxed'>
              Whether you&apos;re a journalist, fact-checker, or truth-seeker,
              VeritasChain empowers transparent, community-verified journalism
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/publish'
              className='px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition-colors'
            >
              Start Publishing
            </Link>
            <Link
              href='/connect'
              className='px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:text-black transition-colors'
            >
              Connect Wallet
            </Link>
            <Link
              href='/verify'
              className='px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:text-black transition-colors'
            >
              Start Fact-Checking
            </Link>
          </div>

          <p className='text-sm text-gray-400'>
            Decentralized • Censorship-resistant • Community-verified • Built on
            Massa
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-white border-t border-gray-200 py-12'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='grid md:grid-cols-4 gap-8'>
            <div>
              <div className='flex items-center space-x-2 mb-4'>
                <div className='w-6 h-6 bg-gray-900 rounded-sm flex items-center justify-center'>
                  <span className='text-white font-bold text-xs'>V</span>
                </div>
                <span className='font-serif text-lg font-semibold'>
                  VeritasChain
                </span>
              </div>
              <p className='text-sm text-gray-600'>
                Decentralized journalism platform powered by Massa blockchain
                technology.
              </p>
            </div>

            <div>
              <h3 className='font-medium text-gray-900 mb-4'>For Users</h3>
              <ul className='space-y-2 text-sm text-gray-600'>
                <li>
                  <Link href='/journalist' className='hover:text-gray-900'>
                    Journalist Dashboard
                  </Link>
                </li>
                <li>
                  <Link href='/reader' className='hover:text-gray-900'>
                    Reader Hub
                  </Link>
                </li>
                <li>
                  <Link href='/fact-checker' className='hover:text-gray-900'>
                    Fact-Checker Portal
                  </Link>
                </li>
                <li>
                  <Link href='/governance' className='hover:text-gray-900'>
                    DAO Governance
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='font-medium text-gray-900 mb-4'>Platform</h3>
              <ul className='space-y-2 text-sm text-gray-600'>
                <li>
                  <Link href='/articles' className='hover:text-gray-900'>
                    All Articles
                  </Link>
                </li>
                <li>
                  <Link href='/authors' className='hover:text-gray-900'>
                    Authors
                  </Link>
                </li>
                <li>
                  <Link href='/publish' className='hover:text-gray-900'>
                    Publish
                  </Link>
                </li>
                <li>
                  <Link href='/verify' className='hover:text-gray-900'>
                    Verification
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='font-medium text-gray-900 mb-4'>Community</h3>
              <ul className='space-y-2 text-sm text-gray-600'>
                <li>
                  <Link href='/about' className='hover:text-gray-900'>
                    About
                  </Link>
                </li>
                <li>
                  <Link href='/documentation' className='hover:text-gray-900'>
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href='/contact' className='hover:text-gray-900'>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href='/support' className='hover:text-gray-900'>
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='border-t border-gray-200 mt-8 pt-8 text-center'>
            <p className='text-sm text-gray-600'>
              © 2024 VeritasChain. Empowering truth through decentralization.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
