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