const whiteList = require('../config/whiteList')

const credentials = (req, res, next)=>{
    const origin = req.header.origin
    if(whiteList.includes(origin)){
        res.header('Access-Control-Allow-Origin', true)
    }
next()
}

module.exports = credentials