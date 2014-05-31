Accidents = {};

Accidents.Severity = {
    NoInjury: 0,
    Injury: 1,
    Fatal: 2
};

Accidents.data = function () {
    return [
        {
            lat: 40.6953767,
            lon: -73.9492066,
            weather: Weather.Type.Clear,
            severity: Accidents.Severity.NoInjury
        }
    ];
};