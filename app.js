if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dbURL = process.env.DBURL;
const router = require("./routers/blog.js");

mongoose.connect(dbURL)
.then((result)=> console.log("connected to db"))
.catch((error)=> console.log(error));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended:true}));

app.use("/", router);
app.use((req, res) => {
  res.status(404).render("404.ejs");
});

let port = "3000";
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});