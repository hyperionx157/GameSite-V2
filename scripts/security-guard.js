// Security Guard - Prevents data leakage through developer tools
(function() {
    'use strict';
    
    // Anti-debugging measures
    const security = {
        // Clear sensitive data from console
        clearConsole: function() {
            if (typeof console.clear === 'function') {
                console.clear();
            }
        },
        
        // Disable right-click context menu
        disableContextMenu: function() {
            document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
            });
        },
        
        // Disable common developer shortcuts
        disableDevShortcuts: function() {
            document.addEventListener('keydown', function(e) {
                // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
                if (e.keyCode === 123 || 
                    (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
                    (e.ctrlKey && e.keyCode === 85)) {
                    e.preventDefault();
                    return false;
                }
            });
        },
        
        // Detect developer tools
        detectDevTools: function() {
            let devtools = {
                open: false,
                orientation: null
            };
            
            const threshold = 160;
            
            setInterval(function() {
                if (window.outerHeight - window.innerHeight > threshold || 
                    window.outerWidth - window.innerWidth > threshold) {
                    if (!devtools.open) {
                        devtools.open = true;
                        console.clear();
                        // Optionally redirect or show warning
                        // window.location.href = '../auth/login.html';
                    }
                } else {
                    devtools.open = false;
                }
            }, 500);
            
            return devtools;
        },
        
        // Protect sensitive variables
        protectVariables: function() {
            // Override console methods to prevent data logging
            const originalLog = console.log;
            const originalWarn = console.warn;
            const originalError = console.error;
            const originalInfo = console.info;
            const originalDebug = console.debug;
            
            console.log = function() {
                // Filter out sensitive data
                const args = Array.from(arguments);
                const filteredArgs = args.filter(arg => 
                    !security.isSensitiveData(arg)
                );
                if (filteredArgs.length > 0) {
                    originalLog.apply(console, filteredArgs);
                }
            };
            
            console.warn = function() {
                const args = Array.from(arguments);
                const filteredArgs = args.filter(arg => 
                    !security.isSensitiveData(arg)
                );
                if (filteredArgs.length > 0) {
                    originalWarn.apply(console, filteredArgs);
                }
            };
            
            console.error = function() {
                const args = Array.from(arguments);
                const filteredArgs = args.filter(arg => 
                    !security.isSensitiveData(arg)
                );
                if (filteredArgs.length > 0) {
                    originalError.apply(console, filteredArgs);
                }
            };
            
            console.info = function() {
                const args = Array.from(arguments);
                const filteredArgs = args.filter(arg => 
                    !security.isSensitiveData(arg)
                );
                if (filteredArgs.length > 0) {
                    originalInfo.apply(console, filteredArgs);
                }
            };
            
            console.debug = function() {
                const args = Array.from(arguments);
                const filteredArgs = args.filter(arg => 
                    !security.isSensitiveData(arg)
                );
                if (filteredArgs.length > 0) {
                    originalDebug.apply(console, filteredArgs);
                }
            };
        },
        
        // Check if data is sensitive
        isSensitiveData: function(data) {
            if (typeof data === 'string') {
                const sensitivePatterns = [
                    /password/i,
                    /token/i,
                    /secret/i,
                    /key/i,
                    /auth/i,
                    /firebase/i,
                    /config/i,
                    /@gamehub\.local/i,
                    /lol8/i,
                    /currentUser/i,
                    /userData/i,
                    /localStorage/i,
                    /sessionStorage/i
                ];
                
                return sensitivePatterns.some(pattern => pattern.test(data));
            }
            
            if (typeof data === 'object' && data !== null) {
                // Check object keys for sensitive information
                return Object.keys(data).some(key => 
                    security.isSensitiveData(key) || security.isSensitiveData(JSON.stringify(data))
                );
            }
            
            return false;
        },
        
        // Clear sensitive data from global scope
        clearGlobalScope: function() {
            // Remove sensitive data from window object but preserve essential Firebase variables
            const sensitiveKeys = [
                'firebaseConfig',
                'currentUserData',
                'currentUser'
            ];
            
            // Don't clear essential Firebase variables that are needed for app functionality
            const essentialKeys = [
                'db',
                'auth',
                'firebase'
            ];
            
            sensitiveKeys.forEach(key => {
                if (window[key]) {
                    try {
                        delete window[key];
                    } catch (e) {
                        // Some properties can't be deleted
                        window[key] = undefined;
                    }
                }
            });
        },
        
        // Encrypt sensitive data in localStorage
        encryptLocalStorage: function() {
            const originalSetItem = localStorage.setItem;
            const originalGetItem = localStorage.getItem;
            
            localStorage.setItem = function(key, value) {
                if (security.isSensitiveData(key)) {
                    // Simple XOR encryption (for demonstration - use proper encryption in production)
                    const encrypted = btoa(value.split('').map((char, i) => 
                        String.fromCharCode(char.charCodeAt(0) ^ 42)
                    ).join(''));
                    originalSetItem.call(localStorage, key, encrypted);
                } else {
                    originalSetItem.call(localStorage, key, value);
                }
            };
            
            localStorage.getItem = function(key) {
                const value = originalGetItem.call(localStorage, key);
                if (security.isSensitiveData(key) && value) {
                    // Simple XOR decryption
                    try {
                        return atob(value).split('').map((char, i) => 
                            String.fromCharCode(char.charCodeAt(0) ^ 42)
                        ).join('');
                    } catch (e) {
                        return value;
                    }
                }
                return value;
            };
        },
        
        // Disable copy/paste for sensitive elements
        disableCopyPaste: function() {
            document.addEventListener('selectstart', function(e) {
                if (e.target.closest('.sensitive')) {
                    e.preventDefault();
                    return false;
                }
            });
            
            document.addEventListener('copy', function(e) {
                const selection = window.getSelection().toString();
                if (security.isSensitiveData(selection)) {
                    e.preventDefault();
                    return false;
                }
            });
            
            document.addEventListener('paste', function(e) {
                if (e.target.closest('.sensitive')) {
                    e.preventDefault();
                    return false;
                }
            });
        },
        
        // Obfuscate Firebase config
        obfuscateConfig: function() {
            // Don't obfuscate Firebase config as it's needed for app functionality
            // The config is already protected by other security measures
            // This function is disabled to prevent breaking the app
        },
        
        // Initialize all security measures
        init: function() {
            // Clear console on load
            setTimeout(() => this.clearConsole(), 100);
            
            // Disable developer tools shortcuts
            this.disableDevShortcuts();
            
            // Disable right-click
            this.disableContextMenu();
            
            // Protect console logging
            this.protectVariables();
            
            // Clear global scope
            this.clearGlobalScope();
            
            // Encrypt localStorage
            this.encryptLocalStorage();
            
            // Disable copy/paste for sensitive content
            this.disableCopyPaste();
            
            // Obfuscate config
            this.obfuscateConfig();
            
            // Detect dev tools
            this.detectDevTools();
            
            // Add CSS to hide sensitive elements from inspection
            const style = document.createElement('style');
            style.textContent = `
                .sensitive {
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    pointer-events: none;
                }
                
                /* Hide elements from dev tools element picker */
                .sensitive::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 9999;
                    background: transparent;
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    // Initialize security measures
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => security.init());
    } else {
        security.init();
    }
    
})();
