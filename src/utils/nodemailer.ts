/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import nodemailer from "nodemailer";
import { env } from "~/env.mjs";
import { type MealSelection } from "../state";

// async..await is not allowed in global scope, must use a wrapper
export const nodeMailer = async ({
  buyersEmail,
  orders,
}: {
  buyersEmail: string;
  orders: {
    date: Date;
    dish: string | null;
    protein: string | null;
  }[];
}) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //   const testAccount = await nodemailer.createTestAccount();
  const test = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: env.EMAIL, // generated ethereal user
      pass: env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Freshii Kanata" <foo@example.com>', // sender address
    to: buyersEmail, // list of receivers
    subject: "Your Freshii Order", // Subject line
    // text: "Hello world?", // plain text body
    html: `<b>Hello ${buyersEmail}, you order is done! </b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
