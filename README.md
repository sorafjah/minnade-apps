# 配布サイト「みんなで答える授業アプリ」の管理メモ

GitHub Pages に置く、GASアプリの配布・説明サイトです。このファイルはサイトには表示されません（置いておいても、消してもかまいません）。

## フォルダのしくみ
```
index.html          トップ（アプリの一覧は assets/apps.js から自動で作る）
hajimete.html       はじめての方へ
secchi.html         設置の手順（全アプリ共通）
tsumazuki.html      うまくいかないとき
riyou.html          利用について
apps/○○.html        アプリごとのページ
code/○○/Code.gs.txt       アプリのコード（ページのコピーボタンがここを読む）
code/○○/index.html.txt
assets/site.css     色・文字（全ページ共通）
assets/site.js      サイト名・ヘッダー・フッター・コピーボタン（全ページ共通）
assets/apps.js      アプリの一覧
```

## サイト名を変える
`assets/site.js` の上のほうの `SITE` の2行（name と sub）を書きかえる。全ページに反映されます。

## GitHub Pages に置く
1. GitHub で新しいリポジトリを作る（名前は minnade-apps）。Public にする
2. ZIPを開いてできた site フォルダの**中に入っているもの全部**（HTML5つと、assets・apps・code の3フォルダ）を選び、「Add file」→「Upload files」の画面にドラッグして「Commit changes」。site フォルダそのものや、ZIPのままは上げない
3. 「Settings」→「Pages」→ Source を「Deploy from a branch」、Branch を「main」「/(root)」にして「Save」
4. 数分で `https://（ユーザー名）.github.io/minnade-apps/` で開けるようになる
5. iroiroai には、このURLへのリンクを1つ載せる

## コードを新しくする（アプリを直したとき）
`code/○○/Code.gs.txt` と `code/○○/index.html.txt` を、新しいものに上書きアップロードするだけ。ページは自動で新しいコードを表示します。
（GAS の Code.gs・index.html と中身は同じです。拡張子を .txt にしているのは、ブラウザで文字として確実に読みこむため）

## アプリを足す
1. `assets/apps.js` に1つ足す（id、name、desc、tags、ready）
2. `apps/（id）.html` を、ほかのアプリのページをコピーして作る（項目の型をそろえる）
3. `code/（id）/` に `Code.gs.txt` と `index.html.txt` を置く
4. 準備ができたら apps.js の `ready` を `true` にする（false のあいだは「準備中」と出て、押せません）

## アプリのページの型（そろえておくと、あとで足しやすい）
1. 何ができるか
2. 設置する（コードの箱、できるタブ、名簿などの作り方）
3. 先生の使いかた
4. 生徒の使いかた
5. 中身の作り方（問題・カード・質問を自分で作るアプリ）／レベルの決め方（ドリル）
6. 記録
7. よくある質問

## メモ
- パソコンに保存した HTML を直接開くと、コードの箱は読みこめません（ブラウザの安全のしくみ）。GitHub Pages のURLから開けば読みこめます
- アクセス解析は入れていません。入れる場合は「利用について」の該当の行を直してください
- 写真は載せない方針。ボタン名を「」でそのまま書いて説明する
