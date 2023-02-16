//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname+"/date.js");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const itemCollection = ["Buys Food", "Cook Food"];
const workItems = [];
const schoolItems = [];

app.get("/", function (req, res) {
    let day =  date.getDate();

    res.render("list", {
        listTitle: day,
        newListItems: itemCollection
    })
});


app.post("/", function (req, res) {
    var item = req.body.newItem;

    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work")

    } else if (req.body.list === "School List") {
        schoolItems.push(item);
        res.redirect("/school")

    } else {
        itemCollection.push(item);
        res.redirect("/");
    }
})


//work rout

app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    })
});


//school

app.get("/school", function (req, res) {
    res.render("list", {
        listTitle: "School List",
        newListItems: schoolItems
    })
})


//about page

app.get("/about",function(req,res){
    res.render("about");
});


app.listen(3000, function () {
    console.log("server is Running on port 3000 ... ");
});