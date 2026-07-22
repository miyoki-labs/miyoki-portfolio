import Link from "next/link";

export const metadata = {
  title: "ページが見つかりません",
};

export default function NotFound() {
  return (
    <main className="page-space mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-sm text-brand-accent">404</p>
      <h1 className="display-md heading-wrap mt-3 font-display">
        ページが見つかりませんでした
      </h1>
      <p className="mt-3 text-[15px] text-g3">
        URLが変わったか、削除された可能性があります。
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-brand px-5 py-3 text-sm font-medium text-white hover:bg-brand-light"
        >
          トップへ戻る
        </Link>
        <Link
          href="/works"
          className="rounded-lg border border-g2 px-5 py-3 text-sm font-medium hover:border-brand/40"
        >
          実績を見る
        </Link>
      </div>
    </main>
  );
}
