//older version of my index.js class
//No longer used since the new index.html
//implementation with express has been added 

//check app folder index.html file!!!

const http = require('http');
const fs = require('fs');

const server = http.createServer(
    (req, res) => {
        fs.readFile('./index.html',
        (err, data) =>{
            if(err){
                res.statusCode = 404;
                res.end("File Not Found")

            } else{
                res.statusCode = 200;
                res.setHeader('Content-type', 'text/html');
                res.end(data);
            }
        });
    }
);

server.listen(
    3000,
    ()=>{
        console.log("Server running on http://localhost:3000/");
    }

)