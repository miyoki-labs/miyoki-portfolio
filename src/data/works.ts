// 実績データ（MVPは直書き。案件が増えたらここに追加する）。
// 各項目は「課題 → 作ったもの → AIの使いどころ → 技術 → 結果/学び」で語る。

export type WorkLink = {
  demo?: string;
  repo?: string;
  article?: string;
};

export type Work = {
  slug: string;
  title: string;
  category: string;
  status?: "公開中" | "開発中" | "デモ";
  summary: string; // カード/一覧用の短い説明
  problem: string; // 課題
  solution: string; // 作ったもの
  aiRole: string; // AIの使いどころ（どこを任せ、どこを人が握るか）
  tech: string[];
  result: string; // 結果・学び
  links?: WorkLink;
};

export const works: Work[] = [
  {
    slug: "accounting-tax-rag",
    title: "経理・税務AIアシスタント（RAG）",
    category: "RAG / 業務ナレッジ",
    status: "デモ",
    summary:
      "経費規程・税務・仕訳・雇用形態の4領域を横断し、根拠を示してから答える「説明可能なRAG」。",
    problem:
      "中小企業の経理は1〜2名に属人化しがちです。ChatGPT連携だと“それっぽいけど根拠不明”な回答になりやすく、特に雇用形態（偽装請負リスク等）は誤った確信が一番危険です。",
    solution:
      "質問に対し、まず知識ベースから関連チャンクを検索し、該当した根拠を画面に「スタンプ」として提示します。その範囲内だけでClaudeが回答します。業種を問わず使える汎用設計で、顧客データに差し替えればそのまま動きます。",
    aiRole:
      "回答生成はClaudeに任せますが、参照範囲は検索でヒットした根拠に限定します。雇用形態の領域は最終判断をAIに出させず、必ず社労士・税理士への確認を促す一文を付けます（守りの設計）。",
    tech: ["Next.js", "TypeScript", "Claude API", "bi-gram検索（依存ゼロ）"],
    result:
      "「AIが当てずっぽうで答えていない」ことを、根拠スタンプで目に見える形にしました。本番は Embeddings＋ベクトルDB へ拡張できます。",
    links: { repo: "https://github.com/miyoki-labs/accounting-tax-rag-demo" },
  },
  {
    slug: "proposal-generator",
    title: "提案文ジェネレーター",
    category: "業務自動化 / 文書生成",
    status: "公開中",
    summary: "営業・提案の定型文書をAIで素早く生成し、toBの繰り返し作業を圧縮するツール。",
    problem:
      "提案文・営業文書は毎回ゼロから書くと時間がかかり、品質も人によってブレます。",
    solution:
      "入力をもとに提案文を生成するWebアプリです。トーンや要点を指定して、たたき台を即出力します。手直し前提で“最初の8割”を一気に作ります。",
    aiRole:
      "下書き生成をAIに任せ、最終調整は人が握ります。完全自動ではなく「人が直す前提の高速化」に振っています。",
    tech: ["Next.js", "TypeScript", "Claude API"],
    result: "繰り返しの文書作成を短縮できます。営業支援モジュールとして転用の余地があります。",
    links: {
      demo: "https://proposal-generator-sand.vercel.app/",
      repo: "https://github.com/miyoki-labs/proposal-generator",
    },
  },
  {
    slug: "writing-assistant",
    title: "執筆補助ツール",
    category: "コンテンツ制作支援",
    status: "デモ",
    summary:
      "ストリーミング生成・画像プロンプト・履歴管理まで備えた執筆支援ツール。",
    problem:
      "記事やコンテンツ制作は、下書き・媒体別の書き分け・画像用プロンプト作りなど工程が多く、手が止まりやすいです。",
    solution:
      "媒体・文字数・参照テキストを指定して本文をストリーミング生成します。画像生成用プロンプトの作成や履歴の保持もまとめて行えます。",
    aiRole:
      "文章生成・画像プロンプト生成をAIが担当します。トークン使用量も可視化して、コストを見ながら回せるようにしました。",
    tech: ["React", "TypeScript", "Claude API（ストリーミング）"],
    result:
      "「続かない発信」を仕組みで支える方向の実装です。ブログ自動化パイプラインの土台にもなっています。",
    links: { repo: "https://github.com/miyoki-labs/writing-assistant" },
  },
  {
    slug: "miyoki-media-pipeline",
    title: "ブログ自動化パイプライン",
    category: "業務自動化 / コンテンツ",
    status: "開発中",
    summary:
      "キーワードから記事下書きまでを6ステップで生成。サイト別プロファイルで複数媒体に対応。",
    problem:
      "発信は続けるほど資産になりますが、毎回ゼロから書くのは続きません。続けられる仕組みが必要です。",
    solution:
      "キーワード→リサーチ→構成→下書き→レビュー→書き出しの6ステップを半自動化します。サイトごとにトーン・キーワード・CTAを切り替えるプロファイルで、複数媒体に1ツールで対応する設計です。",
    aiRole:
      "各ステップの生成をAIが担当します。人は要所のレビューと公開判断だけに集中します（低負荷で継続）。",
    tech: ["React", "TypeScript", "Vite", "Cloudflare Functions", "Claude API"],
    result:
      "開発過程そのものが発信ネタになる、連載型のプロジェクトです。継続を仕組みで解く実例です。",
  },
  {
    slug: "teleapo-assistant",
    title: "テレアポ切り返しAIアシスタント",
    category: "現場業務 × AI",
    status: "デモ",
    summary:
      "断り文句を入力すると、顧客プロファイルに合わせた切り返しトークを即提示します。",
    problem:
      "テレアポは断られてからの一言が成果を分けますが、その場で最適な返しを出すのは難しく、属人化しがちです。",
    solution:
      "顧客プロファイル（年代・物件種別・エリア）を設定し、断り文句を入力すると、状況分析→切り返し例→ポイント→次の一手の4段で提案します。会話履歴を保持して深掘りもできます。",
    aiRole:
      "切り返しの提案をAIが生成します。現場で“使える形”に落とすUIに振りました（現場業務×AIの実用デモ）。",
    tech: ["Next.js", "TypeScript", "Claude API"],
    result:
      "現場の定型対応をAIで支える実例です。電話・SMS応対の自動化へ展開できます。",
    links: { repo: "https://github.com/miyoki-labs/teleapo-demo" },
  },
  {
    slug: "numeric-counter",
    title: "数値分析カウンター",
    category: "アプリ開発 / データ可視化",
    status: "公開中",
    summary:
      "日々の活動を“データ資産”に変えるカウンターアプリ。Webアプリとして公開しています。",
    problem:
      "習慣や活動量を数えても、ただの数字で終わって振り返りに使えないことが多いです。",
    solution:
      "階層構造のカウンター・再帰集計・グラフ可視化・目標モード・履歴メモを備えています。企画から公開まで一人で作り切りました。",
    aiRole:
      "AIと協調しながら、設計・実装・デバッグを高速に進めました。",
    tech: ["Vite", "React 19", "TypeScript", "Firebase", "Recharts"],
    result:
      "企画から公開まで一人でやり切りました。プロダクトを形にして出せる、という実例です。",
    links: { demo: "https://numerical-analysis-counter.web.app" },
  },
];

export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}
