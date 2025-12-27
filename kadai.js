const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let kpop_data = [
  { id:1, name:"TWICE", member:"ナヨン，ジョンヨン，モモ，サナ，ジヒョ，ミナ，ダヒョン，チェヨン，ツウィ", fanname:"ONCE", office:"JYP Entertainment", debut_date:"2015年10月20日", debut_song:"Like OOH-AHH"},
  { id:2, name:"BTS", member:"ナムジュン，ジン，ユンギ，ホソク，ジミン，テヒョン，ジョングク", fanname:"ARMY", office:"HYBE", debut_date:"2013年6月13日", debut_song:"No More Dream"},
  { id:3, name:"TREASURE", member:"ヒョンソク，ジフン，ヨシ，ジュンギュ，ジェヒョク，アサヒ，ドヨン，ハルト，ジョンウ，ジョンファン", fanname:"TREASURE Maker", office:"YG Entertainment", debut_date:"2020年8月7日", debut_song:"BOY"},
  { id:4, name:"&TEAM", member:"ウィジュ，ケイ，フウマ，ニコラス，ユウマ，ジョウ，ハルア，タキ，マキ", fanname:"LUNE", office:"HYBE", debut_date:"2022年12月7日", debut_song:"Under the skin"},
  { id:5, name:"BABYMONSTER", member:"ルカ，ファリタ，アヒョン，アサ，ラミ，ローラ，チキータ", fanname:"MONSTIEZ", office:"YG Entertainment", debut_date:"2023年11月27日", debut_song:"BATTER UP"},
  { id:6, name:"IZ*ONE", member:"ウンビ，サクラ，へウォン，イェナ，チェヨン，チェウォン，ミンジュ，ナコ，ヒトミ，ユリ，ユジン，ウォニョン", fanname:"WIZ*ONE", office:"OFF THE RECORD Entertainment", debut_date:"2018年10月29日", debut_song:"La Vie en Rose"},
  { id:7, name:"aespa", member:"カリナ，ジゼル，ウィンター，ニンニン", fanname:"MY", office:"SM Entertainment", debut_date:"2020年11月17日", debut_song:"Black Mamba"},
  { id:8, name:"NMIXX", member:"リリー，へウォン，ソリュン，ギュジン，ベイ，ジウ", fanname:"NSWER", office:"JYP Entertainment", debut_date:"2022年2月22日", debut_song:"O.O"},
  { id:9, name:"CORTIS", member:"マーテイン，ジェームス，ジュフン，ソンヒョン，ゴンホ", fanname:"COER", office:"HYBE", debut_date:"2025年8月18日", debut_song:"What You Want"},
  { id:10, name:"Stray Kids", member:"バンチャン，リノ，チャンビン，ヒョンジン，ハン，フィリックス，スンミン，アイエン", fanname:"STAY", office:"JYP Entertainment", debut_date:"2018年3月25日", debut_song:"District 9"},
  { id:11, name:"ITZY", member:"イェジ，リア，リュジン，チェリョン，ユナ", fanname:"MIDZY", office:"JYP Entertainment", debut_date:"2019年2月12日", debut_song:"DALLA DALLA"},
  { id:12, name:"ENHYPEN", member:"ジョンウォン，ヒスン，ジェイ，ジェイク，ソンフン，ソヌ，ニキ", fanname:"ENGENE", office:"HYBE", debut_date:"2020年11月30日", debut_song:"Given-Taken"},
  { id:13, name:"TOMORROW X TOGETHER", member:"スビン，ヨンジュン，ボムギュ，テヒョン，ヒュニンカイ", fanname:"MOA", office:"HYBE", debut_date:"2019年3月4日", debut_song:"CROWN"},
  { id:14, name:"(G)I-DLE", member:"ミヨン，ミンニ，ソヨン，ウギ，シュファ", fanname:"NEVERLAND", office:"Cube Entertainment", debut_date:"2018年5月2日", debut_song:"LATATA"},
  { id:15, name:"BOYNEXTDOOR", member:"ソンホ，リウ，ミョンジェヒョン，テサン，イハン，ウナク", fanname:"ONEDOOR", office:"HYBE", debut_date:"2023年5月30日", debut_song:"But I Like You"},
  { id:16, name:"VIVIZ", member: "ウナ，シンビ，オムジ", fanname: "Na.V", office: "BPM Entertainment", debut_date:"2022年2月9日", debut_song:"BOP BOP!"},
  { id:17, name:"Red Velvet", member:"アイリーン，スルギ，ウェンディ，ジョイ，イェリ", fanname:"Reveluv", office:"SM Entertainment", debut_date:"2014年8月1日", debut_song:"Happiness"},
  { id:18, name:"STAYC", member: "スミン，シウン，アイサ，セウン，ユン，ジェイ", fanname: "SWITH", office: "High Up Entertainment", debut_date:"2020年11月12日", debut_song:"SO BAD"},
  { id:19, name:"NCT 127", member: "テイル，ジャニー，テヨン，ユウタ，ドヨン，ジェヒョン，ジョンウ，マーク，ヘチャン", fanname: "NCTzen", office: "SM Entertainment", debut_date:"2016年7月7日", debut_song:"Fire Truck"},
  { id:20, name:"EXO", member: "シウミン，スホ，レイ，ベッキョン，チェン，チャニョル，ディオ，カイ，セフン", fanname: "EXO-L", office: "SM Entertainment", debut_date:"2012年4月8日", debut_song:"MAMA"},
  { id:21, name:"NewJeans", member:"ミンジ，ハニ，ダニエル，ヘリン，ヘイン", fanname:"Bunnies", office:"ADOR (HYBE)", debut_date:"2022年7月22日", debut_song:"Attention"},
  { id:22, name:"LE SSERAFIM", member:"チェウォン，サクラ，ユンジン，カズハ，ウンチェ", fanname:"FEARNOT", office:"SOURCE MUSIC (HYBE)", debut_date:"2022年5月2日", debut_song:"FEARLESS"},
  { id:23, name:"IVE", member:"ユジン，ガウル，レイ，ウォニョン，リズ，イソ", fanname:"DIVE", office:"Starship Entertainment", debut_date:"2021年12月1日", debut_song:"ELEVEN"},
  { id:24, name:"SEVENTEEN", member:"エスクプス，ジョンハン，ジョシュア，ジュン，ホシ，ウォヌ，ウジ，ディエイト，ミンギュ，ドギョム，スングァン，バーノン，ディノ", fanname:"CARAT", office:"PLEDIS Entertainment", debut_date:"2015年5月26日", debut_song:"Adore U"},
  { id:25, name:"BLACKPINK", member:"ジス，ジェニー，ロゼ，リサ", fanname:"BLINK", office:"YG Entertainment", debut_date:"2016年8月8日", debut_song:"BOOMBAYAH"},
  { id:26, name:"NCT DREAM", member:"マーク，ロンジュン，ジェノ，ヘチャン，ジェミン，チョンロ，チソン", fanname:"NCTzen", office:"SM Entertainment", debut_date:"2016年8月25日", debut_song:"Chewing Gum"},
  { id:27, name:"RIIZE", member:"ショウタロウ，ウンソク，ソンチャン，ウォンビン，スンハン，ソヒ，アントン", fanname:"BRIIZE", office:"SM Entertainment", debut_date:"2023年9月4日", debut_song:"Get A Guitar"},
  { id:28, name:"ZEROBASEONE", member:"ジウン，ジャン・ハオ，ハンビン，メテュ，テレ，リッキー，ギュビン，ゴヌク，ユジン", fanname:"ZEROSE", office:"WAKEONE", debut_date:"2023年7月10日", debut_song:"In Bloom"},
  { id:29, name:"Kep1er", member:"ユジン，シャオティン，マシロ，チェヒョン，ダヨン，ヒカル，ヒュニンバヒエ，ヨンウン，イェソ", fanname:"Kep1ian", office:"WAKEONE", debut_date:"2022年1月3日", debut_song:"WA DA DA"},
  { id:30, name:"ILLIT", member:"ユナ，ミンジュ，モカ，ウォニ，イロハ", fanname:"GLLIT", office:"BELIFT LAB (HYBE)", debut_date:"2024年3月25日", debut_song:"Magnetic"},
  { id:31, name:"TWS", member:"シニュ，ドフン，ヨンジェ，ハンジン，ジフン，ギョンミン", fanname:"42", office:"PLEDIS Entertainment", debut_date:"2024年1月22日", debut_song:"plot twist"},
  { id:32, name:"KISS OF LIFE", member:"ジュリー，ナッティ，ベル，ハヌル", fanname:"KISSY", office:"S2 Entertainment", debut_date:"2023年7月5日", debut_song:"Shhh"},
  { id:33, name:"SHINee", member:"オニュ，ジョンヒョン，キー，ミンホ，テミン", fanname:"SHINee WORLD", office:"SM Entertainment", debut_date:"2008年5月25日", debut_song:"Replay"},
  { id:34, name:"少女時代", member:"テヨン，サニー，ティファニー，ヒョヨン，ユリ，スヨン，ユナ，ソヒョン", fanname:"SONE", office:"SM Entertainment", debut_date:"2007年8月5日", debut_song:"Into The New World"},
  { id:35, name:"MAMAMOO", member:"ソラ，ムンビョル，フィイン，ファサ", fanname:"MOOMOO", office:"RBW", debut_date:"2014年6月18日", debut_song:"Mr. Ambiguous"},
  { id:36, name:"WayV", member:"クン，テン，ウィンウィン，シャオジュン，ヘンドリー，ヤンヤン", fanname:"WayZenNi", office:"SM Entertainment", debut_date:"2019年1月17日", debut_song:"The Vision"},
  { id:37, name:"XG", member:"ジュリン，チサ，ヒナタ，ハーヴィー，ジュリア，マヤ，ココナ", fanname:"ALPHAZ", office:"XGALX", debut_date:"2022年3月18日", debut_song:"Tippy Toes"},
  { id:38, name:"KARA", member:"ギュリ，スンヨン，ニコール，ハラ，ジヨン，ヨンジ", fanname:"Kamilia", office:"DSP Media", debut_date:"2007年3月29日", debut_song:"Break It"},
  { id:39, name:"OH MY GIRL", member:"ヒョジョン，ミミ，ユア，スンヒ，ユビン，アリン", fanname:"MIRACLE", office:"WM Entertainment", debut_date:"2015年4月21日", debut_song:"Cupid"},
  { id:40, name:"GFRIEND", member:"ソウォン，イェリン，ウナ，ユジュ，シンビ，オムジ", fanname:"BUDDY", office:"Source Music", debut_date:"2015年1月16日", debut_song:"Glass Bead"},
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
  const office = req.body.office;
  const debut_date = req.body.debut_date;
  const debut_song = req.body.debut_song;
  kpop_data.push( { id: id, name: name, member: member, fanname: fanname, office: office, debut_date: debut_date, debut_song: debut_song} );
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
  kpop_data[req.params.number].office = req.body.office;
  kpop_data[req.params.number].debut_date = req.body.debut_date;
  kpop_data[req.params.number].debut_song = req.body.debut_song;
  console.log( kpop_data );
  res.redirect('/k-pop' );
});

