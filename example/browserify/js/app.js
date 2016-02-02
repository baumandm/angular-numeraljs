'use strict';

/* Include Angular via Browserify */
require('angular/angular');
require('angular-numeraljs/dist/angular-numeraljs');

var app = angular.module('exampleApp', ['ngNumeraljs']);

app.config(['$numeraljsConfigProvider', function ($numeraljsConfigProvider) {

    $numeraljsConfigProvider.setDefaultFormat('0,0.00');

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
