import 'dotenv/config'; 
console.log(process.env.DB);

import express from "express";
import mongoose from "mongoose";
import { blog } from "./models/Blog.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// 🔥 CONNECT TO MONGODB FIRST
mongoose.connect(process.env.DB)
  .then(() => {
  

    // 👉 ROUTES (safe now)
console.log(process.env.MONGO_URI);

    app.get('/', async (req, res) => {
      let siteName = "myBlogs.com";
      
      const blogs = await blog.find();
      res.render("index", { siteName, blogs });
    });

    app.post("/submit", async (req, res) => {
      const { name, date, blogContent } = req.body;

      const BLOG = new blog({
        nameOfPublisher: name,
        dateOfPublishing: date,
        mainBlogOfPublisher: blogContent
      });

      await BLOG.save();
      res.redirect("/");
    });

    app.get('/addBlog.ejs', (req, res) => {
      let siteName = "myBlogs.com";
      res.render("addBlog", { siteName });
    });

    // 🚀 START SERVER AFTER DB CONNECT
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });

  })
  .catch(err => {
    console.error("MongoDB connection failed ❌");
    console.error(err.message);
   

  });
