// Udayapur Post Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initPoll();
    initNewsletter();
    initNewsCards();
    initPhotoGallery();
    initNavigation();
    initSocialButtons();
});

// Interactive Poll Functionality
function initPoll() {
    const pollOptions = document.querySelectorAll('.poll-option');
    const pollResults = document.querySelector('.poll-results');
    const resultFills = document.querySelectorAll('.result-fill');
    
    pollOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            pollOptions.forEach(opt => {
                opt.classList.remove('selected');
                opt.querySelector('i').className = 'far fa-circle';
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
            this.querySelector('i').className = 'fas fa-check-circle';
            
            // Show results after a delay
            setTimeout(() => {
                pollResults.style.display = 'block';
                
                // Animate the result bars
                resultFills.forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    setTimeout(() => {
                        fill.style.width = width + '%';
                    }, 200);
                });
            }, 500);
        });
    });
}

// Newsletter Subscription
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        
        // Show success message in Nepali
        showNotification(`धन्यवाद, ${name}! तपाईं Udayapur Post को दैनिक अपडेटको लागि सदस्यता लिनुभएको छ।\n\nतपाईंको इमेल: ${email}`, 'success');
        this.reset();
    });
}

// News Cards Interaction
function initNewsCards() {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const category = this.querySelector('.news-category').textContent;
            const excerpt = this.querySelector('p').textContent;
            
            // Create modal with news details
            createNewsModal(title, category, excerpt);
        });
    });
}

// Photo Gallery Interaction
function initPhotoGallery() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(photo => {
        photo.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            const description = this.querySelector('p').textContent;
            const imageName = this.getAttribute('data-image');
            
            // Create image viewer
            createImageViewer(title, description, imageName);
        });
    });
}

// Navigation System
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            
            // Highlight active navigation item
            highlightActiveNav(this);
            
            // Scroll to section if it exists
            if (sectionId) {
                scrollToSection(sectionId);
            }
        });
    });
}

// Social Buttons Interaction
function initSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('facebook')) {
                // Track Facebook click
                console.log('Facebook button clicked - redirecting to Udayapur Post Facebook');
                // In production, you might want to use analytics here
            } else if (this.classList.contains('gmail')) {
                // Track Gmail click
                console.log('Gmail button clicked - opening email client for udayapurpost96@gmail.com');
                // In production, you might want to use analytics here
            }
        });
    });
}

// Helper function to create news modal
function createNewsModal(title, category, excerpt) {
    const modal = document.createElement('div');
    modal.className = 'news-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <span class="news-category">${category}</span>
                <button id="closeModal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-light);">&times;</button>
            </div>
            <h2 style="color: var(--primary-blue); margin-bottom: 15px;">${title}</h2>
            <p style="margin-bottom: 20px; line-height: 1.6;">${excerpt}</p>
            <div style="margin-bottom: 20px; padding: 15px; background: var(--light-blue); border-radius: 8px;">
                <p style="font-style: italic; margin: 0;">यो "${title}" सम्बन्ध
