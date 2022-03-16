const jwt = require("jsonwebtoken");
const authenticate = function(req,res,next){
  try{
    let token = req.headers["x-api-key"];
    if (!token) token = req.headers["x-api-key"];
  
    
    if (!token) return res.send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, "roomNo-15");
    if (!decodedToken)
      return res.send({ status: false, msg: "token is invalid" });
  
  next()
  }
  catch(err){
    res.status(500).send({msg:"server error",error:err.message})
  }

    
}

const authorise = function(req,res,next){
  try{
    let token = req.headers["x-api-key"];
    let decodedToken = jwt.verify(token,"roomNo-15")
    let toBeUpdatedAuthorId = req.params.authorId;
    let loggedInAuthorId = decodedToken.authorId;
    if(loggedInAuthorId != toBeUpdatedAuthorId){
      return res.status(400).send({status:false,msg:"You are not authorised to do this task"});
    }
    else{
      next()
    }
  }
  catch(err){
  }
  res.status(500).send({status:false,msg:"Server error",error:err.message})
}

    module.exports.authenticate = authenticate
    module.exports.authorise = authorise