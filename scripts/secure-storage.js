// ═══════════════════════════════════════════════════════════════════
// DEV PORTAL — secure-storage.js
// Secure storage utility for sensitive data
// ═══════════════════════════════════════════════════════════════════

(function () {
    'use strict';

    // ── Configuration ─────────────────────────────────────────────────────────
    const STORAGE_PREFIX = 'devportal_';
    const SESSION_KEY = STORAGE_PREFIX + 'session';
    const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

    // ── Simple XOR encryption for obfuscation (not military-grade but better than plain text)
    function xorEncrypt(text, key) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return btoa(result); // Base64 encode
    }

    function xorDecrypt(encoded, key) {
        try {
            const text = atob(encoded); // Base64 decode
            let result = '';
            for (let i = 0; i < text.length; i++) {
                result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
            }
            return result;
        } catch (e) {
            console.error('[SecureStorage] Decryption error:', e);
            return null;
        }
    }

    // ── Generate a device-specific encryption key
    function getDeviceKey() {
        let key = localStorage.getItem(STORAGE_PREFIX + 'device_key');
        if (!key) {
            key = Math.random().toString(36).substring(2) + Date.now().toString(36);
            localStorage.setItem(STORAGE_PREFIX + 'device_key', key);
        }
        return key;
    }

    // ── Store session data (minimal, encrypted)
    function setSession(sessionData) {
        const key = getDeviceKey();
        const encrypted = xorEncrypt(JSON.stringify(sessionData), key);
        localStorage.setItem(SESSION_KEY, encrypted);
    }

    // ── Retrieve session data
    function getSession() {
        const key = getDeviceKey();
        const encrypted = localStorage.getItem(SESSION_KEY);
        if (!encrypted) return null;

        try {
            const decrypted = xorDecrypt(encrypted, key);
            const session = JSON.parse(decrypted);
            
            // Check if session is expired
            if (session.expiry && Date.now() > session.expiry) {
                clearSession();
                return null;
            }
            
            return session;
        } catch (e) {
            console.error('[SecureStorage] Session retrieval error:', e);
            clearSession();
            return null;
        }
    }

    // ── Clear session data
    function clearSession() {
        localStorage.removeItem(SESSION_KEY);
    }

    // ── Validate session with Firebase
    async function validateSession() {
        const session = getSession();
        if (!session) return false;

        if (typeof firebase === 'undefined' || !firebase.auth) {
            return false;
        }

        try {
            const user = firebase.auth().currentUser;
            if (!user) return false;
            
            // Verify the UID matches
            return session.uid === user.uid;
        } catch (e) {
            console.error('[SecureStorage] Validation error:', e);
            return false;
        }
    }

    // ── Create session from Firebase user
    function createSessionFromUser(user) {
        const session = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            expiry: Date.now() + SESSION_EXPIRY_MS,
            createdAt: Date.now()
        };
        setSession(session);
        return session;
    }

    // ── Public API ────────────────────────────────────────────────────────────
    window.SecureStorage = {
        setSession: setSession,
        getSession: getSession,
        clearSession: clearSession,
        validateSession: validateSession,
        createSessionFromUser: createSessionFromUser,
        isAuthenticated: function() {
            return getSession() !== null;
        }
    };

    console.log('[SecureStorage] Initialized');
})();
