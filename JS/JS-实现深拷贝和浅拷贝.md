### 浅拷贝
```js
function shallowCopy(obj) {
    if (typeof(obj) !== 'object') {
        return obj;
    }
    let newObj = Array,isArray(obj) ? [] : {}
    for(let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
```
```
需要注意的是，数组和对象都可以使用 for in 遍历
```

### 深拷贝
```js
function deepCopy(obj) {
    if (typeof(obj) !== 'object') {
        return obj;
    }
    let newObj = Array.isArray(obj) ? [] : {};
    for(let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof(obj[key]) === 'object') {
                newObj[key] = deepCopy(obj[key]);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    return newObj;
}
```
```
深拷贝的不同是，当判断属性为对象时，递归调用函数。
```