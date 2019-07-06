var mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/commentsDB')

var Schema = mongoose.Schema

var commentSchema = new Schema({
    username:{
        type:String,
        default: '匿名用户'
    },
    titleId:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required: true
    },
    time:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('List',commentSchema)

