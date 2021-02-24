var http = require('http');
var fs = require('fs');
const url = require('url');
const mysql = require('mysql');
const { connect } = require('http2');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true).query;
    if (q.name) console.log("Output: " + q.name); 

    var statusCode = 200;
    var path = req.url.split('?')[0]; //fjerner alle url parametre
    if (path == "/") {
        path = "index.html"; 
    } else {
        path = path.substring(1);
    }

    console.log(path);
    fs.readFile(path, (err, data) => {
        if(err){
            statusCode = 404;
            data = "404 not found";
            return res.end();
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8084);


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "servprogsolutionsrest"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM rooms";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });


 await connection.query('SELECT * FROM apikeys', (err, rows) => {
    if(err) throw err;
    console.log(rows);
    if (rows.apikey == '' ) {
        
        connection.query('SELECT * FROM rooms', (err,rows) => {
            console.log('Data modtaget db: ');
            res.write(JSON.stringify(rows))
            return res.end();
        });
        }
    }
)
  