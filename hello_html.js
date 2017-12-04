var http = require("http"),
    fs = require("fs");

//var html = fs.readFileSync("./index.html")    
var resJson = {
    nombre: "Ivan",
    apellidos: "Cuadros Altamirano",
    edad: "29"
}

http.createServer(function(req, res){
    var html = fs.readFile("./index.html", function(err, html){
        res.writeHead(200, {
            "Content-Type":"application/json"
        });
        res.write(JSON.stringify(resJson));
        res.end();
    });    
}).listen(8080)