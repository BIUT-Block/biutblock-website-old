// 皮肤开发sass监听
'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var jsmin = require("gulp-uglify");
var cssmin = require("gulp-minify-css");

var doraWhiteSassPath = './src/index/dorawhite/css/main.scss';
var doraWhiteCssPath = './public/themes/dorawhite/css';


gulp.task('sass', function () {
    return gulp.src(doraWhiteSassPath)
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest(doraWhiteCssPath));
});

gulp.task('default', function () {
    gulp.watch(doraWhiteSassPath, ['sass']);
});