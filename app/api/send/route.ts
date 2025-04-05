import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize the Resend client with API key from environment variables
const resendApiKey = process.env.RESEND_API_KEY;

// Add validation for API key being set properly
const resend = new Resend(resendApiKey);

// Your own email for testing purposes
const OWNER_EMAIL = 'djamfikr7@gmail.com';

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

    // Store the user's email for confirmation on the frontend
    const userEmail = email;

    // In test mode, we can only send to the account owner's email
    // This is a limitation of Resend until a domain is verified
    const { error } = await resend.emails.send({
      from: 'Levercast Waitlist <onboarding@resend.dev>',
      to: OWNER_EMAIL, // Send to your own email in test mode
      subject: 'New Waitlist Signup',
      text: `New signup to Levercast waitlist: ${userEmail}`,
      html: `
        <h1>New Waitlist Signup</h1>
        <p>Someone has joined the Levercast waitlist!</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p>Note: In test mode, confirmation emails aren't sent to users.</p>
      `,
    });

    if (error) {
      console.error('Error from Resend:', error);
      return NextResponse.json({ 
        error: error.message || 'Failed to send email'
      }, { status: 500 });
    }

    // Return success even though we couldn't send to the actual user
    // In production with a verified domain, you would modify this to send to the user
    return NextResponse.json({ 
      success: true, 
      message: "You've been added to the waitlist! Note: In test mode, confirmation emails can only be sent to the account owner."
    });
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to send email. Please try again.';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 