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
import {
  Gavel,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  Vote,
  Plus,
  CheckCircle,
  Target,
} from "lucide-react";

export default function GovernancePortal() {
  // Mock DAO data
  const daoStats = {
    totalMembers: 1847,
    activeProposals: 7,
    treasuryBalance: 125000, // in MAS
    yourVotingPower: 2.3, // percentage
    yourTokens: 450, // staked MAS
    proposalsVoted: 23,
  };

  const activeProposals = [
    {
      id: 1,
      title: "Increase Fact-Checker Reward Pool",
      description:
        "Proposal to increase the reward pool for fact-checkers from 1000 MAS to 1500 MAS monthly to incentivize higher quality verification.",
      proposer: "Sarah Chen",
      status: "active",
      votesFor: 847,
      votesAgainst: 234,
      totalVotes: 1081,
      deadline: "2025-07-30T23:59:59Z",
      category: "Treasury",
    },
    {
      id: 2,
      title: "Implement Article NFT Marketplace",
      description:
        "Create a marketplace for journalists to mint and sell their articles as NFTs, with 5% platform fee going to DAO treasury.",
      proposer: "Marcus Rodriguez",
      status: "active",
      votesFor: 623,
      votesAgainst: 156,
      totalVotes: 779,
      deadline: "2025-07-28T23:59:59Z",
      category: "Feature",
    },
    {
      id: 3,
      title: "Update Reputation Algorithm",
      description:
        "Modify the reputation scoring algorithm to place more weight on fact-checker accuracy and reader engagement metrics.",
      proposer: "Dr. Amara Okafor",
      status: "active",
      votesFor: 445,
      votesAgainst: 387,
      totalVotes: 832,
      deadline: "2025-08-01T23:59:59Z",
      category: "Protocol",
    },
  ];

  const recentProposals = [
    {
      id: 4,
      title: "Reduce Article Verification Threshold",
      status: "passed",
      result: "Implemented",
      votes: { for: 1234, against: 456 },
    },
    {
      id: 5,
      title: "Add Support for Video Content",
      status: "rejected",
      result: "Not Implemented",
      votes: { for: 234, against: 1156 },
    },
    {
      id: 6,
      title: "Launch Bug Bounty Program",
      status: "passed",
      result: "Implemented",
      votes: { for: 1567, against: 123 },
    },
  ];

  const treasuryAllocations = [
    { category: "Fact-Checker Rewards", amount: 35000, percentage: 28 },
    { category: "Platform Development", amount: 31250, percentage: 25 },
    { category: "Journalist Incentives", amount: 25000, percentage: 20 },
    { category: "Marketing & Growth", amount: 18750, percentage: 15 },
    { category: "Security Audits", amount: 12500, percentage: 10 },
    { category: "Reserve Fund", amount: 2500, percentage: 2 },
  ];

  return (
    <div className='min-h-screen bg-[#f8f7f4]'>
      <Navigation />

      {/* Header */}
      <section className='max-w-6xl mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900 font-serif'>
              DAO Governance
            </h1>
            <p className='text-gray-600 mt-2'>
              Shape the future of decentralized journalism through community
              governance
            </p>
          </div>
          <div className='flex items-center space-x-4'>
            <Link
              href='/governance/proposals'
              className='px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center space-x-2'
            >
              <Vote className='h-4 w-4' />
              <span>All Proposals</span>
            </Link>
            <Link
              href='/governance/create'
              className='px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2'
            >
              <Plus className='h-4 w-4' />
              <span>Create Proposal</span>
            </Link>
          </div>
        </div>

        {/* DAO Stats */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8'>
          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Total Members
                </CardTitle>
                <Users className='h-4 w-4 text-blue-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {daoStats.totalMembers.toLocaleString()}
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Active Proposals
                </CardTitle>
                <Gavel className='h-4 w-4 text-orange-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {daoStats.activeProposals}
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Treasury
                </CardTitle>
                <DollarSign className='h-4 w-4 text-green-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {(daoStats.treasuryBalance / 1000).toFixed(0)}K MAS
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Your Power
                </CardTitle>
                <Target className='h-4 w-4 text-purple-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {daoStats.yourVotingPower}%
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Your Stake
                </CardTitle>
                <TrendingUp className='h-4 w-4 text-blue-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {daoStats.yourTokens} MAS
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-sm font-medium text-gray-600'>
                  Votes Cast
                </CardTitle>
                <CheckCircle className='h-4 w-4 text-green-500' />
              </div>
              <div className='text-2xl font-bold text-gray-900'>
                {daoStats.proposalsVoted}
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Active Proposals */}
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-gray-900 font-serif'>
                  Active Proposals
                </h2>
                <Link
                  href='/governance/proposals'
                  className='text-orange-600 hover:text-orange-700 font-medium'
                >
                  View All →
                </Link>
              </div>

              <div className='space-y-4'>
                {activeProposals.map((proposal) => {
                  const support =
                    (proposal.votesFor / proposal.totalVotes) * 100;
                  const timeLeft = Math.ceil(
                    (new Date(proposal.deadline).getTime() -
                      new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  );

                  return (
                    <Card
                      key={proposal.id}
                      className='hover:shadow-lg transition-shadow'
                    >
                      <CardHeader>
                        <div className='flex items-start justify-between'>
                          <div className='flex-1'>
                            <div className='flex items-center space-x-3 mb-2'>
                              <Badge
                                variant='outline'
                                className='bg-orange-50 text-orange-700 border-orange-200'
                              >
                                🗳️ Active
                              </Badge>
                              <Badge variant='secondary' className='text-xs'>
                                {proposal.category}
                              </Badge>
                              <span className='text-sm text-gray-600 flex items-center space-x-1'>
                                <Clock className='h-3 w-3' />
                                <span>{timeLeft} days left</span>
                              </span>
                            </div>

                            <CardTitle className='text-xl font-serif leading-tight mb-2'>
                              <Link
                                href={`/governance/proposal/${proposal.id}`}
                                className='hover:text-gray-700'
                              >
                                {proposal.title}
                              </Link>
                            </CardTitle>

                            <CardDescription className='mb-4'>
                              {proposal.description}
                            </CardDescription>

                            {/* Voting Progress */}
                            <div className='space-y-2 mb-3'>
                              <div className='flex items-center justify-between text-sm'>
                                <span className='text-gray-600'>
                                  Support: {support.toFixed(1)}%
                                </span>
                                <span className='text-gray-600'>
                                  {proposal.totalVotes.toLocaleString()} votes
                                </span>
                              </div>
                              <div className='w-full bg-gray-200 rounded-full h-2'>
                                <div
                                  className='bg-green-500 h-2 rounded-full transition-all duration-300'
                                  style={{ width: `${support}%` }}
                                ></div>
                              </div>
                              <div className='flex items-center justify-between text-xs text-gray-500'>
                                <span>
                                  👍 {proposal.votesFor.toLocaleString()} for
                                </span>
                                <span>
                                  👎 {proposal.votesAgainst.toLocaleString()}{" "}
                                  against
                                </span>
                              </div>
                            </div>

                            <div className='text-sm text-gray-600'>
                              Proposed by{" "}
                              <span className='font-medium'>
                                {proposal.proposer}
                              </span>
                            </div>
                          </div>

                          <div className='ml-4 flex flex-col space-y-2'>
                            <Link
                              href={`/governance/proposal/${proposal.id}`}
                              className='px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors'
                            >
                              Vote For
                            </Link>
                            <Link
                              href={`/governance/proposal/${proposal.id}`}
                              className='px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors'
                            >
                              Vote Against
                            </Link>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* How Governance Works */}
            <div className='bg-gradient-to-r from-orange-50 to-purple-50 rounded-lg p-6'>
              <h3 className='text-xl font-bold text-gray-900 font-serif mb-4'>
                How VeritasChain Governance Works
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900'>
                    1. 🏛️ Token-Weighted Voting
                  </h4>
                  <p className='text-sm text-gray-600'>
                    Voting power is proportional to your staked MAS tokens,
                    ensuring committed members have greater influence.
                  </p>
                </div>
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900'>
                    2. 📝 Proposal Creation
                  </h4>
                  <p className='text-sm text-gray-600'>
                    Any member with sufficient stake can create proposals for
                    platform improvements, treasury allocation, or protocol
                    changes.
                  </p>
                </div>
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900'>
                    3. ⏰ Voting Periods
                  </h4>
                  <p className='text-sm text-gray-600'>
                    Each proposal has a set voting period (typically 7 days) for
                    community deliberation and voting.
                  </p>
                </div>
                <div className='space-y-2'>
                  <h4 className='font-semibold text-gray-900'>
                    4. 🤖 Autonomous Execution
                  </h4>
                  <p className='text-sm text-gray-600'>
                    Passed proposals are automatically executed by Massa&apos;s
                    Autonomous Smart Contracts (ASCs).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Treasury Allocation */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                  <span>Treasury Allocation</span>
                  <Link
                    href='/governance/treasury'
                    className='text-sm text-orange-600 hover:text-orange-700'
                  >
                    Details
                  </Link>
                </CardTitle>
                <CardDescription>How DAO funds are distributed</CardDescription>
              </CardHeader>
              <CardContent className='space-y-3'>
                {treasuryAllocations.map((allocation, index) => (
                  <div key={index} className='space-y-1'>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='font-medium'>{allocation.category}</span>
                      <span className='text-gray-600'>
                        {allocation.percentage}%
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-1.5'>
                      <div
                        className='bg-orange-500 h-1.5 rounded-full'
                        style={{ width: `${allocation.percentage}%` }}
                      ></div>
                    </div>
                    <div className='text-xs text-gray-500'>
                      {allocation.amount.toLocaleString()} MAS
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Proposals */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                  <span>Recent Results</span>
                  <Link
                    href='/governance/history'
                    className='text-sm text-orange-600 hover:text-orange-700'
                  >
                    View All
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                {recentProposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className='space-y-2 p-2 border-l-2 border-gray-200 rounded'
                  >
                    <div className='flex items-center justify-between'>
                      <Badge
                        variant={
                          proposal.status === "passed" ? "default" : "secondary"
                        }
                        className='text-xs'
                      >
                        {proposal.status === "passed"
                          ? "✅ Passed"
                          : "❌ Rejected"}
                      </Badge>
                    </div>
                    <h4 className='font-medium text-sm leading-tight'>
                      {proposal.title}
                    </h4>
                    <div className='text-xs text-gray-600'>
                      {proposal.votes.for.toLocaleString()} for,{" "}
                      {proposal.votes.against.toLocaleString()} against
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Your Governance */}
            <Card>
              <CardHeader>
                <CardTitle>Your Participation</CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>Voting Power</span>
                    <span className='font-medium'>
                      {daoStats.yourVotingPower}%
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>Staked Tokens</span>
                    <span className='font-medium'>
                      {daoStats.yourTokens} MAS
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>
                      Proposals Voted
                    </span>
                    <span className='font-medium'>
                      {daoStats.proposalsVoted}
                    </span>
                  </div>
                </div>

                <div className='pt-3 border-t'>
                  <Link
                    href='/governance/stake'
                    className='w-full flex items-center justify-center space-x-2 text-sm bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition-colors'
                  >
                    <DollarSign className='h-4 w-4' />
                    <span>Increase Stake</span>
                  </Link>
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
                  href='/governance/create'
                  className='flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 p-2 hover:bg-gray-50 rounded'
                >
                  <Plus className='h-4 w-4' />
                  <span>Create Proposal</span>
                </Link>
                <Link
                  href='/governance/active'
                  className='flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 p-2 hover:bg-gray-50 rounded'
                >
                  <Vote className='h-4 w-4' />
                  <span>Vote on Active Proposals</span>
                </Link>
                <Link
                  href='/governance/delegate'
                  className='flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 p-2 hover:bg-gray-50 rounded'
                >
                  <Users className='h-4 w-4' />
                  <span>Delegate Voting Power</span>
                </Link>
                <Link
                  href='/governance/treasury'
                  className='flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 p-2 hover:bg-gray-50 rounded'
                >
                  <DollarSign className='h-4 w-4' />
                  <span>Treasury Overview</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
