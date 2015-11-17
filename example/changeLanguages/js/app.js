var app = angular.module('exampleApp', ['ngNumeraljs']);

app.config(['$numeraljsConfigProvider', function ($numeraljsConfigProvider) {
    // Load some additional languages
    $numeraljsConfigProvider.setLanguage('fr', {
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
        ordinal : function (number) {
            return number === 1 ? 'er' : 'ème';
        },
        currency: {
            symbol: '€'
        }
    });

    $numeraljsConfigProvider.setLanguage('de', {
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
    });

    $numeraljsConfigProvider.setCurrentLanguage('en');
}]);

app.controller('numeralExample', function ($scope, $numeraljsConfig) {
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

    $scope.currentLanguage = 'en';

    $scope.$watch('currentLanguage', function (language) {
        $numeraljsConfig.setCurrentLanguage(language);
    });


    $scope.defaultFormat = null;

    $scope.$watch('defaultFormat', function (format) {
        if (format == null) return;
        $numeraljsConfig.setDefaultFormat(format);
    });
});