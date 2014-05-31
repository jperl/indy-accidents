Accidents = new Meteor.Collection('accidents');

Accident = {};

Accident.Severity = {
    NoInjury: 0,
    Injury: 1,
    Fatal: 2
};

Accident.data = function () {
    return Accidents.find();
};

Accident.mockData = [
    {
        lat: 40.6953767,
        lon: -73.9492066,
        weather: Weather.Type.Clear,
        severity: Accident.Severity.NoInjury
    },
    {
        lat: 40.7754808,
        lon: -73.9802034,
        weather: Weather.Type.Rain,
        severity: Accident.Severity.Injury
    },
    {
        lat: 40.7006658,
        lon: -73.8960971,
        weather: Weather.Type.Snow,
        severity: Accident.Severity.Fatal
    },
    {
        lat: 40.5621305,
        lon: -74.1334081,
        weather: Weather.Type.Snow,
        severity: Accident.Severity.Fatal
    },
    {
        lat: 40.7442447,
        lon: -73.8295324,
        weather: Weather.Type.Snow,
        severity: Accident.Severity.NoInjury
    },
    {
        lat: 40.6656299,
        lon: -73.7392073,
        weather: Weather.Type.Rain,
        severity: Accident.Severity.Injury
    },
    {
        lat: 40.6488983,
        lon: -73.9696713,
        weather: Weather.Type.Clear,
        severity: Accident.Severity.Fatal
    },
    {
        lat: 40.6666971,
        lon: -73.7671284,
        weather: Weather.Type.Clear,
        severity: Accident.Severity.Injury
    }
];