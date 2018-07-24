
var gulp = require('gulp'),
	babel = require("gulp-babel"),
	del = require('del'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	rename = require('gulp-rename'),
	cssnano = require('gulp-cssnano'),
	browserSync = require('browser-sync')
	;




gulp.task('clean', function() {
	'use strict';
    return del.sync(['dist']);
});

gulp.task('build', ['clean', 'less', 'js'], function() {
	'use strict';
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

gulp.task('browser-sync', function() {
	'use strict';
	browserSync({
		server: {
			baseDir: 'www'
		},
		// proxy: 'soundstream',
		port: 	9999,
		notify: false,

		/*ghostMode: {
		    clicks: true,
		    forms: true,
		    scroll: false
		},*/
		ghostMode: false
	});
});

gulp.task('less', function() {
	'use strict';
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
			.pipe(browserSync.reload({stream: true}));
});

/*gulp.task('utils', function() {
	'use strict';
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
	'use strict';
	return gulp.src('www/libs/bootstrap-material-design-master/less/bootstrap-material-design.less')
			.pipe(less())
			.pipe(autoprefixer(
				['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
				{ cascade: true })
			)
			.pipe(gulp.dest('www/libs/libs/bootstrap-material-design-master/dist/css'))
			.pipe(browserSync.reload({stream: true}));
});*/

gulp.task('js', function() {
	'use strict';
	return gulp.src([
				'www/js/index.js'
			])
			.pipe(babel())
			.pipe(concat('index.js'))
			.pipe(gulp.dest('www/js'))
			.pipe(browserSync.reload({stream: true}));
});

gulp.task('js-min', function() {
	'use strict';
	return gulp.src('www/js/index.js')
			.pipe(rename('index.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('www/js'));
});


// gulp.task('watch', ['browser-sync', 'less'], function() {
gulp.task('watch', ['browser-sync'], function() {
	'use strict';
	gulp.watch('www/*.html', browserSync.reload);
	gulp.watch('www/**/*.php', browserSync.reload);
	gulp.watch('www/layouts/*.php', browserSync.reload);

    gulp.watch(
    	[
    		'www/js/index.js'
    	],
    	// ['js', 'js-min']
    	['js']
	);

	gulp.watch([
			'www/less/index.less'
		], ['less']);


	// gulp.watch('www/libs/utils/*.less', ['utils']);
});

gulp.task('default', ['watch']);

