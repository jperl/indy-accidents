Meteor.startup(function () {
    var startDate = new Date('1/1/2013'),
        endDate = new Date('2/1/2013');

    // If the weather observation collection is empty
    // populate 2013 from the openweathermap api.
    if (!WeatherObservations.findOne()) Weather.populate(startDate, endDate);

    // If the accident collection is empty
    // populate it from the csv data.
    if (!Accidents.findOne()) Accidents.populate(endDate);
});