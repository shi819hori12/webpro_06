const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let kpop_data = [
  { id:1,  name:"TWICE", member:"ナヨン，ジョンヨン，モモ，サナ，ジヒョ，ミナ，ダヒョン，チェヨン，ツウィ", fanname:"ONCE"},
  { id:2,  name:"BTS", member:"ナムジュン，ジン，ユンギ，ホソク，ジミン，テヒョン，ジョングク", fanname:"ARMY"},
  { id:3,  name:"TREASURE", member:"ヒョンソク，ジフン，ヨシ，ジュンギュ，ジェヒョク，アサヒ，ドヨン，ハルト，ジョンウ，ジョンファン", fanname:"TREASURE Maker"},
  { id:4,  name:"&TEAM", member:"ウィジュ，ケイ，フウマ，ニコラス，ユウマ，ジョウ，ハルア，タキ，マキ", fanname:"LUNE"},
  { id:5,  name:"BABYMONSTER", member:"ルカ，ファリタ，アヒョン，アサ，ラミ，ローラ，チキータ", fanname:"MONSTIEZ"},
  { id:6,  name:"IZ*ONE", member:"ウンビ，サクラ，へウォン，イェナ，チェヨン，チェウォン，ミンジュ，ナコ，ヒトミ，ユリ，ユジン，ウォニョン", fanname:"WIZ*ONE"},
  { id:7,  name:"NMIXX", member:"リリー，へウォン，ソリュン，ギュジン，ベイ，ジウ", fanname:"NSWER"},
];

// 一覧
app.get("/k-pop", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('k-pop', {data: kpop_data} );
});

// Create
app.get("/k-pop/create", (req, res) => {
  res.redirect('/public/kadai.html');
});

// Read
app.get("/k-pop/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = kpop_data[ number ];
  res.render('k-pop_detail', {id: number, data: detail} );
});

// Delete
app.get("/k-pop/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  kpop_data.splice( req.params.number, 1 );
  res.redirect('/k-pop' );
});

// Create
app.post("/k-pop", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = fannam.length + 1;
  const name = req.body.name;
  const member = req.body.member;
  const fanname = req.body.fanname;
  kpop_data.push( { id: id, name: name, member: member, fanname: fanname} );
  console.log( kpop_data );
  res.render('k-pop', {data: kpop_data} );
});

// Edit
app.get("/k-pop/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = kpop_data[ number ];
  res.render('k-pop_edit', {id: number, data: detail} );
});

// Update
app.post("/k-pop/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  kpop_data[req.params.number].id = req.body.id;
  kpop_data[req.params.number].name = req.body.name;
  kpop_data[req.params.number].member = req.body.member;
  kpop_data[req.params.number].fanname = req.body.fanname;
  console.log( kpop_data );
  res.redirect('/k-pop' );
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));
