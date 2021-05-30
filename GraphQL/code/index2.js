/**
 * express + graphql
 * 查询传参 + 返回自定义类型
 */

var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Student {
        id: ID
        name: String
        age: Int
        class: String
    }
    type Query {
        hello: String
        addStudent(id: ID!, name: String): Student
    }
`);

var root = {
    hello: () => {
        return 'Hello world!';
    },
    // 解构出相应参数
    addStudent: ({ id, name }) => {
        return {
            id: id,
            name: name,
            age: 18,
            class: 'middle'
        }
    }
};

var app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    // 开启调试页面
    graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));