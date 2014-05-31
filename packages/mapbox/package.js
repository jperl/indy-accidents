Package.on_use(function (api) {
    api.add_files([
        'mapbox.js',
        'leaflet-heat.js'
//        'MarkerCluster.css', 'MarkerCluster.Default.css',
//        'leaflet.markercluster.js'
    ], 'client');
});