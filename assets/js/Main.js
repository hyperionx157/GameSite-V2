// ═══════════════════════════════════════════════════════════════════
// DEV PORTAL — Main.js
// ═══════════════════════════════════════════════════════════════════

// ── Config ─────────────────────────────────────────────────────────
const CLOUDFLARE_R2_BASE = 'https://assets.hyperionx17.com/';

const GAME_URLS = {
    'baldi-plus':        CLOUDFLARE_R2_BASE + 'baldi-plus/index.html',
    'baldi-remaster':    CLOUDFLARE_R2_BASE + 'baldi-remaster/index.html',
    'getting-over-it':   CLOUDFLARE_R2_BASE + 'getting-over-it/index.html',
    'helios-proxy':     'https://hyperionx157.github.io/Helios/',
    'jackbox-proxy':    '../Proxy/Jackbox.html',
    'hollow-knight':     CLOUDFLARE_R2_BASE + 'hollow-knight-main/index.html',
    'minesweeperplus':   CLOUDFLARE_R2_BASE + 'minesweeperplus/MinesweeperPlus.html',
    'pizza-tower':       CLOUDFLARE_R2_BASE + 'pizza-tower/index.html',
    'omori-fixed':       CLOUDFLARE_R2_BASE + 'omori-fixed/index.html',
    'ddlc-web':          CLOUDFLARE_R2_BASE + 'ddlc-web-main/index.html',
    'undertale-yellow':  CLOUDFLARE_R2_BASE + 'undertale-yellow/index.html',
    'schoolboy-runaway': CLOUDFLARE_R2_BASE + 'schoolboy-runaway/index.html',
    'pokemon-emerald':   '../games/EmuGames/Pokemon - Emerald Version (U).html',
    'need-for-speed':    '../games/EmuGames/Need for Speed - Most Wanted (USA, Europe) (En,Fr,De,It).html',
    'call-of-duty':      '../games/EmuGames/Call of Duty - Modern Warfare 3 - Defiance (USA).html',
    'space-invaders':    'https://www.crazygames.com/embed/space-invaders',
    'galaga':            'https://www.retrogames.com/play-online/galaga.html',
    'asteroids':         'https://www.crazygames.com/embed/asteroids',
    '2048':              'https://www.crazygames.com/embed/2048',
    'sudoku':            'https://www.crazygames.com/embed/sudoku',
    'minesweeper':       'https://www.crazygames.com/embed/minesweeper',
    'cookie-clicker':    '../games/html5/cookieclicker.html',
    'retro-bowl':        '../games/html5/retrobowl.html',
    'ovo':               '../games/html5/ovo.html',
    'adofai':            '../games/html5/adofai.html',
    'getaway-shootout':  '../games/html5/getaway-shootout.html',
    'eaglercraft':       '../games/html5/eaglercraft.html',
    'crazycattle3d':     '../games/html5/crazycattle3d.html',
    'ucn':              '../games/html5/UCN.html',
    'fnaf1':            CLOUDFLARE_R2_BASE + '1/index.html',
    'fnaf2':            CLOUDFLARE_R2_BASE + '2/index.html',
    'fnaf3':            CLOUDFLARE_R2_BASE + '3/index.html',
    'fnaf4':            CLOUDFLARE_R2_BASE + '4/index.html',
    'fnaf-sister-location': CLOUDFLARE_R2_BASE + 'sl/index.html',
    'fnaf-pizzeria-simulator': CLOUDFLARE_R2_BASE + 'ps/index.html',
    'fnaf-world':        CLOUDFLARE_R2_BASE + 'w/index.html',
    'granny':           CLOUDFLARE_R2_BASE + 'Granny-main/Granny-main/index.html',
    'riddle-school-1':   'data:text/html,<html><head><script src="https://unpkg.com/@ruffle-rs/ruffle"></script></head><body style="margin:0;background:#000"><div id="player" style="width:100vw;height:100vh"></div><script>const ruffle=window.RufflePlayer.newest();const player=ruffle.createPlayer();player.style.width="100%";player.style.height="100%";document.getElementById("player").appendChild(player);player.load({url:"' + CLOUDFLARE_R2_BASE + 'riddleschool.swf' + '",backgroundColor:"#000",quality:"high"});</script></body></html>',
    'riddle-school-2':   'data:text/html,<html><head><script src="https://unpkg.com/@ruffle-rs/ruffle"></script></head><body style="margin:0;background:#000"><div id="player" style="width:100vw;height:100vh"></div><script>const ruffle=window.RufflePlayer.newest();const player=ruffle.createPlayer();player.style.width="100%";player.style.height="100%";document.getElementById("player").appendChild(player);player.load({url:"' + CLOUDFLARE_R2_BASE + 'riddleschool2.swf' + '",backgroundColor:"#000",quality:"high"});</script></body></html>',
    'riddle-school-3':   'data:text/html,<html><head><script src="https://unpkg.com/@ruffle-rs/ruffle"></script></head><body style="margin:0;background:#000"><div id="player" style="width:100vw;height:100vh"></div><script>const ruffle=window.RufflePlayer.newest();const player=ruffle.createPlayer();player.style.width="100%";player.style.height="100%";document.getElementById("player").appendChild(player);player.load({url:"' + CLOUDFLARE_R2_BASE + 'riddleschool3.swf' + '",backgroundColor:"#000",quality:"high"});</script></body></html>',
    'riddle-school-4':   'data:text/html,<html><head><script src="https://unpkg.com/@ruffle-rs/ruffle"></script></head><body style="margin:0;background:#000"><div id="player" style="width:100vw;height:100vh"></div><script>const ruffle=window.RufflePlayer.newest();const player=ruffle.createPlayer();player.style.width="100%";player.style.height="100%";document.getElementById("player").appendChild(player);player.load({url:"' + CLOUDFLARE_R2_BASE + 'riddleschool4.swf' + '",backgroundColor:"#000",quality:"high"});</script></body></html>',
    'riddle-school-5':   'data:text/html,<html><head><script src="https://unpkg.com/@ruffle-rs/ruffle"></script></head><body style="margin:0;background:#000"><div id="player" style="width:100vw;height:100vh"></div><script>const ruffle=window.RufflePlayer.newest();const player=ruffle.createPlayer();player.style.width="100%";player.style.height="100%";document.getElementById("player").appendChild(player);player.load({url:"' + CLOUDFLARE_R2_BASE + 'riddleschool5.swf' + '",backgroundColor:"#000",quality:"high"});</script></body></html>',
    'riddle-transfer':   'data:text/html,<html><head><script src="https://unpkg.com/@ruffle-rs/ruffle"></script></head><body style="margin:0;background:#000"><div id="player" style="width:100vw;height:100vh"></div><script>const ruffle=window.RufflePlayer.newest();const player=ruffle.createPlayer();player.style.width="100%";player.style.height="100%";document.getElementById("player").appendChild(player);player.load({url:"' + CLOUDFLARE_R2_BASE + 'riddletransfer.swf' + '",backgroundColor:"#000",quality:"high"});</script></body></html>',
    'riddle-transfer-2':  'data:text/html,<html><head><script src="https://unpkg.com/@ruffle-rs/ruffle"></script></head><body style="margin:0;background:#000"><div id="player" style="width:100vw;height:100vh"></div><script>const ruffle=window.RufflePlayer.newest();const player=ruffle.createPlayer();player.style.width="100%";player.style.height="100%";document.getElementById("player").appendChild(player);player.load({url:"' + CLOUDFLARE_R2_BASE + 'riddletransfer2.swf' + '",backgroundColor:"#000",quality:"high"});</script></body></html>'
};

