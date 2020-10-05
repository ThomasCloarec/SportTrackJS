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
        this.sportsman = sportsman;
        this.day = day;
        this.description = description;
        this.totalDistance = totalDistance;
    }
}

class ActivityEntry {
    constructor(activity, timeD, cardioFrequency, latitude, longitude, altitude) {
        this.activity =  activity;
        this.timeD = timeD;
        this.cardioFrequency = cardioFrequency;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
    }
}

// Test Sportsman

user_dao.deleteAll()
user_dao.insert(new Sportsman("testglai.com", "John", "Doe", null, "Homme", 180, 80, "Test"), null);

sportsman = new Sportsman("a@a.com", "John", "Doe", null, "Homme", 180, 80, "Test")
user_dao.insert(sportsman, null);

sportsman.firstName = "Ding";
sportsman.lastName = "Dong";
user_dao.update(activity.email, sportsman, null)
console.log(user_dao.findAll())

// Test Activity

activity_dao.deleteAll()
activity = new Activity("a@a.com", "19/07/2020", "IUT->RU", "250");
activity_dao.insert(activity, null);

activity.sportsman = "testglai.com";
activity.update()


// Test ActivityEntry
