var express = require('express')
var bodyparser=require('body-parser')// to recieve data
var mongoose = require('mongoose')
mongoose.connect('mongodb://rohit09:rohit09121996@ds223509.mlab.com:23509/rohit')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {         
      console.log("Connected To MongoLab Cloud Database :p");
}); 

var urlSchema = mongoose.Schema({
    url: String,
    key: String
});
var Url = mongoose.model('Url', urlSchema);
var app = express();
app.use(bodyparser.urlencoded({extended: false }))
app.use(bodyparser.json())

app.get('/',function(req,res){
	res.sendfile('./myhtmlpage.html');
})
app.post('/short',function(req, res){
	var user_url=req.body.url;
	var user_key=req.body.key;
	var newUrl = new Url({ url: user_url,key: user_key});

newUrl.save(function (err, data) {
  if (err) return console.error(err);
  console.log("Short Url Created!!"+data);
});
	res.send('url has been shortened and type in url bar'+user_key);
})
app.get("/:key",function(req,res){
	var user_key = req.params.key;
	Url.findOne({key:user_key},function(err,data){
		if(err) console.error(err);
		res.redirect(data.url);
	})
})
app.get('/*',function(req,res){
	res.send('My Error page');
})

app.listen('3000');//port