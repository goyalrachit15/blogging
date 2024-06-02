const express = require("express");
const router = express.Router();
const Blog = require("../model/blog.js");
router.get("/blogs", async (req, res) => {
  const blogs = await Blog.find({});
  res.render("index.ejs", { blogs });
});

router.get("/blogs/about", (req, res) => {
  res.render("about.ejs");
});

router.get("/blogs/create", (req, res) => {
  res.render("create.ejs");
});

router.post("/blogs", (req, res) => {
  console.log(req.body);
  const blog = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
  });

  blog.save();
  res.redirect("/blogs");
});

router.get("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  console.log(blog);
  res.render("show.ejs", { blog });
});

router.delete("/blogs/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  let deleted = await Blog.findByIdAndDelete(id);
  console.log(deleted);
  res.redirect(`/blogs`);
});

module.exports= router;