let kureyonn_data = [
  { id:1,  name:"野原 しんのすけ", join:"カスカベ防衛隊,野原家", age:"5歳", skill:"ケツだけ星人", like:"チョコビ，プリン"},
  { id:2,  name:"野原 みさえ", join:"野原家", age:"29歳", skill:"グリグリ攻撃", like:"お昼寝"},
  { id:3,  name:"野原 ひろし", join:"野原家", age:"35歳", skill:"足の臭さで攻撃", like:"ビール"},
  { id:4,  name:"野原 ひまわり", join:"野原家", age:"0歳", skill:"高速ハイハイ", like:"イケメン"},
  { id:5, name:"シロ", join:"野原家", age:"不明", skill:"わたあめ", like:"お散歩"},
  { id:6,  name:"桜田 ネネ", join:"カスカベ防衛隊", age:"5歳", skill:"うさぎの人形を殴る", like:"リアルおままごと"},
  { id:7,  name:"風間 トオル", join:"カスカベ防衛隊", age:"5歳", skill:"英語", like:"もえP"},
  { id:8,  name:"佐藤 マサオ", join:"カスカベ防衛隊", age:"5歳", skill:"漫画を描くこと", like:"おにぎり"},
  { id:9,  name:"ボーちゃん", join:"カスカベ防衛隊", age:"5歳", skill:"鼻水で色々な形を作れること", like:"石"},
  { id:10,  name:"酢乙女 あい", join:"カスカベ防衛隊,酢乙女家", age:"5歳", skill:"社交ダンス", like:"野原しんのすけ"},
  { id:11, name:"黒磯", join:"酢乙女家", age:"不明", skill:"ボディーガード", like:"酢乙女あい様"},
  { id:12,  name:"石坂 みどり", join:"ふたば幼稚園ひまわり組", age:"24歳", skill:"紙芝居・読み聞かせ", like:"子供たちと遊ぶこと"},
  { id:13, name:"松坂 梅", join:"ふたば幼稚園ばら組", age:"24歳", skill:"スキー", like:"ブランド品，合コン"},
  { id:14, name:"上尾 ますみ", join:"ふたば幼稚園さくら組", age:"23歳", skill:"プログラミング", like:"眼鏡を外した時の自分"},
  { id:15, name:"高倉 文太", join:"ふたば幼稚園園長", age:"48歳", skill:"子どもを泣かせる顔面力", like:"社会奉仕"},
  { id:16, name:"大原 ななこ", join:"カスカベ防衛隊", age:"20歳", skill:"しんのすけをなだめること", like:"お寿司"},
  { id:17, name:"ふかづめ竜子", join:"埼玉紅さそり隊", age:"17歳", skill:"喧嘩", like:"お笑い"},
  { id:18, name:"魚の目お銀", join:"埼玉紅さそり隊", age:"17歳", skill:"×印のマスク", like:"不明"},
  { id:19, name:"ふきでものマリー", join:"埼玉紅さそり隊", age:"17歳", skill:"怪力", like:"不明"},
  { id:20, name:"野原 銀の介", join:"野原家", age:"65歳", skill:"しんのすけと意気投合すること", like:"若いお姉さん"},
  { id:21, name:"野原 つる", join:"野原家", age:"62歳", skill:"ノリの良さ", like:"銀の介へのツッコミ"},
  { id:22, name:"野原 せまし", join:"野原家", age:"40歳", skill:"節約", like:"ヒッチハイク"},
  { id:23, name:"小山 よし江", join:"小山家", age:"58歳", skill:"しつけ", like:"書道"},
  { id:24, name:"小山 義治", join:"小山家", age:"63歳", skill:"真面目", like:"盆栽"},
  { id:25, name:"小山 真冴", join:"小山家", age:"35歳", skill:"変装", like:"独身生活"},
  { id:26, name:"鳩ヶ谷 ヨシりん", join:"野原家の隣人", age:"不明", skill:"お邪魔虫", like:"ミッチー"},
  { id:27, name:"鳩ヶ谷 ミッチー", join:"野原家の隣人", age:"不明", skill:"バカップル行動", like:"ヨシりん"},
  { id:28, name:"河村 やすお（チーター）", join:"ふたば幼稚園ばら組", age:"5歳", skill:"足が速い", like:"勝負事"},
  { id:29, name:"アクション仮面", join:"テレビ番組", age:"不明", skill:"アクションビーム", like:"正義"},
  { id:30, name:"ぶりぶりざえもん", join:"しんのすけの想像", age:"不明", skill:"救いのヒーロー", like:"千歳飴"},
  { id:31, name:"カンタム・ロボ", join:"テレビ番組", age:"不明", skill:"カンタムパンチ", like:"正義"}
  
];

