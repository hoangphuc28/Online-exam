import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // false for TLS - as a boolean not string
      auth: {
        user: 'management.userxyz@gmail.com',
        pass: 'lkkjakmjuqudztfa',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
      from: 'Phut',
      to,
      subject,
      text,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  }
}
