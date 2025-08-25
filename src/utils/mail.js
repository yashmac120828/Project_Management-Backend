import { subtle } from "crypto"
import Mailgen from "mailgen"
import nodemailer from "nodemailer"


const sendEmail = async(options)=>{
    const mailGenerator=new Mailgen({
        theme:"default",
        product:{
            name:"Task Manager",
            link:"https://taskmanagerlink.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailHtml = mailGenerator.generate(options.mailgenContent)

    const transporter = nodemailer.createTransport({
        host:process.env.MAILTRAP_SMTP_HOST,
        port : process.env.MAILTRAP_SMTP_PORT,
        auth:{
            user:process.env.MAILTRAP_SMTP_USER,
            pass:process.env.MAILTRAP_SMTP_PASS
        }
    })


    const mail = {
        from:"mail.taskmanager@example.com",
        to:options.email,
        subject: options.subject,
        text: emailTextual,
        html:emailHtml
    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email service failed silently, make sure that you have provided your MAILTRAP credentails in the .env file")
        console.error("Error",error)
    }
}
const emailVerificationMailgenContent = (username,verificationUrl)=>{
    return {
        body:{
            name : username,
            intro : "Welcome to our App !  we're excited to have you onboard",
            action:{
                instructions : "To verify your email please click on the following button",
                button : {
                    color : "#1aae5aff",
                    text : "Verify your email",
                    link : verificationUrl
                }

            },
            outro : "Need help , or have questions?? Just reply to this email, we'd love to help."
        }
    }
}

const forgotPasswordMailgenContent = (username,passwordResetUrl)=>{
    return {
        body:{
            name : username,
            intro : "We got a request to reset the password of your account",
            action:{
                instructions : "To reset your password click on the following button or link",
                button : {
                    color : "#1aae5aff",
                    text : "Reset Password",
                    link : passwordResetUrl
                }

            },
            outro : "Need help , or have questions?? Just reply to this email, we'd love to help."
        }
    }
}


export {emailVerificationMailgenContent,forgotPasswordMailgenContent,sendEmail}