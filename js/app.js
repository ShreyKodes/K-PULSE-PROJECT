/**
 * K-PULSE EVENT MANAGEMENT SYSTEM - CORE LOGIC
 * Author: Shreyan (Web Designing Course)
 * Description: Complete event management platform logic implementing responsive navigation,
 * real-time search & filtering, live countdown timers, rigorous JavaScript form validation,
 * local-storage persistence, dynamic QR-code digital ticket generation, confetti animations,
 * and dark/light mode toggling.
 */

// ============================================================================
// 1. STATE MANAGEMENT & STORAGE KEYS
// ============================================================================
const STORAGE_KEYS = {
  THEME: "kpulse_theme_pref",
  REGISTRATIONS: "kpulse_user_registrations",
  CUSTOM_EVENTS: "kpulse_custom_events",
  SYNC_ROOM: "kpulse_sync_room"
};

// Global App State
const state = {
  events: [...INITIAL_EVENTS],
  customEvents: [],
  registrations: [],
  currentCategory: "all",
  searchQuery: "",
  sortBy: "date-asc",
  currentView: "grid", // 'grid' | 'list'
  activeModal: null,
  selectedEventForModal: null,
  activeTimers: []
};

// ============================================================================
// 2. DOM ELEMENT SELECTORS
// ============================================================================
const DOM = {
  html: document.documentElement,
  header: document.getElementById("header"),
  themeToggle: document.getElementById("theme-toggle"),
  mobileToggle: document.getElementById("mobile-toggle"),
  navMenu: document.getElementById("nav-menu"),
  searchTrigger: document.getElementById("search-trigger"),
  myTicketsBtn: document.getElementById("my-tickets-btn"),
  ticketsCountBadge: document.getElementById("tickets-count-badge"),
  footerMyTicketsTrigger: document.getElementById("footer-my-tickets-trigger"),
  
  // Host Event Modal
  hostEventModal: document.getElementById("host-event-modal"),
  hostEventBtn: document.getElementById("host-event-btn"),
  heroHostEventBtn: document.getElementById("hero-host-event-btn"),
  hostEventForm: document.getElementById("host-event-form"),
  
  // Hero & Featured
  heroQuickRegBtn: document.getElementById("hero-quick-register-btn"),
  metricEventsCount: document.getElementById("metric-events-count"),

  // Controls & Catalog
  categoryPills: document.querySelectorAll(".filter-pill"),
  eventSearchInput: document.getElementById("event-search-input"),
  searchClearBtn: document.getElementById("search-clear-btn"),
  eventSortSelect: document.getElementById("event-sort-select"),
  resultsCount: document.getElementById("results-count"),
  resetFiltersBtn: document.getElementById("reset-filters-btn"),
  eventsGrid: document.getElementById("events-grid"),
  emptyState: document.getElementById("empty-state"),
  emptyResetBtn: document.getElementById("empty-reset-btn"),
  viewGridBtn: document.getElementById("view-grid"),
  viewListBtn: document.getElementById("view-list"),

  // Event Detail Modal Elements
  detailModal: document.getElementById("event-detail-modal"),
  modalEventImg: document.getElementById("modal-event-img"),
  modalCategoryTag: document.getElementById("modal-category-tag"),
  modalStatusBadge: document.getElementById("modal-status-badge"),
  modalEventTitle: document.getElementById("modal-event-title"),
  modalDate: document.getElementById("modal-date"),
  modalTime: document.getElementById("modal-time"),
  modalVenue: document.getElementById("modal-venue"),
  modalPrice: document.getElementById("modal-price"),
  modalFullDesc: document.getElementById("modal-full-desc"),
  modalTimeline: document.getElementById("modal-timeline"),
  modalSpeakersList: document.getElementById("modal-speakers-list"),
  modalSeatsText: document.getElementById("modal-seats-text"),
  modalSeatsBar: document.getElementById("modal-seats-bar"),
  modalRegisterActionBtn: document.getElementById("modal-register-action-btn"),

  // Registration Modal & Form Elements
  regModal: document.getElementById("registration-modal"),
  regForm: document.getElementById("event-registration-form"),
  regName: document.getElementById("reg-name"),
  regEmail: document.getElementById("reg-email"),
  regPhone: document.getElementById("reg-phone"),
  regEventSelect: document.getElementById("reg-event"),
  regRole: document.getElementById("reg-role"),
  regRoll: document.getElementById("reg-roll"),
  regNotes: document.getElementById("reg-notes"),
  regTerms: document.getElementById("reg-terms"),
  submitRegBtn: document.getElementById("submit-reg-btn"),

  // Error Message Labels
  errName: document.getElementById("error-reg-name"),
  errEmail: document.getElementById("error-reg-email"),
  errPhone: document.getElementById("error-reg-phone"),
  errEvent: document.getElementById("error-reg-event"),
  errTerms: document.getElementById("error-reg-terms"),

  // Ticket Pass Modal Elements
  ticketModal: document.getElementById("ticket-modal"),
  confettiCanvas: document.getElementById("confetti-canvas"),
  ticketQrCanvas: document.getElementById("ticket-qr-canvas"),
  ticketRegId: document.getElementById("ticket-reg-id"),
  ticketCategory: document.getElementById("ticket-category"),
  ticketEventName: document.getElementById("ticket-event-name"),
  ticketAttendeeName: document.getElementById("ticket-attendee-name"),
  ticketAttendeeRole: document.getElementById("ticket-attendee-role"),
  ticketEventDate: document.getElementById("ticket-event-date"),
  ticketEventTime: document.getElementById("ticket-event-time"),
  ticketEventVenue: document.getElementById("ticket-event-venue"),
  ticketTimestamp: document.getElementById("ticket-timestamp"),
  printTicketBtn: document.getElementById("print-ticket-btn"),
  viewMyTicketsFromModalBtn: document.getElementById("view-my-tickets-from-modal-btn"),

  // My Tickets Drawer
  myTicketsModal: document.getElementById("my-tickets-modal"),
  myTicketsList: document.getElementById("my-tickets-list"),
  noTicketsState: document.getElementById("no-tickets-state"),
  ticketsSearchInput: document.getElementById("tickets-search-input"),
  clearAllTicketsBtn: document.getElementById("clear-all-tickets-btn"),

  // Organizer Roster Modal
  organizerModal: document.getElementById("organizer-modal"),
  navOrganizerBtn: document.getElementById("nav-organizer-btn"),
  rosterTableBody: document.getElementById("roster-table-body"),
  rosterEmptyNotice: document.getElementById("roster-empty-notice"),
  orgTotalRegs: document.getElementById("org-total-regs"),
  orgActiveEvents: document.getElementById("org-active-events"),
  orgUniqueAttendees: document.getElementById("org-unique-attendees"),
  exportCsvBtn: document.getElementById("export-csv-btn"),

  // Toasts
  toastContainer: document.getElementById("toast-container"),

  // Cloud Sync Controls
  navSyncPill: document.getElementById("nav-sync-pill"),
  drawerSyncStatus: document.getElementById("drawer-sync-status"),
  syncRoomDisplay: document.getElementById("sync-room-display"),
  drawerSyncNowBtn: document.getElementById("drawer-sync-now-btn"),
  exportTicketsJsonBtn: document.getElementById("export-tickets-json-btn"),
  importTicketsFileInput: document.getElementById("import-tickets-file-input"),
  orgSyncNowBtn: document.getElementById("org-sync-now-btn"),

  // Advanced Jaw-Dropping UI/UX Elements
  scrollProgressBar: document.getElementById("scroll-progress-bar"),
  soundToggle: document.getElementById("sound-toggle"),
  heroCanvas: document.getElementById("hero-particle-canvas"),
  dockMyTickets: document.getElementById("dock-my-tickets"),
  dockTicketsBadge: document.getElementById("dock-tickets-badge"),
  dockHostBtn: document.getElementById("dock-host-btn"),
  dockShortcutsBtn: document.getElementById("dock-shortcuts-btn"),
  dockSoundBtn: document.getElementById("dock-sound-btn"),
  dockTopBtn: document.getElementById("dock-top-btn"),
  shortcutsModal: document.getElementById("shortcuts-modal"),
  downloadPassImgBtn: document.getElementById("download-pass-img-btn"),
  toggleHoloBtn: document.getElementById("toggle-holo-btn"),
  holoBtnText: document.getElementById("holo-btn-text")
};

