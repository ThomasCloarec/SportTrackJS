const user_dao = require('./sport-track-db').user_dao;
const activity_dao = require('./sport-track-db').activity_dao;
const activity_entry_dao = require('./sport-track-db').activity_entry_dao;
const db = require('./sport-track-db').db_connection;

class Sportsman {
    constructor(email, firstName, lastName, birthday, gender, height, weight, pwd) {
        this.email =  email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.pwd = pwd;
    }
}

class Activity {
    constructor(sportsman, day, description, totalDistance) {
        this.idActivity = null
        this.sportsman = sportsman;
        this.date = day;
        this.description = description;
        this.totalDistance = totalDistance;
    }
}

class ActivityEntry {
    constructor(activity, timeD, cardioFrequency, latitude, longitude, altitude) {
        this.idActivityEntry = null
        this.activity =  activity;
        this.time = timeD;
        this.cardio_frequency = cardioFrequency;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
    }
}

// Test Sportsman

// user_dao.insert(new Sportsman("testglai.com", "John", "Doe", null, "Homme", 180, 80, "Test"), (error, value) => console.log(value));
//
// const sportsman = new Sportsman("a@a.com", "Hehe", "Doe", null, "Homme", 180, 80, "Test")
// user_dao.insert(sportsman, (error, value) => console.log(value));
//
// sportsman.firstName = "Dang";
// sportsman.lastName = "Ding";
// user_dao.update(sportsman.email, sportsman, (error, value) => console.log(value))
// // user_dao.findAll((error, rows) => console.log(rows))


// Test Activity
// activity_dao.deleteAll(() => {})
// activity_entry_dao.deleteAll(() => {})
//
const activity = new Activity("a@a.com", "19/07/2020", "IUT->RU", 250);
activity_dao.insert(activity, (error, value) => {
    activity_entry_dao.insertAll([new ActivityEntry(value, '13:00:15', 100, 47, -2, 17),
        new ActivityEntry(value, '13:00:38', 90, 46, -1, 17)], (error, value) => console.log(value))
});



activity_dao.findAll((error, rows) => {console.log(rows)})


activity_entry_dao.findAll((error, rows) => {console.log(rows)})






// Test ActivityEntry
