/*global module, inject, beforeEach, expect, describe, it */
'use strict';

describe('numeraljs', function () {

    beforeEach(module('ngNumeraljs'));

    describe('numeraljs filter', function () {
        var numeraljsFilter;

        beforeEach(inject(function ($filter) {
            numeraljsFilter = $filter('numeraljs');
        }));

        it('should return the original value if format is missing', function () {
            expect(numeraljsFilter('1234567890')).toEqual('1234567890');
            expect(numeraljsFilter('12345', null)).toEqual('12345');
        });

        it('should return value if value is null or undefined', function () {
            expect(numeraljsFilter(undefined, '0%')).toEqual(undefined);
            expect(numeraljsFilter(null)).toEqual(null);
            expect(numeraljsFilter(null, '0.0')).toEqual(null);
        });

        it('should format strings as numbers', function () {
            expect(numeraljsFilter('1024.34', '0.0')).toEqual('1024.3');
            expect(numeraljsFilter('1024.38', '0.0')).toEqual('1024.4');
            expect(numeraljsFilter('34039.1', '0,0.00')).toEqual('34,039.10');
            expect(numeraljsFilter('-0.23', '(.000)')).toEqual('(.230)');
            expect(numeraljsFilter('1230974', '0.0a')).toEqual('1.2m');
        });

        it('should format numbers as numbers', function () {
            expect(numeraljsFilter(1024.34, '0.0')).toEqual('1024.3');
            expect(numeraljsFilter(1024.38, '0.0')).toEqual('1024.4');
            expect(numeraljsFilter(34039.1, '0,0.00')).toEqual('34,039.10');
            expect(numeraljsFilter(-0.23, '(.000)')).toEqual('(.230)');
            expect(numeraljsFilter(1230974, '0.0a')).toEqual('1.2m');
        });

        it('should format strings as currency', function () {
            expect(numeraljsFilter('1024.34', '$0.0')).toEqual('$1024.3');
            expect(numeraljsFilter('-1024.38', '($ 0.0)')).toEqual('($ 1024.4)');
        });

        it('should format strings as bytes', function () {
            expect(numeraljsFilter('2048', '0b')).toEqual('2KB');
            expect(numeraljsFilter('3467479682787', '0.00b')).toEqual('3.15TB');
        });

        it('should support optional language', function () {
            expect(numeraljsFilter('2048', '0,0', 'de')).toEqual('2 048');
            expect(numeraljsFilter('1024.34', '0.0', 'de')).toEqual('1024,3');
        });
    });
});
