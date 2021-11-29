let express = require('express');

const sqlite3 = require('sqlite3').verbose();

let app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
let db = new sqlite3.Database('./iChing.sqlite', (err) => {
    if (err) {
        console.error(err)
    }
    console.log('Connected to the iChing database.')
})

app.post('/', function(req, res) {
    let binary = req.body.binary || 111111
    db.serialize(function() {
        db.all("SELECT * FROM hexagrams WHERE binary =" + binary, function(err, rows) {
            if (err) {
                console.error(err)
            } else {
                rows.forEach(function (row) {
                    res.json(row)
                })
            }

        });


    })


})

module.exports = app;
