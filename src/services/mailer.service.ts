import process from "node:process";
import nodemailer from "nodemailer";
import nunjucks from "nunjucks";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function send_template(receiver, subject, template_name, data) {
  const txt = nunjucks.render(`${template_name}.txt.njk`, data);
  const html = nunjucks.render(`${template_name}.html.njk`, data);

  send_email(receiver, subject, txt, html);
}

export async function send_email(receiver, subject, text_body, html_body) {
  const info = await transporter.sendMail({
    from: "no-reply@checkmate.chess",
    to: receiver,
    subject: subject,
    text: text_body,
    html: html_body,
  });

  console.log(info);
}
