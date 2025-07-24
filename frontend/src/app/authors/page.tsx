"use client";

import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockAuthors, mockArticles } from "@/lib/mock-data";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { User, Shield, TrendingUp, BookOpen, Calendar } from "lucide-react";

export default function AuthorsPage() {
  return (
    <div className='min-h-screen bg-white'>
      <Navigation />

      {/* Header */}
      <section className='bg-gray-50 py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              Independent Journalists
            </h1>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
              Meet the verified journalists and writers building the future of
              decentralized media. Each author stakes their reputation on the
              quality and accuracy of their work.
            </p>
          </div>
        </div>
      </section>

      {/* Authors Grid */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {mockAuthors.map((author) => {
              const authorArticles = mockArticles.filter(
                (article) => article.author.id === author.id
              );

              return (
                <div
                  key={author.id}
                  className='bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow'
                >
                  {/* Author Avatar */}
                  <div className='flex items-start space-x-4 mb-4'>
                    <div className='w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0'>
                      <User className='h-8 w-8 text-gray-600' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-serif text-xl font-semibold text-gray-900 mb-1'>
                        {author.name}
                      </h3>
                      <div className='flex items-center space-x-2 mb-2'>
                        {author.verified && (
                          <Badge
                            variant='outline'
                            className='flex items-center space-x-1 text-xs'
                          >
                            <Shield className='h-3 w-3' />
                            <span>Verified</span>
                          </Badge>
                        )}
                        <Badge variant='secondary' className='text-xs'>
                          {author.reputation}% reputation
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Author Bio */}
                  <p className='text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3'>
                    {author.bio}
                  </p>

                  {/* Author Stats */}
                  <div className='grid grid-cols-2 gap-4 mb-4 text-sm'>
                    <div className='flex items-center space-x-2 text-gray-500'>
                      <BookOpen className='h-4 w-4' />
                      <span>{author.articlesPublished} articles</span>
                    </div>
                    <div className='flex items-center space-x-2 text-gray-500'>
                      <TrendingUp className='h-4 w-4' />
                      <span>{author.totalVotes} votes</span>
                    </div>
                    <div className='flex items-center space-x-2 text-gray-500 col-span-2'>
                      <Calendar className='h-4 w-4' />
                      <span>
                        Joined{" "}
                        {formatDistanceToNow(new Date(author.joinedDate))} ago
                      </span>
                    </div>
                  </div>

                  {/* Recent Articles */}
                  {authorArticles.length > 0 && (
                    <div className='border-t border-gray-200 pt-4'>
                      <h4 className='font-medium text-gray-900 mb-2 text-sm'>
                        Recent Stories
                      </h4>
                      <div className='space-y-2'>
                        {authorArticles.slice(0, 2).map((article) => (
                          <Link
                            key={article.id}
                            href={`/article/${article.id}`}
                            className='block'
                          >
                            <div className='text-sm'>
                              <h5 className='text-gray-900 font-medium hover:text-gray-700 transition-colors line-clamp-1'>
                                {article.title}
                              </h5>
                              <p className='text-gray-500 text-xs mt-1'>
                                {formatDistanceToNow(
                                  new Date(article.publishedAt)
                                )}{" "}
                                ago
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* View Profile Button */}
                  <div className='mt-4 pt-4 border-t border-gray-200'>
                    <Button variant='outline' size='sm' className='w-full'>
                      View Profile
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-gray-900 text-white py-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='font-serif text-3xl md:text-4xl font-bold mb-6'>
            Become a VeritasChain Author
          </h2>
          <p className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'>
            Join our community of independent journalists. Build your
            reputation, earn from your work, and help combat misinformation.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              size='lg'
              className='bg-white text-gray-900 hover:bg-gray-100'
            >
              Apply to Write
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-white text-white hover:bg-white hover:text-gray-900'
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
