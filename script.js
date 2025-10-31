/**
 * Udayapur Post Website Script
 * Enhanced with security features and HTTPS enforcement
 */

// Configuration
const CONFIG = {
    facebookPage: 'https://facebook.com/UdayapurPost',
    siteUrl: 'https://khemrajphuyal.com.np',
    enableHTTPS: true,
    lazyLoadImages: true
};

// Sample news data - Replace with actual content from your Facebook page
const newsData = [
    {
        id: 1,
        title: "Local Festival Celebration in Gaighat",
        description: "The annual festival brought together communities from across Udayapur district for cultural performances and traditional celebrations. The event featured local artists and traditional cuisine.",
        date: "December 15, 2024",
        category: "Cultural",
        readTime: "2 min read"
    },
    {
        id: 2,
        title: "New Infrastructure Projects Announced",
        description: "Several development projects have been approved for Udayapur district, including road expansion and community center construction. Local authorities expect these projects to boost economic growth.",
        date: "December 12, 2024",
        category: "Development",
        readTime: "3 min read"
    },
    {
        id: 3,
        title: "Community Health Camp Success",
        description: "Free health checkup camp organized in Gaighat serves hundreds of residents. Medical professionals provided consultations and basic treatments to the local community.",
        date: "December 10, 2024",
        category: "Health",
        readTime: "2 min read"
    },
    {
        id: 4,
        title: "Agricultural Workshop for Local Farmers",
        description: "Modern farming techniques workshop conducted for Udayapur farmers. Experts shared insights on sustainable agriculture and crop management.",
        date: "December 8, 2024",
        category: "Agriculture",
        readTime: "4 min read"
    }
];

// Initialize the website
class UdayapurPost {
    constructor() {
        this.init();
    }

    init() {
        // Security: Force HTTPS in production
        this.forceHTTPS();
        
        // Load all components
        this.setupEventListeners();
        this.loadNews();
        this.setupSmoothScroll();
        this.setupLazyLoading();
        this.setupMobileMenu();
        
        // Performance monitoring
        this.setupPerformanceMonitoring();
        
        console.log('Udayapur Post website initialized securely');
    }

    // Security: Force HTTPS redirect
    forceHTTPS() {
        if (CONFIG.enableHTTPS && 
            location.protocol !== 'https:' && 
            location.hostname !== 'localhost' && 
            location.hostname !== '127.0.0.1') {
            location.replace(`https:${location.href.substring(location.protocol.length)}`);
        }
    }

    // Setup all event listeners
    setupEventListeners() {
        // Security: Sanitize external links
        this.sanitizeExternalLinks();
        
        // Handle image errors
        this.handleImageErrors();
        
        // Add scroll event for navbar
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    // Security: Add rel="noopener noreferrer" to external links
    sanitizeExternalLinks() {
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            if (!link.rel.includes('noopener')) {
                link.rel += ' noopener noreferrer';
            }
        });
    }

    // Handle broken images
    handleImageErrors() {
        document.addEventListener('DOMContentLoaded', () => {
            const images = document.querySelectorAll('img');
            
            images.forEach(img => {
                img.addEventListener('error', () => {
                    console.warn('Image failed to load:', img.src);
                    img.alt = 'Image not available - Udayapur Post';
                    // You can set a placeholder image here
                    // img.src = 'assets/placeholder.jpg';
                });
                
                // Add loading lazy for performance
                if (CONFIG.lazyLoadImages && !img.loading) {
                    img.loading = 'lazy';
                }
            });
        });
    }

    // Load news articles
    loadNews() {
        const newsGrid = document.getElementById('newsGrid');
        
        if (!newsGrid) {
            console.error('News grid element not found');
            return;
        }

        // Clear loading message
        newsGrid.innerHTML = '';
        
        // Create news cards
        newsData.forEach(news => {
            const newsCard = this.createNewsCard(news);
            newsGrid.appendChild(newsCard);
        });
    }

    // Create individual news card
    createNewsCard(news) {
        const card = document.createElement('article');
        card.className = 'news-card';
        card.setAttribute('data-category', news.category);
        
        card.innerHTML = `
            <div class="news-category">${news.category}</div>
            <h3>${this.escapeHTML(news.title)}</h3>
            <p>${this.escapeHTML(news.description)}</p>
            <div class="news-meta">
                <div>
                    <span class="news-date">${news.date}</span>
                    <span class="read-time">• ${news.readTime}</span>
                </div>
                <a href="#" class="read-more" data-news-id="${news.id}">Read More →</a>
            </div>
        `;
        
        // Add click event to read more
        const readMoreBtn = card.querySelector('.read-more');
        readMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleReadMore(news.id);
        });
        
        return card;
    }

    // Handle read more click
    handleReadMore(newsId) {
        const news = newsData.find(item => item.id === newsId);
        if (news) {
            // In a real implementation, this would navigate to a full article page
            alert(`Full article for: ${news.title}\n\n${news.description}\n\n(Full article page coming soon!)`);
            
            // Analytics tracking (if you add analytics later)
            this.trackEvent('News', 'Read More', news.title);
        }
    }

    // Smooth scrolling for navigation links
    setupSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Adjust for fixed header
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    // Mobile menu setup
    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    // Lazy loading for images
    setupLazyLoading() {
        if ('IntersectionObserver' in window && CONFIG.lazyLoadImages) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Handle navbar scroll effect
    handleScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '';
            navbar.style.backdropFilter = '';
        }
    }

    // Performance monitoring
    setupPerformanceMonitoring() {
        // Log performance metrics
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page loaded in ${loadTime}ms`);
                
                // You can send this to analytics
                if (loadTime > 3000) {
                    console.warn('Page load time is slow, consider optimization');
                }
            }
        });
    }

    // Security: HTML escape function
    escapeHTML(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Analytics event tracking (basic implementation)
    trackEvent(category, action, label) {
        // In a real implementation, this would send data to Google Analytics
        console.log(`Event: ${category} - ${action} - ${label}`);
        
        // Example for future Google Analytics implementation:
        // gtag('event', action, {
        //     'event_category': category,
        //     'event_label': label
        // });
    }

    // Utility: Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Initialize the website when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new UdayapurPost();
    });
} else {
    new UdayapurPost();
}

// Service Worker registration for PWA features (optional)
if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => {
        // You can add a service worker here for offline functionality
        console.log('Service Worker support available');
    });
}

// Error boundary for unhandled errors
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // In production, you might want to send this to an error tracking service
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UdayapurPost;
}
