const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res)=>{
    //console.log(req.url, req.method);


    // lodash
    let num = _.random(0,100);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
      });
      greet();
      greet();

    //set header content type for the response:
    res.setHeader('Content-Type', 'text/html');

    // res.write('<p>Hello Hamza</p>');
    // res.write('<p>How are you today!</p>');
    // res.end();

    // send html file
    // fs.readFile('./views/index.html', (err, data) => {
    //     if (err) {
    //     console.log(err);
    //     res.end();
    //     }
    //     //res.write(data);
    //     res.end(data);
    // });

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
    }

    // send html
    fs.readFile(path, (err, data) => {
        if (err) {
        console.log(err);
        res.end();
        }
        res.end(data);
    });
    
})

server.listen(5000, '0.0.0.0', ()=>{
    console.log('listening for requests on port 5000!');
});
