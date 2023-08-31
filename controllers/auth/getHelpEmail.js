import {sendEmail} from "../../helpers/index.js";

const getHelpEmail = async (req, res) => {
    const {name} = req.user;
    const {email, comment} = req.body;

    const helpRequest = {
        to: "taskpro.project@gmail.com",
        subject: "User needs help",
        html: `<div><p>Registered user of the application: <strong>${name}</strong></p>
                <p>Message from user: <strong>${comment}</strong></p>
                <p>Send response to email: <strong>${email}</strong></p><div/>`,
    };
    await sendEmail(helpRequest);
    const helpResponse = {
        to: email,
        subject: "Support",
        html: `<div><p>Dear <strong>${name}</strong> !</p>
                <p>We have received a message from you with the text: <strong>${comment}</strong>.</p>
                <p>Thank you for you request! We will review your comment and respond as soon as possible.</p>`,
    };
    await sendEmail(helpResponse);

    res.json({
        message: "Reply email has been sent",
    });
};

export default getHelpEmail;