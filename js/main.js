/* 1. The Module Loader Function */
// This function fetches an HTML file and injects it into a placeholder
const loadHTML = (selector, url) => {
    const element = document.querySelector(selector);
    if (element) {
        // Return the fetch promise
        return fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(data => {
                element.innerHTML = data;
            })
            .catch(error => console.error('Error loading HTML:', url, error));
    }
    // Return a resolved promise if element not found
    return Promise.resolve();
};

/* 2. The Script Loader Function */
// We need this to load the TypeIt.js library
const loadScript = (url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;  // Resolve the promise when loaded
        script.onerror = reject; // Reject if it fails
        document.head.appendChild(script);
    });
};


/* 3. Global DOMContentLoaded Event */
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Load Reusable Modules ---
    const navbarPromise = loadHTML('#navbar-placeholder', '_includes/navbar.html');
    loadHTML('#footer-placeholder', '_includes/footer.html');

    // --- Global Cursor Logic ---
    const cursorDiv = document.createElement('div');
    cursorDiv.id = 'cursor';
    document.body.appendChild(cursorDiv);

    document.addEventListener("mousemove", (e) => {
        cursorDiv.style.left = e.clientX + "px";
        cursorDiv.style.top = e.clientY + "px";
    });

    // --- Global TypeIt Logic ---
    // We are now loading the TypeIt library
    Promise.all([
        navbarPromise, 
        loadScript('https://unpkg.com/typeit@8.7.1/dist/index.umd.js')
    ])
    .then(() => {
        // Now we are SAFE to run TypeIt code
        const logoElement = document.querySelector('.nav-logo');
        const heroElement = document.querySelector("#my-typewriter-h1");
        
        // --- 1. Initialize Nav-Logo Typewriter ---
        if (logoElement && typeof TypeIt !== 'undefined') {
            new TypeIt(logoElement, {
                strings: [
                    "Archuthan Mohanathasan.",
                    "A Computer Science Undergraduate.",
                    "A Quantitative Analyst.",
                    "Driven by Market Challenges.",
                    "A Data-Driven Thinker.",
                    "Theory. Models. Invest."
                ],
                // Fixed TOTAL DURATION for a smooth, even rhythm
                speed: 100,          // 1.0 second total typing time
                deleteSpeed: 75,     // 0.75 seconds total deleting time
                

                breakLines: false,
                waitUntilVisible: true,
                loop: true,
                cursorChar: "|",
                // We remove the blink-on-pause, as there are no pauses
            }).go();
        }

        // --- 2. Initialize Hero (H1) Typewriter ---
        // TypeIt will correctly handle the <span> tags
        if (heroElement && typeof TypeIt !== 'undefined') {
            new TypeIt(heroElement, {
                strings: [
                    'Applying <span class="accent">Computational Rigor</span> to <span class="accent">Quantitative Finance</span>.',
                    'Bridging <span class="accent">Theoretical Computer Science</span> with <span class="accent">Market Mechanics</span>.',
                    'Developing <span class="accent">Stochastic Models</span> for <span class="accent">Financial Time-Series</span>.'
                ],
                // Fixed TOTAL DURATION for a smooth, even rhythm
                speed: 120,          // 1.2s total typing time
                deleteSpeed: 75,     // 0.75s total deleting time
                
                
                
                breakLines: false,
                waitUntilVisible: true,
                loop: true,
                cursorChar: "|",
            }).go();
        }
    })
    .catch(error => console.error("Error loading TypeIt or navbar:", error));
});