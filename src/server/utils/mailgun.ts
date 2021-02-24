import * as mailgun from 'mailgun-js';

const apiKey: string = "YOUR API KEY";
const domain: string = "YOUR SANDBOX DOMAIN";
const recipient: string = "YOUR RECIPIENT EMAIL";

// I had some issues with .env with this project.
// I feel like it was cached from a previous apikey
// that I had accidentily published to github and
// was blocklisted. Kept gettinga "forbidden" error
// from MailGun unless they were hard coded here, 
// even though they were identical to my .env values.
// My soluiton for you is to hard code them above.
// If you'd like to talk about .env for a minute during
// the review, I'd appreciate that --

let mg = mailgun({
    apiKey,
    domain
});

const sendEmail = (from: string, to: string, subject: string, text: string) => {
   const data = {
        from,
        to: recipient,
        subject,
        text
    };
    return mg.messages().send(data, (error, body) => {
        console.log(
        "Input Data: \n From: " + data.from +
         "\n To: " + data.to + 
         "\n Subject: " + data.subject + 
         "\n Content: " + data.text
         );
        error && console.log("ERROR from Mailgun: " + error);
        console.log("Mailgun Response: " + body.message);
    });
};

export { sendEmail };