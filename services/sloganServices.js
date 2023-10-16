const util = require("util");
const { connection } = require("../DB/dbConnection");

exports.addSlogan = async (data) => {
  const query = util.promisify(connection.query).bind(connection);
  return await query("INSERT INTO slogan SET ? ", [data]);
};

exports.getAllSlogan = async () => {
  const query = util.promisify(connection.query).bind(connection);
  return await query("SELECT * FROM slogan");
};

exports.getActiveSlogan = async () => {
  const query = util.promisify(connection.query).bind(connection);
  return await query("SELECT * FROM slogan WHERE active = 1");
};

exports.activateSlogan = async (id) => {
  const query = util.promisify(connection.query).bind(connection);
  const active = await query("SELECT active FROM slogan WHERE id =?", [id]);
  let data;
  if (active[0].active) data = 0;
  else data = 1;
  return await query("UPDATE slogan SET active = ? WHERE id =?", [data, id]);
};
