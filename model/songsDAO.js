class SongsDAO {
    constructor(conn) {
      this.db = conn;
    }
  
    findAll(callback) {
      this.db.all(`SELECT * FROM songs`, callback);
    }
  
    findById(id, callback) {
      this.db.get(`SELECT * FROM songs WHERE id = ?`, id, callback);
    }
  
    findbyBandId(bandId, callback) {
      this.db.all(
        `SELECT * FROM songs WHERE bandId = ?`,
        bandId,
        callback
      );
    }
  
    saveSong(song, callback) {
      console.log(song);
      console.log("ok");
      const { name, year,duration,  image, bandId } = song;
      this.db.run(
        `INSERT INTO songs (name, image, year, duration, bandId) 
         VALUES (?, ?, ?,?, ?)`,
        [name, image, year, duration, bandId],
        callback
      );
    }
  
    updateSong(id, song, callback) {
      const { name, year, duration, image, bandId, stars } = song;
      if(!stars)
        stars = 1;
      const sql = `UPDATE songs SET name = ?, year = ?, duration = ?, image = ?, bandId = ?, stars = ? WHERE id = ?`;
  
      this.db.run(sql, [name, year, duration, image, bandId, stars, id], callback);
    }
  
    deleteSong(id, callback) {
      const sql = `DELETE FROM songs WHERE id = ?`;
  
      this.db.run(sql, id, callback);
    }
  }
  
  module.exports = (conn) => {
    return new SongsDAO(conn);
  };