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

## 2026-07-08（未commit分の発見・記録のみ）

- `src/components/ContactForm.tsx`に**ハニーポット欄**（`_hp`という人間には見えない入力欄。ボットが埋めたら送信側で無視する想定のスパム対策）が追加された状態で未commitのまま残っていた。
- `src/app/sitemap.ts`の`staticPaths`に`/contact`を追加（既存の問い合わせフォーム新設ぶんの追随、`/about`と`/privacy`の間に追加）。
- いずれもいつのセッションで追加されたか本セッションでは特定できず。実装自体は完結して見える（フォーム送信時に`_hp`を含めて送信・非表示スタイル付与済み／sitemapへの`/contact`追加もシンプルな1行差分）。直近のcommit履歴（`feat: 受託問い合わせフォーム新設（F-1・mailto脱却）`）の続きの調整と推測される。
- 本セッションはNompass監査対応中のため、commitの要否はユーザー確認後に判断する。

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

## 2026-07-07（F-1: 受託問い合わせフォーム新設＝mailto脱却・測定の器）

- **背景**：監査フェーズF/Gで「Miyoki個人受託の入口がmailto依存＝ファネルが見えず需要を測れない」と判明（F-1）。SNS bioを miyoki-labs.com に更新（G-2・ハブ流入を開通）した直後なので、受け皿を先に用意するのが順序。
- **実装**：静的export（`output:export`）＝Next API不可のため **Cloudflare Pages Functions** で構築。①`functions/api/contact.ts`（検証+HTMLエスケープ+Turnstile任意+Resend送信・**キー未設定でも壊れないgraceful**）②`src/components/ContactForm.tsx`（name/email/message＋Turnstileウィジェット任意）③`src/app/contact/page.tsx` ④home/aboutの主要CTAを mailto → `/contact` へ（末尾の直メールCTAは代替として残置）。client-Nompass-hpのContactForm/route.tsのロジックを流用。
- **検証**：`npx tsc --noEmit` 0・`npx next build` EXIT 0（`/contact`静的生成）。
- **残（ユーザー側・🖥️週末）**：①Cloudflare Turnstileウィジェット作成→`NEXT_PUBLIC_TURNSTILE_SITE_KEY`(ビルド時)＋`TURNSTILE_SECRET_KEY`(CF env) ②`RESEND_API_KEY`＋送信元(`CONTACT_FROM_EMAIL`=検証済みドメイン、未設定なら onboarding@resend.dev)＋`CONTACT_TO_EMAIL` ③`npm run deploy`。キー未投入でもフォームは表示され、送信時のみ「送信設定未完了」を返す（本番事故なし）。
- **教訓**：需要検証フェーズでは「作る前に測る器」を先に置く。mailtoはファネルが見えない＝改善もできない。フォーム化は"作る"でなく"確かめる"инфраだった。

## 2026-07-07（F-1追補: 相談CTAの取りこぼし修正＝ヘッダー/モバイル固定/実績詳細）

- **発覚**：本番で「相談する」（ヘッダーnav）を押しても無反応、とユーザー報告＋ステータスバーに `mailto:` 表示。前回のF-1で `/contact` に変えたのは hero と about だけで、**共有レイアウトの Header.tsx・MobileFixedCTA.tsx・works/[slug] のCTAがmailtoのまま残っていた**（mailtoはメールクライアント未設定のPCで「押しても何も起きない」）。
- **修正**：3箇所の `<a href=mailto>` → `<Link href="/contact">`。MobileFixedCTAはLink import追加＋未使用site除去、works/[slug]も未使用site import除去。tsc0・next build0。
- **教訓**：CTA/導線を差し替えるときは、ページ本文だけでなく**共有レイアウト（Header/Footer/固定CTA）を必ずgrepで洗う**。`grep -rn "mailto:|相談する"` で全網羅してから変える。末尾の「メール直リンク」表示（page.tsx末尾・Footer）は意図的にmailto据え置き＝直メール派の受け皿。

## 2026-07-07（F-1追補2: 個人Gmailを全撤去＋残りmailto CTAを/contactへ・リンク監査）

- **要望**：公開サイト/コードから個人Gmail(miyoki.43834@gmail.com)の記載を一切控えたい。
- **対応**：①`functions/api/contact.ts` から受信先のハードコードを撤去し、非公開env `CONTACT_TO_EMAIL` を必須化（未設定なら送信不可） ②`ContactForm`のdone/フォールバック文からメール表示を削除 ③home末尾CTA・Footer・privacyの mailto+メール表示を `/contact` リンクへ ④`JsonLd`のemail削除 ⑤`site.ts`から`email`フィールド削除。→ `grep site.email`=0・`grep miyoki.43834`=0。未使用になった`site` importも各所除去。tsc0・build0。
- **リンク監査（"他に機能不全がないか"）**：全hrefを洗い、内部ルート(/works /contact /privacy /links と動的/works/[slug])は全て実在＝壊れリンクなし。問題は「mailtoはPCでメール未設定だと無反応」の1類型のみで、全CTAを`/contact`へ寄せて解消。直メール表示は撤去（Gmail非公開のため）。
- **教訓**：導線差し替えは共有レイアウト(Header/Footer/MobileFixedCTA)＋JsonLd＋data(site.ts)まで含めて`grep`で全網羅。個人アドレスは「表示」だけでなく「コード/データ/構造化データ」からも消す。受信先は非公開envに寄せる。

