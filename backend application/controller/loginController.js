const jwt = require('jsonwebtoken')
module.exports = {
    login :  (req, res)=>{
        var username = req.body.username
        var password = req.body.password
        if (username == "parth" && password == "parth") {
          let token = jwt.sign({name : username}, "tokenIdentity", {expiresIn: "1h"})
          res.json({
            message: "Login Successful",
            token
          })
          return res.send();
        } else {
          res.json({
            message: "Login Unsuccessful",
          })
          return res.status(404).send();
        }
      }
}