const express = require("express");
const path = require("path");
const app = express();
const ejs = require("ejs");

app.set("view engine", "ejs");

const homeStartingContent = "Nullam sapien augue, pharetra sed augue efficitur, placerat dignissim ipsum. Proin felis enim, placerat sit amet ante tincidunt, aliquam laoreet ex. In maximus nulla tortor, et dapibus quam gravida vitae.";

const aboutContent = "Mauris finibus lacus felis, ut rhoncus dolor commodo a. Suspendisse nulla risus, aliquam ullamcorper imperdiet in, varius eget ex.";

const contactContent = "Vestibulum eget ante sed purus euismod ultricies id in erat. Donec euismod convallis ipsum sit amet sodales. Vestibulum sed neque nisi.";


// Parse data and use static files
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// App
app.get("/", function(req, res) {
	res.render("home", {homeStartingContent});
})

app.get("/about", function(req, res) {
	res.render("about", {aboutContent});
})

app.get("/contact", function(req, res) {
	res.render("contact", {contactContent});
})

// Route handlers
app.post("/", function(req, res) {
	res.redirect("/");
})

app.post("/about", function(req, res) {
	res.redirect("/about");
})

app.post("/contact", function(req, res) {
	res.redirect("/contact");
})


app.listen(3000, console.log("Listening on 3000!"));