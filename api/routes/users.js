const router = require("express").Router();

router.post("/", (req, res) => {
  const body = req.body;
  const newUser = new UserModel(body);

  newUser.save((err, user) => {
    if (err) {
      res.status(400).json("Erreur BDD : échec de la création utilisateur");
    } else {
      res.json(user);
    }
  });
});

module.exports = router;
