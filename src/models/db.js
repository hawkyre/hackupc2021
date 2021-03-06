const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

let db = false;

export default async function getDB() {
  if (!db) {
    db = await sqlite.open({
      filename: "./db.sqlite",
      driver: sqlite3.Database,
    });
  }
  return db;
}
