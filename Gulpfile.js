// The require statements include the plugins that we will need for our build
var conn = require('gulp-connect');
var del = require('del');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var jasmine = require('gulp-jasmine');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var jpegtran = require('imagemin-jpegtran');

// This is a synchronous task - it has a callback on completion. This prevents
// any dependant tasks from running until clean is good and finished.
gulp.task('clean', function(cb) {
  del(['build/*'], cb);
});

// Check that the code is up to code
gulp.task('lint', ['clean'], function() {
  return gulp.src(['src/**/*.js', '!src/bower_components/**/*'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'));
});

// Convert the less files into CSS, and concatenates them into a single, minified file in build/css
gulp.task('styles', ['clean'], function() {
  return gulp.src('src/styles/**/*.less')
      .pipe(less())
      .pipe(minifyCSS())
      .pipe(concat('all.css'))
      .pipe(gulp.dest('build/css'));
});

// Minify, concatenate and copy the JS into build/js
gulp.task('scripts', ['clean'], function() {
  return gulp.src('src/js/**/*.js')
      .pipe(uglify())
      .pipe(concat('all.js'))
      .pipe(gulp.dest('build/js'));
});

gulp.task('images', ['clean'], function() {
  return gulp.src('src/img/*')
      .pipe(imagemin({
        progressive: true,
        use: [jpegtran()]
      }))
      .pipe(gulp.dest('build/img'));
});

// The build task - relies on 'clean', 'lint', 'styles', 'scripts', and 'images'
gulp.task('build', ['clean', 'lint', 'styles', 'scripts', 'images'], function() {
  return gulp.src(['src/*.html'])
      .pipe(minifyHTML())
      .pipe(gulp.dest('build'));
});

// Task to serve this locally using gulp-connect. Not for production usage.
gulp.task('serve', function() {
  conn.server({
    root: 'build',
    port: 3003,
    fallback: 'build/index.html'
  });
  console.log('Demo server started at localhost:3003');
});

// On change to JavaScript files, run the default task, then run the local server. Trigger rebuilds on any changes.
gulp.task('dev', ['build', 'serve'], function() {
  gulp.watch(['src/**/*', '*.js'], ['default']);
});

gulp.task('default', ['build']);
