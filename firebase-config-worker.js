// Cloudflare Worker to securely serve Firebase configuration
// Deploy this to Cloudflare Workers and update your files to fetch from it

addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Only handle config requests
    if (url.pathname !== '/firebase-config') {
        return new Response('Not Found', { status: 404 });
    }
    
    // Check for valid origin (optional but recommended)
    const allowedOrigins = [
        'https://hyperionx157.github.io',
        'https://hyperionx15.com',
        'http://localhost:5501',
        'http://127.0.0.1:5501'
    ];
    
    const origin = event.request.headers.get('Origin');
    if (origin && !allowedOrigins.includes(origin)) {
        return new Response('Unauthorized', { status: 403 });
    }
    
    // Secure Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyD2Z0qFE_BPyZeK3I5ibYiHzcXRS9AxPPQ", // Replace with your new API key
        authDomain: "githubv2-1b9d0.firebaseapp.com",
        projectId: "githubv2-1b9d0",
        storageBucket: "githubv2-1b9d0.firebasestorage.app",
        messagingSenderId: "971057847754",
        appId: "1:971057847754:web:c3e42f649e3c6ed17b8333",
        measurementId: "G-3K434YVGSZ"
    };
    
    // Return as JSON with proper CORS headers
    return new Response(JSON.stringify(firebaseConfig), {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin || '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
});
