const conn = require("../infra/db-connection")("infra/rock.db");
const songsDAO = require("../model/songsDAO")(conn);
const bandsDAO = require("../model/bandsDAO")(conn);
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

exports.getSongs = (req, res) => {
  songsDAO.findAll((err, rows) => {
    if (err) {
      return res.json({ message: "Houve um erro ao consultar os dados", err });
    }

    res.render("index", { songs: rows, role: "songs" });
  });
};

exports.getSongById = (req, res) => {
  const id = req.params.id;
  songsDAO.findById(id, (err, row) => {
    if (err) {
      return res.json({ message: "Houve um erro ao consultar os dados", err });
    }

    res.render("index", { song: row, role: "detail" });
  });
};

exports.getSongByBandId = (req, res) => {
  const bandId = req.params.id;
  songsDAO.findbyBandId(bandId, (err, rows) => {
    if (err) {
      return res.render("not-found", {
        errorMessage: "Houve um erro ao consultar os dados",
        err,
      });
    }

    if (!rows.length) {
      return res.render("not-found", {
        errorMessage: "Banda sem músicas cadastradas",
      });
    }

    res.render("index", { songs: rows, role: "songs" });
  });
};

exports.getAddSongsForm = (req, res) => {
  bandsDAO.findAll((err, rows) => {
    if (err) {
      return res.status(500).json({
        errorMessage: "Erro ao consultar os dados.",
        err: err,
      });
    }

    res.render("add-song", { bands: rows });
  });
};

exports.saveSong = (req, res) => {
  const formData = new formidable.IncomingForm();

  formData.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({
        errorMessage: "Algo errado aconteceu.",
        err: err,
      });
    }

    const imagesPath = path.join(
      __dirname,
      "../public/images",
      files.image.newFilename
    );

    const song = { ...fields, image: files.image.newFilename };

    songsDAO.saveSong(song, (err) => {
      if (err) {
        return res.status(500).json({
          errorMessage: "Erro ao salvar os dados.",
          err: err,
        });
      }

      fs.renameSync(files.image.filepath, imagesPath);

      return res.redirect("/songs");
    });
  });
};

exports.getEditSongsForm = (req, res) => {
  const id = req.params.id;

  songsDAO.findById(id, (err, row) => {
    if (err) {
      return res.status(500).json({
        errorMessage: "Houve um erro ao consultar os dados.",
        err: err,
      });
    }

    if (!row) {
      return res.status(404).json({
        errorMessage: "Música não encontrada.",
        err: err,
      });
    }

    bandsDAO.findAll((err, rows) => {
      if (err) {
        return res.status(500).json({
          errorMessage: "Erro ao consultar os dados.",
          err: err,
        });
      }

      res.render("edit-song", { song: row, bands: rows });
    });
  });
};

exports.editSong = (req, res) => {
  const id = req.params.id;

  songsDAO.findById(id, (err, row) => {
    if (err) {
      return res.status(500).json({
        errorMessage: "Houve um erro ao consultar os dados.",
        err: err,
      });
    }

    console.log(row);
    console.log("row");

    if (!row) {
      return res.status(404).json({
        errorMessage: "Música não encontrada.",
        err: err,
      });
    }

    const song = { ...row, ...req.body };

    console.log(req.body);

    songsDAO.updateSong(id, song, (err2) => {
      if (err2) {
        return res.status(500).json({
          errorMessage: "Algo errado aconteceu.",
          err: err2,
        });
      }
      return res.redirect("/songs");
    });
    // });
  });
};

exports.deleteSong = (req, res) => {
  const id = req.params.id;

  songsDAO.deleteSong(id, (err) => {
    if (err) {
      return res.status(500).json({
        errorMessage: "Algo errado aconteceu.",
        err: err,
      });
    }

    return res.redirect("/songs");
  });
};



exports.likeSong = (req, res) => {
  const id = req.params.id;

  songsDAO.findById(id, (err, row) => {
    if (err) {
      return res.status(500).json({
        errorMessage: "Houve um erro ao consultar os dados.",
        err: err,
      });
    }
    if (!row) {
      return res.status(404).json({
        errorMessage: "Música não encontrada.",
        err: err,
      });
    }

    let stars = row.stars;
    stars++;
    if(stars >= 5)
      stars = 5;
    console.log(row)
    console.log("ok")
    const song = { ...row, ...{"stars": stars} };
    console.log(song);


    songsDAO.updateSong(id, song, (err2) => {
      if (err2) {
        return res.status(500).json({
          errorMessage: "Algo errado aconteceu.",
          err: err2,
        });
      }
      return res.redirect("/songs");
    });
    // });
  });
};

exports.dislikeSong = (req, res) => {
  const id = req.params.id;

  songsDAO.findById(id, (err, row) => {
    if (err) {
      return res.status(500).json({
        errorMessage: "Houve um erro ao consultar os dados.",
        err: err,
      });
    }
    if (!row) {
      return res.status(404).json({
        errorMessage: "Música não encontrada.",
        err: err,
      });
    }

    let stars = row.stars;
    stars--;
    if(stars <= 0)
      stars = 1;
    console.log(row)
    console.log("ok")
    const song = { ...row, ...{"stars": stars} };
    console.log(song);


    songsDAO.updateSong(id, song, (err2) => {
      if (err2) {
        return res.status(500).json({
          errorMessage: "Algo errado aconteceu.",
          err: err2,
        });
      }
      return res.redirect("/songs");
    });
    // });
  });
};