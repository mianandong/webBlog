### 含义
```
事件持续触发，但只有等事件停止触发n秒后才执行函数
```
### 思路
```
创建一个定时器执行回调，事件触发则定时器重新开始计时
```
### 实现
```js
var timeout;
function fangdou(func, wait) {
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    }
} 

这样就可以，但是会造成全局变量污染，
使用闭包解决这个问题

function fangdou(func, wait) {
    var timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    }
}
```
### 优化
```
保证回调函数的this指向事件的触发者
```

```js
function fangdou(func, wait) {
    var timeout;
    return function() {
        var context = this;
        clearTimeout(timeout);
        setTimeout(func.bind(context), wait);
    }
}
```
### 进阶
```
需求改进：第一次是立刻执行，事件停止触发n秒后再执行一次。如果事件又一次触发，还是立刻执行。
```
### 思路
```
1. 如果定时器为undefined或null，立刻执行回调。
2. n秒后定时器触发回调，除了执行func, 顺便把定时器置null。
```
### 实现
```js
function fangdou(func, wait) {
    var timeout;
    return function() {
        var context = this;
        // 如果定时器为undefined或null，则立即执行回调函数
        if (!timeout) {
            func.call(this);
        }
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.call(this);
            // 这一句很关键，就是当回调执行完，要把定时器置null
            // 这样下次再次触发事件，才可以立即执行
            timeout = null;
        }, wait);
    }
}
```