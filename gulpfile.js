const gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*'],
        replaceString: /\bgulp[\-.]/,
        lazy: true,
        camelize: true
    }),
    cachebust = new $.cachebust();



gulp.task('views', () => {
    return gulp.src('./client/views/**/*')
        .pipe($.print())
        .pipe($.htmlmin({
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            minifyJS: true,
            minifyCSS: true,
            removeComments: true,
        }))
        .pipe(gulp.dest('./dist/views'))
})

gulp.task('minify-css', () => {
    return gulp.src('./client/styles/*.css')
        .pipe($.sourcemaps.init())
        .pipe($.print())
        .pipe(cachebust.resources())
        .pipe($.cleanCss())
        .pipe($.sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/styles'))
})

gulp.task('build-js', () => {
    return gulp.src('./client/js2/**/*.js')
        .pipe($.sourcemaps.init())
        .pipe($.print())
        .pipe($.babel({presets: ['es2015', 'es2017']}))
        .pipe($.concat('bundle.js'))
        .pipe($.ngAnnotate())
        .pipe($.iife())
        .pipe($.uglify({compress: {sequences: false, join_vars: false}}))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', ['views', 'minify-css', 'build-js'], () => {
    return gulp.src('./client/index.html')
        .pipe(cachebust.references())
        .pipe($.htmlmin({
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            minifyURLs: true,
        }))
        .pipe(gulp.dest('./dist'))
});

gulp.task('watch', () => {
    return gulp.watch(['./client/index.html', './client/js/**/*.js', './client/styles/*.css'], ['build']);
});

gulp.task('default', ['build', 'watch']);