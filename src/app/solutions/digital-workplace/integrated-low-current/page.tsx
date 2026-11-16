import type { Metadata } from "next";
import WorkplaceDetailPage from "@/components/WorkplaceDetailPage";
import { lowCurrentDetail } from "@/content/digital-workplace";

export const metadata: Metadata = { title: "Integrated Low Current" };

export default function LowCurrentPage() {
  return <WorkplaceDetailPage d={lowCurrentDetail} />;
}
