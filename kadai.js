const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let station2 = [
  { id:1,  name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2,  name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3,  name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4,  name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5,  name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6,  name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7,  name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

// 一覧
app.get("/k-pop", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('k-pop', {data: station2} );
});

// Create
app.get("/k-pop/create", (req, res) => {
  res.redirect('/public/kadai.html');
});

// Read
app.get("/k-pop/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('k-pop_detail', {id: number, data: detail} );
});

// Delete
app.get("/k-pop/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice( req.params.number, 1 );
  res.redirect('/k-pop' );
});

// Create
app.post("/k-pop", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push( { id: id, code: code, name: name, change: change, passengers: passengers, distance: distance } );
  console.log( station2 );
  res.render('k-pop', {data: station2} );
});

// Edit
app.get("/k-pop/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('k-pop_edit', {id: number, data: detail} );
});

// Update
app.post("/k-pop/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log( station2 );
  res.redirect('/k-pop' );
});



const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));



app.listen(8080, () => console.log("Example app listening on port 8080!"));
