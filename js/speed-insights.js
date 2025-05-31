// Vercel Speed Insights Implementation
(function() {
    // Load Vercel Speed Insights script
    var script = document.createElement('script');
    script.src = 'https://vitals.vercel-insights.com/v1/vitals.js';
    script.defer = true;
    document.head.appendChild(script);

    // Initialize Speed Insights
    window.vitals = window.vitals || function () { (window.vitalsq = window.vitalsq || []).push(arguments); };
    
    // Track Web Vitals with the correct configuration
    vitals('web-vitals', {
        path: window.location.pathname,
        analyticsId: window.location.hostname,
        debug: true // Temporarily enable debug mode
    });

    // Log initialization
    console.log('Speed Insights initialized for:', window.location.hostname);
})(); 