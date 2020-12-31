const express = require('express')
const myapp = require('./myApp')
const cors = require('cors')
const bodyParser = require('body-parser')
let mongoose;
try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}
const app = express()
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/exercise/new-user',(req,res)=>{
    myapp.createUser(req.body.username,(err, data)=>{
        res.json(data);
    })

});

app.get('/api/exercise/users',(req,res)=>{
    myapp.getUser((err, data)=>{
        res.json(data);
    })

});

app.post('/api/exercise/add',(req,res)=>{
    myapp.addExercise({
    _id : req.body.userId,
    description: req.body.description,
    duration: req.body.duration,
    date: req.body.date
    }
    ,(err, data)=>{
        res.json(data);
    })

});

app.get('/api/exercise/log',(req,res)=>{
    myapp.getLogs(req.query.userId,(err, data)=>{
        res.json(data);
    })

});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
