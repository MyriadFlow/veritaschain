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
  Clock,
  User,
  Eye,
  CheckCircle,
  AlertCircle,
  Filter,
} from "lucide-react";
import Link from "next/link";

interface PendingArticle {
  id: string;
  title: string;
  author: string;
  summary: string;
  publishedDate: string;
  category: string;
  priority: "high" | "medium" | "low";
  estimatedTime: number; // in minutes
  claimsCount: number;
  sourcesCount: number;
  complexity: "simple" | "moderate" | "complex";
}

const mockPendingArticles: PendingArticle[] = [
  {
    id: "1",
    title: "New Climate Policy Reduces Emissions by 40%",
    author: "climate.reporter",
    summary:
      "Government announces comprehensive climate policy with ambitious emission reduction targets.",
    publishedDate: "2025-08-03",
    category: "Environment",
    priority: "high",
    estimatedTime: 45,
    claimsCount: 8,
    sourcesCount: 12,
    complexity: "complex",
  },
  {
    id: "2",
    title: "Breakthrough in Renewable Energy Storage",
    author: "tech.journalist",
    summary:
      "Scientists develop new battery technology that could revolutionize renewable energy storage.",
    publishedDate: "2025-08-02",
    category: "Technology",
    priority: "medium",
    estimatedTime: 30,
    claimsCount: 5,
    sourcesCount: 8,
    complexity: "moderate",
  },
  {
    id: "3",
    title: "Local Election Results Impact Analysis",
    author: "politics.desk",
    summary:
      "Analysis of recent local election results and their implications for upcoming national elections.",
    publishedDate: "2025-08-02",
    category: "Politics",
    priority: "medium",
    estimatedTime: 25,
    claimsCount: 6,
    sourcesCount: 15,
    complexity: "moderate",
  },
  {
    id: "4",
    title: "Economic Indicators Show Recovery Signs",
    author: "econ.analyst",
    summary:
      "Latest economic data suggests positive trends in employment and GDP growth.",
    publishedDate: "2025-08-01",
    category: "Economics",
    priority: "low",
    estimatedTime: 20,
    claimsCount: 4,
    sourcesCount: 6,
    complexity: "simple",
  },
  {
    id: "5",
    title: "Healthcare Innovation Reduces Treatment Costs",
    author: "health.reporter",
    summary:
      "New medical technology promises to reduce treatment costs while improving patient outcomes.",
    publishedDate: "2025-08-01",
    category: "Healthcare",
    priority: "high",
    estimatedTime: 35,
    claimsCount: 7,
    sourcesCount: 10,
    complexity: "complex",
  },
];

