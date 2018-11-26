import nodemailer from 'nodemailer';
import sparkPostTransport from 'nodemailer-sparkpost-transport';
import pug from 'pug';
import juice from 'juice';
import htmlToText from 'html-to-text';

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

const generateHTML = (filename, options = {}) =>
  juice(pug.renderFile(`${__dirname}/../views/${filename}.pug`, options));

export function send(options) {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);
  const mailOptions = {
    from: options.from,
    to: options.user.email,
    subject: options.subject,
    text,
    html,
  };

  // transport.sendMail({
  //   from: 'test@your-sending-domain.com',
  //   to: 'someone@somedomain.com',
  //   subject: 'Hello from nodemailer-sparkpost-transport',
  //   html: '<p>Hello world</p>'
  // }, (err, info) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log(info);
  //   }
  // })

  return transport.sendMail(mailOptions);
}
