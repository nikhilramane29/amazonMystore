const express = require('express')
const utils = require('../../utils')
const db  = require('../../db')
const config = require('../../config')
const router =  express.Router()
//-------------------------------------------------------
//GET
//-------------------------------------------------------

router.get('/',(request,response)=>{
    response.send()
})


//-------------------------------------------------------
//POST
//-------------------------------------------------------
router.post('/',(request,response)=>{
    response.send()
})

//-------------------------------------------------------
//PUT
//-------------------------------------------------------

router.put('/',(request,response)=>{
    response.send()
})
//-------------------------------------------------------
//DELETE
//-------------------------------------------------------

router.delete('/',(request,response)=>{
    response.send()
})

//-------------------------------------------------------

module.exports=router