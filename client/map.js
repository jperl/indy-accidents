Template.map.rendered = function () {
    // Add data
    var accidents = Accidents.data();
    console.table(accidents);

    var geojson = _.map(accidents, function(accident){
        var feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [accident.lon, accident.lat]
            },
            "properties":{
                "title": accident.weather,
                "description": accidents.severity,
                "icon": {
                    "iconUrl": "http://www.kaffeewiki.de/images/4/4f/Gray_dot.png",
                    "iconSize": [8,8],
                    "className": "dot"                    
            } 
            }
        };

        if (accident.severity === Accidents.Severity.Fatal){
            feature.properties.icon.iconUrl = "http://fc-it.com.ar/images/dot4.png";
        } else if (accident.severity === Accidents.Severity.Injury){
            feature.properties.icon.iconUrl = "http://www.kaffeewiki.de/images/7/78/Red_dot.png";
        }

        return feature;
    });

    // Map
    var map = L.mapbox.map('map', 'indianapolis.basemap')
        .setView([40.6953767, -73.9492066], 11);

    var heat = L.heatLayer([], { maxZoom: 13 }).addTo(map);

    var myLayer = L.mapbox.featureLayer().addTo(map);

    myLayer.on('layeradd', function(e) {
        var marker= e.layer,
        feature=marker.feature;
        marker.setIcon(L.icon(feature.properties.icon));       
    });

    myLayer.setGeoJSON(geojson);

    myLayer.on('ready', function(){

        map.fitBounds(layer.getBounds());
        //layer.eachLayer(function(l) {
        //    heat.addLatLng(l.getLatLng());
        //});
    });


};