// ── Firebase Configuration ───────────────────────────────────────────────────────
// Firebase initialization is deferred until config loads from Cloudflare Worker
var db;

async function waitForFirebaseConfig() {
    let attempts = 0;
    while (!window.FIREBASE_CONFIG || window.FIREBASE_CONFIG.apiKey === 'LOADING_CONFIG' || window.FIREBASE_CONFIG.apiKey === 'MISSING_API_KEY_CONFIGURE_IN_CONFIG_JS') {
        if (attempts > 50) {
            console.error('[Main] Timeout waiting for Firebase config');
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
    
    try {
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    } catch (e) {
        console.error('[Main] Firebase initialization error:', e);
    }
    
    db = firebase.firestore();
    window.db = db;
    console.log('[Main] Firebase initialized with valid config');
}

// ── Globals ─────────────────────────────────────────────────────────
var currentUserData = null;
var currentSection  = 'home';
var sideMenuOpen    = true;
var miniMenuOpen    = false;
var gameChatOpen    = false;
var currentItemKey = null;
var allMessages     = [];
var unreadChatCount = 0;
var lastReadTimestamp = null;
var userNotifications = [];
var unreadNotifications = 0;
var currentSessionId = null;
var sessionCheckInterval = null;

console.log('Main.js loaded successfully!');

// ── Helpers ─────────────────────────────────────────────────────────
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

function fmtTime(timestamp) {
    let date;
    if (timestamp && typeof timestamp.toDate === 'function') {
        date = timestamp.toDate();
    } else if (typeof timestamp === 'string') {
        date = new Date(timestamp);
    } else if (timestamp instanceof Date) {
        date = timestamp;
    } else {
        return 'recently';
    }
    if (isNaN(date.getTime())) return 'recently';
    const now = new Date();
    const m = Math.floor((now - date) / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return m + 'm ago';
    if (m < 1440) return Math.floor(m / 60) + 'h ago';
    return Math.floor(m / 1440) + 'd ago';
}

function titleCase(str) {
    return str.replace(/-/g, ' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); });
}

function showEl(id, display) {
    var e = document.getElementById(id);
    if (e) e.style.display = display || 'block';
}

function hideEl(id) {
    var e = document.getElementById(id);
    if (e) e.style.display = 'none';
}

// ── Session Management (Cross-Page Persistence) ────────────────────
function generateSessionId() {
    return 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11);
}

async function registerSession(username) {
    if (!currentSessionId) {
        currentSessionId = generateSessionId();
    }
    
    sessionStorage.setItem('currentSessionId', currentSessionId);
    sessionStorage.setItem('currentUserId', username);
    
    try {
        const existingSession = await db.collection('activeSessions').doc(username).get({ source: 'server' });
        
        if (existingSession.exists) {
            const existingData = existingSession.data();
            
            if (existingData.sessionId === currentSessionId) {
                console.log('[Session] Already registered, updating timestamp');
                await db.collection('activeSessions').doc(username).update({
                    lastActive: firebase.firestore.FieldValue.serverTimestamp()
                });
                return true;
            }
            
            console.log('[Session] Another session detected:', existingData.sessionId);
        }
        
        // Write our session (overrides any existing)
        await db.collection('activeSessions').doc(username).set({
            sessionId: currentSessionId,
            username: username,
            startedAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastActive: firebase.firestore.FieldValue.serverTimestamp(),
            userAgent: navigator.userAgent
        });
        console.log('[Session] Registered:', currentSessionId);
        return true;
        
    } catch(e) {
        console.error('[Session] Error registering:', e);
        return false;
    }
}

function showSessionConflictAlert(username) {
    const existing = document.getElementById('sessionConflictAlert');
    if (existing) return; // Don't stack alerts
    
    const alertDiv = document.createElement('div');
    alertDiv.id = 'sessionConflictAlert';
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        z-index: 10001;
        text-align: center;
        box-shadow: 0 8px 25px rgba(0,0,0,0.4);
        font-family: inherit;
        min-width: 340px;
        max-width: 90vw;
    `;
    alertDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle" style="font-size: 24px; color: #ffeaa7;"></i>
        <strong style="display: block; margin-top: 8px; font-size: 16px;">Another Device Detected!</strong>
        <p style="margin-top: 6px; font-size: 13px; opacity: 0.9;">Someone just logged into your account from another device.</p>
        <div style="margin-top: 14px; display: flex; gap: 10px; justify-content: center;">
            <button id="kickSessionBtn" style="padding: 8px 20px; background: white; color: #e74c3c; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px;"><i class="fas fa-ban"></i> Kick Them</button>
            <button id="dismissSessionBtn" style="padding: 8px 20px; background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; cursor: pointer; font-size: 13px;">Leave Them Be</button>
        </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    document.getElementById('kickSessionBtn').onclick = async () => {
        alertDiv.remove();
        // Reclaim the session: write our sessionId back
        currentSessionId = generateSessionId();
        sessionStorage.setItem('currentSessionId', currentSessionId);
        try {
            await db.collection('activeSessions').doc(username).set({
                sessionId: currentSessionId,
                username: username,
                startedAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastActive: firebase.firestore.FieldValue.serverTimestamp(),
                userAgent: navigator.userAgent
            });
            toastMessage('Other device has been kicked. You are the active session.', 'success');
        } catch(e) {
            console.error('[Session] Error reclaiming session:', e);
        }
    };
    
    document.getElementById('dismissSessionBtn').onclick = () => {
        alertDiv.remove();
        // Just dismiss — do nothing, let both sessions coexist
        toastMessage('Alert dismissed. Both sessions are active.', 'info');
    };
}

function toastMessage(message, type) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#3498db'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10002;
        animation: slideInRight 0.3s ease;
        font-family: inherit;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    toast.innerHTML = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

async function endSession(username) {
    if (username && currentSessionId) {
        try {
            const sessionDoc = await db.collection('activeSessions').doc(username).get();
            if (sessionDoc.exists && sessionDoc.data().sessionId === currentSessionId) {
                await db.collection('activeSessions').doc(username).delete();
                console.log('[Session] Ended for:', username);
            }
        } catch(e) {
            console.error('[Session] Error ending:', e);
        }
    }
    sessionStorage.removeItem('currentSessionId');
    sessionStorage.removeItem('currentUserId');
}

async function getClientIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch(e) {
        return 'unknown';
    }
}

function startSessionMonitoring(username) {
    // Real-time listener — fires instantly when another device writes a new session
    if (window._sessionUnsub) window._sessionUnsub();
    
    window._sessionUnsub = db.collection('activeSessions').doc(username)
        .onSnapshot(function(doc) {
            if (!doc.exists) return; // Session was cleaned up
            const data = doc.data();
            const mySessionId = sessionStorage.getItem('currentSessionId');
            if (mySessionId && data.sessionId && data.sessionId !== mySessionId) {
                console.log('[Session] Conflict detected! Mine:', mySessionId, 'Theirs:', data.sessionId);
                showSessionConflictAlert(username);
            }
        }, function(err) {
            console.error('[Session] Listener error:', err);
        });
    
    // Also update lastActive every 60s
    if (sessionCheckInterval) clearInterval(sessionCheckInterval);
    sessionCheckInterval = setInterval(function() {
        db.collection('activeSessions').doc(username).update({
            lastActive: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(function() {});
    }, 60000);
}

// ── Chat Badge Functions ─────────────────────────────────────────────
function updateChatBadges() {
    const badge = document.getElementById('chatUnreadBadge');
    const miniBadge = document.getElementById('miniChatBadge');
    
    if (unreadChatCount > 0) {
        if (badge) {
            badge.textContent = unreadChatCount > 9 ? '9+' : unreadChatCount;
            badge.style.display = 'inline-block';
        }
        if (miniBadge) {
            miniBadge.textContent = unreadChatCount > 9 ? '9+' : unreadChatCount;
            miniBadge.style.display = 'inline-block';
        }
        const miniChatBtn = document.getElementById('miniChatBtn');
        if (miniChatBtn && !miniChatBtn.querySelector('.unread-badge')) {
            miniChatBtn.innerHTML = `<i class="fas fa-comments"></i> Open Chat <span class="unread-badge" style="background:#e74c3c; color:white; font-size:0.65rem; padding:2px 6px; border-radius:10px; margin-left:6px;">${unreadChatCount > 9 ? '9+' : unreadChatCount}</span>`;
        }
    } else {
        if (badge) badge.style.display = 'none';
        if (miniBadge) miniBadge.style.display = 'none';
        const miniChatBtn = document.getElementById('miniChatBtn');
        if (miniChatBtn) {
            miniChatBtn.innerHTML = `<i class="fas fa-comments"></i> Open Chat`;
        }
    }
}

function markChatAsRead() {
    unreadChatCount = 0;
    updateChatBadges();
}

// Notification Functions
function initNotifications() {
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    currentUser = user;
    const username = user.email ? user.email.replace('@gamehub.local', '') : user.uid;
    console.log('Initializing notifications for:', username);
    
    // Personal notifications
    db.collection('notifications')
        .where('username', '==', username)
        .orderBy('createdAt', 'desc')
        .limitToLast(20)
        .onSnapshot(snapshot => {
            userNotifications = [];
            unreadNotifications = 0;
            
            snapshot.forEach(doc => {
                const notif = doc.data();
                notif.id = doc.id;
                userNotifications.push(notif);
                if (!notif.read) {
                    unreadNotifications++;
                }
            });
            
            console.log(`${unreadNotifications} unread notifications`);
            checkForNewApproval();
        });
    
    // Global announcement notifications
    initAnnouncementNotifications();
}

function initAnnouncementNotifications() {
    console.log('Setting up global announcement notifications...');
    db.collection('announcements')
        .orderBy('createdAt', 'desc')
        .limitToLast(50)
        .onSnapshot(snapshot => {
            const announcements = [];
            snapshot.forEach(doc => {
                announcements.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            console.log('Announcement snapshot received:', announcements.length, 'announcements');
            checkForNewAnnouncements(announcements);
        }, error => {
            console.error('Error loading announcements for notifications:', error);
        });
}

function checkForNewAnnouncements(announcements) {
    const currentCount = announcements.length;
    console.log('Checking for new announcements:', {
        currentCount,
        lastCount: lastAnnouncementCount,
        currentUser: currentUser?.uid,
        hasNew: currentCount > lastAnnouncementCount && lastAnnouncementCount > 0
    });
    
    if (lastAnnouncementCount > 0 && currentCount > lastAnnouncementCount) {
        // New announcement posted
        const latestAnnouncement = announcements[0]; // Most recent
        console.log('New announcement detected:', {
            title: latestAnnouncement.title,
            author: latestAnnouncement.author,
            authorId: latestAnnouncement.authorId,
            currentUserId: currentUser?.uid,
            shouldNotify: latestAnnouncement.authorId !== currentUser?.uid
        });
        
        if (latestAnnouncement && latestAnnouncement.authorId !== currentUser?.uid) {
            // Show notification to other users
            console.log('Showing notification to other users');
            showNotification(
                'New Announcement',
                `${latestAnnouncement.title} by ${latestAnnouncement.author}`,
                'announcement',
                8000
            );
        } else {
            console.log('Not showing notification - user posted this announcement or no author ID match');
        }
    }
    lastAnnouncementCount = currentCount;
}

function showNotification(title, message, type = 'info', duration = 5000) {
    console.log('showNotification called:', { title, message, type, duration });
    const container = document.getElementById('notificationContainer');
    if (!container) {
        console.error('Notification container not found!');
        return;
    }
    console.log('Notification container found, creating notification...');

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-header">
            <i class="fas fa-bullhorn"></i>
            <span>${escHtml(title)}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="notification-body">${escHtml(message)}</div>
    `;

    container.appendChild(notification);

    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            hideNotification(notification);
        });
    }

    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Auto-hide after duration
    if (duration > 0) {
        setTimeout(() => {
            hideNotification(notification);
        }, duration);
    }
}

