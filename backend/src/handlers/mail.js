import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
// import sparkPostTransport from 'nodemailer-sparkpost-transport';
// import pug from 'pug';
// import juice from 'juice';
// import htmlToText from 'html-to-text';

require('dotenv').config({ path: 'variables.env' });

const auth = {
  auth: {
    api_key: '58012163db87745d51fc6a0185f0ac03-059e099e-e8e02ecb',
    domain: 'sandbox23e4ab9def8c433da9c06792ebc41e7d.mailgun.org',
  },
};

export const nodemailerMailgun = nodemailer.createTransport(mg(auth));

// export const transport = nodemailer.createTransport(
//   sparkPostTransport({
//     sparkPostApiKey: process.env.SPARKPOST_API_KEY,
//     host: process.env.SPARKPOST_SMTP_HOST,
//     port: process.env.SPARKPOST_SMTP_PORT,
//     auth: {
//       user: process.env.SPARKPOST_SMTP_USERNAME,
//       pass: process.env.SPARKPOST_SMTP_PASSWORD,
//     },
//   }),
// );

// const generateHTML = (filename, options = {}) =>
// juice(pug.renderFile(`${__dirname}/../views/${filename}.pug`, options));

export function send() {
  // const html = generateHTML(options.filename, options);
  // const text = htmlToText.fromString(html);
  // const mailOptions = {
  //   from: options.from,
  //   to: options.user.email,
  //   subject: options.subject,
  //   text,
  //   html,
  // };
  nodemailerMailgun.sendMail(
    {
      from: 'postmaster@sandbox23e4ab9def8c433da9c06792ebc41e7d.mailgun.org',
      to: 'm3847710@nwytg.net',
      subject: 'Hey you, awesome!',
      html: '<b>Wow Big powerful letters</b>',
      text: 'Mailgun rocks, pow pow!',
    },
    (err, info) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        console.log(`Response: ${info}`);
      }
    },
  );
  // return transport.sendMail(mailOptions);
}
