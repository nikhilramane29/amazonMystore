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
    const {totalAmount,tax,paymentType,paymentStatus,products}=request.body
const statementOrder= `insert into userOrder (totalAmount,tax,paymentType,paymentStatus,deliveryStatus,userId) values(
    '${totalAmount}','${tax}','${paymentType}','${paymentStatus}', 'pending',${request.userId}
)`
db.query(statementOrder,(error,data)=>{
    const orderId = data['insertId']
    let statementOrderDetails = `insert into orderDetails (orderId,productId,quantity,price,totalAmount)values`
        for (let index = 0; index < products.length; index++) {
            const product = products[index];
            if(index >0){
                statementOrderDetails += ', '
            }
            statementOrderDetails += `( ${orderId}, ${product['productId']}, ${product['quantity']},
            ${product['price']}, ${product['totalAmount']} )`
            
        }
        db.query(statementOrderDetails,(error,data)=>{
            response.send(utils.createSuccess('Placed order'))
        })
    })
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