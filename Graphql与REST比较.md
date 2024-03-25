## REST
REST API的特性
1. 一个URI代表一种资源
2. 通过HTTP动词，对资源进行操作

## Graphql
Graphql的特性
1. 只有一个endpoint
2. 所有请求都是post请求，通过graphql body是query还是mutation来区分

从实践的角度出发，一个页面所需要的数据，往往是由若干API返回的信息组装而成的。并且往往会掺杂一些业务逻辑的判断。

web client 如果使用REST API请求，基于REST的特性，那client就要发多个请求，并由client自身实现相应业务逻辑，组装数据。如果有mobile端，那么也要实现组装数据这部分逻辑。

我们更多的在graphql service中定义我们所需的数据模型，也就是schema。
graphql service通过请求不同的REST API来组装数据，所以更像是view modal层。

所以总结来说，如果是面向web端的，推荐使用 graphql, 如果是供其他后端系统调用获取数据的，推荐使用REST API。
