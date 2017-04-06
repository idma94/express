const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); //Парсить правильно json
app.use(bodyParser.urlencoded({extended: true})); // Прсить данные формы

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
    },
]

app.get('/', (req, res) => {
    res.send('Hello API');
});

app.get('/artists', (req, res)=>{
    res.send(artists);
})

app.get('/artists/:id', (req, res) => {
    console.log(req.params);
    let artist = artists.find( index => index.id == Number(req.params.id));
    res.send(artist);
})

app.post('/artists', (req, res) => {
    let artist = {
        id: Date.now(),
        name: req.body.name
    }
    
    artists.push(artist);
    res.send(artist);
})

app.put('/artists/:id', (req, res) => {    
    let artist = artists.find( index => index.id == Number(req.params.id));
    artist.name = req.body.name;    
    res.sendStatus(200);
})

app.delete('/artists/:id', (req, res) => {    
    artists = artists.filter( artist => artist.id !== Number(req.params.id));
    // res.send(artists);
    res.sendStatus(200);
})



app.listen(3012, () =>{
    console.log('API STARTED')
})