// ============================================================================
// 3. INITIALIZATION
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadRegistrationsFromStorage();
  initRealtimeCloudStream();
  fetchRecentCloudSync();
  populateEventDropdown();
  renderEvents();
  initGlobalCountdowns();
  initScrollProgress();
  initHeroParticleCanvas();
  init3DCardTilt();
  updateSoundUI();
  initEventListeners();
  updateTicketsBadge();
  setupKeyboardShortcuts();
});

// ============================================================================
// 4. THEME MANAGEMENT (DARK / LIGHT MODE - BONUS REQUIREMENT)
// ============================================================================
function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
  if (savedTheme) {
    DOM.html.setAttribute("data-theme", savedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    DOM.html.setAttribute("data-theme", prefersDark ? "dark" : "light");
  }
}

function toggleTheme() {
  const currentTheme = DOM.html.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  DOM.html.setAttribute("data-theme", newTheme);
  localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
  playAudioFx("theme");
  showToast(`Switched to ${newTheme === "dark" ? "Dark" : "Light"} Mode`, "info");
}

// ============================================================================
// 5. GLOBAL CLOUD & REALTIME MULTI-DEVICE SYNC ENGINE
// ============================================================================
const DEFAULT_SYNC_ROOM = "kpulse_campus_sync_v1";
const CLIENT_ID = "client_" + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
let activeEventSource = null;
let isCloudOnline = true;

function getSyncRoom() {
  const urlParams = new URLSearchParams(window.location.search);
  const roomParam = urlParams.get("room");
  if (roomParam && roomParam.trim()) {
    const cleanRoom = roomParam.trim().replace(/[^a-zA-Z0-9_-]/g, "");
    localStorage.setItem(STORAGE_KEYS.SYNC_ROOM, cleanRoom);
    return cleanRoom;
  }
  return localStorage.getItem(STORAGE_KEYS.SYNC_ROOM) || DEFAULT_SYNC_ROOM;
}

function setSyncRoom(newRoom) {
  if (!newRoom || !newRoom.trim()) return;
  const cleanRoom = newRoom.trim().replace(/[^a-zA-Z0-9_-]/g, "");
  localStorage.setItem(STORAGE_KEYS.SYNC_ROOM, cleanRoom);
  if (DOM.syncRoomDisplay) {
    DOM.syncRoomDisplay.textContent = `Room: ${cleanRoom}`;
  }
  initRealtimeCloudStream();
  fetchRecentCloudSync();
  showToast(`Switched sync room to "${cleanRoom}"`, "info");
}

function updateSyncStatusUI(online) {
  isCloudOnline = online;
  const navPill = document.getElementById("nav-sync-pill");
  const drawerStatus = document.getElementById("drawer-sync-status");
  const roomDisp = document.getElementById("sync-room-display");

  const currentRoom = getSyncRoom();
  if (roomDisp) {
    roomDisp.textContent = `Room: ${currentRoom}`;
  }

  if (online) {
    if (navPill) {
      navPill.innerHTML = '<span class="sync-dot live"></span><span class="sync-nav-text">Live Sync</span>';
      navPill.title = `Live Sync Connected: Room "${currentRoom}" (Instant sync with other devices)`;
    }
    if (drawerStatus) {
      drawerStatus.className = "sync-status-indicator online";
      drawerStatus.innerHTML = '<span class="sync-pulse-dot"></span><span class="sync-status-text">Realtime Sync Active</span>';
    }
  } else {
    if (navPill) {
      navPill.innerHTML = '<span class="sync-dot offline"></span><span class="sync-nav-text">Offline</span>';
      navPill.title = "Reconnecting to live cloud sync...";
    }
    if (drawerStatus) {
      drawerStatus.className = "sync-status-indicator offline";
      drawerStatus.innerHTML = '<span class="sync-pulse-dot" style="background:#ef4444"></span><span class="sync-status-text">Connecting...</span>';
    }
  }
}

async function broadcastCloudMessage(action) {
  const room = getSyncRoom();
  const payload = {
    senderId: CLIENT_ID,
    timestamp: Date.now(),
    ...action
  };

  try {
    await fetch(`https://ntfy.sh/${room}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    updateSyncStatusUI(true);
  } catch (err) {
    console.warn("Cloud sync broadcast error:", err);
    updateSyncStatusUI(false);
  }
}

function handleIncomingSyncMessage(msg, isInitialSync = false) {
  if (!msg || typeof msg !== "object") return;
  if (msg.senderId === CLIENT_ID) return; // Don't process our own broadcasted events

  let stateChanged = false;

  // 1. New Ticket registered on another laptop
  if (msg.type === "ADD_TICKET" && msg.ticket && msg.ticket.id) {
    const exists = state.registrations.some(r => r.id === msg.ticket.id);
    if (!exists) {
      state.registrations.unshift(msg.ticket);
      stateChanged = true;

      // Update seat count on event card
      const targetEvent = state.events.find(e => e.id === msg.ticket.eventId);
      if (targetEvent && targetEvent.registeredCount < targetEvent.capacity) {
        targetEvent.registeredCount++;
      }

      if (!isInitialSync) {
        showToast(`Live Synced: New pass for ${msg.ticket.name} (${msg.ticket.eventTitle})`, "success");
      }
    }
  }
  // 2. Ticket cancelled on another laptop
  else if (msg.type === "REMOVE_TICKET" && msg.ticketId) {
    const existing = state.registrations.find(r => r.id === msg.ticketId);
    if (existing) {
      state.registrations = state.registrations.filter(r => r.id !== msg.ticketId);
      stateChanged = true;

      const targetEvent = state.events.find(e => e.id === existing.eventId);
      if (targetEvent && targetEvent.registeredCount > 0) {
        targetEvent.registeredCount--;
      }

      if (!isInitialSync) {
        showToast(`Pass ${msg.ticketId} cancelled on another device.`, "info");
      }
    }
  }
  // 3. Clear all tickets
  else if (msg.type === "CLEAR_ALL_TICKETS") {
    if (state.registrations.length > 0) {
      state.registrations = [];
      stateChanged = true;
      if (!isInitialSync) {
        showToast("Passes cleared across synced devices.", "info");
      }
    }
  }
  // 4. Custom Event hosted on another laptop
  else if (msg.type === "ADD_EVENT" && msg.event && msg.event.id) {
    const exists = (state.customEvents || []).some(e => e.id === msg.event.id);
    if (!exists) {
      if (!state.customEvents) state.customEvents = [];
      state.customEvents.unshift(msg.event);
      state.events.unshift(msg.event);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_EVENTS, JSON.stringify(state.customEvents));
      renderEvents();
      populateEventDropdown();
      if (DOM.metricEventsCount) {
        DOM.metricEventsCount.textContent = `${state.events.length}+`;
      }
      if (!isInitialSync) {
        showToast(`Live Synced: New event hosted: "${msg.event.title}"`, "info");
      }
    }
  }
  // 5. Full sync snapshot
  else if (msg.type === "SYNC_SNAPSHOT") {
    if (Array.isArray(msg.tickets)) {
      const regMap = new Map();
      state.registrations.forEach(r => { if (r && r.id) regMap.set(r.id, r); });
      msg.tickets.forEach(r => { if (r && r.id) regMap.set(r.id, r); });
      const merged = Array.from(regMap.values());
      if (merged.length !== state.registrations.length) {
        state.registrations = merged;
        stateChanged = true;
      }
    }
    if (Array.isArray(msg.customEvents)) {
      const eventMap = new Map();
      (state.customEvents || []).forEach(e => { if (e && e.id) eventMap.set(e.id, e); });
      msg.customEvents.forEach(e => { if (e && e.id) eventMap.set(e.id, e); });
      const mergedEvents = Array.from(eventMap.values());
      if (mergedEvents.length !== (state.customEvents || []).length) {
        state.customEvents = mergedEvents;
        localStorage.setItem(STORAGE_KEYS.CUSTOM_EVENTS, JSON.stringify(state.customEvents));
        const allMap = new Map();
        INITIAL_EVENTS.forEach(e => allMap.set(e.id, e));
        state.customEvents.forEach(e => allMap.set(e.id, e));
        state.events = Array.from(allMap.values());
        renderEvents();
        populateEventDropdown();
        if (DOM.metricEventsCount) {
          DOM.metricEventsCount.textContent = `${state.events.length}+`;
        }
      }
    }
  }

  if (stateChanged) {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(state.registrations));
    updateTicketsBadge();
    renderEvents();

    if (DOM.myTicketsModal && DOM.myTicketsModal.classList.contains("active")) {
      renderMyTicketsList();
    }
    if (DOM.organizerModal && DOM.organizerModal.classList.contains("active")) {
      openOrganizerModal();
    }
  }
}

async function fetchRecentCloudSync() {
  const room = getSyncRoom();
  try {
    const res = await fetch(`https://ntfy.sh/${room}/json?poll=1`);
    if (!res.ok) {
      updateSyncStatusUI(false);
      return;
    }
    const text = await res.text();
    if (text && text.trim()) {
      const lines = text.trim().split("\n");
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const item = JSON.parse(line);
          if (item.event === "message" && item.message) {
            const data = JSON.parse(item.message);
            handleIncomingSyncMessage(data, true);
          }
        } catch (e) {}
      }
    }

    // Share local tickets so newly opened devices get them
    if (state.registrations.length > 0 || (state.customEvents && state.customEvents.length > 0)) {
      broadcastCloudMessage({
        type: "SYNC_SNAPSHOT",
        tickets: state.registrations,
        customEvents: state.customEvents || []
      });
    }

    updateSyncStatusUI(true);
  } catch (err) {
    console.warn("Failed to fetch cloud sync history:", err);
    updateSyncStatusUI(false);
  }
}

