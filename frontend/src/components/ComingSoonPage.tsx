import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { ArrowLeft, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

interface ComingSoonPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  timeline: string;
  backLink: string;
  backText: string;
}

export default function ComingSoonPage({
  title,
  description,
  icon,
  features,
  timeline,
  backLink,
  backText,
}: ComingSoonPageProps) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      <Navigation />

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Back Navigation */}
          <Link href={backLink}>
            <Button
              variant='ghost'
              className='mb-6 text-slate-600 hover:text-slate-900'
            >
              <ArrowLeft className='mr-2 h-4 w-4' />
              {backText}
            </Button>
          </Link>

          {/* Main Content */}
          <div className='text-center mb-8'>
            <div className='flex justify-center mb-4'>{icon}</div>

            <h1 className='text-4xl font-bold text-slate-900 mb-4'>{title}</h1>

            <p className='text-xl text-slate-600 max-w-2xl mx-auto mb-8'>
              {description}
            </p>

            {/* Timeline Badge */}
            <div className='inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium'>
              <Clock className='mr-2 h-4 w-4' />
              Expected Launch: {timeline}
            </div>
          </div>

          {/* Features Grid */}
          <Card className='mb-8'>
            <CardHeader>
              <CardTitle className='text-2xl text-slate-900'>
                Planned Features
              </CardTitle>
              <CardDescription>
                Here&rsquo;s what we&rsquo;re building for this section of
                VeritasChain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid md:grid-cols-2 gap-4'>
                {features.map((feature, index) => (
                  <div key={index} className='flex items-start space-x-3'>
                    <CheckCircle className='h-5 w-5 text-green-500 mt-0.5 flex-shrink-0' />
                    <span className='text-slate-700'>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status Update */}
          <Card className='bg-slate-900 text-white'>
            <CardHeader>
              <CardTitle className='text-xl'>Development Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <p className='text-slate-300'>
                  This feature is currently under active development.
                  We&rsquo;re building a comprehensive platform that will
                  revolutionize decentralized journalism and fact-checking.
                </p>

                <div className='flex flex-col sm:flex-row gap-4'>
                  <div className='flex-1'>
                    <h4 className='font-semibold text-white mb-2'>
                      What&rsquo;s Working Now:
                    </h4>
                    <ul className='text-sm text-slate-300 space-y-1'>
                      <li>• Article publishing system</li>
                      <li>• IPFS content storage</li>
                      <li>• Massa blockchain integration</li>
                      <li>• Basic reputation tracking</li>
                    </ul>
                  </div>

                  <div className='flex-1'>
                    <h4 className='font-semibold text-white mb-2'>
                      Coming Next:
                    </h4>
                    <ul className='text-sm text-slate-300 space-y-1'>
                      <li>• Advanced governance features</li>
                      <li>• Comprehensive fact-checking tools</li>
                      <li>• Token economics integration</li>
                      <li>• Community verification system</li>
                    </ul>
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
