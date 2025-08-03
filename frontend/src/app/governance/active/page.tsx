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
import {
  ArrowLeft,
  Vote,
  Clock,
  Users,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: "active" | "ending-soon" | "closed";
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  endDate: string;
  category: string;
}

const mockProposals: Proposal[] = [
  {
    id: "1",
    title: "Implement Stake-Based Voting System",
    description:
      "Proposal to introduce a stake-based voting mechanism to ensure more democratic governance.",
    status: "active",
    votesFor: 1250,
    votesAgainst: 340,
    totalVotes: 1590,
    endDate: "2025-08-15",
    category: "Governance",
  },
  {
    id: "2",
    title: "Increase Fact-Checker Rewards",
    description:
      "Proposal to increase rewards for community fact-checkers by 25% to incentivize participation.",
    status: "ending-soon",
    votesFor: 890,
    votesAgainst: 200,
    totalVotes: 1090,
    endDate: "2025-08-05",
    category: "Economics",
  },
  {
    id: "3",
    title: "Treasury Fund Allocation for Development",
    description:
      "Allocate 100,000 MAS tokens from treasury for platform development and security audits.",
    status: "active",
    votesFor: 2100,
    votesAgainst: 450,
    totalVotes: 2550,
    endDate: "2025-08-20",
    category: "Treasury",
  },
];

export default function GovernanceActivePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProposals =
    selectedCategory === "all"
      ? mockProposals
      : mockProposals.filter(
          (p) => p.category.toLowerCase() === selectedCategory
        );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "ending-soon":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getVotePercentage = (votesFor: number, total: number) => {
    return Math.round((votesFor / total) * 100);
  };

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
                Back to DAO Governance
              </Button>
            </Link>

            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-4xl font-bold text-slate-900 mb-2'>
                  Active Governance
                </h1>
                <p className='text-xl text-slate-600'>
                  Participate in live governance activities
                </p>
              </div>

              <div className='flex items-center space-x-4 text-sm text-slate-600'>
                <div className='flex items-center'>
                  <Users className='mr-1 h-4 w-4' />
                  <span>4,210 Active Voters</span>
                </div>
                <div className='flex items-center'>
                  <Vote className='mr-1 h-4 w-4' />
                  <span>{mockProposals.length} Active Proposals</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className='mb-6'>
            <div className='flex flex-wrap gap-2'>
              {["all", "governance", "economics", "treasury"].map(
                (category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size='sm'
                    onClick={() => setSelectedCategory(category)}
                    className='capitalize'
                  >
                    {category === "all" ? "All Proposals" : category}
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Active Proposals */}
          <div className='grid gap-6'>
            {filteredProposals.map((proposal) => (
              <Card
                key={proposal.id}
                className='hover:shadow-lg transition-shadow'
              >
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-2'>
                        <CardTitle className='text-xl'>
                          {proposal.title}
                        </CardTitle>
                        <Badge className={getStatusColor(proposal.status)}>
                          {proposal.status.replace("-", " ")}
                        </Badge>
                        <Badge variant='outline'>{proposal.category}</Badge>
                      </div>
                      <CardDescription className='text-base'>
                        {proposal.description}
                      </CardDescription>
                    </div>
                  </div>

                  <div className='flex items-center justify-between text-sm text-slate-600'>
                    <div className='flex items-center'>
                      <Clock className='mr-1 h-4 w-4' />
                      <span>Ends {proposal.endDate}</span>
                    </div>
                    <div className='flex items-center'>
                      <Users className='mr-1 h-4 w-4' />
                      <span>{proposal.totalVotes.toLocaleString()} votes</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Voting Results Bar */}
                  <div className='mb-4'>
                    <div className='flex justify-between text-sm mb-2'>
                      <span className='text-green-600'>
                        For: {proposal.votesFor.toLocaleString()}
                      </span>
                      <span className='text-red-600'>
                        Against: {proposal.votesAgainst.toLocaleString()}
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div
                        className='bg-green-500 h-2 rounded-full transition-all duration-300'
                        style={{
                          width: `${getVotePercentage(
                            proposal.votesFor,
                            proposal.totalVotes
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className='text-center text-sm text-slate-600 mt-1'>
                      {getVotePercentage(
                        proposal.votesFor,
                        proposal.totalVotes
                      )}
                      % in favor
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className='flex gap-3'>
                    <Link
                      href={`/governance/proposal/${proposal.id}`}
                      className='flex-1'
                    >
                      <Button className='w-full'>
                        <Vote className='mr-2 h-4 w-4' />
                        Vote Now
                      </Button>
                    </Link>
                    <Button variant='outline' className='flex-1'>
                      <MessageSquare className='mr-2 h-4 w-4' />
                      Discuss
                    </Button>
                    <Button variant='outline'>
                      <TrendingUp className='h-4 w-4' />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className='mt-8 bg-slate-900 text-white'>
            <CardHeader>
              <CardTitle>Ready to Participate?</CardTitle>
              <CardDescription className='text-slate-300'>
                Your voice matters in shaping the future of decentralized
                journalism
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex gap-4'>
                <Link href='/governance/stake'>
                  <Button variant='secondary'>Stake Tokens to Vote</Button>
                </Link>
                <Link href='/governance/create'>
                  <Button
                    variant='outline'
                    className='text-white border-white hover:bg-white hover:text-slate-900'
                  >
                    Create Proposal
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
