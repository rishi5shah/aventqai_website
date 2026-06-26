"use client";

import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import QuestionStep from "./QuestionStep";
import LeadGate from "./LeadGate";
import ResultScreen from "./ResultScreen";
import { QUESTIONS, normalize, tierFor } from "@/lib/readiness";
import { submitLead, flushQueue } from "@/lib/leadSubmit";
import { track, EVENTS } from "@/lib/analytics";

const TOTAL = QUESTIONS.length;

export default function ReadinessAssessment() {
  // step: 0..TOTAL-1 (questions) | "gate" | "result"
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    track(EVENTS.ASSESSMENT_STARTED);
    flushQueue(); // retry any leads stranded by an earlier failed POST
  }, []);

  const selectAnswer = (score) => {
    const q = QUESTIONS[step];
    setAnswers((a) => ({ ...a, [q.key]: score }));
    track(EVENTS.ASSESSMENT_QUESTION_ANSWERED, { step, dimension: q.dimension, score });
    if (step < TOTAL - 1) {
      setStep(step + 1);
    } else {
      setStep("gate");
      track(EVENTS.ASSESSMENT_GATE_VIEWED);
    }
  };

  const goBack = () => {
    if (step === "gate") setStep(TOTAL - 1);
    else if (typeof step === "number" && step > 0) setStep(step - 1);
  };

  const handleGateSubmit = (profileData) => {
    const raw = QUESTIONS.reduce((sum, q) => sum + (answers[q.key] || 0), 0);
    const score = normalize(raw);
    const tier = tierFor(score);
    const breakdown = QUESTIONS.map((q) => ({ dimension: q.dimension, score: answers[q.key] || 0 }));

    setProfile(profileData);
    setResult({ score, tier, breakdown });
    setStep("result");

    track(EVENTS.LEAD_CAPTURED, {
      industry: profileData.industry,
      teamSize: profileData.teamSize,
      tier: tier.key,
      score,
    });
    track(EVENTS.ASSESSMENT_COMPLETED, { score, tier: tier.key });

    // Fire-and-forget: result renders immediately, submission happens async.
    submitLead({
      source: "readiness",
      ...profileData,
      score,
      tier: tier.key,
      tierLabel: tier.label,
      answers: QUESTIONS.reduce((acc, q) => ({ ...acc, [q.key]: answers[q.key] ?? null }), {}),
      completedAt: new Date().toISOString(),
    });
  };

  const restart = () => {
    setAnswers({});
    setResult(null);
    setProfile(null);
    setStep(0);
    track(EVENTS.ASSESSMENT_STARTED);
  };

  return (
    <section className="container" style={{ paddingTop: 80, paddingBottom: 96 }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--faint)",
            marginBottom: 28,
          }}
        >
          AI Readiness Assessment
        </div>

        {step !== "result" && (
          <ProgressBar
            current={step === "gate" ? TOTAL : step + 1}
            total={TOTAL}
            label={step === "gate" ? "Your details" : `Question ${step + 1} of ${TOTAL}`}
          />
        )}

        {typeof step === "number" && (
          <QuestionStep
            question={QUESTIONS[step]}
            selected={answers[QUESTIONS[step].key]}
            onSelect={selectAnswer}
            onBack={goBack}
            showBack={step > 0}
          />
        )}

        {step === "gate" && <LeadGate onSubmit={handleGateSubmit} onBack={goBack} />}

        {step === "result" && result && (
          <ResultScreen result={result} profile={profile} onRestart={restart} />
        )}
      </div>
    </section>
  );
}
