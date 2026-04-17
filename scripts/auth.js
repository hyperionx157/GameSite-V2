// ═══════════════════════════════════════════════════════════════════
// DEV PORTAL — auth.js
// Authentication and account management
// Firebase is initialized in login.html
// ═══════════════════════════════════════════════════════════════════

// ── Globals ─────────────────────────────────────────────────────────
var currentUserData = null;
var authStateProcessed = false; // Flag to prevent infinite auth loops

// ── Helper Functions ─────────────────────────────────────────────────────────
function showEl(id, display) {
    var el = document.getElementById(id);
    if (el) el.style.display = display || 'block';
}

function hideEl(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
}

function getInitials(name) {
    if (!name) return '?';
    return name.trim().split(/\s+/).map(function(w){ return w[0]; })
        .join('').toUpperCase().slice(0, 2);
}

function escHtml(str) {
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

// ── Auth State Management ─────────────────────────────────────────────────────
function initAuth() {
    firebase.auth().onAuthStateChanged(async function(user){
        // Prevent infinite loops by checking if we've already processed this state
        if (authStateProcessed && user) {
            console.log('⏭️ Auth state already processed, skipping');
            return;
        }

        if (user) {
            const username = user.email ? user.email.replace('@gamehub.local', '') : user.uid;
            console.log('🔐 Auth state changed - User:', username);

            if (sessionStorage.getItem('signupInProgress') === 'true') {
                console.log('⏳ Signup in progress, skipping approval check');
                return;
            }

            setTimeout(async () => {
                try {
                    // Retry up to 3 times with delays to handle Firestore consistency across devices
                    let doc = null;
                    for (let i = 0; i < 3; i++) {
                        doc = await window.db.collection('users').doc(username).get();
                        console.log('📄 User doc check [' + (i+1) + '/3] for "' + username + '":', 
                            doc.exists ? ('Exists, allowed=' + doc.data().allowed) : 'Not found');
                        if (doc.exists && doc.data().allowed === true) break;
                        if (i < 2) await new Promise(r => setTimeout(r, 1500));
                    }

                    if (doc.exists && doc.data().allowed === true) {
                        console.log('✅ User is approved, granting access');
                        authStateProcessed = true; // Mark as processed

                        currentUserData = {
                            uid: user.uid,
                            email: user.email,
                            displayName: user.displayName || username,
                            username: username
                        };
                        // Use SecureStorage if available
                        if (window.SecureStorage) {
                            window.SecureStorage.createSessionFromUser(user);
                        }
                        // Also set localStorage as fallback for Main.js compatibility
                        localStorage.setItem('currentUser', JSON.stringify(currentUserData));
                        window.db.collection('users').doc(username).update({
                            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                        }).catch(() => {});
                        
                        // Redirect to main application (only if on login page)
                        if (window.location.pathname.includes('/auth/')) {
                            // Clear any redirect loop counters
                            sessionStorage.removeItem('authGuardRedirectCount');
                            sessionStorage.removeItem('authGuardRedirectTime');
                            window.location.href = '../pages/index.html';
                        }

                    } else {
                        console.log('⚠️ User not approved - pending status');
                        
                        // Check if pending request exists
                        const pendingDoc = await window.db.collection('pendingRequests').doc(username).get();
                        
                        if (pendingDoc.exists) {
                            console.log('⏳ User is pending approval - KEEPING USER LOGGED IN');
                            sessionStorage.setItem('userApprovalStatus', 'pending');
                            
                            // Show pending message (only once)
                            if (!sessionStorage.getItem('pendingMessageShown')) {
                                alert('Your account is pending approval. You will be notified here when approved.');
                                sessionStorage.setItem('pendingMessageShown', 'true');
                            }
                            
                            // Show pending status message
                            showEl('loginHub', 'flex');
                            
                            // Add pending status message to login form
                            const pendingMessage = document.getElementById('pendingStatusMessage');
                            if (!pendingMessage) {
                                const msgDiv = document.createElement('div');
                                msgDiv.id = 'pendingStatusMessage';
                                msgDiv.style.cssText = `
                                    background: rgba(155,89,182,0.2);
                                    border: 1px solid rgba(155,89,182,0.4);
                                    border-radius: 8px;
                                    padding: 12px;
                                    margin-top: 15px;
                                    text-align: center;
                                    color: #9b59b6;
                                `;
                                msgDiv.innerHTML = `
                                    <i class="fas fa-clock"></i>
                                    <strong>Account Pending Approval</strong>
                                    <p style="font-size: 12px; margin-top: 5px;">Your account is waiting for admin approval. You'll be notified here when approved.</p>
                                `;
                                const loginForm = document.getElementById('loginForm');
                                if (loginForm) loginForm.appendChild(msgDiv);
                            }
                            
                            // Start listening for approval notifications
                            listenForApprovalNotifications(username);
                            
                        } else {
                            console.log('❌ No user doc and no pending request for "' + username + '"');
                            firebase.auth().signOut();
                            alert('Account "' + username + '" not found in whitelist. Ask admin to re-approve, or try signing up again.');
                            hideEl('loadingOverlay');
                            showEl('loginHub', 'flex');
                        }
                    }
                } catch(error) {
                    console.error('Auth error:', error);
                    // Don't sign out on Firestore errors - user IS authenticated
                    if (error.code === 'permission-denied' || error.code === 'unavailable') {
                        alert('Database access error: ' + error.message + '\nPlease try refreshing the page.');
                    } else {
                        alert('Login error: ' + error.message);
                    }
                    hideEl('loadingOverlay');
                    showEl('loginHub', 'flex');
                }
            }, 500);
        } else {
            console.log('🔐 No user logged in');
            authStateProcessed = false; // Reset flag when user is logged out
            currentUserData = null;
            localStorage.removeItem('currentUser');
            sessionStorage.removeItem('pendingMessageShown');
            showEl('loginHub', 'flex');
            hideEl('loadingOverlay');
            const pendingMsg = document.getElementById('pendingStatusMessage');
            if (pendingMsg) pendingMsg.remove();
        }
    });
}

// ── Approval Notification Listener ─────────────────────────────────────────────
function listenForApprovalNotifications(username) {
    window.db.collection('pendingRequests').doc(username)
        .onSnapshot(function(doc) {
            if (!doc.exists) {
                console.log('✅ Pending request removed - user approved!');
                // Notification will be shown by Main.js listener
                window.location.reload();
                return;
            }
        });
}

// ── Login Handler ─────────────────────────────────────────────────────────────
function handleLogin() {
    // Reset auth state flag for fresh login attempt
    authStateProcessed = false;

    var emailInput = document.getElementById('emailInput');
    var passwordInput = document.getElementById('passwordInput');
    var raw = emailInput ? emailInput.value.trim() : '';
    var pass = passwordInput ? passwordInput.value : '';
    if (!raw || !pass) { alert('Please enter your username and password.'); return; }
    var email = raw.includes('@') ? raw : raw + '@gamehub.local';
    firebase.auth().signInWithEmailAndPassword(email, pass)
        .catch(function(e){
            if (e.code === 'auth/user-not-found') {
                alert('Account not found. Please sign up first.');
            } else if (e.code === 'auth/wrong-password') {
                alert('Incorrect password. Please try again.');
            } else {
                alert('Login failed: ' + e.message);
            }
        });
}

// ── Signup Handler ───────────────────────────────────────────────────────────
function handleSignup() {
    var signupRealName = document.getElementById('signupRealName');
    var signupName = document.getElementById('signupName');
    var signupPassword = document.getElementById('signupPassword');
    var signupBtn = document.getElementById('signupBtn');
    
    var real = signupRealName ? signupRealName.value.trim() : '';
    var name = signupName ? signupName.value.trim() : '';
    var pass = signupPassword ? signupPassword.value : '';
    if (!name || !pass) { alert('Please fill in all fields.'); return; }
    if (pass.length < 6) { alert('Password must be at least 6 characters.'); return; }
    var email = name + '@gamehub.local';
    
    signupBtn.disabled = true;
    signupBtn.textContent = 'Creating Account...';
    
    console.log('📝 Starting signup for:', name);
    sessionStorage.setItem('signupInProgress', 'true');
    
    window.db.collection('users').doc(name).get()
        .then(function(userDoc) {
            if (userDoc.exists) {
                alert('Username already exists. Please choose another.');
                signupBtn.disabled = false;
                signupBtn.textContent = 'Create Account';
                sessionStorage.removeItem('signupInProgress');
                return null;
            }
            return window.db.collection('pendingRequests').doc(name).get();
        })
        .then(function(pendingDoc) {
            if (pendingDoc && pendingDoc.exists) {
                alert('This username is already pending approval.');
                signupBtn.disabled = false;
                signupBtn.textContent = 'Create Account';
                sessionStorage.removeItem('signupInProgress');
                return null;
            }
            return firebase.auth().createUserWithEmailAndPassword(email, pass);
        })
        .then(function(userCredential) {
            if (!userCredential) return null;
            const user = userCredential.user;
            console.log('✅ Account created in Firebase Auth:', user.email);
            
            return user.updateProfile({ displayName: real || name })
                .then(function() {
                    return window.db.collection('pendingRequests').doc(name).set({
                        username: name,
                        displayName: real || name,
                        realName: real,
                        uid: user.uid,
                        email: email,
                        requestedAt: firebase.firestore.FieldValue.serverTimestamp(),
                        status: 'pending'
                    });
                })
                .then(function() {
                    console.log('✅ Added to pendingRequests');
                    sessionStorage.removeItem('signupInProgress');
                    alert('Account created! Your account is pending approval. You will be notified when approved.');
                    signupRealName.value = '';
                    signupName.value = '';
                    signupPassword.value = '';
                    showEl('loginForm', 'flex');
                    hideEl('signupForm');
                    signupBtn.disabled = false;
                    signupBtn.textContent = 'Create Account';
                });
        })
        .catch(function(error) {
            console.error('Signup error:', error);
            let errorMessage = 'Signup failed: ';
            switch(error.code) {
                case 'auth/email-already-in-use':
                    errorMessage += 'This username is already taken. Please choose another.';
                    break;
                case 'auth/weak-password':
                    errorMessage += 'Password should be at least 6 characters.';
                    break;
                default:
                    errorMessage += error.message;
            }
            alert(errorMessage);
            signupBtn.disabled = false;
            signupBtn.textContent = 'Create Account';
            sessionStorage.removeItem('signupInProgress');
        });
}

// ── Check Status Handler ─────────────────────────────────────────────────────
async function handleCheckStatus() {
    const user = firebase.auth().currentUser;
    if (!user) {
        alert('Please log in first to check your status.');
        return;
    }
    const username = user.email ? user.email.replace('@gamehub.local', '') : user.uid;
    sessionStorage.setItem('justCheckedStatus', 'true');
    
    try {
        const userDoc = await window.db.collection('users').doc(username).get();
        if (userDoc.exists && userDoc.data().allowed === true) {
            console.log('✅ User is approved!');
            alert('🎉 Your account has been approved! You can now log in.');
            window.location.reload();
        } else {
            const pendingDoc = await window.db.collection('pendingRequests').doc(username).get();
            if (pendingDoc.exists) {
                console.log('⏳ User is still pending');
                alert('⏳ Your account is still pending approval. Please wait for an administrator to approve your account.');
            } else {
                console.log('❌ No account found');
                alert('❌ Account not found. Please sign up first.');
            }
        }
    } catch(e) {
        console.error('Error checking status:', e);
        alert('Error checking status. Please try again.');
    } finally {
        setTimeout(() => sessionStorage.removeItem('justCheckedStatus'), 1000);
    }
}

// ── DOMContentLoaded ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function(){
    console.log('🔧 auth.js: Waiting for Firebase initialization...');
    // Wait for Firebase to be initialized
    let attempts = 0;
    while (!firebase.apps.length) {
        if (attempts > 100) {
            console.error('Timeout waiting for Firebase initialization');
            alert('Failed to initialize. Please refresh the page.');
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }
    console.log('✅ auth.js: Firebase is initialized, proceeding...');
    
    if (!window.db) {
        window.db = firebase.firestore();
    }
    
    // Login button
    var loginBtn = document.getElementById('loginBtn');
    var emailInput = document.getElementById('emailInput');
    var passwordInput = document.getElementById('passwordInput');
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
        [emailInput, passwordInput].forEach(function(el){
            if (el) el.addEventListener('keypress', function(e){ if (e.key === 'Enter') loginBtn.click(); });
        });
    }
    
    // Check status button
    var checkStatusBtn = document.getElementById('checkStatusBtn');
    if (checkStatusBtn) {
        checkStatusBtn.addEventListener('click', handleCheckStatus);
    }
    
    // Signup button
    var signupBtn = document.getElementById('signupBtn');
    if (signupBtn) {
        signupBtn.addEventListener('click', handleSignup);
    }
    
    // Toggle between login and signup forms
    var signupLink = document.getElementById('signupLink');
    var backToLogin = document.getElementById('backToLogin');
    if (signupLink) signupLink.addEventListener('click', function(e){ e.preventDefault(); showEl('signupForm'); hideEl('loginForm'); });
    if (backToLogin) backToLogin.addEventListener('click', function(e){ e.preventDefault(); showEl('loginForm'); hideEl('signupForm'); });
    
    showEl('loadingOverlay');
    initAuth();
});
