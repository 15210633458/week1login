var gulp = require('gulp');
var sass = require('gulp-sass'); //编译css的
var autoprefixer = require('gulp-autoprefixer'); //前缀
var clean = require('gulp-clean-css'); //压缩css
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel')
var html = require('gulp-htmlmin');
var server = require('gulp-webserver');


gulp.task('scss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass({ outputStyle: 'compressed' })) //编译scss
        .pipe(autoprefixer()) //前缀
        .pipe(concat('all.css'))
        .pipe(clean()) //压缩css
        .pipe(gulp.dest('./css'))
})
gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
})
gulp.task('watch', function() {
    gulp.watch('./src/css/*.css', gulp.series('scss'));
    gulp.watch('./src/js/*.js', gulp.series('js'))
})
gulp.task('copy', function() {
    return gulp.src('./src')
        .pipe(gulp.dest('./src/**/*.{html,js,css,jpg}'))
})
gulp.task('default', gulp.series('scss', 'js', 'copy', 'watch'))