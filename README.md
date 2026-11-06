# K-PULSE

**Author:** Shreyan Dutta

**K Explore – Web Designing**

**Title: Design and Develop a Responsive Event Management Website**

---

## Project Explanation

**K-PULSE** is a responsive, client-side event management web platform engineered to provide a seamless end-to-end event discovery, inspection, and registration experience for campus communities. 

The application serves as a centralized hub connecting attendees with institutional events—spanning technical summits, cultural festivals, athletic tournaments, hands-on workshops, and business conclaves. Users can browse events, explore schedules and speaker lineups, filter by category or search in real time, register through a validated booking interface, and receive an instant digital boarding pass complete with an interactive QR code.

The primary objective is to deliver a fast, responsive, and accessible user experience built entirely on modern vanilla web standards, without relying on third-party frameworks or heavy external libraries.

---

## Implementation Details

### 1. Architecture & Tech Stack

- **HTML5**: Semantic markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<dialog>`, `<footer>`) ensuring document hierarchy, accessibility, and clean DOM structuring.
- **CSS3**: A custom design system leveraging CSS custom properties (variables) for theme tokens, Flexbox and CSS Grid for layout management, glassmorphism (`backdrop-filter`), smooth CSS transitions, and fine-tuned media queries for complete responsiveness across mobile, tablet, and desktop viewports.
- **JavaScript (ES6+)**: Modular vanilla JavaScript controlling dynamic DOM rendering, event listeners, state synchronization, client-side form validation, and persistence.

---

### 2. Core Functional Modules

#### A. Event Catalog & Discovery Engine
- **Centralized Data Model (`js/data.js`)**: An organized collection of event objects detailing titles, categories, dates, venues, capacity, pricing, agendas, and speaker profiles.
- **Dynamic Card Rendering**: Events are injected dynamically into the DOM with status badges, capacity meters, countdowns, and quick-action buttons.
- **Category Filtering**: Interactive filter pills allowing instant segregation into Tech, Cultural, Sports, Workshops, and Business categories.
- **Live Search**: Real-time keyword matching across event titles, descriptions, venues, and tags with hotkey support (`/` or `Ctrl + K`).
- **Sorting & View Switching**: Capability to sort by upcoming date, popularity, or alphabetical order, alongside Grid and List view switching.

#### B. Event Details & Scheduling Modal
- An interactive overlay presenting comprehensive information about selected events:
  - Event synopsis, timeline schedule, venue specifications, and speaker profiles.
  - Synchronized real-time countdown timer tracking the time remaining until event commencement.

#### C. Registration & Client-Side Validation
- **Form Interface**: A modal-driven registration form collecting attendee details (Full Name, Email Address, Phone Number, Selected Event, Attendee Role, and Roll/ID Number).
- **Validation Engine**:
  - Full Name validation ensuring valid alphabetical character patterns.
  - RFC-compliant email address validation.
  - Strict 10-digit mobile number formatting.
  - Duplicate registration detection against previously booked passes.
  - Required agreement to the event code of conduct.

#### D. Digital Boarding Pass & QR Code Generation
- Upon valid registration submission, a digital ticket is generated and displayed.
- Dynamic 2D canvas-based QR code encoding the unique ticket reference ID, attendee name, and event metadata.
- Built-in print/export option enabling users to download or print their pass.

#### E. State Persistence & LocalStorage
- **My Tickets Drawer**: Attendees can view, search, review, and cancel their active bookings at any time.
- Data persists in the browser via the HTML5 `localStorage` API, maintaining ticket state across page refreshes and browser sessions.

#### F. Dark / Light Theme System
- Integrated theme switcher toggling between dark mode and light mode.
- User preference is saved in `localStorage` and automatically defaults to the system's `prefers-color-scheme`.
