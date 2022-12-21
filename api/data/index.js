const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://malou:toor@cluster0.jogjt8n.mongodb.net/r18jwt?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connexion BDD OK");
  })
  .catch((err) => {
    console.log("Connexion BDD KO");
  });
