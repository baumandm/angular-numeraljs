/*global numeral */
'use strict';

angular.module('ngNumeraljs', [])
    .provider('$numeraljsConfig', function () {
        const formats = new Map();

        this.setFormat = (name, format) =>
            formats.set(name, format);

        this.setDefaultFormat = (format) =>
            numeral.defaultFormat(format);

        this.setLanguage = (lang, def) =>
            numeral.language(lang, def);

        this.setCurrentLanguage = (lang) =>
            numeral.language(lang);

        this.$get = () => {
            return {
                customFormat: (name) => formats.get(name) || name
            };
        };
    })
    .filter('numeraljs', ($numeraljsConfig) => {
        return (input, format) => {
            if (input == null) {
                return input;
            }

            format = $numeraljsConfig.customFormat(format);

            return numeral(input).format(format);
        };
    });
