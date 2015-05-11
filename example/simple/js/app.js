var app = angular.module('exampleApp', ['ngNumbro']);

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