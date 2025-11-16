// Contact Form Submission Handler using Web3Forms (URL-encoded POST)
(function () {
    'use strict';

    const contactForm = document.getElementById('contactForm');

    const RATE_LIMIT_STORAGE_KEY = 'contactFormLastSubmit';
    const RATE_LIMIT_MINUTES = 5;

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // --- Honeypot must exist & must be empty ---
            const botcheck = contactForm.querySelector('input[name="botcheck"]');
            if (botcheck) botcheck.value = '';

            if (botcheck && botcheck.value !== '') {
                console.log("Bot detected — honeypot field filled.");
                return;
            }

            // --- Rate Limiting ---
            const lastSubmitTime = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
            if (lastSubmitTime) {
                const minutesSinceLastSubmit =
                    (Date.now() - parseInt(lastSubmitTime)) / 1000 / 60;

                if (minutesSinceLastSubmit < RATE_LIMIT_MINUTES) {
                    const msgSubmit = document.getElementById('msgSubmit');
                    msgSubmit.className = 'h3 text-warning';
                    msgSubmit.innerHTML = `Please wait ${Math.ceil(
                        RATE_LIMIT_MINUTES - minutesSinceLastSubmit
                    )} more minute(s) before submitting again.`;
                    msgSubmit.classList.remove('hidden');

                    setTimeout(() => msgSubmit.classList.add('hidden'), 5000);
                    return;
                }
            }

            // --- Input Sanitization ---
            const name = sanitize(contactForm.querySelector('#name').value.trim());
            const email = sanitize(contactForm.querySelector('#email').value.trim());
            const phone = sanitize(contactForm.querySelector('#phone').value.trim());
            const subject = sanitize(contactForm.querySelector('#subject').value.trim());
            const message = sanitize(contactForm.querySelector('#msg').value.trim());

            if (!name || !email || !phone || !subject || !message) {
                showMessage('error', 'Please fill in all required fields.');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showMessage('error', 'Please enter a valid email.');
                return;
            }

            if (!/^[0-9+\-\s()]{10,}$/.test(phone)) {
                showMessage('error', 'Please enter a valid phone number.');
                return;
            }

            if (
                suspicious(name) || suspicious(email) ||
                suspicious(subject) || suspicious(message)
            ) {
                showMessage('error', 'Invalid input detected. Remove special characters.');
                return;
            }

            // --- Submit Button State ---
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            // --- URL-Encoded Payload ---
            const payload = new URLSearchParams({
                access_key: "71b322c8-70b0-46e2-8888-60641b459f50",
                name: name,
                email: email,
                phone: phone,
                subject: "New Contact Form Submission - " + subject,
                message: message,
                email_to: "sales@asbengineeringservices.com",
                botcheck: ""  // Must be present AND empty
            });

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    body: payload.toString(),
                    mode: "cors",
                    redirect: "follow"
                });

                const data = await response.json();
                console.log("Web3Forms response:", response.status, data);

                if (response.ok && data.success) {
                    localStorage.setItem(RATE_LIMIT_STORAGE_KEY, Date.now().toString());

                    showMessage("success", "Thank you! Your message has been sent successfully.");
                    contactForm.reset();
                } else {
                    showMessage("error", data.message || "Failed to send. Try again later.");
                }
            } catch (error) {
                console.error("ERROR sending form", error);
                showMessage("error", "Unexpected error occurred.");
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // ---- Helper functions ----
    function sanitize(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML
            .replace(/[<>]/g, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+=/gi, '');
    }

    function suspicious(str) {
        const patterns = [
            /<script/i, /javascript:/i, /on(load|error|click|mouse)/i,
            /<iframe/i, /eval\(/i, /expression\(/i,
            /vbscript:/i, /data:text\/html/i
        ];
        return patterns.some(p => p.test(str));
    }

    function showMessage(type, text) {
        const msgSubmit = document.getElementById('msgSubmit');
        msgSubmit.className = `h3 text-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'warning'}`;
        msgSubmit.innerHTML = text;
        msgSubmit.classList.remove('hidden');

        setTimeout(() => msgSubmit.classList.add('hidden'), type === "success" ? 5000 : 3000);
    }
})();