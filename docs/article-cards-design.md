# 設計：最新記事カード・セクション（Zenn / Qiita / note）

> 作成 2026-07-01 ／ 対象: `miyoki-portfolio`（Next.js 15 / 静的エクスポート / Cloudflare Pages）
> 目的: ポートフォリオの「発信」に、各媒体の最新記事を**ビルド時取得→静的カード**で表示する。

---

## 1. ゴールと方針

- 既存「発信（CHANNELS）」のリンクボタンは残し、その上に**最新記事カード**を追加する。
- **ビルド時に取得して静的HTMLに焼き込む**（`next.config.mjs` の `output: "export"` と整合。実行時の外部依存ゼロ＝事故らない）。
- 取得失敗してもビルドを止めない（**フェイルセーフ**。Cloudflareの「初回真っ白」回避と同じ思想）。
- 対象3媒体: **Zenn / Qiita / note**。Xは記事APIが弱いので従来どおりリンクのみ。

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
| Zenn | `https://zenn.dev/api/articles?username=miyoki347&order=latest` | JSON | `title` / `emoji` / `liked_count` / `published_at` / `path`（URL=`https://zenn.dev`+path） |
| Qiita | `https://qiita.com/api/v2/users/Miyoki347/items?per_page=10` | JSON | `title` / `url` / `likes_count` / `created_at` |
| note | `https://note.com/miyoki_music/rss` | XML(RSS2.0) | `<item>` の `title` / `link` / `pubDate`（titleはCDATA） |

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

## 6. 鮮度＝週次自動更新（Cloudflare Deploy Hook）

静的なので再ビルドで更新。**金曜のネタ収集ルーティンと一緒に週1で再デプロイ**して最新化する。

手順:
1. Cloudflare Pages → プロジェクト `miyoki-portfolio` → Settings → **Deploy Hook** を作成（branch=main）。発行されるURL（POST）を控える。
2. URLは秘匿。`C:\Miyoki\ideas\` 配下の git管理外ファイル（例 `_deploy-hook.txt`）に保存し、`_run-seed-scan.ps1` から読んで叩く。
3. `_run-seed-scan.ps1` の末尾に追記（スキャン追記が終わった後）:
   ```powershell
   $hookFile = Join-Path $root 'ideas\_deploy-hook.txt'
   if (Test-Path $hookFile) {
     $hook = (Get-Content -Raw $hookFile).Trim()
     try { Invoke-RestMethod -Method Post -Uri $hook | Out-Null } catch {}
   }
   ```
   → 毎週金曜、ネタ収集の直後にポートフォリオが再ビルドされ、記事カードが最新化される。

> Cloudflare側のcronでも代替可能だが、既にある金曜ルーティンに相乗りするのが構成を増やさず安全。

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

## 9. 未決・確認したいこと

- 表示件数（既定6件・媒体混在）でよいか／媒体ごとに均等割りにするか。
- カードに「♡いいね数」を出すか（note はRSSに数値が無いので Zenn/Qiita のみ表示になる）。
- 配置：「発信」セクションの上（記事を主役）か下（リンクボタンを主役）か。
