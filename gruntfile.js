'use strict';
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/**\n' +
                ' * <%= pkg.description %>\n' +
                ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * @link <%= pkg.homepage %>\n' +
                ' * @author <%= pkg.author %>\n' +
                ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
                ' */\n'
        },
        dirs: {
            dest: 'dist'
        },
        jshint: {
            files: ['gruntfile.js', 'transpiled/*.js', 'test/unit/*.js'],
            options: {
                bitwise: true,
                boss: true,
                browser: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                esnext: true,
                expr: true,
                freeze: true,
                immed: true,
                lastsemic: true,
                latedef: true,
                newcap: true,
                noarg: true,
                node: true,
                quotmark: 'single',
                strict: true,
                sub: true,
                undef: true,
                unused: true,
                globals: {
                    exports: true,
                    angular: false,
                    $: false
                }
            }
        },
        es6transpiler: {
            options: {
                'globals': {
                    'angular': false
                }
            },
            dist: {
                cwd: 'src/',
                src: ['*.js'],
                dest: 'transpiled/',
                expand: true
            }
        },
        karma: {
            unit: {
                singleRun: true,
                configFile: 'test/karma.conf.js'
            }
        },
        concat: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: ['transpiled/*.js'],
                dest: '<%= dirs.dest %>/<%= pkg.name %>.js'
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: {
                    '<%= dirs.dest %>/<%= pkg.name %>.js': ['<%= dirs.dest %>/<%= pkg.name %>.js']
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: ['<%= concat.dist.dest %>'],
                dest: '<%= dirs.dest %>/<%= pkg.name %>.min.js'
            }
        },
        commonjs: {
            modules: {
                cwd: 'dist/',
                src: ['*.js'],
                dest: 'commonjs/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-commonjs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-es6-transpiler');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-karma');

    // Default task.
    grunt.registerTask('default', ['test']);

    // Test tasks.
    grunt.registerTask('test', ['es6transpiler', 'jshint', 'karma:unit']);

    // Build task.
    grunt.registerTask('build', ['test', 'concat', 'ngAnnotate', 'uglify', 'commonjs']);

    // run devserver
    grunt.registerTask('webserver', ['connect:devserver']);


};
