/**
 * AngularJS filter for Numeral.js: number formatting as a filter
 * @version v0.1.0 - 2013-11-09
 * @link 
 * @author Dave Bauman <baumandm@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
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
