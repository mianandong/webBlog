```js
function Answer(str) {
    if (str == null || str == undefined || str.length == 1) {
        return str;
    }

    return str.split('').reverse().join('');
}
```