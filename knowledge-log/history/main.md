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

## 2026-07-04（`miyoki-labs.com` 取得反映）

- 背景：`miyoki-labs.com` を Cloudflare Registrar で取得完了（当初はXserverドメイン迂回を計画していたが、決済不調が再試行で解消し不要になった）。ルート＝ポートフォリオ、`blog.miyoki-labs.com`＝別Astroプロジェクト（miyoki-blog）に割当。
- 変更：`src/data/site.ts` の `siteUrl` フォールバックを `miyoki-portfolio.pages.dev` → `miyoki-labs.com` に変更、`blogUrl` フィールドを新設。`.env.local.example`／`robots.ts`／`sitemap.ts` のフォールバック値も同様に更新。`README.md` の本番URL表記・チェックリスト・「未実装」欄（ブログは別プロジェクトで実装済みのため記述を削除）を更新。
- 追加：ブログへの導線が一切無かったため、`src/components/LinkTree.tsx`（`/links`ページ）と `src/components/layout/Footer.tsx` に Blog リンクを追加。
- 未対応（本人作業）：Cloudflare Pagesダッシュボード側の環境変数 `NEXT_PUBLIC_SITE_URL` の明示設定（コード側フォールバックは修正済みなので必須ではない）。

## 2026-07-08（未デプロイ発覚＋Blog導線ラベル修正）

- **発覚**：ユーザーから「ポートフォリオにアフィリブログへの導線が見当たらない」と指摘。調査したところ、上記07-04のコミット（`5299642`）以降 `npm run deploy` が一度も実行されておらず、**本番が3日前の状態のまま**だった。`robots.txt`のSitemap URL・OGPの`og:url`が旧ドメイン（`miyoki-portfolio.pages.dev`）のまま、本番HTMLに"blog"の文字列が0件、という実測で確定。
- **対応**：`npm run deploy` を実行し本番へ反映（ドメイン更新・Blogリンクとも反映確認済み）。
- **追加修正**：`LinkTree.tsx`のBlog説明文が「AIツール紹介」という古い/狭い表現のままだった（実際はAIツール／開発環境・ガジェット／オンラインスクール・教材／サブスク・SaaSの4カテゴリ運営）。「ツール・教材レビュー」に修正し再デプロイ。
- **教訓**：コミットは反映の証明にならない。コードを読んで「直っているはず」と判断せず、本番を実測して確認する。

## 2026-07-07（Nompassをフラッグシップ実績に追加＝ブランド回遊の◎核を閉じる）

- **背景**：ワークスペース全体監査のSNS/ブログ回遊シミュ（フェーズG）で、`07_アカウント接続.md`の最重要接続「Portfolio→Nompass主力事例」が未実装＝Nompass LP→Portfolioは制作クレジットで信頼を送っているのに、Portfolio側がNompassをフラッグシップとして見せ返しておらず**回遊ループが半開き**と判明。
- **対応**：`src/data/works.ts` の works 配列**先頭**（最も目立つ位置）に `slug: "nompass"` を追加。「作れる」だけでなく「売って・運用できる」の証明として、Map診断起点・顧客ポータル・決済・運用まで一人で構築した事業、という文脈で記述（既存の課題→作ったもの→AIの使いどころ→技術→結果の型に沿う）。`demo: https://nompass.jp`。
- **検証**：`npx tsc --noEmit` exit 0（型OK）。🖥️**要デプロイ**（`npm run deploy`）で本番反映＝週末バッチ。
- **教訓**：回遊は「リンクがある」ではなく「事例として見せ返す」で初めて閉じる。片方向の信頼供給だけでは循環しない。
