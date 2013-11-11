/*global numeral */
'use strict';
angular.module('ngNumeraljs', [])
    .filter('numeraljs', function () {
        return function (input, format) {
            if (input == null || format == null) 
                return input;
            if (format === '') 
                return '';
            
            return numeral(input).format(format);
        };
    });
