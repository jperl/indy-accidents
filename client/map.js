Map = {};

var map, layer, latLngs = {};

Template.map.rendered = function () {
    // Initialize the map
    map = L.mapbox.map('map', 'indianapolis.basemap')
        .setView([39.7974122, -86.150761], 11);

    layer = L.heatLayer([], {
        opacity: 0.2,
        radius: 15,
        blur: 15,
        gradient: {
            0.35: "rgb(0,0,255)", //blue
            0.45: "rgb(0,255,255)", //shiny green
            0.55: "rgb(0,255,0)", //green
            0.85: "yellow",
            0.95: "rgb(255,0,0)" //red
        },
        maxZoom: 13
    });

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