function initRealtimeCloudStream() {
  const room = getSyncRoom();
  if (activeEventSource) {
    try { activeEventSource.close(); } catch(e) {}
    activeEventSource = null;
  }

  try {
    activeEventSource = new EventSource(`https://ntfy.sh/${room}/sse`);

    activeEventSource.onopen = () => {
      updateSyncStatusUI(true);
    };

    activeEventSource.onmessage = (event) => {
      try {
        const item = JSON.parse(event.data);
        if (item.event === "message" && item.message) {
          const data = JSON.parse(item.message);
          handleIncomingSyncMessage(data, false);
        }
      } catch (err) {
        console.warn("Failed to parse realtime stream message:", err);
      }
    };

    activeEventSource.onerror = () => {
      updateSyncStatusUI(false);
    };
  } catch (err) {
    console.warn("EventSource not available, fallback to manual/poll:", err);
    updateSyncStatusUI(false);
  }
}

function loadRegistrationsFromStorage() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
    state.registrations = rawData ? JSON.parse(rawData) : [];
  } catch (err) {
    console.error("Failed to parse registrations from localStorage", err);
    state.registrations = [];
  }

  try {
    const rawEvents = localStorage.getItem(STORAGE_KEYS.CUSTOM_EVENTS);
    state.customEvents = rawEvents ? JSON.parse(rawEvents) : [];
    if (state.customEvents && state.customEvents.length > 0) {
      const allEventsMap = new Map();
      INITIAL_EVENTS.forEach(e => allEventsMap.set(e.id, e));
      state.customEvents.forEach(e => allEventsMap.set(e.id, e));
      state.events = Array.from(allEventsMap.values());
    }
  } catch (err) {
    state.customEvents = [];
  }
}

function saveRegistrationsToStorage(actionType = null, payload = null) {
  // 1. Instant local persistence
  try {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(state.registrations));
    updateTicketsBadge();
  } catch (err) {
    console.error("Failed to save to localStorage", err);
  }

  // 2. Broadcast to other laptops
  if (actionType && payload) {
    broadcastCloudMessage({ type: actionType, ...payload });
  } else {
    broadcastCloudMessage({
      type: "SYNC_SNAPSHOT",
      tickets: state.registrations,
      customEvents: state.customEvents || []
    });
  }
}

function triggerManualSync() {
  showToast("Syncing registrations with cloud...", "info");
  fetchRecentCloudSync().then(() => {
    renderMyTicketsList();
    if (DOM.organizerModal && DOM.organizerModal.classList.contains("active")) {
      openOrganizerModal();
    }
    showToast(`Live Synced: ${state.registrations.length} total pass(es) ready across all devices.`, "success");
  });
}

function exportTicketsJSON() {
  if (state.registrations.length === 0) {
    showToast("No registrations available to backup.", "error");
    return;
  }
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.registrations, null, 2));
  const dlAnchor = document.createElement("a");
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `kpulse_tickets_backup_${Date.now()}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
  showToast("Passes exported to JSON backup file!", "success");
}

function importTicketsJSON(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        const regMap = new Map();
        state.registrations.forEach(r => { if (r && r.id) regMap.set(r.id, r); });
        imported.forEach(r => { if (r && r.id) regMap.set(r.id, r); });
        state.registrations = Array.from(regMap.values());

        saveRegistrationsToStorage();
        renderMyTicketsList();
        if (DOM.organizerModal && DOM.organizerModal.classList.contains("active")) {
          openOrganizerModal();
        }
        showToast(`Successfully imported ${imported.length} pass(es) and synced!`, "success");
      } else {
        showToast("Invalid JSON file format.", "error");
      }
    } catch (err) {
      showToast("Failed to read JSON backup file.", "error");
    }
  };
  reader.readAsText(file);
}

function updateTicketsBadge() {
  const count = state.registrations.length;
  DOM.ticketsCountBadge.textContent = count;
  if (DOM.dockTicketsBadge) {
    DOM.dockTicketsBadge.textContent = count;
  }
  if (count > 0) {
    DOM.ticketsCountBadge.style.display = "inline-block";
  } else {
    DOM.ticketsCountBadge.style.display = "none";
  }
}

// ============================================================================
// 6. EVENT CATALOG RENDERING & FILTERING
// ============================================================================
function getFilteredAndSortedEvents() {
  let list = [...state.events];

  // Category Filter
  if (state.currentCategory !== "all") {
    list = list.filter(evt => evt.category.toLowerCase() === state.currentCategory.toLowerCase());
  }

  // Text Search Query
  if (state.searchQuery.trim() !== "") {
    const q = state.searchQuery.toLowerCase().trim();
    list = list.filter(evt => 
      evt.title.toLowerCase().includes(q) ||
      evt.shortDescription.toLowerCase().includes(q) ||
      evt.venue.toLowerCase().includes(q) ||
      evt.categoryLabel.toLowerCase().includes(q) ||
      evt.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }

  // Sorting
  switch (state.sortBy) {
    case "date-asc":
      list.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "date-desc":
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "popularity":
      list.sort((a, b) => (b.registeredCount / b.capacity) - (a.registeredCount / a.capacity));
      break;
    case "title-asc":
      list.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }

  return list;
}

function renderEvents() {
  const events = getFilteredAndSortedEvents();
  
  // Results counter
  DOM.resultsCount.innerHTML = `Showing <strong>${events.length}</strong> of ${state.events.length} events`;
  
  // Show/hide reset button
  const hasActiveFilters = state.currentCategory !== "all" || state.searchQuery.trim() !== "";
  DOM.resetFiltersBtn.style.display = hasActiveFilters ? "inline-flex" : "none";

  // Check empty state
  if (events.length === 0) {
    DOM.eventsGrid.innerHTML = "";
    DOM.emptyState.style.display = "block";
    return;
  }
  
  DOM.emptyState.style.display = "none";

  // Build Cards HTML
  const cardsHtml = events.map(evt => {
    const capacityPercent = Math.min(100, Math.round((evt.registeredCount / evt.capacity) * 100));
    const countdownInfo = getCountdownShortText(evt.date);

    return `
      <article class="event-card" data-event-id="${evt.id}">
        <div class="card-image-box">
          <img src="${evt.image}" alt="${evt.title}" class="card-img" loading="lazy">
          <div class="card-badge-left">
            <span class="category-tag"><i class="fa-solid fa-tag"></i> ${evt.categoryLabel}</span>
          </div>
          <div class="card-badge-right">
            <span class="badge badge-${evt.badgeType}">${evt.badge}</span>
          </div>
          <div class="card-countdown-tag" data-card-countdown="${evt.date}">
            <i class="fa-regular fa-clock"></i> <span>${countdownInfo}</span>
          </div>
        </div>

        <div class="card-body">
          <div class="card-meta-row">
            <span><i class="fa-regular fa-calendar-check"></i> ${evt.displayDate}</span>
            <span>•</span>
            <span><i class="fa-regular fa-clock"></i> ${evt.time.split('-')[0].trim()}</span>
          </div>

          <h3 class="card-title">${evt.title}</h3>
          
          <div class="card-location">
            <i class="fa-solid fa-location-dot"></i>
            <span>${evt.venue}</span>
          </div>

          <p class="card-desc">${evt.shortDescription}</p>

          <div class="card-footer-info">
            <div class="card-price-seats">
              <span class="card-price"><i class="fa-solid fa-ticket"></i> ${evt.price}</span>
              <span class="card-seats">${evt.registeredCount} / ${evt.capacity} spots filled</span>
            </div>

            <!-- Mini Progress -->
            <div class="progress-bar-bg" style="margin-bottom: 14px;">
              <div class="progress-bar-fill" style="width: ${capacityPercent}%;"></div>
            </div>

            <div class="card-actions">
              <button type="button" class="btn btn-secondary btn-sm view-details-btn" data-event-id="${evt.id}">
                <i class="fa-solid fa-circle-info"></i> Details
              </button>
              <button type="button" class="btn btn-primary btn-sm register-now-btn" data-event-id="${evt.id}">
                <i class="fa-solid fa-bolt"></i> Register
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");

  DOM.eventsGrid.innerHTML = cardsHtml;
}

