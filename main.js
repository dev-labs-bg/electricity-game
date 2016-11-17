var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/app/index.html');
});

app.listen(3000, function () {
  console.log('electricity-game listening on port 3000!');
});