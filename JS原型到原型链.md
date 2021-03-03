```js
首先说明三个概念
构造函数，实例对象，原型对象。

构造函数中相关属性是  prototype
实例对象中相关属性是  __proto__
原型对象中相关属性是  constructor  __proto__


function Person() {
}
var person1 = new Person();
var person2 = new Person();

var obj1 = new Object();
var obj2 = new Object();
```

```
构造函数 Person
实例对象 person1 person2
原型对象 person1.__proto__ 或者 Person.prototype
```

### `构造函数的 prototype 与实例对象的 __proto__ 指向同一个对象，即原型对象。`

```js
person1.__proto__ === Person.prototype // true
person2.__proto__ === Person.prototype // true
```

### `原型对象的 constructor 指向构造函数`

 ```js
person1.__proto__.constructor === Person // true
person2.__proto__.constructor === Person // true
Person.prototype.constructor === Person //true
 ```

### `原型对象的 __proto__ 指向原型对象的原型对象，即Object的原型对象。`

```js
person1.__proto__.__proto__ === obj1.__proto__ // true
person2.__proto__.__proto__ === obj1.__proto__ // true
person1.__proto__.__proto__ === obj2.__proto__ // true
```
### `原型链`
```
由上图可以看出来，原型对象通过 __proto__ 连接起来，形成了一条链，俗称“原型链”
原型链的作用：
实例对象可以从原型对象中继承属性。
假设读取实例对象的name属性，如果当前实例对象没有该属性，则去原型对象中查找。
如果原型对象中没有，则去原型对象的原型对象中查找，依次递归，直到找到该属性。
如果一直递归到Object的原型对象依然没有找到，则返回null。
```
