# Angular Numbro.js filter

This is an Angular.js filter that applies [Numbro.js](http://numbrojs.com/) formatting.

## How to Use

1. Include Numbro.js in your project

2. Include either the minified or non-minified javascript file from the `/dist/` folder:

    ```html
    <script src="angular-numbro.js"></script>
    ```

3. Inject the `ngNumbro` filter into your app module:

    ```javascript
    var myApp = angular.module('myApp', ['ngNumbro']);
    ```

4. Apply the filter with the desired format string:
    ```html
    <p>
        {{ price | numbro:'$0,0.00' }}
    </p>
    ```

## Advanced Usage

You can configure `ngNumbro` during Angular's configuration phase using the $numbroConfigProvider:

```js
var app = angular.module('exampleApp', ['ngNumbro']);

app.config(['$numbroConfigProvider', function ($numbroConfigProvider) {
    // place configuration here
}]);
```

Numbro.js must be already loaded in the browser prior to using `$numbroConfigProvider`.

### Named Formats

`$numbroConfigProvider.setFormat(name, formatString)` - defines a named format which can be used in place of the format string in the filter.

```js
app.config(['$numbroConfigProvider', function ($numbroConfigProvider) {
    $numbroConfigProvider.setFormat('currency', '$ 0,0.00');
}]);
```

In markup,

```html
<p>
    {{ price | numbro:'currency' }}
</p>
```

### Default Format

Numbro.js defines the default format as '0,0', so this format is used if none is provided to the filter.

`$numbroConfigProvider.setDefaultFormat(format)` - overrides the built-in default format.

```js
app.config(['$numbroConfigProvider', function ($numbroConfigProvider) {
    $numbroConfigProvider.setDefaultFormat('0.0 $');
}]);
```

In markup,

```html
<p>
    {{ price | numbro }}     <!-- will produce 15.5 $ -->
</p>
```

### Custom Languages

`$numbroConfigProvider.setLanguage(langId, definition)` - adds new language definitions to Numbro.js. See the available list here: [languages](https://github.com/adamwdraper/Numbro-js/tree/master/languages).  

```js
app.config(['$numbroConfigProvider', function ($numbroConfigProvider) {
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

    $numbroConfigProvider.setLanguage('de', language);
}]);
```

Languages can be loaded directly into Numbro.js as well, e.g. by loading the [language files](https://github.com/adamwdraper/Numbro-js/tree/master/languages) after Numbro.js is loaded.  Angular-numbro can use these languages even if they are not set via this provider.

### Select Language

`$numbroConfigProvider.setCurrentLanguage(langId)` - selects the current language.  The language must be loaded either by `$numbroConfigProvider.setLanguage()` or by loading the Numbro.js language file.

```js
app.config(['$numbroConfigProvider', function ($numbroConfigProvider) {
    $numbroConfigProvider.setCurrentLanguage('de');
}]);
```

## Examples

Check out [example/simple](example/js/app.js) and [example/config](config/js/app.js) for reference.

## Bower

This filter can be installed via Bower with the following dependency in the `bower.json` file.

    "dependencies": {
        "angular-numbro": "^1.0"
    }

## Browserify

This project is published in NPM as `angular-numbro`.

    "dependencies": {
        "angular-numbro": "^1.0"
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
