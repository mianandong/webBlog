```
this指的是函数运行时所在的环境
```

```js
var obj = {
  foo: function () { 
    console.log(this.bar);
  },
  bar: 1
};

var foo = obj.foo;
var bar = 2;

obj.foo() // 1
foo() // 2
```
```
虽然obj.foo和foo指向同一个函数，但是执行结果可能不一样。
对于obj.foo()来说，foo运行在obj环境，所以this指向obj；
对于foo()来说，foo运行在全局环境，所以this指向全局环境。
所以，两者的运行结果不一样。
```
