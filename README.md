# Levercast Landing Page

A modern landing page for Levercast with waitlist functionality integrated with Resend for email notifications.

## Features

- Responsive design with dark mode support
- Waitlist sign-up form
- Email notifications via Resend
- Built with Next.js and Tailwind CSS

## Prerequisites

- Node.js (v16+)
- npm or yarn
- [Resend](https://resend.com) account for email functionality

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/djamfikr7/levercast-landing-page.git
   cd levercast-landing-page
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   - Create or update `.env` file with your Resend API key:
     ```
     RESEND_API_KEY=your_resend_api_key_here
     ```
   - You can get an API key by signing up at [Resend](https://resend.com)

4. Configure email addresses:
   - Open `app/api/send/route.ts`
   - Update the email addresses in the `from` and `to` fields to match your requirements

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

1. Push your changes to GitHub
2. Connect your repository to Vercel
3. Add your `RESEND_API_KEY` as an environment variable in Vercel
4. Deploy!

## Customization

### Colors

Edit the color variables in `app/globals.css` to match your brand:

```css
:root {
  --primary: #f59e0b; /* Main brand color */
  --primary-dark: #d97706; /* Darker shade for hover states */
}
```

### Content

Update the copy and messaging in `app/page.tsx` to match your product offering.

## Directory Structure

- `app/` - Main application code
  - `page.tsx` - Landing page component
  - `globals.css` - Global styles
  - `layout.tsx` - Root layout component
  - `api/` - API routes
    - `send/` - Email submission API
- `public/` - Static assets
- `docs/` - Additional documentation

## Troubleshooting

### Email Not Sending

1. Verify your Resend API key is correctly set in the `.env` file
2. Make sure the domain in your email addresses is verified in your Resend account
3. Check the console logs for detailed error messages

## License

[MIT](LICENSE)
