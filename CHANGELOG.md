# Changelog

## 2.0.0

* Upgrade to Numeral.js 2.x, with several breaking changes
* $numeraljsConfigProvider's interface has been modified to better match Numeral.js
  * `$numeraljsConfigProvider.setCurrentLanguage(lang)` has been renamed to `locale(locale)`
  * `$numeraljsConfigProvider.setDefaultFormat(format)` has been renamed to `defaultFormat(format)`
  * `$numeraljsConfigProvider.setFormat(name, formatString)` has been renamed to `namedFormat(name, formatString)`
  * `$numeraljsConfigProvider.setLanguage(lang, def)` has been renamed to `register('locale', name, def)`
* Fixed indentation to match EditorConfig settings
* Upgraded Karma & related test dependencies

## 1.3.0

* Remove the separate CommonJS build in favor of a single UMD module.

## 1.2.0

* Adds support for reconfiguring the library at runtime via injectable $numeraljsConfig.
* Added bower example.
* Updated various build dependencies to recent versions.

## 1.1.6

* Bug fix

## 1.1.5

* Fix minified version by annotating the Angular dependencies

## 1.1.4

* Exclude files from the npm package
* Add commonjs version
* Add Browserify/Grunt example
* Updated examples, unit tests

## 1.1.0

* Added $numeraljsConfigProvider and various configurations

## 1.0.3

* Added language option to the 'numeraljs' filter
* Bug fixes

## 1.0.0

* First version