// 一覧
app.get("/kureyonn", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('kureyonn', {data: kureyonn_data} );
});

// Create
app.get("/kureyonn/create", (req, res) => {
  res.redirect('/public/kureyonn.html');
});

// Read
app.get("/kureyonn/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = kureyonn_data[ number ];
  res.render('kureyonn_detail', {id: number, data: detail} );
});

// Delete
app.get("/kureyonn/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  kureyonn_data.splice( req.params.number, 1 );
  res.redirect('/kureyonn' );
});

// Create
app.post("/kureyonn", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = fannam.length + 1;
  const name = req.body.name;
  const age = req.body.age;
  const skill = req.body.skill;
  const like = req.body.like;
  const join = req.body.join;
  kureyonn_data.push( { id: id, name: name, age: age, skill: skill, like: like, join: join} );
  console.log( kureyonn_data );
  res.render('kureyonn', {data: kureyonn_data} );
});

// Edit
app.get("/kureyonn/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = kureyonn_data[ number ];
  res.render('kureyonn_edit', {id: number, data: detail} );
});

// Update
app.post("/kureyonn/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  kureyonn_data[req.params.number].id = req.body.id;
  kureyonn_data[req.params.number].name = req.body.name;
  kureyonn_data[req.params.number].age = req.body.age;
  kureyonn_data[req.params.number].skill = req.body.skill;
  kureyonn_data[req.params.number].like = req.body.like;
  kureyonn_data[req.params.number].join = req.body.join;
  console.log( kureyonn_data );
  res.redirect('/kureyonn' );
});

