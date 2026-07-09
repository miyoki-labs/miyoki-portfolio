# miyoki-portfolio CLAUDE.md

AIプロダクトエンジニアのポートフォリオサイト。「作れる人間である証明」を見せて受託相談につなげる入口。
**AI業務自動化・ツール開発 ＋ Web/LP制作の両方をMiyoki個人で受ける**（2026-07-09改訂。Web/LPは `Nompass\build` 流用で完結する案件のみ）。Nompassは送客先ではなく**自分が展開しているプロダクト**。正＝`C:\Miyoki\計画\03_収益化.md`／直す順＝`計画\04_ポートフォリオ計画.md`。
技術：Next.js 15 / React 19 / TypeScript / Tailwind / Cloudflare Pages（output:export → wrangler、`npm run deploy`）。
実績＝`src/data/works.ts`、サイト設定＝`src/data/site.ts`。

## 開発ログ（必須）

- 開発したら**同じセッションで** `knowledge-log/history/main.md` に対応・知見・成果を追記する（旧CHANGELOGの役割）。
- 記事になりそうなら `knowledge-log/log.md` に1件昇格させる（🔬Miyoki Labsレーン・★評価）。
- 運用ルールの本体は `C:\Miyoki\ideas\_knowledge-log-rule.md`（マスター規約）。

## 品質チェック（Miyoki共通）

実装・修正の完了後は共通スキルを使う（正= `C:\Miyoki\.claude\skills\`）：
- `/quality-check` … 変更種別から該当チェックを逆引き（UI3幅/フォーム/API/デプロイ後）
- `/ux-review` … UX健全性の定期レビュー（汎用4軸＋固有軸）
- 薄い計画書＝ `C:\Miyoki\計画\プロジェクト別\` の同名md（目的/現在地/次の一手）
