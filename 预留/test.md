【JS 防抖 节流】

【JS 数组去重】（使用set数据结构）
function unique(array) {
   return Array.from(new Set(array));
}

【JS 类型判断】
typeof 返回值可能是 
undefined、object、boolean、number、string、function

Null和Object都返回object字符串

除此之外 Object 下还有很多细分的类型呐，如 Array、Function、Date、RegExp、Error 等。

怎么区分呐？-  Object.prototype.toString

var date = new Date();
console.log(Object.prototype.toString.call(date)) // [object Date]

与instanceof的区别
Isntanceof 用户判断对象是否属于某个原型对象

【JS 深浅拷贝】
数组的方法：concat 和 slice 是一种浅拷贝。

数组的深拷贝：json的序列化反序列化

手动实现浅拷贝和深拷贝

【JS 数组方法】
https://www.cnblogs.com/Faith-Yin/p/12360892.html

【求数组最大值】


var arr = [6, 4, 1, 8, 2, 11, 23];
console.log(Math.max(...arr))

【数组扁平化】
递归， 数组的 concat方法， instanceof Array 数组判断

【JS常见的数据结构】


ECMAScript 6（以下简称ES6）是JavaScript语言的下一代标准，已经在2015年6月正式发布了。
ECMAScript是JavaScript语言的国际标准，JavaScript是ECMAScript的实现。
【ES6】

https://es6.ruanyifeng.com/
