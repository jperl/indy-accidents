Package.on_use(function (api) {
    Npm.depends({
        'csv-parse': '0.0.4',
        'stream-transform': '0.0.2'
    });

    api.use('weather');

    api.add_files('accidents_2013.csv', 'server', { isAsset: true });

    api.add_files('accidents.js', ['client', 'server']);
    api.add_files('accidents_server.js', 'server');

    api.export(['Accident', 'Accidents']);
});