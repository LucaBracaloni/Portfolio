// Vercel Analytics Implementation
(function() {
    // Load Vercel Analytics script
    var script = document.createElement('script');
    script.src = 'https://va.vercel-scripts.com/v1/script.js';
    script.defer = true;
    document.head.appendChild(script);

    // Initialize analytics
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
})(); 