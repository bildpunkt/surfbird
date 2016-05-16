'use strict';

var gulp       = require('gulp');
var sass       = require('gulp-sass');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var add        = require('gulp-add-src');
var browserify = require('browserify');
var vueify     = require('vueify');
var source     = require('vinyl-source-stream');

gulp.task('js', function() {
  return browserify('./app/_js/main.js', {bundleExternal: false, builtins: false, commondir: false, insertGlobals: 'global'})
    .transform(vueify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./app/assets/js'))
});

gulp.task('sass', function () {
  return gulp.src('./app/_sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/assets/css'));
});

gulp.task('watch', function () {
  gulp.watch('./app/_sass/**/*.scss', ['sass']);
  gulp.watch('./app/_js/*.js', ['js']);
});

gulp.task('assets', ['js', 'sass']);
