# Angular Numeral.js filter

This is an Angular.js filter that applies [Numeral.js](http://numeraljs.com/) formatting.

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

4. Apply the filter:

```html
    <p>
        {{ price | numeraljs:'$0,0.00' }}
    </p>
```

## Advanced Usage

You can configure `ngNumberaljs` before actual usage with few options available.

```js
var app = angular.module('exampleApp', ['ngNumeraljs']);

app.config(['$numeraljsConfigProvider', function ($numeraljsConfigProvider) {
    // place configuration here
}]);
```

### Set formatters

`$numeraljsConfigProvider.setFormat(name, formatString)` - allows to define a named format, that can be used during formatting.

```js
app.config(['$numeraljsConfigProvider', function ($numeraljsConfigProvider) {
    $numeraljsConfigProvider.setFormat('currency', '$ 0,0.00');
}]);
```

In markup,

```html
    <p>
        {{ price | numeraljs:'currency' }}
    </p>
```

### Set default format

`$numeraljsConfigProvider.setDefaultFormat(format)` - allows to define default format, one that is used if format is not specified.

```js
app.config(['$numeraljsConfigProvider', function ($numeraljsConfigProvider) {
    $numeraljsConfigProvider.setDefaultFormat('0.0 $');
}]);
```

In markup,

```html
    <p>
        {{ price | numeraljs }}     <!-- will produce 15.5 $ -->
    </p>
```

### Set language definition

`$numeraljsConfigProvider.setLanguage(langId, definition)` - allows to add language definition. Check out already available [languages](https://github.com/adamwdraper/Numeral-js/tree/master/languages).

```js
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

    $numeraljsConfigProvider.setLanguage('de', language);
}]);
```

### Set current language

`$numeraljsConfigProvider.setCurrentLanguage(langId)` - allows to set currently used language.

```js
app.config(['$numeraljsConfigProvider', function ($numeraljsConfigProvider) {
    $numeraljsConfigProvider.setCurrentLanguage('de');
}]);
```

## Examples

Check out [example/simple](example/js/app.js) and [example/config](config/js/app.js) for reference.

## Bower

This filter can be installed via Bower with the following dependency in the `bower.json` file.

    "dependencies": {
        "angular-numeraljs": "^1.0"
    }

## Building

1. Install [Grunt CLI](http://gruntjs.com/getting-started) and [Node.js](http://nodejs.org/)

2. Install Node packages

        npm install

3. Build via Grunt

        grunt build

The `/dist/' folder contains the regular and minified Javascript files.