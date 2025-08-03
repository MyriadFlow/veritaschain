import ComingSoonPage from "@/components/ComingSoonPage";
import { Users } from "lucide-react";

export default function GovernanceDelegatePage() {
  return (
    <ComingSoonPage
      title='Governance Delegation'
      description='Delegate your voting power to trusted community members or become a delegate yourself. Build a more efficient decentralized governance system.'
      icon={<Users className='h-10 w-10 text-indigo-600' />}
      features={[
        "Delegate discovery platform",
        "Voting power delegation",
        "Delegate performance metrics",
        "Delegation management tools",
        "Delegate reputation system",
        "Automated voting execution",
        "Delegation analytics dashboard",
        "Community delegate rankings",
      ]}
      timeline='Q1 2025'
      backLink='/governance'
      backText='Back to DAO Governance'
    />
  );
}