## 2026-07-07（表示崩れ修正: モバイルヘッダーをハンバーガー化）

- **発覚**：スマホでヘッダーが崩れる（ロゴ＋「←トップ」＋実績＋プロフィール＋リンク集が横並びで画面幅超過→重なり・はみ出し）。サブページでは「←トップ」も出て更に溢れていた。
- **原因**：ナビがモバイルで折り畳まれず、全項目を横並び表示していた（レスポンシブ未対応）。
- **修正**：`Header.tsx` を、sm以上=従来の横並びナビ／sm未満=ロゴ＋ハンバーガー(Menu/X)ボタン→展開メニュー、に分離。ロゴに`min-w-0`+`truncate`+`flex-shrink-0`で潰れ防止。tsc0・build0。
- **教訓**：ナビ項目が増えたら（相談CTA追加等）モバイル幅の破綻を必ず実機幅で確認。折り畳み（ハンバーガー）が基本。

## 2026-07-07（F-1稼働完了: 原因はRESENDキーの空登録＋件名調整）

- **決着**：/contact フォームが送信成功しGmail受信を確認。**原因＝`RESEND_API_KEY`の値が空だった**（`wrangler pages secret put`を`!`セッションで実行した際、対話入力に値が入らず名前だけ登録＝`env.RESEND_API_KEY`が空文字→診断で R=0）。既存キーは値を再表示できない仕様なので、**Resendで新規APIキーを作成→CFダッシュボードのVariables and secretsからRotateで貼付**して解消。`CONTACT_TO_EMAIL`はType=Textで値を可視化して確実に投入。
- **切り分けの効き**：エラー文に一時診断 `R/T`（envの有無・値は出さない）を仕込んだのが決定打。R=0=空/未バインド、R=1=値はあるが送信失敗、を即判別できた。wrangler.tomlの除去（next-on-pages残骸）も実施したが今回の主因ではなかった（=クリーンアップとして有効）。
- **仕上げ**：件名を `【ポートフォリオ】お問い合わせ：<名>` → `【お問い合わせ】<名> 様`（受信側で意味不明な"ポートフォリオ"を除去＋様付け）。一時診断コードを撤去。
- **教訓**：①`wrangler pages secret put`の対話入力は値が入ったか要確認（空でも"Success"が出る）。非機密値はType=Textで可視化して入れると事故らない。②静的export+CF Pages Functionsのenvは「本番/プレビュー」「secret空」「wrangler.toml優先」の3罠。詰まったらFunctionに"envの有無だけ"返す一時診断を入れて切り分けるのが最速。

## 2026-07-08（公開前チェック棚卸し：Honeypot追加・README実態反映・sitemap補完）

- **背景**：ポートフォリオ構築の次の一手を検討する中で、Nompass buildの`docs/04_launch.md`（公開前チェックリスト）基準で全体を棚卸し。フォーム・OGP・構造化データ・404・フェイルセーフは既に揃っていたが、フォーム標準4点セット（validation/HTMLエスケープ/Honeypot/Turnstile）のうちHoneypotだけ未実装と判明。
- **対応**：①`ContactForm.tsx`に隠しHoneypotフィールド（`_hp`、`absolute left-[-9999px]`+`aria-hidden`）を追加、送信データに含める ②`functions/api/contact.ts`で`_hp`が埋まっていたら`{ok:true}`を返して黙って無視（ボットに気づかせない） ③`sitemap.ts`に`/contact`を追加（未掲載だった） ④`README.md`の「公開前チェック」「未実装」欄を実態に更新（問い合わせフォームは07-07に稼働済みなのに「未実装」表記のまま放置されていた＝ドキュメント腐敗）。
- **検証**：`npx tsc --noEmit` exit 0。🖥️**要デプロイ**（`npm run deploy`）で本番反映。
- **残**：README公開前チェックに🖥️週末PC項目として明記（Lighthouse/3幅実機確認・GSC/Bing登録）。`works.ts`のmiyoki-media-pipelineにrepo/demoリンクが無い（非公開ツールなら対応不要）。
- **教訓**：READMEの「未実装」欄はknowledge-logより更新頻度が低く、実装が進んでも放置されがち。機能追加時はREADMEも同じセッションで見直す。

## 2026-07-08（GSC/Bing登録状況の確定＝README訂正）