function populateEventDropdown() {
  const optionsHtml = state.events.map(evt => {
    return `<option value="${evt.id}">${evt.title} (${evt.displayDate})</option>`;
  }).join("");

  DOM.regEventSelect.innerHTML = `<option value="">-- Choose an Event --</option>` + optionsHtml;
}

// ============================================================================
// 7. COUNTDOWN TIMERS ENGINE (BONUS REQUIREMENT)
// ============================================================================
function calculateTimeRemaining(targetIsoString) {
  const total = Date.parse(targetIsoString) - Date.now();
  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds, isPast: false };
}

function getCountdownShortText(isoDate) {
  const t = calculateTimeRemaining(isoDate);
  if (t.isPast) return "Event Active";
  if (t.days > 0) return `${t.days}d ${t.hours}h left`;
  return `${t.hours}h ${t.minutes}m left`;
}

function initGlobalCountdowns() {
  // Update countdown timers every 1 second
  setInterval(() => {
    // 1. Hero and Featured Banner Timers
    document.querySelectorAll(".countdown-timer[data-target]").forEach(timerElem => {
      const targetDate = timerElem.getAttribute("data-target");
      if (!targetDate) return;
      const t = calculateTimeRemaining(targetDate);

      const daysEl = timerElem.querySelector(".days");
      const hoursEl = timerElem.querySelector(".hours");
      const minsEl = timerElem.querySelector(".minutes");
      const secsEl = timerElem.querySelector(".seconds");

      if (daysEl) daysEl.textContent = String(t.days).padStart(2, "0");
      if (hoursEl) hoursEl.textContent = String(t.hours).padStart(2, "0");
      if (minsEl) minsEl.textContent = String(t.minutes).padStart(2, "0");
      if (secsEl) secsEl.textContent = String(t.seconds).padStart(2, "0");
    });

    // 2. Modal Live Timer if open
    if (state.selectedEventForModal) {
      const t = calculateTimeRemaining(state.selectedEventForModal.date);
      const modalTimer = document.getElementById("modal-timer");
      if (modalTimer) {
        modalTimer.querySelector(".days").textContent = String(t.days).padStart(2, "0");
        modalTimer.querySelector(".hours").textContent = String(t.hours).padStart(2, "0");
        modalTimer.querySelector(".minutes").textContent = String(t.minutes).padStart(2, "0");
        modalTimer.querySelector(".seconds").textContent = String(t.seconds).padStart(2, "0");
      }
    }

    // 3. Card Countdown Badges
    document.querySelectorAll("[data-card-countdown]").forEach(badge => {
      const target = badge.getAttribute("data-card-countdown");
      const span = badge.querySelector("span");
      if (span && target) {
        span.textContent = getCountdownShortText(target);
      }
    });
  }, 1000);
}

// ============================================================================
// 8. EVENT DETAILED VIEW MODAL
// ============================================================================
function openEventDetailModal(eventId) {
  const event = state.events.find(e => e.id === eventId);
  if (!event) return;

  state.selectedEventForModal = event;

  // Populate data
  DOM.modalEventImg.src = event.image;
  DOM.modalEventImg.alt = event.title;
  DOM.modalCategoryTag.textContent = event.categoryLabel;
  DOM.modalStatusBadge.textContent = event.badge;
  DOM.modalStatusBadge.className = `badge badge-${event.badgeType}`;
  DOM.modalEventTitle.textContent = event.title;
  DOM.modalDate.textContent = event.displayDate;
  DOM.modalTime.textContent = event.time;
  DOM.modalVenue.textContent = `${event.venue}, ${event.city}`;
  DOM.modalPrice.textContent = event.price;
  DOM.modalFullDesc.textContent = event.fullDescription;

  // Timeline
  DOM.modalTimeline.innerHTML = event.schedule.map(item => `
    <div class="timeline-item">
      <div class="timeline-time">${item.time}</div>
      <div class="timeline-act">${item.activity}</div>
    </div>
  `).join("");

  // Speakers
  if (event.speakers && event.speakers.length > 0) {
    DOM.modalSpeakersList.innerHTML = event.speakers.map(spk => `
      <div class="speaker-card">
        <img src="${spk.avatar}" alt="${spk.name}" class="speaker-avatar">
        <div>
          <div class="speaker-name">${spk.name}</div>
          <div class="speaker-role">${spk.role} • ${spk.org}</div>
        </div>
      </div>
    `).join("");
    document.getElementById("modal-speakers-section").style.display = "block";
  } else {
    document.getElementById("modal-speakers-section").style.display = "none";
  }

  // Seats bar
  const pct = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));
  DOM.modalSeatsText.textContent = `${event.registeredCount} / ${event.capacity} Spots Booked (${pct}%)`;
  DOM.modalSeatsBar.style.width = `${pct}%`;

  // Action button
  DOM.modalRegisterActionBtn.onclick = () => {
    closeModal(DOM.detailModal);
    openRegistrationModal(event.id);
  };

  openModal(DOM.detailModal);
}

// ============================================================================
// 9. FORM VALIDATION & REGISTRATION LOGIC
// ============================================================================
function openRegistrationModal(preselectEventId = null) {
  resetRegistrationForm();

  if (preselectEventId) {
    DOM.regEventSelect.value = preselectEventId;
  }

  openModal(DOM.regModal);
  DOM.regName.focus();
}

function resetRegistrationForm() {
  DOM.regForm.reset();
  clearAllValidationErrors();
}

function clearAllValidationErrors() {
  [DOM.regName, DOM.regEmail, DOM.regPhone, DOM.regEventSelect].forEach(input => {
    input.classList.remove("is-invalid", "is-valid");
  });
  DOM.errName.textContent = "";
  DOM.errEmail.textContent = "";
  DOM.errPhone.textContent = "";
  DOM.errEvent.textContent = "";
  DOM.errTerms.textContent = "";
}

// Individual Field Validations
function validateName() {
  const val = DOM.regName.value.trim();
  const nameRegex = /^[A-Za-z\s.]{3,50}$/;

  if (!val) {
    setFieldError(DOM.regName, DOM.errName, "Full name is required.");
    return false;
  }
  if (!nameRegex.test(val)) {
    setFieldError(DOM.regName, DOM.errName, "Please enter a valid full name (letters only, min 3 chars).");
    return false;
  }
  setFieldSuccess(DOM.regName, DOM.errName);
  return true;
}

function validateEmail() {
  const val = DOM.regEmail.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!val) {
    setFieldError(DOM.regEmail, DOM.errEmail, "Email address is required.");
    return false;
  }
  if (!emailRegex.test(val)) {
    setFieldError(DOM.regEmail, DOM.errEmail, "Enter a valid email address (e.g. name@domain.com).");
    return false;
  }
  setFieldSuccess(DOM.regEmail, DOM.errEmail);
  return true;
}

function validatePhone() {
  const val = DOM.regPhone.value.trim().replace(/\D/g, ""); // digits only

  if (!val) {
    setFieldError(DOM.regPhone, DOM.errPhone, "Phone number is required.");
    return false;
  }
  if (val.length !== 10) {
    setFieldError(DOM.regPhone, DOM.errPhone, "Please enter a valid 10-digit mobile number.");
    return false;
  }
  setFieldSuccess(DOM.regPhone, DOM.errPhone);
  return true;
}

function validateEventSelect() {
  const val = DOM.regEventSelect.value;
  if (!val) {
    setFieldError(DOM.regEventSelect, DOM.errEvent, "Please select an event to register for.");
    return false;
  }
  setFieldSuccess(DOM.regEventSelect, DOM.errEvent);
  return true;
}

