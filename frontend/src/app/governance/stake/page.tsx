import ComingSoonPage from "@/components/ComingSoonPage";
import { Coins } from "lucide-react";

export default function GovernanceStakePage() {
  return (
    <ComingSoonPage
      title='Governance Staking'
      description="Stake your MAS tokens to gain voting power and earn governance rewards while contributing to VeritasChain's decentralized decision-making."
      icon={<Coins className='h-10 w-10 text-yellow-600' />}
      features={[
        "MAS token staking interface",
        "Voting power calculation",
        "Governance reward distribution",
        "Delegation management",
        "Stake lockup periods",
        "Reward claim automation",
        "Voting weight visualization",
        "Staking pool analytics",
      ]}
      timeline='Q1 2025'
      backLink='/governance'
      backText='Back to DAO Governance'
    />
  );
}
