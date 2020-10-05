function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Return the distance in meters between two GPS points expressed in degrees.
 * @param lat1 Latitude of the first GPS point
 * @param long1 Longitude of the first GPS point
 * @param lat2 Latitude of the second GPS point
 * @param long2 Longitude of the second GPS point
 * @returns {number} Distance between both GPS points
 */
function calculateDistance2PointsGPS(lat1, long1, lat2, long2) {
    const R = 6378.137;
    lat1 = degreesToRadians(lat1)
    long1 = degreesToRadians(long1)
    lat2 = degreesToRadians(lat2)
    long2 = degreesToRadians(long2)

    return (R * Math.acos(Math.sin(lat2) * Math.sin(lat1) + Math.cos(lat2) * Math.cos(lat1) * Math.cos(long2 - long1)));
}

/**
 * Return the distance in meters of the course given in parameters. The course is defined by an ordered array of GPS points.
 * @param activity The activity object containing GPS points
 * @returns {number} The distance of the course
 */

function calculatePathDistance(activity) {
    let distance = 0;
    for (let i = 0; i < activity.data.length - 1; i++) {
        distance += calculateDistance2PointsGPS(activity.data[i]['latitude'], activity.data[i]['longitude'], activity.data[i + 1]['latitude'], activity.data[i + 1]['longitude']);
    }

    return distance;
}

let activity = {}
activity.data = [
    {"time": "13:00:00", "cardio_frequency": 99, "latitude": 47.644795, "longitude": -2.776605, "altitude": 18},
    {"time": "13:00:05", "cardio_frequency": 100, "latitude": 47.646870, "longitude": -2.778911, "altitude": 18},
    {"time": "13:00:10", "cardio_frequency": 102, "latitude": 47.646197, "longitude": -2.780220, "altitude": 18},
    {"time": "13:00:15", "cardio_frequency": 100, "latitude": 47.646992, "longitude": -2.781068, "altitude": 17},
    {"time": "13:00:20", "cardio_frequency": 98, "latitude": 47.647867, "longitude": -2.781744, "altitude": 16},
    {"time": "13:00:25", "cardio_frequency": 103, "latitude": 47.648510, "longitude": -2.780145, "altitude": 16}
]

console.log(calculatePathDistance(activity))
