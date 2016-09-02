var gulp=require("gulp");
var less = require('gulp-less');
var browsersync= require('browser-sync').create();
var reload = browsersync.reload;


gulp.task('start',['less'],function() {
    browsersync.init({
        server:{baseDir:'./'},
        startPath:'src/html/combo.html'
    });
    gulp.watch('src/less/*.less',['less']);
    gulp.watch('src/html/*.html').on('change',reload);
    gulp.watch('src/js/*.js').on('change',reload);
    gulp.watch('src/img/*.jpg').on('change',reload);
});

gulp.task('less',function(){
    gulp.src('src/main.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'))
        .pipe(reload({stream:true}))
});














/*
var gulp = require('gulp');
var less = require('gulp-less');
var browsersync = require('browser-sync').create();
var reload = browsersync.reload;
var autoprefixer=require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('start', ['less'], function () {
    browsersync.init({
        server: {
            baseDir: './'
        },
        startPath: 'src/html/combo.html'
    })

    gulp.watch('src/less/!*.less', ['less']);
    gulp.watch('src/html/!*.html').on('change', reload);
    gulp.watch('src/js/!*.js').on('change', reload);
    gulp.watch('src/img/!*.jpg').on('change', reload);
})

gulp.task('less', function () {
    gulp.src('src/main.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'))
        .pipe(reload({stream:true}))
})*/
