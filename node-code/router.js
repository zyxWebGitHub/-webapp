var express = require('express')
var fs = require('fs')
var List = require('./comments.js')
var router = express.Router()


//读取轮播图数据
// router.get('/lunbo',function(req,res){
//     fs.readFile('./json/lunbo.json','utf8',function(err,data){
//         if(err){
//             res.status(500).json({
//                 success:false,
//                 message:'服务端错误'
//             })
//         }else{
//             res.status(200).json({
//                 message:JSON.parse(data).images
//             })
//         }
//     })
// })
getJSON('/lunbo', './json/lunbo.json')






//读取新闻数据
// router.get('/news',function(req,res){
//     fs.readFile('./json/news.json','utf8',function(err,data){
//         if(err){
//             res.status(500).json({
//                 success:false,
//                 message:'服务端错误'
//             })
//         }else{
//             res.status(200).json({
//                 message:JSON.parse(data).news
//             })
//         }
//     })
// })
getJSON('/news','./json/news.json')






//读取并通过id找到对应的那条新闻
router.get('/news/detail',function(req,res){

    fs.readFile('./json/news.json','utf8',function(err,data){
        if(err){
            res.status(500).json({
                success:false,
                message:'服务端错误'
            })
        }else{
            //获取请求的id
            var id = req.query.id
            //获取所有新闻数据 === 数组形式
            var news = JSON.parse(data).news
            // EcmaScript 6 中的一个数组方法：find
            // 需要接收一个函数作为参数
            // 当某个遍历项符合 item.id === id 条件的时候，find 会终止遍历，同时返回遍历项
            var result = news.find(function(item){
                return item.id === id
            })
            res.status(200).json({
                message:result
            })

        }
    })
})


//读取图片分类标题
// router.get('/photo/category',function(req,res){
//     fs.readFile('./json/photo_title_category.json','utf8',function(err,data){
//         if(err){
//             res.status(500).json({
//                 success:false,
//                 message:'服务端错误'
//             })
//         }else{
//             res.status(200).json({
//                 message:JSON.parse(data).categorys
//             })
//         }
//     })
// })
getJSON('/photo/category','./json/photo_title_category.json')





//读取图文信息
router.get('/getPhotos',function(req,res){
    //如果 req.query.id 为0 读取 全部 图文信息
    if(req.query.id == 0){
        getJson('./json/photos.json')

    }
    //如果 req.query.id 为1 读取 家居生活 图文信息
    if(req.query.id == 1){
        getJson('./json/photos_life.json')

    }
    //如果 req.query.id 为2 读取 风景摄影 图文信息
    if(req.query.id == 2){
        getJson('./json/photos_scenery.json')

    }
    //如果 req.query.id 为3 读取 明星美女 图文信息
    if(req.query.id == 3){
        getJson('./json/photos_star.json')

    }
    //如果 req.query.id 为4 读取 动物世界 图文信息
    if(req.query.id == 4){
        getJson('./json/photos_animal.json')

    }
    //封装读取文件返回json对象的函数
    //path 文件路径
    function getJson(path){
        fs.readFile(path,'utf8',function(err,data){
            if(err){
                return  res.status(500).json({
                    success:false,
                    message:'服务端错误'
                })
            }else{
                return  res.status(200).json({
                    message:JSON.parse(data).photos
                })
            }
        })
    }
})
//读取图文详细信息
//读取图文信息
router.get('/photo/detail',function(req,res){
    fs.readFile('./json/photos_detail.json','utf8',function(err,data){
        if(err){
            res.status(500).json({
                success:false,
                message:'服务端错误'
            })
        }else{
            //获取请求的id
            var id = parseInt(req.query.id)
            console.log(id)
            //获取所有图文数据 === 数组形式
            var photos = JSON.parse(data).photos_detail
            // EcmaScript 6 中的一个数组方法：find
            // 需要接收一个函数作为参数
            // 当某个遍历项符合 item.属性 === id（你传过来的某个值） 条件的时候，find 会终止遍历，同时返回遍历项
            var result = photos.find(function(item){
                return item.titleId === id
            })
            res.status(200).json({
                message:result
            })

        }
    })
})

