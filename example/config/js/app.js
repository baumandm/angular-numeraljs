var app = angular.module('exampleApp', ['ngNumeraljs']);

app.config(['$numeraljsConfigProvider', function ($numeraljsConfigProvider) {
    var locale = {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '€'
        }
    };

    $numeraljsConfigProvider.defaultFormat('0,0.00');

    // Add some named formats
    $numeraljsConfigProvider.namedFormat('currency', '$ 0,0.00');
    $numeraljsConfigProvider.namedFormat('currencySuffix', '0,0.00 $');
    $numeraljsConfigProvider.namedFormat('number', '0.00');

    // Custom locale
    $numeraljsConfigProvider.register('locale', 'de', locale);
    $numeraljsConfigProvider.locale('de');
}]);

app.controller('numeralExample', function ($scope) {
    $scope.formats = [{
        name: 'Default Format',
    }, {
        name: 'Number',
        format: '0,0'
    }, {
        name: 'Currency',
        format: '$0,0.00'
    },{
        name: 'Bytes',
        format: '0b'
    }, {
        name: 'Percentages',
        format: '0.0%'
    }, {
        name: 'Time',
        format: '00:00:00'
    }];
});
