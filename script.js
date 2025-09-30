
        // Mobile menu toggle
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.getElementById('nav-links');
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    navLinks.classList.remove('active');
                }
            });
        });
        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            const scrollTop = document.getElementById('scroll-top');

            if (window.scrollY > 100) {
                header.classList.add('scrolled');
                scrollTop.classList.add('visible');
            } else {
                header.classList.remove('scrolled');
                scrollTop.classList.remove('visible');
            }
        });
        // Scroll to top functionality
        document.getElementById('scroll-top').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        // Form submission with email functionality
      const form = document.getElementById('contact-form');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default reload
    if (!validateForm()) return; // Check validation

    const submitBtn = document.getElementById('submit-btn');
    const loading = document.getElementById('loading');

    // Show loading state
    submitBtn.disabled = true;
    loading.style.display = 'block';
    submitBtn.querySelector('span').textContent = 'Sending...';

    // Prepare form data
    const formData = new FormData(form);

    // Send data to Netlify
    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(() => {
        // Redirect to thank-you page
        window.location.href = '/thank-you.html?success=true';
    })
    .catch((error) => {
        alert('Form submission failed: ' + error);
        submitBtn.disabled = false;
        loading.style.display = 'none';
        submitBtn.querySelector('span').textContent = 'Send';
    });
});



            // Show loading state
            submitBtn.disabled = true;
            loading.style.display = 'block';
            submitBtn.querySelector('span').textContent = 'Sending...';
        // Show success message after form submission
        window.addEventListener('load', function() {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('success') === 'true') {
                const messagesDiv = document.getElementById('form-messages');
                messagesDiv.innerHTML = '<div class="message success">Thank you for your message! We will contact you within 24 hours.</div>';
                messagesDiv.querySelector('.message').style.display = 'block';
                // Auto hide after 5 seconds
                setTimeout(() => {
                    messagesDiv.innerHTML = '';
                }, 5000);
            }
        });
        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        // Observe service cards and testimonial cards
        document.querySelectorAll('.service-card, .testimonial-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
        // Form validation
        function validateForm() {
            const form = document.getElementById('contact-form');
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'var(--danger-color)';
                    isValid = false;
                } else {
                    input.style.borderColor = 'rgba(255,255,255,0.3)';
                }
            });
            return isValid;
        }
        // Real-time form validation
        document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(field => {
            field.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = 'var(--danger-color)';
                } else {
                    this.style.borderColor = 'rgba(255,255,255,0.3)';
                }
            });
            field.addEventListener('input', function() {
                if (this.style.borderColor === 'var(--danger-color)' && this.value.trim()) {
                    this.style.borderColor = 'rgba(255,255,255,0.3)';
                }
            });
        });
