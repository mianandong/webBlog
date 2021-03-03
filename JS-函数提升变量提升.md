```
JavaScript 中，函数及变量的声明都将被提升到函数的最顶部。
JavaScript 中，变量可以在使用后声明，也就是变量可以先使用再声明。
```

### 变量提升
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

### 函数提升
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
### 函数提升和变量提升的顺序
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

