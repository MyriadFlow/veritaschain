"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, MessageSquare } from "lucide-react";

interface VerificationActionsProps {
  verificationId: string;
  currentStatus: string;
}

export default function VerificationActions({
  currentStatus,
}: VerificationActionsProps) {
  const [userVerification, setUserVerification] = useState<
    "verified" | "disputed" | null
  >(null);
  const [evidence, setEvidence] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitVerification = async () => {
    if (!userVerification) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert(`Verification "${userVerification}" submitted successfully!`);
    setIsSubmitting(false);
  };

  if (currentStatus !== "pending") {
    return null; // Only show for pending verifications
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Your Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {/* Verification Choice */}
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Your Assessment
            </label>
            <div className='grid grid-cols-2 gap-2'>
              <Button
                variant={
                  userVerification === "verified" ? "default" : "outline"
                }
                onClick={() => setUserVerification("verified")}
                className='flex items-center gap-2'
              >
                <CheckCircle className='h-4 w-4' />
                Verified
              </Button>
              <Button
                variant={
                  userVerification === "disputed" ? "default" : "outline"
                }
                onClick={() => setUserVerification("disputed")}
                className='flex items-center gap-2'
              >
                <XCircle className='h-4 w-4' />
                Dispute
              </Button>
            </div>
          </div>

          {/* Evidence */}
          <div>
            <label
              htmlFor='evidence'
              className='block text-sm font-medium text-slate-700 mb-2'
            >
              Supporting Evidence
            </label>
            <Textarea
              id='evidence'
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              placeholder='Provide links, sources, or evidence supporting your assessment...'
              className='min-h-[100px]'
            />
          </div>

          {/* Comment */}
          <div>
            <label
              htmlFor='comment'
              className='block text-sm font-medium text-slate-700 mb-2'
            >
              Additional Comments
            </label>
            <Textarea
              id='comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Explain your reasoning...'
              className='min-h-[80px]'
            />
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmitVerification}
            disabled={!userVerification || isSubmitting}
            className='w-full'
          >
            {isSubmitting ? (
              <>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                Submitting...
              </>
            ) : (
              <>
                <MessageSquare className='mr-2 h-4 w-4' />
                Submit Verification
              </>
            )}
          </Button>

          <div className='text-xs text-slate-500 mt-2'>
            Your verification will be recorded on the blockchain and contribute
            to the article&apos;s credibility score.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
