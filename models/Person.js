const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }

});


personSchema.pre('save', async function (next) {
    const person = this;

    if (!person.isModified('password'))
    {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);  
        // this.password = await bcrypt.hash(this.password, salt);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password =  hashedPassword;
        next();
    }
    catch (error)
    {
        return next(error);
    }
});


personSchema.methods.comparePassword = async function (candidatePassword)
{
    try
    {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;

        //! so yaha par kya ho rha hau ki 1st time we enter password ans wo hash way mai dB mai store and next time , the password we enter wo dB mai jo password hai uska hash extract kar entered password se add kar hash mai convert and then compare that hash with the hash stored in dB ...
    }
    catch (error)
    {
        return done(error);
    }
}


const Person = mongoose.model('Person', personSchema);
module.exports = Person;