Package.on_use(function (api) {
    api.use('underscore');
    api.use('http', 'server');

    api.add_files('weather.js', ['client', 'server']);
    api.add_files('weather_server.js', 'server');

    api.export(['Weather', 'WeatherObservations']);
});