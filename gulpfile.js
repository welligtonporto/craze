var gulp       	= require('gulp');
var compass 	= require('gulp-compass');
var cleanCSS 	= require('gulp-clean-css');
var gcmq 	   	= require('gulp-group-css-media-queries');
var uglify 		= require('gulp-uglify');
var concat 		= require('gulp-concat');
var imagemin 	= require('gulp-imagemin');

// Styles
gulp.task('scss', function() {
	return gulp.src('src/scss/**/*.scss')
		.pipe(compass({
			css: 'dist/css',
			sass: 'src/scss',
			sourcemap: false
		}))
		.pipe(gcmq())
		.pipe(cleanCSS())
		.pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(uglify())
		.pipe(concat('functions.js'))
		.pipe(gulp.dest('dist/js'));
});

// Images
gulp.task('images', function () {
	return gulp.src('src/imgs/**/*')
		.pipe(imagemin([
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 1})
		]))
		.pipe(gulp.dest('dist/imgs'));
});

// Icons
gulp.task('icons', function () {
	return gulp.src('src/icons/**/*.{eot,ttf,woff,woff2,svg}')
		.pipe(gulp.dest('dist/icons'));
});

// Task default
gulp.task('default', ['scss','scripts','images','icons']);

// Task development
gulp.task('dev', ['default'], function() {
	gulp.watch('src/scss/**/*.scss', ['scss']);
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch('src/imgs/**/*', ['images']);
	gulp.watch('src/icons/**/*.{eot,ttf,woff,woff2,svg}', ['icons']);
});