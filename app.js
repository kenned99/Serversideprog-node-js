var http = require('http');
var fs = require('fs');
const url = require('url');
const mysql = require('mysql');
const { connect } = require('http2');
const { NOMEM } = require('dns');
//var hasAcscess = await calls.check




http.createServer(function (req, res) {
    var q = url.parse(req.url, true).query;
    if (q.name) console.log("Output: " + q.name);

    var statusCode = 200;
    var path = req.url.split('?')[0]; //rute
    if (path == "/") {
        path = "index.html";
    }
    else if (path === '/rooms') {
        console.log(q.apikey);

        //API check
        con.query('SELECT * FROM apikeys WHERE apikey = "' + q.apikey + '"', (err, rows) => {
            if (err) throw err;
            console.log(rows);

            try {
                if (rows[0].apikey != '') {
                    console.log('Data fra server: ');
                    con.query('SELECT * FROM rooms', (err, rows) => {
                        res.write(JSON.stringify(rows))
                        return res.end();
                    });
                }
            } catch (error) {
                console.log('error 401 unauthorized'); //forkert apikey
            }
        }
        )
        return;

        //opgave 2
    } else if (path === '/add') {
        console.log(q.apikey);

        con.query('SELECT * FROM apikeys WHERE apikey = "' + q.apikey + '"', (err, rows) => {
            if (err) throw err;
            console.log(rows);

            //Try for ikke crash
            try {
                if (rows[0].apikey != '') {

                    let data = ''; //ikke ændre datatypen

                    req.on('data', chunk => {
                        data += chunk;
                    })

                    req.on('end', () => {

                        var newbooking = JSON.parse(data);
                        console.log(newbooking);

                        /*
                           console.log(JSON.parse(data).room_id);
                           console.log(JSON.parse(data).bookedBy);
                           console.log(JSON.parse(data).bookingday);
                        */

                        console.log('Data fra server: ');
                        con.query(`INSERT INTO bookings (room_id, bookedBy, bookingDay) VALUES (${newbooking.room_id}, '${newbooking.bookedBy}', '${newbooking.bookingDay}')`, (err, rows) => {
                            if (err) throw err; //error warning hanmdling check
                            return res.end();
                        });
                    })

                }
            } catch (error) {
                console.log('error 401 unauthorized'); //forkert apikey
            }
        }
        )
        return;
    }

    //GET Bookings
    else if (path === '/bookings') {
        console.log(q.apikey);

        con.query('SELECT * FROM apikeys WHERE apikey = "' + q.apikey + '"', (err, rows) => {
            if (err) throw err;
            console.log(rows);

            try {
                if (rows[0].apikey != '') {
                    console.log('Data fra server: ');
                    con.query(`SELECT * FROM bookings WHERE bookingDay = ${q.day || new Date().getDate()}` , (err, rows) => {
                        res.write(JSON.stringify(rows))
                        return res.end();
                    });
                }
            } catch (error) {
                console.log('error 401'); //forkert apikey
            }
        }
        )
        return;
    } 

    else {
        path = path.substring(1);
    }


    console.log(path);


    console.log(path);
    fs.readFile(path, (err, data) => {
        if (err) {
            statusCode = 404;
            data = "404 not found";
            return res.end();
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(8084);

//DB connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "servprogsolutionsrest"
});

/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "SELECT * FROM rooms";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
*/

/*const isAuthorized = async (headers, sqlconn) => {
    var tokenCheck = await sqlconn.request()
        .input('token', sql.VarChar(), headers['token'])
        .query('select * from apikeys where apikey = @token')

    return tokenCheck.rowsAffected[0] > 0
}*/


//hvis apikey findes kør


