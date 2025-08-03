"use client";

import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  FileText,
  Shield,
  Award,
} from "lucide-react";

interface VerificationRecord {
  id: string;
  articleTitle: string;
  articleId: string;
  status: "verified" | "rejected" | "pending";
  verifiedDate: string;
  reward: number;
  confidence: number;
  notes?: string;
}

const mockHistory: VerificationRecord[] = [
  {
    id: "1",
    articleTitle: "Major Economic Policy Changes Announced",
    articleId: "article-001",
    status: "verified",
    verifiedDate: "2024-12-20",
    reward: 25,
    confidence: 95,
    notes: "All facts checked and verified with official sources",
  },
  {
    id: "2",
    articleTitle: "Tech Giant AI Breakthrough Claims",
    articleId: "article-002",
    status: "rejected",
    verifiedDate: "2024-12-19",
    reward: 10,
    confidence: 78,
    notes: "Claims could not be substantiated with available evidence",
  },
  {
    id: "3",
    articleTitle: "Climate Change Agricultural Impact Study",
    articleId: "article-003",
    status: "verified",
    verifiedDate: "2024-12-18",
    reward: 30,
    confidence: 92,
    notes: "Comprehensive fact-check completed, sources verified",
  },
  {
    id: "4",
    articleTitle: "Local Election Results Analysis",
    articleId: "article-004",
    status: "pending",
    verifiedDate: "2024-12-21",
    reward: 0,
    confidence: 0,
    notes: "Under review by fact-checking panel",
  },
];

export default function VerificationHistoryPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className='h-4 w-4 text-green-500' />;
      case "rejected":
        return <XCircle className='h-4 w-4 text-red-500' />;
      case "pending":
        return <Clock className='h-4 w-4 text-yellow-500' />;
      default:
        return <Clock className='h-4 w-4 text-gray-500' />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalVerified = mockHistory.filter(
    (record) => record.status === "verified"
  ).length;
  const totalRejected = mockHistory.filter(
    (record) => record.status === "rejected"
  ).length;
  const totalEarnings = mockHistory.reduce(
    (sum, record) => sum + record.reward,
    0
  );
  const averageConfidence =
    mockHistory.length > 0
      ? mockHistory.reduce((sum, record) => sum + record.confidence, 0) /
        mockHistory.length
      : 0;

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      <Navigation />

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-slate-900 mb-2'>
              Verification History
            </h1>
            <p className='text-slate-600'>
              Your complete fact-checking and verification activity record.
            </p>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Verifications
                </CardTitle>
                <Shield className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{mockHistory.length}</div>
                <p className='text-xs text-muted-foreground'>This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Verified</CardTitle>
                <CheckCircle className='h-4 w-4 text-green-500' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{totalVerified}</div>
                <p className='text-xs text-muted-foreground'>
                  {((totalVerified / mockHistory.length) * 100).toFixed(1)}%
                  success rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Earnings
                </CardTitle>
                <Award className='h-4 w-4 text-yellow-500' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{totalEarnings} MAS</div>
                <p className='text-xs text-muted-foreground'>
                  From verifications
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Avg Confidence
                </CardTitle>
                <FileText className='h-4 w-4 text-blue-500' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {averageConfidence.toFixed(1)}%
                </div>
                <p className='text-xs text-muted-foreground'>
                  Verification accuracy
                </p>
              </CardContent>
            </Card>
          </div>

          {/* History List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Verification Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {mockHistory.map((record) => (
                  <div
                    key={record.id}
                    className='flex items-start justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors'
                  >
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-2'>
                        {getStatusIcon(record.status)}
                        <h3 className='font-semibold text-slate-900'>
                          {record.articleTitle}
                        </h3>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </div>

                      <div className='flex items-center gap-4 text-sm text-slate-600 mb-2'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-4 w-4' />
                          <span>{record.verifiedDate}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <FileText className='h-4 w-4' />
                          <span>Article ID: {record.articleId}</span>
                        </div>
                        {record.confidence > 0 && (
                          <div className='flex items-center gap-1'>
                            <span>Confidence: {record.confidence}%</span>
                          </div>
                        )}
                      </div>

                      {record.notes && (
                        <p className='text-sm text-slate-600 italic'>
                          &ldquo;{record.notes}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className='text-right'>
                      {record.reward > 0 && (
                        <div className='text-green-600 font-semibold'>
                          +{record.reward} MAS
                        </div>
                      )}
                      <Button variant='outline' size='sm' className='mt-2'>
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card className='mt-8'>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-green-600 mb-2'>
                    {totalVerified}
                  </div>
                  <p className='text-sm text-slate-600'>Articles Verified</p>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-red-600 mb-2'>
                    {totalRejected}
                  </div>
                  <p className='text-sm text-slate-600'>Rejections Issued</p>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-blue-600 mb-2'>
                    {averageConfidence.toFixed(1)}%
                  </div>
                  <p className='text-sm text-slate-600'>Average Confidence</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
