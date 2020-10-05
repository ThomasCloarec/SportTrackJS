const user_dao = require('./sport-track-db').user_dao;
const db = require('./sport-track-db').db_connection;

class Activity {
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


user_dao.deleteAll()
user_dao.insert(new Activity("testglai.com", "John", "Doe", null, "Homme", 180, 80, "Test"), null);

activity = new Activity("a@a.com", "John", "Doe", null, "Homme", 180, 80, "Test")
user_dao.insert(activity, null);

activity.firstName = "Dang";
activity.lastName = "Ding";
user_dao.update(activity.email, activity, null)
console.log(user_dao.findAll())
