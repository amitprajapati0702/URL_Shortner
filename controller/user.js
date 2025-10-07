const user = require("../model/user");


async function handlesignupdata(req,res){
    console.log("Incoming body" ,req.body)
       const {name,email,password} = req.body;
       const data = await user.create({
           name,
           email ,
           password,
       })
      if(data){
       
         res.status(201).json({"status":"new user create"});
         console.log("New User created");
      }
      else{
         console.log("The User not created");
      }
      return res.render("home");
}


async function handlelogindata(req,res){
    console.log("Incoming body" ,req.body)
       const {email,password} = req.body;
      const data = await user.findOne({email , password});
      if(data){
        res.redirect("/");
      }
      else{
         console.log("The User not created");
      }
      return res.render("home");
}




module.exports= {handlesignupdata , handlelogindata};