import Link from "next/link";
import { site } from "@/data/site";

const channels: { href: string; label: string }[] = [
  { href: site.blogUrl, label: "Blog" },
  { href: site.links.github, label: "GitHub" },
  { href: site.links.zenn, label: "Zenn" },
  { href: site.links.qiita, label: "Qiita" },
  { href: site.links.x, label: "X" },
  { href: site.links.note, label: "note" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-g1 bg-white">
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold">{site.name}</p>
            <p className="mt-1 font-mono text-xs text-brand-accent">{site.role}</p>
            <p className="mt-3 max-w-xs text-[15px] text-g3">
              AI業務自動化・ツール開発のご相談は{" "}
              <Link href="/contact" className="text-brand-accent underline underline-offset-2">
                お問い合わせ
              </Link>
              から。Web・LP制作は{" "}
              <a
                href={site.nompassUrl}
                className="text-brand-accent underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nompass
              </a>
              で承ります。
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <Link
              href="/contact"
              data-cta="footer-link-contact"
              className="text-g4 hover:text-foreground"
            >
              お問い合わせ
            </Link>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-g4 hover:text-brand-accent"
                >
                  {c.label}
                </a>
              ))}
            </div>
            <Link href="/links" className="font-mono text-xs text-brand-accent hover:underline">
              各媒体はこちらで検索 → {site.handle}
            </Link>
            <Link href="/privacy" className="text-g3 hover:text-foreground">
              プライバシーポリシー
            </Link>
          </div>
        </div>

        <p className="mt-10 text-xs text-g3">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
