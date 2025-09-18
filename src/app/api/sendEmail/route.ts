import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    console.log("[Contact] API received form data:", { name, email, subject, message })

    // Process attachments
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const attachments: any[] = []
    let fileIndex = 0

    while (true) {
      const file = formData.get(`attachment_${fileIndex}`) as File
      if (!file) break

      console.log(`[Contact] Processing attachment ${fileIndex}:`, file.name, file.size)

      const buffer = await file.arrayBuffer()
      attachments.push({
        filename: file.name,
        content: Buffer.from(buffer),
        contentType: file.type,
      })

      fileIndex++
    }

    console.log(`[Contact] Total attachments processed: ${attachments.length}`)

    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    })

    // Simple email styles
    const emailStyles = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333333;
          background-color: #ffffff;
          padding: 20px;
        }
        
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 40px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .header h1 {
          color: #2c3e50;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .header p {
          color: #666666;
          font-size: 14px;
        }
        
        .field {
          margin-bottom: 20px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 4px;
          border-left: 3px solid #e9ecef;
        }
        
        .field-label {
          font-weight: 600;
          color: #495057;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        
        .field-value {
          color: #212529;
          font-size: 15px;
          word-break: break-word;
        }
        
        .message-field {
          background: #f8f9fa;
          border-left: 3px solid #6c757d;
          padding: 20px;
          border-radius: 4px;
          margin: 20px 0;
        }
        
        .message-field h3 {
          color: #495057;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .message-content {
          color: #212529;
          font-size: 15px;
          line-height: 1.7;
          white-space: pre-wrap;
        }
        
        .attachments {
          margin: 20px 0;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 4px;
          border-left: 3px solid #17a2b8;
        }
        
        .attachment-item {
          padding: 8px 0;
          border-bottom: 1px solid #e9ecef;
          font-size: 14px;
          color: #495057;
        }
        
        .attachment-item:last-child {
          border-bottom: none;
        }
        
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #f0f0f0;
          text-align: center;
        }
        
        .footer-text {
          color: #6c757d;
          font-size: 12px;
          margin-bottom: 5px;
        }
        
        .timestamp {
          color: #adb5bd;
          font-size: 11px;
        }
      </style>
    `

    // Simple admin email template
    const adminEmailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        ${emailStyles}
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>You have received a new message from your portfolio website</p>
          </div>
          
          <div class="field">
            <div class="field-label">Full Name</div>
            <div class="field-value">${name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value">${email}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Subject</div>
            <div class="field-value">${subject}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Submitted</div>
            <div class="field-value">${currentDate}</div>
          </div>

          <div class="message-field">
            <h3>Message Content</h3>
            <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
          </div>

          ${attachments.length > 0 ? `
            <div class="attachments">
              <div class="field-label">Attachments (${attachments.length} file${attachments.length !== 1 ? 's' : ''})</div>
              ${attachments.map((attachment) => `
                <div class="attachment-item">
                  ${attachment.filename} - ${(attachment.content.length / 1024).toFixed(1)} KB
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div class="footer">
            <div class="footer-text">
              This email was automatically generated by your portfolio contact form.
            </div>
            <div class="timestamp">${currentDate}</div>
          </div>
        </div>
      </body>
      </html>
    `

    // Simple client confirmation email template  
    const clientEmailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message Received - Thank You</title>
        ${emailStyles}
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Message</h1>
            <p>Your message has been received and will be reviewed shortly</p>
          </div>
          
          <div class="field">
            <div class="field-label">Hello</div>
            <div class="field-value">${name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Your Subject</div>
            <div class="field-value">${subject}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Submitted On</div>
            <div class="field-value">${currentDate}</div>
          </div>

          <div class="message-field">
            <h3>Your Message</h3>
            <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
          </div>

          ${attachments.length > 0 ? `
            <div class="attachments">
              <div class="field-label">Your Attachments (${attachments.length} file${attachments.length !== 1 ? 's' : ''})</div>
              ${attachments.map((attachment) => `
                <div class="attachment-item">
                  ${attachment.filename} - ${(attachment.content.length / 1024).toFixed(1)} KB
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div class="field" style="background: #f1f3f4; border-left-color: #28a745;">
            <div class="field-label">What happens next?</div>
            <div class="field-value">
              I'll review your message and get back to you within 24-48 hours. Thank you for reaching out!
            </div>
          </div>

          <div class="footer">
            <div class="footer-text">
              This is an automated confirmation. Please do not reply to this email.
            </div>
            <div class="footer-text">
              For direct contact: <a href="mailto:${process.env.MAIL_RECEIVER_ADDRESS}" style="color: #495057;">${process.env.MAIL_RECEIVER_ADDRESS}</a>
            </div>
            <div class="timestamp">${currentDate}</div>
          </div>
        </div>
      </body>
      </html>
    `

    const mailOptionsAdmin = {
      from: `"Portfolio Contact Form" <${process.env.SMTP_USERNAME}>`,
      to: process.env.MAIL_RECEIVER_ADDRESS,
      subject: `📧 New Contact: ${subject} - from ${name}`,
      html: adminEmailHTML,
      attachments,
    }

    const mailOptionsClient = {
      from: `"Dany Prastya" <${process.env.SMTP_USERNAME}>`,
      to: email,
      subject: `✅ Message Received: ${subject}`,
      html: clientEmailHTML,
      attachments: [], // Don't send attachments back to client
    }

    console.log("[Contact] Sending admin notification email...")
    await transporter.sendMail(mailOptionsAdmin)
    console.log("[Contact] Admin email sent successfully")

    console.log("[Contact] Sending client confirmation email...")
    await transporter.sendMail(mailOptionsClient)
    console.log("[Contact] Client confirmation email sent successfully")

    return NextResponse.json({ 
      message: "Email sent successfully",
      recipientName: name,
      attachmentCount: attachments.length
    })
  } catch (error) {
    console.error("[Contact] Error sending email:", error)
    return NextResponse.json({ 
      error: "Failed to send email. Please try again later.",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}