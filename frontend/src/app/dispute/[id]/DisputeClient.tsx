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
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  FileText,
  MessageSquare,
  Eye,
  Gavel,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

interface Dispute {
  id: string;
  verificationId: string;
  articleId: string;
  articleTitle: string;
  originalVerifier: string;
  disputant: string;
  status: "open" | "in-review" | "resolved" | "rejected";
  category: "evidence" | "methodology" | "bias" | "technical";
  priority: "high" | "medium" | "low";
  createdDate: string;
  disputeReason: string;
  evidence: {
    id: string;
    type: "document" | "link" | "witness" | "analysis";
    title: string;
    description: string;
    submittedBy: string;
    date: string;
  }[];
  timeline: {
    phase: string;
    date: string;
    status: "completed" | "active" | "pending";
    description: string;
    actor?: string;
  }[];
  votes: {
    juror: string;
    vote: "support" | "reject" | "abstain";
    reasoning: string;
    stake: number;
    timestamp: string;
  }[];
  requiredVotes: number;
  currentVotes: number;
  supportVotes: number;
  rejectVotes: number;
  abstainVotes: number;
  stakePool: number;
}

const mockDispute: Dispute = {
  id: "1",
  verificationId: "VER-2024-001",
  articleId: "101",
  articleTitle: "New Climate Policy Reduces Emissions by 40%",
  originalVerifier: "fact.checker.1",
  disputant: "climate.expert.verified",
  status: "in-review",
  category: "evidence",
  priority: "high",
  createdDate: "2024-12-24",
  disputeReason:
    'The original verification failed to consider recent contradictory data from multiple independent climate research institutions. The verification marked claims as "verified" based on outdated government projections without accounting for revised EPA methodology published in November 2024.',
  evidence: [
    {
      id: "1",
      type: "document",
      title: "Revised EPA Climate Impact Assessment (Nov 2024)",
      description:
        "Updated methodology shows 15% lower emission reduction potential than original estimates",
      submittedBy: "climate.expert.verified",
      date: "2024-12-24",
    },
    {
      id: "2",
      type: "analysis",
      title: "Independent Research Consortium Report",
      description:
        "Analysis from 12 universities contradicting government projections",
      submittedBy: "climate.expert.verified",
      date: "2024-12-24",
    },
    {
      id: "3",
      type: "document",
      title: "Original Fact-Check Evidence Package",
      description: "Documentation used in original verification process",
      submittedBy: "fact.checker.1",
      date: "2024-12-25",
    },
  ],
  timeline: [
    {
      phase: "Dispute Filed",
      date: "2024-12-24",
      status: "completed",
      description: "Initial dispute filed with evidence package",
      actor: "climate.expert.verified",
    },
    {
      phase: "Evidence Review",
      date: "2024-12-25",
      status: "completed",
      description: "Original verifier submitted counter-evidence",
      actor: "fact.checker.1",
    },
    {
      phase: "Jury Selection",
      date: "2024-12-26",
      status: "active",
      description: "Expert jury panel being assembled for final judgment",
      actor: "dispute.system",
    },
    {
      phase: "Final Resolution",
      date: "2024-12-30",
      status: "pending",
      description: "Jury verdict and stake redistribution",
    },
  ],
  votes: [
    {
      juror: "climate.researcher.PhD",
      vote: "support",
      reasoning:
        "The new EPA methodology is indeed significant and should have been considered",
      stake: 500,
      timestamp: "2024-12-26T10:30:00Z",
    },
    {
      juror: "data.analyst.verified",
      vote: "support",
      reasoning:
        "Statistical analysis shows substantial discrepancy in projections",
      stake: 300,
      timestamp: "2024-12-26T14:15:00Z",
    },
    {
      juror: "policy.expert.gov",
      vote: "reject",
      reasoning:
        "Original verification followed proper methodology available at the time",
      stake: 400,
      timestamp: "2024-12-26T16:45:00Z",
    },
  ],
  requiredVotes: 7,
  currentVotes: 3,
  supportVotes: 2,
  rejectVotes: 1,
  abstainVotes: 0,
  stakePool: 2500,
};

