var express = require('express');
var bodyParse = require('body-parser');
var express = require('express'); 

var {mongoose} = require('./db/mongoose');
var {Note} = require('./models/note');
var {User} = require('./models/user');

var app = express();
var port = 3000;

// Configuring middleware
app.use(bodyParse.json());

// Configuring routes
app.post('/note', (req, res) => {
    // console.log(req.body);

    var note = new Note({
        text: req.body.text,
        group: req.body.group
    });

    // console.log(note);

    note.save().then((doc) => {
        res.status(200).send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});


app.post('/user', (req, res) => {
    var user = new User({
        name: req.body.name,
        city: req.body.city,
        country: req.body.country
    });

    user.save().then((doc) => {
        res.status(200).send(doc);
    }, (err) => {
        res.status(400).send(err);

    });
});

app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send({users});
    }, (err) => {
        res.status(400).send(err);
    });
})

app.listen(3000, () => {
    console.log(`Server started. Listening at: ${port}`);
});

module.exports = {app};