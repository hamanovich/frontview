import nodemailer from 'nodemailer';
import pug from 'pug';
import juice from 'juice';
import htmlToText from 'html-to-text';
import promisify from 'es6-promisify';

require('dotenv').config({ path: 'variables.env' });

export const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const generateHTML = (filename, options = {}) => juice(pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options));

export function send(options) {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);
  const mailOptions = {
    from: 'Siarhei Hamanovich <siarhei_hamanovich@epam.com>',
    to: options.user.email,
    subject: options.subject,
    html,
    text
  };
  const sendMail = promisify(transport.sendMail, transport);
  
  return sendMail(mailOptions);
}