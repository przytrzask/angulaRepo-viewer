


'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var haml = require('gulp-haml');
 
gulp.task('sass', function () {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('haml', function () {
  gulp.src('./app/index.haml')
    .pipe(haml())
    .pipe(gulp.dest('./app/'));
});
 
gulp.task('watch', function () {
  gulp.watch('./app/sass/**/*.scss', ['sass']);
  gulp.watch('./app/*.haml', ['haml']);
});

gulp.task('default', () =>
    gulp.src('./app/css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'],
            cascade: false
        }))
        .pipe(gulp.dest('./app/css'))
);