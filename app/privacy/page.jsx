import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Privacy Policy — AventeQ",
  description: "What AventeQ collects, why, and how to exercise your data rights under GDPR and India's DPDP Act.",
};

const sectionH2 = {
  fontFamily: "var(--font-serif)",
  fontWeight: 400,
  fontSize: 26,
  margin: 0,
  color: "var(--ink)",
};

const rowStyle = { gap: 40, padding: "36px 0", borderTop: "1px solid rgba(23,21,15,0.14)" };

const SECTIONS = [
  [
    "What we collect",
    "When you take the AI Readiness Assessment, submit the contact form, or respond to an exit-intent prompt, we collect what you give us directly: name, work email, company, industry, team size, and your assessment answers/score. We don't collect anything beyond what's visibly asked for on the form.",
  ],
  [
    "Why we collect it",
    "To respond to your enquiry, send the result or report you requested, and — only if you've opted in — to follow up about AI strategy sessions, workshops, or relevant resources. Industry, team size, and score are used to route you to relevant content and a fitting next step, not sold or shared for advertising.",
  ],
  [
    "Where it's stored",
    "Submissions are forwarded to our CRM, GoHighLevel, which processes the data on our behalf under its own security and privacy commitments. We don't run our own marketing database beyond that.",
  ],
  [
    "Your consent",
    "Follow-up emails are sent only if you've checked the consent box on the relevant form. You can withdraw consent at any time by emailing us — see below.",
  ],
  [
    "Your rights",
    "Under GDPR (UK/EU) and India's DPDP Act, you can ask us to access, correct, export, or delete your data, and to stop processing it. We'll act on requests within a reasonable time.",
  ],
  [
    "Contact",
    "Questions or requests about your data: hello@aventeqai.com.",
  ],
];

export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        titleMaxWidth="20ch"
        leadMaxWidth="58ch"
        lead="A plain-language summary of what we collect through this site, why, and how to exercise your rights under GDPR and India's DPDP Act."
      />
      <section className="container" style={{ paddingBottom: 96 }}>
        {SECTIONS.map(([title, body]) => (
          <div key={title} className="g-about" style={rowStyle}>
            <h2 style={sectionH2}>{title}</h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.64, color: "var(--muted)", margin: 0, maxWidth: "62ch" }}>{body}</p>
          </div>
        ))}
      </section>
    </>
  );
}
