// Contact Form Submission Handler using Web3Forms
(function() {
    'use strict';

    // Get the form element
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate all required fields
            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const phone = contactForm.querySelector('#phone').value.trim();
            const subject = contactForm.querySelector('#subject').value.trim();
            const message = contactForm.querySelector('#msg').value.trim();
            
            // Check if all fields are filled
            if (!name || !email || !phone || !subject || !message) {
                // Show error message
                const msgSubmit = document.getElementById('msgSubmit');
                msgSubmit.className = 'h3 text-danger';
                msgSubmit.innerHTML = 'Please fill in all required fields.';
                msgSubmit.classList.remove('hidden');
                
                // Hide error message after 3 seconds
                setTimeout(function() {
                    msgSubmit.classList.add('hidden');
                }, 3000);
                
                return; // Stop form submission
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                const msgSubmit = document.getElementById('msgSubmit');
                msgSubmit.className = 'h3 text-danger';
                msgSubmit.innerHTML = 'Please enter a valid email address.';
                msgSubmit.classList.remove('hidden');
                
                setTimeout(function() {
                    msgSubmit.classList.add('hidden');
                }, 3000);
                
                return; // Stop form submission
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;
            
            // Create FormData object from the form
            const formData = new FormData(contactForm);
            
            // Add the Web3Forms access key
            // Get your access key from: https://web3forms.com
            formData.append("access_key", "71b322c8-70b0-46e2-8888-60641b459f50");
            
            // Optional: Add recipient email (if not set in Web3Forms dashboard)
            formData.append("email_to", "asb.eng.services@gmail.com");
            
            // Optional: Add subject prefix
            formData.append("subject", "New Contact Form Submission - " + formData.get("subject"));
            
            // Optional: Redirect URL after successful submission
            // formData.append("redirect", "https://yourdomain.com/thank-you.html");
            
            try {
                // Send form data to Web3Forms
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    console.log('SUCCESS!', data);
                    
                    // Show success message
                    const msgSubmit = document.getElementById('msgSubmit');
                    msgSubmit.className = 'h3 text-success';
                    msgSubmit.innerHTML = 'Thank you! Your message has been sent successfully.';
                    msgSubmit.classList.remove('hidden');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Hide success message after 5 seconds
                    setTimeout(function() {
                        msgSubmit.classList.add('hidden');
                    }, 5000);
                } else {
                    throw new Error(data.message || 'Form submission failed');
                }
            } catch (error) {
                console.log('FAILED...', error);
                
                // Show error message
                const msgSubmit = document.getElementById('msgSubmit');
                msgSubmit.className = 'h3 text-danger';
                msgSubmit.innerHTML = 'Oops! Something went wrong. Please try again.';
                msgSubmit.classList.remove('hidden');
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Hide error message after 5 seconds
                setTimeout(function() {
                    msgSubmit.classList.add('hidden');
                }, 5000);
            }
        });
    }
})();
