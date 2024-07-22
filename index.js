const express = require('express');
const app=express();
const path = require("path");
const fs = require("fs");


app.set("view engine" ,"ejs");
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use(express.static(path.join(__dirname ,"public")));

app.get("/", (req , res)=>{
    fs.readdir(`./files` , function(err , files){
        // console.log(files);
        res.render("index.ejs" ,{files: files}); // this render funciton is written under the function that means ki pehle vo run hoga nad uske return ma ya run hoga
    })  
})

app.get("/files/:filename" ,(req , res)=>{
    // we write "utf-8" to tell that we need this data in english 
    fs.readFile(`./files/${req.params.filename}`, "utf-8" , function(err , filedata){
        res.render('show', {filename: req.params.filename , filedata: filedata});        
    });
})

app.get("/edit/:filename", (req,res)=>{
    res.render("edit.ejs" , {filename: req.params.filename});
})

app.post("/create" , function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt` , req.body.details , function(err){
        res.redirect("/");
    })
    // console.log(req.body);
})

app.post("/edit" , (req,res)=>{
    fs.rename(`./files/${req.body.previous}` , `./files/${req.body.New}`, function(err){
        res.redirect("/");
    } )
    // console.log(req.body);
})






app.listen(3000 , ()=>{
    console.log("server is running at port 3000");
})