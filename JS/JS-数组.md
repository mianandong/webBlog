https://www.cnblogs.com/Faith-Yin/p/12360892.html

### 数组去重
```js
var arr = [1,2,3,3,4,4];
var brr = Array.from(new Set(arr));
```

### 数组拼接
```js
var arr = [1,2,3];
var brr = arr.concat([4,5]);
console.log(arr); // [1,2,3]
console.log(brr); // [1,2,3,4,5]

var crr = arr.concat();
console.log(crr); // [1,2,3] 实现浅拷贝
```

### 数组转字符串
```js
var arr = [1,2,3];
var str = arr.join(''); // "123"
```

### 数组截取
```js
var arr = [1,2,3,4]
var brr = arr.slice(1,3); // [2,3]
```

### 数组的插入删除
```js
pop() // 尾出
push() // 尾进
shift() // 头出
unshift() // 头进
```

### 求数组最大值
```js
var arr = [23,45,3];
var max = Math.max(...arr);
```

### 数组实现深拷贝
```
利用JSON的序列化和反序列化
```