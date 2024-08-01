import nodemailer, { Transporter } from 'nodemailer'
import ejs from 'ejs'
import path from 'path'
require('dotenv').config()


interface EmailOptions {
    email: string,
    subject: string,
    template: string,
    emailData: { [key: string]: any }
}


const sendMail = async (options: EmailOptions): Promise<void> => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        }
    })

    const { email, subject, template, emailData } = options

    // get the path of email template
    // const templatePath = path.join(__dirname, "../mails/activation-mail.ejs")
    // console.log({ templatePath})
    // const html: string = await ejs.renderFile(templatePath)

    // console.log({ templatePath, html })

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html: template
    }

    // send mail
    await transporter.sendMail(mailOptions)
}


export default sendMail