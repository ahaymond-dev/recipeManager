const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api/apiRoutes");

router.use("/api", apiRoutes);

router.use(function(req, res) {
    res.sendfile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;