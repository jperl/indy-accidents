Template.map.rendered = function () {
    var map = L.mapbox.map('map', 'examples.map-i86nkdio')
        .setView([40, -74.50], 9);

    // Add data
    var accidents = Accidents.data();
    console.table(accidents);
};