function validateTerms() {
  if (!DOM.regTerms.checked) {
    DOM.errTerms.textContent = "You must agree to the terms and code of conduct.";
    return false;
  }
  DOM.errTerms.textContent = "";
  return true;
}

function setFieldError(input, errorLabel, message) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  errorLabel.textContent = message;
}

function setFieldSuccess(input, errorLabel) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  errorLabel.textContent = "";
}

// Form Submission Handler
function handleRegistrationSubmit(e) {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isEventValid = validateEventSelect();
  const isTermsValid = validateTerms();

  if (!isNameValid || !isEmailValid || !isPhoneValid || !isEventValid || !isTermsValid) {
    showToast("Please correct the errors in the form before submitting.", "error");
    return;
  }

  const selectedEventId = DOM.regEventSelect.value;
  const userEmail = DOM.regEmail.value.trim().toLowerCase();

  // Check duplicate registration
  const isDuplicate = state.registrations.some(
    reg => reg.eventId === selectedEventId && reg.email.toLowerCase() === userEmail
  );

  if (isDuplicate) {
    showToast("You are already registered for this event with this email!", "error");
    setFieldError(DOM.regEmail, DOM.errEmail, "Already registered for this event.");
    return;
  }

  // Simulate submission spinner for smooth UX
  const spinner = DOM.submitRegBtn.querySelector(".btn-spinner");
  const btnText = DOM.submitRegBtn.querySelector(".btn-text");
  DOM.submitRegBtn.disabled = true;
  spinner.style.display = "inline-flex";
  btnText.style.display = "none";

  setTimeout(() => {
    // Generate Registration Record
    const targetEvent = state.events.find(evt => evt.id === selectedEventId);
    const regId = "KP-" + Math.floor(100000 + Math.random() * 900000);

    const newRegistration = {
      id: regId,
      eventId: selectedEventId,
      eventTitle: targetEvent.title,
      eventCategory: targetEvent.categoryLabel,
      eventDate: targetEvent.displayDate,
      eventTime: targetEvent.time,
      eventVenue: targetEvent.venue,
      name: DOM.regName.value.trim(),
      email: DOM.regEmail.value.trim(),
      phone: DOM.regPhone.value.trim(),
      role: DOM.regRole.value,
      rollNumber: DOM.regRoll.value.trim() || "N/A",
      notes: DOM.regNotes.value.trim() || "None",
      timestamp: new Date().toLocaleString()
    };

    // Store in State & LocalStorage and broadcast live across all laptops
    state.registrations.unshift(newRegistration);
    saveRegistrationsToStorage("ADD_TICKET", { ticket: newRegistration });

    // Increment event seat count
    if (targetEvent.registeredCount < targetEvent.capacity) {
      targetEvent.registeredCount++;
      renderEvents();
    }

    // Reset button
    DOM.submitRegBtn.disabled = false;
    spinner.style.display = "none";
    btnText.style.display = "inline-flex";

    // Close form and open Ticket modal
    closeModal(DOM.regModal);
    displayETicket(newRegistration);
    playAudioFx("success");
    showToast("Registration successful! Your pass is ready.", "success");
  }, 600);
}

// ============================================================================
// HOST A NEW EVENT HANDLER
// ============================================================================
async function handleHostEventSubmit(e) {
  e.preventDefault();

  const title = document.getElementById("host-title").value.trim();
  const category = document.getElementById("host-category").value;
  const dateVal = document.getElementById("host-date").value;
  const timeVal = document.getElementById("host-time").value;
  const venue = document.getElementById("host-venue").value.trim();
  const capacity = parseInt(document.getElementById("host-capacity").value, 10) || 100;
  const organizer = document.getElementById("host-organizer").value.trim();
  const contact = document.getElementById("host-contact").value.trim();
  const description = document.getElementById("host-desc").value.trim();
  let banner = document.getElementById("host-banner").value.trim();

  if (!title || !category || !dateVal || !venue || !organizer || !description) {
    showToast("Please fill in all required fields to host an event.", "error");
    return;
  }

  // Preset fallback images
  if (!banner) {
    const banners = {
      Tech: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      Cultural: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      Sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
      Workshops: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      Business: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80"
    };
    banner = banners[category] || banners.Tech;
  }

  let formattedDate = dateVal;
  try {
    const d = new Date(dateVal);
    formattedDate = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch (err) {}

  const newEvent = {
    id: "evt-hosted-" + Date.now(),
    title: title,
    category: category,
    categoryLabel: category,
    date: dateVal + "T" + timeVal + ":00",
    displayDate: formattedDate,
    time: timeVal,
    venue: venue,
    capacity: capacity,
    registeredCount: 0,
    price: "Free Pass",
    description: description,
    image: banner,
    tags: [category, "Campus Event", "Live"],
    schedule: [
      { time: timeVal, title: "Opening Ceremony", description: "Inaugural address by " + organizer },
      { time: "TBA", title: "Keynote & Proceedings", description: "Core sessions and activities" }
    ],
    speakers: [
      {
        name: organizer,
        role: "Event Organizer",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      }
    ]
  };

  if (!state.customEvents) state.customEvents = [];
  state.customEvents.unshift(newEvent);
  state.events.unshift(newEvent);

  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_EVENTS, JSON.stringify(state.customEvents));
  } catch (err) {}

  renderEvents();
  populateEventDropdown();
  if (DOM.metricEventsCount) {
    DOM.metricEventsCount.textContent = `${state.events.length}+`;
  }

  // Broadcast live across all laptops
  broadcastCloudMessage({ type: "ADD_EVENT", event: newEvent });

  closeModal(DOM.hostEventModal);
  DOM.hostEventForm.reset();
  showToast(`Event "${title}" published live across all devices!`, "success");

  const evtSec = document.getElementById("events-section");
  if (evtSec) evtSec.scrollIntoView({ behavior: "smooth" });
}

// ============================================================================
// 10. DIGITAL E-TICKET GENERATION & QR DRAWING
// ============================================================================
function displayETicket(reg) {
  DOM.ticketRegId.textContent = reg.id;
  DOM.ticketCategory.textContent = reg.eventCategory.toUpperCase();
  DOM.ticketEventName.textContent = reg.eventTitle;
  DOM.ticketAttendeeName.textContent = reg.name;
  DOM.ticketAttendeeRole.textContent = reg.role;
  DOM.ticketEventDate.textContent = reg.eventDate;
  DOM.ticketEventTime.textContent = reg.eventTime.split("-")[0].trim();
  DOM.ticketEventVenue.textContent = reg.eventVenue;
  DOM.ticketTimestamp.textContent = `Issued: ${reg.timestamp}`;

  // Draw authentic QR Pattern onto canvas
  drawCustomQRCode(DOM.ticketQrCanvas, reg.id + "|" + reg.name);

  // Trigger celebration confetti
  triggerConfetti();

  openModal(DOM.ticketModal);
}

/**
 * Draws a crisp QR code pattern with 3 finder patterns + data grid
 */
function drawCustomQRCode(canvas, dataString) {
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  ctx.clearRect(0, 0, size, size);

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  const gridSize = 21; // 21x21 QR version 1 grid
  const cellSize = size / gridSize;

  // Helper to draw QR finder corners
  function drawFinderPattern(x, y) {
    // Outer black box 7x7
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(x * cellSize, y * cellSize, 7 * cellSize, 7 * cellSize);
    // Inner white box 5x5
    ctx.fillStyle = "#ffffff";
    ctx.fillRect((x + 1) * cellSize, (y + 1) * cellSize, 5 * cellSize, 5 * cellSize);
    // Center black box 3x3
    ctx.fillStyle = "#0f172a";
    ctx.fillRect((x + 2) * cellSize, (y + 2) * cellSize, 3 * cellSize, 3 * cellSize);
  }

  // Draw 3 primary corner finder patterns
  drawFinderPattern(0, 0); // Top-left
  drawFinderPattern(gridSize - 7, 0); // Top-right
  drawFinderPattern(0, gridSize - 7); // Bottom-left

  // Pseudo-random data matrix based on input string hash
  let hash = 0;
  for (let i = 0; i < dataString.length; i++) {
    hash = (hash << 5) - hash + dataString.charCodeAt(i);
    hash |= 0;
  }

  ctx.fillStyle = "#0f172a";
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      // Skip finder zones
      const inTopLeft = r < 8 && c < 8;
      const inTopRight = r < 8 && c >= gridSize - 8;
      const inBottomLeft = r >= gridSize - 8 && c < 8;
      if (inTopLeft || inTopRight || inBottomLeft) continue;

      // Pseudo-random cell fill based on hash coordinates
      const val = Math.abs(Math.sin((r * 13) + (c * 37) + hash));
      if (val > 0.48) {
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }
  }
}

