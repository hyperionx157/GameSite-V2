// Firebase Configuration - Fetches from Cloudflare Worker
// This file is safe to commit as it doesn't contain API keys

// Initialize with placeholder to prevent errors
window.FIREBASE_CONFIG = {
    apiKey: "LOADING_CONFIG",
    authDomain: "githubv2-1b9d0.firebaseapp.com",
    projectId: "githubv2-1b9d0",
    storageBucket: "githubv2-1b9d0.firebasestorage.app",
    messagingSenderId: "971057847754",
    appId: "1:971057847754:web:c3e42f649e3c6ed17b8333",
    measurementId: "G-3K434YVGSZ"
};

async function loadFirebaseConfig() {
    try {
        // Try to fetch from Cloudflare Worker
        const response = await fetch('https://firebase-config-worker.mepro1212e.workers.dev/firebase-config');
        if (response.ok) {
            const config = await response.json();
            window.FIREBASE_CONFIG = config;
            console.log('✅ Firebase config loaded from Cloudflare Worker');
            return true;
        }
    } catch (error) {
        console.warn('Failed to load from Cloudflare Worker:', error);
    }
    
    // Fallback for local development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.FIREBASE_CONFIG = {
            apiKey: "YOUR_NEW_API_KEY_HERE", // Replace for local dev only
            authDomain: "githubv2-1b9d0.firebaseapp.com",
            projectId: "githubv2-1b9d0",
            storageBucket: "githubv2-1b9d0.firebasestorage.app",
            messagingSenderId: "971057847754",
            appId: "1:971057847754:web:c3e42f649e3c6ed17b8333",
            measurementId: "G-3K434YVGSZ"
        };
        console.log('✅ Firebase config loaded from local fallback');
        return true;
    } else {
        // Show error for production
        console.error('❌ Unable to load Firebase configuration');
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif; background: #dc3545; color: white; text-align: center; padding: 2rem;">
                <div>
                    <h1>Configuration Error</h1>
                    <p>Unable to load Firebase configuration. Please check Cloudflare Worker deployment.</p>
                </div>
            </div>
        `;
        return false;
    }
}

// Load configuration and wait for it
loadFirebaseConfig();
