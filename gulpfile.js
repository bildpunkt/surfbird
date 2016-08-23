'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var add = require('gulp-add-src')
var browserify = require('browserify')
var vueify = require('vueify')
var source = require('vinyl-source-stream')

gulp.task('js', function () {
  return browserify('./app/_js/main.js', {bundleExternal: false, builtins: false, commondir: false, insertGlobals: 'global'})
    .transform(vueify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./app/assets/js'))
})

gulp.task('sass', function () {
  return gulp.src('./app/_sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/assets/css'))
})

gulp.task('fonts', function () {
  return gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./app/assets/fonts'))
})

gulp.task('images', function () {
  return gulp.src('./node_modules/lightbox2/dist/images/*')
    .pipe(gulp.dest('./app/assets/images'))
})

gulp.task('watch', function () {
  gulp.watch('./app/_sass/**/*.scss', ['sass'])
  gulp.watch('./app/_js/*.js', ['js'])
})

gulp.task('assets', ['js', 'sass', 'fonts', 'images'])
