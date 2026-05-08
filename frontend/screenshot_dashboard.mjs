/**
 * EnerLuma Dashboard Screenshot Tool
 * Navigates to each dashboard page and saves real screenshots to public/images/
 * Usage: node screenshot_dashboard.mjs
 */

import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, 'public', 'images');
fs.mkdirSync(OUT_DIR, { recursive: true });

const BASE = 'http://localhost:5173';

// Credentials — adjust if different
const EMAIL = 'luffy@gmail.com';
const PASS  = 'password123';

async function shot(page, name, description) {
  const outPath = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: outPath, fullPage: false });
  console.log(`✅ Saved: ${name}.png  (${description})`);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  // ── Login ────────────────────────────────────────────────────────────────
  console.log('🔑 Logging in...');
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  try {
    await page.fill('input[type="email"], input[name="email"]', EMAIL);
    await page.fill('input[type="password"], input[name="password"]', PASS);
    await page.click('button[type="submit"], button:has-text("Sign In"), button:has-text("Login"), button:has-text("Log In")');
    await page.waitForURL(`${BASE}/dashboard**`, { timeout: 8000 });
    console.log('✅ Logged in successfully');
  } catch (err) {
    console.warn('⚠️  Auto-login failed, trying direct dashboard URL...');
    await page.goto(`${BASE}/dashboard`, { waitUntil: 'networkidle' });
  }

  await page.waitForTimeout(2000);

  // ── Dashboard Overview ────────────────────────────────────────────────────
  await page.goto(`${BASE}/dashboard`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  await shot(page, 'dashboard_overview', 'Dashboard Overview with KPI cards & energy chart');

  // ── AI Insights ────────────────────────────────────────────────────────────
  const aiLink = page.locator('text=AI Insights').first();
  if (await aiLink.count() > 0) {
    await aiLink.click();
    await page.waitForTimeout(2000);
    await shot(page, 'ai_insights', 'AI Intelligence Hub — Predictive tab');
  } else {
    await page.goto(`${BASE}/dashboard/ai`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await shot(page, 'ai_insights', 'AI Insights page');
  }

  // ── Alerts ────────────────────────────────────────────────────────────────
  const alertsLink = page.locator('text=Alerts').first();
  if (await alertsLink.count() > 0) {
    await alertsLink.click();
    await page.waitForTimeout(2000);
    await shot(page, 'analytics_charts', 'Monitoring Alerts with Active Alerts panel');
  }

  // ── Sustainability ────────────────────────────────────────────────────────
  const susLink = page.locator('text=Sustainability').first();
  if (await susLink.count() > 0) {
    await susLink.click();
    await page.waitForTimeout(2000);
    await shot(page, 'sustainability_dashboard', 'Sustainability tracker with carbon score');
  }

  // ── Energy Auto-Sync ─────────────────────────────────────────────────────
  const energyLink = page.locator('a:has-text("Energy"), button:has-text("Energy"), text=Energy').first();
  if (await energyLink.count() > 0) {
    await energyLink.click();
    await page.waitForTimeout(2000);
    await shot(page, 'energy_sync', 'Energy Auto-Sync page');
  }

  await browser.close();
  console.log('\n🎉 All screenshots saved to public/images/');
})();
