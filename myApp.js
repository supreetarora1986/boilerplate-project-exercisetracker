require('dotenv').config();
var moment = require('moment');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {type: String, required: true},
  log: [{description: String, duration: Number, date: String} ]
});

const UserModel = mongoose.model('UserModel',userSchema);

const createUser = function(username,done){
    let user = new UserModel({username: username});
    user.save((err, data) => {
        done(err,data);
    });
}

const getUser = function(done){
    UserModel.find({},(err,data)=>{
        done(err,data);
    })
}

const getLogs = function(userId,done){
    UserModel.findById({_id: userId},(err,data)=>{
        done(err,data);
    })
}

const addExercise = function(user, done){
    currentDate = user.date && user.date != '' ? new Date(user.date) : new Date();
    UserModel.findById({_id: user._id},(err,userReturned)=>{
        userReturned.log.push({
        description : user.description,
        duration : user.duration,
        date: moment(currentDate.getTime()).format("ddd MMM DD YYYY")
        });
        userReturned.save((err,data)=>{
            done(null , {
            _id : user._id,
            username: data.username,
            description : user.description,
            duration : parseInt(user.duration),
            date: moment(currentDate.getTime()).format("ddd MMM DD YYYY")
            });
        })
      })
}

exports.createUser = createUser;
exports.getUser = getUser;
exports.addExercise = addExercise;
exports.getLogs = getLogs;