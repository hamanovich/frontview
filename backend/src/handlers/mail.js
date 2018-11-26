import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import pug from 'pug';
import juice from 'juice';
import htmlToText from 'html-to-text';

require('dotenv').config({ path: 'variables.env' });

const options = {
  auth: {
    api_user: 'app113815107@heroku.com',
    api_key: 'wdom3wha6547',
  },
};

export const transport = nodemailer.createTransport(sgTransport(options));

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
  transport.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log('================', err);
    }
    console.log('RRRRRRRRRRRR', res);
    console.log('EMAIL', options);
  });
  // return transport.sendMail(mailOptions);
}
