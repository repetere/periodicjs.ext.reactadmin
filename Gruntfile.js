/*
 * domhelper
 * http://github.com/yawetse/domhelper
 *
 * Copyright (c) 2014 Yaw Joseph Etse. All rights reserved.
 */
'use strict';
const path = require('path');
const testpaths = 'test/**/*.js';

module.exports = function (grunt) {
	grunt.initConfig({
		mocha_istanbul: {
			// coverage: {
			//   src: testPaths, // a folder works nicely
			//   options: {
			//   }
			// },
			// coverageSpecial: {
			//   src: ['testSpecial/*/*.js', 'testUnique/*/*.js'], // specifying file patterns works as well
			//   options: {
			//       coverageFolder: 'coverageSpecial',
			//       mask: '*.spec.js',
			//       mochaOptions: ['--harmony','--async-only'], // any extra options
			//       istanbulOptions: ['--harmony','--handle-sigint']
			//   }
			// },
			coveralls: {
				src: testpaths, // multiple folders also works
				options: {
					coverageFolder: 'coverage', // will check both coverage folders and merge the coverage results
					coverage: true, // this will make the grunt.event.on('coverage') event listener to be triggered
					check: {
						lines: 5,
						branches: 5,
						functions: 5,
						statements: 5
					},
					// root: './lib', // define where the cover task should consider the root of libraries that are covered by tests
					reportFormats: ['cobertura', 'lcovonly']
				}
			}
		},
		istanbul_check_coverage: {
			default: {
				options: {
					coverageFolder: 'coverage', // will check both coverage folders and merge the coverage results
					check: {
						lines: 80,
						branches: 80,
						functions: 80,
						statements: 80
					}
				}
			}
		},
		coveralls: {
			// Options relevant to all targets
			options: {
				// When true, grunt-coveralls will only print a warning rather than
				// an error, to prevent CI builds from failing unnecessarily (e.g. if
				// coveralls.io is down). Optional, defaults to false.
				force: false
			},

			all: {
				// LCOV coverage file (can be string, glob or array)
				src: 'coverage/*.info',
				options: {
					// Any options for just this target
				}
			},
		},
		simplemocha: {
			options: {
				globals: ['should'],
				timeout: 3000,
				ignoreLeaks: false,
				ui: 'bdd',
				reporter: 'spec'
			},
			all: {
				src: testpaths
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'index.js',
				'controller/**/*.js',
				'resources/**/*.js',
				testpaths,
			]
		},
		jsbeautifier: {
			files: ['<%= jshint.all %>'],
			options: {
				config: '.jsbeautify'
			}
		},
		jsdoc: {
			dist: {
				src: [
					'index.js',
					'controller/**/*.js',
					'resources/**/*.js',
				],
				options: {
					destination: 'doc/html',
					configure: 'jsdoc.json'
				}
			}
		},
		browserify: {
			dist: {
				files: [{
					expand: true,
					cwd: 'resources',
					src: ['**/*_src.js'],
					dest: 'public',
					rename: function (dest, src) {
						var finallocation = path.join(dest, src);
						finallocation = finallocation.replace('_src', '_build');
						finallocation = finallocation.replace('resources', 'public');
						finallocation = path.resolve(finallocation);
						return finallocation;
					}
				}],
				options: {
					transform: [
						["babelify", {
							presets: ["es2015"]
						}]
					]
				},
			}
		},
		uglify: {
			options: {
				sourceMap: true,
				compress: {
					drop_console: false
				}
			},
			all: {
				files: [{
					expand: true,
					cwd: 'public',
					src: ['**/*_build.js'],
					dest: 'public',
					rename: function (dest, src) {
						var finallocation = path.join(dest, src);
						finallocation = finallocation.replace('_build', '.min');
						finallocation = path.resolve(finallocation);
						return finallocation;
					}
				}]
			}
		},
		less: {
			development: {
				options: {
					sourceMap: true,
					sourceMapURL: 'asyncadmin.css.map',
					yuicompress: true,
					compress: true
				},
				files: {
					'public/stylesheets/asyncadmin.css': 'resources/stylesheets/asyncadmin.less',
					'public/v2/stylesheets/asyncadmin.bulma.css': 'resources/v2/stylesheets/asyncadmin.bulma.less'
				}
			}
		},
		copy: {
			main: {
				cwd: 'public',
				expand: true,
				src: '**/*.*',
				dest: '../../public/extensions/periodicjs.ext.asyncadmin',
			},
		},
		watch: {
			scripts: {
				// files: '**/*.js',
				files: [
					'Gruntfile.js',
					'index.js',
					'controller/**/*.js',
					'resources/**/*.less',
					'resources/**/*.js',
					testpaths,
				],
				tasks: ['lint', 'packagejs', 'less', 'copy', 'test'],
				options: {
					interrupt: true
				}
			},
			no_tests: {
				files: [
					'Gruntfile.js',
					'index.js',
					'controller/**/*.js',
					'resources/**/*.less',
					'resources/**/*.js',
				],
				tasks: ['lint', 'packagejs', 'less', 'copy'],
				options: {
					interrupt: true
				}
			},
			only_less: {
				files: [
					'Gruntfile.js',
					'index.js',
					'resources/**/*.less',
				],
				tasks: ['less', 'copy'],
				options: {
					interrupt: true
				}
			}
		}
	});


	// Loading dependencies
	for (var key in grunt.file.readJSON('package.json').devDependencies) {
		if (key.indexOf('grunt') === 0 && key !== 'grunt') {
			grunt.loadNpmTasks(key);
		}
	}

	grunt.registerTask('default', ['jshint', 'mocha_istanbul']);
	grunt.registerTask('lint', 'jshint', 'jsbeautifier');
	grunt.registerTask('packagejs', ['browserify', 'uglify']);
	grunt.registerTask('doc', 'jsdoc');
	grunt.registerTask('test', 'mocha_istanbul');
};
