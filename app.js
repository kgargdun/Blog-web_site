const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const entries=[];
var _ = require('lodash');





app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


app.get("/", function(request, response) {
  response.render("home", {
    homeStarting: homeStartingContent,
    posts :entries,
  })
});

app.get("/about", function(request, response) {
  response.render("about", {
    aboutStarting: aboutContent,
  });
})



app.get("/contact", function(request, response) {
  response.render("contact", {
    contactStarting: contactContent,
  });
})



app.get("/compose", function(request, response) {
  response.render("compose");
})

var myTitle;
app.get("/posts/:postId", function(request, response) {
  myTitle=_.lowerCase(request.params.postId);
  for(var i=0;i<entries.length;++i)
  {

    if(_.lowerCase(entries[i].entryTitle)===myTitle)
    {
      console.log("Match found");
      response.render("post.ejs",{
        postHeading:entries[i].entryTitle,
        postContent:entries[i].entryBody,
      });
      break;
    }
    else
    {
      console.log("Match not found");
    }

   }

  console.log(myTitle);
})


app.post("/compose",function(request,response)
{

  var newEntry=
  {
    entryTitle :(request.body.addNewTitle),
    entryBody :request.body.addNewBody,
  }
  console.log(newEntry);
  entries.push(newEntry);
  response.redirect("/");
})



// $("#about").on("click",function(event)
// { console.log(this.id); });
//
// $("#contact").on("click",function(event)
// { console.log(this.id); });
app.post("/more",function(req,res)
{
  console.log(req.body);
  res.redirect("/posts/"+req.body.button)
})








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
