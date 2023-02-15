//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var itemCollection=["Buys Food","Cook Food"];

app.get("/", function (req, res) {
    var today = new Date();
    var option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", option);

    res.render("list", {
        kindOfDay: day,
        newListItems:itemCollection
    })
});


app.post("/",function(req,res){
    var item = req.body.newItem;

    itemCollection.push(item);
    res.redirect("/");
})


app.listen(3000, function () {
    console.log("server is Running on port 3000 ... ");
});