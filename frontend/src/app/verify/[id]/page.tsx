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
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  FileText,
  ExternalLink,
  AlertTriangle,
  Eye,
} from "lucide-react";
import Link from "next/link";
import VerificationActions from "./VerificationActions";

interface Props {
  params: {
    id: string;
  };
}

interface Article {
  id: string;
  title: string;
  author: string;
  content: string;
  publishedDate: string;
  category: string;
  status: "pending" | "verified" | "disputed" | "rejected";
  credibilityScore: number;
  claimsToVerify: {
    id: string;
    claim: string;
    source?: string;
    status: "unverified" | "verified" | "disputed";
    evidence: string[];
  }[];
  verificationHistory: {
    verifier: string;
    action: "verified" | "disputed";
    timestamp: string;
    evidence: string;
    comment: string;
  }[];
  metadata: {
    totalVerifiers: number;
    averageScore: number;
    sourceCount: number;
    disputeCount: number;
  };
}

// Mock data - in real app, this would be fetched based on params.id
const mockArticle: Article = {
  id: "1",
  title: "Climate Change Impacts on Global Food Security Reach Critical Levels",
  author: "climate.reporter",
  content: `A comprehensive study published in Nature Climate Change reveals that global food security is facing unprecedented challenges due to accelerating climate change effects. The research, conducted over five years across 12 countries, demonstrates a 23% decline in crop yields in drought-affected regions.

Key findings include:

1. **Crop Yield Reductions**: Major staple crops including wheat, rice, and maize have shown significant yield reductions in regions experiencing prolonged drought conditions.

2. **Water Scarcity**: Groundwater levels have dropped by an average of 2.3 meters annually in agricultural regions, forcing farmers to abandon traditional farming practices.

3. **Economic Impact**: The study estimates economic losses of $47 billion annually across the studied regions, with smallholder farmers bearing the disproportionate burden.

4. **Migration Patterns**: Approximately 2.1 million people have migrated from rural to urban areas due to agricultural failures, creating new social and economic pressures.

The research team, led by Dr. Sarah Chen from the International Climate Research Institute, emphasizes the urgent need for adaptive agricultural practices and international cooperation to address these challenges.

"We are witnessing a transformation of agricultural systems at an unprecedented pace," states Dr. Chen. "Without immediate intervention, food security will become a critical global crisis within the next decade."

The study recommends implementing drought-resistant crop varieties, improved irrigation systems, and sustainable farming practices to mitigate these effects.`,
  publishedDate: "2025-08-02",
  category: "Environment",
  status: "pending",
  credibilityScore: 0,
  claimsToVerify: [
    {
      id: "1",
      claim: "23% decline in crop yields in drought-affected regions",
      source: "Nature Climate Change study",
      status: "unverified",
      evidence: []
    },
    {
      id: "2", 
      claim: "Groundwater levels dropped by 2.3 meters annually",
      status: "unverified",
      evidence: []
    },
    {
      id: "3",
      claim: "Economic losses of $47 billion annually",
      status: "unverified", 
      evidence: []
    },
    {
      id: "4",
      claim: "2.1 million people migrated from rural to urban areas",
      status: "unverified",
      evidence: []
    }
  ],
  verificationHistory: [],
  metadata: {
    totalVerifiers: 0,
    averageScore: 0,
    sourceCount: 8,
    disputeCount: 0
  }
};

export default function VerificationDetailPage({ params }: Props) {
  const article = mockArticle; // In real app, fetch by params.id

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
        return <CheckCircle className="h-4 w-4" />;
      case "disputed":
        return <AlertTriangle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getClaimStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-50 border-green-200 text-green-800";
      case "disputed":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "unverified":
        return "bg-gray-50 border-gray-200 text-gray-600";
      default:
        return "bg-gray-50 border-gray-200 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/verify/pending">
              <Button variant="ghost" className="mb-4 text-slate-600 hover:text-slate-900">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Pending Verifications
              </Button>
            </Link>

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-3xl font-bold text-slate-900">
                    Verification #{params.id}
                  </h1>
                  <Badge className={getStatusColor(article.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(article.status)}
                      {article.status}
                    </div>
                  </Badge>
                  <Badge variant="outline">{article.category}</Badge>
                </div>

                <h2 className="text-xl text-slate-700 mb-4">{article.title}</h2>

                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>By {article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Published {article.publishedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>{article.metadata.sourceCount} sources</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Article Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Article Content</CardTitle>
                  <CardDescription>
                    Review the full article content for fact-checking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                      {article.content}
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6 pt-6 border-t">
                    <Link href={`/article/${article.id}`}>
                      <Button variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View Full Article
                      </Button>
                    </Link>
                    <Button variant="outline">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Sources
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Claims to Verify */}
              <Card>
                <CardHeader>
                  <CardTitle>Claims Requiring Verification</CardTitle>
                  <CardDescription>
                    Specific claims that need fact-checking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {article.claimsToVerify.map((claim) => (
                      <div
                        key={claim.id}
                        className={`p-4 border rounded-lg ${getClaimStatusColor(claim.status)}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">Claim #{claim.id}</h4>
                          <Badge variant="outline" className="text-xs">
                            {claim.status}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">&ldquo;{claim.claim}&rdquo;</p>
                        {claim.source && (
                          <p className="text-xs text-slate-600">
                            Source: {claim.source}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Verification History */}
              {article.verificationHistory.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Verification History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {article.verificationHistory.map((verification, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              verification.action === "verified"
                                ? "bg-green-100 text-green-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {verification.action === "verified" ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <AlertTriangle className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{verification.verifier}</span>
                              <Badge variant="outline" className="text-xs">
                                {verification.action}
                              </Badge>
                            </div>
                            <div className="text-xs text-slate-500 mb-2">
                              {verification.timestamp}
                            </div>
                            {verification.comment && (
                              <p className="text-sm text-slate-600 mb-2">
                                {verification.comment}
                              </p>
                            )}
                            {verification.evidence && (
                              <div className="text-xs text-blue-600">
                                Evidence: {verification.evidence}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Verification Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Verification Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Credibility Score:</span>
                      <span className="font-medium">
                        {article.status === "pending" ? "Pending" : `${article.credibilityScore}/100`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Total Verifiers:</span>
                      <span className="font-medium">{article.metadata.totalVerifiers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Claims to Verify:</span>
                      <span className="font-medium">{article.claimsToVerify.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Source Count:</span>
                      <span className="font-medium">{article.metadata.sourceCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Disputes:</span>
                      <span className="font-medium">{article.metadata.disputeCount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Actions */}
              <VerificationActions 
                verificationId={params.id} 
                currentStatus={article.status} 
              />

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Link href={`/article/${article.id}`}>
                      <Button variant="outline" className="w-full justify-start">
                        <Eye className="mr-2 h-4 w-4" />
                        Read Full Article
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View External Sources
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Download Evidence
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  // Sample verification IDs for static generation
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" }
  ];
}
