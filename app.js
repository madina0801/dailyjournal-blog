const express = require("express");
const path = require("path");
const app = express();
const ejs = require("ejs");

app.set("view engine", "ejs");

// Setting lodash
// Load the full build.
const _ = require('lodash');

// Load the FP build for immutable auto-curried iteratee-first data-last methods.
const fp = require('lodash/fp');
 
// Load method categories.
const array = require('lodash/array');
const object = require('lodash/fp/object');
const { constants } = require("fs/promises");

const homeStartingContent =
  "Nullam sapien augue, pharetra sed augue efficitur, placerat dignissim ipsum. Proin felis enim, placerat sit amet ante tincidunt, aliquam laoreet ex. In maximus nulla tortor, et dapibus quam gravida vitae.";

const aboutContent =
  "Mauris finibus lacus felis, ut rhoncus dolor commodo a. Suspendisse nulla risus, aliquam ullamcorper imperdiet in, varius eget ex.";

const contactContent =
  "Vestibulum eget ante sed purus euismod ultricies id in erat. Donec euismod convallis ipsum sit amet sodales. Vestibulum sed neque nisi.";

const posts = [];

// Parse data and use static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Render views pages
app.get("/", function (req, res) {
  res.render("home", { homeStartingContent, posts });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

// Routing
app.get("/posts/:post", function (req, res) {
  const requestedPost = req.params.post;
  for (p of posts) {
    if (_.lowerCase(p.title) === requestedPost || _.kebabCase(p.title) === requestedPost) {
      console.log("Found match!");
						console.log(requestedPost);
    } else console.log("Nothing found!");
  }
});

// Nav links route handlers
app.post("/", function (req, res) {
  res.redirect("/");
});

app.post("/about", function (req, res) {
  res.redirect("/about");
});

app.post("/contact", function (req, res) {
  res.redirect("/contact");
});

// Compose page
app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };

  posts.push(post);
  res.redirect("/");
});

app.listen(3000, console.log("Listening on 3000!"));
