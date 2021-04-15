const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){

  res.sendFile(__dirname + "/signup.html");

  //res.send("Server is up and running!");
});


app.listen(process.env.PORT || 3000, function(){
  console.log("server running")
});


app.post("/", function(req, res){
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;
const  data = {
  members: [{
    email_address: email,
    status: "subscribed",
    merge_fields : {
      FNAME : firstName,
      LNAME : lastName
    }
  }]
};
const  jsonData = JSON.stringify(data);

const url = "https://us1.api.mailchimp.com/3.0/lists/90f414f7f9";
const options = {
  method : "POST",
  auth : "minduli1:469d4a3628ef27e74538f1eb2d18f53a-us1"
}
const request = https.request(url, options, function(response){

  if (response.statusCode === 200){
    res.sendFile(__dirname + "/success.html")
  }
  else {
      res.send(__dirname + "/failure.html")
  }
  response.on("data", function(data){
    console.log(JSON.parse(data));
  })

})

request.write(jsonData);
request.end();


});


app.post("/failure", function(req,res){
  res.redirect("/")
})


// heroku
// Spv6^A4#\i@M[Fh
//469d4a3628ef27e74538f1eb2d18f53a-us1

//List ID
//90f414f7f9
