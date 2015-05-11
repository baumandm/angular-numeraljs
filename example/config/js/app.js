var app = angular.module('exampleApp', ['ngNumbro']);

app.config(['$numbroConfigProvider', function ($numbroConfigProvider) {
    var language = {
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

    $numbroConfigProvider.setDefaultFormat('0,0.00');

    $numbroConfigProvider.setFormat('currency', '$ 0,0.00');
    $numbroConfigProvider.setFormat('currencySuffix', '0,0.00 $');
    $numbroConfigProvider.setFormat('number', '0.00');
    $numbroConfigProvider.setLanguage('de', language);

    $numbroConfigProvider.setCurrentLanguage('de');
}]);

app.controller('numbroExample', function ($scope) {
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