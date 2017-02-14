# Angular Numeral.js filter

[![npm](https://img.shields.io/npm/v/angular-numeraljs.svg)](https://www.npmjs.com/package/angular-numeraljs) [![Build Status](https://travis-ci.org/baumandm/angular-numeraljs.svg?branch=master)](https://travis-ci.org/baumandm/angular-numeraljs)

This is an Angular.js filter that applies [Numeral.js](http://numeraljs.com/) formatting.

The latest version of this library uses Numeral.js 2.x branch.  There are several breaking changes in Numeral.js, as well as breaking changes in this library. If you depend on Numeral.js 1.x and cannot upgrade, please use the latest 1.x release (and corresponding `1.x` branch).

## Breaking Changes in 2.x

For details on breaking changes in Numeral.js itself, please see its [changelog](https://github.com/adamwdraper/Numeral-js/tree/master#200).

In addition, angular-numeraljs has the following breaking changes from in 1.3.0 to 2.0.0:

* `$numeraljsConfigProvider.setCurrentLanguage(lang)` has been renamed to `locale(locale)`
* `$numeraljsConfigProvider.setDefaultFormat(format)` has been renamed to `defaultFormat(format)`
* `$numeraljsConfigProvider.setFormat(name, formatString)` has been renamed to `namedFormat(name, formatString)`
* `$numeraljsConfigProvider.setLanguage(lang, def)` has been renamed to `register('locale', name, def)`

## How to Use

1. Include Numeral.js in your project

2. Include either the minified or non-minified javascript file from the `/dist/` folder:

    ```html
    <script src="angular-numeraljs.js"></script>
    ```

3. Inject the `ngNumeraljs` filter into your app module:

    ```javascript
    var myApp = angular.module('myApp', ['ngNumeraljs']);
    ```

4. Apply the filter with the desired format string:
    ```html
    <p>
        {{ price | numeraljs:'$0,0.00' }}
    </p>
    ```

## Advanced Usage

You can configure `ngNumeraljs` during Angular's configuration phase using the $numeraljsConfigProvider:

```js
var app = angular.module('exampleApp', ['ngNumeraljs']);

app.config(['$numeraljsConfigProvider', function ($numeraljsConfigProvider) {
    // place configuration here
}]);
```

Numeral.js must be already loaded in the browser prior to using `$numeraljsConfigProvider`.

### Named Formats

`$numeraljsConfigProvider.namedFormat(name, formatString)` - defines a named format which can be used in place of the format string in the filter.

```js
app.config(['$numeraljsConfigProvider', function ($numeraljsConfigProvider) {
    $numeraljsConfigProvider.namedFormat('currency', '$ 0,0.00');
}]);
```

In markup,

```html
<p>
    {{ price | numeraljs:'currency' }}
</p>
```

### Default Format

Numeral.js defines the default format as '0,0', so this format is used if none is provided to the filter.

`$numeraljsConfigProvider.defaultFormat(format)` - overrides the built-in default format.

```js
app.config(['$numeraljsConfigProvider', function ($numeraljsConfigProvider) {
    $numeraljsConfigProvider.defaultFormat('0.0 $');
}]);
```

In markup,

```html
<p>
    {{ price | numeraljs }}     <!-- will produce 15.5 $ -->
</p>
```

### Custom Locales and Formats

`$numeraljsConfigProvider.register(type, name, definition)` - adds new locale or format definitions to Numeral.js. `type` must be either `'locale'` or `'format'`.  For complete details, please refer to the Numeral.js [documentation](http://numeraljs.com/#locales).

```js
app.config(['$numeraljsConfigProvider', function ($numeraljsConfigProvider) {
  // Register a new Locale
  $numeraljsConfigProvider.register('locale', 'de', {
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
  });

  // Register a new Format
  $numeraljsConfigProvider.register('format', 'percentage', {
    regexps: {
      format: /(%)/,
      unformat: /(%)/
    },
    format: function(value, format, roundingFunction) {
      var space = numeral._.includes(format, ' %') ? ' ' : '',
          output;

      value = value * 100;

      // check for space before %
      format = format.replace(/\s?\%/, '');

      output = numeral._.numberToFormat(value, format, roundingFunction);

      if (numeral._.includes(output, ')')) {
        output = output.split('');

        output.splice(-1, 0, space + '%');

        output = output.join('');
      } else {
        output = output + space + '%';
      }

      return output;
    },
    unformat: function(string) {
      return numeral._.stringToNumber(string) * 0.01;
    }
  });

  $numeraljsConfigProvider.defaultFormat('0%');
  $numeraljsConfigProvider.locale('de');
}]);
```

Please note that registering a new format will add new formatting functionality, e.g. adding a new character to the format string. If you want to add a short name for a specific format string, see `namedFormat()` above.

See a list of available locales here: [locale](https://github.com/adamwdraper/Numeral-js/tree/master/locales).

Locales or formats can be loaded directly into Numeral.js as well, e.g. by loading the [locale files](https://github.com/adamwdraper/Numeral-js/tree/master/locales) after Numeral.js is loaded.  Angular-numeraljs can use these locales or formats even if they are not set via this provider.

### Select Locale

`$numeraljsConfigProvider.locale(locale)` - selects the current locale.  The locale must be loaded either by `$numeraljsConfigProvider.register()` or by loading the Numeral.js locale file.

```js
app.config(['$numeraljsConfigProvider', function ($numeraljsConfigProvider) {
    $numeraljsConfigProvider.locale('de');
}]);
```

### Runtime Configuration

It is possible to change all of the configurations at runtime by injecting `$numeraljsConfig`:

    app.controller('numeralExample', function ($scope, $numeraljsConfig) {
      $numeraljsConfig.defaultFormat('0,0.0');
      $numeraljsConfig.locale($scope.locale);
    });

This may be useful for websites with a language switcher, saved user preferences, etc.

## Examples

There are several examples in the `example/` folder which can be used for reference:

* _Simple_: using this library in the most basic way possible
* _Config_: using $numeraljsConfigProvider to configure this library
* _ChangingLanguages_: changing languages (or other properties) at runtime (vs initialization)
* _Bower_: adding a dependency through Bower
* _Browserify_: adding a dependency through Browserify

## Bower

This filter can be installed via Bower with the following dependency in the `bower.json` file.

    "dependencies": {
        "angular-numeraljs": "^2.0"
    }

## Browserify

This project is published in NPM as `angular-numeraljs`.

    "dependencies": {
        "angular-numeraljs": "^2.0"
    }

The `example/browserify` folder has a working example with Browserify and Grunt.  To build this project, install [Grunt](http://gruntjs.com/) and [Browserify](http://browserify.org/) and run the following:

    cd example/browserify
    npm install
    grunt build

Then open `example/browserify/dist/index.html` in a browser.

# Building

1. Install [Grunt CLI](http://gruntjs.com/getting-started) and [Node.js](http://nodejs.org/)

2. Install Node packages

        npm install

3. Build via Grunt

        grunt build

    The `/dist/` folder contains the regular and minified Javascript files.

4. Tests are automatically run during the build, but they can be run manually as well

        grunt test
