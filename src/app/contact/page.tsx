import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ・ご相談",
  description:
    "RAG・業務自動化・AIアプリ開発のご相談はこちらから。何ができるか整理したい段階でもお気軽にどうぞ。",
};

export default function ContactPage() {
  return (
    <main className="page-space mx-auto max-w-2xl px-5">
      <h1 className="display-lg heading-wrap font-display">お問い合わせ・ご相談</h1>
      <p className="lead mt-4 text-g3">
        RAG・業務自動化・AIアプリ開発など、AI導入のご相談を承っています。
        「まず何ができるか整理したい」段階でもお気軽にどうぞ。
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </main>
  );
}
