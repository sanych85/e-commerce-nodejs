const nodemailer = require('nodemailer')
const sendEmail = async(req,res)=> {
    let testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'acknhd7sg2g7euot@ethereal.email',
            pass: 'uCcwMKYTAuFBVMx7YW'
        }
    });
    let info = await transporter.sendMail({
        from: '"aleks" <aectann85@gmail.com>',
        to: 'aleks_shatoh@mail.ru',
        subject: "Hello",
        html: "<h2>Sending email with node js </h2>"
    })

    res.json(info)

}

module.exports = sendEmail