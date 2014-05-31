/**
 * Populate weather observations from the openweathermap api.
 */
var populateFromApi = function (startDate, endDate) {
    // Page through weather data until we are past the end date.
    var pastEndDate = false;
    while (!pastEndDate) {
        console.log('loading', startDate);

        // Load the data from the api.
        var startUnix = startDate.getTime() / 1000;
        var apiUrl = 'http://api.openweathermap.org/data/2.5/history/city?q=indianapolis&type=hour&start='
            + startUnix + '&cnt=1000';

        var response = HTTP.get(apiUrl);

        if (response.statusCode !== 200) {
            console.error('Error loading weather data', startUnix, response);
            pastEndDate = true;
            return;
        }

        var content = JSON.parse(response.content);

        // Convert the response list to our observation format.
        var list = content.list,
            observations = [];

        list.forEach(function (item) {
            var description = item.weather[0].main;

            var type = Weather.Type.Clear;
            if (description === 'Clear' || description === 'Haze') {
                type = Weather.Type.Clear;
            } else if (description === 'Clouds' || description === 'Fog') {
                type = Weather.Type.Clouds;
            } else if (description === 'Mist' || description === 'Rain' || description === 'Drizzle') {
                type = Weather.Type.Rain;
            } else if (description === 'Thunderstorm') {
                type = Weather.Type.Thunderstorm;
            } else if (description === 'Snow') {
                type = Weather.Type.Snow;
            } else {
                console.log('not found', description);
            }

            var observation = {
                date: new Date(item.dt * 1000),
                type: type
            };

            observations.push(observation);
            WeatherObservations.insert(observation);
        });

        var nextStartDate;

        if (observations.length > 0) {
            // update the start date to the last observed date
            nextStartDate = _.last(observations).date;
        } else {
            console.log('No observations found on', startDate);
            nextStartDate = new Date(startDate);
            nextStartDate.setDate(nextStartDate.getDate() + 1);
        }

        // see if we are past the end date
        pastEndDate = nextStartDate > endDate;

        if (pastEndDate) {
            console.log('Past end date', 'start', nextStartDate, 'end', endDate);
        }

        startDate = nextStartDate;
    }
};