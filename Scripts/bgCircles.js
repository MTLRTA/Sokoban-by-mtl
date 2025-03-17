function createCircle() {
    const bgCircles = document.createElement('div');
    const radius = Math.random() * 180 + 150; 
    bgCircles.className = 'bgCircles';
    
    bgCircles.style.width = `${radius}px`;
    bgCircles.style.height = `${radius}px`;
    
    bgCircles.style.left = `${Math.random() * window.innerWidth}px`;
    
    document.body.appendChild(bgCircles);

    setTimeout(() => {
        document.body.removeChild(bgCircles);
    }, 5000); 
}

// круги создаются с интервалом 1с
setInterval(createCircle, 1000); 