import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import sgTransport from 'nodemailer-sendgrid-transport'
import { randomNumbers } from './words'

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * randomNumbers.length)
  return `${randomNumbers[randomNumber]}`
}

const sendMail = (email) => {
  const options = {
    auth: {
      api_key: process.env.PRODUCTION
        ? process.env.SENDGRID_PASSWORD_PROD
        : process.env.SENDGRID_PASSWORD_DEV,
    },
  }
  const client = nodemailer.createTransport(sgTransport(options))
  client.sendMail(email, (err) => {
    if (err) {
      throw new Error(err)
    }
  })
}

export const sendSecretMail = (name, secret) => {
  const email = {
    from: 'sonicdx886@gmail.com',
    to: 'sonic886@naver.com',
    subject: `[DUOBODY] ${name} 님 회원 인증 메일입니다`,
    html: `${name} 님의 회원 인증 코드는 <strong>${secret}</strong> 입니다.`,
  }
  sendMail(email)
}

export const generateToken = (_id, trainerId) =>
  jwt.sign({ _id, trainerId }, process.env.TOKEN_SECRET, {
    expiresIn: '90d',
    issuer: 'duobody',
  })
