/*global numeral */
'use strict';
angular.module('ngNumeraljs', [])
    .filter('numeraljs', function () {
        return function (input, format, language) {
            if (input == null || format == null) 
                return input;
            if (format === '') 
                return '';
            if (language != null)
                numeral.language(language);

            
            return numeral(input).format(format);
        };
    });
