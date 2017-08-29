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
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/views'))
})

gulp.task('build-js', () => {
    return gulp.src('client/js2/**/*.js')
        .pipe($.sourcemaps.init())
        .pipe($.print())
        .pipe($.babel({presets: ['es2015']}))
        .pipe($.concat('bundle.js'))
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', ['build-js', 'views', 'watch'], () => {
    return gulp.src('client/index.html')
        .pipe($.htmlmin({collapseWhitespace: true}))
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    return gulp.watch(['./client/index.html', './client/js/**/*.js'], ['build']);
});

gulp.task('default' , ['watch' , 'build']);