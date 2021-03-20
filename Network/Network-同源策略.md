## 同源策略
### 定义
```
如果两个 URL 的 protocol、port (如果有指定的话)和 host 都相同的话，则这两个 URL 是同源。
```
### 目的
```
是为了保证用户信息的安全，防止恶意的网站窃取数据。
设想这样一种情况：A网站是一家银行，用户登录以后，又去浏览其他网站。
如果其他网站可以读取A网站的 Cookie，会发生什么？
很显然，如果 Cookie 包含隐私（比如存款总额），这些信息就会泄漏。
更可怕的是，Cookie 往往用来保存用户的登录状态，如果用户没有退出登录，其他网站就可以冒充用户，为所欲为。
```
### 限制范围
```
同源策略会限制哪些数据的读取？
（1） Cookie、LocalStorage 和 IndexDB 无法读取。
（2） DOM 无法获得。
（3） AJAX 请求不能发送。
参考：
http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html
```
### 规避手段
1. 跨域资源共享CORS
```
该方法主要是浏览器和服务器之间通过Http中的Origin头部字段和Access-Control-Allow-Origin头部字段配合，
实现跨越访问。

如果涉及到非简单请求，浏览器在正式请求前会发起一次“预检”请求。
所谓额预检请求，就是提前问一下服务器，这个Origin的client要请求你，你是否同意，
类似于提前打个招呼。
```
2. JSONP
```js
首先你要知道，HTML中的script标签可以加载并执行其他域的javascript，
于是我们可以通过script标记来动态加载其他域的资源。
同样的，这也需要服务器端的配合才能完成。

client
//动态创建<script>标签的函数
function addScriptTag(src){
  var script = document.createElement('script');
  script.setAttribute("type","text/javascript");
  script.src = src;
  document.body.appendChild(script);
}
//页面加载完毕时执行addScriptTag()函数
window.onload = function () {
  addScriptTag('http://www.baidu.com?info=needInfo?callback=callbackName');
}
//回调函数
function callbackName(data) {
  console.log('远程返回的JSON数据为：'+data);
}

跨域服务器：
callbackName({"infoOne":"one","infoTwo":"two",……});


缺点: 由于是通过<script>标签来实现，所以它只能发送GET请求
```
3. document.domain
```
首先你要知道，同源策略认为www1.baidu.com和 www2.baidu.com是不同的域
这时，我们无法在www1.baidu.com下的页面中调用www2.baidu.com中定义的JavaScript方法。
但是当我们把它们document的domain属性都修改为baidu.com，浏览器就会认为它们处于同一个域下，
那么我们就可以互相调用对方的method来通信了。并且二者可以共享cookie！
```
4. websocket
```
websocket是一种全双工的通信协议，该协议不实行同源策略。所以在使用该协议进行通信时，完全不用考虑同源策略。

GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com

上面代码中，有一个字段是Origin，表示该请求的请求源（origin），即发自哪个域名。
正是因为有了Origin这个字段，所以WebSocket才没有实行同源政策。
因为服务器可以根据这个字段，判断是否许可本次通信。
```

5. 代理服务器
```
架设代理服务器，浏览器请求同源服务器，再由后者请求外部服务
```

### 参考资料
```
浏览器同源政策及其规避方法 - 阮一峰的网络日志
http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html
同源策略及规避方法_Nundy-CSDN博客
https://blog.csdn.net/Unique_Sirius/article/details/70275269
```
