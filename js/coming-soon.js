// Coming Soon Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Matrix Animation
    function initMatrixAnimation() {
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Matrix characters
        const matrixChars = 'QAAUTOMAƬIONŤESTINGCOMINGSOON0123456789'.split('');
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = [];
        
        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * canvas.height / fontSize;
        }
        
        function drawMatrix() {
            // Fade effect
            ctx.fillStyle = 'rgba(0, 5, 16, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Matrix text
            ctx.fillStyle = '#00d4ff';
            ctx.font = fontSize + 'px Orbitron, monospace';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00d4ff';
            
            for (let i = 0; i < drops.length; i++) {
                const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                
                ctx.fillText(char, x, y);
                
                // Reset drop when it reaches bottom
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        // Start animation
        setInterval(drawMatrix, 50);
    }
    
    // Initialize matrix animation
    initMatrixAnimation();
    
    // Add floating animation to features on scroll
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.animationDelay = `${0.8 + (index * 0.2)}s`;
        feature.classList.add('fadeInUp');
    });
    
    // Add click effect to social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 212, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .fadeInUp {
        animation: fadeInUp 0.8s ease-out both;
    }
`;
document.head.appendChild(style);
