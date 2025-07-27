"use client";

import Link from "next/link";
import Image from "next/image";
import { useWallet } from "@/lib/wallet-provider";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, Wallet } from "lucide-react";

export function Navigation() {
  const { isConnected, address, connect, disconnect, loading, error } =
    useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className='bg-white border-b border-gray-200 sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link href='/' className='flex items-center'>
              <Image
                src='/images/logo.png'
                alt='VeritasChain Logo'
                width={165}
                height={165}
                className='rounded-lg'
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            <Link
              href='/'
              className='text-gray-600 hover:text-gray-900 transition-colors'
            >
              Home
            </Link>
            <Link
              href='/journalist'
              className='text-gray-600 hover:text-gray-900 transition-colors'
            >
              Journalist
            </Link>
            <Link
              href='/reader'
              className='text-gray-600 hover:text-gray-900 transition-colors'
            >
              Reader
            </Link>
            <Link
              href='/fact-checker'
              className='text-gray-600 hover:text-gray-900 transition-colors'
            >
              Fact Checker
            </Link>
            <Link
              href='/governance'
              className='text-gray-600 hover:text-gray-900 transition-colors'
            >
              Governance
            </Link>
          </div>

          {/* Wallet Connection */}
          <div className='flex items-center space-x-4'>
            {error && (
              <div className='text-red-500 text-sm max-w-48 truncate'>
                {error}
              </div>
            )}

            {isConnected ? (
              <div className='flex items-center space-x-3'>
                <div className='hidden sm:flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-lg'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <span className='text-sm text-green-700'>
                    {formatAddress(address || "")}
                  </span>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={disconnect}
                  className='text-red-600 border-red-200 hover:bg-red-50'
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                onClick={connect}
                disabled={loading}
                className='bg-blue-600 hover:bg-blue-700 text-white'
                size='sm'
              >
                {loading ? (
                  <div className='flex items-center space-x-2'>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <div className='flex items-center space-x-2'>
                    <Wallet className='w-4 h-4' />
                    <span>Connect Wallet</span>
                  </div>
                )}
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            >
              {isMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='md:hidden py-4 border-t border-gray-200'>
            <div className='flex flex-col space-y-3'>
              <Link
                href='/'
                className='text-gray-600 hover:text-gray-900 transition-colors py-2'
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href='/journalist'
                className='text-gray-600 hover:text-gray-900 transition-colors py-2'
                onClick={() => setIsMenuOpen(false)}
              >
                Journalist
              </Link>
              <Link
                href='/reader'
                className='text-gray-600 hover:text-gray-900 transition-colors py-2'
                onClick={() => setIsMenuOpen(false)}
              >
                Reader
              </Link>
              <Link
                href='/fact-checker'
                className='text-gray-600 hover:text-gray-900 transition-colors py-2'
                onClick={() => setIsMenuOpen(false)}
              >
                Fact Checker
              </Link>
              <Link
                href='/governance'
                className='text-gray-600 hover:text-gray-900 transition-colors py-2'
                onClick={() => setIsMenuOpen(false)}
              >
                Governance
              </Link>

              {/* Mobile wallet status */}
              {isConnected && (
                <div className='pt-3 border-t border-gray-200'>
                  <div className='flex items-center space-x-2 text-sm text-green-700'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span>Connected: {formatAddress(address || "")}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
