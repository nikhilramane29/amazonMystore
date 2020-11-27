const express = require('express')
const bodyParser =require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('./config')
const cors = require('cors')


//morgan:for login
const morgan = require('morgan')

//swagger
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

//routers
const userRouter = require('./user/routes/user')
const orderRouter = require('./user/routes/order')
const productRouter = require('./user/routes/product')
const cartRouter = require('./user/routes/cart')
const categoryRouter = require('./user/routes/category')


const app= express()
app.use(cors('*'))
app.use(bodyParser.json())
app.use(morgan('combined'))

//swagger init
const swaggerOptions = {
    definition: {
        info:{
            title: 'Amazon Server (User Front)',
            version: '1.0.0',
            description:'This is a Express server for amazon application'
        }
    },
    //path to api docs
    apis: ['./user/routes/*.js']
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(swaggerSpec));

//add a middleware for getting the id from token
function getUserId(request,response,next) {

    if(request.url == '/user/signin'
     || request.url == '/user/signup'
     ||request.url.startsWith('/user/activate')
     || request.url == '/logo.png'
     || request.url.startsWith('/product/image/')
     || request.url.startsWith('/user/forgot-password')) {
    //do not check for token
    next()
    }else{

    try{
        const token = request.headers['token']
        console.log(token)
        const data = jwt.verify(token, config.secret)

        //add a new key named userId  with logged in user's id
        request.userId = data['id']

        //go to the actual route
        next()
    }catch(ex){
        response.status(401)
        response.send({status:'error',error: 'protected api'})
    }
    }
}

app.use(getUserId)
//required to send static files in the directory named images
app.use(express.static('images/'))

//add the routes
app.use('/user',userRouter)
app.use('/order',orderRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)
app.use('/category',categoryRouter)

//default route
app.get('/',(request,response)=>{
response.send('welcome to my application')
})


app.listen(4001,'0.0.0.0',()=>{
    console.log('server started on port 4001')
})