var express = require('express');
var app3 = express();

var port = process.eventNames.PORT || 3000;

app3.set('./assets', express.static(__dirname + '/public'));
app3.set('view engine','ejs');


app3.get('/', function(req, res){
   
    res.render('index', {});

});
app3.get('/http.createServer', function(req, res, next){
    console.log('./index' + req.url);
    next();
});

app3.get('/Ashe', function(req, res){
    var miniBio = [{name: "Ashley", Age: "24", Like: "sleep"}];
    res.render('info.ejs', {Person: miniBio});

});

app3.get('/Pet', function(req, res){
    var miniBio = [{name: "Harley", Age: "5", Like: "Bones"}];
    res.render('info.ejs', {Person: miniBio});

});

app3.get('/Pet2', function(req, res){
    var miniBio = [{name: "Darly", Age: "5", Like: "toy carrots"}];
    res.render('info.ejs', {Person: miniBio});

});

app3.get('person/:id', function(req, res){
    var person1 = [{name: "", Age: "", Like: ""}];
    res.render('person',{ ID: req.param.id});
});

app3.get('/api', function(req,res){
    res.json({firstname: 'John', lastname: 'Doe'});
});

app3.listen(3000, function(){
    console.log("listening on port 3000");
});