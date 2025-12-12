## k-popアイドルの情報を配列として定義する．k-popアイドルのグループ名がランディングページに表示される．
### k-pop_dateの構造
*機能
　*アイドルの情報を保持
*構造
　*id : number
　*name : string (グループ名 例 : twice)
　*music : string (代表曲 例 : TT)
　*menber : string (メンバー 例 : ナヨン)
### ページ遷移
目的 | リソース名 | HTTPメソッド | 遷移先 |
-|-|-|-|
一覧表示 | /k-pop | GET | k-pop.ejs
追加フォーム | /k-pop/create | GET | /public/k-pop.html
詳細表示 | /k-pop/:number | GET | k-pop.ejs
追加 | /k-pop | POST | /k-pop
編集画面 | /k-pop/edit/:number | GET | k-pop.ejs
更新 | /k-pop/update/:number | POST | /k-pop
削除 | /k-pop/delete/:number | GET | /k-pop
