### 同源策略
```
定义：
如果两个 URL 的 protocol、port (如果有指定的话)和 host 都相同的话，则这两个 URL 是同源。
```
```
目的：
是为了保证用户信息的安全，防止恶意的网站窃取数据。
设想这样一种情况：A网站是一家银行，用户登录以后，又去浏览其他网站。
如果其他网站可以读取A网站的 Cookie，会发生什么？
很显然，如果 Cookie 包含隐私（比如存款总额），这些信息就会泄漏。
更可怕的是，Cookie 往往用来保存用户的登录状态，如果用户没有退出登录，其他网站就可以冒充用户，为所欲为。
```
```
限制范围：
同源策略会限制哪些数据的读取？
http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html
```
```
规避手段：

```
### this

### cookie session localStorage的区别

### bind apply call的区别

### 闭包

### 防抖节流

### promise

### let const var的区别

