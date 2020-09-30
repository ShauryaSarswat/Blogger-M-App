var express = require("express");
var app = express();
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
//Schema for blogs
var blogSchema = new mongoose.Schema({
 title : String,
 type : String,
 coverimage : String,
 author : String,
 Description : String,
 content : String,
 date : Date,
 BackgroundColor : String
});
var blog = mongoose.model("blog", blogSchema);

app.set("view engine", "ejs");
app.get("/",function(req, res){
	
 res.render("landing");
});
app.get("/blogs",function(req, res){
	blog.find({},function(err, Blog){
		if(err){
			console.log(err);
		}
		else{
 res.render("index",{blogs: Blog});
		}
	});
});
app.get("/blogs/createNew", function(req, res){
	res.render("new");
});


app.post("/blogs", function(req, res){
   var title = req.body.title;
	var type = req.body.type;
	var date = req.body.date;
	var coverimage = req.body.coverimage;
	var author = req.body.author;
	var Description = req.body.Description;
	var content = req.body.content;
	var BackgroundColor = req.body.BackgroundColor;
	var newBlog = { 
		title : title,
		type : type,
		date : date,
		coverimage : coverimage,
		author : author,
		Description : Description,
		content : content,
		BackgroundColor : BackgroundColor
	};

	blog.create(newBlog,function(err, blog){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/blogs");
		}
	});});
   

    app.get("/blogs/:id", function(req, res){
 	blog.findById( req.params.id , function(err, blogInfo){
 		if(err){
 			console.log(err);
 		}
 		else{
 			res.render("show", { blogs : blogInfo});
 		}
 	    });
     });


app.listen(3000,function(){
	console.log("Your Web app started");
})