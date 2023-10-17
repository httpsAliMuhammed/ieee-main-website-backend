const util = require("util");
const { connection } = require("../DB/dbConnection");

exports.addGallery = async (data) => {
  const query = util.promisify(connection.query).bind(connection);
  return await query("INSERT INTO gallery SET?", [data]);
};
