const Database = require("better-sqlite3")

const db = new Database("library.db")

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `).run()
db.prepare(`
    INSERT OR IGNORE INTO users (email, name, password, role) VALUES ('alice@example.com', 'admin', '$2b$10$HbiZlm7tv8YwDeZ7Vu7ndO/ZenY/UPcR6ZowP/xiT/S8qwf1YEaTi', 'admin' )
    `).run()

db.prepare(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    year INTEGER NOT NULL,
    genre TEXT NOT NULL,
    description TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`).run()



    module.exports = db