// Particle Confetti Effect
function triggerConfetti() {
  const canvas = DOM.confettiCanvas;
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

  const colors = ["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#06b6d4"];
  const particles = [];
  const particleCount = 60;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 3,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8 - 4,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }

  let animationFrame;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeParticles = 0;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2; // gravity
      p.rotation += p.vRot;
      p.opacity -= 0.015;

      if (p.opacity > 0) {
        activeParticles++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (activeParticles > 0) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  animate();
}

// ============================================================================
// 11. "MY TICKETS" DRAWER (LOCAL STORAGE DASHBOARD)
// ============================================================================
function openMyTicketsDrawer() {
  renderMyTicketsList();
  openModal(DOM.myTicketsModal);
  fetchRecentCloudSync();
}

function renderMyTicketsList(filterQuery = "") {
  let list = [...state.registrations];

  if (filterQuery.trim()) {
    const q = filterQuery.toLowerCase().trim();
    list = list.filter(reg =>
      reg.eventTitle.toLowerCase().includes(q) ||
      reg.id.toLowerCase().includes(q) ||
      reg.name.toLowerCase().includes(q)
    );
  }

  if (list.length === 0) {
    DOM.myTicketsList.innerHTML = "";
    DOM.noTicketsState.style.display = "block";
    return;
  }

  DOM.noTicketsState.style.display = "none";

  DOM.myTicketsList.innerHTML = list.map(reg => `
    <div class="stored-ticket-item" data-reg-id="${reg.id}">
      <div class="stored-ticket-info">
        <h4>${reg.eventTitle}</h4>
        <div class="stored-ticket-meta">
          <span><i class="fa-solid fa-id-badge"></i> Pass: <strong>${reg.id}</strong></span>
          <span><i class="fa-solid fa-user"></i> ${reg.name}</span>
          <span><i class="fa-regular fa-calendar"></i> ${reg.eventDate}</span>
        </div>
      </div>
      <div class="stored-ticket-actions">
        <button type="button" class="btn btn-secondary btn-sm view-pass-btn" data-reg-id="${reg.id}" title="View Boarding Pass">
          <i class="fa-solid fa-qrcode"></i> View Pass
        </button>
        <button type="button" class="btn btn-outline-danger btn-sm cancel-reg-btn" data-reg-id="${reg.id}" title="Cancel Registration">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `).join("");
}

function cancelRegistration(regId) {
  const reg = state.registrations.find(r => r.id === regId);
  if (!reg) return;

  if (confirm(`Are you sure you want to cancel your registration for:\n"${reg.eventTitle}"?`)) {
    state.registrations = state.registrations.filter(r => r.id !== regId);
    saveRegistrationsToStorage("REMOVE_TICKET", { ticketId: regId });

    // Decrease count on event
    const event = state.events.find(e => e.id === reg.eventId);
    if (event && event.registeredCount > 0) {
      event.registeredCount--;
      renderEvents();
    }

    renderMyTicketsList();
    showToast("Registration successfully cancelled.", "info");
  }
}

function clearAllRegistrations() {
  if (state.registrations.length === 0) {
    showToast("You have no registrations to clear.", "info");
    return;
  }

  if (confirm("Are you sure you want to delete ALL your stored event passes? This cannot be undone.")) {
    state.registrations = [];
    saveRegistrationsToStorage("CLEAR_ALL_TICKETS");
    renderMyTicketsList();
    showToast("All passes have been removed.", "info");
  }
}

// ============================================================================
// 12. ORGANIZER / ADMIN ROSTER PANEL
// ============================================================================
function openOrganizerModal() {
  DOM.orgTotalRegs.textContent = state.registrations.length;
  DOM.orgActiveEvents.textContent = state.events.length;
  
  const uniqueEmails = new Set(state.registrations.map(r => r.email.toLowerCase()));
  DOM.orgUniqueAttendees.textContent = uniqueEmails.size;

  if (state.registrations.length === 0) {
    DOM.rosterTableBody.innerHTML = "";
    DOM.rosterEmptyNotice.style.display = "block";
  } else {
    DOM.rosterEmptyNotice.style.display = "none";
    DOM.rosterTableBody.innerHTML = state.registrations.map(reg => `
      <tr>
        <td><strong>${reg.id}</strong></td>
        <td>${reg.name} <br><small class="text-muted">${reg.role}</small></td>
        <td>${reg.email} <br><small class="text-muted">${reg.phone}</small></td>
        <td>${reg.eventTitle}</td>
        <td><span class="badge badge-info">${reg.eventCategory}</span></td>
        <td><small>${reg.timestamp}</small></td>
        <td>
          <button type="button" class="btn btn-secondary btn-sm view-pass-btn" data-reg-id="${reg.id}">
            <i class="fa-solid fa-eye"></i>
          </button>
        </td>
      </tr>
    `).join("");
  }

  openModal(DOM.organizerModal);
}

function exportRosterToCSV() {
  if (state.registrations.length === 0) {
    showToast("No registrations available to export.", "error");
    return;
  }

  const headers = ["Registration ID", "Attendee Name", "Email", "Phone", "Role", "Roll No", "Event Title", "Category", "Event Date", "Venue", "Timestamp"];
  const rows = state.registrations.map(r => [
    `"${r.id}"`,
    `"${r.name}"`,
    `"${r.email}"`,
    `"${r.phone}"`,
    `"${r.role}"`,
    `"${r.rollNumber}"`,
    `"${r.eventTitle}"`,
    `"${r.eventCategory}"`,
    `"${r.eventDate}"`,
    `"${r.eventVenue}"`,
    `"${r.timestamp}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `kpulse_roster_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("Attendee roster exported to CSV!", "success");
}

// ============================================================================
// 13. MODAL CONTROLLER HELPERS
// ============================================================================
function openModal(modal) {
  if (!modal) return;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  state.activeModal = modal;
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  state.activeModal = null;
}

// ============================================================================
// 14. TOAST SYSTEM
// ============================================================================
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let icon = "fa-circle-info";
  if (type === "success") icon = "fa-circle-check";
  if (type === "error") icon = "fa-triangle-exclamation";

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => toast.remove(), 300);
  }, 3600);
}

// ============================================================================
// 15. KEYBOARD SHORTCUTS
// ============================================================================
function setupKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName);

    // Escape closes active modal
    if (e.key === "Escape" && state.activeModal) {
      closeModal(state.activeModal);
      return;
    }

    if (isTyping) return;

    // "/" or Ctrl+K triggers event search
    if (e.key === "/" || (e.ctrlKey && e.key === "k")) {
      e.preventDefault();
      if (DOM.eventSearchInput) {
        DOM.eventSearchInput.focus();
        DOM.eventSearchInput.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    // "?" opens shortcuts cheatsheet
    else if (e.key === "?") {
      e.preventDefault();
      if (DOM.shortcutsModal) {
        if (DOM.shortcutsModal.classList.contains("active")) {
          closeModal(DOM.shortcutsModal);
        } else {
          openModal(DOM.shortcutsModal);
          playAudioFx("click");
        }
      }
    }
    // "T" toggles theme
    else if (e.key === "t" || e.key === "T") {
      e.preventDefault();
      toggleTheme();
    }
    // "M" opens My Tickets
    else if (e.key === "m" || e.key === "M") {
      e.preventDefault();
      openMyTicketsDrawer();
      playAudioFx("click");
    }
    // "H" opens Host Event
    else if (e.key === "h" || e.key === "H") {
      e.preventDefault();
      openModal(DOM.hostEventModal);
      playAudioFx("click");
    }
    // "O" opens Organizer Portal
    else if (e.key === "o" || e.key === "O") {
      e.preventDefault();
      openOrganizerModal();
      playAudioFx("click");
    }
    // "S" toggles Sound
    else if (e.key === "s" || e.key === "S") {
      e.preventDefault();
      toggleSound();
    }
  });
}

