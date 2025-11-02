// Interactive Poll
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        
        alert(`Thank you, ${name}! You've been subscribed with email: ${email}`);
        this.reset();
    });
    
    // News card interactions
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const category = this.querySelector('.news-category').textContent;
            
            // Create a modal-like effect
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '1000';
            
            modal.innerHTML = `
                <div style="background: white; padding: 30px; border-radius: 10px; max-width: 500px; text-align: center;">
                    <h2 style="color: var(--primary-blue); margin-bottom: 15px;">${title}</h2>
                    <p style="margin-bottom: 20px;">This is a preview of the article about "${title}" in the ${category} category.</p>
                    <p style="margin-bottom: 20px; font-style: italic;">In a real implementation, this would show the full article content.</p>
                    <button id="closeModal" style="padding: 10px 20px; background: var(--secondary-blue); color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
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
        });
    });
    
    // Photo gallery interactions
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(photo => {
        photo.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            const description = this.querySelector('p').textContent;
            
            // Create image viewer
            const viewer = document.createElement('div');
            viewer.style.position = 'fixed';
            viewer.style.top = '0';
            viewer.style.left = '0';
            viewer.style.width = '100%';
            viewer.style.height = '100%';
            viewer.style.backgroundColor = 'rgba(0,0,0,0.9)';
            viewer.style.display = 'flex';
            viewer.style.flexDirection = 'column';
            viewer.style.justifyContent = 'center';
            viewer.style.alignItems = 'center';
            viewer.style.zIndex = '1000';
            
            const imageUrl = this.style.backgroundImage.slice(5, -2);
            
            viewer.innerHTML = `
                <div style="max-width: 90%; max-height: 80%; display: flex; flex-direction: column; align-items: center;">
                    <img src="${imageUrl}" style="max-width: 100%; max-height: 70vh; border-radius: 10px;">
                    <div style="color: white; text-align: center; margin-top: 20px;">
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                    <button id="closeViewer" style="margin-top: 20px; padding: 10px 20px; background: var(--secondary-blue); color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
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
        });
    });
    
    // Social button interactions
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('facebook')) {
                // Track Facebook click
                console.log('Facebook button clicked - redirecting to Facebook');
                // In a real implementation, you might want to use analytics here
            } else if (this.classList.contains('gmail')) {
                // Track Gmail click
                console.log('Gmail button clicked - opening email client');
                // In a real implementation, you might want to use analytics here
            }
        });
    });
    
    // Navigation interactions
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.textContent;
            
            // Highlight the clicked navigation item
            navLinks.forEach(item => item.style.backgroundColor = '');
            this.style.backgroundColor = 'var(--accent-blue)';
            
            // Scroll to the appropriate section (simulated)
            if (section === 'Home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (section === 'Breaking News') {
                document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
            } else {
                document.querySelector('.news-section').scrollIntoView({ behavior: 'smooth' });
            }
            
            // Show a notification
            const notification = document.createElement('div');
            notification.style.position = 'fixed';
            notification.style.top = '20px';
            notification.style.right = '20px';
            notification.style.padding = '15px 20px';
            notification.style.backgroundColor = 'var(--secondary-blue)';
            notification.style.color = 'white';
            notification.style.borderRadius = '5px';
            notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            notification.style.zIndex = '1001';
            notification.textContent = `Loading ${section} content...`;
            
            document.body.appendChild(notification);
            
            // Remove notification after 2 seconds
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 2000);
        });
    });
    
