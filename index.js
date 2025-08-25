const express = require('express');
const fs = require("fs");
const { log } = require('node:console');
const app = express()
const port = 3000
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
let siteName = "myBlogs.com"
let names = [];
let dateTimes = [];
let blogContents = [];
app.post("/submit", (req, res) => {
    let name = req.body.name
    let dateTime = req.body.date
    let blogContent = req.body.blogContent
    console.log(name);
    console.log(dateTime);
    console.log(blogContent);

    names.push(name);
    dateTimes.push(dateTime);
    blogContents.push(blogContent);

    app.get("/getData", (req, res) => {
        let allData = [];

        for (let i = 0; i < names.length; i++) {
            allData.push({
                name: names[i],
                dateTime: dateTimes[i],
                blogContent: blogContents[i],
            });
        }

        res.json(allData);
    });
    res.render("index",{siteName})
}
)
console.log(names);
console.log(dateTimes);
console.log(blogContents);

app.get('/', (req, res) => {
    // let siteName = "myBlogs.com"
    res.redirect("/https://blog-app-abn1.onrender.com/")
    // res.render("index", { siteName })
})


app.get('/addBlog.ejs', (req, res) => {
    let siteName = "myBlogs.com"
    res.render("addBlog", { siteName })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
