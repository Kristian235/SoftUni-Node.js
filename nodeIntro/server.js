const http = require('http');

const server = http.createServer((req, res) => {
    console.log("Request send");


    if(req.url === "/"){
        res.write("Home page");
    }else if(req.url === "/car"){
        res.write("Cars page");
    }else{
        res.write("Error 404: Page not found");
    }


    res.end();
});

server.listen(5000);
console.log("Server is runnig on port 5000...");