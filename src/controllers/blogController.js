const jwt = require('jsonwebtoken')
const authorModel = require("../models/authorModel.js")
const blogModel = require("../models/blogModel.js")

const createBlog = async function(req,res){
    try{
        let data = req.body

        let authorId = data.authorId
        let authorReq = await authorModel.findById(authorId)
        if(authorReq){
            let createBlog = await blogModel.create(data)
            res.status(201),send({status:true,data:createBlog})
        }
        else{
            res.status(400).send({status:false,msg:`${authorId} is not Available,Enter valid Author Id` })
        }
    }
    catch(err){
        res.status(500).send({msg:"Server Error",error:err.message})
    }
}

const getBlogs = async function(req,res){
    try{
        let filters =req.query
        let allBlogs = await blogModel.find(
            {$and:[filters,{isDeleted:false},{isPublished:true}]})
            if(allBlogs.length == 0){
                return res.status(401).send({status:false,msg:"Request not found"})
            }
            return res.status(200).send({status:true,msg:allBlogs})
    }
    catch(err){
        res.status(500).send({msg:"Server Error",error:err.message});
    }
}

const updateblogs = async function(req,res){
    try{
        let id = req.params.blogId
        let data = req.body
        data.publishedAt = Date.now()
        data.isPublished = true
        let updatedblog = await blogModel.findByIdAndUpdate({_id:id},{$set:data},{new:true})
        return res.status(200).send(updatedblog)
    }
    catch(err){
        res.status(500).send({msg:"Server Error",error:err.message})
    }
}

const deleteById = async function(req,res){
    try{
        let id = req.params.blogId
        let isExist = await blogModel.findById(id)
        if(!isExist){
            return res.status(404).send({status:false,msg:"Data not Found"})
        }
        if(isExist.isDeleted !=true){
            let deleteBlog = await blogModel.findOneAndUpdate({_id:id},{$set:{isDeleted:true}})
            return res.status(200).send({status:true,msg:"Successfully Deleted"})
        }else{
            return res.status(400).send({status:true,msg:"Already Deleted"})
        }
    }
    catch(err){
        return res.status(500).send({msg:"Server Error",error:err.message})
    }
}

const deleteByParams = async function(req,res){
    try{
        let filters = req.query
    let isExists = await blogModel.find(filters)
    if(isExists.isDeleted != true){
        let deleteBlog = await blogModel.findByIdAndUpdate(filters,{$set:{isDeleted:true}})
        return res.status(200).send(deleteBlog)
    }
    else{
        return res.status(400).send({status:false,msg:"already deleted"})
        }
    }
    catch(err){
        res.status(500).send({msg:"Server Error",error:err.message})
    }
    
}


module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateblogs = updateblogs
module.exports.deleteById = deleteById
module.exports.deleteByParams = deleteByParams
