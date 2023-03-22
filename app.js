

const express = require("express");
const https = require("https");
const date = require(__dirname + "/date.js");

const app = express();

const items = [];
const workItems = [];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {

    const day = date.getDate();

    res.render("list", {
        listTitle: day,
        newListItems: items,
    });
})

app.post("/", function(req, res) {

    const newItem = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(newItem);
        res.redirect("/work");
    } else {
        items.push(newItem);
        res.redirect("/");
    }

})

app.get("/work", function(req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems,
    });
})

app.post("/work", function(req, res) {

    const newItem = req.body.newItem;

    workItems.push(newItem);

    res.redirect("/work");
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server has started on port 3000.");
})
