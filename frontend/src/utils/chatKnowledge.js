const normalizeMessage = (message) =>
  String(message || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s/?-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const websiteContext = [
  "EnerLuma is a smart energy and water monitoring platform.",
  "Public pages: /, /about, /services, /how-it-works, /contact, /login, /signup.",
  "Dashboard pages: /dashboard, /dashboard/insights, /dashboard/energy, /dashboard/water, /dashboard/devices, /dashboard/alerts, /dashboard/sustainability, /dashboard/settings.",
  "Core dashboard sections: Energy, Water, Devices, Alerts, Sustainability, AI Insights, Settings.",
  "Smart dashboard overview includes quick status for energy, water, alerts, and efficiency score.",
  "Energy analytics includes usage trends, consumption patterns, and AI-based efficiency insights.",
  "Water analytics includes usage tracking, anomaly detection, and conservation-focused insights.",
  "The assistant should guide users to the correct page paths and explain key features clearly.",
].join(" ");

const assistantIntents = [
  {
    keys: ["what is", "about", "enerluma", "project", "website"],
    reply:
      "EnerLuma is a smart energy and water intelligence platform for tracking usage, surfacing AI insights, and reducing waste through actionable recommendations.",
  },
  {
    keys: ["home", "landing", "main page"],
    reply:
      "Start at the landing page (/). It highlights the hero section, product overview, services, manifesto, how-it-works flow, and contact section.",
  },
  {
    keys: ["features", "functions", "what can", "does it do", "what features do i get"],
    reply:
      "Core features include a smart dashboard overview, energy analytics, water analytics, device monitoring, alerts, sustainability tracking, and AI recommendations, plus login and dashboard views.",
  },
  {
    keys: ["login", "log in", "sign in", "authenticate"],
    reply: "Use /login to sign in, then open /dashboard to access monitoring and insights.",
  },
  {
    keys: ["signup", "register", "create account"],
    reply: "Use /signup to create an account, then continue to /dashboard.",
  },
  {
    keys: ["dashboard", "overview"],
    reply:
      "Use /dashboard for the main overview. From there, navigate to Energy, Water, Devices, Alerts, Sustainability, AI Insights, and Settings.",
  },
  {
    keys: ["energy"],
    reply: "Open /dashboard/energy for detailed energy analytics, trends, and usage insights.",
  },
  {
    keys: ["water"],
    reply: "Open /dashboard/water for detailed water analytics, trends, and conservation insights.",
  },
  {
    keys: ["devices", "device"],
    reply: "Open /dashboard/devices to view devices and status. Device details are available under /dashboard/devices/:deviceId.",
  },
  {
    keys: ["alerts", "notifications", "warning"],
    reply: "Open /dashboard/alerts to review active alerts, severity, and history.",
  },
  {
    keys: ["sustainability", "eco", "carbon"],
    reply: "Open /dashboard/sustainability for environmental impact and sustainability metrics.",
  },
  {
    keys: ["insights", "ai insights", "recommendations"],
    reply: "Open /dashboard/insights to view AI recommendations and behavior insights.",
  },
  {
    keys: ["settings", "profile", "preferences"],
    reply: "Open /dashboard/settings to manage account and app preferences.",
  },
  {
    keys: ["about"],
    reply: "Use /about for the product background and mission.",
  },
  {
    keys: ["services"],
    reply: "Use /services to explore platform capabilities and value.",
  },
  {
    keys: ["how it works", "workflow"],
    reply: "Use /how-it-works to understand data flow, analytics, and how recommendations are generated.",
  },
  {
    keys: ["contact", "support", "help", "email"],
    reply: "Use /contact for support and business inquiries.",
  },
];

const assistantSuggestions = [
  "What is EnerLuma?",
  "What features do I get?",
  "How do I log in?",
  "Where is the dashboard?",
];

const routeHints = [
  { keys: ["dashboard"], path: "/dashboard", label: "Dashboard Overview" },
  { keys: ["energy"], path: "/dashboard/energy", label: "Energy" },
  { keys: ["water"], path: "/dashboard/water", label: "Water" },
  { keys: ["devices", "device"], path: "/dashboard/devices", label: "Devices" },
  { keys: ["alerts"], path: "/dashboard/alerts", label: "Alerts" },
  { keys: ["sustainability", "eco", "carbon"], path: "/dashboard/sustainability", label: "Sustainability" },
  { keys: ["insights", "ai"], path: "/dashboard/insights", label: "AI Insights" },
  { keys: ["settings", "profile"], path: "/dashboard/settings", label: "Settings" },
  { keys: ["login", "sign in", "log in"], path: "/login", label: "Login" },
  { keys: ["signup", "register"], path: "/signup", label: "Signup" },
  { keys: ["about"], path: "/about", label: "About" },
  { keys: ["services"], path: "/services", label: "Services" },
  { keys: ["how it works", "workflow"], path: "/how-it-works", label: "How It Works" },
  { keys: ["contact", "support", "help"], path: "/contact", label: "Contact" },
];

function findRouteHint(cleanedMessage) {
  for (const hint of routeHints) {
    if (hint.keys.some((key) => cleanedMessage.includes(key))) {
      return hint;
    }
  }

  return null;
}

function getSmartLocalReply(message) {
  const cleaned = normalizeMessage(message);

  for (const item of assistantIntents) {
    if (item.keys.some((key) => cleaned.includes(key))) {
      const routeHint = findRouteHint(cleaned);
      if (!routeHint) {
        return item.reply;
      }

      return `${item.reply} You can open ${routeHint.label} at ${routeHint.path}.`;
    }
  }

  const routeHint = findRouteHint(cleaned);
  if (routeHint) {
    return `You can open ${routeHint.label} at ${routeHint.path}. I can also explain what you can do on that page.`;
  }

  return [
    "I can help with questions about EnerLuma pages, dashboard sections, and core features.",
    "Try asking about /dashboard, /dashboard/energy, /dashboard/water, /dashboard/devices, /dashboard/alerts, /dashboard/sustainability, /dashboard/insights, or /contact.",
  ].join(" ");
}

export {
  assistantIntents,
  assistantSuggestions,
  routeHints,
  websiteContext,
  normalizeMessage,
  getSmartLocalReply,
};