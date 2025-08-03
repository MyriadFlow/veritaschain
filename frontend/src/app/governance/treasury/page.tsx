"use client";

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
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  FileText,
  Calendar,
} from "lucide-react";
import Link from "next/link";

interface TreasuryTransaction {
  id: string;
  type: "allocation" | "reward" | "grant" | "income";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "approved";
  proposalId?: string;
}

const mockTransactions: TreasuryTransaction[] = [
  {
    id: "1",
    type: "allocation",
    amount: -100000,
    description: "Security audit funding allocation",
    date: "2025-08-01",
    status: "approved",
    proposalId: "3",
  },
  {
    id: "2",
    type: "reward",
    amount: -25000,
    description: "Fact-checker reward distribution - July 2025",
    date: "2025-07-31",
    status: "completed",
  },
  {
    id: "3",
    type: "income",
    amount: 50000,
    description: "Article publication fees collected",
    date: "2025-07-30",
    status: "completed",
  },
  {
    id: "4",
    type: "grant",
    amount: -75000,
    description: "Development team Q3 2025 grant",
    date: "2025-07-28",
    status: "completed",
  },
  {
    id: "5",
    type: "income",
    amount: 30000,
    description: "Premium subscription fees",
    date: "2025-07-25",
    status: "completed",
  },
];

const treasuryStats = {
  totalBalance: 2750000,
  monthlyIncome: 80000,
  monthlyExpenses: 125000,
  pendingAllocations: 175000,
  activeGrants: 8,
  completedProjects: 23,
};

export default function GovernanceTreasuryPage() {
  const getTransactionColor = (type: string) => {
    switch (type) {
      case "income":
        return "text-green-600";
      case "allocation":
        return "text-blue-600";
      case "reward":
        return "text-purple-600";
      case "grant":
        return "text-orange-600";
      default:
        return "text-slate-600";
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "income":
        return <TrendingUp className='h-4 w-4' />;
      case "allocation":
        return <DollarSign className='h-4 w-4' />;
      case "reward":
        return <Users className='h-4 w-4' />;
      case "grant":
        return <FileText className='h-4 w-4' />;
      default:
        return <Wallet className='h-4 w-4' />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
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

            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-4xl font-bold text-slate-900 mb-2'>
                  DAO Treasury
                </h1>
                <p className='text-xl text-slate-600'>
                  Community fund management and transparency
                </p>
              </div>

              <div className='text-right'>
                <div className='text-3xl font-bold text-slate-900'>
                  {treasuryStats.totalBalance.toLocaleString()} MAS
                </div>
                <div className='text-sm text-slate-600'>
                  Total Treasury Balance
                </div>
              </div>
            </div>
          </div>

          {/* Treasury Stats */}
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            <Card>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-sm font-medium text-slate-600'>
                    Monthly Income
                  </CardTitle>
                  <TrendingUp className='h-4 w-4 text-green-600' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-green-600'>
                  +{treasuryStats.monthlyIncome.toLocaleString()}
                </div>
                <div className='text-sm text-slate-500'>MAS tokens</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-sm font-medium text-slate-600'>
                    Monthly Expenses
                  </CardTitle>
                  <TrendingDown className='h-4 w-4 text-red-600' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-red-600'>
                  -{treasuryStats.monthlyExpenses.toLocaleString()}
                </div>
                <div className='text-sm text-slate-500'>MAS tokens</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-sm font-medium text-slate-600'>
                    Pending Allocations
                  </CardTitle>
                  <Calendar className='h-4 w-4 text-yellow-600' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-yellow-600'>
                  {treasuryStats.pendingAllocations.toLocaleString()}
                </div>
                <div className='text-sm text-slate-500'>MAS tokens</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-sm font-medium text-slate-600'>
                    Active Grants
                  </CardTitle>
                  <Users className='h-4 w-4 text-blue-600' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-blue-600'>
                  {treasuryStats.activeGrants}
                </div>
                <div className='text-sm text-slate-500'>Projects funded</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className='mb-8'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle>Recent Treasury Activity</CardTitle>
                  <CardDescription>
                    Latest transactions and fund movements
                  </CardDescription>
                </div>
                <Button variant='outline' size='sm'>
                  <FileText className='mr-2 h-4 w-4' />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {mockTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className='flex items-center justify-between p-4 bg-slate-50 rounded-lg'
                  >
                    <div className='flex items-center space-x-4'>
                      <div
                        className={`p-2 rounded-full bg-white ${getTransactionColor(
                          transaction.type
                        )}`}
                      >
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <div className='font-medium text-slate-900'>
                          {transaction.description}
                        </div>
                        <div className='text-sm text-slate-600 flex items-center gap-2'>
                          <span>{transaction.date}</span>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                          {transaction.proposalId && (
                            <Link
                              href={`/governance/proposal/${transaction.proposalId}`}
                            >
                              <Badge
                                variant='outline'
                                className='hover:bg-blue-50'
                              >
                                Proposal #{transaction.proposalId}
                              </Badge>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-lg font-semibold ${
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toLocaleString()} MAS
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Treasury Proposals */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle>Treasury Proposals</CardTitle>
                  <CardDescription>
                    Active funding requests and allocations
                  </CardDescription>
                </div>
                <Link href='/governance/create'>
                  <Button>
                    <FileText className='mr-2 h-4 w-4' />
                    Submit Request
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='p-4 border rounded-lg'>
                  <div className='flex items-center justify-between mb-2'>
                    <h4 className='font-semibold'>Development Fund Q4 2025</h4>
                    <Badge className='bg-blue-100 text-blue-800'>Active</Badge>
                  </div>
                  <p className='text-sm text-slate-600 mb-3'>
                    Funding request for platform development and new features
                  </p>
                  <div className='flex items-center justify-between'>
                    <span className='text-lg font-semibold'>200,000 MAS</span>
                    <Link href='/governance/proposal/6'>
                      <Button size='sm' variant='outline'>
                        View Proposal
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className='p-4 border rounded-lg'>
                  <div className='flex items-center justify-between mb-2'>
                    <h4 className='font-semibold'>Marketing Campaign Fund</h4>
                    <Badge className='bg-yellow-100 text-yellow-800'>
                      Pending
                    </Badge>
                  </div>
                  <p className='text-sm text-slate-600 mb-3'>
                    Marketing initiative to increase platform adoption
                  </p>
                  <div className='flex items-center justify-between'>
                    <span className='text-lg font-semibold'>150,000 MAS</span>
                    <Link href='/governance/proposal/7'>
                      <Button size='sm' variant='outline'>
                        View Proposal
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