export default function VerifyPendingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredArticles = mockPendingArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority =
      selectedPriority === "all" || article.priority === selectedPriority;
    const matchesCategory =
      selectedCategory === "all" ||
      article.category.toLowerCase() === selectedCategory;

    return matchesSearch && matchesPriority && matchesCategory;
  });

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

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "simple":
        return "text-green-600";
      case "moderate":
        return "text-yellow-600";
      case "complex":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getComplexityIcon = (complexity: string) => {
    switch (complexity) {
      case "simple":
        return <CheckCircle className='h-4 w-4' />;
      case "moderate":
        return <Clock className='h-4 w-4' />;
      case "complex":
        return <AlertCircle className='h-4 w-4' />;
      default:
        return <Clock className='h-4 w-4' />;
    }
  };

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

            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-4xl font-bold text-slate-900 mb-2'>
                  Pending Verifications
                </h1>
                <p className='text-xl text-slate-600'>
                  Articles awaiting fact-checking verification
                </p>
              </div>

              <div className='flex items-center space-x-4 text-sm text-slate-600'>
                <div className='flex items-center'>
                  <Clock className='mr-1 h-4 w-4' />
                  <span>{filteredArticles.length} Articles</span>
                </div>
                <div className='flex items-center'>
                  <User className='mr-1 h-4 w-4' />
                  <span>42 Active Verifiers</span>
                </div>
              </div>
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
                      placeholder='Search articles...'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className='pl-10'
                    />
                  </div>
                </div>

                <div className='flex flex-wrap gap-2'>
                  <div className='flex items-center gap-2'>
                    <Filter className='h-4 w-4 text-slate-600' />
                    <span className='text-sm text-slate-600'>Priority:</span>
                    <select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value)}
                      className='px-3 py-1 border rounded-md text-sm'
                    >
                      <option value='all'>All</option>
                      <option value='high'>High</option>
                      <option value='medium'>Medium</option>
                      <option value='low'>Low</option>
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
                      <option value='politics'>Politics</option>
                      <option value='economics'>Economics</option>
                      <option value='healthcare'>Healthcare</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Articles */}
          <div className='grid gap-6'>
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                className='hover:shadow-lg transition-shadow'
              >
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-2'>
                        <CardTitle className='text-xl'>
                          <Link
                            href={`/verify/${article.id}`}
                            className='hover:text-blue-600'
                          >
                            {article.title}
                          </Link>
                        </CardTitle>
                        <Badge className={getPriorityColor(article.priority)}>
                          {article.priority} priority
                        </Badge>
                        <Badge variant='outline'>{article.category}</Badge>
                      </div>
                      <CardDescription className='text-base mb-3'>
                        {article.summary}
                      </CardDescription>

                      <div className='flex items-center gap-4 text-sm text-slate-600'>
                        <span>By {article.author}</span>
                        <span>•</span>
                        <span>{article.publishedDate}</span>
                        <span>•</span>
                        <div
                          className={`flex items-center gap-1 ${getComplexityColor(
                            article.complexity
                          )}`}
                        >
                          {getComplexityIcon(article.complexity)}
                          <span className='capitalize'>
                            {article.complexity}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='text-right text-sm text-slate-600'>
                      <div className='mb-1'>~{article.estimatedTime} min</div>
                      <div>{article.claimsCount} claims</div>
                      <div>{article.sourcesCount} sources</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className='flex gap-3'>
                    <Link href={`/verify/${article.id}`} className='flex-1'>
                      <Button className='w-full'>
                        <CheckCircle className='mr-2 h-4 w-4' />
                        Start Verification
                      </Button>
                    </Link>
                    <Link href={`/article/${article.id}`}>
                      <Button variant='outline'>
                        <Eye className='mr-2 h-4 w-4' />
                        Preview
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <Card className='text-center py-12'>
              <CardContent>
                <Clock className='h-12 w-12 text-slate-400 mx-auto mb-4' />
                <h3 className='text-lg font-semibold text-slate-900 mb-2'>
                  No pending articles found
                </h3>
                <p className='text-slate-600 mb-4'>
                  Try adjusting your search criteria or check back later for new
                  articles.
                </p>
                <Link href='/fact-checker'>
                  <Button>Explore Other Options</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <div className='grid md:grid-cols-3 gap-6 mt-8'>
            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm font-medium text-slate-600'>
                  High Priority
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-red-600'>
                  {
                    mockPendingArticles.filter((a) => a.priority === "high")
                      .length
                  }
                </div>
                <div className='text-sm text-slate-500'>
                  Urgent verifications needed
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm font-medium text-slate-600'>
                  Average Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-blue-600'>
                  {Math.round(
                    mockPendingArticles.reduce(
                      (sum, a) => sum + a.estimatedTime,
                      0
                    ) / mockPendingArticles.length
                  )}{" "}
                  min
                </div>
                <div className='text-sm text-slate-500'>
                  Per verification task
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm font-medium text-slate-600'>
                  Total Claims
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-purple-600'>
                  {mockPendingArticles.reduce(
                    (sum, a) => sum + a.claimsCount,
                    0
                  )}
                </div>
                <div className='text-sm text-slate-500'>
                  Awaiting verification
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