export default function DisputeClientPage({ params }: Props) {
  const [userVote, setUserVote] = useState<
    "support" | "reject" | "abstain" | null
  >(null);
  const [voteReasoning, setVoteReasoning] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllEvidence, setShowAllEvidence] = useState(false);

  const dispute = mockDispute; // In real app, fetch by params.id

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "in-review":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "evidence":
        return "bg-purple-100 text-purple-800";
      case "methodology":
        return "bg-blue-100 text-blue-800";
      case "bias":
        return "bg-red-100 text-red-800";
      case "technical":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className='h-4 w-4' />;
      case "link":
        return <Eye className='h-4 w-4' />;
      case "witness":
        return <User className='h-4 w-4' />;
      case "analysis":
        return <Shield className='h-4 w-4' />;
      default:
        return <FileText className='h-4 w-4' />;
    }
  };

  const getTimelineIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className='h-4 w-4' />;
      case "active":
        return <Clock className='h-4 w-4' />;
      case "pending":
        return <AlertTriangle className='h-4 w-4' />;
      default:
        return <Clock className='h-4 w-4' />;
    }
  };

  const getVoteIcon = (vote: string) => {
    switch (vote) {
      case "support":
        return <CheckCircle className='h-4 w-4' />;
      case "reject":
        return <XCircle className='h-4 w-4' />;
      case "abstain":
        return <AlertTriangle className='h-4 w-4' />;
      default:
        return <AlertTriangle className='h-4 w-4' />;
    }
  };

  const handleSubmitVote = async () => {
    if (!userVote || !voteReasoning || !stakeAmount) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert(
      `Vote "${userVote}" submitted with reasoning and ${stakeAmount} MASSA stake!`
    );
    setIsSubmitting(false);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const supportPercentage =
    dispute.currentVotes > 0
      ? (dispute.supportVotes / dispute.currentVotes) * 100
      : 0;
  const rejectPercentage =
    dispute.currentVotes > 0
      ? (dispute.rejectVotes / dispute.currentVotes) * 100
      : 0;
  const progressPercentage =
    (dispute.currentVotes / dispute.requiredVotes) * 100;

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      <Navigation />

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <Link href='/fact-checker'>
              <Button
                variant='ghost'
                className='mb-4 text-slate-600 hover:text-slate-900'
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Fact-Checker Dashboard
              </Button>
            </Link>

            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <div className='flex items-center gap-3 mb-4'>
                  <h1 className='text-3xl font-bold text-slate-900'>
                    Dispute #{params.id}
                  </h1>
                  <Badge className={getStatusColor(dispute.status)}>
                    {dispute.status}
                  </Badge>
                  <Badge className={getCategoryColor(dispute.category)}>
                    {dispute.category}
                  </Badge>
                  <Badge className={getPriorityColor(dispute.priority)}>
                    {dispute.priority} priority
                  </Badge>
                </div>

                <h2 className='text-xl text-slate-700 mb-4'>
                  {dispute.articleTitle}
                </h2>

                <div className='flex items-center gap-4 text-sm text-slate-600'>
                  <div className='flex items-center gap-1'>
                    <Gavel className='h-4 w-4' />
                    <span>Disputant: {dispute.disputant}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Shield className='h-4 w-4' />
                    <span>Original: {dispute.originalVerifier}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Calendar className='h-4 w-4' />
                    <span>Filed: {dispute.createdDate}</span>
                  </div>
                </div>
              </div>

              <div className='flex gap-3'>
                <Link href={`/verify/${dispute.verificationId}`}>
                  <Button variant='outline'>
                    <Eye className='mr-2 h-4 w-4' />
                    View Original Verification
                  </Button>
                </Link>
                <Link href={`/article/${dispute.articleId}`}>
                  <Button variant='outline'>
                    <FileText className='mr-2 h-4 w-4' />
                    View Article
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className='grid lg:grid-cols-3 gap-8'>
            {/* Main Content */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Dispute Reason */}
              <Card>
                <CardHeader>
                  <CardTitle>Dispute Details</CardTitle>
                  <CardDescription>
                    Reason for challenging the original verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='prose max-w-none'>
                    <p className='text-slate-700 leading-relaxed'>
                      {dispute.disputeReason}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Evidence */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center justify-between'>
                    Evidence Submitted
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setShowAllEvidence(!showAllEvidence)}
                    >
                      {showAllEvidence ? "Show Less" : "Show All"} Evidence
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Supporting materials provided by both parties
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {(showAllEvidence
                      ? dispute.evidence
                      : dispute.evidence.slice(0, 2)
                    ).map((evidence) => (
                      <div key={evidence.id} className='p-4 border rounded-lg'>
                        <div className='flex items-start gap-3'>
                          <div className='flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                            {getEvidenceIcon(evidence.type)}
                          </div>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-2'>
                              <h4 className='font-semibold text-slate-900'>
                                {evidence.title}
                              </h4>
                              <Badge variant='outline' className='text-xs'>
                                {evidence.type}
                              </Badge>
                            </div>
                            <p className='text-sm text-slate-600 mb-3'>
                              {evidence.description}
                            </p>
                            <div className='flex items-center gap-4 text-xs text-slate-500'>
                              <span>Submitted by: {evidence.submittedBy}</span>
                              <span>Date: {evidence.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {!showAllEvidence && dispute.evidence.length > 2 && (
                      <p className='text-sm text-slate-500 text-center'>
                        +{dispute.evidence.length - 2} more evidence items
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Dispute Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {dispute.timeline.map((phase, idx) => (
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
                          {getTimelineIcon(phase.status)}
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
                          {phase.actor && (
                            <span className='text-xs text-slate-500'>
                              by {phase.actor}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Jury Votes */}
              <Card>
                <CardHeader>
                  <CardTitle>Jury Votes</CardTitle>
                  <CardDescription>
                    Expert panel deliberation on dispute validity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {dispute.votes.map((vote, idx) => (
                      <div
                        key={idx}
                        className='flex items-start gap-3 p-3 border rounded-lg'
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            vote.vote === "support"
                              ? "bg-green-100 text-green-600"
                              : vote.vote === "reject"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {getVoteIcon(vote.vote)}
                        </div>
                        <div className='flex-1'>
                          <div className='flex items-center gap-2 mb-2'>
                            <span className='font-medium text-slate-900'>
                              {formatAddress(vote.juror)}
                            </span>
                            <Badge variant='outline' className='text-xs'>
                              {vote.stake} MASSA
                            </Badge>
                            <Badge
                              className={
                                vote.vote === "support"
                                  ? "bg-green-100 text-green-800"
                                  : vote.vote === "reject"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {vote.vote}
                            </Badge>
                          </div>
                          <p className='text-sm text-slate-600 mb-1'>
                            {vote.reasoning}
                          </p>
                          <span className='text-xs text-slate-500'>
                            {vote.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className='space-y-6'>
              {/* Voting Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Jury Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {/* Vote Distribution */}
                    <div>
                      <div className='flex justify-between text-sm mb-2'>
                        <span className='flex items-center gap-1'>
                          <CheckCircle className='h-3 w-3 text-green-600' />
                          Support: {dispute.supportVotes}
                        </span>
                        <span className='flex items-center gap-1'>
                          <XCircle className='h-3 w-3 text-red-600' />
                          Reject: {dispute.rejectVotes}
                        </span>
                      </div>

                      <div className='w-full bg-gray-200 rounded-full h-3 mb-2'>
                        <div className='flex h-3 rounded-full overflow-hidden'>
                          <div
                            className='bg-green-500'
                            style={{ width: `${supportPercentage}%` }}
                          ></div>
                          <div
                            className='bg-red-500'
                            style={{ width: `${rejectPercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className='text-center text-xs text-slate-500'>
                        {supportPercentage.toFixed(1)}% support dispute
                      </div>
                    </div>

                    {/* Progress to Resolution */}
                    <div>
                      <div className='flex justify-between text-sm mb-2'>
                        <span>Progress to Resolution</span>
                        <span>
                          {dispute.currentVotes}/{dispute.requiredVotes}
                        </span>
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-blue-500 h-2 rounded-full'
                          style={{
                            width: `${Math.min(progressPercentage, 100)}%`,
                          }}
                        ></div>
                      </div>
                      <div className='text-center text-xs text-slate-500 mt-1'>
                        {progressPercentage.toFixed(1)}% complete
                      </div>
                    </div>

                    <div className='pt-4 border-t space-y-2 text-sm'>
                      <div className='flex justify-between'>
                        <span>Total Stake Pool:</span>
                        <span className='font-medium'>
                          {dispute.stakePool} MASSA
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Abstain Votes:</span>
                        <span className='font-medium'>
                          {dispute.abstainVotes}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Jury Voting Interface */}
              {dispute.status === "in-review" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Cast Your Jury Vote</CardTitle>
                    <CardDescription>
                      Evaluate the dispute as an expert juror
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {/* Vote Selection */}
                      <div>
                        <label className='block text-sm font-medium text-slate-700 mb-2'>
                          Your Decision
                        </label>
                        <div className='grid grid-cols-1 gap-2'>
                          <Button
                            variant={
                              userVote === "support" ? "default" : "outline"
                            }
                            onClick={() => setUserVote("support")}
                            className='flex items-center gap-2 justify-start'
                          >
                            <CheckCircle className='h-4 w-4' />
                            Support Dispute
                          </Button>
                          <Button
                            variant={
                              userVote === "reject" ? "default" : "outline"
                            }
                            onClick={() => setUserVote("reject")}
                            className='flex items-center gap-2 justify-start'
                          >
                            <XCircle className='h-4 w-4' />
                            Reject Dispute
                          </Button>
                          <Button
                            variant={
                              userVote === "abstain" ? "default" : "outline"
                            }
                            onClick={() => setUserVote("abstain")}
                            className='flex items-center gap-2 justify-start'
                          >
                            <AlertTriangle className='h-4 w-4' />
                            Abstain
                          </Button>
                        </div>
                      </div>

                      {/* Reasoning */}
                      <div>
                        <label
                          htmlFor='reasoning'
                          className='block text-sm font-medium text-slate-700 mb-2'
                        >
                          Your Reasoning (Required)
                        </label>
                        <Textarea
                          id='reasoning'
                          value={voteReasoning}
                          onChange={(e) => setVoteReasoning(e.target.value)}
                          placeholder='Explain your decision and analysis...'
                          className='min-h-[100px]'
                        />
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
                          placeholder='Enter stake amount'
                          className='w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                          min='1'
                        />
                      </div>

                      {/* Submit Vote */}
                      <Button
                        onClick={handleSubmitVote}
                        disabled={
                          !userVote ||
                          !voteReasoning ||
                          !stakeAmount ||
                          isSubmitting
                        }
                        className='w-full'
                      >
                        {isSubmitting ? (
                          <>
                            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Gavel className='mr-2 h-4 w-4' />
                            Submit Jury Vote
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    <Button variant='outline' className='w-full justify-start'>
                      <MessageSquare className='mr-2 h-4 w-4' />
                      Join Discussion
                    </Button>
                    <Button variant='outline' className='w-full justify-start'>
                      <FileText className='mr-2 h-4 w-4' />
                      Download Evidence
                    </Button>
                    <Button variant='outline' className='w-full justify-start'>
                      <AlertTriangle className='mr-2 h-4 w-4' />
                      Report Issue
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
