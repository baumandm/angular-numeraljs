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
        commonjs: {
            modules: {
                cwd: 'dist/',
                src: ['*.js'],
                dest: 'commonjs/'
            }
        },
        concat: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: ['src/*.js'],
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
        jshint: {
            files: ['Gruntfile.js', 'src/*.js', 'test/unit/*.js'],
            options: {
                bitwise: true,
                boss: true,
                browser: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                expr: true,
                freeze: true,
                immed: true,
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
        karma: {
            unit: {
                singleRun: true,
                configFile: 'test/karma.conf.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-commonjs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-karma');

    // Default task.
    grunt.registerTask('default', ['test']);

    // Test tasks.
    grunt.registerTask('test', ['jshint', 'karma:unit']);

    // Build task.
    grunt.registerTask('build', ['test', 'concat', 'ngAnnotate', 'uglify', 'commonjs']);

    // run devserver
    grunt.registerTask('webserver', ['connect:devserver']);


};
