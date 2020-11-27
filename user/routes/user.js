const express = require('express')
const utils = require('../../utils')
const db  = require('../../db')
const config = require('../../config')
const crypto=require('crypto-js')
const mailer = require('../../mailer')
const uuid = require('uuid')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const { randomInt } = require('crypto')

const router =  express.Router()
//-------------------------------------------------------
//GET
//-------------------------------------------------------


router.get('/activate/:token',(request,response)=>{
    const {token} = request.params

    //activate the user
    //reset the activation token
    const statement = `update user set active =1 ,activationToken = '' where activationToken='${token}'`
     db.query(statement,(error,data) =>{

        const htmlPath = path.join(__dirname,'/../templates/activation_result.html')
        const body = fs.readFileSync(htmlPath)
        response.header('Content-Type','text/html')
        response.send(body)
    })

})


router.get('/forgot-password/:email',(request,response)=>{
    const {email}=request.body
    const statement = `select id,firstName,lastName from user where email = '${email}'`
    db.query(statement,(error,users) =>{
        if (error){
            response.send(utils.createError(error))
        } else if(users.length ==0){
                response.send(utils.createError('user does not exist'))
        } else{
            const user = users[0]
            const otp = utils.generateOTP()
            const body = `Your otp = ${otp}`
            mailer.sendEmail(email,'Reset Your password', body,    (error,info)=>{
               response.send(
                   utils.createResult(error,{
                   otp: otp,
                   email:email
               })
            )
           })
        }
    })
})

//-------------------------------------------------------
//POST
//-------------------------------------------------------





router.post('/signup',(request,response)=>{
   const {firstName, lastName, email, password}=request.body

   const activationToken = uuid.v4()
   const activationLink = `http://localhost:4001/user/activate/${activationToken}`

   const htmlPath= path.join(__dirname, '/../templates/send_activation_link.html')
  
   let body =''+ fs.readFileSync(htmlPath)
   body = body.replace('{firstname}', firstName)
   body = body.replace('{activationLink}', activationLink)
   

   const statement = `insert into user(firstName,lastName,email,password,activationToken) values(
       '${firstName}', '${lastName}', '${email}','${crypto.SHA256(password)}','${activationToken}'
       )`

   db.query(statement,(error,data) =>{

    mailer.sendEmail(email,'Welcome to mystore', body,    (error,info)=>{
        console.log(error)
        console.log(info)
       response.send(utils.createResult(error,data))
   })
})
})

router.post('/signin',(request,response)=>{
    const {email, password}=request.body
    const statement = `select id ,firstName,lastName,active from user where email='${email}' and password= '${crypto.SHA256(password)}'`
    db.query(statement,(error,users) =>{
        if(error){
            response.send({status:'error',error: error})
        }else if(users.length==0){
                response.send({status:'error',error: 'user does not exist'})

            }else  {
                const user = users[0]
                if(user['active'] == 1){
                   // user is an active user
                const token  = jwt.sign({id:user['id']},config.secret)
                response.send(utils.createResult(error,{
                    firstName: user['firstName'],
                    lastName: user['lastName'],
                    token: token
                }))
            } else {
                //user is a suspended user
                response.send({status: 'error',error: 'your account is not active.please contact administrator'})
            }
        }
    })
})

//-------------------------------------------------------
//PUT
//-------------------------------------------------------

router.put('',(request,response)=>{
    response.send()
})
//-------------------------------------------------------
//DELETE
//-------------------------------------------------------

router.delete('',(request,response)=>{
    response.send()
})

//-------------------------------------------------------

module.exports=router