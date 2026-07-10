import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Code2, FileText } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { works, getWork } from "@/data/works";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: "実績が見つかりません" };
  return { title: work.title, description: work.summary };
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-black/8 py-7">
      <p className="font-mono text-xs text-brand-accent">{label}</p>
      <div className="mt-2 leading-relaxed text-foreground/80">{children}</div>
    </div>
  );
}

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const links = work.links ?? {};

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <Link
        href="/works"
        className="inline-flex items-center gap-1 text-sm text-foreground/55 hover:text-foreground"
      >
        <ArrowLeft size={15} />
        実績一覧へ
      </Link>

      <FadeIn>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-brand-accent">{work.category}</span>
          {work.status && (
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-brand-accent">
              {work.status}
            </span>
          )}
        </div>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
          {work.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground/70">{work.summary}</p>

        {(links.demo || links.repo || links.article) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {links.demo && (
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-light"
              >
                <ExternalLink size={15} />
                デモを開く
              </a>
            )}
            {links.repo && (
              <a
                href={links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 px-4 py-2.5 text-sm font-medium hover:border-brand/40"
              >
                <Code2 size={15} />
                コード
              </a>
            )}
            {links.article && (
              <a
                href={links.article}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 px-4 py-2.5 text-sm font-medium hover:border-brand/40"
              >
                <FileText size={15} />
                解説記事
              </a>
            )}
          </div>
        )}
      </FadeIn>

      {work.image && (
        <FadeIn>
          <div className="relative mt-9 aspect-[16/10] overflow-hidden rounded-2xl border border-black/8 bg-neutral-50">
            <Image
              src={work.image}
              alt={`${work.title} の画面`}
              fill
              sizes="(min-width: 768px) 48rem, 90vw"
              priority
              className="object-cover object-top"
            />
          </div>
        </FadeIn>
      )}

      <div className="mt-10">
        <Section label="課題">{work.problem}</Section>
        <Section label="作ったもの">{work.solution}</Section>
        <Section label="AIの使いどころ">{work.aiRole}</Section>
        <Section label="技術">
          <div className="flex flex-wrap gap-2">
            {work.tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-neutral-100 px-2.5 py-1 text-sm text-foreground/70"
              >
                {t}
              </span>
            ))}
          </div>
        </Section>
        <Section label="結果・学び">{work.result}</Section>
      </div>

      {/* 末尾CTA */}
      <div className="mt-12 rounded-2xl border border-black/8 bg-neutral-50 p-7 text-center">
        <p className="font-display text-lg font-semibold">
          似たものを作りたい・相談したい
        </p>
        <p className="mt-2 text-sm text-foreground/60">
          御社のデータ・業務に合わせて設計します。
        </p>
        <Link
          href="/contact"
          className="btn-shine mt-5 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-medium text-white hover:bg-brand-light"
        >
          相談する
        </Link>
      </div>
    </main>
  );
}
