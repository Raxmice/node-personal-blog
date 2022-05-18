const express = require('express');
const bodyparser = require('body-parser');
const _=require("lodash");
const mongoose = require('mongoose');

const app = express();
app.set("view engine", "ejs");
//for body parser
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect('mongodb+srv://Raxmice_98:Raxmice1998@noderax.tkfup.mongodb.net/blog',{ useNewUrlParser: true }, ()=>{
      console.log("connected");
  },
  e => console.error(e)
  );

  const aposts = {
    title: String,
    text: String
}
const cpost = mongoose.model("cpost", aposts);



const homecontent="The word blog is a combined version of the words “web” and “log”. At their inception, blogs were essentially an online diary where people could keep a log about their daily lives, on the web. They have since morphed into an essential place for information and updates and have become a forum for not only individuals, but also businesses. In fact, some people even make money blogging and become professional, full-time bloggers.";
const about="This is me : Sangam Nayak [Raxmice]";
const contact="123456789";

//page req and res
app.get("/", function(req, res){
    cpost.find(function(err, data){
        if(err){console.log(err);}
        else{
            res.render("home",{ 
                hc: homecontent,
                allposts: data
            });
    }
    });
});
// app.get("/header", function(req, res){
//     res.render("header");
// });
app.get("/about", function(req, res){
    res.render("about",{about:about});
});
app.get("/contact", function(req, res){
    res.render("contact",{contact:contact});
});
//post
app.get("/post", function(req, res){
    res.render("post");
});
//data entery
app.get("/compose", function(req, res){
    res.render("compose");
});
app.post("/compose", function(req, res){
    if(req.body.posttitle=="" || req.body.posttext==""){
        console.log("one of input is empty");
    }else{
    // const post = {
    //     title:req.body.posttitle,
    //     text:req.body.posttext
    // }
    //allposts.push(post);
    const title = req.body.posttitle;
    const text = req.body.posttext;
    const p1=new cpost({
        title: title,
        text: text
    });
    p1.save(function(err){
        if(!err){
            res.redirect("/");
        }
    });
}
});

//show read more posts
app.get("/post/:title", function(req, res){
    const rtitle = _.lowerCase(req.params.title);//it carry :title value
    cpost.find(function(err, data){
        if(err){console.log(err);}else{
        data.forEach(function(post){
        const storedtitle = _.lowerCase(post._id);
        if(storedtitle === rtitle){
            //console.log("match found!");
            res.render("post",{
                title: post.title,
                text: post.text
            });
        }
    });}
});
});

//404
app.get('*', function(req, res){
    res.render("404");//status(404).send("<h1>404</h1><br><h3><a href='/'>Go back to home page</a></h3>");
  });
//calling a server
app.listen(3000, function(){
    console.log('server is started on port 3000');
});