import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ScrollObserver from "@/components/ScrollObserver";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileFixedCTA from "@/components/layout/MobileFixedCTA";
import JsonLd from "@/components/seo/JsonLd";
import AnalyticsListener from "@/components/AnalyticsListener";
import { site } from "@/data/site";

const fontSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-sans",
});

// 英数字は Inter、日本語は font-sans の Noto Sans JP にフォールバックする和欧混植。
const fontDisplay = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: site.siteUrl ? new URL(site.siteUrl) : undefined,
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.intro,
  openGraph: {
    type: "website",
    url: site.siteUrl,
    siteName: site.name,
    locale: "ja_JP",
    title: `${site.name} | ${site.role}`,
    description: site.intro,
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: `${site.name} — ${site.role}` },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description: site.intro,
    images: ["/og.png"],
  },
};

const rawGaId = process.env.GA_MEASUREMENT_ID;
const GA_ID = rawGaId && /^G-[A-Z0-9]+$/i.test(rawGaId) ? rawGaId : undefined;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} font-sans antialiased pb-14 md:pb-0`}
      >
        {/* フェイルセーフ: JS有効時だけ .anim を付けて fade-in を隠す。
            ScrollObserver が起動しなくても 2.6秒で一括表示してコンテンツが消えないようにする。 */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('anim');" +
              "setTimeout(function(){if(!window.__nbReveal){var l=document.querySelectorAll('.fade-in:not(.is-visible)');for(var i=0;i<l.length;i++)l[i].classList.add('is-visible');}},2600);",
          }}
        />
        <JsonLd />
        <ScrollObserver />
        <AnalyticsListener />
        <Header />
        {children}
        <Footer />
        <MobileFixedCTA />

        {GA_ID && (
          <>
            <Script id="ga4-init" strategy="beforeInteractive">
              {`window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config','${GA_ID}',{send_page_view:false});`}
            </Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
          </>
        )}
      </body>
    </html>
  );
}
