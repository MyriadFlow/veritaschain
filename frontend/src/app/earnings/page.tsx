"use client";

import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Calendar, Download, Eye } from "lucide-react";

export default function EarningsPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      <Navigation />

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-slate-900 mb-2'>
              Earnings Dashboard
            </h1>
            <p className='text-slate-600'>
              Track your earnings from article publishing, fact-checking, and
              governance participation.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Earnings
                </CardTitle>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>1,247 MAS</div>
                <p className='text-xs text-muted-foreground'>
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  This Month
                </CardTitle>
                <TrendingUp className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>284 MAS</div>
                <p className='text-xs text-muted-foreground'>
                  From 23 activities
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Pending</CardTitle>
                <Calendar className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>45 MAS</div>
                <p className='text-xs text-muted-foreground'>3 transactions</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Earnings Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center justify-between p-4 border rounded-lg'>
                  <div>
                    <h3 className='font-medium'>Article Publishing</h3>
                    <p className='text-sm text-slate-600'>
                      Revenue from published articles
                    </p>
                  </div>
                  <div className='text-right'>
                    <div className='font-bold'>892 MAS</div>
                    <Badge variant='secondary'>71.5%</Badge>
                  </div>
                </div>

                <div className='flex items-center justify-between p-4 border rounded-lg'>
                  <div>
                    <h3 className='font-medium'>Fact-Checking Rewards</h3>
                    <p className='text-sm text-slate-600'>
                      Verification and dispute resolution
                    </p>
                  </div>
                  <div className='text-right'>
                    <div className='font-bold'>245 MAS</div>
                    <Badge variant='secondary'>19.6%</Badge>
                  </div>
                </div>

                <div className='flex items-center justify-between p-4 border rounded-lg'>
                  <div>
                    <h3 className='font-medium'>Governance Participation</h3>
                    <p className='text-sm text-slate-600'>
                      Voting and proposal rewards
                    </p>
                  </div>
                  <div className='text-right'>
                    <div className='font-bold'>110 MAS</div>
                    <Badge variant='secondary'>8.9%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='mt-8 flex justify-end gap-2'>
            <Button variant='outline'>
              <Download className='h-4 w-4 mr-2' />
              Export Report
            </Button>
            <Button>
              <Eye className='h-4 w-4 mr-2' />
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
