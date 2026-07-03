# 設計：最新記事カード・セクション（Zenn / Qiita / note）

> 作成 2026-07-01 ／ 対象: `miyoki-portfolio`（Next.js 15 / 静的エクスポート / Cloudflare Pages）
> 目的: ポートフォリオの「発信」に、各媒体の最新記事を**ビルド時取得→静的カード**で表示する。

---

## 1. ゴールと方針

- 既存「発信（CHANNELS）」のリンクボタンは残し、その上に**最新記事カード**を追加する。
- **ビルド時に取得して静的HTMLに焼き込む**（`next.config.mjs` の `output: "export"` と整合。実行時の外部依存ゼロ＝事故らない）。
- 取得失敗してもビルドを止めない（**フェイルセーフ**。Cloudflareの「初回真っ白」回避と同じ思想）。
- 自動カードの対象は **Zenn / Qiita / note** の3媒体（いずれもビルド時にJSON/RSSで取得可能）。
- **Xはカード化しない**：無料の記事取得APIが無く、埋め込みウィジェットも重い。`@miyoki_labs` への**フォローボタン**として目立たせる（SNS経由のリード導線も兼ねる）。

---

## 2. アーキテクチャ（なぜビルド時か）

静的エクスポートでは Server Component の `fetch` が **`next build` の瞬間に1回だけ実行**され、結果がHTMLに焼き込まれる。

```
npm run build ─┬─ Zenn  API (JSON) ┐
               ├─ Qiita API (JSON) ├─ 正規化 → 日付降順ソート → 上位N件 → 静的HTML(out/)
               └─ note  RSS (XML)  ┘   ↓ Cloudflare Pages 配信（実行時fetch無し）
```

更新は「再ビルドした時」だけ起きる（§6でその自動化を設計）。

---

## 3. データソース

| 媒体 | 取得先 | 形式 | 使うフィールド |
|---|---|---|---|
| Zenn | `https://zenn.dev/api/articles?username=miyoki_labs&order=latest` | JSON | `title` / `emoji` / `liked_count` / `published_at` / `path`（URL=`https://zenn.dev`+path） |
| Qiita | `https://qiita.com/api/v2/users/miyoki_labs/items?per_page=10` | JSON | `title` / `url` / `likes_count` / `created_at` |
| note | `https://note.com/miyoki_labs/rss` | XML(RSS2.0) | `<item>` の `title` / `link` / `pubDate`（titleはCDATA） |

> ハンドルは **Miyoki Labs 人格**に全統一（X/note/Zenn/Qiita=`miyoki_labs`、GitHub=`miyoki-labs`、表示名=`Miyoki Labs`）。
> 上記URLのユーザー名は**リネーム後**の `miyoki_labs` 前提。各アカウントのリネーム/有効化が済むまで、該当ソースは空配列でフェイルセーフ。

- Zennは非公式APIだが安定。Qiitaは公式API（未認証60req/h、ビルド時1回なので余裕）。
- note RSSはCDATAを含むため、正規表現ではなく **`fast-xml-parser`** でパースする（軽量・CDATA安全）。

### 依存追加
- `fast-xml-parser`（note RSS用）。ビルド時のみ使用。

---

## 4. データモデル

```ts
// src/data/articles.ts
export type ArticlePlatform = "zenn" | "qiita" | "note";

export type Article = {
  platform: ArticlePlatform;
  title: string;
  url: string;
  publishedAt: string; // ISO8601
  emoji?: string;      // Zennのみ
  likes?: number;      // Zenn/Qiita
};

// 各fetchは個別にtry/catch。失敗したソースは [] を返し、全体は止めない。
async function fetchZenn(): Promise<Article[]> { /* ... */ }
async function fetchQiita(): Promise<Article[]> { /* ... */ }
async function fetchNote(): Promise<Article[]> { /* ... */ }

export async function getArticles(limit = 6): Promise<Article[]> {
  const all = (await Promise.all([fetchZenn(), fetchQiita(), fetchNote()])).flat();
  return all
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, limit);
}
```

---

## 5. 追加・変更ファイル

| ファイル | 内容 | 種別 |
|---|---|---|
| `src/data/articles.ts` | 取得・正規化・ソート（上記） | 新規 |
| `src/components/ArticleCard.tsx` | 記事カード（媒体バッジ＋絵文字＋タイトル＋日付＋♡） | 新規 |
| `src/app/page.tsx` | 「発信」セクション冒頭に `await getArticles()` のグリッドを追加 | 変更 |
| `package.json` | `fast-xml-parser` 追加 | 変更 |

- `page.tsx` は Server Component なので `export default async function Home()` にして `await` 可能。
- デザインは既存 `WorkCard` / `FadeIn` の言語を踏襲（角丸2xl・border-black/8・hover）。媒体バッジ色は Zenn=青 / Qiita=緑 / note=黒寄りで区別。

---

## 6. 鮮度＝再デプロイで更新（※Deploy Hookは使えない）

このPagesは **wrangler 直アップ型**（Git連携なし。`npm run deploy` = `next build` → `wrangler pages deploy`）。
**Cloudflare Deploy Hookはビルドがある Git連携プロジェクト専用**なので、この構成では使えない。よって記事カードの更新＝**ローカルで再ビルド＆デプロイ**するしかない。

方針（推奨）:
- **記事を公開したら `npm run deploy` する運用**にする。新記事を出すたびに手動デプロイするので、そのタイミングでカードも自動的に最新化される（追加の仕組み不要＝「絞る」に合う）。

任意（自動化したい場合）:
- 金曜のネタ収集ルーティン `_run-seed-scan.ps1` の末尾に `npm run deploy`（`cd C:\Miyoki\個人\miyoki-portfolio; npm run deploy`）を足せば週次で自動リビルドできる。
  - 注意：`npm run dev` 稼働中に走らせると `.next` が壊れる（別handoff §5）。ルーティンは22:00実行なので通常は問題ないが、devを開いていないこと。
- 将来 GitHub→Cloudflare Pages を連携すれば、push自動デプロイ＋Deploy Hookが使えるようになる（現状は意図的に未連携）。

---

## 7. フェイルセーフ・エッジケース

- いずれかのAPI/RSS失敗 → そのソースは空配列（他媒体は表示）。
- 記事0件 → カードグリッドは描画せず、従来のリンクボタンだけ表示。
- タイトル長 → 2行で truncate。絵文字なし → デフォルト（📝）。日付欠損 → 非表示。
- ビルド時fetchのタイムアウト対策として各fetchに `AbortController`（例 8秒）を入れる。

---

## 8. フェーズ分け

- **Phase 1**: `articles.ts`＋`ArticleCard`＋`page.tsx` 配線（Zenn/Qiita/note 3媒体）。`npm run deploy` で表示確認。
- **Phase 2**: Cloudflare Deploy Hook 作成 → `_run-seed-scan.ps1` から週次POST（§6）。

---

## 9. 確定した表示仕様（2026-07-01）

- **表示件数**：最新6件・媒体混在（`getArticles(6)`）。
- **いいね数**：出さない（新アカウント初期は数字が小さく逆効果。タイトルで見せる）。`Article.likes` は持つが描画しない。
- **配置**：「発信」セクション内で **記事カードを上**、その下に各媒体リンク（Xはフォローボタン）。
- 媒体バッジ色：Zenn=青 / Qiita=緑 / note=黒寄り。
