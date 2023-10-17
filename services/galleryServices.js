const { nanoid } = require("nanoid");
const util = require("util");
const { connection } = require("../DB/dbConnection");

exports.addGallery = async (data) => {
  const query = util.promisify(connection.query).bind(connection);

  const values = data.map(({ id, image, season }) => [id, image, season]);
  const sql = "INSERT INTO gallery (id, image, season) VALUES ?";

  return await query(sql, [values]);
};

exports.getAllGallery = async (season) => {
  const query = util.promisify(connection.query).bind(connection);
  return await query("SELECT * FROM gallery WHERE season = ?", [season]);
};

exports.deleteImage = async (id) => {
  const query = util.promisify(connection.query).bind(connection);
  return await query("DELETE FROM gallery WHERE id =?", [id]);
};

exports.getImage = async (id) => {
  const query = util.promisify(connection.query).bind(connection);
  return await query("SELECT * FROM gallery WHERE id =?", [id]);
};
