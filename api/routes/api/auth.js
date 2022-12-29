const UserModel = require("../../database/models/user.model");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys");

router.post("/", async (req, res) => {
  const { email, pwd } = req.body;
  try {
    const user = await UserModel.findOne({ email }).exec();
    if (user) {
      if (bcrypt.compareSync(pwd, user.pwd)) {
        const token = jsonwebtoken.sign({}, key, {
          subject: user._id.toString(),
          expiresIn: 3600 * 24 * 30 * 6, // 6 months
          algorithm: "RS256",
        });
        res.cookie("token", token, { httpOnly: true });
        res.json(user);
      } else {
        res.status(400).json("Informations de connexion erronnées");
      }
    } else {
      res.status(400).json("Informations de connexion erronnées");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json("Informations de connexion erronnées");
  }
});

module.exports = router;
