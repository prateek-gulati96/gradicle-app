const fs = require('fs');
const Blog=require('../schema/blogpostSchema')
module.exports = {
    getAllBlogs : async(req, res) => {
        try {
          const blogs = await Blog.find()
          res.json(blogs)
        } catch (error) {
          res.status(500).json({message: error.message})
        }
      },
      getBlogsbyID : (req, res) => {
        res.json(res.blog)
      },
      getBlogsbyCategory : (req, res) => {
        res.json(res.blog)
      },
      createBlogPost : async (req, res) => {
        blog = new Blog(
            {
                blogTopic : req.body.blogTopic,
                category : req.body.category,
                subcategory :req.body.subcategory,
                date : req.body.date,
                body : req.body.body,
                videoURL: req.body.videoURL,
                image : req.file.path,
                dateCreated : req.body.dateCreated
            }               )
        try {
        const newBlogpost = await blog.save()
        res.status(201).json(newBlogpost)
        } catch (error) {
        res.status(400).json({ message: error.message })
        }
      },
      updateBlogPost : async (req, res) => {
        if(req.body.category!= null){res.blog.category=req.body.category}
        if(req.body.blogTopic!= null){res.blog.blogTopic=req.body.blogTopic}
        if(req.body.subcategory!= null){res.blog.subcategory=req.body.subcategory}
        if(req.body.body!= null){res.blog.body=req.body.body}
        if(req.body.videoURL!= null){res.blog.videoURL=req.body.videoURL}
        res.blog.dateCreated = req.body.dateCreated
        res.blog.dateModified = Date.now()
        try {
          const updatedBlogPost = await res.blog.save()
          res.json({ message : "Sucessfully Updated blog"})
        } catch (err) {
          res.status(400).json({ message: err.message })
        }
      },
      deleteBlogPost : async (req, res) => {
        try {
          fs.unlink('./'+res.blog.image, function (error) {});
          await res.blog.remove()
          res.status(200).json({ message: 'Deleted Blog Post!' })
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      }
}