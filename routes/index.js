/**
 *  routes/index.js
*/

module.exports = function(app) {
    app.use("/api", require("./api"));
}