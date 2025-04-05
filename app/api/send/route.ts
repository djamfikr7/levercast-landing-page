import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize the Resend client with API key from environment variables
const resendApiKey = process.env.RESEND_API_KEY;

// Add validation for API key being set properly
const resend = new Resend(resendApiKey);

export async function POST(request: NextRequest) {
  try {
    // Check if the API key is properly set
    if (!resendApiKey || resendApiKey === 'your_api_key_here') {
      console.error('Resend API key is not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please set the RESEND_API_KEY environment variable.' },
        { status: 500 }
      );
    }

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
      from: 'Levercast Waitlist <onboarding@resend.dev>',
      to: email, // Send notification to the user's email instead
      subject: 'New Waitlist Signup',
      text: `Thank you for joining the Levercast waitlist! We'll keep you updated on our progress.`,
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
      console.error('Error from Resend:', error);
      return NextResponse.json({ 
        error: error.message || 'Failed to send email'
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to send email. Please try again.';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 