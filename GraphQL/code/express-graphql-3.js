/**
 * express + graphql
 * 前端如何发送请求
 */

var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Student {
        id: ID
        name: String
        age: Int
    }
    type Query {
        student(id: ID!): Student
    }
`);

var root = {
    student: ({ id }) => {
        return {
            id: id,
            name: 'xuwei',
            age: 19
        }
    }
};

var app = express();

// 设置前端静态页面的访问，访问方式http://localhost:4000/static/
app.use('/static', express.static('public'));

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    // 开启调试页面
    graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));