# 開発知見ログ（記事ネタ帳）

> 運用ルールは `00_rule.md`（＝マスター規約 `C:\Miyoki\ideas\_knowledge-log-rule.md`）。
> 新しいものは各レーンの上に足す（新しい順）。出典＝重複防止キー。★・ステータスは育てる。

---

## 🔥 今週書くならこれ（未執筆・ネタ度順 Top3）

1. **SPA遷移でフェードインが消える不具合と静的エクスポート構成**（Zenn・★★）
2. **env未設定でもOGP/sitemapが本番URLで出る既定値設計**（Zenn/Qiita・★★）

---

## 🔬 Miyoki Labs レーン（技術の中身）

### 2026-06-30｜SPA遷移でフェードインが消える不具合と静的エクスポート構成
- **出典**: miyoki-portfolio `fix: SPA遷移でフェードイン要素が表示されない不具合を修正`／`静的エクスポート構成に変更`（2026-06-30）
- **何が起きた/やった**: ページ遷移でIntersectionObserver要素が再表示されない不具合を修正。env未設定でもOGP/sitemapが本番URLで出る既定値設計、静的エクスポート（output:export→wrangler）構成へ。
- **記事のフック（なぜ刺さる）**: SPA演出のハマりどころ＋環境変数に依存しないフェイルセーフ設計がセットで実用的。
- **その時の本音**: （後で記入）
- **レーン/媒体**: 🔬Miyoki Labs（Zenn=開発ログ）
- **ネタ度**: ★★ / **ステータス**: 未執筆

### 2026-06-30｜Windowsで next-on-pages を避けて output:export + wrangler で出す
- **出典**: miyoki-portfolio `静的エクスポート構成に変更＋デプロイ手順整備`（2026-06-30）／README
- **何が起きた/やった**: Windowsで不安定な next-on-pages を使わず、`output:"export"` で out/ 生成 → wrangler pages deploy に切替（`npm run deploy`）。
- **記事のフック（なぜ刺さる）**: Cloudflare Pages × Next.js を Windows で回す人向けの現実的な構成選択。
- **その時の本音**: （後で記入）
- **レーン/媒体**: 🔬Miyoki Labs（Zenn／Qiita）
- **ネタ度**: ★★ / **ステータス**: 未執筆
