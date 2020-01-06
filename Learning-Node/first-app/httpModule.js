const http = require('http')

// const server = http.createServer();
// server.on('connection',(socket) => {
//     console.log('New connection')
// })

const server = http.createServer((req,res) => {
    if(req.url==='/'){
        res.write('Hello world');
        res.end();
    }

    if(req.url==='/info'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});

server.listen(3000);
