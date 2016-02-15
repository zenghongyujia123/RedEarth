var gulp = require('gulp');
//var gutil = require('gulp-util');
//var bower = require('bower');
var less = require('gulp-less');
var concat = require('gulp-concat');
//var angularTemplateCache = require('gulp-angular-templatecache');
//var sass = require('gulp-sass');
//var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
//
gulp.task('js-concat', function () {
  return gulp.src([
      'webapp/app/**.js',
      'webapp/directives/**/*.js',
      'webapp/interceptors/**/*.js',
      'webapp/services/**/*.js',
      'webapp/controllers/**/*.js'
    ])
    .pipe(concat('agilesales-web.js'))
    .pipe(gulp.dest('webapp/dist/js'))
});

gulp.task('less-concat', function () {
  return gulp.src('webapp/lesses/index.client.style.less')
    .pipe(less())
    .pipe(rename(function (path) {
      path.basename = 'agilesales-web';
    }))
    .pipe(gulp.dest('webapp/dist/css'));
});

gulp.task('homepage-less', function () {
  return gulp.src('homepage/index.less')
    .pipe(less())
    .pipe(rename(function (path) {
      path.basename = 'index';
    }))
    .pipe(gulp.dest('homepage'));
});

//gulp.task('template-concat', function () {
//  return gulp.src([
//      'www/templates/*.html'
//    ])
//    .pipe(angularTemplateCache())
//    .pipe(concat('agilisales.templates.js'))
//    .pipe(gulp.dest('www/dist/js'));
//});

gulp.task('web', ['js-concat', 'less-concat','homepage-less']);


