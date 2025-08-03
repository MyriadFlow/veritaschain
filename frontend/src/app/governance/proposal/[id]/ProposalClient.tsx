"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Calendar,
  User,
  FileText,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

interface Proposal {
  id: string;
  title: string;
  description: string;
  author: string;
  category: "Policy" | "Budget" | "Technical" | "Community";
  status: "active" | "passed" | "rejected" | "pending";
  createdDate: string;
  votingEndDate: string;
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  requiredQuorum: number;
  participationRate: number;
  stakingReward: number;
  discussionCount: number;
  attachments: string[];
  timeline: {
    phase: string;
    date: string;
    status: "completed" | "active" | "pending";
    description: string;
  }[];
  votingHistory: {
    address: string;
    vote: "for" | "against";
    stake: number;
    timestamp: string;
    comment?: string;
  }[];
}

const mockProposal: Proposal = {
  id: "1",
  title: "Implement Dynamic Fee Structure for High-Priority Articles",
  description: `This proposal aims to implement a dynamic fee structure that adjusts publication fees based on article priority, category, and network congestion. The goal is to:

1. Reduce spam and low-quality content
2. Prioritize high-quality journalism during peak times
3. Generate sustainable revenue for platform maintenance
4. Reward fact-checkers with higher stakes for priority content

The proposed fee structure would range from 0.5 MASSA for standard articles to 5 MASSA for high-priority breaking news, with automatic adjustments based on network activity.

Technical implementation will require updates to the PaymentGateway smart contract and integration with the Massa network's fee estimation APIs.`,
  author: "governance.proposer",
  category: "Policy",
  status: "active",
  createdDate: "2024-12-15",
  votingEndDate: "2024-12-29",
  votesFor: 2847,
  votesAgainst: 892,
  totalVotes: 3739,
  requiredQuorum: 5000,
  participationRate: 74.78,
  stakingReward: 150,
  discussionCount: 47,
  attachments: [
    "fee-structure-analysis.pdf",
    "economic-impact-model.xlsx",
    "technical-specification.md",
  ],
  timeline: [
    {
      phase: "Proposal Submitted",
      date: "2024-12-15",
      status: "completed",
      description: "Initial proposal submitted with technical specifications",
    },
    {
      phase: "Community Discussion",
      date: "2024-12-16",
      status: "completed",
      description: "7-day discussion period for community feedback",
    },
    {
      phase: "Voting Period",
      date: "2024-12-23",
      status: "active",
      description: "14-day voting period for governance token holders",
    },
    {
      phase: "Implementation",
      date: "2024-12-30",
      status: "pending",
      description: "Smart contract deployment and system integration",
    },
  ],
  votingHistory: [
    {
      address: "AU12xvKn...9mHp",
      vote: "for",
      stake: 500,
      timestamp: "2024-12-23T14:30:00Z",
      comment: "This will significantly improve content quality",
    },
    {
      address: "AU1fG8vL...2nKw",
      vote: "against",
      stake: 250,
      timestamp: "2024-12-23T16:45:00Z",
      comment: "Fees might be too high for independent journalists",
    },
    {
      address: "AU19Kn2x...7rTm",
      vote: "for",
      stake: 1000,
      timestamp: "2024-12-24T09:15:00Z",
    },
  ],
};

