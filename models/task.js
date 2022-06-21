const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    maxlenght: [20, "name cannnot be bigger than 20 letters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports =mongoose.model('Tasks',TaskSchema)
