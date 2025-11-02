// Tab functionality for weekly news section
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Update date in top bar
    function updateDate() {
        const dateElement = document.querySelector('.date');
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
    
    updateDate();
    
    // Mobile menu functionality
    function initMobileMenu() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Insert mobile menu button
        const headerContent = document.querySelector('.header-content');
        headerContent.appendChild(mobileMenuBtn);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('mobile-active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    initMobileMenu();
    
    // News data for dynamic content (can be replaced with API calls)
    const newsData = {
        featured: [
            {
                id: 1,
                title: "Local Elections Bring New Leadership to Udayapur",
                category: "Politics",
                excerpt: "Residents of Udayapur have elected new representatives in the recent local elections, marking a significant shift in the region's political landscape.",
                image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                date: "2 hours ago",
                views: "1,245"
            },
            {
                id: 2,
                title: "New Market Complex to Boost Local Economy",
                category: "Business",
                excerpt: "The construction of a modern market complex is expected to create hundreds of jobs and stimulate economic growth in the region.",
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80",
                date: "5 hours ago",
                views: "892"
            }
        ],
        trending: [
            "Flood Relief Efforts Underway in Eastern Regions",
            "New Highway Project to Connect Udayapur with Major Cities",
            "Local Artist Gains International Recognition",
            "Agricultural Fair Attracts Thousands of Visitors",
            "Health Department Launches New Vaccination Drive"
        ]
    };
    
    // Function to load more news (for demonstration)
    function loadMoreNews() {
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.className = 'btn load-more-btn';
        loadMoreBtn.textContent = 'Load More News';
        loadMoreBtn.style.margin = '40px auto';
        loadMoreBtn.style.display = 'block';
        
        const newsSection = document.querySelector('.weekly-news .container');
        newsSection.appendChild(loadMoreBtn);
        
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more news
            const loadingText = document.createElement('div');
            loadingText.textContent = 'Loading more news...';
            loadingText.style.textAlign = 'center';
            loadingText.style.padding = '20px';
            loadMoreBtn.parentNode.replaceChild(loadingText, loadMoreBtn);
            
            setTimeout(() => {
                // In a real application, this would fetch new data from an API
                alert('More news would be loaded here from your database or API');
                location.reload(); // Refresh to show how it would work
            }, 1500);
        });
    }
    
    loadMoreNews();
    
    // Advertisement rotation (placeholder functionality)
    function rotateAds() {
        const adSpaces = document.querySelectorAll('.ad-space, .ad-banner');
        const adTexts = [
            "Support Local Businesses - Advertisement",
            "Community Event Sponsorship Available",
            "Promote Your Service with Udayapur Post",
            "Special Offer for Local Advertisers"
        ];
        
        let currentAd = 0;
        
        setInterval(() => {
            adSpaces.forEach(ad => {
                ad.textContent = adTexts[currentAd];
            });
            
            currentAd = (currentAd + 1) % adTexts.length;
        }, 5000); // Change ad text every 5 seconds
    }
    
    // Uncomment the line below to enable ad rotation
    // rotateAds();
    
    // View counter simulation
    function simulateViewCount() {
        const viewElements = document.querySelectorAll('.news-meta span:last-child');
        
        viewElements.forEach(element => {
            const currentViews = parseInt(element.textContent.replace(/\D/g, ''));
            const newViews = currentViews + Math.floor(Math.random() * 10);
            element.textContent = `<i class="far fa-eye"></i> ${newViews.toLocaleString()} views`;
        });
    }
    
    // Update view counts every 30 seconds (for demonstration)
    setInterval(simulateViewCount, 30000);
    
    // Search functionality
    function initSearch() {
        const searchForm = document.createElement('form');
        searchForm.className = 'search-form';
        searchForm.innerHTML = `
            <div class="search-container">
                <input type="text" placeholder="Search for news..." class="search-input">
                <button type="submit" class="search-btn"><i class="fas fa-search"></i></button>
            </div>
        `;
        
        const headerContent = document.querySelector('.header-content');
        headerContent.appendChild(searchForm);
        
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('.search-input').value;
            if (searchTerm.trim()) {
                alert(`Searching for: ${searchTerm}\n\nIn a real implementation, this would filter news articles.`);
                // In a real app, you would filter or fetch search results here
            }
        });
    }
    
    initSearch();
    
    // Newsletter subscription
    function initNewsletter() {
        const newsletterSection = document.createElement('section');
        newsletterSection.className = 'newsletter';
        newsletterSection.innerHTML = `
            <div class="container">
                <div class="newsletter-content">
                    <h3>Stay Updated with Udayapur Post</h3>
                    <p>Subscribe to our newsletter for the latest news delivered to your inbox.</p>
                    <form class="newsletter-form">
                        <input type="email" placeholder="Enter your email address" required>
                        <button type="submit" class="btn">Subscribe</button>
                    </form>
                </div>
            </div>
        `;
        
        // Insert before footer
        document.querySelector('footer').before(newsletterSection);
        
        // Add newsletter styles
        const newsletterStyles = `
            .newsletter {
                background: linear-gradient(135deg, var(--primary) 0%, #2c5282 100%);
                color: white;
                padding: 50px 0;
                text-align: center;
            }
            
            .newsletter-content h3 {
                font-size: 1.8rem;
                margin-bottom: 15px;
            }
            
            .newsletter-content p {
                max-width: 600px;
                margin: 0 auto 25px;
                font-size: 1.1rem;
            }
            
            .newsletter-form {
                display: flex;
                max-width: 500px;
                margin: 0 auto;
            }
            
            .newsletter-form input {
                flex: 1;
                padding: 12px 15px;
                border: none;
                border-radius: 4px 0 0 4px;
                font-size: 1rem;
            }
            
            .newsletter-form button {
                border-radius: 0 4px 4px 0;
                white-space: nowrap;
            }
            
            @media (max-width: 576px) {
                .newsletter-form {
                    flex-direction: column;
                }
                
                .newsletter-form input,
                .newsletter-form button {
                    width: 100%;
                    border-radius: 4px;
                    margin-bottom: 10px;
                }
            }
        `;
        
        // Add styles to document
        const styleSheet = document.createElement('style');
        styleSheet.textContent = newsletterStyles;
        document.head.appendChild(styleSheet);
        
        // Handle newsletter form submission
        document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            alert(`Thank you for subscribing with: ${email}\nYou will receive our latest news updates.`);
            this.reset();
        });
    }
    
    initNewsletter();
});

