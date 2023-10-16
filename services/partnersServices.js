const util = require("util");
const { connection } = require("../DB/dbConnection");

exports.addPartner = async (data) => {
  const query = util.promisify(connection.query).bind(connection);
  return await query("INSERT INTO partners SET?", [data]);
};

exports.getpartners = async () => {
  const query = util.promisify(connection.query).bind(connection);
  return await query("SELECT * FROM partners");
};

exports.updatePartner = async (data, id) => {
  const query = util.promisify(connection.query).bind(connection);
  return await query("UPDATE partners SET? WHERE id=?", [data, id]);
};

exports.getpartner = async (id) => {
  const query = util.promisify(connection.query).bind(connection);
  return await query("SELECT * FROM partners WHERE id=?", [id]);
};

exports.deletePartner = async (id) => {
  const query = util.promisify(connection.query).bind(connection);
  return await query("DELETE FROM partners WHERE id=?", [id]);
};
