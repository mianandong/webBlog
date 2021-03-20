## 强缓存
```
强缓存：
不会向服务器发送请求，直接从缓存中读取资源，在chrome控制台的Network选项中可以看到该请求返回200的状态码，并且Size显示from disk cache或from memory cache。
强缓存可以通过设置两种 HTTP Header 实现：Expires 和 Cache-Control。
```

### Expires
```
缓存过期时间，用来指定资源到期的时间，是服务器端的具体的时间点。
Expires 是 HTTP/1 的产物，受限于本地时间，如果修改了本地时间，可能会造成缓存失效。
Expires: Wed, 22 Oct 2018 08:41:00 GMT表示资源会在 Wed, 22 Oct 2018 08:41:00 GMT 后过期，需要再次请求。
```
### Cache-Control
```
在HTTP/1.1中，Cache-Control是最重要的规则，主要用于控制网页缓存。
比如当Cache-Control:max-age=300时，则代表在这个请求正确返回时间（浏览器也会记录下来）的5分钟内再次加载资源，就会命中强缓存。
因为是通过相对时间设定，即使修改本地时间也没有影响
```
### 两者区别
```
Expires 是http1.0的产物，Cache-Control是http1.1的产物；
两者同时存在的话，Cache-Control优先级高于Expires；
在某些不支持HTTP1.1的环境下，Expires就会发挥用处。所以Expires其实是过时的产物，现阶段它的存在只是一种兼容性的写法。
```
## 协商缓存
```
协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程.
协商缓存生效，返回304和Not Modified
协商缓存失效，返回200和请求结果
协商缓存可以通过设置两种 HTTP Header 实现：Last-Modified 和 ETag 。
```
### Last-Modified和If-Modified-Since
```
两者成对工作
Last-Modified用于服务器告知浏览器
If-Modified-Since用于浏览器告知服务器

浏览器在第一次访问资源时，服务器返回资源的同时，在response header中添加 Last-Modified的header，
值是这个资源在服务器上的最后修改时间，浏览器接收后缓存文件和header；

浏览器下一次请求这个资源，浏览器检测到有 Last-Modified这个header，于是添加If-Modified-Since这个header，值就是Last-Modified中的值；
服务器再次收到这个资源请求，会根据 If-Modified-Since 中的值与服务器中这个资源的最后修改时间对比，如果没有变化，返回304和空的响应体，直接从缓存读取，如果If-Modified-Since的时间小于服务器中这个资源的最后修改时间，说明文件有更新，于是返回新的资源文件和200

缺点：文件是否更新的判断依赖依赖于时间
```

### ETag和If-None-Match
```
两者成对工作
ETag用于服务器告知浏览器
If-None-Match用于浏览器告知服务器

Etag是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)，只要资源有变化，Etag就会重新生成。浏览器在下一次加载资源向服务器发送请求时，会将上一次返回的Etag值放到request header里的If-None-Match里，服务器只需要比较客户端传来的If-None-Match跟自己服务器上该资源的ETag是否一致，就能很好地判断资源相对客户端而言是否被修改过了。如果服务器发现ETag匹配不上，那么直接以常规GET 200回包形式将新的资源（当然也包括了新的ETag）发给客户端；如果ETag是一致的，则直接返回304知会客户端直接使用本地缓存即可。
```
### 两者区别
```
1. 在精确度上，Etag要优于Last-Modified。
Last-Modified的时间单位是秒，如果某个文件在1秒内改变了多次，那么他们的Last-Modified其实并没有体现出来修改，但是Etag每次都会改变确保了精度；如果是负载均衡的服务器，各个服务器生成的Last-Modified也有可能不一致。

2. 在性能上，Etag要逊于Last-Modified，毕竟Last-Modified只需要记录时间，而Etag需要服务器通过算法来计算出一个hash值。

3. 在优先级上，服务器校验优先考虑Etag
```
## 实际场景应用

### 频繁变动的资源
```
Cache-Control: no-cache

对于频繁变动的资源，首先需要使用Cache-Control: no-cache 使浏览器每次都请求服务器，然后配合 ETag 或者 Last-Modified 来验证资源是否有效。这样的做法虽然不能节省请求数量，但是能显著减少响应数据大小。
```
### 不常变化的资源
```
Cache-Control: max-age=31536000

通常在处理这类资源时，给它们的 Cache-Control 配置一个很大的 max-age=31536000 (一年)，这样浏览器之后请求相同的 URL 会命中强制缓存。而为了解决更新的问题，就需要在文件名(或者路径)中添加 hash， 版本号等动态字符，之后更改动态字符，从而达到更改引用 URL 的目的，让之前的强制缓存失效 (其实并未立即失效，只是不再使用了而已)。
在线提供的类库 (如 jquery-3.3.1.min.js, lodash.min.js 等) 均采用这个模式。
```

## 参考资料
```
深入理解浏览器的缓存机制 - 简书
https://www.jianshu.com/p/54cc04190252
```