import nodemailer from 'nodemailer';
import sparkPostTransport from 'nodemailer-sparkpost-transport';
// import pug from 'pug';
// import juice from 'juice';
// import htmlToText from 'html-to-text';

require('dotenv').config({ path: 'variables.env' });

export const transport = nodemailer.createTransport(
  sparkPostTransport({
    sparkPostApiKey: process.env.SPARKPOST_API_KEY,
    host: process.env.SPARKPOST_SMTP_HOST,
    port: process.env.SPARKPOST_SMTP_PORT,
    auth: {
      user: process.env.SPARKPOST_SMTP_USERNAME,
      pass: process.env.SPARKPOST_SMTP_PASSWORD,
    },
  }),
);

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
  transport.sendMail(
    {
      from: `FrontView <something@sparkpostbox.com>`,
      to: 'm3847710@nwytg.net',
      subject: 'Very important stuff',
      text: 'Plain text',
      html: 'Rich taggery',
    },
    (err, info) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        console.log(`Success: ${info}`);
      }
    },
  );
  // return transport.sendMail(mailOptions);
}
