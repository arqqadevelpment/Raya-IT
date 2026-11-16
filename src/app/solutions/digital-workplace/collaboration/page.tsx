import type { Metadata } from "next";
import WorkplaceDetailPage from "@/components/WorkplaceDetailPage";
import { collaborationDetail } from "@/content/digital-workplace";

export const metadata: Metadata = { title: "Collaboration Solutions" };

export default function CollaborationPage() {
  return <WorkplaceDetailPage d={collaborationDetail} />;
}