// ============================================================================
// 16. EVENT LISTENERS BINDING
// ============================================================================
function initEventListeners() {
  // Theme Toggle
  DOM.themeToggle.addEventListener("click", toggleTheme);

  // Mobile Menu Toggle
  DOM.mobileToggle.addEventListener("click", () => {
    DOM.navMenu.classList.toggle("open");
  });

  // Close mobile menu when clicking nav links
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      DOM.navMenu.classList.remove("open");
    });
  });

  // Search input and clear
  DOM.eventSearchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    DOM.searchClearBtn.style.display = state.searchQuery ? "block" : "none";
    renderEvents();
  });

  DOM.searchClearBtn.addEventListener("click", () => {
    DOM.eventSearchInput.value = "";
    state.searchQuery = "";
    DOM.searchClearBtn.style.display = "none";
    renderEvents();
    DOM.eventSearchInput.focus();
  });

  // Search Shortcut button in navbar
  DOM.searchTrigger.addEventListener("click", () => {
    DOM.eventSearchInput.focus();
    DOM.eventSearchInput.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // Category Pills Filter
  DOM.categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      DOM.categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.currentCategory = pill.getAttribute("data-category");
      renderEvents();
    });
  });

  // Category Browse Tiles in Categories Section
  document.querySelectorAll(".category-tile").forEach(tile => {
    tile.addEventListener("click", () => {
      const cat = tile.getAttribute("data-cat-filter");
      state.currentCategory = cat;
      DOM.categoryPills.forEach(p => {
        p.classList.toggle("active", p.getAttribute("data-category") === cat);
      });
      renderEvents();
      document.getElementById("events-section").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Footer Category links
  document.querySelectorAll("[data-cat-link]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const cat = link.getAttribute("data-cat-link");
      state.currentCategory = cat;
      DOM.categoryPills.forEach(p => {
        p.classList.toggle("active", p.getAttribute("data-category") === cat);
      });
      renderEvents();
      document.getElementById("events-section").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Sort Dropdown
  DOM.eventSortSelect.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderEvents();
  });

  // Reset Filters Link & Empty State Reset
  const resetAllFilters = () => {
    state.currentCategory = "all";
    state.searchQuery = "";
    DOM.eventSearchInput.value = "";
    DOM.searchClearBtn.style.display = "none";
    DOM.categoryPills.forEach(p => p.classList.toggle("active", p.getAttribute("data-category") === "all"));
    renderEvents();
  };
  DOM.resetFiltersBtn.addEventListener("click", resetAllFilters);
  DOM.emptyResetBtn.addEventListener("click", resetAllFilters);

  // View Switchers (Grid vs List)
  DOM.viewGridBtn.addEventListener("click", () => {
    DOM.viewGridBtn.classList.add("active");
    DOM.viewListBtn.classList.remove("active");
    DOM.eventsGrid.classList.remove("list-view");
  });
  DOM.viewListBtn.addEventListener("click", () => {
    DOM.viewListBtn.classList.add("active");
    DOM.viewGridBtn.classList.remove("active");
    DOM.eventsGrid.classList.add("list-view");
  });

  // Dynamic Event Delegation for Cards (View Details & Register)
  document.addEventListener("click", (e) => {
    // "View Details" button
    const viewBtn = e.target.closest(".view-details-btn");
    if (viewBtn) {
      const eventId = viewBtn.getAttribute("data-event-id");
      openEventDetailModal(eventId);
      return;
    }

    // "Register Now" button
    const regBtn = e.target.closest(".register-now-btn");
    if (regBtn) {
      const eventId = regBtn.getAttribute("data-event-id");
      openRegistrationModal(eventId);
      return;
    }

    // View Pass button in My Tickets or Organizer
    const passBtn = e.target.closest(".view-pass-btn");
    if (passBtn) {
      const regId = passBtn.getAttribute("data-reg-id");
      const reg = state.registrations.find(r => r.id === regId);
      if (reg) {
        if (state.activeModal) closeModal(state.activeModal);
        displayETicket(reg);
      }
      return;
    }

    // Cancel Registration button
    const cancelBtn = e.target.closest(".cancel-reg-btn");
    if (cancelBtn) {
      const regId = cancelBtn.getAttribute("data-reg-id");
      cancelRegistration(regId);
      return;
    }

    // Generic modal close buttons
    const closeBtn = e.target.closest("[data-close-modal]");
    if (closeBtn) {
      const modalId = closeBtn.getAttribute("data-close-modal");
      closeModal(document.getElementById(modalId));
      return;
    }
  });

  // Modal Backdrop Click to Close
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Real-time Field Validation Events
  DOM.regName.addEventListener("blur", validateName);
  DOM.regName.addEventListener("input", () => { if (DOM.regName.classList.contains("is-invalid")) validateName(); });

  DOM.regEmail.addEventListener("blur", validateEmail);
  DOM.regEmail.addEventListener("input", () => { if (DOM.regEmail.classList.contains("is-invalid")) validateEmail(); });

  DOM.regPhone.addEventListener("blur", validatePhone);
  DOM.regPhone.addEventListener("input", () => { if (DOM.regPhone.classList.contains("is-invalid")) validatePhone(); });

  DOM.regEventSelect.addEventListener("change", validateEventSelect);
  DOM.regTerms.addEventListener("change", validateTerms);

  // Form Submit
  DOM.regForm.addEventListener("submit", handleRegistrationSubmit);

  // Hero Quick Register Button
  DOM.heroQuickRegBtn.addEventListener("click", () => {
    openRegistrationModal();
  });

  // Host Event Triggers
  if (DOM.hostEventBtn) {
    DOM.hostEventBtn.addEventListener("click", () => openModal(DOM.hostEventModal));
  }
  if (DOM.heroHostEventBtn) {
    DOM.heroHostEventBtn.addEventListener("click", () => openModal(DOM.hostEventModal));
  }
  if (DOM.hostEventForm) {
    DOM.hostEventForm.addEventListener("submit", handleHostEventSubmit);
  }

  // My Tickets Triggers
  DOM.myTicketsBtn.addEventListener("click", openMyTicketsDrawer);
  DOM.footerMyTicketsTrigger.addEventListener("click", openMyTicketsDrawer);
  DOM.viewMyTicketsFromModalBtn.addEventListener("click", () => {
    closeModal(DOM.ticketModal);
    openMyTicketsDrawer();
  });

  // Clear all tickets
  DOM.clearAllTicketsBtn.addEventListener("click", clearAllRegistrations);

  // My Tickets Search
  DOM.ticketsSearchInput.addEventListener("input", (e) => {
    renderMyTicketsList(e.target.value);
  });

  // Organizer Portal
  DOM.navOrganizerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openOrganizerModal();
  });
  DOM.exportCsvBtn.addEventListener("click", exportRosterToCSV);

  // Print Pass
  DOM.printTicketBtn.addEventListener("click", () => {
    window.print();
  });

  // Cloud Sync Actions
  if (DOM.navSyncPill) {
    DOM.navSyncPill.addEventListener("click", triggerManualSync);
  }
  if (DOM.drawerSyncNowBtn) {
    DOM.drawerSyncNowBtn.addEventListener("click", triggerManualSync);
  }
  if (DOM.orgSyncNowBtn) {
    DOM.orgSyncNowBtn.addEventListener("click", triggerManualSync);
  }
  if (DOM.syncRoomDisplay) {
    DOM.syncRoomDisplay.addEventListener("click", () => {
      const current = getSyncRoom();
      const entered = prompt("Enter Cloud Sync Room Code (share with other laptops to sync):", current);
      if (entered && entered.trim() && entered.trim() !== current) {
        setSyncRoom(entered.trim());
      }
    });
  }
  if (DOM.exportTicketsJsonBtn) {
    DOM.exportTicketsJsonBtn.addEventListener("click", exportTicketsJSON);
  }
  if (DOM.importTicketsFileInput) {
    DOM.importTicketsFileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        importTicketsJSON(e.target.files[0]);
        e.target.value = "";
      }
    });
  }

  // Audio FX Toggles
  if (DOM.soundToggle) {
    DOM.soundToggle.addEventListener("click", toggleSound);
  }
  if (DOM.dockSoundBtn) {
    DOM.dockSoundBtn.addEventListener("click", toggleSound);
  }

  // Floating Dock Actions
  if (DOM.dockMyTickets) {
    DOM.dockMyTickets.addEventListener("click", () => {
      openMyTicketsDrawer();
      playAudioFx("click");
    });
  }
  if (DOM.dockHostBtn) {
    DOM.dockHostBtn.addEventListener("click", () => {
      openModal(DOM.hostEventModal);
      playAudioFx("click");
    });
  }
  if (DOM.dockShortcutsBtn) {
    DOM.dockShortcutsBtn.addEventListener("click", () => {
      openModal(DOM.shortcutsModal);
      playAudioFx("click");
    });
  }
  if (DOM.dockTopBtn) {
    DOM.dockTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      playAudioFx("click");
    });
  }

  // Digital Ticket Pass Enhancements
  if (DOM.toggleHoloBtn) {
    DOM.toggleHoloBtn.addEventListener("click", () => {
      const ticketCard = document.getElementById("printable-ticket-content");
      if (ticketCard) {
        ticketCard.classList.toggle("holo-active");
        const isActive = ticketCard.classList.contains("holo-active");
        if (DOM.holoBtnText) {
          DOM.holoBtnText.textContent = isActive ? "Holo: Active ✨" : "Holo Shimmer";
        }
        playAudioFx("click");
      }
    });
  }
  if (DOM.downloadPassImgBtn) {
    DOM.downloadPassImgBtn.addEventListener("click", downloadPassAsImage);
  }

  // Subtle Audio Micro-interactions on buttons & filter pills
  document.addEventListener("click", (e) => {
    if (e.target.closest(".btn, .filter-pill, .dock-item, .view-details-btn, .theme-toggle-btn")) {
      playAudioFx("click");
    }
  });
}

