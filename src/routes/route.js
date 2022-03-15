const express = require('express');
const router = express.Router();
const authorController= require("../controllers/authorController");
const blogController = require("../controllers/blogController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createUser  )

router.post("/createBlog", blogController.createBlog)

router.post("loginUser",blogController.login)

router.get("getBlogs",blogController.getBlogs)

router.put("/updateBlogs/:blogId",blogController.updateblogs)

router.delete("/deleteById/:blogId",blogController.deleteById)

router.delete("/deleteByparams",blogController.deleteByParams)

module.exports = router;