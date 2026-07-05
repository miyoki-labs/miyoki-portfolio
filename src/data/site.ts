// サイト全体の設定。文章・リンクはここを直せば全ページに反映される。

export const site = {
  name: "Miyoki",
  role: "AIプロダクトエンジニア",
  // ヒーローの一言
  tagline: "創って、動かして、届ける。",
  taglineSub: "AIでプロダクトを形にする。",
  intro:
    "RAG・業務自動化・AIアプリ開発が専門です。個人で事業（Nompass）を立ち上げた当事者として、企画から運用まで一気通貫で支援します。",
  email: "miyoki.43834@gmail.com",
  // 公開URL（env優先・未設定なら本番ドメイン）
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://miyoki-labs.com",

  // Web/LP制作の送客先（別ブランド Nompass）
  nompassUrl: "https://nompass.jp",

  // Miyokiブログ（別Cloudflare Pagesプロジェクト・サブドメイン）
  blogUrl: "https://blog.miyoki-labs.com",

  // 全媒体で統一したハンドル（見せ場）
  handle: "@miyoki_labs",

  links: {
    github: "https://github.com/miyoki-labs",
    zenn: "https://zenn.dev/miyoki_labs",
    qiita: "https://qiita.com/miyoki_labs",
    x: "https://x.com/miyoki_labs",
    note: "https://note.com/miyoki_labs",
  },
} as const;

export type ChannelKey = keyof typeof site.links;
