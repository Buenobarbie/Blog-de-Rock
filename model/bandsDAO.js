class BandsDAO {
    constructor (conn) {
      this.db = conn;
    }
  
    findAll(callback) {
      this.db.all(`SELECT * FROM bands`, callback);
    }
  
    findById(id, callback) {
      this.db.get(`SELECT * FROM bands WHERE id = ?`, id, callback);
    }
  }
  
  module.exports = (conn) => {
    return new BandsDAO(conn);
  };