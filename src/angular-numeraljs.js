/*global numeral */
'use strict';

angular.module('ngNumeraljs', [])
    .filter('numeraljs', function () {
        return function (input, format, language) {
            if (!input || !format) {
                return input;
            }

            if (!format) {
                return '';
            }

            if (language) {
                numeral.language(language);
            }

            return numeral(input).format(format);
        };
    });
