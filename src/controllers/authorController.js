const jwt = require("jsonwebtoken")
const authorModel = require("../models/authorModel");
// const uModel = require("../models/authorModel");

const createUser = async function (req, res) {

  try{
    let data = req.body
    if(Object.keys(data).length>0){
      let savedData = await authorModel.create(data)
      res.status(201).send({msg:savedData})
    }
    else
    res.status(400).send({msg:"BAD REQUEST"})
  }
  catch(err){
    res.status(500).send({msg:"Server Error",error:err.message})
  }

};

const login = async function(req,res){
  try{
      let authorId = req.body.email
      let password = req.body.password

      let author = await authorModel.findOne({email:authorId,password:password})
      if(!author){
          res.status(401).send({status:false,msg:"Invalid detalis"})
      }
      const token = jwt.sign(
          {
              authorId : author._Id,
              status:"Phase-2",
              project: "project-1"
          },
          "roomNo-15"
      );
      res.setHeader("x-api-key",token)
      res.send({status:true,data:token})

  }
  catch(err){
      res.status(500).send({msg:"Server Error",error:err.message})
  }
}

module.exports.createUser = createUser;
module.exports.login = login;