function hideNotification(notification) {
    if (!notification) return;
    
    notification.classList.remove('show');
    notification.classList.add('hide');
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function escHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function checkForNewApproval() {
    const approvalNotif = userNotifications.find(n => n.type === 'approval' && !n.read);
    if (approvalNotif) {
        console.log('Found new approval notification!');
        console.log('🎉 Found new approval notification!');
        showApprovalPopup(approvalNotif);
        markNotificationRead(approvalNotif.id);
    }
}

function showApprovalPopup(notification) {
    const existing = document.getElementById('approvalPopup');
    if (existing) existing.remove();
    
    const popup = document.createElement('div');
    popup.id = 'approvalPopup';
    popup.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #2ecc71, #27ae60);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.5s ease;
        font-family: inherit;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        max-width: 350px;
    `;
    popup.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 24px;"></i>
        <div>
            <strong style="font-size: 16px;">${notification.title || 'Account Approved!'}</strong>
            <div style="font-size: 13px; margin-top: 4px;">${notification.message}</div>
            <div style="font-size: 11px; margin-top: 6px; color: rgba(255,255,255,0.9);">Click to log in</div>
        </div>
        <button style="background: none; border: none; color: white; cursor: pointer; margin-left: 10px; font-size: 16px;">✕</button>
    `;
    
    if (!document.getElementById('notificationAnimStyle')) {
        const style = document.createElement('style');
        style.id = 'notificationAnimStyle';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(popup);
    
    popup.onclick = (e) => {
        if (e.target.tagName !== 'BUTTON') {
            window.location.reload();
        }
    };
    
    popup.querySelector('button').onclick = (e) => {
        e.stopPropagation();
        popup.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => popup.remove(), 300);
    };
    
    setTimeout(() => {
        if (popup && popup.parentNode) {
            popup.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => popup.remove(), 300);
        }
    }, 8000);
}

