const ObjectID = require('mongodb').ObjectID;

let db = require('../db');

let TABLE = {
    artists: 'artist',
}

exports.all = function (collback) {
    db.get().collection(TABLE.artists).find().toArray((err, docs) => {
        collback(err, docs);
    })
}
exports.findById = function (id, collback) {
    db.get().collection(TABLE.artists).findOne({ _id: ObjectID(id) }, (err, doc) => {
        collback(err, doc);
    })
}
exports.create = function (artist, collback) {
    db.get().collection(TABLE.artists).insert(artist, (err, result) => {
        collback(err, result)
    });
}

exports.update = function (id, artist, collback) {
    db.get().collection(TABLE.artists).updateOne({ _id: ObjectID(id) }, artist,
        (err, result) => {
            collback(err, result);
        });
}
exports.delete = function (id, collback) {
    db.get().collection(TABLE.artists).deleteOne(
        { _id: ObjectID(id) },
        (err, result) => {
            collback(err, result);
        });
}