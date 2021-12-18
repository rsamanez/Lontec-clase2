const MainRouter = require("express").Router();

MainRouter.use("/library",require("./library"));
MainRouter.use("/post",require("./post"));

module.exports = MainRouter;
