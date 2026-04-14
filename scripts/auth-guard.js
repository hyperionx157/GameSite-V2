// Authentication Guard - Protects pages from unauthorized access
(function() {
    'use strict';
    
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyD4dSgLokC2lGg3FFtVfImg7IspQgUyQgc",
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
    
    const db = firebase.firestore();
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
                console.log('Auth Guard: User authenticated and approved');
                authCheckComplete = true;
                
                // Show the page content
                const mainApp = document.getElementById('mainApp');
                if (mainApp) {
                    mainApp.style.display = 'block';
                }
                
                // Hide loading overlay if it exists
                const loadingOverlay = document.getElementById('loadingOverlay');
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'none';
                }
                
            } catch (error) {
                console.error('Auth Guard: Error checking authentication:', error);
                redirectToLogin();
            }
        });
    }
    
    function redirectToLogin() {
        if (authCheckComplete) return; // Prevent multiple redirects
        authCheckComplete = true;
        
        console.log('Auth Guard: Redirecting to login page');
        window.location.href = '../auth/login.html';
    }
    
    // Start authentication check when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAuthentication);
    } else {
        checkAuthentication();
    }
    
    // Hide main content initially until auth check is complete
    const mainApp = document.getElementById('mainApp');
    if (mainApp) {
        mainApp.style.display = 'none';
    }
    
})();