let krepe_data = [
  { id:1,  name:"スペシャルフルーツホイップカスタード", material:"クレープ生地,バナナ,イチゴ,マンゴー,キウイ,カスタード,ホイップ", allergy:"卵,乳,小麦,大豆,バナナ,キウイ", energy:542},
  { id:2,  name:"スペシャルフルーツホイップ", material:"クレープ生地,バナナ,イチゴ,マンゴー,キウイ,ホイップ", allergy:"卵,乳,小麦,大豆,バナナ,キウイ", energy:379},
  { id:3,  name:"イチゴマンゴーホイップカスタード", material:"クレープ生地,イチゴ,マンゴー,ホイップ,カスタード", allergy:"卵,乳,小麦,大豆", energy:509},
  { id:4,  name:"イチゴマンゴーホイップ", material:"クレープ生地,イチゴ,マンゴー,ホイップ", allergy:"卵,乳,小麦,大豆", energy:347},
  { id:5,  name:"バナナチョコブラウニーホイップ", material:"クレープ生地,バナナ,チョコソース,ブラウニー,ホイップ", allergy:"卵,乳,小麦,大豆,バナナ", energy:479},
  { id:6,  name:"イチゴチョコブラウニーホイップ", material:"クレープ生地,イチゴ,チョコソース,ブラウニー,ホイップ", allergy:"卵,乳,小麦,大豆", energy:461},
  { id:7,  name:"アーモンドチョコブラウニーホイップ", material:"クレープ生地,アーモンド,チョコソース,ブラウニー,ホイップ", allergy:"卵,乳,小麦,大豆,アーモンド", energy:473},
  { id:8,  name:"アーモンドキャラメルブラウニーホイップ", material:"クレープ生地,アーモンド,キャラメルソース,ブラウニー,ホイップ", allergy:"卵,乳,小麦,大豆,アーモンド", energy:473},
  { id:9,  name:"ミックスベリーチーズケーキホイップ", material:"クレープ生地,ミックスベリー,イチゴソース,チーズケーキ,ホイップ", allergy:"卵,乳,小麦,大豆", energy:413},
  { id:10,  name:"イチゴチーズケーキホイップ", material:"クレープ生地,イチゴ,チーズケーキ,ホイップ", allergy:"卵,乳,小麦,大豆", energy:416},
  { id:11,  name:"チョコチーズケーキホイップ", material:"クレープ生地,チョコソース,チーズケーキ,ホイップ", allergy:"卵,乳,小麦,大豆", energy:415},
  { id:12,  name:"キャラメルチーズケーキホイップ", material:"クレープ生地,キャラメルソース,チーズケーキ,ホイップ", allergy:"卵,乳,小麦,大豆", energy:416},
  { id:13,  name:"ポッピングバナナチョコホイップ", material:"クレープ生地,ポッピングチョコ,バナナ,チョコソース,ホイップ", allergy:"卵,乳,小麦,大豆,バナナ", energy:430},
  { id:14,  name:"ポッピングイチゴチョコホイップ", material:"クレープ生地,ポッピングチョコ,イチゴ,チョコソース,ホイップ", allergy:"卵,乳,小麦,大豆", energy:412},
  { id:15,  name:"ポッピングチョコホイップ", material:"クレープ生地,ポッピングチョコ,チョコソース,ホイップ", allergy:"卵,乳,小麦,大豆", energy:393},
  { id:16,  name:"イチゴバナナチョコホイップカスタード", material:"クレープ生地,イチゴ,バナナ,チョコソース,ホイップ,カスタード", allergy:"卵,乳,小麦,大豆,バナナ", energy:561},
  { id:17,  name:"イチゴバナナチョコホイップ", material:"クレープ生地,イチゴ,バナナ,チョコソース,ホイップ", allergy:"卵,乳,小麦,大豆,バナナ", energy:398},
  { id:18,  name:"イチゴバナナチョコカスタード", material:"クレープ生地,イチゴ,バナナ,チョコソース,カスタード", allergy:"卵,乳,小麦,大豆,バナナ", energy:450},
  { id:19,  name:"イチゴチョコホイップカスタード", material:"クレープ生地,イチゴ,チョコソース,ホイップ,カスタード", allergy:"卵,乳,小麦,大豆", energy:523},
  { id:20,  name:"イチゴキャラメルホイップカスタード", material:"クレープ生地,イチゴ,キャラメルソース,ホイップ,カスタード", allergy:"卵,乳,小麦,大豆", energy:524},
  { id:21,  name:"イチゴチョコホイップ", material:"クレープ生地,イチゴ,チョコソース,ホイップ", allergy:"卵,乳,小麦,大豆", energy:361},
  { id:22,  name:"イチゴキャラメルホイップ", material:"クレープ生地,イチゴ,キャラメルソース,ホイップ", allergy:"卵,乳,小麦,大豆", energy:361},
  { id:23,  name:"イチゴチョコカスタード", material:"クレープ生地,イチゴ,チョコソース,カスタード", allergy:"卵,乳,小麦,大豆", energy:413},
  { id:24,  name:"イチゴキャラメルカスタード", material:"クレープ生地,イチゴ,キャラメルソース,カスタード", allergy:"卵,乳,小麦,大豆", energy:413},
  { id:25,  name:"バナナチョコホイップカスタード", material:"クレープ生地,イチゴ,チョコソース,ホイップ,カスタード", allergy:"卵,乳,小麦,大豆,バナナ", energy:541},
  { id:26,  name:"バナナキャラメルホイップカスタード", material:"クレープ生地,バナナ,キャラメルソース,ホイップ,カスタード", allergy:"卵,乳,小麦,大豆,バナナ", energy:542},
  { id:27,  name:"バナナチョコホイップ", material:"クレープ生地,バナナ,チョコソース,ホイップ", allergy:"卵,乳,小麦,大豆,バナナ", energy:379},
  { id:28,  name:"バナナキャラメルホイップ", material:"クレープ生地,バナナ,キャラメルソース,ホイップ", allergy:"卵,乳,小麦,大豆,バナナ", energy:379},
  { id:29,  name:"バナナチョコカスタード", material:"クレープ生地,バナナ,チョコソース,カスタード", allergy:"卵,乳,小麦,大豆,バナナ", energy:431},
  { id:30,  name:"バナナキャラメルカスタード", material:"クレープ生地,バナナ,キャラメルソース,カスタード", allergy:"卵,乳,小麦,大豆,バナナ", energy:431},
  { id:31,  name:"ミックスベリーホイップカスタード", material:"クレープ生地,ミックスベリー,イチゴソース,ホイップ,カスタード", allergy:"卵,乳,小麦,大豆", energy:502},
  { id:32,  name:"ミックスベリーホイップ", material:"クレープ生地,ミックスベリー,イチゴソース,ホイップ", allergy:"卵,乳,小麦,大豆", energy:339},
  { id:33,  name:"ミックスベリーカスタード", material:"クレープ生地,ミックスベリー,イチゴソース,カスタード", allergy:"卵,乳,小麦,大豆", energy:391},
  { id:34,  name:"ザクザクバナナチョコホイップ", material:"クレープ生地,オレオ,バナナ,チョコソース,ホイップ", allergy:"卵,乳,小麦,大豆,バナナ", energy:426},
  { id:35,  name:"ザクザクイチゴチョコホイップ", material:"クレープ生地,オレオ,イチゴ,チョコソース,ホイップ", allergy:"卵,乳,小麦,大豆", energy:408},
  { id:36,  name:"ザクザクチョコホイップ", material:"クレープ生地,オレオ,チョコソース,ホイップ", allergy:"卵,乳,小麦,大豆", energy:389},
  { id:37,  name:"イチゴマシュマロチョコホイップ", material:"クレープ生地,イチゴ,マシュマロ,レインボースプレー,チョコソース,ホイップ", allergy:"卵,乳,小麦,大豆,ゼラチン", energy:381},
  { id:38,  name:"バナナマシュマロチョコホイップ", material:"クレープ生地,バナナ,マシュマロ,レインボースプレー,チョコソース,ホイップ", allergy:"卵,乳,小麦,大豆,バナナ,ゼラチン", energy:399},
  { id:39,  name:"マシュマロチョコホイップ", material:"クレープ生地,マシュマロ,レインボースプレー,チョコソース,ホイップ", allergy:"卵,乳,小麦,大豆,ゼラチン", energy:361},
  { id:40,  name:"チョコホイップカスタード", material:"クレープ生地,チョコソース,ホイップ,カスタード", allergy:"卵,乳,小麦,大豆", energy:504},
  { id:41,  name:"アーモンドチョコホイップ", material:"クレープ生地,アーモンド,チョコソース,ホイップ", allergy:"卵,乳,小麦,大豆,アーモンド", energy:373},
  { id:42,  name:"チョコホイップ", material:"クレープ生地,チョコソース,ホイップ", allergy:"卵,乳,小麦,大豆", energy:342},
  { id:43,  name:"チョコカスタード", material:"クレープ生地,チョコソース,カスタード", allergy:"卵,乳,小麦,大豆", energy:394},
  { id:44,  name:"キャラメルホイップカスタード", material:"クレープ生地,キャラメルソース,ホイップ,カスタード", allergy:"卵,乳,小麦,大豆", energy:504},
  { id:45,  name:"アーモンドキャラメルホイップ", material:"クレープ生地,アーモンド,キャラメルソース,ホイップ", allergy:"卵,乳,小麦,大豆,アーモンド", energy:373},
  { id:46,  name:"キャラメルホイップ", material:"クレープ生地,キャラメルソース,ホイップ", allergy:"卵,乳,小麦,大豆", energy:342},
  { id:47,  name:"キャラメルカスタード", material:"クレープ生地,キャラメルソース,カスタード", allergy:"卵,乳,小麦,大豆", energy:394},

  
  
];

