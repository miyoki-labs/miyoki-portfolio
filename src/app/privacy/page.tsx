import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <main className="page-space mx-auto max-w-3xl px-5">
      <h1 className="display-lg heading-wrap font-display">プライバシーポリシー</h1>
      <p className="mt-3 text-sm text-g3">制定日：2026年6月30日</p>

      <div className="mt-8 space-y-10 leading-relaxed text-g4">
        <section>
          <SectionHeading label="Privacy 01" title="取得する情報" compact />
          <p className="mt-3">
            本サイトでは、お問い合わせ（メール）をいただいた際に、お名前・メールアドレス・
            ご相談内容など、ご本人がご提供くださる情報を取得します。
          </p>
        </section>

        <section>
          <SectionHeading label="Privacy 02" title="利用目的" compact />
          <p className="mt-3">
            取得した情報は、お問い合わせへの回答・ご相談対応・必要な連絡のためにのみ利用します。
          </p>
        </section>

        <section>
          <SectionHeading label="Privacy 03" title="第三者提供" compact />
          <p className="mt-3">
            法令に基づく場合を除き、ご本人の同意なく第三者へ提供することはありません。
          </p>
        </section>

        <section>
          <SectionHeading label="Privacy 04" title="アクセス解析" compact />
          <p className="mt-3">
            サイト改善のためアクセス解析ツール（Google Analytics 等）を利用する場合があります。
            これらは Cookie を使用しますが、個人を特定する情報は含みません。ブラウザ設定で
            Cookie を無効化できます。
          </p>
        </section>

        <section>
          <SectionHeading label="Privacy 05" title="お問い合わせ" compact />
          <p className="mt-3">
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
          <SectionHeading label="Privacy 06" title="改定" compact />
          <p className="mt-3">
            本ポリシーは、必要に応じて改定することがあります。変更後の内容は本ページに掲載します。
          </p>
        </section>
      </div>
    </main>
  );
}
