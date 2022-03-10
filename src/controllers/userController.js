const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  try{
    let data = req.body;
    if (Object.keys(data).length>0){
      let savedData = await userModel.create(data);
    // console.log(req.newAtribute);
    res.status(201).send({ msg: savedData });
    }
    else res.status(400).send({msg:"Bad Request"})
    
  }
  catch(error){
    res.satus(500).send({msg:"Server Error",error:error.message})
  }
 
};

const loginUser = async function (req, res) {
  try{
    let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(403).send({
      status: false,
      msg: "username or the password is not corerct",
    });


  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FUnctionUp",
    },
    "functionup-thorium"
  );
  res.setHeader("x-auth-token", token);
  res.status(201).send({ status: true, data: token });
  }
  catch(error){
    res.status(500).send({msg:"SERVER ERROR",error:error.message})
  }
  
};

const getUserData = async function (req, res) {
  try{
    let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];


  if (!token) return res.status(401).send({ status: false, msg: "token must be present" });

  console.log(token);
  

  let decodedToken = jwt.verify(token, "functionup-thorium");
  if (!decodedToken)
    return res.status(403),send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(404).send({ status: false, msg: " USER NOT EXISTS" });

  res.status(200).send({ status: true, data: userDetails });
  }
  catch(error){
    res.status(500).send({msg:"SERVER ERROR",error:error.message})
  }
  
};

const updateUser = async function (req, res) {

  try{
    let userId = req.params.userId;
  let user = await userModel.findById(userId);
  
  if (!user) {
    return res.status(404).send("USER NOT EXISTS");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.status(201).send({ status: userData, data: updatedUser });
  }
  catch(error) {
    res.status(500).send({msg:"SERVER ERROR",error:error.message})
  }
};

const deleteUser = async function(req,res){

  let userId = req.params.userId;
  let deleteUser = await userModel.findByIdAndUpdate(
    {_id:userId},{$set:{isDeleted:true}},
    {new:true});
    res.send({status:true,msg : deleteUser})
  
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
