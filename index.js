const express = require('express');
const bodyParser = require('body-parser');
const Task = require('./models/task.js');
const mongoose = require('mongoose');



const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const dburl = 'mongodb://<username>:<password>@cluster0-shard-00-00.7tssm.mongodb.net:27017,cluster0-shard-00-01.7tssm.mongodb.net:27017,cluster0-shard-00-02.7tssm.mongodb.net:27017/taskDB?ssl=true&replicaSet=atlas-i0ht0p-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(dburl)
.then(()=> app.listen(3000))
.catch((err) => {
    console.log(err);
});


app.use(express.static('public'));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    Task.find().sort({ date: 1})
    .then((result) => {
        res.render('index', {task: result});
    })
    .catch((err) => {
        console.log(err);
    });
   
});

app.post('/', (req, res) => {
    const task = new Task(req.body);
 
        task.save()
        .then(() => {
            res.redirect('/');
        });
  
   
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.get('/delete/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.redirect('/');
    })
    .catch((err) => {
        console.log(err);
    });
});


app.get('/edit/:id', (req, res) => {
    Task.findById(req.params.id)
    .then((result) => {
        res.render('edit', {task: result});
    })
    .catch((err) => {
        console.log(err);
    });
});

app.post('/edit/:id', (req, res) => {
   Task.findByIdAndUpdate( req.params.id, {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        colour: req.body.colour
    }
    )
    .then((result) => {
        res.redirect('/');
    })
    .catch((err) => {
        console.log(err);
    });
});


app.use((req, res) => {
    res.render('404');
});


