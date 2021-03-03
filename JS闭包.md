### 概念
```
闭包是指有权访问另一个函数作用域中的变量的函数。
简单的理解闭包：子函数可以使用父函数的局部变量
```

### 缺点
- 闭包会导致局部变量不被垃圾回收机制清理，增大内存消耗
- 闭包使用不当可能会导致内存泄露

### 优点
- 避免全局变量污染
- 模拟私有变量

## 应用
### 替换无参箭头函数
```js
我们写点击的回调函数比较多，通常会使用箭头函数给被调函数传参，
这种情况都可以改为闭包的写法

对比差异
function makeSizer(size) {
  document.body.style.fontSize = size + 'px';
}
document.getElementById('size-12').onclick = () => makeSize(12);
document.getElementById('size-14').onclick = () => makeSize(14);
document.getElementById('size-16').onclick = () => makeSize(16);

使用闭包
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}
document.getElementById('size-12').onclick = makeSizer(12);
document.getElementById('size-14').onclick = makeSizer(14);
document.getElementById('size-16').onclick = makeSizer(16);
```

### 模拟私有方法
```js
var makePerson = function(){
  var name;
  return {
    getName: function() {
      return name;
    },
    setName: function(newName) {
      name = newName;
    }
  }
};

var person = makePerson();
person.setName('xuwei');
person.get(Name); // xuwei

其他方式无法访问name属性，起到了数据隐藏和封装的好处
```



