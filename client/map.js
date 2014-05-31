Meteor.subscribe('accidents');

var map, layer;
Template.map.rendered = function () {
    // Initialize the map
    map = L.mapbox.map('map', 'indianapolis.basemap')
        .setView([39.17744827, -86.55998992], 11);

    addHeatmap();
};

// Add a heatmap based on the current filter.
var addHeatmap = function () {
    // Remove the existing layers.
    if (layer) {
        map.removeLayer(layer);
    }

    layer = L.heatLayer([], { maxZoom: 12 });
    map.addLayer(layer);

    // Add the accidents as markers on the map.
    Accidents.find().observe({
        added: function (accident) {
            var position = L.latLng(accident.lat, accident.lon);
            layer.addLatLng(position);

            // make sure the lat / lon are valid
//            markers.addLayer(accidentToMarker(accident));
        }
    });
};