/*global numbro */
'use strict';

angular.module('ngNumbro', [])
    .provider('$numbroConfig', function () {
        var formats = {};

        this.setFormat = function (name, format) {
            formats[name] = format;
        };

        this.setDefaultFormat = function (format) {
            numbro.defaultFormat(format);
        };

        this.setLanguage = function (lang, def) {
            numbro.language(lang, def);
        };

        this.setCurrentLanguage = function (lang) {
            numbro.language(lang);
        };

        this.$get = function () {
            return {
                customFormat: function (name) {
                    return formats[name] || name;
                }
            };
        };
    })
    .filter('numbro', function ($numbroConfig) {
        return function (input, format) {
            if (input == null) {
                return input;
            }

            format = $numbroConfig.customFormat(format);

            return numbro(input).format(format);
        };
    });
