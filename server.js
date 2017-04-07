const express = require('express');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

let db = require('./db');
const app = express();

app.use(bodyParser.json()); //Парсить правильно json
app.use(bodyParser.urlencoded({ extended: true })); // Прсить данные формы

app.get('/', (req, res) => {
    res.send('Hello API');
});

app.get('/artists', (req, res) => {
    db.get().collection('artist').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
})

app.get('/artists/:id', (req, res) => {
    db.get().collection('artist').findOne({ _id : ObjectID(req.params.id) }, (err, doc) => {
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
    db.get().collection('artist').insert(artist, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(artist);
    });
})
// PUT artist
app.put('/artists/:id', (req, res) => {
    db.get().collection('artist').updateOne(
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
    db.get().collection('artist').deleteOne(
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

db.connect('mongodb://localhost:27017/myapi', (err) => {
    if (err) {
        return console.log(err);
    }
    app.listen(3012, () => {
        console.log('API STARTED')
    })
})