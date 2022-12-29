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

router.get("/current", async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, keyPub);
      const user = await UserModel.findById(decodedToken.sub)
        .select("-pwd -__v")
        .exec();

      if (user) {
        return res.json(user);
      } else {
        return res.json(null);
      }
    } catch (err) {
      console.log(err);
      return res.json(null);
    }
  } else {
    return res.json(null);
  }
});

router.delete("/", (req, res) => {
  res.clearCookie("token");
  res.end();
});

module.exports = router;