// Additional responsive styles for mobile menu
const mobileStyles = `
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        color: var(--primary);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 5px 10px;
    }
    
    .search-form {
        display: none;
        margin-top: 15px;
        width: 100%;
    }
    
    .search-container {
        display: flex;
        width: 100%;
    }
    
    .search-input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px 0 0 4px;
    }
    
    .search-btn {
        background: var(--secondary);
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 0 4px 4px 0;
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        .nav-links {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--primary);
            z-index: 1000;
        }
        
        .nav-links.mobile-active {
            display: flex;
        }
        
        .nav-links li {
            width: 100%;
        }
        
        .dropdown {
            position: static;
            display: none;
            width: 100%;
            box-shadow: none;
        }
        
        .nav-links li:hover .dropdown {
            display: none;
        }
        
        .nav-links li.active .dropdown {
            display: block;
        }
        
        .search-form {
            display: block;
        }
        
        .header-content {
            flex-wrap: wrap;
        }
        
        .ad-space {
            order: 3;
            margin-top: 15px;
        }
    }
    
    @media (max-width: 576px) {
        .top-bar-content {
            flex-direction: column;
            gap: 10px;
        }
        
        .news-tabs {
            flex-wrap: wrap;
        }
        
        .tab-btn {
            padding: 8px 15px;
        }
        
        .footer-content {
            grid-template-columns: 1fr;
        }
        
        .news-grid {
            grid-template-columns: 1fr;
        }
    }
    
    .load-more-btn {
        background: var(--primary);
    }
    
    .load-more-btn:hover {
        background: #2c5282;
    }
`;

// Add mobile styles to document
document.addEventListener('DOMContentLoaded', function() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = mobileStyles;
    document.head.appendChild(styleSheet);
});
