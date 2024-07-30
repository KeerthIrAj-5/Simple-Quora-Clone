const express=require("express");
const app=express();
const port=3000;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')
 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended:true}));

let posts=[
    {
        id:uuidv4(),   
        username:"Adam",
        content:"Good morning folks"
    },
    {
        id:uuidv4(),
        username:"Bob",
        content:"What is DSA?"
    },
    {
        id:uuidv4(),
        username:"John",
        content:"Which car should i buy in 2024?"
    },
    

]
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.listen(port,()=>{
    console.log("Listening on port :3000");
});
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id==p.id);
    console.log(post);
    res.render("show.ejs",{post});
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newc=req.body.content;
    let post=posts.find((p)=>id==p.id);
    post.content=newc;
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id==p.id);
    res.render("edit.ejs",{id,post})
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!=p.id);
    res.redirect("/posts");
});
