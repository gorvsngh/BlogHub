const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username : "peterparker",
        content : "I lost my MJ!",
    },
    {
        id : uuidv4(),
        username : "steaveroggers",
        content : "I can do this all day!",
    },
    {
        id : uuidv4(),
        username : "tonystark",
        content : "I love you 3000!",
    },
];

app.get("/posts", (req, res) => {
    res.render("index", { posts });
})

app.get("/posts/new", (req, res) => {
    res.render("new");
})

app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({ id, username, content});
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((post) => id === post.id);
    res.render("show", {post});
})

app.patch("/posts/:id", (req, res) => { 
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((post) => id === post.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req, res) => {
    let {id} = req.params;
    let post = posts.find((post) => id === post.id);
    res.render("edit.ejs", { post });
})

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((post) => id !== post.id);
    res.redirect("/posts");
});
app.listen(port, () => {
    console.log("listening");
})