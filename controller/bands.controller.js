const conn = require("../infra/db-connection")("infra/rock.db")
const bandsDAO = require("../model/bandsDAO")(conn);

exports.getBands = (req, res) => {
  bandsDAO.findAll((err, rows) => {
    if (err) {
      return res.json({ message: "Houve um erro ao consultar os dados", err });
    }

    res.render("index", { bands: rows, role: "index" });
  });
};