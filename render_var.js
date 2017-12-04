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
    
    var html_string = html.toString();
    var variables = html_string.match(/[^\{\}]+(?=\})/g);
    var nombre = "Ivan Cuadros Altamirano";

    
    for (var index = 0; index < variables.length; index++) {
        var value  =  eval(variables[index]);
        console.log(value);
        html_string = html_string.replace("{"+ variables[index] + "}", value);
        console.log(html_string);
    }


    
    res.writeHead(200, {
    "Content-Type":"text/html"
    });
    res.write(html_string);
    res.end();
});    
}).listen(8080)