### 直接创建Object实例
```javascript
var person = new Object();
person.name = 'zzx';
person.age = 20;
person.job = 'Programmer';

person.sayName = function(){
    console.log(this.name);
};

var person = {
    name: 'zzx';
    age: 20;
    job: 'Programmer';
    
    sayName: function(){
        console.log(this.name);
    }
}
```
```
缺点：
每次创建一个对象就需要手动设置它的每一个属性，造成大量代码重复
```

### 构造函数模式
```js
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        console.log(this.name);
    };
}

var person1 = new Person('zzx', 22, 'Programmer');
```
```js
构造函数名开头大写借鉴了其他面向对象语言，是为了区别普通函数。
任何一个函数不通过new操作符调用，就是一个普通函数。

缺点：
sayName方法在每次实例化时都会重新创建一遍。

var person1 = new Person('zzx', 22, 'Programmer');
var person2 = new Person('yzy', 20, 'Teacher');
console.log(person1.sayName == person2.sayName); //flase
```

### 原型模式
```js
function Person(){
}

Person.prototype.name = 'zzx';
Person.prototype.age = 22;
Person.prototype.job = 'Programmer';
Person.prototype.sayName = function(){
    console.log(this.name);
}

var person1 = new Person();
person1.sayName(); //zzx
var person2 = new Person();
console.log(person1.sayName == person2.sayName); //true
```
```
缺点：
当原型中包含引用类型值属性时会出现相互影响(变量共享)。
基本类型的变量可以屏蔽这个问题。
```

### 构造函数模式和原型模式相结合
```js
构造函数模式用于定义实例属性，
而原型模式用于定义方法和共享的属性。

function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['wc', 'rt'];
}

Person.prototype = {
    sayName: function(){
        console.log(this.name);
    }
};
```
```
我们推荐使用最后一种方式。
```


