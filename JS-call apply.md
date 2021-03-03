```
call 和 apply 都是为了改变某个函数运行时的 context 即上下文而存在的，换句话说，就是为了改变函数体内部 this 的指向。
call 和 apply二者的作用完全一样，只是接受参数的方式不太一样。
```

##作用
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
