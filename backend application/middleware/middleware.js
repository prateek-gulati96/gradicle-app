const blogpost = require('../schema/blogpostSchema')
module.exports = {
    //middleware to get blogPosts
    getBlogpost: async (req, res, next) => {
        let blog
        try {
            blog= await blogpost.findById(req.params.id)
            
          if (blog== null) {
            return res.status(404).json({ message: 'Cannot find BlogPost' })
          }
        } catch (err) {
          return res.status(500).json({ message: err.message })
        }
        res.blog = blog
        next()
      },
      //middleware to get blogPosts by category
      getBlogpostbyCategory : async (req, res, next) => {
        let blog
        try {
            blog= await blogpost.find({category : req.params.category})
            
          if (blog== null) {
            return res.status(404).json({ message: 'Cannot find BlogPost' })
          }
        } catch (err) {
          return res.status(500).json({ message: err.message })
        }
      
        res.blog = blog
        next()
      }, 
      //middleware to get blogPosts by sub-category
      getBlogpostbySubcategory : async (req, res, next) => {
        let blog
        try {
            blog= await blogpost.find({subcategory : req.params.subcategory})
            
          if (blog== null) {
            return res.status(404).json({ message: 'Cannot find BlogPost' })
          }
        } catch (err) {
          return res.status(500).json({ message: err.message })
        }
      
        res.blog = blog
        next()
      }, 
}
