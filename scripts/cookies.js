// Cookie consent management
let cookieConsent = {
    analytics: false,
    consentGiven: false
};

// Check for existing consent
function checkExistingConsent() {
    try {
        const consent = localStorage.getItem('cookieConsent');
        const bannerElement = document.getElementById('cookieConsentBanner');
        const backdropElement = document.getElementById('cookieConsentBackdrop');

        if (consent) {
            cookieConsent = JSON.parse(consent);
            if (cookieConsent.consentGiven) {
                // User has already given consent, keep banner and backdrop hidden
                if (bannerElement) {
                    bannerElement.classList.remove('show');
                }
                if (backdropElement) {
                    backdropElement.classList.remove('show');
                }
                if (cookieConsent.analytics) {
                    initializeGoogleAnalytics();
                }
                console.log('Existing consent found, banner hidden');
                return; // Don't show banner
            }
        }
        // No consent found, show the banner and backdrop
        if (bannerElement) {
            bannerElement.classList.add('show');
            console.log('No consent found, showing banner');
        }
        if (backdropElement) {
            backdropElement.classList.add('show');
            console.log('Showing backdrop');
        }
    } catch (error) {
        console.error('Error checking consent:', error);
        // On error, show the banner and backdrop to be safe
        const bannerElement = document.getElementById('cookieConsentBanner');
        const backdropElement = document.getElementById('cookieConsentBackdrop');
        if (bannerElement) {
            bannerElement.classList.add('show');
        }
        if (backdropElement) {
            backdropElement.classList.add('show');
        }
    }
}

// Initialize Google Analytics only with consent
function initializeGoogleAnalytics() {
    if (typeof GA_MEASUREMENT_ID !== 'undefined' && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.trim() !== '') {
        // Load Google Analytics script dynamically
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(gaScript);

        // Initialize Google Analytics
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
        });

        console.log('Google Analytics initialized with consent');
    }
}

// Save cookie preferences
function saveCookieConsent(analytics = false) {
    cookieConsent = {
        analytics: analytics,
        consentGiven: true,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(cookieConsent));

    if (analytics) {
        initializeGoogleAnalytics();
    }

    const bannerElement = document.getElementById('cookieConsentBanner');
    const backdropElement = document.getElementById('cookieConsentBackdrop');
    
    if (bannerElement) {
        bannerElement.classList.remove('show');
    }
    if (backdropElement) {
        backdropElement.classList.remove('show');
    }
}

// Cookie consent functions
document.addEventListener('DOMContentLoaded', function() {
    // Debug: Let's see what's in localStorage
    console.log('Checking localStorage for cookieConsent:', localStorage.getItem('cookieConsent'));
    checkExistingConsent();

    // Cookie consent event listeners
    document.getElementById('acceptAllCookies').addEventListener('click', function() {
        saveCookieConsent(true);
    });

    document.getElementById('acceptNecessaryCookies').addEventListener('click', function() {
        saveCookieConsent(false);
    });

    document.getElementById('manageCookies').addEventListener('click', function() {
        openCookieSettings();
    });

    document.getElementById('saveCookiePreferences').addEventListener('click', function() {
        const analyticsEnabled = document.getElementById('analyticsCookiesToggle').checked;
        saveCookieConsent(analyticsEnabled);
        closeCookieSettings();
    });

    // Close cookie settings with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCookieSettings();
        }
    });
});

function openCookieSettings() {
    const modal = document.getElementById('cookieSettingsModal');
    const toggle = document.getElementById('analyticsCookiesToggle');
    
    // Set current preference
    toggle.checked = cookieConsent.analytics;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCookieSettings() {
    const modal = document.getElementById('cookieSettingsModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}