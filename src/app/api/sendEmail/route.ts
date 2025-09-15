// app/api/sendEmail/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// === CONFIG TRANSPORTER ===
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USERNAME, // email admin / pengirim default
    pass: process.env.SMTP_PASSWORD, // app password gmail
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // === EMAIL 1: Send to Admin ===
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USERNAME}>`, // appears in admin email
      to: process.env.MAIL_RECEIVER_ADDRESS, // admin inbox
      replyTo: email, // if admin clicks "reply", it will go to user email
      subject: `New message from ${name}: ${subject}`,
      html: `
        <h3>New message from website:</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    // === EMAIL 2: Confirmation to User ===
    await transporter.sendMail({
      from: `"Dany Prastya" <${process.env.SMTP_USERNAME}>`,
      to: email, // user inbox
      subject: "Confirmation: Your message has been received",
      html: `
        <p>Hello <b>${name}</b>,</p>
        <p>Thank you for contacting me. Here's a copy of your message:</p>
        <blockquote>${message}</blockquote>
        <p>I will reply within 24 hours.</p>
        <hr/>
        <small>This email was sent automatically, please don't reply directly to this address.</small>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}