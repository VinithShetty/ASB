// Contact Form Submission Handler (PHP Backend Version)
(function() {
    'use strict';

    // Get the form element
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;
            
            // Send form data to PHP backend
            fetch('send-email.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                const msgSubmit = document.getElementById('msgSubmit');
                
                if (data.success) {
                    // Show success message
                    msgSubmit.className = 'h3 text-success';
                    msgSubmit.innerHTML = 'Thank you! Your message has been sent successfully.';
                    msgSubmit.classList.remove('hidden');
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    // Show error message
                    msgSubmit.className = 'h3 text-danger';
                    msgSubmit.innerHTML = data.message || 'Oops! Something went wrong. Please try again.';
                    msgSubmit.classList.remove('hidden');
                }
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(function() {
                    msgSubmit.classList.add('hidden');
                }, 5000);
            })
            .catch(error => {
                console.error('Error:', error);
                
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
            });
        });
    }
})();
