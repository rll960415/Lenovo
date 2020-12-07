var { src, dest, series, parallel, watch} = require('gulp');
var clean = require('gulp-clean');     //清理

function cleanTask(){
    return src('./dist',{allowEmpty:true})   //{allowEmpty:true}当此文件夹不存在时也可以清理（防止报错）
            .pipe(clean());
}



moudle.exports = {
    //开发调用的命令（开发时一般都压缩，与生产的命令不一样）
    dev:series(cleanTask),
    //生产调用的命令
    build:series(cleanTask)


};