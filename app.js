require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

//Pegar as views da pasta views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Pegar arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

//Permitir o recebimento do req.body para POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
require("./app.routes")(app);

//Servidor ouvindo
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});