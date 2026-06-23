import { Newsreader, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import BackToTop from "@/components/BackToTop";
import SiteMain from "@/components/SiteMain";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const favicon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%2314130F'/%3E%3Ctext x='28' y='70' font-family='Georgia,serif' font-size='58' fill='%23F4F1E9'%3EA%3C/text%3E%3Ccircle cx='74' cy='62' r='7' fill='%23C2552E'/%3E%3C/svg%3E";

export const metadata = {
  title: "AventeQ — AI for real operations",
  description:
    "AventeQ helps accounting firms, law firms, manufacturers, and logistics companies implement AI across their operations — through consulting, custom systems, and the training to make it stick.",
  icons: { icon: favicon },
  openGraph: {
    title: "AventeQ — AI for real operations",
    description:
      "AI consulting, implementation, and training for operationally complex businesses.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${hanken.variable} ${plexMono.variable}`}>
      <body>
        <div style={{ minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
          <Header />
          <SiteMain>{children}</SiteMain>
          <CTA />
          <Footer />
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
