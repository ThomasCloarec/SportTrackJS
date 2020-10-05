const sqlite3 = require('sqlite3').verbose();
const dbPath = 'sport_track.db';
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the sport track database.');
});

module.exports = db;