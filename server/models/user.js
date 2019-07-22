const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  avatar: String,
  email: { type: String,
           required: 'Email is Required',
           lowercase: true,
           unique: true,
           match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]},
  name: { type: String,
          required: true,
          minlength: [6, 'Too short, min is 6 characters']},
  username: { type: String,
          required: true,
          minlength: [6, 'Too short, min is 6 characters']},
  password: {
    type: String,
    minlength: [4, 'Too short, min is 4 characters'],
    maxlength: [32, 'Too long, max is 32 characters'],
    required: 'Password is required'
  },
  // Very simplified you should have separate collection with roles
  // You can create also array of roles in case of multiple roles
  role: {
    enum: ['guest', 'admin'],
    type: String, required: true, default: 'guest'
  },
  info: String,
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.pre("save", function(next){
   const user = this;

   bcrypt.genSalt(10, function(err, salt) {
      if(err){ return next(err);}

      bcrypt.hash(user.password, salt, function(err, hash){
          if(err){ return next(err);}

          user.password = hash;
          next();
      });
   });
});

//Every user have acces to this methods
userSchema.methods.comparePassword = function(candidatePassword, callback){
   bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
      if(err) {return callback(err);}

      callback(null, isMatch);
   });
}

module.exports = mongoose.model('User', userSchema );
