/**
 * express + graphql 的基本使用示例
 */

var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Student {
        name: String
        age: Int
        class: String
    }
    type Query {
        hello: String
        age: Int
        student: Student
    }
`);

var root = {
    hello: () => {
        return 'Hello world!';
    },
    age: () => {
        return 18;
    },
    student: () => {
        return {
            name: 'xuwei',
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