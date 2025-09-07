import mongoose from "mongoose";
import express from "express";
await mongoose.connect("mongodb://localhost:27017/todo")
import { blog } from "./models/Blog.js"

// const express = require('express');
// const fs = require("fs");
// const { log } = require('node:console');
const app = express()
const port = 3000
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// let siteName = "myBlogs.com"

// let names = [];
// let dateTimes = [];
// let blogContents = [];
app.get('/', async(req, res) => {
    let siteName = "myBlogs.com"
    const blogs = await blog.find()

    res.render("index", { siteName , blogs })
})
app.post("/submit", async(req, res) => {
    let name = req.body.name
    let dateTime = req.body.date
    let blogContent = req.body.blogContent
    const BLOG=new blog({nameOfPublisher:`${name}`,dateOfPublishing:`${dateTime}`,mainBlogOfPublisher:`${blogContent}`})
    console.log(name);
    console.log(dateTime);
    console.log(blogContent);
    await BLOG.save()

    // names.push(name);
    // dateTimes.push(dateTime);
    // blogContents.push(blogContent);

    // app.get("/getData", async(req, res) => {
    //     const blogs= await blog.find()
    //     let allData = [];

    //     for (let i = 0; i < names.length; i++) {
    //         allData.push({
    //             name: names[i],
    //             dateTime: dateTimes[i],
    //             blogContent: blogContents[i],
    //         });
    //     }

    //     res.json(allData);
    // });
    res.redirect("/")
}
)




app.get('/addBlog.ejs', (req, res) => {
    let siteName = "myBlogs.com"
    res.render("addBlog", { siteName })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