//提交评论 请求根据id 插入对应评论数据
router.post('/comments',function(req,res){
    //获取提交数据
    var comment = req.body
    console.log(comment)
    new List(comment).save(function(err){
        if(err){
            return res.status(500).send('server err')
        }
    })
})
//请求根据请求id 匹配 titleId 获取对应评论数据
router.get('/comments',function(req,res){
    var id = req.query.id
    List.find({
        titleId:id
    }, function(err,data){
        if(err){
            return res.status(500).json({
                err_code:500,
                message:'服务端错误'
            })
        }
        res.status(200).json({
            //注意这里不要 JSON.parse(data)
            message:data
        })
    })
})
//读取商品列表数据
router.get('/goods/list',function(req,res){
    if(req.query.group == 0){
        getJson('./json/goods_list00.json')
    }
    if(req.query.group == 1){
        getJson('./json/goods_list01.json')
    }
    //封装函数读取json文件返回数据
    function getJson(path){
        fs.readFile(path,'utf8',function(err,data){
            if(err){
                console.log('zyx')
                res.status(500).json({
                    success:false,
                    message:'服务端错误'
                })
            }else{

                res.status(200).json({
                    message:JSON.parse(data).goods
                })
            }
        })
    }

})

//通过gId找到对应的商品详情数据
router.get('/goods/detail',function(req,res){
    fs.readFile('./json/goods_detail.json','utf8',function(err,data){
        if(err){
            res.status(500).json({
                success:false,
                message:'服务端错误'
            })
        }else{
            //获取请求传来的gId
            var gId = req.query.gId
            //获取所有图文数据 === 数组形式
            var goods = JSON.parse(data).goods_detail
            // EcmaScript 6 中的一个数组方法：find
            // 需要接收一个函数作为参数
            // 当某个遍历项符合 item.id === index（你传过来的某个值） 条件的时候，find 会终止遍历，同时返回遍历项
            var result = goods.find(function(item){
                return item.gId == gId
            })
            res.status(200).json({
                message:result
            })

        }
    })
})

//通过gId找到对应的商品介绍
router.get('/goods/introduce',function(req,res){
    fs.readFile('./json/goods_introduce.json','utf8',function(err,data){
        if(err){
            res.status(500).json({
                success:false,
                message:'服务端错误'
            })
        }else{
            //获取请求传来的gId
            var gId = req.query.gId
            //获取所有图文数据 === 数组形式
            var goods = JSON.parse(data).goods_introduce
            // EcmaScript 6 中的一个数组方法：find
            // 需要接收一个函数作为参数
            // 当某个遍历项符合 item.id === index（你传过来的某个值） 条件的时候，find 会终止遍历，同时返回遍历项
            var result = goods.find(function(item){
                return item.gId == gId
            })
            res.status(200).json({
                message:result
            })

        }
    })
})

//通过获取本地存储的商品keys,返回对应的商品数据====数组
router.use('/goods/getshopcarlist/',function(req,res){
    fs.readFile('./json/goods_detail.json','utf8',function(err,data){
        if(err){
            res.status(500).json({
                success:false,
                message:'服务端错误'
            })
        }else{
            //获取请求传来的keys
            var keys = req.url.slice(1)
            // 转为数组
            var keysArr = keys.split(",")
            //获取所有图文数据 === 数组形式
            var goods = JSON.parse(data).goods_detail
            // 定义数组，存储返回的商品信息
            var goodsList = []
            // EcmaScript 6 中的一个数组方法：find
            // 需要接收一个函数作为参数
            // 当某个遍历项符合 item.id === index（你传过来的某个值） 条件的时候，find 会终止遍历，同时返回遍历项
            keysArr.forEach(value=>{
                var result = goods.find(function(item){
                    return item.gId === value

                })
                console.log(result)
                goodsList.push(result)
            })

            res.status(200).json({
                message:goodsList
            })

        }
    })
})

//获取视频数据
getJSON('/video','./json/videos.json')

//读取并通过id找到对应的那条新闻
router.get('/video/detail',function(req,res){

    fs.readFile('./json/videos.json','utf8',function(err,data){
        if(err){
            res.status(500).json({
                success:false,
                message:'服务端错误'
            })
        }else{
            //获取请求的id
            var id = req.query.id
            //获取所有新闻数据 === 数组形式
            var news = JSON.parse(data).videos
            // EcmaScript 6 中的一个数组方法：find
            // 需要接收一个函数作为参数
            // 当某个遍历项符合 item.id === id 条件的时候，find 会终止遍历，同时返回遍历项
            var result = news.find(function(item){
                return item.id === id
            })
            res.status(200).json({
                message:result
            })

        }
    })
})



//封装函数根据不同的url请求读取不同的json返回对应的数据
function getJSON(url,path){
    router.get(url,function(req,res){
        fs.readFile(path,'utf8',function(err,data){
            if(err){
                res.status(500).json({
                    success:false,
                    message:'服务端错误'
                })
            }else{
                res.status(200).json({
                    message:JSON.parse(data)
                })
            }
        })
    })
}



module.exports = router