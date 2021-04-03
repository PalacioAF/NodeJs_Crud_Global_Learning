const mongoose=require('mongoose');

const BookSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    genre:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:String,
        required:true,
        trim:true
    },
    read:{
        type:Boolean,
        required:true
    }

});

module.exports=mongoose.model('Book',BookSchema);