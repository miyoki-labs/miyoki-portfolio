import Link from "next/link";
import { site } from "@/data/site";

const channels: { key: keyof typeof site.links; label: string }[] = [
  { key: "github", label: "GitHub" },
  { key: "zenn", label: "Zenn" },
  { key: "qiita", label: "Qiita" },
  { key: "x", label: "X" },
  { key: "note", label: "note" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-black/5 bg-neutral-50">
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold">{site.name}</p>
            <p className="mt-1 font-mono text-xs text-brand-accent">{site.role}</p>
            <p className="mt-3 max-w-xs text-sm text-foreground/60">
              AI業務自動化・ツール開発のご相談はメールへ。Web・LP制作は{" "}
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
            <a
              href={`mailto:${site.email}`}
              className="text-foreground/70 hover:text-foreground"
            >
              {site.email}
            </a>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {channels.map((c) => (
                <a
                  key={c.key}
                  href={site.links[c.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-brand-accent"
                >
                  {c.label}
                </a>
              ))}
            </div>
            <Link href="/links" className="font-mono text-xs text-brand-accent hover:underline">
              各媒体はこちらで検索 → {site.handle}
            </Link>
            <Link href="/privacy" className="text-foreground/50 hover:text-foreground">
              プライバシーポリシー
            </Link>
          </div>
        </div>

        <p className="mt-10 text-xs text-foreground/40">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
