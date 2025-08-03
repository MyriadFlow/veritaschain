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
  FileText,
  Calendar,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: "active" | "passed" | "rejected" | "pending";
  author: string;
  createdDate: string;
  category: string;
  votesFor?: number;
  votesAgainst?: number;
}

const mockProposals: Proposal[] = [
  {
    id: "1",
    title: "Implement Stake-Based Voting System",
    description:
      "Proposal to introduce a stake-based voting mechanism to ensure more democratic governance and prevent Sybil attacks.",
    status: "active",
    author: "governance.eth",
    createdDate: "2025-08-01",
    category: "Governance",
    votesFor: 1250,
    votesAgainst: 340,
  },
  {
    id: "2",
    title: "Increase Fact-Checker Rewards by 25%",
    description:
      "Proposal to increase rewards for community fact-checkers to incentivize more participation in content verification.",
    status: "passed",
    author: "factchecker.dao",
    createdDate: "2025-07-28",
    category: "Economics",
    votesFor: 1890,
    votesAgainst: 200,
  },
  {
    id: "3",
    title: "Treasury Allocation for Security Audit",
    description:
      "Request 100,000 MAS tokens from treasury for comprehensive security audit of smart contracts.",
    status: "active",
    author: "security.team",
    createdDate: "2025-07-30",
    category: "Treasury",
    votesFor: 2100,
    votesAgainst: 450,
  },
  {
    id: "4",
    title: "New Article Category: Climate Journalism",
    description:
      "Proposal to add a dedicated category for climate and environmental journalism with specialized fact-checking.",
    status: "pending",
    author: "climate.reporter",
    createdDate: "2025-08-02",
    category: "Platform",
  },
  {
    id: "5",
    title: "Reduce Minimum Stake Requirement",
    description:
      "Lower the minimum stake requirement from 1000 to 500 MAS tokens to increase governance participation.",
    status: "rejected",
    author: "community.voice",
    createdDate: "2025-07-25",
    category: "Governance",
    votesFor: 800,
    votesAgainst: 1200,
  },
];

export default function GovernanceProposalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProposals = mockProposals.filter((proposal) => {
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
      case "active":
        return "bg-green-100 text-green-800";
      case "passed":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <TrendingUp className='h-4 w-4' />;
      case "passed":
        return <FileText className='h-4 w-4' />;
      case "rejected":
        return <FileText className='h-4 w-4' />;
      case "pending":
        return <Calendar className='h-4 w-4' />;
      default:
        return <FileText className='h-4 w-4' />;
    }
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

            <div className='flex items-center justify-between mb-6'>
              <div>
                <h1 className='text-4xl font-bold text-slate-900 mb-2'>
                  Governance Proposals
                </h1>
                <p className='text-xl text-slate-600'>
                  Browse and participate in community proposals
                </p>
              </div>

              <Link href='/governance/create'>
                <Button>
                  <FileText className='mr-2 h-4 w-4' />
                  Create Proposal
                </Button>
              </Link>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className='mb-8'>
            <CardContent className='pt-6'>
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex-1'>
                  <div className='relative'>
                    <Search className='absolute left-3 top-3 h-4 w-4 text-slate-400' />
                    <Input
                      placeholder='Search proposals...'
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
                      <option value='active'>Active</option>
                      <option value='passed'>Passed</option>
                      <option value='rejected'>Rejected</option>
                      <option value='pending'>Pending</option>
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
                      <option value='platform'>Platform</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Proposals List */}
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
                        <span>{proposal.createdDate}</span>
                        {proposal.votesFor !== undefined && (
                          <>
                            <span>•</span>
                            <span className='text-green-600'>
                              {proposal.votesFor} for
                            </span>
                            <span className='text-red-600'>
                              {proposal.votesAgainst} against
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className='flex gap-3'>
                    <Link
                      href={`/governance/proposal/${proposal.id}`}
                      className='flex-1'
                    >
                      <Button
                        className='w-full'
                        variant={
                          proposal.status === "active" ? "default" : "outline"
                        }
                      >
                        {proposal.status === "active"
                          ? "Vote Now"
                          : "View Details"}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProposals.length === 0 && (
            <Card className='text-center py-12'>
              <CardContent>
                <FileText className='h-12 w-12 text-slate-400 mx-auto mb-4' />
                <h3 className='text-lg font-semibold text-slate-900 mb-2'>
                  No proposals found
                </h3>
                <p className='text-slate-600 mb-4'>
                  Try adjusting your search criteria or create a new proposal.
                </p>
                <Link href='/governance/create'>
                  <Button>Create New Proposal</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
