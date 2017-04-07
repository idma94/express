const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();
let db;

app.use(bodyParser.json()); //Парсить правильно json
app.use(bodyParser.urlencoded({ extended: true })); // Прсить данные формы

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
    db.collection('artist').updateOne(
        {_id : ObjectID(req.params.id)},
        { name : req.body.name },
        (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(200);
        } 
    )
})
//DELETE artist
app.delete('/artists/:id', (req, res) => {
    db.collection('artist').deleteOne(
        {_id : ObjectID(req.params.id)},
        (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(200);
        } 
    )
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