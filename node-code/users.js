var mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/commentsDB')

var Schema = mongoose.Schema

var userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required: true
    }

})

module.exports = mongoose.model('User',userSchema)

