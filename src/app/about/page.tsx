import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "プロフィール",
  description: `${site.name}（${site.role}）のプロフィール。`,
};

const values = [
  {
    title: "やりたくない作業を、仕組みで回す",
    body: "AI活用の根っこにある考え方。Nompassの思想であり、自分自身にも適用しています。",
  },
  {
    title: "まず動かして、回しながら上げる",
    body: "完璧を待たずに出す。続かないことは無理にやらず、低負荷の仕組み（自動化）で続けます。",
  },
  {
    title: "誠実に、煽らない",
    body: "誇張はせず、体験・判断の経緯・失敗もそのまま出します。目先の差別化より、信頼を積み重ねたいと思っています。",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
      <FadeIn>
        <p className="font-mono text-xs text-brand-accent">ABOUT</p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          {site.name}
        </h1>
        <p className="mt-2 font-mono text-sm text-brand-accent">{site.role}</p>
      </FadeIn>

      <FadeIn>
        <div className="mt-8 space-y-4 leading-relaxed text-foreground/80">
          <p>
            AIを活用して、企画から制作・運用までプロダクトを形にしています。
            RAG・業務自動化・AIアプリ開発が得意です。
          </p>
          <p>
            個人で事業「Nompass」（小規模事業者向けの Web × AI 支援）を立ち上げ、企画から制作・運用・事業化まで一人で回しています。
            「AIで何をどこまで任せ、どこを人が握るか」を、理論ではなく実体験からお伝えできます。
          </p>
          <p>
            独学・キャリアチェンジを目指す人の役に立てたら、という思いで発信もしています。
          </p>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="mt-12 font-display text-xl font-semibold">大事にしていること</h2>
        <div className="mt-5 space-y-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-black/8 bg-white p-6">
              <h3 className="font-display text-base font-semibold text-brand-accent">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{v.body}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        <div className="mt-12 flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className="btn-shine inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-medium text-white hover:bg-brand-light"
          >
            <Mail size={18} />
            相談する
          </a>
          <Link
            href="/works"
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-6 py-3 text-sm font-medium hover:border-brand/40"
          >
            実績を見る
          </Link>
        </div>
      </FadeIn>
    </main>
  );
}
