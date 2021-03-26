import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
//import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = (email) => {
    const options = {
      auth: {
        api_key: process.env.SENDGRID_PASSWORD
      }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email, (err, info) => {
      if(err) console.log(err)
      else console.log('Message sent: ' + info.response)
    });
};

export const sendSecretMail = (secret) => {
    const email = {
        from: "sonicdx886@gmail.com",
        to: 'sonic886@naver.com',
        subject: "Register Secret for DUOBDY !",
        html: `Hello! Your register secret code is <strong>${secret}</strong>.<br/>Copy paste on the app to register`
    };
    console.log('2');
    console.log(process.env.SENDGRID_PASSWORD)
    return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);