import { Newsreader, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import BackToTop from "@/components/BackToTop";
import SiteMain from "@/components/SiteMain";
import ExitIntentModal from "@/components/ExitIntentModal";

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
    "AventeQ helps accounting firms, law firms, manufacturers, logistics companies, and real estate firms implement AI across their operations — through consulting, custom systems, and the training to make it stick.",
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
        <Script
          id="microsoft-clarity"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xepfgfqfqy");
            `,
          }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-4KSKSKKYE0" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4KSKSKKYE0');
          `}
        </Script>
        <div style={{ minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
          <Header />
          <SiteMain>{children}</SiteMain>
          <CTA />
          <Footer />
          <BackToTop />
          <ExitIntentModal />
        </div>
      </body>
    </html>
  );
}
