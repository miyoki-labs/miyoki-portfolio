import type { Metadata } from "next";
import { Noto_Sans_JP, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ScrollObserver from "@/components/ScrollObserver";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileFixedCTA from "@/components/layout/MobileFixedCTA";
import JsonLd from "@/components/seo/JsonLd";
import { site } from "@/data/site";

const fontSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-sans",
});

// 見出しもゴシックで統一（OG画像と同系統）。本文より重いウェイトで差をつける。
const fontDisplay = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["700", "900"],
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

const GA_ID = process.env.GA_MEASUREMENT_ID;

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
        <Header />
        {children}
        <Footer />
        <MobileFixedCTA />

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
