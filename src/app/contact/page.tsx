import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ・ご相談",
  description:
    "RAG・業務自動化・AIアプリ開発のご相談はこちらから。何ができるか整理したい段階でもお気軽にどうぞ。",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16 sm:py-20">
      <h1 className="font-display text-3xl font-bold">お問い合わせ・ご相談</h1>
      <p className="mt-3 leading-relaxed text-foreground/70">
        RAG・業務自動化・AIアプリ開発など、AI導入のご相談を承っています。
        「まず何ができるか整理したい」段階でもお気軽にどうぞ。
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </main>
  );
}
