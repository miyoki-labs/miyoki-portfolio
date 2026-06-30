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
      "中小企業の経理は1〜2名に属人化しがち。ChatGPT連携だと“それっぽいけど根拠不明”な回答になり、特に雇用形態（偽装請負リスク等）は誤った確信が一番危ない。",
    solution:
      "質問に対し、まず知識ベースから関連チャンクを検索→該当した根拠を画面に「スタンプ」として提示→その範囲内だけでClaudeが回答する構成。業種を問わず使える汎用設計で、顧客データに差し替えればそのまま動く。",
    aiRole:
      "回答生成はClaudeに任せるが、参照範囲は検索でヒットした根拠に限定。雇用形態の領域は最終判断をAIに出させず、必ず社労士・税理士への確認を促す一文を強制付与する（守りの設計）。",
    tech: ["Next.js", "TypeScript", "Claude API", "bi-gram検索（依存ゼロ）"],
    result:
      "「AIが当てずっぽうで答えていない」を根拠スタンプで視覚的に証明。商談で画面を見せた瞬間に伝わる強さがある。本番は Embeddings＋ベクトルDB へ拡張可能。",
    links: { repo: "https://github.com/Miyoki347/accounting-tax-rag-demo" },
  },
  {
    slug: "proposal-generator",
    title: "提案文ジェネレーター",
    category: "業務自動化 / 文書生成",
    status: "公開中",
    summary: "営業・提案の定型文書をAIで素早く生成。toBの繰り返し作業を圧縮する。",
    problem:
      "提案文・営業文書は毎回ゼロから書くと時間がかかり、品質も人によってブレる。",
    solution:
      "入力をもとに提案文を生成するWebアプリ。トーンや要点を指定して、たたき台を即出力。手直し前提で“最初の8割”を一気に作る。",
    aiRole:
      "下書き生成をAIに任せ、最終調整は人が握る。完全自動ではなく「人が直す前提の高速化」に振る。",
    tech: ["Next.js", "TypeScript", "Claude API"],
    result: "繰り返しの文書作成を短縮。営業支援モジュールとして転用余地が大きい。",
    links: {
      demo: "https://proposal-generator-sand.vercel.app/",
      repo: "https://github.com/Miyoki347/proposal-generator",
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
      "記事やコンテンツ制作は、下書き・媒体別の書き分け・画像用プロンプト作りなど工程が多く、手が止まりやすい。",
    solution:
      "媒体・文字数・参照テキストを指定して本文をストリーミング生成。画像生成用プロンプトの作成や履歴の保持もまとめて行える。",
    aiRole:
      "文章生成・画像プロンプト生成をAIが担当。トークン使用量も可視化して、コストを見ながら回せるようにした。",
    tech: ["React", "TypeScript", "Claude API（ストリーミング）"],
    result:
      "「続かない発信」を仕組みで支える方向の実装。後述のブログ自動化パイプラインの土台にもなっている。",
    links: { repo: "https://github.com/Miyoki347/writing-assistant" },
  },
  {
    slug: "miyoki-media-pipeline",
    title: "ブログ自動化パイプライン",
    category: "業務自動化 / コンテンツ",
    status: "開発中",
    summary:
      "キーワードから記事下書きまでを6ステップで生成。サイト別プロファイルで複数媒体に対応。",
    problem:
      "発信は続けるほど資産になるが、毎回ゼロから書くのは続かない。続けられる仕組みが要る。",
    solution:
      "キーワード→リサーチ→構成→下書き→レビュー→書き出しの6ステップを半自動化。サイトごとにトーン・キーワード・CTAを切り替えるプロファイルで、複数媒体に1ツールで対応する設計。",
    aiRole:
      "各ステップの生成をAIが担当。人は要所のレビューと公開判断だけに集中する（低負荷で継続）。",
    tech: ["React", "TypeScript", "Vite", "Cloudflare Functions", "Claude API"],
    result:
      "開発過程そのものが発信ネタになる連載型プロジェクト。継続を仕組みで解く実例。",
  },
  {
    slug: "teleapo-assistant",
    title: "テレアポ切り返しAIアシスタント",
    category: "現場業務 × AI",
    status: "デモ",
    summary:
      "断り文句を入力すると、顧客プロファイルに合わせた切り返しトークを即提示する。",
    problem:
      "テレアポは断られてからの一言が成果を分けるが、その場で最適な返しを出すのは難しく属人化する。",
    solution:
      "顧客プロファイル（年代・物件種別・エリア）を設定し、断り文句を入力すると、状況分析→切り返し例→ポイント→次の一手の4段で提案。会話履歴を保持して深掘りもできる。",
    aiRole:
      "切り返しの提案をAIが生成。現場で“使える形”に落とすUIに振った（現場業務×AIの実用デモ）。",
    tech: ["Next.js", "TypeScript", "Claude API"],
    result:
      "現場の定型対応をAIで支える実例。電話・SMS応対の自動化へ展開できる。",
    links: { repo: "https://github.com/Miyoki347/teleapo-demo" },
  },
  {
    slug: "numeric-counter",
    title: "数値分析カウンター",
    category: "アプリ開発（モバイル）",
    status: "公開中",
    summary:
      "日々の活動を“データ資産”に変えるカウンターアプリ。Webとして公開、Androidにも対応。",
    problem:
      "習慣や活動量を数えても、ただの数字で終わって振り返りに使えないことが多い。",
    solution:
      "階層構造のカウンター・再帰集計・グラフ可視化・目標モード・履歴メモを備えたアプリ。公開まで作り切り、モバイル（Capacitor）にも対応した。",
    aiRole:
      "AIと協調しながら高速に設計・実装・デバッグ（“作り切る力”の証明）。",
    tech: ["Vite", "React 19", "TypeScript", "Firebase", "Capacitor", "Recharts"],
    result:
      "企画から公開・モバイル対応まで一人で完遂。プロダクトを形にして出し切れることの証明。",
    links: { demo: "https://numerical-analysis-counter.web.app" },
  },
];

export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}
