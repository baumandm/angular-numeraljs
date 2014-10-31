window.require.define({"angular-numeraljs": function(exports, require, module) {
/**
 * AngularJS filter for Numeral.js: number formatting as a filter
 * @version v1.1.6 - 2014-10-30
 * @link https://github.com/baumandm/angular-numeraljs
 * @author Dave Bauman <baumandm@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
/*global numeral */
'use strict';

angular.module('ngNumeraljs', [])
    .provider('$numeraljsConfig', function () {
        var formats = new Map();

        this.setFormat = function(name, format) 
            {return formats.set(name, format)};

        this.setDefaultFormat = function(format) 
            {return numeral.defaultFormat(format)};

        this.setLanguage = function(lang, def) 
            {return numeral.language(lang, def)};

        this.setCurrentLanguage = function(lang) 
            {return numeral.language(lang)};

        this.$get = function()  {
            return {
                customFormat: function(name)  {return formats.get(name) || name}
            };
        };
    })
    .filter('numeraljs', ['$numeraljsConfig', function($numeraljsConfig)  {
        return function(input, format)  {
            if (input == null) {
                return input;
            }

            format = $numeraljsConfig.customFormat(format);

            return numeral(input).format(format);
        };
    }]);
}});

