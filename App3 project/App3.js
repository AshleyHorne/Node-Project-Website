var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser =  require('body-parser');
console.log(bodyParser);
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
var mysql =  require('mysql');


var port = process.eventNames.PORT || 2000;
app.use(bodyParser.urlencoded({extended:true}));

app.use('../App3 project/Public/stylesheet.css', express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

var str = JSON.parse(fs.readFileSync('./familyInfo.json', 'utf8'));


app.get('/', function(request, response){
   response.render("index");

});


app.get('/detail', function(request,response) {
    response.render("detail", {str: str});
});

app.get('/players', function(request,response) {
    response.render("players", {str: str});
});

app.post('/players', function (request, response){
 console.log(request.body.p_choice);
 p_choice = request.body.p_choice;
  response.redirect('players/' + p_choice);
});

app.get('/players/:p_choice', function(request,response) {
  var p_choice = request.params.p_choice;
  console.log(p_choice);
  response.render('familyEntry', {p_choice: p_choice, str: str});
});

app.post('/players/:p_choice', function(request,response) {
  var p_choice = request.params.p_choice;
  console.log(p_choice);
  response.render('familyEntry', {p_choice: p_choice, str: str});
});

app.get('/form', function(request,response) {
  response.render("form");
});

app.post('/form', urlencodedParser, function(request,response) {
  response.send("Submission has been accepted");
  // console.log(request.body.name);
  // console.log(request.body.email);
  // console.log(request.body.comment);

  
  var con = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:'root',
    database: "sys"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  var qury =`INSERT INTO contact (first, lastname, email) VALUES ("${request.body.first}", "${request.body.lastname}", "${request.body.email})`;
  con.query(qury, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

});


app.get('/GuestBook', function(request,response) {

  var secon = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:'root',
    database: "sys"
  });
  
  secon.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  var qury_two = `SELECT * FROM contact`;
  secon.query(qury_two, function (err, result) {
    if (err) throw err;
      console.log(result);
      response.render("GuestBook",{list: result});

     
  });

  
});



  
 





app.listen(2000, function(){
    console.log("listening on port 2000");
});