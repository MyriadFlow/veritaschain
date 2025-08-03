import DisputeClient from "./DisputeClient";

// Generate static params for static export
export async function generateStaticParams() {
  // Sample dispute IDs for static generation
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "sample-dispute-1" },
    { id: "sample-dispute-2" },
    { id: "sample-dispute-3" },
  ];
}

interface DisputePageProps {
  params: {
    id: string;
  };
}

export default function DisputePage({ params }: DisputePageProps) {
  return <DisputeClient params={params} />;
}
