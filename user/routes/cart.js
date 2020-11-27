const express = require('express')
const utils = require('../../utils')
const db  = require('../../db')
const fs = require('fs')


const { request, response } = require('express')

const router =  express.Router()

//-------------------------------------------------------
//GET
//-------------------------------------------------------


router.get('/user',(request,response)=>{
    const statement = `
    select c.id, c.productId, c.quantity, c.totalAmount, p.title, p.image, c.price
    from cart c, product p
    where c.productId = p.id and c.userId = ${request.userId}
     `
    db.query(statement,(error,data)=>{
       response.send(utils.createResult(error,data))
    }) 
})


//-------------------------------------------------------
//POST
//-------------------------------------------------------


router.post('/user',(request,response)=>{
    const {productId, price,quantity} = request.body

    const totalAmount = price * quantity
    const statement = `
    insert into cart (productId, userId, quantity, totalAmount, price) values(
        ${productId}, ${request.userId}, ${quantity}, ${totalAmount}, ${price}
    )
     `
    db.query(statement,(error,data)=>{
       response.send(utils.createResult(error,data))
    }) 
})


router.delete('/:id',(request,response)=>{
    const {id} = request.params
    const statement = ` delete from cart where id = ${id} `
    db.query(statement,(error,data)=>{
       response.send(utils.createResult(error,data))
    }) 
})

router.put('/:id',(request,response)=>{
    const {id} = request.params
    const {quantity,price} = request.body
    const totalAmount = price *quantity
    const statement = `
    update cart set quantity = ${quantity},totalAmount= ${totalAmount}
    where id = ${id}
     `
    db.query(statement,(error,data)=>{
       response.send(utils.createResult(error,data))
    }) 
})

module.exports=router