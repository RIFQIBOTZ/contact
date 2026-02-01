/* ================================================
   RIFQII STORE - JAVASCRIPT FUNCTIONALITY
   Features: Config Loader, WhatsApp Integration, 
   Form Validation, Animations
   ================================================ */

// ==================== GLOBAL VARIABLES ====================
let siteConfig = null;

// ==================== DOM READY ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Rifqii Store AI Contact Hub Initialized');
    
    // Load configuration
    loadConfig();
    
    // Initialize cursor glow effect
    initCursorGlow();
    
    // Initialize animations
    initAnimations();
});

// ==================== CONFIG LOADER ====================
async function loadConfig() {
    try {
        console.log('📡 Loading configuration...');
        
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        siteConfig = await response.json();
        console.log('✅ Configuration loaded successfully:', siteConfig);
        
        // Populate site information
        populateSiteInfo();
        
    } catch (error) {
        console.error('❌ Error loading config:', error);
        showErrorMessage('Gagal memuat konfigurasi. Menggunakan data default.');
        
        // Fallback to default config
        useDefaultConfig();
    }
}

// ==================== USE DEFAULT CONFIG ====================
function useDefaultConfig() {
    siteConfig = {
        site: {
            title: "Rifqii Store",
            subtitle: "Hubungi Kami Sekarang!",
            tagline: "AI-Powered Digital Solutions",
            copyright: "© 2025 Rifqii Store. Siap melayani Anda!"
        },
        groups: [
            {
                id: "contact_admin",
                title: "Contact Admin",
                items: [
                    {
                        id: "whatsapp",
                        type: "whatsapp",
                        number: "6289512839279",
                        url: "https://wa.me/6289512839279",
                        title: "WhatsApp",
                        description: "Whatsapp Real Rifqii Store",
                        enabled: true
                    },
                    {
                        id: "telegram",
                        type: "telegram",
                        url: "https://t.me/rifqibotz",
                        title: "Telegram",
                        description: "Telegram Real Rifqii Store",
                        enabled: true
                    },
                    {
                        id: "email",
                        type: "email",
                        url: "mailto:rifqiistore87@gmail.com",
                        title: "Email",
                        description: "rifqiistore87@gmail.com",
                        enabled: true
                    }
                ]
            },
            {
                id: "group_admin",
                title: "Group Admin",
                items: [
                    {
                        id: "whatsapp_group",
                        type: "whatsapp_group",
                        url: "https://chat.whatsapp.com/JC5LpgMTNS70yM3CuCWq1O",
                        title: "Grup WhatsApp",
                        description: "Bergabung dengan komunitas pelanggan kami",
                        enabled: true
                    },
                    {
                        id: "telegram_group",
                        type: "telegram_group",
                        url: "https://t.me/rifqibotz87",
                        title: "Grup Telegram",
                        description: "Bergabung dengan komunitas pelanggan kami",
                        enabled: true
                    }
                ]
            }
        ]
    };
    
    populateSiteInfo();
    generateContactSections();
}

// ==================== POPULATE SITE INFO ====================
function populateSiteInfo() {
    if (!siteConfig) return;
    
    // Update site title
    const titleElement = document.getElementById('siteTitle');
    if (titleElement) {
        titleElement.textContent = siteConfig.site.title;
    }
    
    // Update tagline
    const taglineElement = document.getElementById('siteTagline');
    if (taglineElement) {
        taglineElement.textContent = siteConfig.site.tagline;
    }
    
    // Update subtitle
    const subtitleElement = document.getElementById('siteSubtitle');
    if (subtitleElement) {
        const textContent = subtitleElement.querySelector('.text-glitch');
        if (textContent) {
            textContent.textContent = siteConfig.site.subtitle;
            textContent.setAttribute('data-text', siteConfig.site.subtitle);
        }
    }
    
    // Update copyright
    const copyrightElement = document.getElementById('siteCopyright');
    if (copyrightElement) {
        copyrightElement.textContent = siteConfig.site.copyright;
    }
    
    // Update page title
    document.title = `${siteConfig.site.title} - AI Contact Hub`;
    
    // Generate contact sections after populating site info
    generateContactSections();
}

// ==================== GENERATE CONTACT SECTIONS ====================
function generateContactSections() {
    if (!siteConfig || !siteConfig.groups) return;
    
    const contactSections = document.getElementById('contactSections');
    if (!contactSections) return;
    
    // Clear loading state
    contactSections.innerHTML = '';
    
    // Generate each group
    siteConfig.groups.forEach((group, groupIndex) => {
        const groupSection = createContactGroup(group, groupIndex);
        contactSections.appendChild(groupSection);
    });
    
    console.log(`✅ Generated ${siteConfig.groups.length} contact groups`);
}

