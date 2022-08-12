const songsController = require("./controller/songs.controller");
const bandsController = require("./controller/bands.controller");

module.exports = (app) => {
  app.get("/", (req, res) => bandsController.getBands(req, res));

  app.get("/songs", (req, res) => songsController.getSongs(req, res));
  app.get("/songs/:id", (req, res) =>
    songsController.getSongById(req, res)
  );
  app.get("/band/:id/songs", (req, res) =>
    songsController.getSongByBandId(req, res)
  );

  app.get("/add-song", (req, res) =>
    songsController.getAddSongsForm(req, res)
  );
  app.post("/save-song", (req, res) =>
    songsController.saveSong(req, res)
  );

  app.get("/edit-song/:id", (req, res) =>
    songsController.getEditSongsForm(req, res)
  );
  app.post("/update-song/:id", (req, res) =>
    songsController.editSong(req, res)
  );

  app.get("/like-song/:id", (req, res) =>
  songsController.likeSong(req, res)
);
app.get("/dislike-song/:id", (req, res) =>
songsController.dislikeSong(req, res)
);

  app.get("/delete-song/:id", (req, res) =>
    songsController.deleteSong(req, res)
  );
};