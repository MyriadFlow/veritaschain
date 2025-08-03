"use client";

import { Navigation } from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Shield,
  DollarSign,
  Activity,
  Eye,
  MessageSquare,
  Award,
} from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      <Navigation />

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-slate-900 mb-2'>
              Platform Analytics
            </h1>
            <p className='text-slate-600'>
              Comprehensive insights into VeritasChain platform performance and
              community engagement.
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Articles
                </CardTitle>
                <FileText className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>1,247</div>
                <p className='text-xs text-muted-foreground'>
                  +23% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Active Users
                </CardTitle>
                <Users className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>8,432</div>
                <p className='text-xs text-muted-foreground'>
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Verified Articles
                </CardTitle>
                <Shield className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>892</div>
                <p className='text-xs text-muted-foreground'>
                  71.5% verification rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Revenue
                </CardTitle>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>45,230 MAS</div>
                <p className='text-xs text-muted-foreground'>
                  +18% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <TrendingUp className='h-5 w-5' />
                  Article Publishing Trends
                </CardTitle>
                <CardDescription>
                  Monthly article publication over the past year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='h-64 bg-slate-100 rounded-lg flex items-center justify-center'>
                  <div className='text-center text-slate-500'>
                    <BarChart3 className='h-12 w-12 mx-auto mb-2 opacity-50' />
                    <p>Chart visualization would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Activity className='h-5 w-5' />
                  User Engagement Metrics
                </CardTitle>
                <CardDescription>
                  Daily active users and engagement rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='h-64 bg-slate-100 rounded-lg flex items-center justify-center'>
                  <div className='text-center text-slate-500'>
                    <Activity className='h-12 w-12 mx-auto mb-2 opacity-50' />
                    <p>Engagement chart would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Content Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>
                  Top performing articles and categories
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium'>Breaking News</p>
                      <p className='text-xs text-slate-500'>
                        45.2% of total views
                      </p>
                    </div>
                    <Badge variant='secondary'>Top Category</Badge>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium'>Technology</p>
                      <p className='text-xs text-slate-500'>
                        23.8% of total views
                      </p>
                    </div>
                    <Eye className='h-4 w-4 text-slate-400' />
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium'>Politics</p>
                      <p className='text-xs text-slate-500'>
                        18.5% of total views
                      </p>
                    </div>
                    <Eye className='h-4 w-4 text-slate-400' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Engagement */}
            <Card>
              <CardHeader>
                <CardTitle>Community Engagement</CardTitle>
                <CardDescription>
                  User interaction and participation metrics
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <MessageSquare className='h-4 w-4 text-blue-500' />
                      <span className='text-sm'>Comments</span>
                    </div>
                    <span className='text-sm font-medium'>3,247</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <Shield className='h-4 w-4 text-green-500' />
                      <span className='text-sm'>Verifications</span>
                    </div>
                    <span className='text-sm font-medium'>892</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <Award className='h-4 w-4 text-yellow-500' />
                      <span className='text-sm'>Fact-Checks</span>
                    </div>
                    <span className='text-sm font-medium'>156</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Health */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
                <CardDescription>
                  System performance and reliability metrics
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Uptime</span>
                    <Badge
                      variant='outline'
                      className='bg-green-50 text-green-700'
                    >
                      99.9%
                    </Badge>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Avg Response Time</span>
                    <span className='text-sm font-medium'>120ms</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Error Rate</span>
                    <Badge
                      variant='outline'
                      className='bg-green-50 text-green-700'
                    >
                      0.1%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Actions */}
          <div className='mt-8 flex justify-end'>
            <div className='flex gap-2'>
              <Button variant='outline'>Export CSV</Button>
              <Button variant='outline'>Generate Report</Button>
              <Button>Schedule Report</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
