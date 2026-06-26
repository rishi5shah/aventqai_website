import ReadinessAssessment from "@/components/readiness/ReadinessAssessment";

export const metadata = {
  title: "AI Readiness Assessment — AventeQ",
  description:
    "A 6-question scorecard that gauges how ready your operations are for AI — and what to do next. Takes about two minutes.",
};

export default function ReadinessPage() {
  return <ReadinessAssessment />;
}
