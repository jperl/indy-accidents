Template.filters.types = [
    // and few clouds
    'Clear',
    // scattered and broken
    'Clouds',
    // mist, shower rain, and rain
    'Rain',
    'Thunderstorm',
    'Snow',
    'No Injury',
    'Injury',
    'Fatality'
];

Template.filters.events({
    'click input': function (event) {
        // update the filters
        var inputs = $('.filter-ui').find('input');

        var weatherFilters = [], severityFilters = [];

        var index = 0;
        _.each(inputs, function (input) {
            if (input.checked) {
                // these are all weather filters
                if (index >= 0 && index < 5) {
                    weatherFilters.push(index);
                }

                // these are accident severity
                if (index >= 5) {
                    var severityType = index - 5;
                    severityFilters.push(severityType);
                }
            }

            index++;
        });

        var query = {
            weather: { $in: weatherFilters },
            severity: { $in: severityFilters }
        };

        Session.set('query', query);
    }
});

// Start with all filters on.
Session.set('query', {});

Meteor.startup(function () {

    // Update the subscription based on the filters.
    Deps.autorun(function () {
        if (!Session.get('mapReady')) return;

        var query = Session.get('query');
        Meteor.subscribe('accidents', query);
    });

});