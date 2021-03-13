```
JavaScript 中，函数及变量的声明都将被提升到函数的最顶部。
JavaScript 中，变量可以在使用后声明，也就是变量可以先使用再声明。
```

## 变量提升
```js
var a = 99;
f();
console.log(a);
function f() {
  console.log(a);
  var a = 10;
  console.log(a);
}

输出：
undefined
10
99

变量提升仅仅是提升其变量声明
function f() {
  var a;
  console.log(a);
  a = 10;
  console.log(a);
}
```

## 函数提升
```js
var foo = function () {
    console.log('foo1');
}
foo();  // foo1
var foo = function () {
    console.log('foo2');
}
foo(); // foo2
```

```js
function foo() {
    console.log('foo1');
}
foo();  // foo2
function foo() {
    console.log('foo2');
}
foo(); // foo2
```
## 函数提升和变量提升的顺序
```js
function foo() {
  console.log(a);
  var a = 1;
  console.log(a);
  function a() {}
  console.log(a);
}
foo();

上面的代码在js眼中是这样解析的：

function foo() {
  var a;
  function a() {}
  console.log(a); // a()
  a = 1;
  console.log(a); // 1
  console.log(a); // 1
}
foo();

所以从上面的栗子可以看到，变量的提升是在函数提升之前的
```

## 原理
```
之所以会存在变量提升，其实是和【变量对象】的创建有关。
如果对【变量对象】不理解，可以去看闭包一章的讲解

变量对象是context对象中的一个重要属性，其创建过程如下：

1. 创建arguments对象，其中保存有多个属性，属性的key值是'0','1','2'......，value值就是传入的参数的实际值。
2. 找到这个作用域内的所有var和function的声明，作为属性存储在变量对象中，
如果是function，那属性名就是函数名，属性值是函数的引用。
如果是var，那属性名就是变量名，属性值是undefined.

理解了变量对象创建的过程，你就可以理解为什么会有变量提升这个特性了。

console.log(a);   // undefined
var a = 1;
```
