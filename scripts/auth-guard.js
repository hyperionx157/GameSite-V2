// Authentication Guard - Protects pages from unauthorized access
// Redirects unauthenticated users to login with loop protection.
(function() {
    'use strict';
    
    let authCheckDone = false;
    
    function showPage() {
        authCheckDone = true;
        // Clear redirect counter on successful page show
        sessionStorage.removeItem('authGuardRedirects');
        const mainApp = document.getElementById('mainApp');
        if (mainApp) mainApp.style.display = 'block';
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) loadingOverlay.style.display = 'none';
    }
    
    function redirectToLogin() {
        if (authCheckDone) return;
        authCheckDone = true;
        
        // Loop protection: if we've redirected more than 3 times in this session, stop
        var count = parseInt(sessionStorage.getItem('authGuardRedirects') || '0', 10);
        if (count >= 3) {
            console.warn('[AuthGuard] Redirect loop detected, stopping. Clear session storage to retry.');
            return;
        }
        sessionStorage.setItem('authGuardRedirects', String(count + 1));
        
        console.log('[AuthGuard] No authenticated user, redirecting to login');
        window.location.href = '../auth/login.html';
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
            // Not logged in — redirect to login
            redirectToLogin();
            return;
        }
        
        // User is logged in — try to verify approval via Firestore
        try {
            const db = firebase.firestore();
            const username = user.email ? user.email.replace('@gamehub.local', '') : user.uid;
            const userDoc = await db.collection('users').doc(username).get();
            
            if (userDoc.exists && userDoc.data().allowed === true) {
                showPage();
            } else {
                // Not approved — still show page, Main.js decides what to display
                showPage();
            }
        } catch (err) {
            // Firestore error — still show page if user is authenticated (don't redirect)
            console.warn('[AuthGuard] Firestore error, showing page for authenticated user:', err.message);
            showPage();
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runGuard);
    } else {
        runGuard();
    }
    
})();
