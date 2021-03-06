### gulp的基本使用
```
全局安装 gulp：
$ npm install --global gulp
```
```
作为项目的开发依赖（devDependencies）安装：
$ npm install --save-dev gulp
```
```
在项目根目录下创建一个名为 gulpfile.js 的文件：
var gulp = require('gulp');
gulp.task('default', function() {
    // 将你的默认的任务代码放在这
});
```
```
运行 gulp：
$ gulp
```
```js
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('hello', function() {
    // 将你的默认的任务代码放在这
    console.log('hello world!');
});
gulp.task('sass',function(){
  return gulp.src('src/main/webapp/static/styles/scss/apply.scss')
   .pipe(sass())
   .pipe(gulp.dest('src/main/webapp/static/styles/css'))
});
```

### 区别
```
gulp是工具链、构建工具。
gulp通过配置一系列的task，定义task处理的事务,
然后定义执行顺序，来让gulp执行task，从而构建其前端项目的流程。

webpack是文件打包工具，可以把项目的各种js、css文件等打包合并成一个或多个文件。
```