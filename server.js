const express = require("express");
const bodyParser = require("body-parser");

//initilizes the api app with express defaults 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "welcome to my life!"});
}); 

require("./routes/customer.routes")(app);

//this is the line of code that runs your server (i.e very important)

app.listen(9543,() => {
    console.log("Server is running on port 9543")
});

