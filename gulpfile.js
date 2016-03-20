var gulp = require('gulp');
var tsc = require('gulp-typescript');
var tsProject = tsc.createProject('client/tsconfig.json');
var sourcemaps = require('gulp-sourcemaps');
var config = require('./gulp.config')();
var del = require('del');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var node;
var spawn = require('child_process').spawn;
var path = require('path');

gulp.task('clean', function() {
    return del(config.distDir);
});

gulp.task('server', ['clean'], function() {
    return gulp.src(config.nodeHost)
        .pipe(gulp.dest(config.distDir))
});

gulp.task('lib', ['clean'], function() {
    return gulp.src(config.angularLibraries)
        .pipe(gulp.dest(path.join(config.distDir,'client','lib')));
});

gulp.task('compile-ts', ['clean'], function() {
    var sourceTsFiles = [
        config.allTs,
        config.typings
    ];

    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(config.distDir,'client')));
});

gulp.task('index', ['compile-ts', 'lib', 'clean'], function() {
    return gulp.src(config.indexFile)
        .pipe(gulp.dest(path.join(config.distDir,'client')));
});

gulp.task('build', ['compile-ts', 'lib', 'index', 'server']);
gulp.task('default', ['build']);

// Deveopment serve tasks - start

gulp.task('watch', function() {
    gulp.watch(['./app.js', '!./dist/**', './client/**'], ['stop', 'reload']);
});

gulp.task('browser-sync', ['nodestart'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3001",
        port: 7000,
    });
});

gulp.task('reload-browser-sync', ['nodestart'], function() {
    reload();
});

gulp.task('nodestart', ['build'], function() {
    node = spawn('node', ['dist/app.js'], { stdio: 'inherit' })
    node.on('close', function(code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('start', ['build', 'nodestart', 'watch', 'browser-sync']);
gulp.task('reload', ['build', 'nodestart', 'reload-browser-sync']);
gulp.task('stop', function() {
    if (node) node.kill();
});

// Deveopment serve tasks - end