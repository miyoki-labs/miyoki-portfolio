import { site } from "@/data/site";

// ポートフォリオ用の構造化データ（Person ＋ WebSite）。
// 公開URLは NEXT_PUBLIC_SITE_URL から絶対URLで出す。
export default function JsonLd() {
  const url = site.siteUrl;
  const sameAs = Object.values(site.links);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.intro,
    email: `mailto:${site.email}`,
    knowsAbout: [
      "RAG",
      "業務自動化",
      "AIアプリ開発",
      "Next.js",
      "TypeScript",
      "Cloudflare",
      "Claude API",
    ],
    ...(url ? { url } : {}),
    sameAs,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.name} — ${site.role}`,
    ...(url ? { url } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
