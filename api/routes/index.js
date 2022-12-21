const router = require("express").Router();
const apiUsers = require("./users");

router.use("/users", apiUsers);
router.get("/test", (req, res) => {
  res.json("ok");
});

module.exports = router;
