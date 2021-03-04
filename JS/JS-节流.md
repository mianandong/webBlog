### 含义
```
事件持续触发，每隔n秒执行一次
```
### 实现

```js
function jieliu(func, wait) {
    var timeout;
    return function() {
        var context = this;
        if (!timeout) {
            timeout = setTimeout(() => {
                func.call(this);
                timeout = null;
            });
        }
    }
}
```