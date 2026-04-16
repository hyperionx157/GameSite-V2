// Authentication Guard - Protects pages from unauthorized access
(function() {
    'use strict';
    
    // Detect redirect loops
    const redirectKey = 'authGuardRedirectCount';
    const redirectTime = 'authGuardRedirectTime';
    const now = Date.now();
    const lastRedirectTime = parseInt(sessionStorage.getItem(redirectTime) || '0');
    let redirectCount = parseInt(sessionStorage.getItem(redirectKey) || '0');
    // Reset count if more than 10 seconds since last redirect
    if (now - lastRedirectTime > 10000) {
        redirectCount = 0;
        sessionStorage.setItem(redirectKey, '0');
    }
    
    // Wait for Firebase config to load
    async function initializeFirebaseConfig() {
        let attempts = 0;
        while (!window.FIREBASE_CONFIG || window.FIREBASE_CONFIG.apiKey === 'LOADING_CONFIG') {
            if (attempts > 50) {
                console.error('Auth Guard: Timeout waiting for Firebase config');
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        const firebaseConfig = window.FIREBASE_CONFIG || {
            apiKey: "MISSING_API_KEY_CONFIGURE_IN_CONFIG_JS",
            authDomain: "githubv2-1b9d0.firebaseapp.com",
            projectId: "githubv2-1b9d0",
            storageBucket: "githubv2-1b9d0.firebasestorage.app",
            messagingSenderId: "971057847754",
            appId: "1:971057847754:web:c3e42f649e3c6ed17b8333",
            measurementId: "G-3K434YVGSZ"
        };
        
        // Initialize Firebase if not already initialized
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        
        return firebase.firestore();
    }
    
    let db;
    let authCheckComplete = false;
    
    // Check if user is authenticated and approved
    function checkAuthentication() {
        console.log('Auth Guard: Checking authentication...');
        
        firebase.auth().onAuthStateChanged(async (user) => {
            if (authCheckComplete) return; // Prevent multiple checks
            
            console.log('Auth Guard: Auth state changed, user:', user ? 'authenticated' : 'not authenticated');
            
            if (!user) {
                console.log('Auth Guard: No user found, redirecting to login');
                redirectToLogin();
                return;
            }
            
            try {
                // Check if user is approved in Firestore
                const username = user.email ? user.email.replace('@gamehub.local', '') : user.uid;
                console.log('Auth Guard: Checking approval for username:', username);
                
                const userDoc = await db.collection('users').doc(username).get();
                
                if (!userDoc.exists) {
                    console.log('Auth Guard: User document not found, redirecting to login');
                    redirectToLogin();
                    return;
                }
                
                const userData = userDoc.data();
                console.log('Auth Guard: User data:', userData);
                
                if (userData.allowed !== true) {
                    console.log('Auth Guard: User not approved, redirecting to login');
                    redirectToLogin();
                    return;
                }
                
                // User is authenticated and approved
                console.log('✅ Auth Guard: User authenticated and approved, showing page');
                authCheckComplete = true;
                
                // Show the page content
                const mainApp = document.getElementById('mainApp');
                if (mainApp) {
                    mainApp.style.display = 'block';
                    console.log('✅ Auth Guard: Main app shown');
                } else {
                    console.warn('⚠️ Auth Guard: mainApp element not found');
                }
                
                // Hide loading overlay if it exists
                const loadingOverlay = document.getElementById('loadingOverlay');
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'none';
                    console.log('✅ Auth Guard: Loading overlay hidden');
                }
                
            } catch (error) {
                console.error('Auth Guard: Error checking authentication:', error);
                // If user IS authenticated but Firestore check failed,
                // show the page anyway instead of redirecting to login (prevents loop)
                if (user) {
                    console.warn('Auth Guard: Firestore check failed but user is authenticated, showing page');
                    authCheckComplete = true;
                    const mainApp = document.getElementById('mainApp');
                    if (mainApp) mainApp.style.display = 'block';
                    const loadingOverlay = document.getElementById('loadingOverlay');
                    if (loadingOverlay) loadingOverlay.style.display = 'none';
                } else {
                    redirectToLogin();
                }
            }
        });
    }
    
    function redirectToLogin() {
        if (authCheckComplete) return; // Prevent multiple redirects
        authCheckComplete = true;
        
        // Prevent redirect loops
        redirectCount++;
        sessionStorage.setItem(redirectKey, String(redirectCount));
        sessionStorage.setItem(redirectTime, String(Date.now()));
        
        if (redirectCount > 3) {
            console.error('Auth Guard: Redirect loop detected, stopping. Count:', redirectCount);
            // Show the page instead of looping
            const mainApp = document.getElementById('mainApp');
            if (mainApp) mainApp.style.display = 'block';
            sessionStorage.setItem(redirectKey, '0');
            return;
        }
        
        console.log('Auth Guard: Redirecting to login page from:', window.location.href);
        window.location.href = '/GameSite-V2/auth/login.html';
    }
    
    // Start authentication check when page loads
    async function startAuthCheck() {
        try {
            db = await initializeFirebaseConfig();
            checkAuthentication();
        } catch (error) {
            console.error('Auth Guard: Firebase initialization error:', error);
            redirectToLogin();
        }
    }
    
    // Hide main content initially until auth check is complete
    const mainApp = document.getElementById('mainApp');
    if (mainApp) {
        mainApp.style.display = 'none';
    }
    
    // Start authentication check when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startAuthCheck);
    } else {
        startAuthCheck();
    }
    
})();
