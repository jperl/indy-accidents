// Resize the map based on the window size
var resizeMap = function () {
    $(window).resize(function () {
        $('#map').css('height', window.innerHeight - 82 - 45);
    });

    $(window).resize();
};

Template.map.rendered = function () {
    resizeMap();

    // Initialize the map
    L.Icon.Default.imagePath = 'packages/leaflet/images';

    var map = L.map('map', {
        doubleClickZoom: false
    }).setView([40.6953767, -73.9492066], 13);

    L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);

    // Add data

    var accidents = Accidents.data();
    console.table(accidents);
};