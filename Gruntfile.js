module.exports = function(grunt) {
  // Project Configuration
	grunt.initConfig({
		uglify: {
			my_target: {
				options: {
      				mangle: true,
					compress: {
						drop_console: true
					}      				
    			},
				files: [
					{
						expand: true,
						cwd: 'js',
						src: '**/*.js',
						dest: '../cinephile/js'
					}
				]
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: 'css/',
				src: ['*.css'],
				dest: '../cinephile/css/',
				ext: '.css'
			}
		},
		copy: {
			remoteProduction: {
				src: [
						'imgs/**/*',
						'templates/**/*',
						'index.html',
					],
				dest: '../cinephile/',
				options: {
				}
			}
		}
	});

  	// Load task-providing plugins.
  	grunt.loadNpmTasks('grunt-contrib-copy');
  	grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask(
		'prod',
		'Compiles all of the assets and copies the files to the build directory.', 
		[ 'uglify', 'cssmin', 'copy' ]
	);
};