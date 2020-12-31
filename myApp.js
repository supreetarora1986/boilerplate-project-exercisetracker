require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {type: String, required: true},
  exercise: [{description: String, duration: Number, date: Date} ]
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

const addExercise = function(user, done){
    UserModel.findById({_id: user._id},(err,userReturned)=>{
        userReturned.exercise.push({
        description : user.description,
        duration : user.duration,
        date: user.date && user.date != '' ? user.date : new Date()
        });
        userReturned.save((err,data)=>{
            done(null , data);
        })
      })
}

exports.createUser = createUser;
exports.getUser = getUser;
exports.addExercise = addExercise;