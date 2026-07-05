# miyoki-portfolio

Miyoki（AIプロダクトエンジニア）のポートフォリオサイト。
AI業務自動化・ツール開発の実績を見せて受託相談につなげる入口。Web/LP制作は別ブランド Nompass に送客する。

## 技術構成

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS（CSS変数でブランドカラー）
- Cloudflare Pages（`@cloudflare/next-on-pages`）
- 実績データは `src/data/works.ts` に直書き（microCMSは未導入＝後追い可）

## セットアップ

```bash
npm install
cp .env.local.example .env.local   # NEXT_PUBLIC_SITE_URL を設定
npm run dev                         # http://localhost:3000
```

## 編集する場所

- サイト設定（名前・肩書き・リンク・メール）: `src/data/site.ts`
- 実績の追加・編集: `src/data/works.ts`（1件 = 課題→作ったもの→AIの使いどころ→技術→結果）
- ブランドカラー: `src/app/globals.css` の `--brand` 系

## 公開前チェック（Nompass build の作法準拠）

- [x] `NEXT_PUBLIC_SITE_URL` を本番ドメインに設定（`site.ts`のフォールバックを`miyoki-labs.com`に変更済み。Cloudflare Pages側の環境変数を明示設定するのは任意）
- [x] `public/og.png`（1200×630）を用意（実ロゴ＋ブランド色で生成済み）
- [x] ロゴを WebP 化（`public/logo-avatar.webp` / `public/logo-mark.webp`、元PNGは `brand/`）
- [ ] 実績の公開URL / リポジトリ / 解説記事リンクを `works.ts` に追記
- [ ] ヒーローの一言（`site.ts` の tagline）を最終確認

## デプロイ（Cloudflare Pages）

本番URL: https://miyoki-labs.com（旧: https://miyoki-portfolio.pages.dev）

全ページ静的なので `output: "export"` で `out/` を生成し、wrangler で直接アップロードする
（Windowsで不安定な next-on-pages は使わない）。

```bash
npm run deploy   # next build（out/生成）→ wrangler pages deploy
```

> GitHub連携の自動デプロイにしたい場合は、Cloudflareダッシュボードで
> Pagesプロジェクトをこのリポジトリに接続する（一度きりの手動設定）。

## 未実装（後追い）

- 問い合わせフォーム（現状はメール＋SNSリンク。Resend導入は後で）
