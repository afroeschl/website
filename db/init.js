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
    vote INTEGER DEFAULT 0,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`);

  // Cretae vites table
  db.run(`CREATE TABLE IF NOT EXISTS votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  chat_id INTEGER NOT NULL,
  vote INTEGER NOT NULL,
  UNIQUE(user_id, chat_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE
)`);

  // Insert users
  const password = "defaultPassword";
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return console.error(err);

    db.run("INSERT OR IGNORE INTO users (username, hashedPassword) VALUES (?, ?)", ["defaultUser", hash], function(err) {
      if (err) console.error(err);
      else console.log("Default user created or already exists.");
      
      const adminHash = "$2b$10$J8smB1ZKo7Ts9SkhBfe7GO5xOiVL.fojpWp9eEiZmbnJfBsFdbYNq";

      db.run("INSERT OR IGNORE INTO users (username, hashedPassword) VALUES (?, ?)", ["admin", adminHash], function(err) {
        if (err) console.error(err);
        else console.log("Admin user created or already exists.");

        db.close((err) => {
          if (err) console.error("Error closing database:", err);
          else console.log("Database connection closed.");
        });
      });
    });
  });
});

