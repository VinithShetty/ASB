// Contact Form Submission Handler using Web3Forms with Security Enhancements
(function() {
    'use strict';

    // Get the form element
    const contactForm = document.getElementById('contactForm');
    
    // Rate limiting variables
    const RATE_LIMIT_STORAGE_KEY = 'contactFormLastSubmit';
    const RATE_LIMIT_MINUTES = 5; // Minimum minutes between submissions
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Check honeypot field (bot protection)
            const botcheck = contactForm.querySelector('input[name="botcheck"]');
            if (botcheck && botcheck.checked) {
                console.log('Bot detected - honeypot triggered');
                return; // Silent fail for bots
            }
            
            // Rate limiting check
            const lastSubmitTime = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
            if (lastSubmitTime) {
                const minutesSinceLastSubmit = (Date.now() - parseInt(lastSubmitTime)) / 1000 / 60;
                if (minutesSinceLastSubmit < RATE_LIMIT_MINUTES) {
                    const msgSubmit = document.getElementById('msgSubmit');
                    msgSubmit.className = 'h3 text-warning';
                    msgSubmit.innerHTML = `Please wait ${Math.ceil(RATE_LIMIT_MINUTES - minutesSinceLastSubmit)} more minute(s) before submitting again.`;
                    msgSubmit.classList.remove('hidden');
                    
                    setTimeout(function() {
                        msgSubmit.classList.add('hidden');
                    }, 5000);
                    
                    return;
                }
            }
            
            // Sanitize and validate input fields
            const name = sanitizeInput(contactForm.querySelector('#name').value.trim());
            const email = sanitizeInput(contactForm.querySelector('#email').value.trim());
            const phone = sanitizeInput(contactForm.querySelector('#phone').value.trim());
            const subject = sanitizeInput(contactForm.querySelector('#subject').value.trim());
            const message = sanitizeInput(contactForm.querySelector('#msg').value.trim());
            
            // Check if all fields are filled
            if (!name || !email || !phone || !subject || !message) {
                showMessage('error', 'Please fill in all required fields.');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('error', 'Please enter a valid email address.');
                return;
            }
            
            // Validate phone number (basic validation)
            const phoneRegex = /^[0-9+\-\s()]{10,}$/;
            if (!phoneRegex.test(phone)) {
                showMessage('error', 'Please enter a valid phone number.');
                return;
            }
            
            // Check for suspicious content (XSS prevention)
            if (containsSuspiciousContent(name) || containsSuspiciousContent(email) || 
                containsSuspiciousContent(subject) || containsSuspiciousContent(message)) {
                showMessage('error', 'Invalid input detected. Please remove special characters.');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;
            
            // Create FormData object from the form
            const formData = new FormData(contactForm);
            
            // Add the Web3Forms access key
            formData.append("access_key", "71b322c8-70b0-46e2-8888-60641b459f50");
            
            // Add recipient email
            formData.append("email_to", "sales@asbengineeringservices.com");
            
            // Add subject prefix
            formData.append("subject", "New Contact Form Submission - " + formData.get("subject"));
            
            // Add bot check field to form data
            formData.set("botcheck", botcheck ? botcheck.checked : false);
            
            try {
                // Send form data to Web3Forms
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    console.log('SUCCESS!', data);
                    
                    // Store submission time for rate limiting
                    localStorage.setItem(RATE_LIMIT_STORAGE_KEY, Date.now().toString());
                    
                    // Show success message
                    showMessage('success', 'Thank you! Your message has been sent successfully.');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                } else {
                    throw new Error(data.message || 'Form submission failed');
                }
            } catch (error) {
                console.log('FAILED...', error);
                showMessage('error', 'Oops! Something went wrong. Please try again.');
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Helper function to sanitize input (prevent XSS)
    function sanitizeInput(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML
            .replace(/[<>]/g, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+=/gi, '');
    }
    
    // Helper function to detect suspicious content
    function containsSuspiciousContent(str) {
        const suspiciousPatterns = [
            /<script/i,
            /javascript:/i,
            /on(load|error|click|mouse)/i,
            /<iframe/i,
            /eval\(/i,
            /expression\(/i,
            /vbscript:/i,
            /data:text\/html/i
        ];
        
        return suspiciousPatterns.some(pattern => pattern.test(str));
    }
    
    // Helper function to show messages
    function showMessage(type, text) {
        const msgSubmit = document.getElementById('msgSubmit');
        msgSubmit.className = 'h3 text-' + (type === 'success' ? 'success' : type === 'error' ? 'danger' : 'warning');
        msgSubmit.innerHTML = text;
        msgSubmit.classList.remove('hidden');
        
        setTimeout(function() {
            msgSubmit.classList.add('hidden');
        }, type === 'success' ? 5000 : 3000);
    }
})();
