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
                <p style="font-style: italic; margin: 0;">यो "${title}" सम्बन्धी ${category} श्रेणीको समाचारको पूर्वावलोकन हो। वास्तविक वेबसाइटमा, यसले पूर्ण लेख सामग्री देखाउनेछ।</p>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button style="padding: 10px 20px; background: var(--secondary-blue); color: white; border: none; border-radius: 5px; cursor: pointer; flex: 1;">Share on Facebook</button>
                <button style="padding: 10px 20px; background: var(--nepal-green); color: white; border: none; border-radius: 5px; cursor: pointer; flex: 1;">Read Full Story</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    document.getElementById('closeModal').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Helper function to create image viewer
function createImageViewer(title, description, imageName) {
    const viewer = document.createElement('div');
    viewer.className = 'image-viewer';
    viewer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    viewer.innerHTML = `
        <div style="max-width: 90%; max-height: 80%; display: flex; flex-direction: column; align-items: center;">
            <div style="width: 100%; max-width: 500px; height: 300px; background: linear-gradient(135deg, #4f46e5, #7c3aed); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-bottom: 20px;">
                <div style="text-align: center;">
                    <i class="fas fa-image" style="font-size: 3rem; margin-bottom: 10px;"></i>
                    <div>${imageName}</div>
                </div>
            </div>
            <div style="color: white; text-align: center; margin-bottom: 20px;">
                <h3>${title}</h3>
                <p>${description}</p>
                <p style="font-size: 0.9rem; margin-top: 10px; color: #d1d5db;">[यो वास्तविक वेबसाइटमा, यसले वास्तविक तस्बिर देखाउनेछ]</p>
            </div>
            <button id="closeViewer" style="padding: 10px 20px; background: var(--secondary-blue); color: white; border: none; border-radius: 5px; cursor: pointer;">बन्द गर्नुहोस्</button>
        </div>
    `;
    
    document.body.appendChild(viewer);
    
    // Close viewer functionality
    document.getElementById('closeViewer').addEventListener('click', function() {
        document.body.removeChild(viewer);
    });
    
    // Close viewer when clicking outside
    viewer.addEventListener('click', function(e) {
        if (e.target === viewer) {
            document.body.removeChild(viewer);
        }
    });
}

// Helper function to highlight active navigation
function highlightActiveNav(activeLink) {
    const allNavLinks = document.querySelectorAll('.nav-links a, .footer-links a');
    allNavLinks.forEach(link => {
        link.style.backgroundColor = '';
    });
    activeLink.style.backgroundColor = 'var(--accent-blue)';
}

// Helper function to scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Fallback for sections that don't have IDs
        if (sectionId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (sectionId === 'news') {
            document.querySelector('.news-section').scrollIntoView({ behavior: 'smooth' });
        } else if (sectionId === 'tourism') {
            document.querySelector('.photos-section').scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Show notification
    const sectionNames = {
        'home': 'गृह पृष्ठ',
        'breaking-news': 'ताजा समाचार',
        'politics': 'राजनीति',
        'local-news': 'स्थानीय समाचार',
        'tourism': 'पर्यटन',
        'culture': 'संस्कृति',
        'sports': 'खेलकुद'
    };
    
    const sectionName = sectionNames[sectionId] || sectionId;
    showNotification(`${sectionName} सेक्सन लोड हुँदैछ...`);
}

// Helper function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? 'var(--nepal-green)' : 'var(--secondary-blue)'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1001;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 3000);
}

// Additional utility function to load more news (for future implementation)
function loadMoreNews() {
    // This function can be expanded to fetch more news from an API
    showNotification('थप समाचार लोड हुँदैछ...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        showNotification('थप समाचार सफलतापूर्वक लोड भयो!', 'success');
    }, 1500);
}

// Export functions for potential use in other scripts
window.UdayapurPost = {
    loadMoreNews,
    showNotification,
    initPoll,
    initNewsletter
};
