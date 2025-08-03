"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  User,
  Calendar,
} from "lucide-react";
import Link from "next/link";

interface Verification {
  id: string;
  articleId: string;
  articleTitle: string;
  author: string;
  verifier: string;
  status: "verified" | "disputed" | "pending" | "rejected";
  category: string;
  verificationDate: string;
  credibilityScore: number;
  claimsVerified: number;
  totalClaims: number;
  evidence: number;
  votesFor: number;
  votesAgainst: number;
}

const mockVerifications: Verification[] = [
  {
    id: "1",
    articleId: "101",
    articleTitle: "New Climate Policy Reduces Emissions by 40%",
    author: "climate.reporter",
    verifier: "fact.checker.1",
    status: "verified",
    category: "Environment",
    verificationDate: "2025-08-02",
    credibilityScore: 92,
    claimsVerified: 7,
    totalClaims: 8,
    evidence: 15,
    votesFor: 23,
    votesAgainst: 2,
  },
  {
    id: "2",
    articleId: "102",
    articleTitle: "Breakthrough in Renewable Energy Storage",
    author: "tech.journalist",
    verifier: "fact.checker.2",
    status: "disputed",
    category: "Technology",
    verificationDate: "2025-08-01",
    credibilityScore: 78,
    claimsVerified: 4,
    totalClaims: 6,
    evidence: 8,
    votesFor: 12,
    votesAgainst: 8,
  },
  {
    id: "3",
    articleId: "103",
    articleTitle: "Economic Indicators Show Recovery Signs",
    author: "econ.analyst",
    verifier: "fact.checker.3",
    status: "verified",
    category: "Economics",
    verificationDate: "2025-07-31",
    credibilityScore: 95,
    claimsVerified: 6,
    totalClaims: 6,
    evidence: 12,
    votesFor: 31,
    votesAgainst: 1,
  },
  {
    id: "4",
    articleId: "104",
    articleTitle: "Healthcare Innovation Reduces Treatment Costs",
    author: "health.reporter",
    verifier: "fact.checker.1",
    status: "pending",
    category: "Healthcare",
    verificationDate: "2025-08-03",
    credibilityScore: 0,
    claimsVerified: 5,
    totalClaims: 8,
    evidence: 9,
    votesFor: 0,
    votesAgainst: 0,
  },
  {
    id: "5",
    articleId: "105",
    articleTitle: "Misleading Statistics on Crime Rates",
    author: "news.outlet.x",
    verifier: "fact.checker.4",
    status: "rejected",
    category: "Society",
    verificationDate: "2025-07-30",
    credibilityScore: 34,
    claimsVerified: 2,
    totalClaims: 7,
    evidence: 4,
    votesFor: 3,
    votesAgainst: 18,
  },
];

