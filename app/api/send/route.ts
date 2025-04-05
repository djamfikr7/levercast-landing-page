import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize the Resend client with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the email
    const { email } = await request.json();

    // Validate the email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Levercast Waitlist <waitlist@yourdomain.com>',
      to: 'your_target_email@example.com', // Replace with your actual email
      subject: 'New Waitlist Signup',
      text: `New waitlist signup: ${email}`,
      html: `
        <h1>New Waitlist Signup</h1>
        <p>Someone has joined the Levercast waitlist!</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>Don't forget to add them to your CRM or newsletter system.</p>
      `,
    });

    // Also send a confirmation to the user
    await resend.emails.send({
      from: 'Levercast <noreply@yourdomain.com>',
      to: email,
      subject: 'Welcome to the Levercast Waitlist!',
      text: 'Thank you for joining our waitlist. We\'ll keep you updated on our progress and let you know when Levercast is ready to launch!',
      html: `
        <h1>Welcome to the Levercast Waitlist!</h1>
        <p>Thank you for your interest in Levercast.</p>
        <p>We're working hard to build a platform that helps B2B companies leverage customer conversations into actionable product insights.</p>
        <p>We'll keep you updated on our progress and let you know when we're ready to launch!</p>
        <p>
        <br>
        The Levercast Team
        </p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
} 