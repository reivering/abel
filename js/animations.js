// Simple Math Visualizations & Canvas Animations

// Hero Canvas Animation - Floating Formulas and Waves
const initHeroCanvas = () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    let width, height;
    
    const setDimensions = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = document.querySelector('.hero').offsetHeight;
    };
    
    window.addEventListener('resize', setDimensions);
    setDimensions();

    let time = 0;
    
    // Floating symbols
    const symbols = ['∫', 'dx', 'dy', '∑', '∞', '∂', 'lim', 'ƒ(x)', 'Δ', 'π', 'θ'];
    const particles = [];
    
    for(let i = 0; i < 20; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            s: symbols[Math.floor(Math.random() * symbols.length)],
            vx: Math.random() * 0.5 - 0.25,
            vy: Math.random() * -0.5 - 0.2, // Move upwards slowly
            size: Math.random() * 20 + 15,
            opacity: Math.random() * 0.3 + 0.1
        });
    }

    const draw = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Draw Math Symbols
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.y < -50) p.y = height + 50;
            if (p.x > width + 50) p.x = -50;
            if (p.x < -50) p.x = width + 50;
            
            ctx.font = `${p.size}px Merriweather`;
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.fillText(p.s, p.x, p.y);
        });

        // Draw animated mathematical waves (sine and cosine overlapping)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)'; // Accent gold
        ctx.lineWidth = 2;
        
        for (let x = 0; x < width; x+=5) {
            const y = height/2 + Math.sin(x * 0.01 + time) * 100 * Math.sin(time * 0.5);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(80, 200, 120, 0.4)'; // Emerald green
        ctx.lineWidth = 2;
        
        for (let x = 0; x < width; x+=5) {
            const y = height/2 + Math.cos(x * 0.008 - time) * 120 * Math.cos(time * 0.3);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        time += 0.02;
        requestAnimationFrame(draw);
    };
    
    draw();
};

document.addEventListener('DOMContentLoaded', () => {
    initHeroCanvas();
});
