import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  // Check API key
  if (!process.env.RESEND_API_KEY) {
    console.error("[Email] RESEND_API_KEY is not set")
    return NextResponse.json({ 
      error: "Server configuration error. Please contact the administrator.",
      details: "Missing RESEND_API_KEY"
    }, { status: 500 })
  }

  if (!process.env.MAIL_RECEIVER_ADDRESS) {
    console.error("[Email] MAIL_RECEIVER_ADDRESS is not set")
    return NextResponse.json({ 
      error: "Server configuration error. Please contact the administrator.",
      details: "Missing MAIL_RECEIVER_ADDRESS"
    }, { status: 500 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    console.log("[Contact] API received form data:", { name, email, subject, message })

    // Process attachments for Resend format
    interface ResendAttachment {
      filename: string
      content: Buffer
    }
    
    const attachments: ResendAttachment[] = []
    let fileIndex = 0

    while (true) {
      const file = formData.get(`attachment_${fileIndex}`) as File
      if (!file) break

      console.log(`[Contact] Processing attachment ${fileIndex}:`, file.name, file.size)

      const buffer = await file.arrayBuffer()
      attachments.push({
        filename: file.name,
        content: Buffer.from(buffer),
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

    // Admin email template
    const adminEmailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; background-color: #f5f5f5; padding: 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 40px;">
          <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #f0f0f0;">
            <h1 style="color: #2c3e50; font-size: 24px; font-weight: 600; margin: 0 0 8px 0;">New Contact Form Submission</h1>
            <p style="color: #666666; font-size: 14px; margin: 0;">You have received a new message from your portfolio website</p>
          </div>
          
          <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 4px; border-left: 3px solid #007bff;">
            <div style="font-weight: 600; color: #495057; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;">Full Name</div>
            <div style="color: #212529; font-size: 15px;">${name}</div>
          </div>
          
          <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 4px; border-left: 3px solid #007bff;">
            <div style="font-weight: 600; color: #495057; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;">Email Address</div>
            <div style="color: #212529; font-size: 15px;">${email}</div>
          </div>
          
          <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 4px; border-left: 3px solid #007bff;">
            <div style="font-weight: 600; color: #495057; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;">Subject</div>
            <div style="color: #212529; font-size: 15px;">${subject}</div>
          </div>

          <div style="background: #f8f9fa; border-left: 3px solid #28a745; padding: 20px; border-radius: 4px; margin: 20px 0;">
            <h3 style="color: #495057; font-size: 14px; font-weight: 600; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px;">Message Content</h3>
            <div style="color: #212529; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</div>
          </div>

          ${attachments.length > 0 ? `
            <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 4px; border-left: 3px solid #17a2b8;">
              <div style="font-weight: 600; color: #495057; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">Attachments (${attachments.length} file${attachments.length !== 1 ? 's' : ''})</div>
              ${attachments.map((att) => `
                <div style="padding: 8px 0; border-bottom: 1px solid #e9ecef; font-size: 14px; color: #495057;">
                  📎 ${att.filename} - ${(att.content.length / 1024).toFixed(1)} KB
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #f0f0f0; text-align: center;">
            <p style="color: #6c757d; font-size: 12px; margin: 0 0 5px 0;">This email was automatically generated by your portfolio contact form.</p>
            <p style="color: #adb5bd; font-size: 11px; margin: 0;">${currentDate}</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send admin notification only (free tier — no domain verified)
    // reply-to is set to visitor's email so when you hit Reply it goes straight to them
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.MAIL_RECEIVER_ADDRESS as string,
      replyTo: email,
      subject: `New Contact: ${subject} — from ${name}`,
      html: adminEmailHTML,
      attachments: attachments.length > 0
        ? attachments.map((att) => ({ filename: att.filename, content: att.content }))
        : undefined,
    })

    if (result.error) {
      console.error("[Contact] Send failed:", result.error)
      throw new Error(result.error.message)
    }

    console.log("[Contact] Email sent:", result.data?.id)
    return NextResponse.json({
      message: "Message sent successfully",
      recipientName: name,
    })
  } catch (error) {
    console.error("[Contact] Error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send. Please try again." },
      { status: 500 }
    )
  }
}
