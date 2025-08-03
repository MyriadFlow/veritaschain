import ProposalClient from "./ProposalClient";

// Generate static params for static export
export async function generateStaticParams() {
  // Sample proposal IDs for static generation
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "fee-structure-proposal" },
    { id: "governance-update" },
    { id: "technical-upgrade" },
  ];
}

interface ProposalPageProps {
  params: {
    id: string;
  };
}

export default function ProposalPage({ params }: ProposalPageProps) {
  return <ProposalClient params={params} />;
}
