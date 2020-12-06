require('dotenv').config()
//initialise
const express = require('express')
const router = express.Router()
const multer = require('multer')
const BlogController = require("../controller/blogController")
const LoginController = require("../controller/loginController")
const Middleware = require("../middleware/middleware")

//export router to server
module.exports = router
Blog=require('../schema/blogpostSchema')

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null, './uploads/')
  },
  filename : (req,file,cb)=>{
    cb(null,Date.now()+ file.originalname)
  }
});

const upload = multer({storage : storage ,
  fileFilter : (req,file,cb)=> {
    if (file.mimetype =='image/png' || file.mimetype =='image/jpg'|| file.mimetype =='image/jpeg') {
      cb(null,true)
    } else{
      cb(new Error('only png,jpeg and jpg format allowed'), false)
    }
} ,
  limits : {fileSize : 1024* 1024 *5}
})
//login
router.post ('/login', LoginController.login)

// Getting all blog posts
router.get('/', BlogController.getAllBlogs)
  
// Getting One blogpost
router.get('/:id', Middleware.getBlogpost, BlogController.getBlogsbyID)

// Getting One blogpost based on category
router.get('/blog/category/:category', Middleware.getBlogpostbyCategory, BlogController.getBlogsbyCategory)

// Creating post
router.post('/', upload.single('blogImage'),BlogController.createBlogPost)

// Updating post 
router.patch('/:id', Middleware.getBlogpost, BlogController.updateBlogPost)
  
// Deleting blog post
router.delete('/:id', Middleware.getBlogpost,BlogController.deleteBlogPost)
