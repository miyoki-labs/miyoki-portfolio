import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Mail,
  Workflow,
  Boxes,
  Sparkles,
  ShieldCheck,
  Code2,
  PenLine,
  FileCode2,
  AtSign,
  NotebookPen,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import WorkCard from "@/components/WorkCard";
import ArticleCard from "@/components/ArticleCard";
import { site } from "@/data/site";
import { works } from "@/data/works";
import { getArticles } from "@/data/articles";

const strengths = [
  {
    icon: Workflow,
    title: "企画→運用まで一気通貫",
    body: "Web制作・AIアプリ・分析・発信・事業設計を横断。作って終わりにせず、運用まで設計します。",
  },
  {
    icon: Sparkles,
    title: "AI活用の実践知",
    body: "「どこをAIに任せ、どこを人が握るか」を実例で語れます。Nompassは運用までAIが主役の設計です。",
  },
  {
    icon: Boxes,
    title: "事業を自分で作った当事者",
    body: "個人で事業（Nompass）を立ち上げ中。収益・撤退ラインまで考えた実体験があります。",
  },
  {
    icon: ShieldCheck,
    title: "誠実な設計と発信",
    body: "誇張せず、失敗や判断の経緯まで出します。法務（景表法等）を意識した“守りの設計”も行います。",
  },
];

const services = [
  {
    title: "RAG構築",
    body: "社内ナレッジ・規程・FAQを、根拠を示しながら答えるAI。“なぜそう答えたか”が見えるので、そのまま実務に載せられます。",
  },
  {
    title: "業務特化AIアプリ",
    body: "提案文・執筆・現場対応など、繰り返す業務をAIで圧縮。現場で“使える形”まで作り込みます。",
  },
  {
    title: "定型業務の自動化",
    body: "コンテンツ生成・文書作成をパイプライン化。続けられる低負荷な仕組みにします。",
  },
  {
    title: "AI導入相談（スポット）",
    body: "「何をどこまでAIに任せ、どこを人が握るか」。事業を自分で回した経験から、設計段階で伴走します。",
  },
];

const channels = [
  { key: "github", label: "GitHub", icon: Code2 },
  { key: "zenn", label: "Zenn", icon: FileCode2 },
  { key: "qiita", label: "Qiita", icon: PenLine },
  { key: "x", label: "X", icon: AtSign },
  { key: "note", label: "note", icon: NotebookPen },
] as const;

