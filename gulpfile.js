'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
 
gulp.task('js', function() {
  return gulp.src('./app/_js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/assets/js'));
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