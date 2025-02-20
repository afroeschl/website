const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("DB error:", err);
  } else {
    console.log("Database opened successfully.");
  }
});

db.serialize(() => {
  // Create users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    hashedPassword TEXT NOT NULL
  )`);

  // Create chats table
  db.run(`CREATE TABLE IF NOT EXISTS chats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`);

  // Insert a sample user
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

