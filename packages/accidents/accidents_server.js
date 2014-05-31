var fs = Npm.require('fs'),
    parse = Npm.require('csv-parse'),
    transform = Npm.require('stream-transform'),
    Fiber = Npm.require('fibers');

/**
 * Populate accidents from a csv.
 */
Accidents.populate = function (endDate) {
    var directory = process.cwd() + '/assets/packages/accidents/';
    var file = directory + '/accidents_2013.csv';

    // Create a read stream for the csv.
    var input = fs.createReadStream(file);

    // Transform the lines to accident records
    // and insert them to the accidents collection.
    var transformer = transform(function (record, callback) {
        var datePart = record[9], time = record[10], ordinal = record[1],
            dateStr= datePart.substring(0, 10) + ' ' + time + ' ' + ordinal,
            date = new Date(dateStr),
            injured = record[13], deaths = record[14],
            lat = record[26], lon = record[27];

//        console.log('date', date, 'time', time, ordinal, 'injured', injured,
//            'deaths', deaths, 'lat', lat, 'lon', lon);

        var severity = Accident.Severity.NoInjury;
        if (!!parseInt(deaths)) severity = Accident.Severity.Fatal;
        else if (!!parseInt(injured)) severity = Accident.Severity.Injury;

        var accident = {
            date: date,
            lat: lat,
            lon: lon,
            severity: severity
        };

        if (accident.date < endDate) {
            Fiber(function () {
                // Look up the weather by hour
                var hour = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0, 0, 0);

                var weather = WeatherObservations.findOne({
                    date: hour
                });

                if (!weather) {
                    console.log('Weather not found', hour);
                    return;
                }
                accident.weather = weather.type;

                Accidents.insert(accident);
            }).run();
        }

        callback(null);
    }, {parallel: 10});

    input.pipe(parse()).pipe(transformer);
};