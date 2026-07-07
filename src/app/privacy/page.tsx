import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
      <h1 className="font-display text-3xl font-bold">プライバシーポリシー</h1>
      <p className="mt-3 text-sm text-foreground/55">制定日：2026年6月30日</p>

      <div className="mt-8 space-y-8 leading-relaxed text-foreground/80">
        <section>
          <h2 className="font-display text-lg font-semibold">1. 取得する情報</h2>
          <p className="mt-2">
            本サイトでは、お問い合わせ（メール）をいただいた際に、お名前・メールアドレス・
            ご相談内容など、ご本人がご提供くださる情報を取得します。
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold">2. 利用目的</h2>
          <p className="mt-2">
            取得した情報は、お問い合わせへの回答・ご相談対応・必要な連絡のためにのみ利用します。
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold">3. 第三者提供</h2>
          <p className="mt-2">
            法令に基づく場合を除き、ご本人の同意なく第三者へ提供することはありません。
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold">4. アクセス解析</h2>
          <p className="mt-2">
            サイト改善のためアクセス解析ツール（Google Analytics 等）を利用する場合があります。
            これらは Cookie を使用しますが、個人を特定する情報は含みません。ブラウザ設定で
            Cookie を無効化できます。
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold">5. お問い合わせ</h2>
          <p className="mt-2">
            本ポリシーに関するお問い合わせは{" "}
            <a
              href="/contact"
              className="text-brand-accent underline underline-offset-2"
            >
              お問い合わせフォーム
            </a>{" "}
            よりご連絡ください。
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold">6. 改定</h2>
          <p className="mt-2">
            本ポリシーは、必要に応じて改定することがあります。変更後の内容は本ページに掲載します。
          </p>
        </section>
      </div>
    </main>
  );
}
