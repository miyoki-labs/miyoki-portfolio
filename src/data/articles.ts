import { XMLParser } from "fast-xml-parser";

// 各媒体の最新記事をビルド時に取得して静的カードに焼き込む。
// 実行時fetchはしない（output:"export" と整合）。取得失敗したソースは [] を返し全体は止めない。
// 設計: docs/article-cards-design.md

export type ArticlePlatform = "zenn" | "qiita" | "note";

export type Article = {
  platform: ArticlePlatform;
  title: string;
  url: string;
  publishedAt: string; // ISO8601
  emoji?: string; // Zennのみ
  likes?: number; // Zenn/Qiita（現状カードでは非表示）
};

const ZENN_USER = "miyoki_labs";
const QIITA_USER = "miyoki_labs";
// note は新規に miyoki_labs で作成。アカウント作成までは RSS が 404 → 空配列（無害）。
const NOTE_USER = "miyoki_labs";

async function fetchWithTimeout(url: string, ms = 8000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

type ZennApiArticle = {
  title: string;
  path: string;
  emoji?: string;
  liked_count?: number;
  published_at: string;
};

async function fetchZenn(): Promise<Article[]> {
  try {
    const res = await fetchWithTimeout(
      `https://zenn.dev/api/articles?username=${ZENN_USER}&order=latest`,
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { articles?: ZennApiArticle[] };
    return (data.articles ?? []).map((a) => ({
      platform: "zenn" as const,
      title: a.title,
      url: `https://zenn.dev${a.path}`,
      publishedAt: a.published_at,
      emoji: a.emoji,
      likes: a.liked_count,
    }));
  } catch {
    return [];
  }
}

type QiitaApiItem = {
  title: string;
  url: string;
  likes_count?: number;
  created_at: string;
};

async function fetchQiita(): Promise<Article[]> {
  try {
    const res = await fetchWithTimeout(
      `https://qiita.com/api/v2/users/${QIITA_USER}/items?per_page=10`,
    );
    if (!res.ok) return [];
    const data = (await res.json()) as QiitaApiItem[];
    return (data ?? []).map((a) => ({
      platform: "qiita" as const,
      title: a.title,
      url: a.url,
      publishedAt: a.created_at,
      likes: a.likes_count,
    }));
  } catch {
    return [];
  }
}

type NoteRssItem = {
  title?: string;
  link?: string;
  pubDate?: string;
};

// note は RSS(XML)。CDATA を含むので fast-xml-parser でパースする。
async function fetchNote(): Promise<Article[]> {
  try {
    const res = await fetchWithTimeout(`https://note.com/${NOTE_USER}/rss`);
    if (!res.ok) return [];
    const xml = await res.text();
    const parsed = new XMLParser().parse(xml) as {
      rss?: { channel?: { item?: NoteRssItem | NoteRssItem[] } };
    };
    const raw = parsed.rss?.channel?.item;
    const items = Array.isArray(raw) ? raw : raw ? [raw] : [];
    return items
      .map((it) => ({
        platform: "note" as const,
        title: String(it.title ?? ""),
        url: String(it.link ?? ""),
        publishedAt: it.pubDate ? new Date(it.pubDate).toISOString() : "",
      }))
      .filter((a) => a.title && a.url);
  } catch {
    return [];
  }
}

export async function getArticles(limit = 6): Promise<Article[]> {
  const all = (
    await Promise.all([fetchZenn(), fetchQiita(), fetchNote()])
  ).flat();
  return all
    .filter((a) => a.publishedAt)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, limit);
}
