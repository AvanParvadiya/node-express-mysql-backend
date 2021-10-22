const express=require("express");
const bodyParser=require("body-parser");

const app=express(); // Init your application with express

app.use(bodyParser.json()); // parse request of content-type : application/json

app.use(bodyParser.urlencoded({extended:true})); // parse requests of content-type : application/x-www-urlencoded

//simple route
// app.use("/",(request,response)=>{
//     response.json({message:"Welcome to RESTFul APIs Application"});
// })
require("./app/routes/customer.routes")(app);

app.listen(8080,()=>{
    console.log("Magic happening on PORT 8080");
})