async function markNotificationRead(notificationId) {
    try {
        await db.collection('notifications').doc(notificationId).update({
            read: true,
            readAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ Notification marked as read');
    } catch(e) {
        console.error('Error marking notification as read:', e);
    }
}

function listenForApprovalNotifications(username) {
    console.log('👂 Listening for approval notifications for:', username);
    
    if (window.notificationUnsubscribe) {
        window.notificationUnsubscribe();
    }
    
    const unsubscribe = db.collection('notifications')
        .where('username', '==', username)
        .where('type', '==', 'approval')
        .onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                const notif = doc.data();
                console.log('📨 Notification received:', notif);
                
                if (!notif.read) {
                    console.log('🎉 Approval notification received!');
                    
                    db.collection('notifications').doc(doc.id).update({ 
                        read: true,
                        readAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    
                    sessionStorage.setItem('justApproved', 'true');
                    showApprovalPopup(notif);
                    
                    const pendingMsg = document.getElementById('pendingStatusMessage');
                    if (pendingMsg) {
                        pendingMsg.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
                        pendingMsg.style.color = 'white';
                        pendingMsg.style.borderColor = '#2ecc71';
                        pendingMsg.innerHTML = `
                            <i class="fas fa-check-circle"></i>
                            <strong>Account Approved!</strong>
                            <p style="font-size: 12px; margin-top: 5px;">Your account has been approved! Click below to log in.</p>
                            <button id="refreshLoginBtn" style="margin-top: 8px; padding: 5px 12px; background: white; color: #27ae60; border: none; border-radius: 5px; cursor: pointer;">Log In Now</button>
                        `;
                        const refreshBtn = document.getElementById('refreshLoginBtn');
                        if (refreshBtn) {
                            refreshBtn.onclick = () => window.location.reload();
                        }
                    }
                    
                    setTimeout(() => window.location.reload(), 2000);
                }
            });
        }, error => {
            console.error('Error listening for notifications:', error);
        });
    
    window.notificationUnsubscribe = unsubscribe;
}

