const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();
let db;

app.use(bodyParser.json()); //Парсить правильно json
app.use(bodyParser.urlencoded({ extended: true })); // Прсить данные формы

let artists = [
    {
        id: 1,
        name: 'Metallica'
    },
    {
        id: 2,
        name: 'Iron Maiden'
    },
    {
        id: 3,
        name: 'Beep Purple'
    },
    {
        id: 4,
        name: 'Three Dayse Grace'
    }
]

app.get('/', (req, res) => {
    res.send('Hello API');
});

app.get('/artists', (req, res) => {
    db.collection('artist').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
})

app.get('/artists/:id', (req, res) => {
    db.collection('artist').findOne({ _id : ObjectID(req.params.id) }, (err, doc) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
})
//UPDATE artist
app.post('/artists', (req, res) => {
    let artist = {
        name: req.body.name
    }
    db.collection('artist').insert(artist, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(artist);
    });
})
// PUT artist
app.put('/artists/:id', (req, res) => {
    let artist = artists.find(index => index.id == Number(req.params.id));
    artist.name = req.body.name;
    res.sendStatus(200);
})
//DELETE artist
app.delete('/artists/:id', (req, res) => {
    artists = artists.filter(artist => artist.id !== Number(req.params.id));
    // res.send(artists);
    res.sendStatus(200);
})



MongoClient.connect('mongodb://localhost:27017/myapi', (err, database) => {
    if (err) {
        return console.log(err);
    }
    db = database;
    app.listen(3012, () => {
        console.log('API STARTED')
    })
})