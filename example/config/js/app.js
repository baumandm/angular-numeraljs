var app = angular.module('exampleApp', ['ngNumeraljs']);

app.config(['$numeraljsConfigProvider', function ($numeraljsConfigProvider) {
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
		ordinal: function (number) {
			return '.';
		},
		currency: {
			symbol: '€'
		}
	};

	$numeraljsConfigProvider.setFormat('currency', '$ 0,0.00');
	$numeraljsConfigProvider.setFormat('currencySuffix', '0,0.00 $');
	$numeraljsConfigProvider.setFormat('number', '0.00');
	$numeraljsConfigProvider.setLanguage('de', language);

	$numeraljsConfigProvider.setCurrentLanguage('de');
}]);

app.controller('numeralExample', function ($scope) {

});