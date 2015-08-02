module.exports = function(grunt) {

  grunt.initConfig({
    clean: ["build"],
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js']
    },
    less: {
      development: {
        options: {
          paths: ["assets/css"]
        },
        files: {
          "build/css/all.css": "src/styles/*.less"
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'build/css/all.css': ['build/css/all.css']
        }
      }
    },
    uglify: {
      development: {
        files: {
          'build/js/all.js': ['src/js/a.js', 'src/js/b.js']
        }
      }
    },
    imagemin: {
      development: {
        files: [{
          expand: true,                // Enable dynamic expansion
          cwd: 'src/img/',             // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
          dest: 'build/img/'           // Destination path prefix
        }]
      }
    },
    connect: {
      server: {
        options: {
          port: 3004,
          base: {
            path: 'build',
            options: {
              index: 'index.html'
            }
          }
        }
      }
    },
    watch: {
      development: {
        files: ['src/**/*'],
        tasks: ['default'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    htmlmin: {
      development: {
        files: {
          'build/index.html': 'src/index.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', ['clean', 'jshint', 'less', 'cssmin', 'uglify', 'imagemin', 'htmlmin']);

  grunt.registerTask('dev', ['default', 'connect', 'watch']);
};