"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Shield,
  Clock,
  User,
  Calendar,
  FileText,
  Gavel,
  TrendingUp,
  Search,
} from "lucide-react";
import Link from "next/link";

interface Dispute {
  id: string;
  articleId: string;
  articleTitle: string;
  disputeType: "misinformation" | "plagiarism" | "bias" | "factual_error";
  status: "pending" | "under_review" | "resolved" | "dismissed";
  reporter: string;
  reportedDate: string;
  description: string;
  evidence: string[];
  severity: "low" | "medium" | "high" | "critical";
  votes: {
    support: number;
    reject: number;
  };
  reward: number;
}

const mockDisputes: Dispute[] = [
  {
    id: "1",
    articleId: "article-001",
    articleTitle: "Breaking: Major Economic Policy Changes Announced",
    disputeType: "factual_error",
    status: "pending",
    reporter: "fact.checker.eth",
    reportedDate: "2024-12-20",
    description:
      "The article contains several factual inaccuracies regarding the unemployment statistics cited.",
    evidence: ["unemployment-data-2024.pdf", "government-statement.jpg"],
    severity: "high",
    votes: { support: 12, reject: 3 },
    reward: 50,
  },
  {
    id: "2",
    articleId: "article-002",
    articleTitle: "Tech Giant Announces Revolutionary AI Breakthrough",
    disputeType: "misinformation",
    status: "under_review",
    reporter: "tech.analyst.mas",
    reportedDate: "2024-12-19",
    description:
      "Claims made about AI capabilities are unsubstantiated and potentially misleading.",
    evidence: ["research-paper.pdf", "expert-opinion.txt"],
    severity: "medium",
    votes: { support: 8, reject: 2 },
    reward: 35,
  },
  {
    id: "3",
    articleId: "article-003",
    articleTitle: "Climate Change Impact on Local Agriculture",
    disputeType: "bias",
    status: "resolved",
    reporter: "climate.watch.org",
    reportedDate: "2024-12-15",
    description:
      "Article shows clear bias by omitting key scientific perspectives on climate adaptation.",
    evidence: ["scientific-studies.zip", "expert-interviews.mp3"],
    severity: "medium",
    votes: { support: 15, reject: 1 },
    reward: 75,
  },
];

export default function DisputesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "under_review":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "dismissed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDisputeTypeIcon = (type: string) => {
    switch (type) {
      case "misinformation":
        return <AlertTriangle className='h-4 w-4' />;
      case "plagiarism":
        return <FileText className='h-4 w-4' />;
      case "bias":
        return <Shield className='h-4 w-4' />;
      case "factual_error":
        return <Gavel className='h-4 w-4' />;
      default:
        return <AlertTriangle className='h-4 w-4' />;
    }
  };

  const filteredDisputes = mockDisputes.filter((dispute) => {
    const matchesSearch =
      dispute.articleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || dispute.status === statusFilter;
    const matchesSeverity =
      severityFilter === "all" || dispute.severity === severityFilter;
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      <Navigation />

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-slate-900 mb-2'>
              Article Disputes
            </h1>
            <p className='text-slate-600'>
              Community-driven fact-checking and dispute resolution for
              published articles.
            </p>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Active Disputes
                </CardTitle>
                <AlertTriangle className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>23</div>
                <p className='text-xs text-muted-foreground'>
                  +3 from yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Under Review
                </CardTitle>
                <Clock className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>8</div>
                <p className='text-xs text-muted-foreground'>
                  Average 2.3 days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Resolved</CardTitle>
                <Shield className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>156</div>
                <p className='text-xs text-muted-foreground'>
                  87% accuracy rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Rewards Paid
                </CardTitle>
                <TrendingUp className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>2,847 MAS</div>
                <p className='text-xs text-muted-foreground'>This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className='mb-6'>
            <CardContent className='pt-6'>
              <div className='flex flex-col sm:flex-row gap-4'>
                <div className='flex-1'>
                  <div className='relative'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                    <input
                      type='text'
                      placeholder='Search disputes...'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </div>
                </div>
                <div className='flex gap-2'>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value='all'>All Status</option>
                    <option value='pending'>Pending</option>
                    <option value='under_review'>Under Review</option>
                    <option value='resolved'>Resolved</option>
                    <option value='dismissed'>Dismissed</option>
                  </select>
                  <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                    className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value='all'>All Severity</option>
                    <option value='critical'>Critical</option>
                    <option value='high'>High</option>
                    <option value='medium'>Medium</option>
                    <option value='low'>Low</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disputes List */}
          <div className='space-y-4'>
            {filteredDisputes.map((dispute) => (
              <Card
                key={dispute.id}
                className='hover:shadow-md transition-shadow'
              >
                <CardContent className='pt-6'>
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-2'>
                        {getDisputeTypeIcon(dispute.disputeType)}
                        <h3 className='text-lg font-semibold text-slate-900'>
                          {dispute.articleTitle}
                        </h3>
                      </div>
                      <p className='text-slate-600 mb-3'>
                        {dispute.description}
                      </p>
                      <div className='flex items-center gap-4 text-sm text-slate-500'>
                        <div className='flex items-center gap-1'>
                          <User className='h-4 w-4' />
                          <span>{dispute.reporter}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-4 w-4' />
                          <span>{dispute.reportedDate}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <span>Support: {dispute.votes.support}</span>
                          <span>•</span>
                          <span>Reject: {dispute.votes.reject}</span>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col items-end gap-2'>
                      <div className='flex gap-2'>
                        <Badge className={getStatusColor(dispute.status)}>
                          {dispute.status.replace("_", " ")}
                        </Badge>
                        <Badge className={getSeverityColor(dispute.severity)}>
                          {dispute.severity}
                        </Badge>
                      </div>
                      <div className='text-sm font-medium text-green-600'>
                        {dispute.reward} MAS reward
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex gap-2'>
                      {dispute.evidence.map((evidence, idx) => (
                        <Badge key={idx} variant='outline' className='text-xs'>
                          <FileText className='h-3 w-3 mr-1' />
                          {evidence}
                        </Badge>
                      ))}
                    </div>
                    <div className='flex gap-2'>
                      <Button variant='outline' size='sm'>
                        View Evidence
                      </Button>
                      <Link href={`/dispute/${dispute.id}`}>
                        <Button size='sm'>Review</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDisputes.length === 0 && (
            <Card>
              <CardContent className='pt-6'>
                <div className='text-center py-8'>
                  <AlertTriangle className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                    No disputes found
                  </h3>
                  <p className='text-gray-600'>
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className='mt-8 flex justify-center'>
            <Button className='flex items-center gap-2'>
              <AlertTriangle className='h-4 w-4' />
              Report New Dispute
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
