var gulp = require('gulp');
var sass = require('gulp-sass'); //编译css的
var autoprefixer = require('gulp-autoprefixer'); //前缀
var clean = require('gulp-clean-css'); //压缩css
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel')
var html = require('gulp-htmlmin');
var server = require('gulp-webserver');
var fs = require('fs');
var url = require('url')
var path = require('path')


gulp.task('scss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass({ outputStyle: 'compressed' })) //编译scss
        .pipe(autoprefixer()) //前缀
        .pipe(concat('all.css'))
        .pipe(clean()) //压缩css
        .pipe(gulp.dest('./src/css'))
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
    return gulp.src('./src/**/*.{html,js,css,jpg}')
        .pipe(gulp.dest('./dist'))
})
gulp.task('server', function() {
    return gulp.src('./dist')
        .pipe(server({
            port: 3000,
            host: '172.21.66.50',
            livereload: true,
            open: true,
            middleware: function(req, res, next) {
                if (req.url == '/favicon.ico') {
                    return res.end()
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname == '/' ? 'index.html' : pathname
                if (pathname) {
                    res.end(fs.readFileSync(path.join(__dirname, 'dist', pathname)))
                }
            }
        }))
})
gulp.task('default', gulp.series('server', 'scss', 'js', 'copy', 'watch'))