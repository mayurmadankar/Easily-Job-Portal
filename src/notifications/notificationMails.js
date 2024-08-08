import nodemailer from 'nodemailer';
import path from "path";
import fs from "fs";

export default class NotificationMail {

    async jobConfirmationMail(applicantObj) {

        // CREATE A EMAIL TRANSPORTER
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "mayurmadankar312@gmail.com",
                pass: "znue zvrc uurz gdgi"
            },
        });
        // READ THE EMAIL TEMPLATE
        const templatePath = path.resolve('src', 'views', 'emailTemplate.html');
        let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

        // REPLACE PLACEHOLDERS WITH ACTUAL VALUES
        htmlTemplate = htmlTemplate.replace('{{applicantName}}', applicantObj.applicantName);
        htmlTemplate = htmlTemplate.replace(/{{companyName}}/g, applicantObj.companyName);
        

        // CONFIGURE EMAIL CONTENT
        const mailOptions = {
            from: '"EASILY"<mayurmadankar312@gmail.com>',
            to: applicantObj.applicantEmail,
            subject: `Easily Update | Application Success`,
            html: htmlTemplate,
        };
        // SEND THE EMAIL
        try {
            const result = await transporter.sendMail(mailOptions);
            console.log("Email has been sent successfuly");
        } catch (err) {
            console.log(err);
            console.log("Email could not sent due to above issue");
        };
    }

}