export default function ProposalClient({ params }: Props) {
  const [userVote, setUserVote] = useState<"for" | "against" | null>(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [voteComment, setVoteComment] = useState("");
  const [isVoting, setIsVoting] = useState(false);
  const [showVotingHistory, setShowVotingHistory] = useState(false);

  const proposal = mockProposal; // In real app, fetch by params.id

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800";
      case "passed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Policy":
        return "bg-purple-100 text-purple-800";
      case "Budget":
        return "bg-green-100 text-green-800";
      case "Technical":
        return "bg-blue-100 text-blue-800";
      case "Community":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleVote = async () => {
    if (!userVote || !stakeAmount) return;

    setIsVoting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert(`Vote "${userVote}" submitted with ${stakeAmount} MASSA stake!`);
    setIsVoting(false);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const votingProgress =
    (proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100;
  const quorumProgress = (proposal.totalVotes / proposal.requiredQuorum) * 100;

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      <Navigation />

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <Link href='/governance'>
              <Button
                variant='ghost'
                className='mb-4 text-slate-600 hover:text-slate-900'
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Governance
              </Button>
            </Link>

            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <div className='flex items-center gap-3 mb-4'>
                  <h1 className='text-3xl font-bold text-slate-900'>
                    Proposal #{params.id}
                  </h1>
                  <Badge className={getStatusColor(proposal.status)}>
                    {proposal.status}
                  </Badge>
                  <Badge className={getCategoryColor(proposal.category)}>
                    {proposal.category}
                  </Badge>
                </div>

                <h2 className='text-xl text-slate-700 mb-4'>
                  {proposal.title}
                </h2>

                <div className='flex items-center gap-4 text-sm text-slate-600'>
                  <div className='flex items-center gap-1'>
                    <User className='h-4 w-4' />
                    <span>By {proposal.author}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Calendar className='h-4 w-4' />
                    <span>Created {proposal.createdDate}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Clock className='h-4 w-4' />
                    <span>Voting ends {proposal.votingEndDate}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <MessageSquare className='h-4 w-4' />
                    <span>{proposal.discussionCount} comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='grid lg:grid-cols-3 gap-8'>
            {/* Main Content */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Proposal Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Proposal Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='prose max-w-none'>
                    <div className='whitespace-pre-wrap text-slate-700 leading-relaxed'>
                      {proposal.description}
                    </div>
                  </div>

                  {proposal.attachments.length > 0 && (
                    <div className='mt-6 pt-6 border-t'>
                      <h4 className='font-semibold text-slate-900 mb-3'>
                        Attachments
                      </h4>
                      <div className='space-y-2'>
                        {proposal.attachments.map((attachment, idx) => (
                          <div
                            key={idx}
                            className='flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer'
                          >
                            <FileText className='h-4 w-4' />
                            <span className='text-sm'>{attachment}</span>
                            <ExternalLink className='h-3 w-3' />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Proposal Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {proposal.timeline.map((phase, idx) => (
                      <div key={idx} className='flex items-start gap-4'>
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            phase.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : phase.status === "active"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {phase.status === "completed" ? (
                            <CheckCircle className='h-4 w-4' />
                          ) : phase.status === "active" ? (
                            <Clock className='h-4 w-4' />
                          ) : (
                            <AlertTriangle className='h-4 w-4' />
                          )}
                        </div>
                        <div className='flex-1'>
                          <div className='flex items-center gap-2 mb-1'>
                            <h4 className='font-semibold text-slate-900'>
                              {phase.phase}
                            </h4>
                            <span className='text-sm text-slate-500'>
                              {phase.date}
                            </span>
                          </div>
                          <p className='text-sm text-slate-600'>
                            {phase.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Voting History */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center justify-between'>
                    Recent Votes
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setShowVotingHistory(!showVotingHistory)}
                    >
                      {showVotingHistory ? "Hide" : "Show"} All Votes
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {(showVotingHistory
                      ? proposal.votingHistory
                      : proposal.votingHistory.slice(0, 3)
                    ).map((vote, idx) => (
                      <div
                        key={idx}
                        className='flex items-start justify-between p-3 border rounded-lg'
                      >
                        <div className='flex items-start gap-3'>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              vote.vote === "for"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {vote.vote === "for" ? (
                              <ThumbsUp className='h-4 w-4' />
                            ) : (
                              <ThumbsDown className='h-4 w-4' />
                            )}
                          </div>
                          <div>
                            <div className='flex items-center gap-2 mb-1'>
                              <span className='font-medium text-slate-900'>
                                {formatAddress(vote.address)}
                              </span>
                              <Badge variant='outline' className='text-xs'>
                                {vote.stake} MASSA
                              </Badge>
                            </div>
                            <div className='text-xs text-slate-500 mb-2'>
                              {vote.timestamp}
                            </div>
                            {vote.comment && (
                              <p className='text-sm text-slate-600 italic'>
                                &ldquo;{vote.comment}&rdquo;
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {!showVotingHistory &&
                      proposal.votingHistory.length > 3 && (
                        <p className='text-sm text-slate-500 text-center'>
                          +{proposal.votingHistory.length - 3} more votes
                        </p>
                      )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className='space-y-6'>
              {/* Voting Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Voting Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {/* Vote Distribution */}
                    <div>
                      <div className='flex justify-between text-sm mb-2'>
                        <span>For: {proposal.votesFor.toLocaleString()}</span>
                        <span>
                          Against: {proposal.votesAgainst.toLocaleString()}
                        </span>
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-3'>
                        <div
                          className='bg-green-500 h-3 rounded-l-full'
                          style={{ width: `${votingProgress}%` }}
                        ></div>
                      </div>
                      <div className='text-center text-xs text-slate-500 mt-1'>
                        {votingProgress.toFixed(1)}% in favor
                      </div>
                    </div>

                    {/* Quorum Progress */}
                    <div>
                      <div className='flex justify-between text-sm mb-2'>
                        <span>Quorum Progress</span>
                        <span>
                          {proposal.totalVotes.toLocaleString()}/
                          {proposal.requiredQuorum.toLocaleString()}
                        </span>
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-blue-500 h-2 rounded-full'
                          style={{ width: `${Math.min(quorumProgress, 100)}%` }}
                        ></div>
                      </div>
                      <div className='text-center text-xs text-slate-500 mt-1'>
                        {quorumProgress.toFixed(1)}% of required quorum
                      </div>
                    </div>

                    <div className='pt-4 border-t space-y-2 text-sm'>
                      <div className='flex justify-between'>
                        <span>Participation Rate:</span>
                        <span className='font-medium'>
                          {proposal.participationRate}%
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Staking Reward:</span>
                        <span className='font-medium'>
                          {proposal.stakingReward} MASSA
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Voting Interface */}
              {proposal.status === "active" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Cast Your Vote</CardTitle>
                    <CardDescription>
                      Stake tokens to participate in governance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {/* Vote Selection */}
                      <div>
                        <label className='block text-sm font-medium text-slate-700 mb-2'>
                          Your Vote
                        </label>
                        <div className='grid grid-cols-2 gap-2'>
                          <Button
                            variant={userVote === "for" ? "default" : "outline"}
                            onClick={() => setUserVote("for")}
                            className='flex items-center gap-2'
                          >
                            <ThumbsUp className='h-4 w-4' />
                            For
                          </Button>
                          <Button
                            variant={
                              userVote === "against" ? "default" : "outline"
                            }
                            onClick={() => setUserVote("against")}
                            className='flex items-center gap-2'
                          >
                            <ThumbsDown className='h-4 w-4' />
                            Against
                          </Button>
                        </div>
                      </div>

                      {/* Stake Amount */}
                      <div>
                        <label
                          htmlFor='stake'
                          className='block text-sm font-medium text-slate-700 mb-2'
                        >
                          Stake Amount (MASSA)
                        </label>
                        <input
                          type='number'
                          id='stake'
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                          placeholder='Enter amount to stake'
                          className='w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                          min='1'
                        />
                      </div>

                      {/* Comment */}
                      <div>
                        <label
                          htmlFor='comment'
                          className='block text-sm font-medium text-slate-700 mb-2'
                        >
                          Comment (Optional)
                        </label>
                        <Textarea
                          id='comment'
                          value={voteComment}
                          onChange={(e) => setVoteComment(e.target.value)}
                          placeholder='Explain your vote...'
                          className='min-h-[80px]'
                        />
                      </div>

                      {/* Submit Vote */}
                      <Button
                        onClick={handleVote}
                        disabled={!userVote || !stakeAmount || isVoting}
                        className='w-full'
                      >
                        {isVoting ? (
                          <>
                            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                            Submitting Vote...
                          </>
                        ) : (
                          "Submit Vote"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    <Button variant='outline' className='w-full justify-start'>
                      <MessageSquare className='mr-2 h-4 w-4' />
                      Join Discussion
                    </Button>
                    <Button variant='outline' className='w-full justify-start'>
                      <ExternalLink className='mr-2 h-4 w-4' />
                      Share Proposal
                    </Button>
                    <Button variant='outline' className='w-full justify-start'>
                      <FileText className='mr-2 h-4 w-4' />
                      Download Summary
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
