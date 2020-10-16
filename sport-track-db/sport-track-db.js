const db_connection = require('./sqlite_connection');
const user_dao = require('./user_dao');
const activity_dao = require('./activity_dao');
const activity_entry_dao = require('./activity_entry_dao');

module.exports = {
    db: db_connection,
    user_dao: user_dao,
    activity_dao: activity_dao,
    activity_entry_dao: activity_entry_dao
};