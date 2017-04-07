let Artists = require('../models/artists');

exports.all = function (req, res) {
    Artists.all((err, docs) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        res.send(docs);
    })
}

exports.findById = function (req, res) {
    Artists.findById(req.params.id, (err, doc) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        res.send(doc);
    })
}

exports.create = function (req, res) {
    Artists.create({ name: req.body.name }, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(result);
    })
}

exports.update = function (req, res) {  
    Artists.update(req.params.id, { name: req.body.name }, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(200);
    })
}

exports.delete = function (req, res) {    
    Artists.delete(req.params.id, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(200);
    })
}