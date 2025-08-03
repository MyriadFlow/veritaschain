"use client";

import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Star, Trophy, Target, Award, TrendingUp } from "lucide-react";

export default function GuildsPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      <Navigation />

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-slate-900 mb-2'>
              Journalist Guilds
            </h1>
            <p className='text-slate-600'>
              Join professional guilds to collaborate, share expertise, and
              enhance your reputation in the journalism community.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <Card className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-2'>
                    <Trophy className='h-5 w-5 text-yellow-500' />
                    Elite Press Guild
                  </CardTitle>
                  <Badge className='bg-yellow-100 text-yellow-800'>
                    Premium
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-slate-600 mb-4'>
                  The most prestigious guild for award-winning journalists and
                  seasoned professionals.
                </p>
                <div className='space-y-2 mb-4'>
                  <div className='flex justify-between text-sm'>
                    <span>Members:</span>
                    <span className='font-medium'>47</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Avg. Reputation:</span>
                    <span className='font-medium'>95/100</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Requirements:</span>
                    <span className='font-medium'>90+ Rep</span>
                  </div>
                </div>
                <Button className='w-full'>Apply to Join</Button>
              </CardContent>
            </Card>

            <Card className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-2'>
                    <Target className='h-5 w-5 text-blue-500' />
                    Fact-Checkers United
                  </CardTitle>
                  <Badge variant='secondary'>Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-slate-600 mb-4'>
                  Dedicated to maintaining accuracy and fighting misinformation
                  through collaborative fact-checking.
                </p>
                <div className='space-y-2 mb-4'>
                  <div className='flex justify-between text-sm'>
                    <span>Members:</span>
                    <span className='font-medium'>128</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Avg. Reputation:</span>
                    <span className='font-medium'>78/100</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Requirements:</span>
                    <span className='font-medium'>60+ Rep</span>
                  </div>
                </div>
                <Button className='w-full'>Join Guild</Button>
              </CardContent>
            </Card>

            <Card className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-2'>
                    <Users className='h-5 w-5 text-green-500' />
                    Independent Writers
                  </CardTitle>
                  <Badge variant='outline'>Open</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-slate-600 mb-4'>
                  A supportive community for freelance journalists and
                  independent content creators.
                </p>
                <div className='space-y-2 mb-4'>
                  <div className='flex justify-between text-sm'>
                    <span>Members:</span>
                    <span className='font-medium'>342</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Avg. Reputation:</span>
                    <span className='font-medium'>65/100</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Requirements:</span>
                    <span className='font-medium'>None</span>
                  </div>
                </div>
                <Button className='w-full'>Join Guild</Button>
              </CardContent>
            </Card>

            <Card className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-2'>
                    <Star className='h-5 w-5 text-purple-500' />
                    Tech Journalism Hub
                  </CardTitle>
                  <Badge variant='secondary'>Specialized</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-slate-600 mb-4'>
                  Focused on technology reporting, cryptocurrency, and
                  blockchain journalism.
                </p>
                <div className='space-y-2 mb-4'>
                  <div className='flex justify-between text-sm'>
                    <span>Members:</span>
                    <span className='font-medium'>89</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Avg. Reputation:</span>
                    <span className='font-medium'>82/100</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Requirements:</span>
                    <span className='font-medium'>Tech Focus</span>
                  </div>
                </div>
                <Button className='w-full'>Join Guild</Button>
              </CardContent>
            </Card>

            <Card className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-2'>
                    <Award className='h-5 w-5 text-red-500' />
                    Breaking News Network
                  </CardTitle>
                  <Badge className='bg-red-100 text-red-800'>24/7</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-slate-600 mb-4'>
                  Rapid response team for breaking news coverage and real-time
                  reporting.
                </p>
                <div className='space-y-2 mb-4'>
                  <div className='flex justify-between text-sm'>
                    <span>Members:</span>
                    <span className='font-medium'>76</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Avg. Reputation:</span>
                    <span className='font-medium'>88/100</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Requirements:</span>
                    <span className='font-medium'>75+ Rep</span>
                  </div>
                </div>
                <Button className='w-full'>Apply to Join</Button>
              </CardContent>
            </Card>

            <Card className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-2'>
                    <TrendingUp className='h-5 w-5 text-indigo-500' />
                    Rising Voices
                  </CardTitle>
                  <Badge variant='outline'>New</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-slate-600 mb-4'>
                  Supporting new journalists and providing mentorship
                  opportunities for career growth.
                </p>
                <div className='space-y-2 mb-4'>
                  <div className='flex justify-between text-sm'>
                    <span>Members:</span>
                    <span className='font-medium'>156</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Avg. Reputation:</span>
                    <span className='font-medium'>45/100</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Requirements:</span>
                    <span className='font-medium'>&lt; 50 Rep</span>
                  </div>
                </div>
                <Button className='w-full'>Join Guild</Button>
              </CardContent>
            </Card>
          </div>

          <Card className='mt-8'>
            <CardHeader>
              <CardTitle>Guild Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='text-center'>
                  <Users className='h-8 w-8 text-blue-500 mx-auto mb-2' />
                  <h3 className='font-semibold mb-1'>Collaboration</h3>
                  <p className='text-sm text-slate-600'>
                    Work with like-minded journalists on important stories
                  </p>
                </div>
                <div className='text-center'>
                  <Award className='h-8 w-8 text-green-500 mx-auto mb-2' />
                  <h3 className='font-semibold mb-1'>Enhanced Reputation</h3>
                  <p className='text-sm text-slate-600'>
                    Guild membership boosts your credibility and trust score
                  </p>
                </div>
                <div className='text-center'>
                  <Target className='h-8 w-8 text-purple-500 mx-auto mb-2' />
                  <h3 className='font-semibold mb-1'>
                    Exclusive Opportunities
                  </h3>
                  <p className='text-sm text-slate-600'>
                    Access to guild-only assignments and higher rewards
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
