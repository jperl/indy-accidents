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
    }).setView([49.25044, -123.137], 13);

    L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);
};