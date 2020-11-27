const nodemailer = require('nodemailer')
const config = require('./config')

function sendEmail(email,subject,body,callback){
    const transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:config.emailUser,
            pass:config.emailPassword
        }
    })
    const options = {
        from: config.emailUser,
        to:email,
        subject: subject,
        html: body
    }
    transport.sendMail(options,callback)
}

module.exports ={
    sendEmail:sendEmail

}


// sendEmail('nikhi1@gmail.com',
// 'welcome to mystore', `
// <h1>Welcome to mystore</h1>

// <div>Hello,<div>

// <div>Welcome to mystore application.<div>
// <div>here.....</div>

// <div>Best regards,<div>
// <div>Admin.<div>
// `)