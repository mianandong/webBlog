## call apply
```
call 和 apply 都是为了改变某个函数运行时的 context 即上下文而存在的，换句话说，就是为了改变函数体内部 this 的指向。
call 和 apply二者的作用完全一样，只是接受参数的方式不太一样。
```

## 作用
### 改变this指向
```js
var name = 'xuwei';

var obj = {
    name: 'linxin'
}

function func() {
    console.log(this.name);
}
func(); // xuwei, this指向window
func.call(obj);  // linxin, this指向obj
```

### “劫持”别人的方法
```js
var foo = {
   name: "xuwei",
   logName: function (){
     console.log(this.name);
   }
}
var bar = {
   name: "tangning"
};
foo.logName.call(bar); //tangning

这样，bar就有了logName的方法
```

### 实现继承
```js
function Animal(name){  
   this.name = name;  
   this.showName = function(){  
     console.log(this.name);  
   }
}

function Cat(name){ 
   Animal.call(this, name); 
}

var cat = new Cat("Black Cat");  
cat.showName(); //Black Cat
```
```
如果你不是new Cat而是直接调用函数
Cat('Baba');
则this指向的是window
window.showName(); // 'Baba'
```

## bind
```
它和 call 很相似，接受的参数有两部分，第一个参数是是作为函数上下文的对象，第二部分参数是个列表，可以接受多个参数。
主要区别是返回值
```

```js
var obj = {
    name: 'xuwei'
}

function func() {
    console.log(this.name);
}

var func1 = func.bind(obj);
func1();    // xuwei 
```
```
bind 方法不会立即执行，而是返回一个改变了上下文 this 后的函数。
而原函数 func 中的 this 并没有被改变，依旧指向全局对象 window。
```


