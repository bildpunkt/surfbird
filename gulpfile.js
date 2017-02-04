'use strict';

var browserify = require('browserify')
var gulp = require('gulp')
var sass = require('gulp-sass')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var gutil = require('gulp-util')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var vueify = require('vueify')

gulp.task('js', function () {
  var b = browserify({
    entries: './app/_js/main.js',
    debug: true,
    transform: [vueify]
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/assets/js/'))
})

gulp.task('sass', function () {
  return gulp.src('./app/_sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/assets/css'))
})

gulp.task('watch', function () {
    gulp.watch('./app/_sass/**/*.scss', ['sass'])
    gulp.watch('./app/_js/**/*.js', ['js'])
    gulp.watch('./app/_js/**/*.vue', ['js'])
})

gulp.task('assets', ['js', 'sass'])