// ============================================================================
// 17. JAW-DROPPING VISUALS & WEB AUDIO SYNTHESIZER ENGINE
// ============================================================================

// Web Audio API Synthesizer (Zero External Dependencies)
let audioCtx = null;
let soundEnabled = localStorage.getItem("kpulse_sound_enabled") !== "false";

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playAudioFx(type) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === "click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.06);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === "success") {
      // 4-Note Major Harmonic Chime (C5, E5, G5, C6)
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        const startTime = now + idx * 0.07;
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.06, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.32);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.32);
      });
    } else if (type === "theme") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    }
  } catch (err) {}
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  localStorage.setItem("kpulse_sound_enabled", soundEnabled);
  updateSoundUI();
  if (soundEnabled) {
    playAudioFx("success");
    showToast("Synthesizer Sound FX Enabled 🔊", "info");
  } else {
    showToast("Sound FX Muted 🔇", "info");
  }
}

function updateSoundUI() {
  const soundBtns = [DOM.soundToggle, DOM.dockSoundBtn];
  soundBtns.forEach(btn => {
    if (!btn) return;
    const onIcon = btn.querySelector(".sound-icon-on");
    const offIcon = btn.querySelector(".sound-icon-off");
    const dockIcon = btn.querySelector(".dock-sound-icon");

    if (soundEnabled) {
      btn.classList.remove("muted");
      btn.title = "Sound Effects: ON (Click to Mute)";
      if (onIcon) onIcon.style.display = "inline-block";
      if (offIcon) offIcon.style.display = "none";
      if (dockIcon) dockIcon.className = "fa-solid fa-volume-high dock-sound-icon";
    } else {
      btn.classList.add("muted");
      btn.title = "Sound Effects: MUTED (Click to Enable)";
      if (onIcon) onIcon.style.display = "none";
      if (offIcon) offIcon.style.display = "inline-block";
      if (dockIcon) dockIcon.className = "fa-solid fa-volume-xmark dock-sound-icon";
    }
  });
}

// Top Scroll Depth Realtime Progress Bar
function initScrollProgress() {
  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    if (DOM.scrollProgressBar) {
      DOM.scrollProgressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
    }
  }, { passive: true });
}

// Interactive Hero Constellation & Aurora Particle Canvas
function initHeroParticleCanvas() {
  const canvas = DOM.heroCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const parent = canvas.parentElement;
  let width = (canvas.width = parent.offsetWidth || window.innerWidth);
  let height = (canvas.height = parent.offsetHeight || 600);

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 20), 65);
  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener("resize", () => {
    if (!parent) return;
    width = canvas.width = parent.offsetWidth || window.innerWidth;
    height = canvas.height = parent.offsetHeight || 600;
  });

  parent.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  parent.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.7;
      this.speedY = (Math.random() - 0.5) * 0.7;
      const palette = ["#ec4899", "#6366f1", "#06b6d4", "#a855f7"];
      this.color = palette[Math.floor(Math.random() * palette.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > width) this.x = 0;
      else if (this.x < 0) this.x = width;
      if (this.y > height) this.y = 0;
      else if (this.y < 0) this.y = height;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 1.6;
          this.y += (dy / dist) * force * 1.6;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          const opacity = (1 - dist / 115) * 0.22;
          ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
      particles[a].update();
      particles[a].draw();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// 3D Interactive Card Parallax Tilt & Cursor Specular Light
function init3DCardTilt() {
  document.addEventListener("mousemove", (e) => {
    const card = e.target.closest(".event-card, .floating-spotlight-card, .featured-banner-card");
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });

  document.addEventListener("mouseout", (e) => {
    const card = e.target.closest(".event-card, .floating-spotlight-card, .featured-banner-card");
    if (!card) return;
    if (!card.contains(e.relatedTarget)) {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    }
  });
}

// Direct High-Resolution Ticket Card Download as PNG
function downloadPassAsImage() {
  const reg = state.registrations[0];
  const title = reg ? reg.eventTitle : "K-PULSE Event Pass";
  const attendee = reg ? reg.name : "Attendee";
  const passId = reg ? reg.id : "KP-PASS";
  const category = reg ? (reg.eventCategory || "Campus Event") : "Campus Event";
  const venue = reg ? reg.eventVenue : "Campus Center";
  const dateTime = reg ? (reg.eventDate + " • " + reg.eventTime) : "Nov 2026";

  const canvas = document.createElement("canvas");
  canvas.width = 960;
  canvas.height = 440;
  const ctx = canvas.getContext("2d");

  // Rich Dark Gradient Background
  const bgGrad = ctx.createLinearGradient(0, 0, 960, 440);
  bgGrad.addColorStop(0, "#0b0f19");
  bgGrad.addColorStop(0.4, "#151e36");
  bgGrad.addColorStop(1, "#0d1322");
  ctx.fillStyle = bgGrad;
  if (ctx.roundRect) ctx.roundRect(0, 0, 960, 440, 24);
  else ctx.rect(0, 0, 960, 440);
  ctx.fill();

  // Outer Neon Shimmer Border
  ctx.strokeStyle = "#8b5cf6";
  ctx.lineWidth = 4;
  ctx.stroke();

  // Left Ticket Stub Perforation
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.beginPath();
  ctx.moveTo(280, 0);
  ctx.lineTo(280, 440);
  ctx.stroke();
  ctx.setLineDash([]);

  // Draw QR Code from DOM canvas if ready
  if (DOM.ticketQrCanvas) {
    ctx.drawImage(DOM.ticketQrCanvas, 55, 100, 170, 170);
  }

  // Left Stub Text
  ctx.fillStyle = "#a855f7";
  ctx.font = "bold 20px 'Space Grotesk', sans-serif";
  ctx.fillText("K-PULSE PASS", 70, 64);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 16px monospace";
  ctx.fillText(passId, 85, 305);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "12px sans-serif";
  ctx.fillText("Scan at entry gate", 85, 335);

  // Right Stub Content
  ctx.fillStyle = "#10b981";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("● VERIFIED DIGITAL BOARDING PASS", 310, 60);

  ctx.fillStyle = "#ec4899";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText(category.toUpperCase(), 740, 60);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 26px sans-serif";
  ctx.fillText(title.length > 34 ? title.substring(0, 34) + "..." : title, 310, 115);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "13px sans-serif";
  ctx.fillText("ATTENDEE NAME", 310, 180);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText(attendee, 310, 210);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "13px sans-serif";
  ctx.fillText("BOOKING STATUS", 670, 180);
  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText("CONFIRMED", 670, 210);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "13px sans-serif";
  ctx.fillText("DATE & TIME", 310, 275);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 18px sans-serif";
  ctx.fillText(dateTime, 310, 305);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "13px sans-serif";
  ctx.fillText("VENUE LOCATION", 310, 360);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 16px sans-serif";
  ctx.fillText(venue, 310, 388);

  // Trigger download
  const link = document.createElement("a");
  link.download = `kpulse_pass_${passId}.png`;
  link.href = canvas.toDataURL("image/png");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  playAudioFx("success");
  showToast("High-resolution pass card saved as PNG!", "success");
}

