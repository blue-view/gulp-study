//处理任务
var gulp=require("gulp");
var imagemin=require("gulp-imagemin");
var uglify=require("gulp-uglify");
var sass=require("gulp-sass");
var concat=require("gulp-concat");

/**
 * 常用的方法
 * gulp.task --定义任务
 * gulp.src --找到需要执行任务的文件
 * gulp.dest --执行任务的去处
 * gulp.watch --观察文件是否发生变化
 */
//定义任务
gulp.task('message',function(){
    return console.log("Gulp is runnding!");
});
//copy文件
gulp.task("copyHtml",function(){
    gulp.src("src/*.html").pipe(gulp.dest(("dist")));
});
//图片压缩
gulp.task("imageMin",function(){
    gulp.src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
});
//压缩js
// gulp.task("minify",function(){
//     gulp.src("src/js/*.js")
//     .pipe(uglify())
//     .pipe(gulp.dest("dist/js/"));
// });
//sass转换css
gulp.task("sass",function(){
    gulp.src("src/sass/*.scss")
    .pipe(sass().on("error",sass.logError))
    .pipe(gulp.dest("dist/css"));
});
//合并代码
gulp.task("script",function(){
    gulp.src("src/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    ;
});
//监听是否发生变化
gulp.task("watch",function(){
    gulp.watch("src/js/*.js",["script"]);
    gulp.watch("src/images/*",["imageMin"]);
    gulp.watch("src/sass/*.scss",["sass"]);
    gulp.watch("src/*.html",["copyHtml"]);
});
gulp.task("default",["copyHtml","imageMin","sass","script"]);