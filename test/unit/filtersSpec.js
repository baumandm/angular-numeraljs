/*global module, inject, beforeEach, expect, describe, it */
'use strict';

describe('numbro filter', function () {

    var numbroFilter;

    beforeEach(module('ngNumbro'));

    describe('without configuration', function () {
        beforeEach(inject(function ($filter) {
            numbroFilter = $filter('numbro');
        }));

        it('should return the default formatted value if format is missing', function () {
            /* Default numbro.js format is '0,0' */
            expect(numbroFilter('1234567890')).toEqual('1,234,567,890');
            expect(numbroFilter('12345', null)).toEqual('12,345');
        });

        it('should return value if value is null or undefined', function () {
            expect(numbroFilter(undefined, '0%')).toEqual(undefined);
            expect(numbroFilter(null)).toEqual(null);
            expect(numbroFilter(null, '0.0')).toEqual(null);
        });

        it('should format strings as numbers', function () {
            expect(numbroFilter('1024.34', '0.0')).toEqual('1024.3');
            expect(numbroFilter('1024.38', '0.0')).toEqual('1024.4');
            expect(numbroFilter('34039.1', '0,0.00')).toEqual('34,039.10');
            expect(numbroFilter('-0.23', '(.000)')).toEqual('(.230)');
            expect(numbroFilter('1230974', '0.0a')).toEqual('1.2m');
        });

        it('should format zeros as numbers', function () {
            expect(numbroFilter(0, '0,0')).toEqual('0');
            expect(numbroFilter(0, '0.0')).toEqual('0.0');
            expect(numbroFilter(0, '$0.00')).toEqual('$0.00');
        });

        it('should format numbers as numbers', function () {
            expect(numbroFilter(1024.34, '0.0')).toEqual('1024.3');
            expect(numbroFilter(1024.38, '0.0')).toEqual('1024.4');
            expect(numbroFilter(34039.1, '0,0.00')).toEqual('34,039.10');
            expect(numbroFilter(-0.23, '(.000)')).toEqual('(.230)');
            expect(numbroFilter(1230974, '0.0a')).toEqual('1.2m');
        });

        it('should format strings as currency', function () {
            expect(numbroFilter('1024.34', '$0.0')).toEqual('$1024.3');
            expect(numbroFilter('-1024.38', '($ 0.0)')).toEqual('($ 1024.4)');
        });

        it('should format strings as bytes', function () {
            expect(numbroFilter('2048', '0b')).toEqual('2KB');
            expect(numbroFilter('3467479682787', '0.00b')).toEqual('3.15TB');
        });
    });

    describe('with configuration', function () {
        describe('when setting format string', function () {
            beforeEach(module('ngNumbro', function ($numbroConfigProvider) {
                $numbroConfigProvider.setFormat('currency', '$ 0,0.00');
                $numbroConfigProvider.setFormat('currencySuffix', '0,0.00 $');
            }));

            beforeEach(inject(function ($filter) {
                numbroFilter = $filter('numbro');
            }));

            it('should use configured format string', function () {
                expect(numbroFilter('1024.344', 'currency')).toEqual('$ 1,024.34');
                expect(numbroFilter('1024.344', 'currencySuffix')).toEqual('1,024.34 $');
            });
        });

        describe('when setting default format', function () {
            beforeEach(module('ngNumbro', function ($numbroConfigProvider) {
                $numbroConfigProvider.setDefaultFormat('0.0 $');
            }));

            beforeEach(inject(function ($filter) {
                numbroFilter = $filter('numbro');
            }));

            it('should use default format string', function () {
                expect(numbroFilter('1024.344')).toEqual('1024.3 $');
            });
        });

        describe('when setting language', function () {
            beforeEach(module('ngNumbro', function ($numbroConfigProvider) {
                var language = {
                    delimiters: {
                        thousands: ' ',
                        decimal: ','
                    },
                    abbreviations: {
                        thousand: 'k',
                        million: 'm',
                        billion: 'b',
                        trillion: 't'
                    },
                    ordinal: function () {
                        return '.';
                    },
                    currency: {
                        symbol: '€'
                    }
                };

                $numbroConfigProvider.setLanguage('de', language);
                $numbroConfigProvider.setDefaultFormat('0,0');
            }));

            describe('with default language', function () {
                beforeEach(inject(function ($filter) {
                    numbroFilter = $filter('numbro');
                }));

                it('should use default format', function () {
                    expect(numbroFilter(1234567)).toEqual('1,234,567');
                    expect(numbroFilter('1234567')).toEqual('1,234,567');
                });

                it('should use default (en) settings for currency', function () {
                    expect(numbroFilter(1024.344, '$ 0,0.00')).toEqual('$ 1,024.34');
                    expect(numbroFilter('1024.344', '$ 0,0.00')).toEqual('$ 1,024.34');
                });
            });

            describe('with switch to language', function () {
                beforeEach(module('ngNumbro', function ($numbroConfigProvider) {
                    $numbroConfigProvider.setCurrentLanguage('de');
                }));

                beforeEach(inject(function ($filter) {
                    numbroFilter = $filter('numbro');
                }));

                it('should use default format', function () {
                    expect(numbroFilter(1234567)).toEqual('1 234 567');
                    expect(numbroFilter('1234567')).toEqual('1 234 567');
                });

                it('should use set (de) settings for currency', function () {
                    expect(numbroFilter(1024.344, '$ 0,0.00')).toEqual('€ 1 024,34');
                    expect(numbroFilter('1024.344', '$ 0,0.00')).toEqual('€ 1 024,34');
                });
            });
        });
    });
});
