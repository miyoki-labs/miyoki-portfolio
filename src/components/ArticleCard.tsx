import { ArrowUpRight } from "lucide-react";
import type { Article, ArticlePlatform } from "@/data/articles";

const badge: Record<ArticlePlatform, { label: string; className: string }> = {
  zenn: { label: "Zenn", className: "bg-sky-50 text-sky-700" },
  qiita: { label: "Qiita", className: "bg-emerald-50 text-emerald-700" },
  note: { label: "note", className: "bg-neutral-900 text-white" },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}.${m}.${day}`;
}

export default function ArticleCard({ article }: { article: Article }) {
  const b = badge[article.platform];
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-black/8 bg-white p-5 transition hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5"
    >
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${b.className}`}
        >
          {b.label}
        </span>
        <span className="font-mono text-[11px] text-foreground/45">
          {formatDate(article.publishedAt)}
        </span>
      </div>

      <div className="mt-3 flex items-start gap-2.5">
        {article.emoji && (
          <span className="text-xl leading-none">{article.emoji}</span>
        )}
        <h3 className="line-clamp-2 font-display text-[15px] font-semibold leading-snug text-foreground/90 group-hover:text-brand-accent">
          {article.title}
        </h3>
      </div>

      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium text-brand-accent">
        読む
        <ArrowUpRight
          size={14}
          className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </a>
  );
}
