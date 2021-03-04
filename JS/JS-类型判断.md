```js
typeof
instanceof
Object.prototype.toString
```
### typeof
```
typeof 的返回值是字符串, 所有情况有：
'undefined'、'object'、'boolean'、'number'、'string'、'function'

特殊情况：typeof null 返回 object

Object 下还有很多细分的类型，如 Array、Function、Date、RegExp、Error 等。
这些如何区分？
可以使用 instanceof 或者 Object.prototype.toString
```
### instanceof
```
obj instanceof Object 检测Object.prototype是否存在于参数obj的原型链上。
也就是检测原型对象是否存在于该实例的原型链上。
```
```js
var date = new Date();
date instanceof Date // true
function Person() {}
var person = new Person();
person instanceof Person; // true
person instanceof Object; // true
```

### Object.prototype.toString
```js
var date = new Date();
Object.prototype.toString.call(date); // "[object Date]"
其实也就是date原型对象调用toString方法。
```