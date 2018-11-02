const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const whitelist = [
    'http://localhost:5000'
];

const corsOptions = {
    origin: function(origin, callback){
          const isWhitelisted = whitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
  };


app.get('/get_flights',cors(corsOptions), (req, res) => {


    fs.readFile( __dirname + '/public/data' + '.json', 'utf8', function (err, data) {
        data ? res.status(200) : res.status(404);
        res.send(data);
    });
 
 });


app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port 5000!'));
