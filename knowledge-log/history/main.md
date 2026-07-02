# 生ログ（history）— miyoki-portfolio

> 開発したら、同じセッションでここに追記する（旧 CHANGELOG の役割）。事実ベース・網羅でよい。
> 記事になりそうなものは `../log.md` に1件昇格させる。

---

## 2026-06-30〜07-01（初回・過去分の遡り）

- コミット：`init: Miyoki ポートフォリオ`(06-30) → `静的エクスポート構成に変更＋デプロイ手順整備`(06-30) → `siteUrl既定を本番pages.devに（env未設定でもOGP/sitemapが正しく出る）`(06-30) → `SPA遷移でフェードイン要素が表示されない不具合を修正`(06-30) → `実績にGitHub/デモリンクを追加（RAG/提案文/執筆補助/テレアポ）`(07-01)。
- 技術：Next.js 15 (App Router) / React 19 / TypeScript / Tailwind（CSS変数でブランドカラー）/ Cloudflare Pages。
- 方針：Windowsで不安定な next-on-pages は使わず **`output:"export"` で out/ 生成 → wrangler で直接デプロイ**（`npm run deploy`）。
- 実績データは `src/data/works.ts` に直書き（microCMS未導入・後追い可）。サイト設定は `src/data/site.ts`。
- Nompass build作法を踏襲：画像WebP化（`public/*.webp`）、OGP（`public/og.png` 1200×630）、env未設定でも本番URLでOGP/sitemapが出る既定値設計。
- 本番URL：https://miyoki-portfolio.pages.dev

> ※ 未実装：問い合わせフォーム（Resend後追い）、ブログ（pipeline/microCMS連携）。ブランド統一（miyoki_labs）反映は roadmap P1。以降はこのファイルに随時追記。
