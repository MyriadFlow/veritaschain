"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  FileText,
  CheckCircle,
  Vote,
  Home,
  PenTool,
} from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/journalist", label: "Journalist Portal", icon: PenTool },
    { href: "/reader", label: "Reader Hub", icon: FileText },
    { href: "/fact-checker", label: "Fact Checker", icon: CheckCircle },
    { href: "/governance", label: "DAO Governance", icon: Vote },
    { href: "/publish", label: "Publish Article", icon: PenTool },
  ];

  return (
    <nav className='bg-slate-900 text-white border-b border-slate-700'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          {/* Logo and brand */}
          <div className='flex items-center'>
            <Link href='/' className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center'>
                <FileText className='w-5 h-5' />
              </div>
              <span className='text-xl font-bold'>VeritasChain</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className='hidden md:flex items-center space-x-1'>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className='flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors'
                >
                  <Icon className='w-4 h-4' />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-white hover:bg-slate-700'
            >
              {isMenuOpen ? (
                <X className='w-5 h-5' />
              ) : (
                <Menu className='w-5 h-5' />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <div className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 transition-colors'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className='w-4 h-4' />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
