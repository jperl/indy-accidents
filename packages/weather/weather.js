Weather = {};

WeatherObservations = new Meteor.Collection('weather-observations');

Weather.Type = {
    Clear: 0, // and few clouds
    Clouds: 1, // scattered and broken
    Rain: 2, // mist, shower rain, and rain
    Thunderstorm: 3,
    Snow: 4
};