const express = require('express');

app = new express();

app.get('/', (req, res, next) => {
    // send 会自动设置content-type 为 text/html
    res.send('hello');
});

app.get('/list', (req, res, next) => {
    // send 会自动设置content-type 为 
    //res.send({name: req.name, age: 18});
    console.log('ssss');
    next();
})

app.use((req, res, next) => {
    res.send('xxxxx');
})

app.listen(3000);

console.log('server started');