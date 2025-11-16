// Contact Form Submission Handler using Web3Forms with Security Enhancements
(function() {
    'use strict';

    const contactForm = document.getElementById('contactForm');
    const RATE_LIMIT_STORAGE_KEY = 'contactFormLastSubmit';
    const RATE_LIMIT_MINUTES = 5;

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Ensure honeypot exists & is empty (Web3Forms expects it present and empty)
            const botcheck = contactForm.querySelector('input[name="botcheck"]');
            if (botcheck) {
                botcheck.value = ''; // IMPORTANT: keep the field but force it empty
            }

            // If botcheck had a value, it's a bot — silently stop
            if (botcheck && botcheck.value !== '') {
                console.log('Bot detected - honeypot triggered');
                return;
            }

            // Rate limiting
            const lastSubmitTime = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
            if (lastSubmitTime) {
                const minutesSinceLastSubmit = (Date.now() - parseInt(lastSubmitTime)) / 1000 / 60;
                if (minutesSinceLastSubmit < RATE_LIMIT_MINUTES) {
                    const msgSubmit = document.getElementById('msgSubmit');
                    msgSubmit.className = 'h3 text-warning';
                    msgSubmit.innerHTML = `Please wait ${Math.ceil(RATE_LIMIT_MINUTES - minutesSinceLastSubmit)} more minute(s) before submitting again.`;
                    msgSubmit.classList.remove('hidden');
                    setTimeout(() => msgSubmit.classList.add('hidden'), 5000);
                    return;
                }
            }

            // Sanitize + validate
            const name = sanitizeInput(contactForm.querySelector('#name').value.trim());
            const email = sanitizeInput(contactForm.querySelector('#email').value.trim());
            const phone = sanitizeInput(contactForm.querySelector('#phone').value.trim());
            const subject = sanitizeInput(contactForm.querySelector('#subject').value.trim());
            const message = sanitizeInput(contactForm.querySelector('#msg').value.trim());

            if (!name || !email || !phone || !subject || !message) {
                showMessage('error', 'Please fill in all required fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('error', 'Please enter a valid email address.');
                return;
            }

            const phoneRegex = /^[0-9+\-\s()]{10,}$/;
            if (!phoneRegex.test(phone)) {
                showMessage('error', 'Please enter a valid phone number.');
                return;
            }

            if (containsSuspiciousContent(name) || containsSuspiciousContent(email) ||
                containsSuspiciousContent(subject) || containsSuspiciousContent(message)) {
                showMessage('error', 'Invalid input detected. Please remove special characters.');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            // Build FormData
            // Make sure botcheck exists in the DOM and is empty. Keep it in the payload.
            const formData = new FormData(contactForm);

            // Force empty honeypot explicitly in FormData as well (safety)
            if (formData.has('botcheck')) {
                formData.set('botcheck', '');
            } else {
                formData.append('botcheck', '');
            }

            // REQUIRED: the Web3Forms access key. Keep secret ideally, but must be present.
            formData.set('access_key', '71b322c8-70b0-46e2-8888-60641b459f50');

            // Add recipient and nice subject
            formData.set('email_to', 'sales@asbengineeringservices.com');
            formData.set('subject', 'New Contact Form Submission - ' + (formData.get('subject') || subject));

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                // Parse and log the full JSON response so we can see errors (helps debug)
                const data = await response.json();
                console.log('Web3Forms response:', data, 'HTTP status:', response.status);

                if (response.ok && data.success) {
                    localStorage.setItem(RATE_LIMIT_STORAGE_KEY, Date.now().toString());
                    showMessage('success', 'Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                } else {
                    // If Web3Forms returns an error object, show the message (more helpful)
                    const apiMsg = data && data.message ? data.message : 'Form submission failed';
                    showMessage('error', 'Failed to send message: ' + apiMsg);
                    console.error('Web3Forms error:', data);
                }

            } catch (error) {
                console.error('Network/Unexpected error', error);
                showMessage('error', 'Unexpected error. Check console.');
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }

        });
    }

    // --- helpers (same as yours) ---
    function sanitizeInput(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML
            .replace(/[<>]/g, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+=/gi, '');
    }

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

    function showMessage(type, text) {
        const msgSubmit = document.getElementById('msgSubmit');
        msgSubmit.className = 'h3 text-' + (type === 'success' ? 'success' : type === 'error' ? 'danger' : 'warning');
        msgSubmit.innerHTML = text;
        msgSubmit.classList.remove('hidden');
        setTimeout(() => msgSubmit.classList.add('hidden'), type === 'success' ? 5000 : 3000);
    }
})();