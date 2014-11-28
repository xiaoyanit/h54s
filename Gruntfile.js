module.exports = function (grunt) {
  var bannerContent = '/*! <%= pkg.name %> v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
      ' *  License: <%= pkg.license %> \n' +
      ' * Author: <%= pkg.author %> \n*/\n';
  var name = '<%= pkg.name %>-v<%= pkg.version%>';
  var devRelease = 'dist/'+name+'.js';
  var minRelease = 'dist/'+name+'.min.js';

  var srcFiles = ['src/config.js', 'src/h54s.js', 'src/methods.js'];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        trailing: true
      },
      target: {
        src: ['src/**/*.js', 'test/**/*.js']
      }
    },
    concat: {
      options: {
        banner: bannerContent
      },
      target: {
        src: srcFiles,
        dest: devRelease
      }
    },
    uglify: {
      options: {
        banner: bannerContent,
        sourceMapRoot: '../',
        sourceMap: 'dist/'+name+'.min.js.map',
        sourceMapUrl: name+'.min.js.map'
      },
      target : {
        src : srcFiles,
        dest : 'dist/' + name + '.min.js'
      }
    },
    karma: {
      options: {
        files: srcFiles.concat(['test/**/*.js'])
      },
      dev: {
        configFile: 'karma.conf.js',
        autoWatch: true
      },
      run: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
    },
  });

  // Always show stack traces when Grunt prints out an uncaught exception.
  grunt.option('stack', true);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.registerTask('default', ['jshint', 'concat', 'karma:run']);
  grunt.registerTask('compress', 'uglify');
  grunt.registerTask('test', 'karma:run');
};
