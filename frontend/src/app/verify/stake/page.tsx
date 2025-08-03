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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Coins, Lock, Users, Award, Calendar } from "lucide-react";
import Link from "next/link";

interface StakePosition {
  id: string;
  amount: number;
  lockPeriod: number; 
  apy: number;
  startDate: string;
  endDate: string;
  status: "active" | "unlocking" | "available";
  votingPower: number;
  rewardsEarned: number;
}

const mockStakePositions: StakePosition[] = [
  {
    id: "1",
    amount: 10000,
    lockPeriod: 90,
    apy: 12.5,
    startDate: "2025-07-01",
    endDate: "2025-09-29",
    status: "active",
    votingPower: 15000,
    rewardsEarned: 312.5,
  },
  {
    id: "2",
    amount: 5000,
    lockPeriod: 30,
    apy: 8.0,
    startDate: "2025-07-15",
    endDate: "2025-08-14",
    status: "unlocking",
    votingPower: 6000,
    rewardsEarned: 33.3,
  },
];

const stakeOptions = [
  { period: 30, apy: 8.0, minStake: 1000 },
  { period: 90, apy: 12.5, minStake: 5000 },
  { period: 180, apy: 18.0, minStake: 10000 },
  { period: 365, apy: 25.0, minStake: 25000 },
];

