// Sample news data - Replace with actual news from your Facebook page
const newsData = [
    {
        title: "Local Festival Celebration in Gaighat",
        description: "The annual festival brought together communities from across Udayapur district...",
        date: "December 15, 2024"
    },
    {
        title: "New Infrastructure Projects Announced",
        description: "Several development projects have been approved for Udayapur district...",
        date: "December 12, 2024"
    },
    {
        title: "Community Health Camp Success",
        description: "Free health checkup camp organized in Gaighat serves hundreds of residents...",
        date: "December 10, 2024"
    }
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadNews();
    setupSmoothScroll();
});

// Load news articles
function loadNews() {
    const newsGrid = document.querySelector('.news-grid');
    
    newsData.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        
        newsCard.innerHTML = `
            <h3>${news.title}</h3>
            <p>${news.description}</p>
            <div class="news-meta">
                <span class="news-date">${news.date}</span>
                <a href="#" class="read-more">Read More →</a>
            </div>
        `;
        
        newsGrid.appendChild(newsCard);
    });
}

// Smooth scrolling for navigation links
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Adjust for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add loading animation
function showLoading() {
    // You can add a loading spinner here
    console.log('Loading content...');
}

// Handle image loading errors
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'assets/placeholder.jpg'; // Fallback image
            this.alt = 'Image not available';
        });
    });
});

// Simple newsletter subscription (you can expand this)
function subscribeNewsletter(email) {
    // This is a basic implementation
    // You'll want to connect this to a proper backend service
    console.log('Subscribing:', email);
    alert('Thank you for subscribing!');
}
