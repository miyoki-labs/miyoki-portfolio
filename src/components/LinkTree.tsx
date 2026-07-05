import { site } from "@/data/site";

// /links ページとヘッダーのドロップダウンで共用するリンクツリー。
// 発信媒体（SNS）と関連事業（Nompass）を分けて表示する。外部サービスは使わず自ドメインに集約。

type LinkItem = { href: string; label: string; note: string };

const media: LinkItem[] = [
  { href: site.blogUrl, label: "Blog", note: "AIツール紹介" },
  { href: site.links.zenn, label: "Zenn", note: "開発ログ" },
  { href: site.links.qiita, label: "Qiita", note: "技術解説" },
  { href: site.links.github, label: "GitHub", note: "コード" },
  { href: site.links.x, label: "X", note: "日々の発信・告知" },
  { href: site.links.note, label: "note", note: "考えていること" },
];

export default function LinkTree({ compact = false }: { compact?: boolean }) {
  const pad = compact ? "px-3 py-2" : "px-4 py-3";
  const base = `block rounded-xl border ${pad} text-sm transition`;

  const row = (label: string, note: string) => (
    <span className="flex items-center justify-between gap-3">
      <span className="font-medium text-foreground">{label}</span>
      <span className="font-mono text-[11px] text-foreground/50">{note}</span>
    </span>
  );

  return (
    <div className="flex flex-col gap-2.5">
      {media.map((it) => (
        <a
          key={it.label}
          href={it.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} border-black/10 hover:border-brand/40 hover:bg-neutral-50`}
        >
          {row(it.label, it.note)}
        </a>
      ))}

      {/* 関連事業（発信媒体ではないので区切って別扱い） */}
      <p className="mt-2 px-1 font-mono text-[10px] text-foreground/40">関連事業</p>
      <a
        href={site.nompassUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border-black/10 bg-neutral-100 hover:border-brand/40`}
      >
        {row("Nompass", "Web・LP制作事業")}
      </a>
    </div>
  );
}
