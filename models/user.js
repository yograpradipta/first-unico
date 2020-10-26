const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bycrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

//description model
const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    address: {
        addr1: String,
        addr2: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
    },
    picture: String,
    create: {
        type: Date,
        default: Date.now
    }
});

//encypting the user password
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bycrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});

/// create costum function which is compare pass that are user type in and in database
userSchema.methods.comparePassword = function (password) {
    return bycrypt.compareSync(password, this.password);
};

// create another costume function that will generate costum image every time a user sign up
userSchema.methods.gravatar = function (size) {
    if (!this.size) size = 200;
    if (!this.username) {
        return 'https://en.gravatar.com/avatar/?s' + size + '&d=retro';
    } else {
        var md5 = crypto.createHash('md5').update(this.username).digest('hex');
        return 'https://en.gravatar.com/avatar/' + md5 + '?s' + size + '&d=retro';
    }
}

module.exports = mongoose.model('user', userSchema);