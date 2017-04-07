const express = require('express');
const bodyParser = require('body-parser');

let db = require('./db');
const app = express();

let artistsController = require('./controllers/artists');


app.use(bodyParser.json()); //Парсить правильно json
app.use(bodyParser.urlencoded({ extended: true })); // Прсить данные формы

app.get('/', (req, res) => {
    res.send('Hello API');
});

app.get('/artists', artistsController.all)
app.get('/artists/:id', artistsController.findById)

app.post('/artists', artistsController.create)
app.put('/artists/:id', artistsController.update)
app.delete('/artists/:id', artistsController.delete)

db.connect('mongodb://localhost:27017/myapi', (err) => {
    if (err) {
        return console.log(err);
    }
    app.listen(3012, () => {
        console.log('API STARTED')
    })
})