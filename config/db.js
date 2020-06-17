const sql = require("mysql");
const dbConfig = require('./db.config');

const connection = sql.createConnection(dbConfig);

connection.connect(error => {
    if(error) throw error;
    console.log("Good job champ! I'm proud of you!")
});

module.exports = connection;