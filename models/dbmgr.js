const { OPEN_READWRITE } = require("sqlite3");
const sql = require("sqlite3").verbose();
const path = require("node:path");
const { platform } = require("node:os");
const { error } = require("node:console");

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

const getFolders = async () => {
  try {
    let qry = "SELECT * FROM folderNames;";
    return new Promise((res, rej) => {
      db.all(qry, [], (err, rows) => {
        if (err) {
          console.log("Error at getFloders");
        }
        res(rows);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const getPlatformNames = async () => {
  try {
    let qry = "SELECT * FROM platformNames;";
    return new Promise((res, rej) => {
      db.all(qry, [], (err, rows) => {
        if (err) {
          console.log("Error at getFloders");
        }
        res(rows);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const addPlatform = async (newPlatform) => {
  let qry = "INSERT INTO platformNames (Name) VALUES (?)";
  return new Promise((res, rej) => {
    db.run(qry, [newPlatform], (err) => {
      if (err) {
        rej(err);
      } else {
        res({ success: true });
      }
    });
  });
};

const createNewPlatformTable = async (newPlatform) => {
  let qry =
    "CREATE TABLE " +
    newPlatform +
    " ( QId TEXT PRIMARY KEY, Rating INT, TAGS TEXT, Note TEXT, Status INTEGER);";
  return new Promise((res, rej) => {
    db.run(qry, [], (err) => {
      if (err) {
        rej(err);
      } else {
        res({ success: true });
      }
    });
  });
};

const handleAddPlatform = async (event, newPlatform) => {
  try {
    let resp = await addPlatform(newPlatform);
    if (!resp.success) {
      return { error: "error at adding", success: false };
    }
    resp = await createNewPlatformTable(newPlatform);
    if (!resp.success) {
      return { error: "error at creating table", success: false };
    }
    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

const getNotesFromPlatformTable = async (event, platform) => {
  try {
    let qry = "SELECT * FROM " + platform + ";";
    return new Promise((res, rej) => {
      db.all(qry, [], (err, rows) => {
        if (err) {
          console.log("Error at getFloders");
        }
        res(rows);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const addNoteToPlatformTable = async (event, note) => {
  try {
    let qry =
      "INSERT INTO " +
      note.platform +
      "(QId,Rating,TAGS,Note,Status) VALUES (?,?,?,?,?)";
    return new Promise((res, rej) => {
      db.run(
        qry,
        [note.id, note.rating, note.tag, note.takeaway, note.status],
        (err) => {
          if (err) {
            rej(err);
          } else {
            res({ success: true });
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  names,
  addNames,
  getFolders,
  getPlatformNames,
  handleAddPlatform,
  addNoteToPlatformTable,
  getNotesFromPlatformTable,
};
