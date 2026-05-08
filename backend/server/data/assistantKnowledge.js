export const websiteContext = [
    "EnerLuma is a comprehensive smart energy and water intelligence platform designed specifically to help users track their utility usage, reduce costs, and lower their environmental footprint.",
    "Core Features:",
    "- Automated Utility Syncing: Connect with major Indian providers like BESCOM, TNEB, Adani, Tata Power, BWSSB, and Delhi Jal Board to automatically fetch usage data without manual entry.",
    "- Smart Dashboard: A unified view of live resource consumption, active alerts, and an overall efficiency eco-score.",
    "- Deep Analytics: Analyze consumption patterns with hourly peak analysis, weekly trends, and appliance category breakdowns (Cooling, Lighting, Kitchen, etc.).",
    "- AI Recommendations: Gemini-powered insights that analyze your habits and suggest actionable ways to save money and reduce carbon emissions.",
    "- Real-time Alerts: Set personalized thresholds for energy (kWh) and water (Liters) to receive instant warnings before you exceed your limits.",
    "- Sustainability Tracking: Translates utility usage into tangible environmental metrics like 'Trees Equivalent', 'Car km Equivalent', and monthly CO2 trends compared to community averages.",
    "The platform is divided into: Dashboard, Energy, Water, Alerts, Analytics, AI Insights, Sustainability, and Settings.",
    "The assistant should be highly encouraging, provide detailed context about these features, and guide users to the right pages."
].join(" ");

export const assistantIntents = [
    {
        keys: ["what is", "about", "enerluma", "project", "website"],
        reply:
            "EnerLuma is an advanced energy and water monitoring platform. It connects directly to your utility providers to track your consumption in real-time, surfaces AI-powered insights to help you cut down on bills, and tracks your environmental carbon footprint.",
    },
    {
        keys: ["providers", "supported", "bescom", "tneb", "utility", "connect", "link account"],
        reply:
            "EnerLuma supports automated syncing with major Indian utility providers! For energy, we support BESCOM (Bangalore), TNEB (Tamil Nadu), Adani Electricity (Mumbai), and Tata Power. For water, we support BWSSB and Delhi Jal Board. You can link these from the Energy or Water dashboard tabs.",
    },
    {
        keys: ["save", "reduce bill", "save money", "efficiency", "optimization"],
        reply:
            "To save money, check out the AI Insights tab! Our system analyzes your peak usage hours and appliance distribution to give you personalized recommendations. Small changes, like adjusting your AC during peak hours, can lead to significant monthly savings.",
    },
    {
        keys: ["ai", "how does ai work", "insights", "recommendations"],
        reply:
            "Our AI uses Google's Gemini models to analyze your historical usage data against local weather patterns and community averages. It identifies anomalies, forecasts your next bill, and suggests actionable tips to optimize your energy and water efficiency.",
    },
    {
        keys: ["sustainability", "eco", "carbon", "environment", "footprint"],
        reply:
            "EnerLuma goes beyond just saving money. The Sustainability tab translates your usage into a tangible Carbon Footprint (kg of CO2). We show you how your usage compares to community averages and provide 'Trees Equivalent' and 'Car km Equivalent' metrics to help you visualize your environmental impact.",
    },
    {
        keys: ["home", "landing", "main page"],
        reply:
            "Start at the landing page (/). It highlights the hero section, product overview, services, manifesto, how-it-works flow, and contact section.",
    },
    {
        keys: ["features", "functions", "what can", "does it do", "what features do i get"],
        reply:
            "You get automated utility syncing, real-time alerts for when you exceed usage thresholds, deep visual analytics (category breakdown, peak hours), AI-driven cost-saving recommendations, and detailed sustainability tracking.",
    },
    {
        keys: ["login", "log in", "sign in", "authenticate"],
        reply: "Use /login to sign in (we support Google, Apple, and Email auth), then open /dashboard to access your data.",
    },
    {
        keys: ["signup", "register", "create account"],
        reply: "Use /signup to create an account and start optimizing your home's efficiency.",
    },
    {
        keys: ["dashboard", "overview"],
        reply:
            "Use /dashboard for the main overview. From there, navigate to Energy, Water, Alerts, Analytics, AI Insights, Sustainability, and Settings using the sidebar.",
    },
    {
        keys: ["energy"],
        reply: "Open /dashboard/energy to link your electricity provider and view automated syncing status.",
    },
    {
        keys: ["water"],
        reply: "Open /dashboard/water to link your water provider and monitor your hydration and leak status.",
    },
    {
        keys: ["analytics", "charts", "graphs", "usage history"],
        reply: "Open /dashboard/analytics for a deep dive into your usage. You'll see monthly trends, appliance category breakdowns, and peak hour analysis to help you shift loads.",
    },
    {
        keys: ["alerts", "notifications", "warning", "thresholds"],
        reply: "Open /dashboard/alerts to set custom monthly limits for your Energy (kWh) and Water (Liters). We'll notify you when you get close to exceeding them.",
    },
    {
        keys: ["settings", "profile", "preferences", "password"],
        reply: "Open /dashboard/settings to manage your personal info, change your password, update currency preferences, or delete your account.",
    },
    {
        keys: ["about"],
        reply: "Use /about to read the EnerLuma story and our mission to create sustainable households.",
    },
    {
        keys: ["how it works", "workflow"],
        reply: "Use /how-it-works to understand how we securely connect to your providers and generate insights.",
    },
    {
        keys: ["contact", "support", "help", "email"],
        reply: "Use /contact if you need technical support or have business inquiries.",
    },
];

export const assistantSuggestions = [
    "What is EnerLuma?",
    "How can I reduce my bills?",
    "What providers are supported?",
    "How does the AI work?",
];

export const routeHints = [
    { keys: ["dashboard"], path: "/dashboard", label: "Dashboard Overview" },
    { keys: ["energy"], path: "/dashboard/energy", label: "Energy Sync" },
    { keys: ["water"], path: "/dashboard/water", label: "Water Sync" },
    { keys: ["alerts", "threshold"], path: "/dashboard/alerts", label: "Alerts" },
    { keys: ["analytics", "charts"], path: "/dashboard/analytics", label: "Analytics" },
    { keys: ["sustainability", "eco", "carbon"], path: "/dashboard/sustainability", label: "Sustainability" },
    { keys: ["insights", "ai"], path: "/dashboard/insights", label: "AI Insights" },
    { keys: ["settings", "profile", "password"], path: "/dashboard/settings", label: "Settings" },
    { keys: ["login", "log in", "sign in"], path: "/login", label: "Login" },
    { keys: ["signup", "register"], path: "/signup", label: "Signup" },
    { keys: ["about"], path: "/about", label: "About" },
    { keys: ["contact", "support", "help"], path: "/contact", label: "Contact" },
];
