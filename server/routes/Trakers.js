const express = require('express')
const router = express.Router()
const { users,  trakers, pages} = require('../database/models')
// const validator = require('validator')
const bodyParser = require('body-parser')
const session = require('../session/index.js')
var jsonParser = bodyParser.json()
router.use(session())
router.post('/', jsonParser, async (req, res) => {
    const {name, email, page, phone} = await req.body 
    console.log(name);  
    if(page && name && email){
        page.map(async(track) => {
            var date = new Date
            var day = date.getDate()
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            
            var isTraker = await trakers.findOne({
                        where: {
                            email: email,
                            page: track,
                        }
                    })
            if(!isTraker){
                trakers.create({
                    name,
                    email,
                    page: track,
                    phone,
                    date,
                    day,
                    month,
                    year,
                })
                
            }

        })
        res.json('')
    }
    
    
})


module.exports = router