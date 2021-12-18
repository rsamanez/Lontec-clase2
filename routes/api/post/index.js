const postRouter = require("express").Router();

postRouter.route("/article")
    .get(function (req,res){
        res.send('Hello from /api/post/article GET');
    })
    .post(function (req,res){
        res.send('Hello from /api/post/article POST');
    });

module.exports = postRouter;