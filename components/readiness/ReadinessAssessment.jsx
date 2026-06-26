"use client";

import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import QuestionStep from "./QuestionStep";
import LeadGate from "./LeadGate";
import ResultScreen from "./ResultScreen";
import { QUESTIONS, normalize, tierFor, GATE_BEFORE_RESULT, encodeResult, decodeResult } from "@/lib/readiness";
import { submitLead, flushQueue } from "@/lib/leadSubmit";
import { track, EVENTS } from "@/lib/analytics";

const TOTAL = QUESTIONS.length;

function pushResultToUrl(result, industry) {
  try {
    const token = encodeResult({ ...result, industry });
    if (!token) return;
    const url = `${window.location.pathname}?r=${token}`;
    window.history.replaceState(null, "", url);
  } catch {}
}

export default function ReadinessAssessment() {
  // step: 0..TOTAL-1 (questions) | "gate" | "result"
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [profile, setProfile] = useState(null);

  // Restore a shared/refreshed result from the URL (?r=<token>) instead of
  // starting the quiz over. No PII in the token, so this is safe to forward.
  useEffect(() => {
    try {
      const token = new URLSearchParams(window.location.search).get("r");
      const decoded = token ? decodeResult(token) : null;
      if (decoded) {
        setResult({ score: decoded.score, tier: decoded.tier, breakdown: decoded.breakdown });
        setProfile(decoded.industry ? { industry: decoded.industry } : null);
        setStep("result");
        return;
      }
    } catch {}
    track(EVENTS.ASSESSMENT_STARTED);
    flushQueue(); // retry any leads stranded by an earlier failed POST
  }, []);

  const finishAnonymously = () => {
    const raw = QUESTIONS.reduce((sum, q) => sum + (answers[q.key] || 0), 0);
    const score = normalize(raw);
    const tier = tierFor(score);
    const breakdown = QUESTIONS.map((q) => ({ dimension: q.dimension, score: answers[q.key] || 0 }));
    const result = { score, tier, breakdown };

    setResult(result);
    setProfile(null);
    setStep("result");
    track(EVENTS.ASSESSMENT_COMPLETED, { score, tier: tier.key });
    pushResultToUrl(result, null);
  };

  const selectAnswer = (score) => {
    const q = QUESTIONS[step];
    setAnswers((a) => ({ ...a, [q.key]: score }));
    track(EVENTS.ASSESSMENT_QUESTION_ANSWERED, { step, dimension: q.dimension, score });
    if (step < TOTAL - 1) {
      setStep(step + 1);
    } else if (GATE_BEFORE_RESULT) {
      setStep("gate");
      track(EVENTS.ASSESSMENT_GATE_VIEWED);
    } else {
      finishAnonymously();
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
    const result = { score, tier, breakdown };

    setProfile(profileData);
    setResult(result);
    setStep("result");
    pushResultToUrl(result, profileData.industry);

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

  // Used when GATE_BEFORE_RESULT is false: the result is already visible and
  // anonymous; this fires when the visitor uses the inline "email me this
  // report" offer on the result screen, capturing the lead at that point.
  const handleInlineCapture = (profileData) => {
    setProfile((prev) => ({ ...prev, ...profileData }));
    track(EVENTS.LEAD_CAPTURED, {
      industry: profileData.industry || null,
      tier: result.tier.key,
      score: result.score,
    });
    submitLead({
      source: "readiness",
      ...profileData,
      score: result.score,
      tier: result.tier.key,
      tierLabel: result.tier.label,
      answers: QUESTIONS.reduce((acc, q) => ({ ...acc, [q.key]: answers[q.key] ?? null }), {}),
      completedAt: new Date().toISOString(),
    });
  };

  const restart = () => {
    setAnswers({});
    setResult(null);
    setProfile(null);
    setStep(0);
    try {
      window.history.replaceState(null, "", window.location.pathname);
    } catch {}
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
          <ResultScreen
            result={result}
            profile={profile}
            onRestart={restart}
            gateBeforeResult={GATE_BEFORE_RESULT}
            onCapture={handleInlineCapture}
          />
        )}
      </div>
    </section>
  );
}
