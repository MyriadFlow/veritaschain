"use client";

import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useWallet } from "@/lib/wallet-provider";
import { veritasChainService, Article } from "@/lib/veritas-service";
import { useEffect, useState } from "react";
import { PenTool, Eye, Edit, Trash2, Plus, Search } from "lucide-react";

export default function ManageArticlesPage() {
  const { isConnected, address, connect, loading, provider } = useWallet();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Set wallet in service when connected
  useEffect(() => {
    if (isConnected && provider) {
      veritasChainService.setWallet(provider);
    }
  }, [isConnected, provider]);

  // Load user's articles when connected
  useEffect(() => {
    const loadData = async () => {
      if (isConnected && address) {
        try {
          setLoadingArticles(true);
          const userArticles = await veritasChainService.getArticlesByAuthor(
            address
          );
          setArticles(userArticles);
        } catch (error) {
          console.error("Error loading user articles:", error);
        } finally {
          setLoadingArticles(false);
        }
      }
    };

    loadData();
  }, [isConnected, address]);

  // Filter articles based on search and status
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.excerpt &&
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      statusFilter === "all" || article.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isConnected) {
    return (
      <div className='min-h-screen bg-[#f8f7f4]'>
        <Navigation />
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center'>
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-8'>
            <h1 className='font-serif text-3xl font-bold text-gray-900 mb-4'>
              Connect Your Wallet
            </h1>
            <p className='text-gray-600 mb-6'>
              You need to connect your Massa wallet to manage your articles.
            </p>
            <Button
              size='lg'
              className='bg-blue-600 hover:bg-blue-700'
              onClick={connect}
              disabled={loading}
            >
              {loading ? "Connecting..." : "Connect Massa Wallet"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#f8f7f4]'>
      <Navigation />

      <div className='max-w-6xl mx-auto px-4 py-8'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900 font-serif'>
              Manage Articles
            </h1>
            <p className='text-gray-600 mt-2'>
              {filteredArticles.length} articles published
            </p>
          </div>
          <Link
            href='/publish'
            className='px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2'
          >
            <Plus className='h-4 w-4' />
            <span>New Article</span>
          </Link>
        </div>

        {/* Filters */}
        <div className='flex items-center space-x-4 mb-6'>
          <div className='relative flex-1 max-w-md'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
            <input
              type='text'
              placeholder='Search your articles...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            <option value='all'>All Status</option>
            <option value='pending'>Pending</option>
            <option value='verified'>Verified</option>
            <option value='rejected'>Rejected</option>
          </select>
        </div>

        {/* Articles Grid */}
        {loadingArticles ? (
          <div className='text-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4' />
            <p className='text-gray-600'>Loading your articles...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className='text-center py-12'>
            <PenTool className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              {articles.length === 0
                ? "No articles yet"
                : "No articles match your search"}
            </h3>
            <p className='text-gray-600 mb-6'>
              {articles.length === 0
                ? "Start building your journalism portfolio by publishing your first article."
                : "Try adjusting your search terms or filters."}
            </p>
            {articles.length === 0 && (
              <Link
                href='/publish'
                className='inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
              >
                <Plus className='h-4 w-4' />
                <span>Publish First Article</span>
              </Link>
            )}
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredArticles.map((article: Article) => (
              <Card
                key={article.id}
                className='hover:shadow-lg transition-shadow'
              >
                <CardHeader>
                  <div className='flex items-center justify-between mb-2'>
                    <Badge
                      variant={
                        article.status === "verified" ? "default" : "secondary"
                      }
                    >
                      {article.status.toUpperCase()}
                    </Badge>
                    <div className='flex items-center space-x-2'>
                      <Link href={`/article/${article.id}/edit`}>
                        <Button variant='ghost' size='sm'>
                          <Edit className='h-4 w-4' />
                        </Button>
                      </Link>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-red-600 hover:text-red-700'
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>

                  <CardTitle className='text-lg font-serif leading-tight'>
                    <Link
                      href={`/article/${article.id}`}
                      className='hover:text-gray-700'
                    >
                      {article.title}
                    </Link>
                  </CardTitle>

                  <CardDescription className='line-clamp-2'>
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className='flex items-center justify-between text-sm text-gray-600 mb-3'>
                    <div className='flex items-center space-x-4'>
                      <span className='flex items-center space-x-1'>
                        <Eye className='h-3 w-3' />
                        <span>{article.voteCount}</span>
                      </span>
                      <span>👍 {article.upvotes}</span>
                    </div>
                    <span className='text-green-600 font-medium'>
                      {article.price ? `${article.price} MAS` : "Free"}
                    </span>
                  </div>

                  <div className='text-xs text-gray-500'>
                    Published{" "}
                    {new Date(
                      article.publishedAt || article.timestamp
                    ).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
