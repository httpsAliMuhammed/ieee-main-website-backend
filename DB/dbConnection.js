const mysql = require("mysql");

const db_config = {
  host: "bu7pwiseomqlj8q2z27r-mysql.services.clever-cloud.com",
  user: "u7erhncpp6jjeade",
  password: "H2N3xKoP8lzwGiMwKKEe",
  database: "bu7pwiseomqlj8q2z27r",
  port: "3306",
};


function handleDisconnect() {
    connection = mysql.createConnection({
      host: "bu7pwiseomqlj8q2z27r-mysql.services.clever-cloud.com",
      user: "u7erhncpp6jjeade",
      password: "H2N3xKoP8lzwGiMwKKEe",
      database: "bu7pwiseomqlj8q2z27r",
      port: "3306",
    });
    connection.connect((err) => {
      if (err) throw err;
      console.log("DB CONNECTED");
    });
  
    connection.on("error", function (err) {
      console.log("db error", err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        handleDisconnect();
      } else {
        throw err;
      }
    });
  }
  
  handleDisconnect();
  module.exports = { connection };
  