// 一覧
app.get("/krepe", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('krepe', {data: krepe_data} );
});

// Create
app.get("/krepe/create", (req, res) => {
  res.redirect('/public/kadai.html');
});

// Read
app.get("/krepe/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = krepe_data[ number ];
  res.render('krepe_detail', {id: number, data: detail} );
});

// Delete
app.get("/krepe/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  krepe_data.splice( req.params.number, 1 );
  res.redirect('/krepe' );
});

// Create
app.post("/krepe", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = fannam.length + 1;
  const name = req.body.name;
  const material = req.body.material;
  const allergy = req.body.allergy;
  const energy = req.body.energy;
  krepe_data.push( { id: id, name: name, material: material, allergy: allergy, energy: energy} );
  console.log( krepe_data );
  res.render('krepe', {data: krepe_data} );
});

// Edit
app.get("/krepe/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = krepe_data[ number ];
  res.render('krepe_edit', {id: number, data: detail} );
});

// Update
app.post("/krepe/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  krepe_data[req.params.number].id = req.body.id;
  krepe_data[req.params.number].name = req.body.name;
  krepe_data[req.params.number].material = req.body.material;
  krepe_data[req.params.number].allergy = req.body.allergy;
  krepe_data[req.params.number].energy = req.body.energy;
  console.log( krepe_data );
  res.redirect('/krepe' );
});




app.listen(8080, () => console.log("Example app listening on port 8080!"));
