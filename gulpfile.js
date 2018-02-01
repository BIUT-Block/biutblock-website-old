// 皮肤开发sass监听
'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');

var doraWhiteSassPath = './src/index/dorawhite/css/main.scss';
var doraWhiteCssPath = './public/themes/dorawhite/css';


gulp.task('sass', function () {
    return gulp.src(doraWhiteSassPath)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(doraWhiteCssPath));
});

gulp.task('default', function () {
    gulp.watch(doraWhiteSassPath, ['sass']);
});