// ==================== CREATE CONTACT GROUP ====================
function createContactGroup(group, groupIndex) {
    const section = document.createElement('section');
    section.className = 'contact-group';
    section.setAttribute('data-aos', 'fade-up');
    section.style.animationDelay = `${groupIndex * 0.2}s`;
    
    // Group header
    const header = document.createElement('div');
    header.className = 'group-header';
    header.innerHTML = `<h3>${group.title}</h3>`;
    section.appendChild(header);
    
    // Contact grid
    const grid = document.createElement('div');
    grid.className = 'contact-grid';
    
    // Add special class for 3 items (2 top, 1 centered bottom)
    const enabledItems = group.items.filter(item => item.enabled);
    if (enabledItems.length === 3) {
        grid.classList.add('grid-3');
    }
    
    // Generate cards
    enabledItems.forEach((item, index) => {
        const card = createContactCard(item, index);
        grid.appendChild(card);
    });
    
    section.appendChild(grid);
    
    return section;
}

// ==================== CREATE CONTACT CARD ====================
function createContactCard(item, index) {
    const card = document.createElement('div');
    card.className = `contact-card ${getCardClass(item.type)}`;
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Get icon
    const icon = getContactIcon(item.type);
    
    card.innerHTML = `
        <div class="contact-icon">
            <i class="${icon}"></i>
        </div>
        <div class="contact-title">${item.title}</div>
        <div class="contact-desc">${item.description}</div>
    `;
    
    // Add click event
    card.addEventListener('click', () => openContact(item.type, item));
    
    // Add hover effects
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
    
    return card;
}

// ==================== GET CARD CLASS ====================
function getCardClass(type) {
    const classMap = {
        'whatsapp': 'whatsapp',
        'telegram': 'telegram',
        'email': 'email',
        'whatsapp_group': 'group',
        'telegram_group': 'group'
    };
    
    return classMap[type] || 'default';
}

// ==================== GET CONTACT ICON ====================
function getContactIcon(type) {
    const iconMap = {
        'whatsapp': 'fab fa-whatsapp',
        'telegram': 'fab fa-telegram-plane',
        'email': 'fas fa-envelope',
        'whatsapp_group': 'fas fa-users',
        'telegram_group': 'fas fa-users'
    };
    
    return iconMap[type] || 'fas fa-question';
}

// ==================== OPEN CONTACT ====================
function openContact(type, data) {
    console.log(`📱 Opening contact: ${type}`);
    
    // Show notification
    showNotification(type);
    
    // Open link after animation
    setTimeout(() => {
        window.open(data.url, '_blank');
    }, 800);
}

// ==================== SHOW NOTIFICATION ====================
function showNotification(type) {
    const notificationMap = {
        'whatsapp': 'whatsappNotif',
        'telegram': 'telegramNotif',
        'email': 'emailNotif',
        'whatsapp_group': 'whatsappGroupNotif',
        'telegram_group': 'telegramGroupNotif'
    };
    
    const notificationId = notificationMap[type];
    if (!notificationId) return;
    
    const notification = document.getElementById(notificationId);
    if (!notification) return;
    
    // Show notification
    notification.classList.add('show');
    
    // Hide after 2 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// ==================== SHOW ERROR MESSAGE ====================
function showErrorMessage(message) {
    console.warn('⚠️', message);
    
    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'notification error-notif show';
    notification.style.borderColor = '#ff4444';
    notification.innerHTML = `
        <div class="notification-icon" style="background: #ff4444;">
            <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="notification-text">${message}</div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== CURSOR GLOW EFFECT ====================
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.opacity = '1';
    });
    
    // Hide cursor glow when mouse leaves
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
    
    // Smooth cursor following animation
    function animateCursor() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// ==================== ANIMATIONS ====================
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// ==================== ADDITIONAL FEATURES ====================

// Copy to clipboard function
function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
        console.log(`✅ ${type} copied to clipboard`);
        showSuccessMessage(`${type} berhasil disalin!`);
    }).catch(err => {
        console.error('❌ Failed to copy:', err);
        showErrorMessage('Gagal menyalin ke clipboard');
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Check if device is mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Log device info
console.log('📱 Device Info:', {
    isMobile: isMobile(),
    userAgent: navigator.userAgent,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight
});

// ==================== PERFORMANCE MONITORING ====================
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${loadTime.toFixed(2)}ms`);
});

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (e) => {
    console.error('💥 Global error:', e.error);
});

// ==================== EXPORT FUNCTIONS (if needed) ====================
// Expose some functions globally for debugging
window.rifqiiStore = {
    loadConfig,
    openContact,
    copyToClipboard,
    scrollToSection,
    config: () => siteConfig
};

console.log('✅ All systems initialized successfully!');
console.log('🎯 Access debug functions via window.rifqiiStore');
