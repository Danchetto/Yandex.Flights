const express = require('express');
const app = express();
const fs = require('fs');

app.get('/get_flights', (req, res) => {

    fs.readFile( __dirname + '/public/data' + '.json', 'utf8', function (err, data) {
        data ? res.status(200) : res.status(404);
        res.send(data);
    });
 
 });

app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port 5000!'));
