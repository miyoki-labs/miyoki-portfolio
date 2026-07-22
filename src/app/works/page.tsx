import type { Metadata } from "next";
import FadeIn from "@/components/ui/FadeIn";
import WorkCard from "@/components/WorkCard";
import { works } from "@/data/works";

export const metadata: Metadata = {
  title: "実績",
  description: "RAG・業務自動化・AIアプリ開発を中心とした制作実績。",
};

export default function WorksPage() {
  return (
    <main className="page-space mx-auto max-w-5xl px-5">
      <FadeIn>
        <p className="font-mono text-xs text-brand-accent">WORKS</p>
        <h1 className="display-lg heading-wrap mt-3 font-display">実績</h1>
        <p className="lead mt-4 max-w-2xl text-g3">
          AIをどこに使い、どこを人が握ったか。課題から結果までを1件ずつ書いています。
        </p>
      </FadeIn>

      <div className="content-gap card-gap fade-in-stagger grid sm:grid-cols-2 lg:grid-cols-3">
        {works.map((w) => (
          <FadeIn key={w.slug}>
            <WorkCard work={w} />
          </FadeIn>
        ))}
      </div>
    </main>
  );
}