- **経緯**：公開前チェックでGSC/Bingを一括りに「未登録の可能性」と誤って書いていた。ユーザーから正確な状況を確認：
  - **GSC＝完了**：OAuth設定→`個人\seo-insights\gsc-report.mjs`で取得→Windowsタスクスケジューラで毎週金曜22:30に自動実行、稼働確認済み。
  - **Bing＝部分完了で止まっている**：Bing Webmaster Toolsでサイト検証・サイトマップ送信は手動実施済み。ただし①インデックス完了確認はその後未実施（サイトマップが「Processing」だった時点から進捗未確認）②Bing Webmaster APIキーは保管済みだが、GSC同様の自動取得スクリプトは作っていない（作る予定もなし＝GSCの自動化で十分と判断）。
- **対応**：README公開前チェックの当該行をGSC/Bing別立てに訂正し、上記の正確な状態を反映。
- **教訓**：「証跡が見当たらない」＝「未実施」と決めつけない。手動作業はリポジトリ検索に残らないので、判断が割れる項目は本人に直接状態を確認する。

## 2026-07-08（Bing Webmaster自動化を実装・稼働確認完了＝GSC/Bing対応完結）

- **実装箇所**：`個人\seo-insights\gsc-report.mjs`（miyoki-portfolioとは別プロジェクトだが、同じSEOレポート運用の一部としてここに記録）。
- **背景**：GSCは自動レポート化済みだったが、Bingは未実装（スクリプト冒頭コメントに「あればBing」と当初から想定はされていた）。ユーザーが「自動化はどちらもやりたい」「Bingもすぐ終わるなら」と希望。
- **実装**：Bing Webmaster API（[GetQueryStats](https://bing-webmaster-api.analyticsedge.com/getquerystats/)/[GetPageStats](https://bing-webmaster-api.analyticsedge.com/getpagestats/)、エンドポイント`https://ssl.bing.com/webmaster/api.svc/json/{Method}?siteUrl=...&apikey=...`）を追加。BingはGSCと違い日付範囲指定不可・週次バケットで全期間返るため、`parseMsDate`でMicrosoft JSON日付を解析し直近28日分だけ自前集計（`aggregateBingRows`）してGSCと同じ形（keys/impressions/clicks/ctr/position）に揃え、既存の`findLowCtrHighImpression`/`findPageTwoThree`/`rowsToTable`をそのまま再利用。`.env.example`に`BING_API_KEY`/`BING_SITE_URL`追加。Windowsタスクスケジューラの変更は不要（既存の週次実行にそのまま乗る）。
- **検証**：APIキー未設定時→Bingセクションを黙ってスキップし本体（GSC分）は正常動作を確認。ユーザーがAPIキーを`.env`に投入後→実際にBing APIへの通信が成功しレポート生成を確認（データ自体は「該当なし」＝新規ドメインでまだ実績が無いだけで想定通り）。
- **副産物（Bing Webmaster Tools画面調査）**：①Sitemaps画面でサイトマップStatus=Success・12件検出を確認 ②URL Inspectionでトップページ=Indexed successfullyを確認 ③「alt属性が1箇所missing」という指摘は`src/app/page.tsx`のヒーロー背景ロゴ（装飾目的の`alt=""`）で、Bingの自動チェックが装飾画像と内容画像を区別できていないだけの誤検知と判断（対応不要。無理に文言を入れるとスクリーンリーダーが不要な読み上げをしてしまい逆に悪化する）。
- **教訓**：①外部APIを新規に組み込むときは記憶に頼らずWeb検索で正確な仕様（特にレスポンス形式・粒度）を確認してから実装する。②自動SEOチェッカーの指摘は鵜呑みにせず、意図的な実装（装飾画像の空alt等）かどうかを先に見極める。

## 2026-07-08（`/works`が「Discovered but not crawled」＝新規ドメインの正常な遅延と切り分け）

- **発覚**：Bing URL Inspectionで`/works`が「Discovered but not crawled」「URL cannot appear on Bing」の赤表示。文言が強く問題に見えた。
- **切り分け**：Bingbot UAを偽装してcurlで直接アクセスし、通常UAと比較。両方ともstatus 200・同一内容・`noindex`ヘッダーもメタタグもなし・`robots.txt`も許可済みと確認。技術的なブロック要因は無し。
- **結論**：ドメイン取得・公開から日が浅い（発見日=07 Jul 2026＝前日）ため、単にBingのクロール優先度がまだ回ってきていないだけ（新規ドメインでは数日〜数週間かかるのが通常）。「issues preventing indexation」という文言は定型表示で、実害を示すものではない。
- **対応**：ユーザーが優先ページ（`/works`・`/works/nompass`・`/works/accounting-tax-rag`・`/about`）すべてで「Request indexing」を実施済み。以降は自然にクロールされるのを待つのみ。
- **教訓**：Bing/GSCの警告文言は強めに出ることがあるが、curlでUAを偽装して直接叩けば「本当にブロックされているか」「単に未クロールなだけか」を数秒で切り分けられる。新規ドメインでは"discovered/未crawl"は異常ではなくデフォルトの通過点。
