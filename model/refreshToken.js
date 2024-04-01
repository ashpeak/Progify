const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token: String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 90 * 24 * 60 * 60 // 90 days
    }
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;