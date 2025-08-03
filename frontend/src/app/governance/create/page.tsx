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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Plus,
  FileText,
  Calendar,
  Users,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

interface ProposalFormData {
  title: string;
  category: string;
  description: string;
  rationale: string;
  implementation: string;
  timeline: string;
  budget: string;
  impact: string;
}

export default function GovernanceCreatePage() {
  const [formData, setFormData] = useState<ProposalFormData>({
    title: "",
    category: "governance",
    description: "",
    rationale: "",
    implementation: "",
    timeline: "",
    budget: "",
    impact: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof ProposalFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert(
      "Proposal submitted successfully! It will be reviewed by the community."
    );
    setIsSubmitting(false);

    // Reset form
    setFormData({
      title: "",
      category: "governance",
      description: "",
      rationale: "",
      implementation: "",
      timeline: "",
      budget: "",
      impact: "",
    });
  };

  const isFormValid =
    formData.title && formData.description && formData.rationale;

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      <Navigation />

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
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

            <div className='text-center mb-8'>
              <h1 className='text-4xl font-bold text-slate-900 mb-2'>
                Create Governance Proposal
              </h1>
              <p className='text-xl text-slate-600'>
                Submit your ideas to shape VeritasChain&rsquo;s future
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-8'>
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <FileText className='h-5 w-5' />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Provide the essential details of your proposal
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <label
                    htmlFor='title'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Proposal Title *
                  </label>
                  <Input
                    id='title'
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder='Enter a clear, descriptive title for your proposal'
                    className='mt-1'
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='category'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Category
                  </label>
                  <select
                    id='category'
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value='governance'>Governance</option>
                    <option value='economics'>Economics</option>
                    <option value='treasury'>Treasury</option>
                    <option value='platform'>Platform</option>
                    <option value='technical'>Technical</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='description'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Brief Description *
                  </label>
                  <Textarea
                    id='description'
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder='Provide a concise summary of your proposal (2-3 sentences)'
                    className='mt-1 min-h-[100px]'
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Users className='h-5 w-5' />
                  Detailed Proposal
                </CardTitle>
                <CardDescription>
                  Provide comprehensive details and justification
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <label
                    htmlFor='rationale'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Rationale & Problem Statement *
                  </label>
                  <Textarea
                    id='rationale'
                    value={formData.rationale}
                    onChange={(e) =>
                      handleInputChange("rationale", e.target.value)
                    }
                    placeholder="Explain the problem this proposal solves and why it's important for VeritasChain"
                    className='mt-1 min-h-[120px]'
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='implementation'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Implementation Plan
                  </label>
                  <Textarea
                    id='implementation'
                    value={formData.implementation}
                    onChange={(e) =>
                      handleInputChange("implementation", e.target.value)
                    }
                    placeholder='Describe how this proposal would be implemented, including technical details if applicable'
                    className='mt-1 min-h-[120px]'
                  />
                </div>

                <div>
                  <label
                    htmlFor='impact'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Expected Impact
                  </label>
                  <Textarea
                    id='impact'
                    value={formData.impact}
                    onChange={(e) =>
                      handleInputChange("impact", e.target.value)
                    }
                    placeholder='Describe the expected benefits and potential risks of this proposal'
                    className='mt-1 min-h-[100px]'
                  />
                </div>
              </CardContent>
            </Card>

            {/* Timeline & Budget */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Calendar className='h-5 w-5' />
                  Timeline & Resources
                </CardTitle>
                <CardDescription>
                  Specify timeline and resource requirements
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <label
                    htmlFor='timeline'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Implementation Timeline
                  </label>
                  <Input
                    id='timeline'
                    value={formData.timeline}
                    onChange={(e) =>
                      handleInputChange("timeline", e.target.value)
                    }
                    placeholder='e.g., 3 months, Q1 2025, Immediate'
                    className='mt-1'
                  />
                </div>

                <div>
                  <label
                    htmlFor='budget'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Budget Request (if applicable)
                  </label>
                  <div className='relative mt-1'>
                    <DollarSign className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                    <Input
                      id='budget'
                      value={formData.budget}
                      onChange={(e) =>
                        handleInputChange("budget", e.target.value)
                      }
                      placeholder='Enter amount in MAS tokens (e.g., 100,000 MAS)'
                      className='pl-10'
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submission */}
            <Card>
              <CardContent className='pt-6'>
                <div className='flex flex-col sm:flex-row gap-4 justify-between items-start'>
                  <div className='text-sm text-slate-600'>
                    <p className='mb-2'>
                      <strong>Before submitting:</strong>
                    </p>
                    <ul className='list-disc list-inside space-y-1'>
                      <li>Review your proposal for clarity and completeness</li>
                      <li>Ensure you have community support</li>
                      <li>Consider the impact on all stakeholders</li>
                    </ul>
                  </div>

                  <div className='flex gap-3'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => {
                        const draft = JSON.stringify(formData);
                        if (typeof window !== "undefined") {
                          localStorage.setItem(
                            "governance-proposal-draft",
                            draft
                          );
                          alert("Proposal saved as draft!");
                        }
                      }}
                    >
                      Save Draft
                    </Button>

                    <Button
                      type='submit'
                      disabled={!isFormValid || isSubmitting}
                      className='min-w-[120px]'
                    >
                      {isSubmitting ? (
                        <>
                          <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Plus className='mr-2 h-4 w-4' />
                          Submit Proposal
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>

          {/* Help Section */}
          <Card className='mt-8 bg-blue-50 border-blue-200'>
            <CardHeader>
              <CardTitle className='text-blue-900'>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid md:grid-cols-2 gap-4 text-sm'>
                <div>
                  <h4 className='font-semibold text-blue-900 mb-2'>
                    Proposal Guidelines
                  </h4>
                  <ul className='space-y-1 text-blue-800'>
                    <li>• Be specific and actionable</li>
                    <li>• Include measurable outcomes</li>
                    <li>• Consider community feedback</li>
                    <li>• Follow the proposal template</li>
                  </ul>
                </div>
                <div>
                  <h4 className='font-semibold text-blue-900 mb-2'>
                    Community Resources
                  </h4>
                  <ul className='space-y-1 text-blue-800'>
                    <li>• Join discussion forums</li>
                    <li>• Review successful proposals</li>
                    <li>• Seek mentor guidance</li>
                    <li>• Get early feedback</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
