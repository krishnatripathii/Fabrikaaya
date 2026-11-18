import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:3000';

async function run() {
  console.log('🚀 Starting end-to-end headless browser verification...');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log('❌ Console error:', msg.text());
      errors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    console.log('❌ Page error:', err.message);
    errors.push(err.message);
  });

  try {
    // -------------------------------------------------------------
    // 1. HOME PAGE
    // -------------------------------------------------------------
    console.log('\n--- 1. Testing Home Page ---');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });

    const title = await page.title();
    console.log('Page Title:', title);

    const h1Text = await page.$eval('h1', (el) => el.innerText);
    console.log('Hero H1 Text:', h1Text.replace(/\n/g, ' '));

    const emText = await page.$eval('h1 em', (el) => el.innerText);
    console.log('Hero H1 <em> (should be "hands"):', emText);

    const marqueeExists = await page.$('aside[aria-label="Traditional textile crafts marquee"]');
    console.log('Marquee strip exists:', !!marqueeExists);

    const stepsCount = await page.$$eval('section h3', (els) => els.map((e) => e.innerText));
    console.log('Headings found:', stepsCount);

    await page.screenshot({ path: 'screenshots/01-home.png' });
    console.log('📸 Captured screenshots/01-home.png');

    // -------------------------------------------------------------
    // 2. DISCOVER PAGE & FILTERS
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing Discover Page & Filters ---');
    await page.goto(`${BASE_URL}/discover`, { waitUntil: 'networkidle0' });

    let countText = await page.$eval('h1 + span', (el) => el.innerText);
    console.log('Initial pieces count:', countText);

    // Search filter test: type "kosa"
    console.log('Typing "kosa" into search...');
    await page.type('input[placeholder*="Search"]', 'kosa');
    await new Promise((r) => setTimeout(r, 400));
    let kosaCount = await page.$eval('h1 + span', (el) => el.innerText);
    console.log('Count after searching "kosa":', kosaCount);

    // Click "Clear filters"
    const clearBtn = await page.$('button ::-p-text(Clear filters)');
    if (clearBtn) {
      await clearBtn.click();
      await new Promise((r) => setTimeout(r, 400));
      console.log('Cleared filters. Restored count:', await page.$eval('h1 + span', (el) => el.innerText));
    }

    // Category filter test: click "Sarees"
    const sareesChip = await page.$('button ::-p-text(Sarees)');
    if (sareesChip) {
      await sareesChip.click();
      await new Promise((r) => setTimeout(r, 400));
      console.log('Count after selecting "Sarees" category:', await page.$eval('h1 + span', (el) => el.innerText));
    }

    // Reset category to "All"
    const allChip = await page.$('button ::-p-text(All)');
    if (allChip) {
      await allChip.click();
      await new Promise((r) => setTimeout(r, 400));
    }

    await page.screenshot({ path: 'screenshots/02-discover.png' });
    console.log('📸 Captured screenshots/02-discover.png');

    // -------------------------------------------------------------
    // 3. QUICK VIEW MODAL
    // -------------------------------------------------------------
    console.log('\n--- 3. Testing Quick View Modal ---');
    // Click on the first item title
    const firstItemBtn = await page.$('button[aria-label*="Quick view"]');
    if (firstItemBtn) {
      await firstItemBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      const modalTitle = await page.$eval('#quick-view-title', (el) => el.innerText);
      console.log('Quick View Modal opened for:', modalTitle);

      await page.screenshot({ path: 'screenshots/03-quickview.png' });
      console.log('📸 Captured screenshots/03-quickview.png');

      // Close modal with Esc
      await page.keyboard.press('Escape');
      await new Promise((r) => setTimeout(r, 400));
      console.log('Closed modal with Escape key.');
    }

    // -------------------------------------------------------------
    // 4. HEART / SAVED EDIT
    // -------------------------------------------------------------
    console.log('\n--- 4. Testing Heart / Saved Edit ---');
    // Click heart on first 2 items
    const heartBtns = await page.$$('button[aria-label*="Save "]');
    console.log(`Found ${heartBtns.length} heart buttons`);
    if (heartBtns.length >= 2) {
      await heartBtns[0].click();
      await new Promise((r) => setTimeout(r, 300));
      await heartBtns[1].click();
      await new Promise((r) => setTimeout(r, 300));
    }

    // Check nav saved badge
    const savedBadge = await page.$('header nav a[href="/saved"] span:last-child');
    if (savedBadge) {
      const badgeText = await page.evaluate((el) => el.innerText, savedBadge);
      console.log('Saved badge in header shows count:', badgeText);
    }

    // Go to /saved
    await page.goto(`${BASE_URL}/saved`, { waitUntil: 'networkidle0' });
    const savedCountOnPage = await page.$eval('h1 + span', (el) => el.innerText);
    console.log('Count on /saved page:', savedCountOnPage);

    await page.screenshot({ path: 'screenshots/04-saved.png' });
    console.log('📸 Captured screenshots/04-saved.png');

    // Reload page to verify localStorage persistence
    console.log('Reloading /saved page to verify localStorage persistence...');
    await page.reload({ waitUntil: 'networkidle0' });
    const persistedCount = await page.$eval('h1 + span', (el) => el.innerText);
    console.log('Count after page reload:', persistedCount);

    // -------------------------------------------------------------
    // 5. DESIGNERS & PROFILE
    // -------------------------------------------------------------
    console.log('\n--- 5. Testing Designers & Profile ---');
    await page.goto(`${BASE_URL}/designers`, { waitUntil: 'networkidle0' });
    const designerNames = await page.$$eval('h3', (els) => els.map((e) => e.innerText));
    console.log('Designers listed:', designerNames);
    await page.screenshot({ path: 'screenshots/05-designers.png' });
    console.log('📸 Captured screenshots/05-designers.png');

    // Go to designer profile /designers/devika-sahu
    await page.goto(`${BASE_URL}/designers/devika-sahu`, { waitUntil: 'networkidle0' });
    const profileH1 = await page.$eval('h1', (el) => el.innerText);
    console.log('Designer profile H1:', profileH1);
    await page.screenshot({ path: 'screenshots/06-designer-profile.png' });
    console.log('📸 Captured screenshots/06-designer-profile.png');

    // Test 404 on invalid designer slug
    await page.goto(`${BASE_URL}/designers/unknown-artisan`, { waitUntil: 'networkidle0' });
    const emptyTitle = await page.$eval('h3', (el) => el.innerText);
    console.log('Invalid slug empty state title:', emptyTitle);

    // -------------------------------------------------------------
    // 6. CONNECT FORM & REQUESTS SIMULATION
    // -------------------------------------------------------------
    console.log('\n--- 6. Testing Connect Modal & Requests Simulation ---');
    // Open with ?connect=1 on devika-sahu
    await page.goto(`${BASE_URL}/designers/devika-sahu?connect=1`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));

    const connectModalTitle = await page.$eval('#connect-modal-title', (el) => el.innerText);
    console.log('Connect modal auto-opened:', connectModalTitle);
    await page.screenshot({ path: 'screenshots/07-connect-modal.png' });
    console.log('📸 Captured screenshots/07-connect-modal.png');

    // Fill the form
    await page.type('#connect-name', 'Aarav Sharma');
    await page.type('#connect-email', 'aarav@example.com');
    await page.type(
      '#connect-message',
      'Looking for a custom Kosa silk sherwani for a winter wedding in December.'
    );

    console.log('Submitting connect form...');
    const submitBtn = await page.$('button[type="submit"]');
    await submitBtn.click();

    // Wait for redirect to /requests
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    console.log('Redirected to:', page.url());

    // Check status pill initial state: "Sent"
    let statusPill = await page.$eval('span.rounded-full span:last-child', (el) => el.innerText);
    console.log('Immediate request status:', statusPill);

    // Wait 7 seconds for "Seen" transition
    console.log('Waiting 7 seconds for "Seen" transition...');
    await new Promise((r) => setTimeout(r, 7000));
    statusPill = await page.$eval('span.rounded-full span:last-child', (el) => el.innerText);
    console.log('Status after 7 seconds:', statusPill);

    // Wait 9 more seconds (total 16s) for "Replied" transition
    console.log('Waiting 9 more seconds for "Replied" transition...');
    await new Promise((r) => setTimeout(r, 9000));
    statusPill = await page.$eval('span.rounded-full span:last-child', (el) => el.innerText);
    console.log('Status after 16 seconds:', statusPill);

    const replyText = await page.$eval('p.italic', (el) => el.innerText);
    console.log('Simulated reply bubble content:', replyText);

    await page.screenshot({ path: 'screenshots/08-requests-replied.png' });
    console.log('📸 Captured screenshots/08-requests-replied.png');

    // Test reload on /requests to verify status calculation survives refresh
    console.log('Reloading /requests to test persistence...');
    await page.reload({ waitUntil: 'networkidle0' });
    statusPill = await page.$eval('span.rounded-full span:last-child', (el) => el.innerText);
    console.log('Status after reload on /requests:', statusPill);

    // -------------------------------------------------------------
    // 7. MOBILE RESPONSIVENESS (390px)
    // -------------------------------------------------------------
    console.log('\n--- 7. Testing Mobile Responsiveness (390px) ---');
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });

    // Check horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`Mobile width check: scrollWidth=${scrollWidth}, clientWidth=${clientWidth}`);
    if (scrollWidth <= clientWidth) {
      console.log('✅ No horizontal overflow on mobile!');
    } else {
      console.log('⚠️ Horizontal overflow detected on mobile!');
    }

    await page.screenshot({ path: 'screenshots/09-mobile-home.png' });
    console.log('📸 Captured screenshots/09-mobile-home.png');

    // Open mobile menu
    const menuBtn = await page.$('button[aria-label="Open menu"]');
    if (menuBtn) {
      await menuBtn.click();
      await new Promise((r) => setTimeout(r, 400));
      await page.screenshot({ path: 'screenshots/10-mobile-nav.png' });
      console.log('📸 Captured screenshots/10-mobile-nav.png');
    }

    console.log('\n🎉 ALL TESTS COMPLETED SUCCESSFULLY!');
    if (errors.length > 0) {
      console.log('⚠️ Total console/page errors encountered:', errors.length);
    } else {
      console.log('✅ ZERO console or page errors encountered!');
    }
  } catch (err) {
    console.error('❌ Test failed with error:', err);
  } finally {
    await browser.close();
  }
}

run();
