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
    .filter('numeraljs', function($numeraljsConfig)  {
        return function(input, format)  {
            if (input == null) {
                return input;
            }

            format = $numeraljsConfig.customFormat(format);

            return numeral(input).format(format);
        };
    });
