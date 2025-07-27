// Complete automatic redirect solution
function checkAndRedirect() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth >= 1024) {
        console.log('Desktop size detected, redirecting...');
        window.location.href = 'index.html';
    }
}

// Check on initial page load
window.addEventListener('load', checkAndRedirect);

// IMPORTANT: Check when viewport changes (tablet to desktop)
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(checkAndRedirect, 300);
});