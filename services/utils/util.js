import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import sgTransport from 'nodemailer-sendgrid-transport'
import { randomNumbers } from './words'
// import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * randomNumbers.length)
  return `${randomNumbers[randomNumber]}`
}

const sendMail = (email) => {
  const options = {
    auth: {
      api_key: process.env.SENDGRID_PASSWORD,
    },
  }
  const client = nodemailer.createTransport(sgTransport(options))
  client.sendMail(email, (err) => {
    if (err) {
      console.log(err)
      return new Error()
    }
  })
}

export const sendSecretMail = (name, secret) => {
  const email = {
    from: 'sonicdx886@gmail.com',
    to: 'sonic886@naver.com',
    subject: `[DUOBODY] ${name} 고객님 회원 인증 메일입니다`,
    html: `${name} 고객님의 회원 인증 코드는 <strong>${secret}</strong> 입니다.`,
  }
  sendMail(email)
}

export const generateToken = (userid) =>
  jwt.sign({ userid }, process.env.TOKEN_SECRET, {
    expiresIn: '90d',
    issuer: 'duobody',
  })
