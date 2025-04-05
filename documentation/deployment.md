# Deployment Guide

This guide walks you through the process of setting up Resend for email functionality and deploying the Levercast landing page to Vercel.

## Setting up Resend

1. **Create a Resend account**:
   - Go to [Resend](https://resend.com) and sign up for an account
   - Verify your email address

2. **Get your API key**:
   - Log in to your Resend dashboard
   - Navigate to the API Keys section
   - Create a new API key and copy it

3. **Verify your domain** (optional but recommended for production):
   - In the Resend dashboard, go to Domains
   - Add and verify your domain by following their instructions
   - This ensures better email deliverability

4. **Update your email addresses**:
   - In `app/api/send/route.ts`, update the following:
     ```typescript
     from: 'Levercast Waitlist <waitlist@levercast.com>', // Use your verified domain
     to: 'info@levercast.com', // Your company's email to receive notifications
     ```

## Deploying to Vercel

1. **Push your repository to GitHub**:
   - Make sure all your changes are committed
   - Push to your GitHub repository

2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com) and sign in
   - Click "Add New" > "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure the project**:
   - Select the framework preset as "Next.js"
   - Add your environment variable:
     - Name: `RESEND_API_KEY`
     - Value: Your Resend API key
   - Click "Deploy"

4. **Verify deployment**:
   - Once the deployment is complete, click on the preview URL
   - Test the waitlist form to ensure it's working properly
   - Check your email for the confirmation message

## Troubleshooting

### Email Issues

- If emails aren't being sent, check your Vercel logs
- Ensure your Resend API key is correctly set in the environment variables
- If using a custom domain, make sure it's properly verified in Resend

### Deployment Issues

- Check the Vercel build logs for any errors
- Make sure your Next.js version is compatible with the deployment settings
- Verify that all dependencies are properly installed

## Production Considerations

- Set up proper error monitoring
- Consider implementing rate limiting for the form submission
- Add analytics to track conversion rates
- Implement GDPR compliance measures for email collection 