window.require.define({
    'angular-numbro': function(exports, require, module) {
        /**
         * AngularJS filter for Numbro.js: number formatting as a filter
         * @version v1.1.7 - 2015-05-11
         * @link https://github.com/robertbaker/angular-numbro
         * @author Dave Bauman <baumandm@gmail.com>
         * @author Robert Baker
         * @license MIT License, http://www.opensource.org/licenses/MIT
         */
        /*global numbro */
        'use strict';

        angular.module('ngNumbro', [])
            .provider('$numbroConfig', function() {
                var formats = {};

                this.setFormat = function(name, format) {
                    formats[name] = format;
                };

                this.setDefaultFormat = function(format) {
                    numbro.defaultFormat(format);
                };

                this.setDefaultCurrencyFormat = function(format) {
                    numbro.defaultCurrencyFormat(format);
                };

                this.setLanguage = function(lang, def) {
                    numbro.language(lang, def);
                };

                this.setCurrentLanguage = function(lang) {
                    numbro.language(lang);
                };

                this.$get = function() {
                    return {
                        customFormat: function(name) {
                            return formats[name] || name;
                        }
                    };
                };
            })
            .filter('numbro', ['$numbroConfig', function($numbroConfig) {
                return function(input, format) {
                    if (input == null) {
                        return input;
                    }

                    format = $numbroConfig.customFormat(format);

                    return numbro(input).format(format);
                };
            }]);
    }
});
