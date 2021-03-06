module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        src: [
          'node_modules/jquery/dist/jquery.min.js',
          'node_modules/underscore/underscore-min.js',
          'node_modules/backbone/backbone-min.js',
          'node_modules/backbone.localstorage/backbone.localStorage.js'
        ],
        dest: 'js/lib/<%= pkg.name %>.js'
      }
    },
    less: {
      dist: {
        options: {
          compress: true,
          optimization: 2
        },
        files: {
          "css/main.css": "less/main.less"
        }
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: true
          },
          pretty: true
        },
        files: {
          "index.html": "templates/index.jade"
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= concat.dist.dest %>': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'js/**/*.js', '!js/lib/*', '!js/dist*'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    filerev: {
      dist: {
        src: ['js/dist.js', 'js/lib/backbone-app.js']
      }
    },
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: '.'
      }
    },
    usemin: {
      html: 'index.html'
    },
    watch: {
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      style: {
        files: ['<%= less.files %>'],
        tasks: ['less']
      },
      templates: {
        files: ['<%= jade.files %>'],
        tasks: ['jade']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-filerev');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['jshint', 'jade', 'less', 'useminPrepare', 'concat', 'uglify', 'filerev', 'usemin']);

};