export default async function Home() {
  const highlight = works.slice(0, 6);
  const articles = await getArticles(6);

  return (
    <main>
      {/* ===== Hero ===== */}
      <section className="grid-bg border-b border-black/5">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 py-20 sm:py-28 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
          <FadeIn>
            <p className="font-mono text-sm text-brand-accent">{site.role}</p>
            {/* 句読点・「を｜形」の位置でだけ折り返す（語の途中で割れないように nowrap） */}
            <h1 className="mt-4 font-display text-4xl font-black leading-[1.18] tracking-tight sm:text-6xl">
              <span className="block">
                <span className="whitespace-nowrap">創って、</span>
                <span className="whitespace-nowrap">動かして、</span>
                <span className="whitespace-nowrap">届ける。</span>
              </span>
              <span className="mt-1 block text-brand">
                <span className="whitespace-nowrap">AIでプロダクトを</span>
                <span className="whitespace-nowrap">形にする。</span>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">
              {site.intro}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className="btn-shine inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-medium text-white hover:bg-brand-light"
              >
                <Mail size={18} />
                AI開発を相談する
              </a>
              <Link
                href="/works"
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-6 py-3.5 text-sm font-medium hover:border-brand/40"
              >
                実績を見る
                <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>

          {/* ブランドカード（右・デスクトップのみ）。MMロゴは mix-blend-screen で黒背景を抜く */}
          <div className="relative hidden aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#13112a] via-[#231e5e] to-[#37309c] lg:block">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(closest-side at 68% 50%, rgba(91,80,230,0.55), transparent 75%)",
              }}
            />
            <Image
              src="/logo-mark.webp"
              alt=""
              width={512}
              height={512}
              priority
              className="absolute left-1/2 top-1/2 w-3/5 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
            />
          </div>
        </div>
      </section>

      {/* ===== 強み ===== */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <FadeIn>
          <p className="font-mono text-xs text-brand-accent">STRENGTHS</p>
          <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
            制作から運用まで、一人で
          </h2>
          <p className="mt-3 max-w-2xl text-foreground/65">
            企画から運用まで一人で構築。その実践例が、Nompassです。
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {strengths.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.title} delay={((i % 2) + 1) as 1 | 2}>
                <div className="flex h-full gap-4 rounded-2xl border border-black/8 bg-white p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                    <Icon size={22} className="text-brand" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">
                      {s.body}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ===== 実績ハイライト ===== */}
      <section className="border-y border-black/5 bg-neutral-50/60">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <FadeIn>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-brand-accent">WORKS</p>
                <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                  これまでの制作物
                </h2>
              </div>
              <Link
                href="/works"
                className="hidden shrink-0 items-center gap-1 text-sm font-medium text-brand-accent hover:underline sm:inline-flex"
              >
                すべて見る
                <ArrowRight size={15} />
              </Link>
            </div>
          </FadeIn>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlight.map((w, i) => (
              <FadeIn key={w.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <WorkCard work={w} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 受託メニュー ===== */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <FadeIn>
          <p className="font-mono text-xs text-brand-accent">SERVICES</p>
          <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
            ご相談いただけること
          </h2>
          <p className="mt-3 max-w-2xl text-foreground/65">
            <span className="font-medium text-foreground">AI業務自動化・ツール開発</span>{" "}
            に集中しています。少数・高単価で、テンプレとAIで短納期に。
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={((i % 2) + 1) as 1 | 2}>
              <div className="rounded-2xl border border-black/8 bg-white p-6">
                <h3 className="font-display text-base font-semibold text-brand-accent">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                  {s.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-6 rounded-2xl border border-dashed border-brand/30 bg-indigo-50/40 p-6 text-sm text-foreground/70">
            Web・HP・LP制作は{" "}
            <a
              href={site.nompassUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-accent underline underline-offset-2"
            >
              Nompass
            </a>{" "}
            で承っています。
          </div>
        </FadeIn>
      </section>

      {/* ===== 発信 ===== */}
      <section className="border-t border-black/5 bg-neutral-50/60">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <FadeIn>
            <p className="font-mono text-xs text-brand-accent">CHANNELS</p>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              発信していること
            </h2>
            <p className="mt-3 max-w-2xl text-foreground/65">
              開発ログ（Zenn）・技術解説（Qiita）・感じたこと（note）を発信しています。失敗や判断の経緯も含めています。
            </p>
          </FadeIn>

          {articles.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {articles.map((a, i) => (
                <FadeIn key={a.url} delay={((i % 2) + 1) as 1 | 2}>
                  <ArticleCard article={a} />
                </FadeIn>
              ))}
            </div>
          )}

          <p className="mt-10 font-mono text-[11px] text-foreground/45">ACCOUNTS</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.key}
                  href={site.links[c.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium hover:border-brand/40 hover:text-brand-accent"
                >
                  <Icon size={17} strokeWidth={1.75} />
                  {c.label}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <FadeIn>
          <div className="rounded-3xl bg-brand px-8 py-14 text-center text-white sm:px-12">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              「やりたくない作業」を仕組みに。
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              RAG・業務自動化・AIアプリ開発のご相談を承っています。まずは気軽にメールください。
            </p>
            <a
              href={`mailto:${site.email}`}
              className="btn-shine mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-brand-accent hover:bg-white/90"
            >
              <Mail size={18} />
              {site.email}
            </a>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