// ── Section switching ────────────────────────────────────────────────
function switchSection(name) {
    currentSection = name;
    document.querySelectorAll('.side-nav-btn').forEach(function(btn){
        btn.classList.toggle('active', btn.getAttribute('data-section') === name);
    });
    document.querySelectorAll('.content-section').forEach(function(s){
        s.classList.remove('active-section');
    });
    var map = { home:'sectionHome', library:'sectionLibrary', tools:'sectionTools', forum:'sectionForum', chat:'sectionChat' };
    var target = document.getElementById(map[name]);
    if (target) target.classList.add('active-section');
    var titles = { home:'Home', library:'Library', tools:'Tools', forum:'Feedback', chat:'Live Chat' };
    var titleEl = document.getElementById('pageTitle');
    if (titleEl) titleEl.textContent = titles[name] || name;
    if (name === 'forum') loadSuggestions();
    if (name === 'chat') markChatAsRead();
    if (window.innerWidth <= 540) {
        var sm = document.getElementById('sideMenu');
        if (sm) sm.classList.remove('mobile-open');
    }
}
window.switchSection = switchSection;

function toggleSideMenu() {
    var sm = document.getElementById('sideMenu');
    var mc = document.getElementById('mainContent');
    if (!sm) return;
    if (window.innerWidth <= 540) {
        sm.classList.toggle('mobile-open');
        return;
    }
    sideMenuOpen = !sideMenuOpen;
    sm.classList.toggle('hidden', !sideMenuOpen);
    if (mc) mc.classList.toggle('full-width', !sideMenuOpen);
}

function loadItem(itemKey) {
    var url = GAME_URLS[itemKey];
    if (!url) { alert('Game not found!'); return; }
    currentItemKey = itemKey;
    var frame   = document.getElementById('itemFrame');
    var overlay = document.getElementById('gameOverlay');
    var titleEl = document.getElementById('miniMenuItemTitle');
    if (!frame || !overlay) return;
    
    // Handle proxy type differently
    if (itemKey === 'helios-proxy' || itemKey === 'jackbox-proxy') {
        // Open proxy tools in about:blank page with iframe
        openInAboutBlank(url);
        return;
    } else {
        frame.src = url;
        if (titleEl) titleEl.textContent = '▶ ' + titleCase(itemKey);
        document.title = titleCase(itemKey) + ' — Dev Portal';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        hideMiniMenu();
        hideGameChat();
    }
}

