import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Work } from "@/data/works";

const statusStyle: Record<NonNullable<Work["status"]>, string> = {
  公開中: "bg-emerald-50 text-emerald-700",
  開発中: "bg-amber-50 text-amber-700",
  デモ: "bg-indigo-50 text-brand-accent",
};

export default function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/8 bg-white transition hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5"
    >
      {work.image && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-black/8 bg-neutral-50">
          <Image
            src={work.image}
            alt={`${work.title} の画面`}
            fill
            sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw"
            className="object-cover object-top transition duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-brand-accent">
            {work.category}
          </span>
          {work.status && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusStyle[work.status]}`}
            >
              {work.status}
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-lg font-semibold leading-snug">
          {work.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/65">
          {work.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {work.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] text-foreground/60"
            >
              {t}
            </span>
          ))}
        </div>

        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-accent">
          詳しく見る
          <ArrowUpRight
            size={16}
            className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
