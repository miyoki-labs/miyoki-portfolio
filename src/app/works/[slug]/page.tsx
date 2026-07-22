import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Code2, FileText } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
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

function Section({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-g1 py-8">
      <SectionHeading label={label} title={title} compact />
      <div className="mt-4 leading-relaxed text-g4">{children}</div>
    </section>
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
    <main className="page-space mx-auto max-w-3xl px-5">
      <Link
        href="/works"
        className="inline-flex items-center gap-1 text-sm text-g3 hover:text-foreground"
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
        <h1 className="display-lg heading-wrap mt-3 font-display">
          {work.title}
        </h1>
        <p className="lead mt-4 text-g3">{work.summary}</p>

        {(links.demo || links.repo || links.article) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {links.demo && (
              <a
                href={links.demo}
                data-cta="work-demo"
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
                data-cta="work-repository"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-g2 px-4 py-2.5 text-sm font-medium hover:border-brand/40"
              >
                <Code2 size={15} />
                コード
              </a>
            )}
            {links.article && (
              <a
                href={links.article}
                data-cta="work-article"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-g2 px-4 py-2.5 text-sm font-medium hover:border-brand/40"
              >
                <FileText size={15} />
                解説記事
              </a>
            )}
          </div>
        )}
        {!links.demo && !links.repo && !links.article && (
          <p className="mt-6 rounded-xl border border-g1 bg-white px-4 py-3 text-[15px] text-g3">
            現在は開発中のため、公開リンクはありません。実装内容はこのページで紹介しています。
          </p>
        )}
      </FadeIn>

      {work.image && (
        <FadeIn>
          <div className="relative mt-9 aspect-[16/10] overflow-hidden rounded-2xl border border-g1 bg-white">
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
        <Section label="Challenge" title="課題">{work.problem}</Section>
        <Section label="Solution" title="作ったもの">{work.solution}</Section>
        <Section label="AI Role" title="AIの使いどころ">{work.aiRole}</Section>
        <Section label="Stack" title="技術">
          <div className="flex flex-wrap gap-2">
            {work.tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-g1 px-2.5 py-1 text-sm text-g4"
              >
                {t}
              </span>
            ))}
          </div>
        </Section>
        <Section label="Outcome" title="成果">
          <p className="flex flex-wrap items-baseline gap-2 text-brand-accent">
            <span className={work.metric.value === "[要記入]" ? "text-lg font-bold" : "text-3xl font-bold"}>
              {work.metric.value}
            </span>
            <span className="font-medium">{work.metric.unit}</span>
          </p>
          <p className="mt-2 text-[15px] text-g3">{work.metric.note}</p>
        </Section>
        <Section label="Result" title="結果・学び">{work.result}</Section>
      </div>

      {/* 末尾CTA */}
      <div className="mt-12 rounded-2xl border border-g1 bg-white p-7 text-center">
        <p className="font-display text-lg font-semibold">
          似たものを作りたい・相談したい
        </p>
        <p className="mt-2 text-[15px] text-g3">
          御社のデータ・業務に合わせて設計します。
        </p>
        <Link
          href="/contact"
          data-cta="work-contact"
          className="btn-shine mt-5 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-medium text-white hover:bg-brand-light"
        >
          相談する
        </Link>
      </div>
    </main>
  );
}
