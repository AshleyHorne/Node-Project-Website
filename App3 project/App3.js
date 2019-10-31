var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser =  require('body-parser');
console.log(bodyParser);
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
var mysql =  require('mysql');

var port = process.eventNames.PORT || 2000;
//app.use(bodyParser.urlencoded({extended:true}));

app.use('./assets', express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine','ejs');




var str = JSON.parse(fs.readFileSync('./familyInfo.json', 'utf8'));


app.get('/', function(request, response){
   response.render("index");

});
//app.get('/http.createServer', function(req, res, next){
 //console.log('./index' + req.url);
   // next();
//});


app.get('/detail', function(request,response) {
    response.render("detail", {str: str});
});

app.get('/players', function(request,response) {
    response.render("players", {str: str});
});

app.post('/players.', function (request, response){
  p.choice = request.body.p_choice;
  response('players + p.choice');
});

app.get('/players/:p_choice', function(request,response) {
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

  var qury = `INSERT INTO contact (first, lastname) VALUES ("${request.body.first}", "${request.body.lastname}")`;
  con.query(qury, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  
});



//con.query('SELECT, contact, first');
//function (err, row){
  //if(err){
    //res.status(500);
    //res.render('error', 'failed to add item in table');
    //throw.err
  //}
  //console.log(rows[0].first);
  
//}

//if(req.body.first_name === ""|| !req.body.first_name || !req.body.last_name || req.body.comment === ""
//res.status(500);
//res.render('error', 'form info is missing, submit first_name, and comment');
//}

//app.get('/Ashe', function(req, res){
  //  var miniBio = [{name: "Ashley", Age: "24", Like: "sleep"}];
    //res.render('info.ejs', {Person: miniBio});

//});

//app.get('/Pet', function(req, res){
  //  var miniBio = [{name: "Harley", Age: "5", Like: "Bones"}];
    //res.render('info.ejs', {Person: miniBio});

//});

//app.get('/Pet2', function(req, res){
  //  var miniBio = [{name: "Darly", Age: "5", Like: "toy carrots"}];
    //res.render('info.ejs', {Person: miniBio});

//});

//app.get('person/:id', function(req, res){
  //  var person1 = [{name: "", Age: "", Like: ""}];
    //res.render('person',{ ID: req.param.id});
//});

//app.get('/api', function(req,res){
  //  res.json({firstname: 'John', lastname: 'Doe'});
//});




app.listen(2000, function(){
    console.log("listening on port 2000");
});