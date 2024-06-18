const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    output: [
        {
            id: { type: String },
            title: { type: String },
            type: { type: String },
            value: { type: String },
            category: { type: String }
        }
    ],
    statistic: {
        //income
        "main job": { type: Number, default: 0 },
        underwork: { type: Number, default: 0 },
        deposits: { type: Number, default: 0 },
        payments: { type: Number, default: 0 },
        "profit other": { type: Number, default: 0 },
        //loss
        housing: { type: Number, default: 0 },
        food: { type: Number, default: 0 },
        medicine: { type: Number, default: 0 },
        transport: { type: Number, default: 0 },
        rest: { type: Number, default: 0 },
        education: { type: Number, default: 0 },
        "loss other": { type: Number, default: 0 }
    }

},
    {
        collection: 'users'
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User