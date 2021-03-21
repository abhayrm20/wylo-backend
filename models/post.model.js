const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
        text: {type: String, required: true},
        image: String,
        hasImage: {type: Boolean, def: false},
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    },
);

module.exports = mongoose.model('Post', postSchema);