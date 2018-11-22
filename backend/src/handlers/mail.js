import nodemailer from 'nodemailer';
import pug from 'pug';
import juice from 'juice';
import htmlToText from 'html-to-text';

require('dotenv').config({ path: 'variables.env' });

export const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

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

  return transport.sendMail(mailOptions);
}
