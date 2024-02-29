const mongoose = require('mongoose');
 
const HabitSchema = new mongoose.Schema({
    category: {
        type: String,
        required:[true, "Category is required."],
        minlength: [3, "Category must be at at least 3 characters long."],
        maxlength: [25, "Category is too long."]
    },
    name: {
        type: String,
        required:[true, "Name is required."],
        minlength: [3, "Name must be at at least 3 characters long."],
        maxlength: [25, "That name is too long"]
    },
    description: {
        type: String,
        required:[true, "Description is required."],
        min: [3, "The must be at at least 3 characters long."],
        max: [100, "The description is too long!"]
    },
    },
    {timestamps: true})


module.exports = mongoose.model('Habit', HabitSchema);