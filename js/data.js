/**
 * K-PULSE Events - Official Event Dataset
 * Realistic, diverse event catalog tailored for modern event exploration & registration.
 */

const INITIAL_EVENTS = [
  {
    id: "evt-innovatex-2026",
    title: "InnovateX 2026: 36-Hour National Hackathon",
    category: "tech",
    categoryLabel: "Tech & Hackathons",
    badge: "Trending",
    badgeType: "hot",
    date: "2026-11-20T09:00:00",
    displayDate: "Nov 20 - 22, 2026",
    time: "09:00 AM - 09:00 PM IST",
    venue: "Innovation Hub & Convention Center, Campus 6",
    city: "Bhubaneswar, Odisha",
    mode: "In-Person",
    price: "Free Registration",
    capacity: 250,
    registeredCount: 198,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "A flagship 36-hour code marathon bringing together 500+ student developers to build AI, Web3, and GreenTech solutions.",
    fullDescription: "InnovateX 2026 is our premier annual hackathon designed to empower student engineers, designers, and innovators. Compete across three tracks—Autonomous AI Systems, Climate-Tech Solutions, and Decentralized Infrastructure—with mentorship from top engineering leads at Google, Microsoft, and high-growth startups. Over ₹3,00,000 in cash prizes and incubation grants await winning teams.",
    schedule: [
      { time: "Day 1 - 09:00 AM", activity: "Check-in, Team Badging & Breakfast" },
      { time: "Day 1 - 10:30 AM", activity: "Opening Keynote & Problem Statements Reveal" },
      { time: "Day 1 - 12:00 PM", activity: "Hacking Begins & Mentor Matching" },
      { time: "Day 2 - 08:00 PM", activity: "Code Freeze & Pre-Judging Demos" },
      { time: "Day 3 - 11:00 AM", activity: "Grand Finale Pitches & Award Ceremony" }
    ],
    speakers: [
      { name: "Dr. Arvind Ray", role: "VP of Engineering", org: "NeuralAI Labs", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
      { name: "Pooja Hegde", role: "Product Lead", org: "CloudScale India", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" }
    ],
    tags: ["Hackathon", "AI", "Cash Prizes", "Mentorship"]
  },
  {
    id: "evt-harmonics-fest-2026",
    title: "Harmonics Echo: Inter-University Music Festival",
    category: "cultural",
    categoryLabel: "Cultural & Music",
    badge: "Selling Fast",
    badgeType: "warning",
    date: "2026-11-28T17:30:00",
    displayDate: "Nov 28, 2026",
    time: "05:30 PM - 11:00 PM IST",
    venue: "Open Air Amphitheatre, Campus Green Grounds",
    city: "Bhubaneswar, Odisha",
    mode: "In-Person",
    price: "₹150 (Pass Included)",
    capacity: 1200,
    registeredCount: 1040,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "An electrifying evening of indie bands, classical fusion, acoustic showcases, and headline DJ sets under the stars.",
    fullDescription: "Harmonics Echo is the biggest cultural spectacle of the winter semester! Experience breathtaking musical battles between 14 top college bands, soul-stirring solo vocals, and an explosive headlining DJ concert with synchronized laser and light choreography. Food stalls, merchandise kiosks, and photo booths will be available throughout the arena.",
    schedule: [
      { time: "05:30 PM", activity: "Gates Open & Acoustic Busking Sessions" },
      { time: "06:15 PM", activity: "Inter-College Battle of the Bands" },
      { time: "08:45 PM", activity: "Fusion Orchestra Showcase" },
      { time: "09:30 PM", activity: "Headline Indie Artist & DJ Rave Set" }
    ],
    speakers: [
      { name: "Rishi & The Echoes", role: "Headlining Indie Ensemble", org: "Mumbai", avatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80" }
    ],
    tags: ["Live Music", "DJ Night", "Bands", "Nightlife"]
  },
  {
    id: "evt-cyberclash-esports-2026",
    title: "CyberClash: Esports Valorant & BGMI Cup",
    category: "sports",
    categoryLabel: "Sports & Gaming",
    badge: "Free Entry",
    badgeType: "success",
    date: "2026-12-05T11:00:00",
    displayDate: "Dec 05 - 06, 2026",
    time: "11:00 AM - 07:00 PM IST",
    venue: "High-Performance Computing Arena, Room 402",
    city: "Hybrid (LAN + Live Stream)",
    mode: "Hybrid",
    price: "Free Entry",
    capacity: 160,
    registeredCount: 142,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Compete in the ultimate tactical LAN clash. 32 teams battle in double-elimination brackets with live shoutcasting.",
    fullDescription: "Assemble your squad and drop into CyberClash 2026. Featuring 5v5 tactical shooter brackets for Valorant and custom squads for BGMI, this tournament boasts ultra-low latency optical fiber setups, high-refresh rate displays, professional casting on Twitch & YouTube, and exclusive gaming peripherals sponsorship prizes.",
    schedule: [
      { time: "11:00 AM", activity: "LAN Setup Verification & Captains' Briefing" },
      { time: "11:45 AM", activity: "Round of 32 Elimination Matches" },
      { time: "03:30 PM", activity: "Quarter-Finals & Semifinals" },
      { time: "05:30 PM", activity: "Grand Finals (Best of 3) & Shoutcaster Desk" }
    ],
    speakers: [
      { name: "Sameer 'Viper' Joshi", role: "Pro Shoutcaster & Analyst", org: "Esports India", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }
    ],
    tags: ["Esports", "Valorant", "BGMI", "Gaming Gear"]
  },
  {
    id: "evt-designcraft-ux-2026",
    title: "DesignCraft: Modern UI/UX & Motion Systems",
    category: "workshops",
    categoryLabel: "Workshops & Seminars",
    badge: "Certified",
    badgeType: "info",
    date: "2026-12-12T14:00:00",
    displayDate: "Dec 12, 2026",
    time: "02:00 PM - 06:30 PM IST",
    venue: "Auditorium Seminar Hall B, Campus 3",
    city: "Bhubaneswar, Odisha",
    mode: "In-Person",
    price: "₹99 (Kit + Certificate)",
    capacity: 100,
    registeredCount: 88,
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Hands-on masterclass covering Figma component tokens, micro-interactions, motion curves, and UX heuristics.",
    fullDescription: "Level up your design skills beyond basic layouts. Learn how top tech companies build scalable design tokens, implement WCAG 2.2 accessibility standards, and animate UI components with fluid cubic-bezier curves. Every attendee walks away with a portfolio-ready responsive design system and a verified Certificate of Completion.",
    schedule: [
      { time: "02:00 PM", activity: "Design Thinking & Information Architecture" },
      { time: "03:15 PM", activity: "Hands-on Figma Auto-Layout & Variables Workshop" },
      { time: "04:45 PM", activity: "Framer Motion & CSS Animation Masterclass" },
      { time: "06:00 PM", activity: "Live Portfolio Critiques & Q&A Session" }
    ],
    speakers: [
      { name: "Ananya Deshmukh", role: "Principal Product Designer", org: "Swiggy Design Studio", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" }
    ],
    tags: ["UI/UX", "Figma", "Design Systems", "Certificate"]
  },
  {
    id: "evt-ventureforge-startup-2026",
    title: "VentureForge: Student Startup & Angel Pitch Fest",
    category: "business",
    categoryLabel: "Business & Pitch",
    badge: "High Impact",
    badgeType: "hot",
    date: "2026-12-18T10:00:00",
    displayDate: "Dec 18, 2026",
    time: "10:00 AM - 04:30 PM IST",
    venue: "Technology Business Incubator (TBI) Center",
    city: "Bhubaneswar, Odisha",
    mode: "In-Person",
    price: "Free Registration",
    capacity: 180,
    registeredCount: 115,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Pitch your disruptive venture to prominent angel investors, venture capitalists, and alumni founders for pre-seed grants.",
    fullDescription: "VentureForge connects promising collegiate founders with real capital. 12 shortlisted student startups will pitch live on stage in front of a jury of venture capitalists and angel operators. Includes keynotes on early-stage unit economics, legal structuring for founders, and an exclusive networking mixer.",
    schedule: [
      { time: "10:00 AM", activity: "Keynote: Zero to One for College Founders" },
      { time: "11:15 AM", activity: "First Half: FinTech & EdTech Pitches" },
      { time: "01:30 PM", activity: "Investor Luncheon & Networking Tables" },
      { time: "02:45 PM", activity: "Second Half: HealthTech & CleanTech Pitches" },
      { time: "04:00 PM", activity: "Term Sheet & Grant Announcements" }
    ],
    speakers: [
      { name: "Vikramaditya Sengupta", role: "Managing Partner", org: "BluePeak Ventures", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
      { name: "Ritika Sen", role: "Co-Founder & CEO", org: "AgroSync", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" }
    ],
    tags: ["Startup", "Pitch", "Venture Capital", "Networking"]
  },
  {
    id: "evt-neon-night-marathon-2026",
    title: "GlowRun: 10K Campus Neon Night Marathon",
    category: "sports",
    categoryLabel: "Sports & Gaming",
    badge: "Popular",
    badgeType: "hot",
    date: "2026-12-22T19:00:00",
    displayDate: "Dec 22, 2026",
    time: "07:00 PM - 10:30 PM IST",
    venue: "Main Stadium Track & Perimeter Boulevard",
    city: "Bhubaneswar, Odisha",
    mode: "In-Person",
    price: "₹120 (Includes Neon T-Shirt & Bib)",
    capacity: 500,
    registeredCount: 460,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "A vibrant 10K/5K night run illuminated with UV blacklights, neon body paints, cheer squads, and hydration DJ stops.",
    fullDescription: "Put on your running shoes and illuminate the night! GlowRun is open to runners, joggers, and walkers of all fitness levels. Complete the 5K recreational loop or challenge yourself to the 10K timed circuit through scenic campus boulevards lined with fluorescent light tunnels and live percussionists. Finisher medals and refreshments for all participants.",
    schedule: [
      { time: "07:00 PM", activity: "Bib Collection & Neon Paint Stations" },
      { time: "07:45 PM", activity: "Zumba Warmup & Safety Briefing" },
      { time: "08:15 PM", activity: "10K & 5K Flag-Off" },
      { time: "09:45 PM", activity: "Podium Ceremony & Post-Run Cool-down DJ" }
    ],
    speakers: [
      { name: "Coach Rajesh Mohapatra", role: "National Athletics Trainer", org: "Sports Authority", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80" }
    ],
    tags: ["Marathon", "Fitness", "Neon Party", "Finisher Medal"]
  },
  {
    id: "evt-ai-robotics-summit-2027",
    title: "RoboVanguard: Autonomous Robotics & AI Expo",
    category: "tech",
    categoryLabel: "Tech & Hackathons",
    badge: "Featured",
    badgeType: "hot",
    date: "2027-01-08T10:00:00",
    displayDate: "Jan 08 - 09, 2027",
    time: "10:00 AM - 05:00 PM IST",
    venue: "Mechanical & Robotics Research Wing, Campus 8",
    city: "Bhubaneswar, Odisha",
    mode: "In-Person",
    price: "Free Registration",
    capacity: 300,
    registeredCount: 210,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Witness cutting-edge quadrupeds, autonomous drones, humanoid robotics demonstrations, and edge AI hardware.",
    fullDescription: "RoboVanguard brings industry leaders, researchers, and robotics hobbyists together. Features a quad-legged robot obstacle arena, autonomous FPV drone racing showcase, and live interactive workshops on ROS2, NVIDIA Jetson, and vision-language navigation models.",
    schedule: [
      { time: "10:00 AM", activity: "Keynote: Embodied AI and the Next Era of Robotics" },
      { time: "11:30 AM", activity: "Autonomous Drone Race Exhibition" },
      { time: "02:00 PM", activity: "ROS2 & Edge Compute Hands-on Lab" },
      { time: "04:00 PM", activity: "Quadruped Agile Obstacle Challenge" }
    ],
    speakers: [
      { name: "Dr. Elena Vance", role: "Robotics Research Director", org: "CyberMotion Labs", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" }
    ],
    tags: ["Robotics", "Drones", "AI", "ROS2"]
  },
  {
    id: "evt-lens-and-light-workshop-2027",
    title: "Framed: Documentary Photography & Visual Storytelling",
    category: "cultural",
    categoryLabel: "Cultural & Music",
    badge: "Limited Seats",
    badgeType: "warning",
    date: "2027-01-16T13:30:00",
    displayDate: "Jan 16, 2027",
    time: "01:30 PM - 06:00 PM IST",
    venue: "School of Mass Communication & Media Lab",
    city: "Bhubaneswar, Odisha",
    mode: "In-Person",
    price: "₹75 (Field Pass)",
    capacity: 60,
    registeredCount: 52,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Master manual exposure, street portraiture lighting, composition geometry, and Adobe Lightroom color grading.",
    fullDescription: "A specialized, intensive masterclass for aspiring photographers, journalists, and visual artists. Features an outdoor photowalk around temple architectures and campus life, followed by a live desktop grading session where instructors review every attendee's photos individually.",
    schedule: [
      { time: "01:30 PM", activity: "Fundamentals: Framing, Shadow, & Shutter Discipline" },
      { time: "02:45 PM", activity: "Guided Photowalk & Natural Light Portraits" },
      { time: "04:30 PM", activity: "Lightroom Color Theory & RAW Processing" },
      { time: "05:30 PM", activity: "Photo Critique & Best Shot Awards" }
    ],
    speakers: [
      { name: "Tanmay Bhattacharya", role: "National Geographic Contributor", org: "LensCulture", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }
    ],
    tags: ["Photography", "Storytelling", "Lightroom", "Masterclass"]
  }
];

