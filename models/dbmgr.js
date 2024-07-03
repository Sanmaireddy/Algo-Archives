const { OPEN_READWRITE } = require("sqlite3");
const sql = require("sqlite3").verbose();
const path = require("node:path");

const db = new sql.Database("./database.db", OPEN_READWRITE, (err) => {
  if (err) {
    console.log("Error Occured while connecting to Database");
    console.log(err);
  } else {
    console.log("Connected to Database");
  }
});

const getIdx = async () => {
  return new Promise((res, rej) => {
    let qry = "SELECT COUNT (*) FROM test as count";

    db.all(qry, [], (err, rows) => {
      if (err) {
        console.log("Error at getIdx");
        return rej(err);
      }
      res(rows);
    });
  });
};

// console.log(idx.count);

const names = async () => {
  return new Promise((res, rej) => {
    let qry = "SELECT * FROM test";

    db.all(qry, [], (err, rows) => {
      if (err) {
        console.log("Error at db");
        return rej(err);
      }
      res(rows);
    });
  });
};

const addNames = async (name) => {
  console.log(name);
  try {
    let idx = await getIdx();
    idx = idx[0]["COUNT (*)"] + 1;
    return new Promise((res, rej) => {
      let qry = `INSERT INTO test VALUES (${idx},'${name}')`;
      db.run(qry, [], (err) => {
        if (err) {
          return console.log(err.message);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { names, addNames };
