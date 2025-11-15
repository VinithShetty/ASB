# Web3Forms Contact Form Setup Guide

## Overview
This contact form uses **Web3Forms** - a free, secure form backend service that sends form submissions directly to your email without requiring a backend server.

## Why Web3Forms?
- ✅ **100% Free** - Up to 250 submissions per month (free tier)
- ✅ **No Backend Required** - Pure HTML/JavaScript implementation
- ✅ **Spam Protection** - Built-in honeypot and reCAPTCHA support
- ✅ **Email Notifications** - Instant email delivery to your inbox
- ✅ **Custom Reply-To** - Users can reply directly to form submissions
- ✅ **Easy Setup** - Just one access key needed
- ✅ **GDPR Compliant** - Data privacy friendly

---

## Setup Instructions

### Step 1: Get Your Web3Forms Access Key

1. **Visit Web3Forms Website**
   - Go to: [https://web3forms.com](https://web3forms.com)

2. **Create Free Account**
   - Click "Get Started Free" or "Sign Up"
   - Enter your email address: `sales@asbengineeringservices.com`
   - Verify your email

3. **Create New Form**
   - After login, click "Create New Form"
   - Enter form name: "ASB Engineering Contact Form"
   - Set recipient email: `sales@asbengineeringservices.com`
   - Click "Create Form"

4. **Copy Access Key**
   - You'll receive an **Access Key** (looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)
   - Copy this key

### Step 2: Update Your JavaScript File

1. **Open the file:** `js/contact-form.js`

2. **Find this line (around line 19):**
   ```javascript
   formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY");
   ```

3. **Replace with your actual access key:**
   ```javascript
   formData.append("access_key", "a1b2c3d4-e5f6-7890-abcd-ef1234567890");
   ```

### Step 3: Test Your Form

1. **Open your website** in a browser
2. **Navigate to the Contact page**
3. **Fill out the form** with test data:
   - Name: Test User
   - Email: your-test-email@gmail.com
   - Phone: +91 1234567890
   - Subject: Test Submission
   - Message: This is a test message
4. **Click Submit**
5. **Check your email** (`sales@asbengineeringservices.com`) for the form submission

---

## Configuration Options

### Basic Configuration (Already Done)

The form is already configured with these fields:
- `name` - Contact person's name
- `email` - Contact person's email (used for reply-to)
- `phone` - Contact person's phone number
- `subject` - Email subject
- `message` - Form message content

### Advanced Configuration (Optional)

You can customize the form by adding these options in `js/contact-form.js`:

#### 1. Custom Email Subject
```javascript
// Line 23 - Already configured
formData.append("subject", "New Contact Form Submission - " + formData.get("subject"));
```

#### 2. Add reCAPTCHA Protection
```javascript
// Add before formData.append("access_key", ...)
formData.append("recaptcha_response", "your_recaptcha_token_here");
```

#### 3. Custom Redirect After Success
```javascript
// Add after access_key line
formData.append("redirect", "https://yourdomain.com/thank-you.html");
```

#### 4. CC/BCC Emails
```javascript
// Add additional recipients
formData.append("cc", "manager@yourdomain.com");
formData.append("bcc", "backup@yourdomain.com");
```

#### 5. From Name Customization
```javascript
// Add custom from name
formData.append("from_name", "ASB Engineering Website");
```

---

## Web3Forms Dashboard Features

### Email Notifications
- **Instant Delivery** - Emails arrive within seconds
- **No Spam Folder** - Messages come from verified servers
- **Reply Directly** - Recipients can reply to the form submitter

### Spam Protection
- **Honeypot** - Automatically enabled (catches bot submissions)
- **reCAPTCHA** - Optional (recommended for high-traffic sites)
- **Rate Limiting** - Prevents abuse

### Form Analytics
- View submission history
- Track form performance
- Export submissions to CSV

---

## Troubleshooting

### Form Not Submitting

**Issue:** Button shows "Sending..." but nothing happens

**Solutions:**
1. Check browser console for errors (F12 → Console)
2. Verify access key is correct in `contact-form.js`
3. Ensure you have internet connection
4. Check Web3Forms dashboard for error logs

### Email Not Received

**Issue:** Form submits successfully but no email arrives

**Solutions:**
1. Check spam/junk folder
2. Verify recipient email in Web3Forms dashboard
3. Check email quota (250/month on free plan)
4. Wait 1-2 minutes (sometimes delayed)

### Error: "Invalid Access Key"

**Solution:** 
- Double-check the access key in `contact-form.js`
- Ensure no extra spaces or quotes
- Verify email is verified in Web3Forms dashboard

### Error: "Rate Limit Exceeded"

**Solution:**
- Free tier: 250 submissions/month
- Upgrade to Pro plan if needed
- Wait for monthly reset

---

## Upgrading to Pro (Optional)

### Free Plan Limitations
- 250 submissions/month
- Basic features only
- Web3Forms branding

### Pro Plan Benefits ($4.99/month)
- Unlimited submissions
- File uploads support
- Custom webhooks
- No branding
- Priority support
- Advanced spam protection

**Upgrade at:** [https://web3forms.com/pricing](https://web3forms.com/pricing)

---

## Email Template Customization

### In Web3Forms Dashboard:
1. Go to "Email Templates"
2. Customize the email format
3. Add company logo/branding
4. Set custom reply-to address

### Email Content Includes:
- Sender name
- Sender email (as reply-to)
- Phone number
- Subject line
- Message content
- Submission timestamp
- IP address (optional)

---

## Security Best Practices

### 1. Access Key Protection
- ✅ Access key is safe to use in frontend code
- ✅ Web3Forms validates requests server-side
- ✅ No need to hide it in environment variables

### 2. Spam Prevention
- Enable reCAPTCHA for public forms
- Use honeypot field (already built-in)
- Set rate limits in dashboard

### 3. Data Privacy
- Form data is encrypted in transit (HTTPS)
- Submissions not stored long-term
- GDPR compliant

---

## Alternative: Webhook Integration (Advanced)

If you want to process submissions programmatically:

1. **Enable Webhooks** in Web3Forms dashboard
2. **Add webhook URL** to your server endpoint
3. **Receive JSON data** for custom processing

Example webhook payload:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 1234567890",
  "subject": "Quote Request",
  "message": "I need a quote for...",
  "timestamp": "2025-01-15T10:30:00Z"
}
```

---

## Support & Resources

### Web3Forms Documentation
- Official Docs: [https://docs.web3forms.com](https://docs.web3forms.com)
- API Reference: [https://docs.web3forms.com/api-reference](https://docs.web3forms.com/api-reference)
- GitHub: [https://github.com/web3forms](https://github.com/web3forms)

### Contact Support
- Email: support@web3forms.com
- Response time: 24-48 hours

---

## File Structure

```
your-website/
├── contact.html              # Contact page with form
├── js/
│   └── contact-form.js       # Form submission handler (Web3Forms)
└── WEB3FORMS_SETUP.md       # This setup guide
```

---

## Quick Start Checklist

- [ ] Create Web3Forms account at [web3forms.com](https://web3forms.com)
- [ ] Create new form in dashboard
- [ ] Copy access key
- [ ] Paste access key in `js/contact-form.js` (line 19)
- [ ] Test form submission
- [ ] Check email inbox
- [ ] Enable reCAPTCHA (optional)
- [ ] Customize email template (optional)

---

## Form Field Reference

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `name` | text | Yes | Contact person's name |
| `email` | email | Yes | Contact email (reply-to) |
| `phone` | tel | Yes | Phone number |
| `subject` | text | Yes | Email subject line |
| `message` | textarea | Yes | Form message content |
| `access_key` | hidden | Yes | Your Web3Forms key |

---

## Migration from EmailJS

### What Changed:
1. ✅ Removed EmailJS SDK dependency
2. ✅ Removed EmailJS initialization code
3. ✅ Updated form submission to use Web3Forms API
4. ✅ Changed textarea name from `msg` to `message`
5. ✅ Changed phone input type to `tel`
6. ✅ Updated form action attribute

### Benefits:
- **Simpler setup** - Only one access key needed
- **No complex templates** - Email format handled by Web3Forms
- **Better deliverability** - Dedicated email servers
- **Free tier** - No credit card required

---

## Need Help?

If you encounter any issues:

1. **Check this guide** for common solutions
2. **Review browser console** for error messages
3. **Test with Web3Forms support** - Send test submission from their dashboard
4. **Contact Web3Forms support** - support@web3forms.com

---

**Setup completed successfully! Your contact form is now ready to use with Web3Forms.**

Last updated: January 2025
