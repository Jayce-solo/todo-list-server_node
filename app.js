//express 简化操作
var express = require('express');
//使用req.body依赖解析
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json());

var todoItems = [
    { id: 0, value: 'React', done: false, delete: false }
]

//解决跨域
app.all('*', function (req, res, next) {
    //允许跨域的域名
    res.header('Access-Control-Allow-Origin', '*');
    //允许跨域的请求头
    res.header('Access-Control-Allow-Headers', 'content-type');
    //允许跨域的请求方法
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
    next();
})

//发送已有的数据
app.get('/items', function (req, res) {
    res.send(todoItems);
});

//新增
app.post('/items', function (req, res) {
    if (req.body.todoItem) {
        todoItems = [...todoItems, req.body.todoItem]
    }
    res.send(todoItems);
});

//删除
app.delete('/items', function (req, res) {
    if (req.body.id || req.body.id == 0) {
        todoItems.forEach(item => {
            if (item.id == req.body.id) {
                item.delete = true;
            }
        })
    }
    res.send(todoItems);
});

app.listen(8000, function () {
    console.log('Server running at loaclhost:8000!');
});