const util = require("util");
const { connection } = require("../DB/dbConnection");

exports.addTestimonial = async (data) => {
    const query = util.promisify(connection.query).bind(connection);
    return await query("INSERT INTO testimonials SET ? ", [data]);
  };
  
  exports.getAllTestimonial = async () => {
    const query = util.promisify(connection.query).bind(connection);
    return await query("SELECT * FROM testimonials");
  };
  exports.updateTestimonial = async (data, id) => {
    const query = util.promisify(connection.query).bind(connection);
    return await query("UPDATE testimonials SET? WHERE id=?", [data, id]);
  };
  
  exports.getSingleTestimonial = async (id) => {
    const query = util.promisify(connection.query).bind(connection);
    return await query("SELECT * FROM testimonials WHERE id=?", [id]);
  };
  
  exports.deleteTestimonial = async (id) => {
    const query = util.promisify(connection.query).bind(connection);
    return await query("DELETE FROM testimonials WHERE id=?", [id]);
  };