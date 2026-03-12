document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }));

    // Accordion Logic for Homework / Solutions
    const accordions = document.querySelectorAll('.hw-header');
    
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            // Toggle active class on parent item
            const parent = this.parentElement;
            parent.classList.toggle('active');
            
            // Get content element
            const body = this.nextElementSibling;
            
            if (parent.classList.contains('active')) {
                body.style.maxHeight = body.scrollHeight + 'px';
            } else {
                body.style.maxHeight = '0';
            }
        });
    });

    // Toggle Specific Solutions
    const solutionToggles = document.querySelectorAll('.solution-toggle');
    
    solutionToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            const solutionContent = this.nextElementSibling;
            if (solutionContent.style.display === 'block') {
                solutionContent.style.display = 'none';
                this.textContent = 'Show Solution';
            } else {
                solutionContent.style.display = 'block';
                this.textContent = 'Hide Solution';
                
                // Readjust parent accordion height if inside one
                const parentBody = this.closest('.hw-body');
                if (parentBody) {
                    parentBody.style.maxHeight = parentBody.scrollHeight + 'px';
                }
            }
        });
    });

    // Active state for navigation based on current URL
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});
