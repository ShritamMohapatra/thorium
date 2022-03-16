const express = require('express');
const router = express.Router();
const authorController= require("../controllers/authorController");
const blogController = require("../controllers/blogController");
const middleWare = require("../middleWare/middleWare")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createUser  )

router.post("/createBlog", blogController.createBlog)

router.post("/login",authorController.login)

router.get("/getBlogs",blogController.getBlogs)

router.put("/updateBlogs/:blogId",middleWare.authorise,blogController.updateblogs)

router.delete("/deleteById/:blogId",middleWare.authenticate,middleWare.authorise,blogController.deleteById)

router.delete("/deleteByparams",middleWare.authenticate,middleWare.authorise,blogController.deleteByParams)

module.exports = router;