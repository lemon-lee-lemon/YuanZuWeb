const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const cleanCss = require("gulp-clean-css");
//压缩html
gulp.task("html",()=>{
	gulp.src("src/**/*.html")
	    .pipe(htmlmin({
	    	   removeComments: true,//清除HTML注释
	           collapseWhitespace: true,//压缩HTML
	           collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
	           removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
	           removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
	           removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"	          
	    }))
	    .pipe(gulp.dest("dist"))
	    .pipe(connect.reload());
})
//压缩js
gulp.task("js",()=>{
	gulp.src("src/js/**/*.js")
        .pipe(babel({
            presets: ['@babel/env']
         }))
	    .pipe(uglify())
	    .pipe(gulp.dest("dist/js"))
	    .pipe(connect.reload());
})
//压缩css
gulp.task("css",()=>{
	gulp.src("src/scss/**/*.scss")
	    .pipe(sass())
	    .pipe(cleanCss())
	    .pipe(gulp.dest("dist/css"))
	    .pipe(connect.reload());
})


//开启服务器
gulp.task("server",()=>{
	connect.server({
       port:1024,
       livereload:true,
       root:"dist"
	})
})
//移动静态资源
gulp.task("static",()=>{
	gulp.src("src/static/**/*")
	    .pipe(gulp.dest("dist/static"))
	    .pipe(connect.reload());
})
gulp.task("libs",()=>{
	gulp.src("src/libs/**/*")
	    .pipe(gulp.dest("dist/libs"))
	    .pipe(connect.reload());
})


//监听文件改变
gulp.task("watch",()=>{
	gulp.watch("src/**/*.html",["html"]);
	gulp.watch("src/**/*.js",["js"]);
	gulp.watch("src/**/*.scss",["css"]);
	gulp.watch("src/static/**/*",["static"]);
	gulp.watch("src/libs/**/*",["libs"]);
	
})

gulp.task("default",["html","js","watch","static","server","css","libs"])