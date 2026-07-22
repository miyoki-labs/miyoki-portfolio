import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "送信完了",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <main className="page-space mx-auto flex min-h-[65vh] max-w-2xl items-center justify-center px-5">
      <div className="w-full rounded-3xl border border-g1 bg-white p-8 text-center sm:p-12">
        <CheckCircle2 size={48} className="mx-auto mb-5 text-brand" aria-hidden="true" />
        <h1 className="display-md heading-wrap">送信が完了しました</h1>
        <p className="lead mx-auto mt-4 max-w-md text-g3">
          お問い合わせありがとうございます。通常2〜3営業日以内にご返信します。
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border border-g2 px-6 py-3 text-sm font-medium hover:border-brand/40"
        >
          <ArrowLeft size={16} />
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}
