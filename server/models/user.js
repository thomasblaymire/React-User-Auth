const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
    // get access to the user model
    const user = this;

    // generate a salt, callback that will run after the salt is generated

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {return next(err); }

        // hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            // overwrite plain text password wiht encrypted
            user.password = hash;
            next();
        });
    });
});

//User schema adding an instance method called compare password
userSchema.methods.comparePassword = function(canditatePassword, callback) {
    becrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMath);
    });
}

// Create the model class (represents all users)
const ModelClass = mongoose.model('user', userSchema);


// Export the model
module.exports = ModelClass;
