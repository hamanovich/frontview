import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import pug from 'pug';
import juice from 'juice';
import htmlToText from 'html-to-text';

require('dotenv').config({ path: 'variables.env' });

let transport;

if (process.env.NODE_ENV === 'development') {
  transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
} else if (process.env.NODE_ENV === 'production') {
  transport = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API_KEY,
      },
    }),
  );
}

const generateHTML = (filename, options = {}) =>
  juice(pug.renderFile(`${__dirname}/../views/${filename}.pug`, options));

export default function send(options) {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);
  const mailOptions = {
    from: options.from,
    to: options.user.email,
    subject: options.subject,
    text,
    html,
  };

  return transport.sendMail(mailOptions);
}