export default function VerifyStakePage() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [isStaking, setIsStaking] = useState(false);

  const selectedOption = stakeOptions.find(
    (opt) => opt.period === selectedPeriod
  );
  const estimatedRewards =
    selectedOption && stakeAmount
      ? (((parseFloat(stakeAmount) * selectedOption.apy) / 100) *
          selectedPeriod) /
        365
      : 0;
  const estimatedVotingPower = stakeAmount ? parseFloat(stakeAmount) * 1.5 : 0;

  const totalStaked = mockStakePositions.reduce(
    (sum, pos) => sum + pos.amount,
    0
  );
  const totalRewards = mockStakePositions.reduce(
    (sum, pos) => sum + pos.rewardsEarned,
    0
  );
  const totalVotingPower = mockStakePositions.reduce(
    (sum, pos) => sum + pos.votingPower,
    0
  );

  const handleStake = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stakeAmount || !selectedOption) return;

    setIsStaking(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert(
      `Successfully staked ${stakeAmount} MAS tokens for ${selectedPeriod} days!`
    );
    setIsStaking(false);
    setStakeAmount("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "unlocking":
        return "bg-yellow-100 text-yellow-800";
      case "available":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      <Navigation />

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <Link href='/fact-checker'>
              <Button
                variant='ghost'
                className='mb-4 text-slate-600 hover:text-slate-900'
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Fact Checker
              </Button>
            </Link>

            <div className='text-center mb-8'>
              <h1 className='text-4xl font-bold text-slate-900 mb-2'>
                Verification Staking
              </h1>
              <p className='text-xl text-slate-600'>
                Stake MAS tokens to gain verification privileges and earn
                rewards
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className='grid md:grid-cols-3 gap-6 mb-8'>
            <Card>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-sm font-medium text-slate-600'>
                    Total Staked
                  </CardTitle>
                  <Coins className='h-4 w-4 text-blue-600' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-blue-600'>
                  {totalStaked.toLocaleString()}
                </div>
                <div className='text-sm text-slate-500'>MAS tokens</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-sm font-medium text-slate-600'>
                    Voting Power
                  </CardTitle>
                  <Users className='h-4 w-4 text-purple-600' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-purple-600'>
                  {totalVotingPower.toLocaleString()}
                </div>
                <div className='text-sm text-slate-500'>
                  Verification influence
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-sm font-medium text-slate-600'>
                    Rewards Earned
                  </CardTitle>
                  <Award className='h-4 w-4 text-green-600' />
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-green-600'>
                  {totalRewards.toFixed(2)}
                </div>
                <div className='text-sm text-slate-500'>MAS tokens</div>
              </CardContent>
            </Card>
          </div>

          <div className='grid lg:grid-cols-2 gap-8'>
            {/* Staking Interface */}
            <div className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Stake MAS Tokens</CardTitle>
                  <CardDescription>
                    Lock your tokens to earn verification privileges and rewards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleStake} className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Stake Amount (MAS)
                      </label>
                      <Input
                        type='number'
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        placeholder='Enter amount to stake'
                        min='1000'
                        step='100'
                      />
                      <div className='text-xs text-slate-500 mt-1'>
                        Minimum: {selectedOption?.minStake.toLocaleString()} MAS
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Lock Period
                      </label>
                      <div className='grid grid-cols-2 gap-2'>
                        {stakeOptions.map((option) => (
                          <button
                            key={option.period}
                            type='button'
                            onClick={() => setSelectedPeriod(option.period)}
                            className={`p-3 rounded-lg border text-sm ${
                              selectedPeriod === option.period
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            <div className='font-semibold'>
                              {option.period} days
                            </div>
                            <div className='text-xs'>{option.apy}% APY</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {stakeAmount && selectedOption && (
                      <div className='bg-blue-50 p-4 rounded-lg'>
                        <h4 className='font-semibold text-blue-900 mb-2'>
                          Staking Summary
                        </h4>
                        <div className='space-y-1 text-sm text-blue-800'>
                          <div className='flex justify-between'>
                            <span>Stake Amount:</span>
                            <span>
                              {parseFloat(stakeAmount).toLocaleString()} MAS
                            </span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Lock Period:</span>
                            <span>{selectedPeriod} days</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>APY:</span>
                            <span>{selectedOption.apy}%</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Est. Rewards:</span>
                            <span>{estimatedRewards.toFixed(2)} MAS</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Voting Power:</span>
                            <span>{estimatedVotingPower.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      type='submit'
                      disabled={
                        !stakeAmount ||
                        !selectedOption ||
                        parseFloat(stakeAmount) < selectedOption.minStake ||
                        isStaking
                      }
                      className='w-full'
                    >
                      {isStaking ? (
                        <>
                          <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                          Staking...
                        </>
                      ) : (
                        <>
                          <Lock className='mr-2 h-4 w-4' />
                          Stake Tokens
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Current Stakes */}
            <div className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Your Stake Positions</CardTitle>
                  <CardDescription>
                    Active and unlocking stake positions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {mockStakePositions.map((position) => (
                      <div key={position.id} className='p-4 border rounded-lg'>
                        <div className='flex items-center justify-between mb-3'>
                          <div className='font-semibold'>
                            {position.amount.toLocaleString()} MAS
                          </div>
                          <Badge className={getStatusColor(position.status)}>
                            {position.status}
                          </Badge>
                        </div>

                        <div className='grid grid-cols-2 gap-4 text-sm'>
                          <div>
                            <div className='text-slate-600'>Lock Period</div>
                            <div className='font-medium'>
                              {position.lockPeriod} days
                            </div>
                          </div>
                          <div>
                            <div className='text-slate-600'>APY</div>
                            <div className='font-medium'>{position.apy}%</div>
                          </div>
                          <div>
                            <div className='text-slate-600'>Voting Power</div>
                            <div className='font-medium'>
                              {position.votingPower.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className='text-slate-600'>Rewards</div>
                            <div className='font-medium text-green-600'>
                              {position.rewardsEarned.toFixed(2)} MAS
                            </div>
                          </div>
                        </div>

                        <div className='flex items-center justify-between text-xs text-slate-500 mt-3'>
                          <span>Started: {position.startDate}</span>
                          <span>Ends: {position.endDate}</span>
                        </div>

                        {position.status === "active" && (
                          <Button
                            variant='outline'
                            size='sm'
                            className='w-full mt-3'
                          >
                            <Calendar className='mr-2 h-3 w-3' />
                            View Details
                          </Button>
                        )}
                      </div>
                    ))}

                    {mockStakePositions.length === 0 && (
                      <div className='text-center py-8 text-slate-500'>
                        <Coins className='h-12 w-12 mx-auto mb-3 opacity-50' />
                        <p>No active stake positions</p>
                        <p className='text-sm'>
                          Stake tokens to start earning verification privileges
                        </p>
                      </div>
                    )}
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
