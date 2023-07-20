const MainRouter = require("express").Router();
// const MainRouter = require('express-promise-router')();
MainRouter.use("/library",require("./library"));
MainRouter.use("/wac",require("./wac"));

module.exports = MainRouter;
