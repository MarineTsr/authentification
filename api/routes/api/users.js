const UserModel = require("../../database/models/user.model");
const bcrypt = require("bcryptjs");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const { pseudo, email, pwd } = req.body;
  const newUser = new UserModel({
    pseudo,
    email,
    pwd: await bcrypt.hash(pwd, 8),
  });
  newUser.save((err, user) => {
    if (err) {
      console.log(err);
      if (err.code === 11000) {
        res.status(400).json("Email déjà utilisé");
      } else {
        res.status(400).json("Oops une erreur est survenue");
      }
    } else {
      res.json(user);
    }
  });
});

module.exports = router;
