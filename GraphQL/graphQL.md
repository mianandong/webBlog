## 产生背景
  假设要请求商品信息及打折信息，按照现在Restful API的风格，我们需要发放两个请求来分别获取这些信息，如下所示
```
// 获取商品信息
xxx/goods/v1/info?xxxx
// 获取打折信息
xxx/goods/v1/discount?xxxx
```
这样会带来一些额外的工作，比如  
```
1. 前端需要发送两次http请求
2. 如果需要获取其他信息，需要后台新增api
3. 如果前端不再需要某些字段，那需要后台修改相应代码，改变api返回的内容
```
## GraphQL的特点
它是一种`描述性`的查询语言，可以自定义接口返回的内容(当然这需要前后端的配合)
- 获取多类资源，只需要发送一次请求
- 动态的指定接口返回的字段

## 实现的大致原理
```
server: 定义了数据的接口声明（typeDefs）和获取每个数据的方法（resolvers）, client要啥给啥，不再有业务相关的逻辑。
client: 在请求的body体中告知服务器需要哪些数据。
本质上讲，简化了服务器逻辑，将业务的逻辑全部交给了client
同时为了满足client复杂的数据请求，GraphQL又定义了一系列的语法，比如变量，片段，参数，别名。来满足和简化client端发送的请求
```

## GraphQL的实现方式
我们知道，GraphQL只是一种规范，它的实现方式主要有以下三种
- GraphQL.js        npm install graphql
- express-graphql   npm install express express-graphql graphql
- apollo-server     npm install apollo-server-express express

## Hello World
以express-graphql实现为例，下面代码来自  
Code | GraphQL 中文文档
https://graphql.bootcss.com/code/#javascript
```js
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
```

## 基本类型（标量类型）
- String
- Int
- Float
- Boolean
- ID

## 对象类型
GraphQL可自定义对象类型，定义方式
```
type Student {
  name: String
  age: Int
}
```
这样，就定义了一个GraphQL的Student对象类型，且相互之间可以嵌套
```
type School {
  name: String
  address: String
}
type Student {
  name: String
  age: Int
  school: School
}
```

## 数组类型
定义如下
```
type Class {
  students: [Student]
}
```
## 非空类型
```
通过在类型名后面添加一个感叹号!将其标注为非空。

myField: [String!]
这表示数组本身可以为空，但是其不能有任何空值成员。用 JSON 举例如下：
myField: null // 有效
myField: [] // 有效
myField: ['a', 'b'] // 有效
myField: ['a', null, 'b'] // 错误

myField: [String]!
这表示数组本身不能为空，但是其可以包含空值成员：
myField: null // 错误
myField: [] // 有效
myField: ['a', 'b'] // 有效
myField: ['a', null, 'b'] // 有效
```

## 输入类型
```
参数对象必须使用input定义

input Student {
  name: String
  age: Int
}
type Mutation {
  addStudent(student: Student): Boolean
}
```

## 参数传递
```js
type Query{
  addStudent(id: ID!, name: String): [Boolean]
}
```
> ! 表示参数不能为null

## Client短使用
后端代码详见 `code/index3.js`
前端代码详见`code/public/index.html`

## 增删改查
查询入口点，Query必须有且仅有一个
```
type Query {

}
```

修改入口点（增删改），Mutation有且仅有一个
```
type Mutation {

}

```

## GraphQL与Restful的区别
