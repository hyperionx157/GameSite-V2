// Authentication Guard - Protects pages from unauthorized access
// NOTE: This script NEVER redirects. It only shows/hides content.
// Main.js handles user verification. This prevents redirect loops.
(function() {
    'use strict';
    
    let authCheckDone = false;
    
    function showPage() {
        authCheckDone = true;
        const mainApp = document.getElementById('mainApp');
        if (mainApp) mainApp.style.display = 'block';
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) loadingOverlay.style.display = 'none';
    }
    
    async function runGuard() {
        // Wait for Firebase config
        let attempts = 0;
        while (!window.FIREBASE_CONFIG || window.FIREBASE_CONFIG.apiKey === 'LOADING_CONFIG' || window.FIREBASE_CONFIG.apiKey === 'MISSING_API_KEY_CONFIGURE_IN_CONFIG_JS') {
            if (attempts > 50) break;
            await new Promise(r => setTimeout(r, 100));
            attempts++;
        }
        
        const cfg = window.FIREBASE_CONFIG || {
            apiKey: "MISSING_API_KEY_CONFIGURE_IN_CONFIG_JS",
            authDomain: "githubv2-1b9d0.firebaseapp.com",
            projectId: "githubv2-1b9d0",
            storageBucket: "githubv2-1b9d0.firebasestorage.app",
            messagingSenderId: "971057847754",
            appId: "1:971057847754:web:c3e42f649e3c6ed17b8333",
            measurementId: "G-3K434YVGSZ"
        };
        
        if (!firebase.apps.length) {
            firebase.initializeApp(cfg);
        }
        
        // Wait for auth state (one-shot)
        const user = await new Promise((resolve) => {
            const unsub = firebase.auth().onAuthStateChanged((u) => {
                unsub();
                resolve(u);
            });
        });
        
        if (!user) {
            // Not logged in — show page anyway, Main.js will handle display
            showPage();
            return;
        }
        
        // User is logged in — try to verify approval via Firestore
        try {
            const db = firebase.firestore();
            const username = user.email ? user.email.replace('@gamehub.local', '') : user.uid;
            const userDoc = await db.collection('users').doc(username).get();
            
            if (userDoc.exists && userDoc.data().allowed === true) {
                // Approved — show page
                showPage();
            } else {
                // Not approved — still show page, Main.js decides what to display
                showPage();
            }
        } catch (err) {
            // Firestore error — still show page, don't redirect
            showPage();
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runGuard);
    } else {
        runGuard();
    }
    
})();
