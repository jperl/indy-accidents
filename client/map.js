// Convert an accident to a leaflet marker
var accidentToMarker = function (accident) {
    var iconOpts = {
        iconUrl: 'http://www.kaffeewiki.de/images/4/4f/Gray_dot.png',
        iconSize: [8, 8],
        className: 'dot'
    };
    if (accident.severity === Accident.Severity.Fatal) {
        iconOpts.iconUrl = 'http://fc-it.com.ar/images/dot4.png';
    } else if (accident.severity === Accident.Severity.Injury) {
        iconOpts.iconUrl = 'http://www.kaffeewiki.de/images/7/78/Red_dot.png';
    }

    var marker = L.marker([accident.lat, accident.lon], {
        icon: L.mapbox.marker.icon(iconOpts)
    });

    return marker;
};

Meteor.subscribe('accidents');

Template.map.rendered = function () {
    // Initialize the map
    var map = L.mapbox.map('map', 'indianapolis.basemap')
        .setView([39.17744827, -86.55998992], 11);

    var layer = L.mapbox.featureLayer().addTo(map);

    layer.on('layeradd', function (e) {
        var marker = e.layer, feature = marker.feature;

        marker.setIcon(L.icon(feature.properties.icon));
    });

    // Add the accidents as markers on the map.
    Accidents.find().observe({
        added: function (accident) {
            // make sure the lat / lon are valid
            markers.addLayer(accidentToMarker(accident));
        }
    });

    var markers = new L.MarkerClusterGroup();
    map.addLayer(markers);

    layer.on('ready', function () {
        map.fitBounds(layer.getBounds());
    });
};