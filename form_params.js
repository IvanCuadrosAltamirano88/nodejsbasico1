var http = require("http"),
fs = require("fs");

//var html = fs.readFileSync("./index.html")    
var resJson = {
nombre: "Ivan",
apellidos: "Cuadros Altamirano",
edad: "29"
}

http.createServer(function(req, res){

    if(req.url.indexOf("favicon.ico") > 0) { return; }

    var html = fs.readFile("./index.html", function(err, html){
        
        var html_string = html.toString();
        var variables = html_string.match(/[^\{\}]+(?=\})/g);
        //var nombre = "Ivan Cuadros Altamirano";
        var arreglo_parametros = [], parametros = {};
        
        if(req.url.indexOf("?")> 0)
        {
            var url_data = req.url.split("?");
            var arreglo_parametros = url_data[1].split("&");    
        }

        for (var index = 0; index < arreglo_parametros.length; index++) {
            var parametro = arreglo_parametros[index];

            var param_data = parametro.split("=");
            parametros[param_data[0]] = param_data[1];
        }

        for (var index = 0; index < variables.length; index++) {
            var variable  =  variables[index];
            //console.log(value);
            html_string = html_string.replace("{"+ variables[index] + "}", parametros[variable]);
            console.log(html_string);
        }


        
        res.writeHead(200, {
        "Content-Type":"text/html"
        });
        res.write(html_string);
        res.end();
    });    
}).listen(8080)