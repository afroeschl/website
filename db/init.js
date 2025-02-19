const path = require('path');
const dbPath = path.join(__dirname, 'database.db');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("DB error:", err);
  } else {
    console.log("Database opened successfully.");
  }
});


db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    hashedPassword TEXT NOT NULL
  )`);

  // Insert a sample user (adjust username/password as needed)
  const bcrypt = require('bcrypt');
  const password = "1234";
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return console.error(err);
    db.run("INSERT OR IGNORE INTO users (username, hashedPassword) VALUES (?, ?)", ["admin", hash], function(err) {
      if (err) console.error(err);
      else console.log("User created or already exists.");
      db.close();
    });
  });
});

