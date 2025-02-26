const http = require('http');
const fs = require('fs');
const queryString = require('querystring');

const cats = [
    {
        id: 1,
        name: "Tommy",
        imageUrl: "https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg",
        breed: "Bombay Cat",
        description: "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.",

    }
];

const views = {
    home: "./views/home.html",
    style: "./views/site.css",
    addCat: "./views/addCat.html",
    cat: "./views/partials/cat.html"
}

const server = http.createServer((req, res) => {
    if(req.url === "/"){
        render(views.cat, cats[cats.length - 1], (err, catResult) => {
            if(err){
                res.statusCode = 404;
                return res.end();
            }

            render(views.home, {cats: catResult}, (err, result) => {
                res.writeHead(200, {
                    'content-type': 'text/html'
                });
                res.write(result);
                res.end();
            });           
        });
    }else if(req.url === "/styles/site.css"){
        fs.readFile(views.style, {encoding: "utf-8"}, (err, result) => {
            if(err){
                res.statusCode = 404;
                return res.end();
            }

            res.writeHead(200, {
                'content-type': 'text/css',
            })
            res.write(result);
            res.end();           
        });
    }      
    else if(req.url === "/cats/add-cat" && req.method === "GET"){
        fs.readFile(views.addCat, {encoding: "utf-8"}, (err, result) => {
            if(err){
                res.statusCode = 404;
                return res.end();
            }

            res.writeHead(200, {
                'content-type': 'text/html',
            })
            res.write(result);
            res.end();           
        });
    }else if(req.url === "/cats/add-cat" && req.method === "POST"){
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });
        
        req.on("close", () => {
            //console.log(body);
            const queryBody = queryString.parse(body);
            queryBody.id = cats[cats.length - 1].id + 1;

            cats.push(queryBody);       

            res.writeHead(302, {
                location: "/"
            });

            res.end();
        });
    }  
    else{
        res.writeHead(200, {
            'content-type': 'text/html',
        })
        res.write("<h1>404</h1>");
        res.end();
    }
});

function render(view, data, callback){
    fs.readFile(view, {encoding: "utf-8"}, (err, result) => {
        if(err){
            return callback(err);
        }

        const htmlResult = Object.keys(data).reduce((acc, key) => {
            const pattern =  new RegExp(`{{${key}}}`, "g");

            return acc.replace(pattern, data[key]);
        }, result);

        callback(null, htmlResult);
    });
}

server.listen(5000);
console.log("Server is listening on port 5000...");