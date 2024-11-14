const mongoose = require('mongoose');

const TodoCategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

module.exports = mongoose.model('TodoCategory', TodoCategorySchema);
