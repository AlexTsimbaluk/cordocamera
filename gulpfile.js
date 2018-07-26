'use strict';

var gulp = require('gulp'),
	babel = require("gulp-babel"),
	del = require('del'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	rename = require('gulp-rename'),
	cssnano = require('gulp-cssnano'),
	browserSync = require('browser-sync'),
    exec = require('child_process').exec // для запуска команд в терминале
;

// при изменении файлов откладываем перезагрузку на это время,
// чтобы cordova успела перезапуститься
var RELOAD_TIMEOUT = 1500;




gulp.task('clean', function() {
    return del.sync(['dist']);
});

gulp.task('build', ['clean', 'less', 'js'], function() {
    var buildCss = gulp.src([
        'www/css/main.css',
        'www/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'));

    var buildImg = gulp.src('www/img/**/*')
    .pipe(gulp.dest('dist/img'));

    var buildFonts = gulp.src('www/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('www/js/**/*')
    .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('www/*.html')
    .pipe(gulp.dest('dist'));

    var buildPhp = gulp.src('www/*.php')
    .pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', ['cordova-run'], function() {
    setTimeout(() => {
    	browserSync({
    		/*server: {
    			baseDir: 'www'
    		},*/
    		proxy: 'localhost:8000',
    		port: 	9999,
    		notify: false,

    		/*ghostMode: {
    		    clicks: true,
    		    forms: true,
    		    scroll: false
    		},*/
    		ghostMode: false
    	});
    }, 1500);
});

gulp.task('deferred-reload', ['cordova-serve'], function() {
    console.log('Waiting for ' + (RELOAD_TIMEOUT / 1000) + 's...');
    setTimeout(() => {
        browserSync.reload();
    }, RELOAD_TIMEOUT);
});

gulp.task('less', function() {
	return gulp.src('www/less/index.less')
			.pipe(less())
			.pipe(autoprefixer(
				['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
				{ cascade: true })
			)
			// TODO - починить минификацию
			/*.pipe(gulp.dest('www/css/'))
			.pipe(concat('main.min.css'))
	        .pipe(cssnano())*/
			.pipe(gulp.dest('www/css/'))
			// .pipe(browserSync.reload({stream: true}))
        ;
});

/*gulp.task('utils', function() {
	return gulp.src('www/libs/utils/layout.less')
			.pipe(less())
			.pipe(autoprefixer(
				['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
				{ cascade: true })
			)
			.pipe(gulp.dest('www/libs/utils/'))
			.pipe(browserSync.reload({stream: true}));
});*/

/*gulp.task('_bootstrap-material', function() {
	return gulp.src(
                'www/libs/bootstrap-material-design-master/less/bootstrap-material-design.less'
            )
			.pipe(less())
			.pipe(autoprefixer(
				['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
				{ cascade: true })
			)
			.pipe(gulp.dest('www/libs/libs/bootstrap-material-design-master/dist/css'))
			.pipe(browserSync.reload({stream: true}));
});*/

gulp.task('js', function() {
	return gulp.src([
				'www/js/index.js'
			])
			.pipe(babel())
			.pipe(concat('index.js'))
			.pipe(gulp.dest('www/js'))
			// .pipe(browserSync.reload({stream: true}))
        ;
});

gulp.task('js-min', function() {
	return gulp.src('www/js/index.js')
			.pipe(rename('index.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('www/js'));
});

gulp.task('cordova-serve', function() {
    console.log('::cordova:serve');
    exec('cordova serve');
});

gulp.task('cordova-build', function() {
    console.log('::cordova:build');
    exec('cordova build');
});

gulp.task('cordova-run', function() {
    console.log('::cordova:run');
    exec('cordova run');
});

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('www/*.html', ['deferred-reload']);

	gulp.watch('www/**/*.php', browserSync.reload);
	gulp.watch('www/layouts/*.php', browserSync.reload);

    gulp.watch(
    	[
    		'www/js/index.js'
    	],
    	['js', 'deferred-reload']
	);

	gulp.watch([
			'www/less/index.less'
		], ['less', 'deferred-reload']);


	// gulp.watch('www/libs/utils/*.less', ['utils']);
});

gulp.task('default', ['watch']);

