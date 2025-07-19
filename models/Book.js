const { required } = require('joi');
const mongoose = require('mongoose');
const { title } = require('process');

const bookSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
     genre: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
     
})

module.exports = mongoose.model("Book", bookSchema);