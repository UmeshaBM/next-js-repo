const mysql = require("mysql2");

async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  });
  return connection;
}

export { connectToDatabase };