function showMiniMenu() {
    var m = document.getElementById('gameMiniMenu');
    if (m) { 
        m.style.display = 'block'; 
        miniMenuOpen = true;
        updateChatBadges();
    }
}
function hideMiniMenu() {
    var m = document.getElementById('gameMiniMenu');
    if (m) { 
        m.style.display = 'none'; 
        miniMenuOpen = false; 
    }
}
function toggleMiniMenu() { miniMenuOpen ? hideMiniMenu() : showMiniMenu(); }

function returnToHub() {
    var overlay = document.getElementById('gameOverlay');
    var frame   = document.getElementById('itemFrame');
    if (overlay) overlay.style.display = 'none';
    if (frame)   frame.src = '';
    document.body.style.overflow = '';
    document.title = 'Dev Portal';
    hideMiniMenu();
    hideGameChat();
    currentItemKey = null;
}

function showGameChat() {
    var gc = document.getElementById('gameChat');
    if (gc) { 
        gc.style.display = 'flex'; 
        gameChatOpen = true;
        markChatAsRead();
    }
    hideMiniMenu();
}
function hideGameChat() {
    var gc = document.getElementById('gameChat');
    if (gc) { 
        gc.style.display = 'none'; 
        gameChatOpen = false; 
    }
}

function initChat() {
    db.collection('chatMessages')
        .orderBy('timestamp', 'asc')
        .limitToLast(80)
        .onSnapshot(function(snapshot) {
            allMessages = [];
            snapshot.forEach(function(doc){ allMessages.push(doc.data()); });
            renderChatMessages();
            
            const user = firebase.auth().currentUser;
            if (user && lastReadTimestamp) {
                let unread = 0;
                snapshot.forEach(doc => {
                    const msg = doc.data();
                    const msgTime = msg.timestamp?.toDate();
                    if (msg.authorId !== user.uid && msgTime && msgTime > lastReadTimestamp) {
                        unread++;
                    }
                });
                unreadChatCount = unread;
                updateChatBadges();
            }
        });
    
    db.collection('liveUsers').onSnapshot(function(snapshot) {
        var onlineCount = snapshot.size;
        var label = onlineCount + ' online';
        var c1 = document.getElementById('chatOnlineCount');
        var c2 = document.getElementById('gameChatOnline');
        if (c1) c1.textContent = label;
        if (c2) c2.textContent = label;
    });
    
    var sendBtn = document.getElementById('chatSendBtn');
    var input   = document.getElementById('chatInput');
    if (sendBtn) sendBtn.addEventListener('click', function(){ sendMessage(input); });
    if (input)   input.addEventListener('keypress', function(e){ if (e.key === 'Enter') sendMessage(input); });
    
    var gSend  = document.getElementById('gameChatSend');
    var gInput = document.getElementById('gameChatInput');
    if (gSend)  gSend.addEventListener('click', function(){ sendMessage(gInput); });
    if (gInput) gInput.addEventListener('keypress', function(e){ if (e.key === 'Enter') sendMessage(gInput); });
    
    const chatSection = document.getElementById('sectionChat');
    const observer = new MutationObserver(() => {
        if (chatSection && chatSection.classList.contains('active-section')) {
            markChatAsRead();
        }
    });
    if (chatSection) observer.observe(chatSection, { attributes: true, attributeFilter: ['class'] });
    
    const gameChatPanel = document.getElementById('gameChat');
    if (gameChatPanel) {
        const chatObserver = new MutationObserver(() => {
            if (gameChatPanel.style.display === 'flex') {
                markChatAsRead();
            }
        });
        chatObserver.observe(gameChatPanel, { attributes: true, attributeFilter: ['style'] });
    }
}

