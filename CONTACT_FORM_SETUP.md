# Contact Form Setup Guide

This guide will help you set up the contact form to send emails to asb.eng.services@gmail.com.

## Two Methods Available

### Method 1: EmailJS (Recommended - No Backend Required)

EmailJS is a service that allows you to send emails directly from JavaScript without needing a backend server.

#### Steps to Setup EmailJS:

1. **Create an EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up for a free account

2. **Add Email Service**
   - After logging in, go to "Email Services"
   - Click "Add New Service"
   - Select "Gmail" and connect your Gmail account (asb.eng.services@gmail.com)
   - Copy the **Service ID** (you'll need this)

3. **Create Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Set up your template with these variables:
     ```
     From: {{from_name}} ({{from_email}})
     Phone: {{phone}}
     Subject: {{subject}}
     
     Message:
     {{message}}
     ```
   - Copy the **Template ID**

4. **Get Your Public Key**
   - Go to "Account" -> "General"
   - Copy your **Public Key**

5. **Update the Code**
   - Open `contact.html`
   - Find this line (near the bottom):
     ```javascript
     emailjs.init('YOUR_PUBLIC_KEY');
     ```
   - Replace `'YOUR_PUBLIC_KEY'` with your actual public key

   - Open `js/contact-form.js`
   - Find this line:
     ```javascript
     emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
     ```
   - Replace `'YOUR_SERVICE_ID'` with your service ID
   - Replace `'YOUR_TEMPLATE_ID'` with your template ID

6. **Test the Form**
   - Open your website in a browser
   - Fill out the contact form
   - Click Submit
   - Check asb.eng.services@gmail.com for the email

#### EmailJS Free Tier Limits:
- 200 emails per month
- Perfect for small to medium websites

---

### Method 2: PHP Backend (Traditional Method)

If you have PHP hosting, you can use the PHP backend method.

#### Steps to Setup PHP Version:

1. **Update contact.html**
   - Replace the script reference from `contact-form.js` to `contact-form-php.js`
   - Find this line near the bottom:
     ```html
     <script src="js/contact-form.js"></script>
     ```
   - Change it to:
     ```html
     <script src="js/contact-form-php.js"></script>
     ```

2. **Update send-email.php**
   - Open `send-email.php`
   - Find this line:
     ```php
     $headers = "From: noreply@yourdomain.com\r\n";
     ```
   - Replace `yourdomain.com` with your actual domain name

3. **Upload Files**
   - Upload `send-email.php` to your web server
   - Make sure it's in the same directory as `contact.html`

4. **Test the Form**
   - Open your website in a browser
   - Fill out the contact form
   - Click Submit
   - Check asb.eng.services@gmail.com for the email

#### Important Notes for PHP Method:
- Requires PHP hosting with mail() function enabled
- Some hosts may require additional SMTP configuration
- May need to configure SPF/DKIM records to prevent emails from going to spam

---

## Files Created

1. **js/contact-form.js** - JavaScript handler for EmailJS method
2. **js/contact-form-php.js** - JavaScript handler for PHP backend method
3. **send-email.php** - PHP backend script for sending emails
4. **contact.html** - Updated with EmailJS integration (current setup)

---

## Troubleshooting

### Emails Going to Spam
- If using PHP: Set up proper SPF and DKIM records
- If using EmailJS: Verify your email service in EmailJS dashboard

### Form Not Submitting
- Check browser console for JavaScript errors
- Verify EmailJS credentials are correct
- Ensure all required fields are filled

### EmailJS Errors
- Make sure public key is initialized correctly
- Verify Service ID and Template ID are correct
- Check EmailJS dashboard for error logs

---

## Current Setup

Your contact form is currently configured to use **EmailJS** (Method 1).

To use it:
1. Follow the EmailJS setup steps above
2. Replace the placeholder keys in the code
3. Test the form

If you prefer to use PHP instead, follow Method 2 instructions.

---

## Support

For EmailJS support: https://www.emailjs.com/docs/
For PHP mail issues: Contact your hosting provider

---

Last Updated: October 2, 2025
