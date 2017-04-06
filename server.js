const express = require('express');
const app = express();

let artists = [
    {
        id: '1',
        name: 'Metallica'
    },
    {
        id: '2',
        name: 'Iron Maiden'
    },
    {
        id: '3',
        name: 'Beep Purple'
    },
    {
        id: '4',
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
    let artist = artists.find( index => index.id == req.params.id);
    res.send(artist);
})

app.listen(3012, () =>{
    console.log('API STARTED')
})