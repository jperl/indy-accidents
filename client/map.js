Map = {};

var map, layer, latLngs = {};

Template.map.rendered = function () {
    // Initialize the map
    map = L.mapbox.map('map', 'indianapolis.basemap')
        .setView([39.17744827, -86.55998992], 11);

    layer = L.heatLayer([], { maxZoom: 12 });
    map.addLayer(layer);

    // Add the accidents as markers on the map.
    Accidents.find().observe({
        added: function (accident) {
            var latLng = latLngs[accident._id] = L.latLng(accident.lat, accident.lon);
            layer.addLatLng(latLng);
        },
        removed: function (accident) {
            var index = layer._latlngs.indexOf(latLngs[accident._id]);
            layer._latlngs.splice(index, 1);
            layer.redraw();

            delete latLngs[accident._id];
        }
    });

    Session.set('mapReady', true);
};

