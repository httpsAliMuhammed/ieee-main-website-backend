const util = require("util");
const { connection } = require("../DB/dbConnection");

exports.getEmail = async (email) => {
  const query = util.promisify(connection.query).bind(connection);
  return await query("SELECT email FROM family WHERE email = ?", [email]);
};

exports.insertPerson = async (person) => {
  const query = util.promisify(connection.query).bind(connection);
  return await query("INSERT INTO family SET ?", [person]);
};
