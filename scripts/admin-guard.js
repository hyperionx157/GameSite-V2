// Admin-Only Guard - Protects admin pages from unauthorized access
(function() {
    'use strict';
    
    // Wait for Firebase config to load
    async function initializeFirebaseConfig() {
        let attempts = 0;
        while (!window.FIREBASE_CONFIG || window.FIREBASE_CONFIG.apiKey === 'LOADING_CONFIG') {
            if (attempts > 50) {
                console.error('Admin Guard: Timeout waiting for Firebase config');
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
        
        // Enable debug mode for Firebase in development
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            firebase.firestore().settings({
                timestampsInSnapshots: true
            });
            console.log('Admin Guard: Firebase debug mode enabled');
        }
        
        return firebase.firestore();
    }
    
    let db;
    let authCheckComplete = false;
    
    // Check if user is admin (owner)
    function checkAdminAccess() {
        console.log('Admin Guard: Checking admin access...');
        
        firebase.auth().onAuthStateChanged(async (user) => {
            if (authCheckComplete) return; // Prevent multiple checks
            
            console.log('Admin Guard: Auth state changed, user:', user ? 'authenticated' : 'not authenticated');
            
            if (!user) {
                console.log('Admin Guard: No user found, redirecting to login');
                redirectToLogin();
                return;
            }
            
            try {
                // Debug: Log all user information
                console.log('Admin Guard: Full user object:', user);
                console.log('Admin Guard: User email:', user.email);
                console.log('Admin Guard: User UID:', user.uid);
                console.log('Admin Guard: User displayName:', user.displayName);
                
                // Check if user is the owner (lol8) or has admin privileges
                const username = user.email ? user.email.replace('@gamehub.local', '') : user.uid;
                console.log('Admin Guard: Checking admin access for username:', username);
                
                // Only allow access to "lol8" (the owner) - NO EXCEPTIONS
                if (username !== 'lol8') {
                    console.log('Admin Guard: User is not the owner, access denied');
                    console.log('Admin Guard: Expected: lol8, Got:', username);
                    showAccessDenied();
                    return;
                }
                
                // Multiple verification layers for maximum security
                const userDoc = await db.collection('users').doc(username).get();
                
                if (!userDoc.exists) {
                    console.log('Admin Guard: User document not found, access denied');
                    showAccessDenied();
                    return;
                }
                
                const userData = userDoc.data();
                console.log('Admin Guard: User data:', userData);
                console.log('Admin Guard: userData.allowed:', userData.allowed);
                console.log('Admin Guard: userData.isAdmin:', userData.isAdmin);
                console.log('Admin Guard: Expected email: lol8@gamehub.local, Actual email:', user.email);
                
                // Strict verification checks
                if (userData.allowed !== true) {
                    console.log('Admin Guard: User not approved, access denied');
                    console.log('Admin Guard: allowed value:', userData.allowed, 'type:', typeof userData.allowed);
                    showAccessDenied();
                    return;
                }
                
                // For the owner (lol8), isAdmin is optional - owner has full access regardless
                if (username === 'lol8' && userData.isAdmin !== true && userData.isAdmin !== undefined) {
                    console.log('Admin Guard: Owner account has isAdmin explicitly set to false, access denied');
                    console.log('Admin Guard: isAdmin value:', userData.isAdmin, 'type:', typeof userData.isAdmin);
                    showAccessDenied();
                    return;
                }
                
                // For non-owners, isAdmin must be true
                if (username !== 'lol8' && userData.isAdmin !== true) {
                    console.log('Admin Guard: Non-owner user is not admin, access denied');
                    console.log('Admin Guard: isAdmin value:', userData.isAdmin, 'type:', typeof userData.isAdmin);
                    showAccessDenied();
                    return;
                }
                
                // Verify email matches exactly
                if (user.email !== 'lol8@gamehub.local') {
                    console.log('Admin Guard: Email does not match owner email, access denied');
                    console.log('Admin Guard: Expected: lol8@gamehub.local, Got:', user.email);
                    showAccessDenied();
                    return;
                }
                
                // Verify UID if available
                if (userData.uid && userData.uid !== user.uid) {
                    console.log('Admin Guard: UID mismatch, access denied');
                    showAccessDenied();
                    return;
                }
                
                // Additional security: Check for suspicious activity
                const now = new Date();
                const lastLogin = userData.lastLogin ? userData.lastLogin.toDate() : new Date(0);
                const daysSinceLogin = (now - lastLogin) / (1000 * 60 * 60 * 24);
                
                if (daysSinceLogin > 365) {
                    console.log('Admin Guard: Suspicious activity detected - very old login, access denied');
                    showAccessDenied();
                    return;
                }
                
                // Update last login timestamp for security monitoring
                await db.collection('users').doc(username).update({
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
                    lastAccess: new Date().toISOString()
                });
                
                // User is the owner and passed all security checks
                console.log('Admin Guard: Owner access granted after security verification');
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
                
                // Log successful access for security monitoring
                console.log('Admin Guard: Security access logged for user:', username);
                
            } catch (error) {
                console.error('Admin Guard: Error checking admin access:', error);
                
                // Check if it's a Firebase connection error
                if (error.code === 'unavailable' || error.code === 'network-request-failed') {
                    console.log('Admin Guard: Firebase connection error detected');
                    document.body.innerHTML = `
                        <div style="
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            font-family: Arial, sans-serif;
                            background: linear-gradient(135deg, #ff6b6b 0%, #c92a2a 100%);
                            color: white;
                            text-align: center;
                            padding: 2rem;
                        ">
                            <div>
                                <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Connection Error</h1>
                                <p style="font-size: 1.2rem; margin-bottom: 2rem;">Unable to connect to the authentication server. Please check your internet connection and try again.</p>
                                <div style="
                                    background: rgba(0,0,0,0.3);
                                    padding: 1rem;
                                    border-radius: 8px;
                                    margin-bottom: 2rem;
                                    font-size: 0.9rem;
                                    font-family: monospace;
                                ">
                                    <div>Error: ${error.message}</div>
                                    <div>Code: ${error.code || 'UNKNOWN'}</div>
                                </div>
                                <button onclick="window.location.reload()" style="
                                    background: white;
                                    color: #ff6b6b;
                                    border: none;
                                    padding: 1rem 2rem;
                                    border-radius: 8px;
                                    font-size: 1rem;
                                    cursor: pointer;
                                    font-weight: 600;
                                    transition: all 0.2s;
                                    margin-right: 1rem;
                                ">Retry</button>
                                <button onclick="window.location.href='../pages/index.html'" style="
                                    background: rgba(255,255,255,0.2);
                                    color: white;
                                    border: 1px solid white;
                                    padding: 1rem 2rem;
                                    border-radius: 8px;
                                    font-size: 1rem;
                                    cursor: pointer;
                                    font-weight: 600;
                                    transition: all 0.2s;
                                ">Go Back</button>
                            </div>
                        </div>
                    `;
                    return;
                }
                
                showAccessDenied();
            }
        });
    }
    
    function redirectToLogin() {
        if (authCheckComplete) return; // Prevent multiple redirects
        authCheckComplete = true;
        
        console.log('Admin Guard: Redirecting to login page');
        window.location.href = '../auth/login.html';
    }
    
    function showAccessDenied() {
        if (authCheckComplete) return; // Prevent multiple redirects
        authCheckComplete = true;
        
        console.log('Admin Guard: Showing access denied');
        
        // Log security breach attempt
        const breachData = {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            ip: 'client-side', // IP would be logged server-side in production
            url: window.location.href,
            referrer: document.referrer
        };
        
        // Store breach attempt in localStorage for monitoring
        const breaches = JSON.parse(localStorage.getItem('securityBreaches') || '[]');
        breaches.push(breachData);
        localStorage.setItem('securityBreaches', JSON.stringify(breaches.slice(-10))); // Keep last 10
        
        // Hide all content with intimidating message
        document.body.innerHTML = `
            <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #dc3545 0%, #721c24 100%);
                color: white;
                text-align: center;
                padding: 2rem;
            ">
                <div>
                    <h1 style="font-size: 3rem; margin-bottom: 1rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">ACCESS DENIED</h1>
                    <p style="font-size: 1.3rem; margin-bottom: 1rem; font-weight: bold;">UNAUTHORIZED ACCESS ATTEMPT DETECTED</p>
                    <p style="font-size: 1rem; margin-bottom: 2rem; opacity: 0.9;">This area is restricted to the system administrator only. All access attempts are logged and monitored.</p>
                    <div style="
                        background: rgba(0,0,0,0.3);
                        padding: 1rem;
                        border-radius: 8px;
                        margin-bottom: 2rem;
                        font-size: 0.9rem;
                        font-family: monospace;
                    ">
                        <div>Incident ID: ${Date.now()}</div>
                        <div>Timestamp: ${new Date().toISOString()}</div>
                        <div>User Agent: ${navigator.userAgent.substring(0, 50)}...</div>
                    </div>
                    <button onclick="window.location.href='../pages/index.html'" style="
                        background: white;
                        color: #dc3545;
                        border: none;
                        padding: 1rem 2rem;
                        border-radius: 8px;
                        font-size: 1rem;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.2s;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                    " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        Leave This Area
                    </button>
                </div>
            </div>
        `;
        
        // Clear any remaining content
        document.title = 'Access Denied - Security Breach Logged';
    }
    
    // Start admin access check when page loads
    async function startAdminCheck() {
        try {
            db = await initializeFirebaseConfig();
            checkAdminAccess();
        } catch (error) {
            console.error('Admin Guard: Firebase initialization error:', error);
            showAccessDenied();
        }
    }
    
    // Hide main content initially until admin check is complete
    const mainApp = document.getElementById('mainApp');
    if (mainApp) {
        mainApp.style.display = 'none';
    }
    
    // Start admin access check when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startAdminCheck);
    } else {
        startAdminCheck();
    }
    
})();
