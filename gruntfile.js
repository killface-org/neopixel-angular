module.exports = function(grunt)
{
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        settings: {
            server: {
                address: '0.0.0.0',
                port: 8080
            },
            debug: {
                livereload: {
                    url: 'http://<%=settings.server.address%>:35729/livereload.js',
                    enable: true
                }
            }
        },
        folders: {
            base: {
                out: 'dist',
                source: 'src',
                vendor: 'vendor',
                static: '<%=folders.base.source%>/static',
                temp: 'temp'
            },
            source: {
                app: 'app',
                app_components: 'app/components',
                components: 'components',
                less: '<%=folders.source.app%>/less'
            },
            dist: {
                css: 'css',
                js: 'js',
                components: 'components',
                scripts: 'scripts',
                static: 'static',
                tests: 'tests',
                img: '<%=folders.dist.static%>/images',
                fonts: 'fonts'
            },
            vendor: {
                bootstrap: 'bootstrap'
            }
        },
        files: {
            source: {
                less: ['<%=paths.source.less%>/app.less', '<%=paths.app.less%>/**/*.less']
            },
            dist: {
                css: ['<%=folders.dist.css%>/**/*.css'],
                js: {
                    vendor: [
                        '<%=folders.dist.scripts%>/**/angular.min.js', '<%=folders.dist.scripts%>/**/angular.js',
                        '<%=folders.dist.scripts%>/**/*.js'
                    ],
                    app: [
                        '<%=folders.dist.js%>/**/modules.js', '<%=folders.dist.js%>/*.js',
                        '<%=folders.dist.js%>/**/*.js'
                    ],
                    components: ['<%=folders.dist.components%>/**/modules.js', '<%=folders.dist.components%>/**/*.js']
                }
            }
        },
        paths: {
            temp: '<%=folders.base.temp%>',
            source: {
                index: '<%=folders.base.source%>/index.html',
                app: '<%=folders.base.source%>/<%=folders.source.app%>',
                app_components: '<%=folders.base.source%>/<%=folders.source.app_components%>',
                components: '<%=folders.base.source%>/<%=folders.source.components%>',
                less: '<%=folders.base.source%>/<%=folders.source.less%>'
            },
            dist: {
                css: '<%=folders.base.out%>/<%=folders.dist.css%>',
                js: '<%=folders.base.out%>/<%=folders.dist.js%>',
                components: '<%=folders.base.out%>/<%=folders.dist.components%>',
                vendor: '<%=folders.base.out%>/<%=folders.dist.scripts%>',
                images: '<%=folders.base.out%>/<%=folders.dist.img%>',
                fonts: '<%=folders.base.out%>/<%=folders.dist.fonts%>',
                static: '<%=folders.base.out%>/<%=folders.dist.static%>',
                tests: '<%=folders.base.out%>/<%=folders.dist.tests%>'
            },
            vendor: {
                'base': '<%=folders.base.vendor%>'
            }
        },

        // Task configuration.
        clean: {
            dist: ['<%=folders.base.out%>'],
            temp: ['<%=paths.temp%>']
        },
        copy: {
            index: {
                options: {
                    processContent: grunt.template.process
                },
                expand: true,
                cwd: '<%=folders.base.source%>/',
                src: ['index.html'],
                dest: '<%=folders.base.out%>'
            },
            static: {
                expand: true,
                cwd: '<%=folders.base.static%>/',
                src: ['**/*'],
                dest: '<%=paths.dist.static%>',
                flatten: false
            },
            vendor_css: {
                expand: true,
                cwd: '<%=folders.base.vendor%>/',
                src: ['**/*.css', '!**/*.min.css', '!bootstrap/**/*.css', '!openlayers/**/*.css'],
                dest: '<%=paths.dist.css%>',
                flatten: true
            },
            vendor_css_min: {
                expand: true,
                cwd: '<%=folders.base.vendor%>/',
                src: ['**/*.min.css', '!bootstrap/**/*.css', '!openlayers/**/*.css'],
                dest: '<%=paths.dist.css%>',
                flatten: true
            },
            vendor_js: {
                expand: true,
                cwd: '<%=folders.base.vendor%>/',
                src: [
                    '**/*.js', '!**/*.min.js', '!bootstrap/**/*.js', '!openlayers/**/*.js',
                    'openlayers/**/ol-debug.js', 'wstiles/wstiles.js'
                ],
                dest: '<%=paths.dist.vendor%>',
                flatten: true
            },
            vendor_js_min: {
                expand: true,
                cwd: '<%=folders.base.vendor%>/',
                src: [
                    '**/*.min.js', '!bootstrap/**/*.js', '!openlayers/**/*.js', 'openlayers/**/ol.js',
                    'wstiles/wstiles.js'
                ],
                dest: '<%=paths.dist.vendor%>',
                flatten: true
            },
            vendor_fonts: {
                expand: true,
                cwd: '<%=folders.base.vendor%>/',
                src: ['**/fonts/*'],
                dest: '<%=paths.dist.fonts%>',
                flatten: true
            },
            app_js: {
                expand: true,
                cwd: '<%=paths.source.app%>/',
                src: ['**/*.js', '!**/*.spec.js'],
                dest: '<%=paths.dist.js%>',
                flatten: false
            },
            app_html: {
                expand: true,
                cwd: '<%=paths.source.app%>/',
                src: ['**/*.html'],
                dest: '<%=folders.base.out%>',
                flatten: false
            },
            app_components_html: {
                expand: true,
                cwd: '<%=paths.source.app_components%>/',
                src: ['**/*.tpl.html'],
                dest: '<%=paths.dist.components%>',
                flatten: false
            },
            components_js: {
                expand: true,
                cwd: '<%=paths.source.components%>/',
                src: ['**/*.js', '!**/*.spec.js'],
                dest: '<%=paths.dist.js%>',
                flatten: false
            },
            components_img: {
                expand: true,
                cwd: '<%=paths.source.components%>/',
                src: ['**/*.png'],
                dest: '<%=paths.dist.static%>',
                flatten: false
            },
            components_html: {
                expand: true,
                cwd: '<%=paths.source.components%>/',
                src: ['**/*.tpl.html'],
                dest: '<%=paths.dist.components%>',
                flatten: false
            },
            app_tests: {
                expand: true,
                cwd: '<%=paths.source.app_components%>/',
                src: ['**/*.spec.js'],
                dest: '<%=paths.dist.tests%>',
                flatten: true
            },
            tests: {
                expand: true,
                cwd: '<%=paths.source.components%>/',
                src: ['**/*.spec.js'],
                dest: '<%=paths.dist.tests%>',
                flatten: true
            }
        },
        concat: {
            options: {
                separator: '\n',
                process: false
            },
            less: {
                src: [
                    '<%=paths.source.less%>/imports.less', '<%=paths.source.app%>/**/*.less',
                    '<%=paths.source.app_components%>/**/*.less', '<%=paths.source.components%>/**/*.less'
                ],
                dest: '<%=paths.temp%>/build.less'
            }
        },
        less: {
            app: {
                options: {
                    compress: false,
                    cleancss: false,
                    paths: ['<%=paths.source.less%>/', '<%=paths.vendor.base%>']
                },
                files: {
                    '<%=paths.dist.css%>/app.css': ['<%=paths.temp%>/build.less']
                }
            },
            app_min: {
                options: {
                    compress: true,
                    cleancss: true,
                    paths: ['<%=paths.source.less%>/', '<%=paths.vendor.base%>']
                },
                files: {
                    '<%=paths.dist.css%>/app.min.css': ['<%=paths.temp%>/build.less']
                }
            }
        },
        jshint: {
            app: [
                '<%=paths.source.app%>/**/*.js'
            ],
            app_components: [
                '<%=paths.source.app_components%>/**/*.js'
            ],
            components: [
                '<%=paths.source.components%>/**/*.js'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true
            }
        },
        delta: {
            index: {
                files: ['<%=folders.base.source%>/index.html'],
                tasks: ['copy:index'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: [
                    '<%=paths.source.less%>/**/*.less', '<%=paths.source.app%>/**/*.less',
                    '<%=paths.source.app_components%>/**/*.less', '<%=paths.source.components%>/**/*.less'
                ],
                tasks: ['build:css', 'clean:temp'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['<%=paths.source.app%>/**/*.js', '<%=paths.source.components%>/**/*.js'],
                tasks: ['build:jshint', 'build:js', 'build:tests', 'enable-livereload', 'build:templates'],
                options: {
                    livereload: true
                }
            },
            templates: {
                files: [
                    '<%=paths.source.index%>/**/*', '<%=paths.source.app%>/**/*.html',
                    '<%=paths.source.app_components%>/**/*.tpl.html', '<%=paths.source.components%>/**/*.tpl.html'
                ],
                tasks: ['enable-livereload', 'build:templates'],
                options: {
                    livereload: true
                }
            }
        },
        build: {
            jshint: ['jshint'],
            css: ['concat:less', 'less:app'],
            vendor: ['copy:vendor_js', 'copy:vendor_fonts', 'copy:vendor_css'],
            static: ['copy:static', 'copy:components_img'],
            js: ['copy:app_js', 'copy:components_js'],
            templates: [
                'set-options',
                'copy:index',
                'copy:app_html',
                'copy:app_components_html',
                'copy:components_html'
            ],
            clean: ['clean:temp'],
            tests: ['copy:tests', 'copy:app_tests']
        },
        'build-min': {
            jshint: ['jshint'],
            css: ['concat:less', 'less:app_min'],
            vendor: ['copy:vendor_js_min', 'copy:vendor_fonts', 'copy:vendor_css_min'],
            static: ['copy:static'],
            js: ['uglify:app', 'uglify:components'],
            templates: [
                'set-options',
                'copy:index',
                'copy:app_html',
                'copy:app_components_html',
                'copy:components_html'
            ],
            clean: ['clean:temp']
        },
        vendor: {
            options: {
                dest: '<%=paths.vendor.base%>',
                replace: false
            },
            openlayers: {
                url: 'https://github.com/openlayers/ol3/releases/download/v3.0.0/v3.0.0.zip',
                renameZipRoot: true
            },
            angularjs: {
                basepath: 'https://code.angularjs.org/1.3.0-beta.17/',
                src: [
                    'angular.min.js', 'angular.js', 'angular-mocks.js', 'angular-cookies.js',
                    'angular-cookies.min.js', 'angular-touch.js', 'angular-touch.min.js', 'angular-animate.js',
                    'angular-animate.min.js'
                ]
            },
            'ui-bootstrap': {
                basepath: 'https://raw.github.com/angular-ui/bootstrap/gh-pages/',
                src: ['ui-bootstrap-tpls-0.11.0.js', 'ui-bootstrap-tpls-0.11.0.min.js']
            },
            'socket-io': {
                basepath: 'https://cdn.socket.io',
                src: ['socket.io-1.0.6.js']
            }
        },
        uglify: {
            app: {
                files: {
                    '<%=paths.dist.js%>/app.min.js': [
                        '<%=paths.source.app%>/**/*.js',
                        '!<%=paths.source.app%>/**/*.spec.js'
                    ]
                }
            },
            components: {
                files: {
                    '<%=paths.dist.js%>/components.min.js': [
                        '<%=paths.source.app_components%>/**/modules.js', '<%=paths.source.app_components%>/**/*.js',
                        '!<%=paths.source.app_components%>/**/*.spec.js', '<%=paths.source.components%>/**/modules.js',
                        '<%=paths.source.components%>/**/*.js', '!<%=paths.source.components%>/**/*.spec.js'
                    ]
                }
            }
        }
    });

    // These components provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-vendor');

    //Load custom tasks
    //grunt.loadTasks('tasks');

    //Server tasks
    grunt.registerTask('web-server', function()
    {
        var fileServer = new (require('node-static')).Server('./' + grunt.config('folders.base.out'), {cache: false});
        require('http').createServer(function(req, res)
        {
            fileServer.serve(req, res);
        }).listen(grunt.config('settings.server.port'));

    });

    grunt.renameTask('watch', 'delta');

    grunt.registerTask('watch', function()
    {
        grunt.task.run('enable-livereload', 'build-debug', 'copy:tests', 'copy:app_tests', 'web-server', 'delta');
    });

    grunt.registerTask('enable-livereload', function()
    {
        grunt.config.set('settings.debug.livereload.enable', true);
    });

    grunt.registerTask('disable-livereload', function()
    {
        grunt.config.set('settings.debug.livereload.enable', false);
    });

    grunt.registerTask('set-options', function()
    {
        var socketConfig = grunt.config.get('settings.socketio.' + (grunt.option('env') || 'default'));
        grunt.config.set('settings.socketio.config', socketConfig);
    });

    grunt.registerMultiTask('build', function()
    {
        grunt.log.writeln('Building ' + this.target + ' [' + this.data + ']');
        grunt.task.run(this.data);
    });

    grunt.registerMultiTask('build-min', function()
    {
        grunt.log.writeln('Building ' + this.target + ' [' + this.data + ']');

        // Disable live-reload when doing a build.
        grunt.config.set('settings.debug.livereload.enable', false);

        grunt.task.run(this.data);
    });

    grunt.registerTask('build-debug', function()
    {
        grunt.task.run(['set-options', 'clean:dist', 'build', 'clean:temp']);
    });

    grunt.registerTask('test', function()
    {
        grunt.task.run(['build-debug', 'copy:tests', 'copy:app_tests', 'karma:single']);
    });

    grunt.registerTask('test-ci', function()
    {
        grunt.task.run(['build-debug', 'copy:tests', 'copy:app_tests', 'karma:single-ci']);
    });
};