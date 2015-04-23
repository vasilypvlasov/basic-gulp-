// Include gulp !important
var gulp = require('gulp');

// Include Our Plugins here
var jshint = require('gulp-jshint');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var myth = require('gulp-myth');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');
var nib = require('nib');
var rimraf = require('gulp-rimraf');

gulp.task('connectDist', function () {
  connect.server({
    root: 'dist',
    port: 3000,
    livereload: true
  });
});

// jade task
gulp.task('jade', function() {
    gulp.src(['./source/**/*.jade', './source/**/_*.jade'])
        .pipe(jade({
            pretty: true
        }))  
        .on('error', console.log)
    .pipe(gulp.dest('./dist/')) 
    .pipe(connect.reload());
});

// stylus task
gulp.task('stylus', function() {
    gulp.src(['./source/**/*.styl', './source/**/_*.styl'])
        .pipe(stylus({
            use: [nib()]
        })) 
    .on('error', console.log) 
    .pipe(myth())
    .pipe(gulp.dest('./dist/')) 
    .pipe(connect.reload());
});

// js task
gulp.task('js', function() {
    gulp.src(['./source/**/*.js', '!./source/**/_*.js'])
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload());
});

// watch task
gulp.task('watch', function() {
    gulp.watch(['./source/**/*.styl'], ['stylus']);
    gulp.watch(['./source/**/*.jade'], ['jade']);
    gulp.watch(['./source/**/*.js'], ['js']);
});

gulp.task('default', ['connectDist', 'watch', 'jade', 'stylus', 'js']);