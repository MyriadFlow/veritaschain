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
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  Filter,
  History,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

interface HistoricalProposal {
  id: string;
  title: string;
  description: string;
  status: "passed" | "rejected" | "executed";
  author: string;
  submittedDate: string;
  votingEndDate: string;
  executedDate?: string;
  category: string;
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  participationRate: number;
}

const mockHistoricalProposals: HistoricalProposal[] = [
  {
    id: "1",
    title: "Initial Governance Framework",
    description:
      "Established the foundational governance structure for VeritasChain DAO.",
    status: "executed",
    author: "founder.dao",
    submittedDate: "2025-06-01",
    votingEndDate: "2025-06-15",
    executedDate: "2025-06-20",
    category: "Governance",
    votesFor: 3200,
    votesAgainst: 400,
    totalVotes: 3600,
    participationRate: 72,
  },
  {
    id: "2",
    title: "Fact-Checker Reward Pool Creation",
    description:
      "Allocated initial funds for community fact-checker rewards system.",
    status: "executed",
    author: "economics.team",
    submittedDate: "2025-06-20",
    votingEndDate: "2025-07-05",
    executedDate: "2025-07-10",
    category: "Economics",
    votesFor: 2800,
    votesAgainst: 600,
    totalVotes: 3400,
    participationRate: 68,
  },
  {
    id: "3",
    title: "Platform Fee Reduction",
    description:
      "Proposal to reduce platform publication fees by 50% to encourage more participation.",
    status: "rejected",
    author: "community.advocate",
    submittedDate: "2025-07-01",
    votingEndDate: "2025-07-15",
    category: "Economics",
    votesFor: 1200,
    votesAgainst: 2100,
    totalVotes: 3300,
    participationRate: 66,
  },
  {
    id: "4",
    title: "Technical Upgrade Funding",
    description:
      "Approved funding for major platform upgrades and security improvements.",
    status: "executed",
    author: "tech.council",
    submittedDate: "2025-07-10",
    votingEndDate: "2025-07-25",
    executedDate: "2025-08-01",
    category: "Treasury",
    votesFor: 2900,
    votesAgainst: 450,
    totalVotes: 3350,
    participationRate: 67,
  },
  {
    id: "5",
    title: "Community Grant Program",
    description:
      "Established a grant program for independent journalism projects.",
    status: "passed",
    author: "grants.committee",
    submittedDate: "2025-07-20",
    votingEndDate: "2025-08-03",
    category: "Treasury",
    votesFor: 2600,
    votesAgainst: 700,
    totalVotes: 3300,
    participationRate: 66,
  },
];

export default function GovernanceHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProposals = mockHistoricalProposals.filter((proposal) => {
    const matchesSearch =
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || proposal.status === selectedStatus;
    const matchesCategory =
      selectedCategory === "all" ||
      proposal.category.toLowerCase() === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "executed":
        return "bg-green-100 text-green-800";
      case "passed":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "executed":
        return <CheckCircle className='h-4 w-4' />;
      case "passed":
        return <Clock className='h-4 w-4' />;
      case "rejected":
        return <XCircle className='h-4 w-4' />;
      default:
        return <History className='h-4 w-4' />;
    }
  };

  const getVotePercentage = (votesFor: number, total: number) => {
    return Math.round((votesFor / total) * 100);
  };

  const totalProposals = mockHistoricalProposals.length;
  const executedProposals = mockHistoricalProposals.filter(
    (p) => p.status === "executed"
  ).length;
  const avgParticipation = Math.round(
    mockHistoricalProposals.reduce((sum, p) => sum + p.participationRate, 0) /
      totalProposals
  );

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

            <div className='flex items-center justify-between mb-6'>
              <div>
                <h1 className='text-4xl font-bold text-slate-900 mb-2'>
                  Governance History
                </h1>
                <p className='text-xl text-slate-600'>
                  Explore the evolution of VeritasChain governance
                </p>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className='grid md:grid-cols-3 gap-6 mb-8'>
            <Card>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-sm font-medium text-slate-600'>
                    Total Proposals
                  </CardTitle>
                  <History className='h-4 w-4 text-blue-600' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-blue-600'>
                  {totalProposals}
                </div>
                <div className='text-sm text-slate-500'>
                  Since platform launch
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-sm font-medium text-slate-600'>
                    Executed
                  </CardTitle>
                  <CheckCircle className='h-4 w-4 text-green-600' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-green-600'>
                  {executedProposals}
                </div>
                <div className='text-sm text-slate-500'>
                  {Math.round((executedProposals / totalProposals) * 100)}%
                  success rate
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-sm font-medium text-slate-600'>
                    Avg Participation
                  </CardTitle>
                  <TrendingUp className='h-4 w-4 text-purple-600' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-purple-600'>
                  {avgParticipation}%
                </div>
                <div className='text-sm text-slate-500'>
                  Community engagement
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className='mb-8'>
            <CardContent className='pt-6'>
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex-1'>
                  <div className='relative'>
                    <Search className='absolute left-3 top-3 h-4 w-4 text-slate-400' />
                    <Input
                      placeholder='Search historical proposals...'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className='pl-10'
                    />
                  </div>
                </div>

                <div className='flex flex-wrap gap-2'>
                  <div className='flex items-center gap-2'>
                    <Filter className='h-4 w-4 text-slate-600' />
                    <span className='text-sm text-slate-600'>Status:</span>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className='px-3 py-1 border rounded-md text-sm'
                    >
                      <option value='all'>All</option>
                      <option value='executed'>Executed</option>
                      <option value='passed'>Passed</option>
                      <option value='rejected'>Rejected</option>
                    </select>
                  </div>

                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-slate-600'>Category:</span>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className='px-3 py-1 border rounded-md text-sm'
                    >
                      <option value='all'>All</option>
                      <option value='governance'>Governance</option>
                      <option value='economics'>Economics</option>
                      <option value='treasury'>Treasury</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Historical Proposals */}
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
                          <Link
                            href={`/governance/proposal/${proposal.id}`}
                            className='hover:text-blue-600'
                          >
                            {proposal.title}
                          </Link>
                        </CardTitle>
                        <Badge className={getStatusColor(proposal.status)}>
                          <div className='flex items-center gap-1'>
                            {getStatusIcon(proposal.status)}
                            {proposal.status}
                          </div>
                        </Badge>
                        <Badge variant='outline'>{proposal.category}</Badge>
                      </div>
                      <CardDescription className='text-base mb-3'>
                        {proposal.description}
                      </CardDescription>

                      <div className='flex items-center gap-4 text-sm text-slate-600'>
                        <span>By {proposal.author}</span>
                        <span>•</span>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-3 w-3' />
                          <span>{proposal.submittedDate}</span>
                        </div>
                        <span>•</span>
                        <span>{proposal.participationRate}% participation</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Voting Results */}
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
                      % in favor • {proposal.totalVotes.toLocaleString()} total
                      votes
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className='flex justify-between text-xs text-slate-500 border-t pt-3'>
                    <span>Submitted: {proposal.submittedDate}</span>
                    <span>Voting ended: {proposal.votingEndDate}</span>
                    {proposal.executedDate && (
                      <span>Executed: {proposal.executedDate}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProposals.length === 0 && (
            <Card className='text-center py-12'>
              <CardContent>
                <History className='h-12 w-12 text-slate-400 mx-auto mb-4' />
                <h3 className='text-lg font-semibold text-slate-900 mb-2'>
                  No proposals found
                </h3>
                <p className='text-slate-600'>
                  Try adjusting your search criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
