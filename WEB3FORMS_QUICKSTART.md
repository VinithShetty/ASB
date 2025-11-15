# Web3Forms Quick Setup Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Get Access Key
1. Go to: https://web3forms.com
2. Sign up with: `sales@asbengineeringservices.com`
3. Create form → Copy Access Key

### Step 2: Update Code
Open: `js/contact-form.js`

Find line 19:
```javascript
formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY");
```

Replace with your key:
```javascript
formData.append("access_key", "a1b2c3d4-e5f6-7890-abcd-1234567890ab");
```

### Step 3: Test
1. Open contact page
2. Fill form and submit
3. Check email inbox

**Done! ✅**

---

## 📋 What Was Changed

### Files Modified:
1. ✅ `contact.html` - Updated form action and field names
2. ✅ `js/contact-form.js` - Replaced EmailJS with Web3Forms
3. ✅ Removed EmailJS SDK dependencies

### Key Changes:
- Form now uses native `fetch()` API
- Textarea name: `msg` → `message`
- Phone input type: `text` → `tel`
- No external SDK required
- Simpler configuration

---

## 🔧 Current Configuration

### Form Fields:
- **name** - Contact name
- **email** - Contact email (used for reply-to)
- **phone** - Phone number
- **subject** - Email subject
- **message** - Message content

### Email Recipient:
```javascript
formData.append("email_to", "sales@asbengineeringservices.com");
```

### Subject Line:
```javascript
formData.append("subject", "New Contact Form Submission - " + formData.get("subject"));
```

---

## ⚙️ Optional Enhancements

### Add Honeypot Spam Protection
In `contact.html`, add before submit button:
```html
<input type="checkbox" name="botcheck" class="hidden" style="display: none;">
```

### Add reCAPTCHA v3
1. Get site key from Google reCAPTCHA
2. Add to `<head>`:
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>
```
3. In `contact-form.js`, add before fetch:
```javascript
const token = await grecaptcha.execute('YOUR_SITE_KEY', {action: 'submit'});
formData.append("recaptcha_response", token);
```

### Custom Redirect After Success
```javascript
formData.append("redirect", "https://yourdomain.com/thank-you.html");
```

### Add CC/BCC Recipients
```javascript
formData.append("cc", "manager@yourdomain.com");
formData.append("bcc", "backup@yourdomain.com");
```

---

## 📊 Free Plan Limits

- ✅ **250 submissions/month**
- ✅ **Unlimited forms**
- ✅ **Email notifications**
- ✅ **Spam protection**
- ✅ **No credit card required**

**Need more?** Upgrade to Pro ($4.99/month) for unlimited submissions

---

## 🐛 Troubleshooting

### Form not submitting?
1. Check browser console (F12)
2. Verify access key is correct
3. Check internet connection

### Email not received?
1. Check spam folder
2. Wait 1-2 minutes
3. Verify recipient in dashboard
4. Check monthly quota (250 max)

### Error: "Invalid Access Key"
- Copy/paste access key again
- Remove any extra spaces
- Verify email is verified

---

## 📱 Support

- **Documentation:** https://docs.web3forms.com
- **Dashboard:** https://web3forms.com/dashboard
- **Support:** support@web3forms.com

---

## 📁 File Reference

```
your-website/
├── contact.html                    # Contact page with form
├── js/
│   └── contact-form.js            # Web3Forms handler
├── WEB3FORMS_SETUP.md             # Full setup guide
├── web3forms-examples.html        # Alternative methods
└── WEB3FORMS_QUICKSTART.md        # This file
```

---

## ✅ Verification Checklist

- [ ] Created Web3Forms account
- [ ] Copied access key
- [ ] Updated `contact-form.js` line 19
- [ ] Tested form submission
- [ ] Received test email
- [ ] Verified reply-to works

**Setup Time:** ~5 minutes  
**Configuration:** Minimal  
**Cost:** Free (250/month)

---

**Ready to use! Contact form is now live with Web3Forms.**
