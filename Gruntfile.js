'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: [
                 '/**',
                   ' * <%= pkg.description %>',
                 ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>' +
                 ' * @link <%= pkg.homepage %>',
                 ' * @author <%= pkg.author %>',
                 ' * @license MIT License, http://www.opensource.org/licenses/MIT',
                 ' */'
            ].join('\n')
        },
        ngAnnotate: {
            options: {
                add: true,
                singleQuotes: true
            },
            'next-state': {
                files: {
                    'dist/<%= pkg.name %>.js': ['src/service.js']
                }
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ['dist/<%= pkg.name %>.js'],
                // the location of the resulting JS file
                dest: 'dist/<%= pkg.name %>.js'
              }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '<%= meta.banner %>'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/*.js'],
            options: {
                jshintrc: true
            }
        },
        watch: {
          files: ['<%= jshint.files %>'],
          tasks: ['jshint']
        }
    });

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-ng-annotate');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('default', ['jshint', 'ngAnnotate', 'concat', 'uglify']);

};