export default function VerifyAllPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredVerifications = mockVerifications.filter((verification) => {
    const matchesSearch =
      verification.articleTitle
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      verification.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verification.verifier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || verification.status === selectedStatus;
    const matchesCategory =
      selectedCategory === "all" ||
      verification.category.toLowerCase() === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "disputed":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className='h-4 w-4' />;
      case "disputed":
        return <Clock className='h-4 w-4' />;
      case "pending":
        return <Clock className='h-4 w-4' />;
      case "rejected":
        return <XCircle className='h-4 w-4' />;
      default:
        return <Clock className='h-4 w-4' />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    if (score >= 50) return "text-orange-600";
    return "text-red-600";
  };

  const totalVerifications = mockVerifications.length;
  const verifiedCount = mockVerifications.filter(
    (v) => v.status === "verified"
  ).length;
  const avgScore = Math.round(
    mockVerifications
      .filter((v) => v.credibilityScore > 0)
      .reduce((sum, v) => sum + v.credibilityScore, 0) /
      mockVerifications.filter((v) => v.credibilityScore > 0).length
  );

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
                Back to Fact Checker
              </Button>
            </Link>

            <div className='flex items-center justify-between mb-6'>
              <div>
                <h1 className='text-4xl font-bold text-slate-900 mb-2'>
                  All Verifications
                </h1>
                <p className='text-xl text-slate-600'>
                  Browse the complete verification database
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
                    Total Verifications
                  </CardTitle>
                  <CheckCircle className='h-4 w-4 text-blue-600' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-blue-600'>
                  {totalVerifications}
                </div>
                <div className='text-sm text-slate-500'>Articles processed</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-sm font-medium text-slate-600'>
                    Verified
                  </CardTitle>
                  <CheckCircle className='h-4 w-4 text-green-600' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-green-600'>
                  {verifiedCount}
                </div>
                <div className='text-sm text-slate-500'>
                  {Math.round((verifiedCount / totalVerifications) * 100)}%
                  success rate
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-sm font-medium text-slate-600'>
                    Avg Score
                  </CardTitle>
                  <CheckCircle className='h-4 w-4 text-purple-600' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-purple-600'>
                  {avgScore}/100
                </div>
                <div className='text-sm text-slate-500'>Credibility rating</div>
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
                      placeholder='Search verifications...'
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
                      <option value='verified'>Verified</option>
                      <option value='disputed'>Disputed</option>
                      <option value='pending'>Pending</option>
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
                      <option value='environment'>Environment</option>
                      <option value='technology'>Technology</option>
                      <option value='economics'>Economics</option>
                      <option value='healthcare'>Healthcare</option>
                      <option value='society'>Society</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verifications List */}
          <div className='grid gap-6'>
            {filteredVerifications.map((verification) => (
              <Card
                key={verification.id}
                className='hover:shadow-lg transition-shadow'
              >
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-2'>
                        <CardTitle className='text-xl'>
                          <Link
                            href={`/article/${verification.articleId}`}
                            className='hover:text-blue-600'
                          >
                            {verification.articleTitle}
                          </Link>
                        </CardTitle>
                        <Badge className={getStatusColor(verification.status)}>
                          <div className='flex items-center gap-1'>
                            {getStatusIcon(verification.status)}
                            {verification.status}
                          </div>
                        </Badge>
                        <Badge variant='outline'>{verification.category}</Badge>
                      </div>

                      <div className='flex items-center gap-4 text-sm text-slate-600 mb-3'>
                        <div className='flex items-center gap-1'>
                          <User className='h-3 w-3' />
                          <span>By {verification.author}</span>
                        </div>
                        <span>•</span>
                        <div className='flex items-center gap-1'>
                          <CheckCircle className='h-3 w-3' />
                          <span>Verified by {verification.verifier}</span>
                        </div>
                        <span>•</span>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-3 w-3' />
                          <span>{verification.verificationDate}</span>
                        </div>
                      </div>

                      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                        <div>
                          <div className='text-slate-600'>
                            Credibility Score
                          </div>
                          <div
                            className={`font-bold text-lg ${getScoreColor(
                              verification.credibilityScore
                            )}`}
                          >
                            {verification.status === "pending"
                              ? "-"
                              : `${verification.credibilityScore}/100`}
                          </div>
                        </div>
                        <div>
                          <div className='text-slate-600'>Claims Verified</div>
                          <div className='font-semibold'>
                            {verification.claimsVerified}/
                            {verification.totalClaims}
                          </div>
                        </div>
                        <div>
                          <div className='text-slate-600'>Evidence</div>
                          <div className='font-semibold'>
                            {verification.evidence} sources
                          </div>
                        </div>
                        <div>
                          <div className='text-slate-600'>Community Votes</div>
                          <div className='font-semibold'>
                            <span className='text-green-600'>
                              {verification.votesFor}
                            </span>{" "}
                            /
                            <span className='text-red-600'>
                              {verification.votesAgainst}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className='flex gap-3'>
                    <Link
                      href={`/verify/${verification.id}`}
                      className='flex-1'
                    >
                      <Button variant='outline' className='w-full'>
                        <Eye className='mr-2 h-4 w-4' />
                        View Details
                      </Button>
                    </Link>
                    <Link href={`/article/${verification.articleId}`}>
                      <Button variant='outline'>Read Article</Button>
                    </Link>
                    {verification.status === "disputed" && (
                      <Link href={`/dispute/${verification.id}`}>
                        <Button variant='outline' className='text-yellow-600'>
                          View Dispute
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredVerifications.length === 0 && (
            <Card className='text-center py-12'>
              <CardContent>
                <CheckCircle className='h-12 w-12 text-slate-400 mx-auto mb-4' />
                <h3 className='text-lg font-semibold text-slate-900 mb-2'>
                  No verifications found
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
