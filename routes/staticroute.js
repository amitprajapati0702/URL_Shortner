const express = require("express");
const route = express.Router();

const URL = require("../model/url")

route.get("/" , (req,res) =>{
       const allurl = URL.find({});
       return res.render("home",{
          url:allurl,
       });
})

route.get("/signup" , (req,res)=>{
    return  res.render("signup");
})
route.get("/login",(req,res)=>{
      return res.render("login");
})




module.exports = route;