function sendMessage(inputEl) {
    if (!inputEl) return;
    var text = inputEl.value.trim();
    if (!text) return;
    var user = firebase.auth().currentUser;
    var displayName = user ? (user.displayName || user.email || 'Anonymous') : 
                     ('User_' + Math.random().toString(36).slice(2, 8));
    var userId = user ? user.uid : ('anon_' + Math.random().toString(36).slice(2, 10));
    db.collection('chatMessages').add({
        text:      text,
        author:    displayName,
        authorId:  userId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function(){ inputEl.value = ''; }).catch(function(err){ 
        console.error('[Chat] send error:', err);
        alert('Failed to send message. Please try again.');
    });
}

function renderChatMessages() {
    var user  = firebase.auth().currentUser;
    var myUid = user ? user.uid : null;
    ['chatMessages', 'gameChatMessages'].forEach(function(id){
        var c = document.getElementById(id);
        if (!c) return;
        if (allMessages.length === 0) {
            c.innerHTML = '<div class="chat-empty">No messages yet. Say something! 👋</div>';
            return;
        }
        c.innerHTML = allMessages.map(function(msg){
            var isMe = msg.authorId === myUid;
            var bg   = isMe ? 'linear-gradient(135deg,#9b59b6,#3498db)' : 'rgba(42,42,74,0.9)';
            return '<div class="chat-msg ' + (isMe ? 'chat-msg-me' : '') + '">' +
                '<div class="chat-avatar-small" style="background:' + bg + '">' + getInitials(msg.author) + '</div>' +
                '<div class="chat-content-other">' +
                    (isMe ? '' : '<div class="chat-author">' + escHtml(msg.author) + '</div>') +
                    '<div class="chat-bubble chat-bubble-' + (isMe ? 'me' : 'other') + '">' +
                        '<span class="chat-text">' + escHtml(msg.text) + '</span>' +
                        '<span class="chat-ts">' + fmtTime(msg.timestamp) + '</span>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }).join('');
        c.scrollTop = c.scrollHeight;
    });
}

// ── Forum ────────────────────────────────────────────────────────────
function initForum() {
    var newBtn    = document.getElementById('newSuggestionBtn');
    var cancelBtn = document.getElementById('cancelSuggestionBtn');
    var submitBtn = document.getElementById('submitSuggestionBtn');
    if (newBtn)    newBtn.addEventListener('click',    function(){ showEl('suggestionForm'); });
    if (cancelBtn) cancelBtn.addEventListener('click', function(){ hideEl('suggestionForm'); });
    if (submitBtn) submitBtn.addEventListener('click', submitSuggestion);
}

async function submitSuggestion() {
    var titleEl = document.getElementById('gameTitle');
    var descEl  = document.getElementById('gameDescription');
    var genreEl = document.getElementById('gameGenre');
    var platEl  = document.getElementById('gamePlatform');
    var user    = firebase.auth().currentUser;
    if (!titleEl.value.trim() || !descEl.value.trim()) { alert('Please fill in the required fields.'); return; }
    if (!user) { alert('You must be logged in to submit.'); return; }
    try {
        await db.collection('contentSuggestions').add({
            title:       titleEl.value.trim(),
            description: descEl.value.trim(),
            genre:       genreEl ? genreEl.value : '',
            platform:    platEl  ? platEl.value.trim() : '',
            author:      currentUserData ? currentUserData.displayName : 'Unknown',
            authorId:    user.uid,
            votes:       0,
            votedBy:     [],
            createdAt:   firebase.firestore.FieldValue.serverTimestamp()
        });
        alert('Suggestion submitted!');
        hideEl('suggestionForm');
        titleEl.value = ''; descEl.value = '';
        loadSuggestions();
    } catch(e) { console.error(e); alert('Error submitting suggestion.'); }
}

async function loadSuggestions() {
    showEl('forumLoading'); hideEl('emptySuggestions');
    var sl = document.getElementById('suggestionsList');
    if (sl) sl.innerHTML = '';
    try {
        var snap = await db.collection('contentSuggestions').orderBy('votes', 'desc').get();
        var list = [];
        snap.forEach(function(doc){ list.push(Object.assign({ id: doc.id }, doc.data())); });
        hideEl('forumLoading');
        if (list.length === 0) { showEl('emptySuggestions'); return; }
        renderSuggestions(list);
    } catch(e) { console.error(e); hideEl('forumLoading'); }
}

function renderSuggestions(list) {
    var sl = document.getElementById('suggestionsList');
    if (!sl) return;
    var user  = firebase.auth().currentUser;
    var myUid = user ? user.uid : null;
    sl.innerHTML = list.map(function(s){
        var voted = s.votedBy && myUid && s.votedBy.includes(myUid);
        return '<div class="suggestion-card">' +
            '<div class="suggestion-header"><div>' +
                '<div class="suggestion-title">' + escHtml(s.title) + '</div>' +
                '<div class="suggestion-meta">by ' + escHtml(s.author) + ' • ' + fmtTime(s.createdAt) + (s.genre ? ' • ' + escHtml(s.genre) : '') + '</div>' +
            '</div></div>' +
            '<div class="suggestion-body">' + escHtml(s.description) + '</div>' +
            '<div class="suggestion-actions">' +
                '<button class="vote-btn ' + (voted ? 'voted' : '') + '" onclick="voteSuggestion(\'' + s.id + '\',' + (s.votes || 0) + ',' + (voted ? 'true' : 'false') + ')">' +
                    '<i class="fas fa-thumbs-up"></i> ' + (s.votes || 0) + ' Votes' +
                '</button>' +
            '</div>' +
        '</div>';
    }).join('');
}

async function voteSuggestion(id, currentVotes, hasVoted) {
    var user = firebase.auth().currentUser;
    if (!user) { alert('You must be logged in to vote.'); return; }
    try {
        var ref = db.collection('contentSuggestions').doc(id);
        if (hasVoted) {
            await ref.update({ votes: Math.max(0, currentVotes - 1), votedBy: firebase.firestore.FieldValue.arrayRemove(user.uid) });
        } else {
            await ref.update({ votes: currentVotes + 1, votedBy: firebase.firestore.FieldValue.arrayUnion(user.uid) });
        }
        loadSuggestions();
    } catch(e) { console.error(e); alert('Error updating vote.'); }
}
window.voteSuggestion = voteSuggestion;

function openInAboutBlank(url) {
    const newWindow = window.open('about:blank', '_blank');
    newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Game</title>
            <style>
                body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
                iframe { width: 100%; height: 100%; border: none; }
            </style>
        </head>
        <body>
            <iframe src="${url}"></iframe>
        </body>
        </html>
    `);
    newWindow.document.close();
}

function initGameGrid() {
    document.querySelectorAll('.item-btn').forEach(function(btn){
        btn.addEventListener('click', function(){ loadItem(this.getAttribute('data-game')); });
    });
    document.querySelectorAll('.tool-card').forEach(function(card){
        card.addEventListener('click', function(){ loadItem(this.getAttribute('data-game')); });
    });
    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(){
            var term = this.value.toLowerCase().trim();
            document.querySelectorAll('.item-btn').forEach(function(btn){
                btn.style.display = btn.textContent.toLowerCase().includes(term) ? '' : 'none';
            });
        });
    }
}

function updateUserProfile(user) {
    var name  = user.displayName || user.email || 'Player';
    var email = user.email || '';
    var av = document.getElementById('sideAvatarInitials');
    var un = document.getElementById('sideUserName');
    var ur = document.getElementById('sideUserReal');
    if (av) { av.textContent = getInitials(name); av.style.background = 'linear-gradient(135deg,#9b59b6,#3498db)'; }
    if (un) un.textContent = name;
    if (ur) ur.textContent = email;
}

// ── App Initialization ─────────────────────────────────────────────────────
async function initApp() {
    console.log('Main.js: initApp() called');
    
    // Wait for Firebase config to load from Cloudflare Worker
    await waitForFirebaseConfig();
    
    // Check if Firebase is initialized
    if (!firebase.apps.length) {
        console.error('Firebase not initialized after waiting');
        return;
    }

    // Load current user data from localStorage or Firebase Auth
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUserData = JSON.parse(savedUser);
            if (!currentUserData.username && currentUserData.email) {
                currentUserData.username = currentUserData.email.replace('@gamehub.local', '');
            }
            updateUserProfile({
                displayName: currentUserData.displayName,
                email: currentUserData.email
            });
            showEl('mainApp');
            hideEl('loadingOverlay');
            initChat();
            initForum();
            initGameGrid();
            console.log('Main.js: About to call initNotifications() from saved user path');
            initNotifications();
            // Multi-device session management
            if (currentUserData.username) {
                registerSession(currentUserData.username);
                startSessionMonitoring(currentUserData.username);
            }
            switchSection('home');
            return;
        } catch(e) {
            console.error('Error parsing saved user:', e);
        }
    }

    // Wait for Firebase Auth to restore session (don't check synchronously)
    const user = await new Promise((resolve) => {
        const unsubscribe = firebase.auth().onAuthStateChanged((u) => {
            unsubscribe();
            resolve(u);
        });
    });
    
    if (user) {
        const username = user.email ? user.email.replace('@gamehub.local', '') : user.uid;
        currentUserData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            username: username
        };
        updateUserProfile({
            displayName: currentUserData.displayName,
            email: currentUserData.email
        });
        showEl('mainApp');
        hideEl('loadingOverlay');
        initChat();
        initForum();
        initGameGrid();
        initNotifications();
        // Multi-device session management
        registerSession(username);
        startSessionMonitoring(username);
        switchSection('home');
        return;
    }

    // No user found - auth-guard handles redirect, don't redirect here
    console.log('Main.js: No user found, auth-guard will handle redirect');
}

// ── DOMContentLoaded ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function(){
    
    var menuToggle = document.getElementById('menuToggleBtn');
    if (menuToggle) menuToggle.addEventListener('click', toggleSideMenu);
    
    document.querySelectorAll('.side-nav-btn').forEach(function(btn){
        btn.addEventListener('click', function(){
            var section = this.getAttribute('data-section');
            if (section) switchSection(section);
        });
    });
    
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function(){
            // End session before signing out
            if (currentUserData && currentUserData.username) {
                await endSession(currentUserData.username);
            }
            firebase.auth().signOut().then(function(){
                localStorage.removeItem('currentUser');
                if (window.SecureStorage) {
                    window.SecureStorage.clearSession();
                }
                window.location.href = '../auth/login.html';
            });
        });
    }
    
    document.addEventListener('keydown', function(e){
        var overlay = document.getElementById('gameOverlay');
        if (!overlay || overlay.style.display === 'none') return;
        if (e.key === '-' || e.key === '_' || e.key === 'Minus') { 
            e.preventDefault(); 
            toggleMiniMenu(); 
        }
        if (e.key === 'Escape') { 
            hideMiniMenu(); 
            hideGameChat(); 
        }
    });
    
    var menuTab = document.getElementById('gameMenuTab');
    if (menuTab) menuTab.addEventListener('click', toggleMiniMenu);
    var miniReturn = document.getElementById('miniReturnBtn');
    if (miniReturn) miniReturn.addEventListener('click', returnToHub);
    var miniChat = document.getElementById('miniChatBtn');
    if (miniChat) miniChat.addEventListener('click', function(){ hideMiniMenu(); showGameChat(); });
    var gcClose = document.getElementById('gameChatClose');
    if (gcClose) gcClose.addEventListener('click', hideGameChat);
    
    window.addEventListener('beforeunload', function() {
        if (currentUserData && currentUserData.username) {
            // Use sendBeacon for reliable cleanup on page close
            // endSession is async but beforeunload can't await, so best-effort
            try {
                db.collection('activeSessions').doc(currentUserData.username).get().then(function(doc) {
                    if (doc.exists && doc.data().sessionId === currentSessionId) {
                        db.collection('activeSessions').doc(currentUserData.username).delete();
                    }
                });
            } catch(e) {}
        }
    });
    
    showEl('loadingOverlay');
    initApp();
});