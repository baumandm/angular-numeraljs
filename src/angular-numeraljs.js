/*global numeral */
'use strict';

angular.module('ngNumeraljs', [])
    .provider('$numeraljsConfig', function () {
        var formats = {};

        this.setFormat = function (name, format) {
            formats[name] = format;
        };

        this.setDefaultFormat = function (format) {
            numeral.defaultFormat(format);
        };

        this.setLanguage = function (lang, def) {
            numeral.language(lang, def);
        };

        this.setCurrentLanguage = function (lang) {
            numeral.language(lang);
        };

        this.$get = function () {
            return {
                format: function (name) {
                    return formats[name] || name;
                }
            };
        };
    })
    .filter('numeraljs', function ($numeraljsConfig) {
        return function (input, format) {
            if (!input || !format) {
                return input;
            }

            format = $numeraljsConfig.format(format);

            return numeral(input).format(format);
        };
    });
