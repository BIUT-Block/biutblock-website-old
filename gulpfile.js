// 皮肤开发sass监听
'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var jsmin = require("gulp-uglify");
var cssmin = require("gulp-minify-css");
var del = require("del");

var tempforder = "dorawhite";

var doraWhiteSassPath = './src/index/dorawhite/css/main.scss';
var doraWhiteCssPath = './public/themes/dorawhite/css';

var doraWhiteNormalJs = './src/index/' + tempforder + '/js/main.js';
var doraWhiteMinJs = './public/themes/' + tempforder + '/js/';

gulp.task("cleanjs", function () {
    return del(doraWhiteMinJs + 'main.js');
});

gulp.task("jsmin", ["cleanjs"], function () {
    return gulp.src(doraWhiteNormalJs)
        .pipe(jsmin())
        .pipe(gulp.dest(doraWhiteMinJs));
});


gulp.task('sass', function () {
    return gulp.src(doraWhiteSassPath)
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest(doraWhiteCssPath));
});

gulp.task('default1', function () {
    gulp.watch(doraWhiteNormalJs, ['jsmin']);
});

gulp.task('default', ['default1'], function () {
    gulp.watch(doraWhiteSassPath, ['sass']);
});