const user_dao = require('./sport-track-db').user_dao;
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

user_dao.deleteAll(value => console.log(value))
user_dao.insert(new Sportsman("testglai.com", "John", "Doe", null, "Homme", 180, 80, "Test"), value => console.log(value));

activity = new Sportsman("a@a.com", "John", "Doe", null, "Homme", 180, 80, "Test")
user_dao.insert(activity, value => console.log(value));

activity.firstName = "Dang";
activity.lastName = "Ding";
user_dao.update(activity.email, activity, value => console.log(value))
user_dao.findAll(value => console.log(value))

// Test Activity


// Test ActivityEntry
