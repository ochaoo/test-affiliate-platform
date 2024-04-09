const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
    {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
        resetPasswordLink: { type: String }
    },
    { timestamps: false, collection: 'users' }
)

module.exports = model('User', UserSchema)
