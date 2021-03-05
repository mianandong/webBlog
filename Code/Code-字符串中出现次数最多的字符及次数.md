```js
function Answer(str) {
    if (str == null || str == undefined) {
        return null;
    }

    let obj = {};

    for(let key in str) {
        if (obj[str[key]]) {
            obj[str[key]]++;
        } else {
            obj[str[key]] = 1;
        }
    }

    let maxTime = 0;
    let maxString = '';
    for(let key in obj) {
        if (obj[key] > maxTime) {
            maxTime = obj[key];
            maxString = key;
        }
    }

    return {maxString, maxTime};
}
```