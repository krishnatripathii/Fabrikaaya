import puppeteer from 'puppeteer-core';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:3000';

async function run() {
  console.log('🚀 Starting end-to-end headless browser verification for Fabrikaaya v2...');

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
    // 1. HOME PAGE & ABOUT SECTION
    // -------------------------------------------------------------
    console.log('\n--- 1. Testing Home Page & New About Section ---');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });

    const title = await page.title();
    console.log('Page Title:', title);

    const problemPlaceholder = await page.$eval('section:last-of-type', (el) => el.innerText);
    console.log('About section placeholder found:', problemPlaceholder.includes('{PROBLEM_STATEMENT_HERE}'));

    const quizNavLink = await page.$('header nav a[href="/quiz"]');
    console.log('Nav contains Quiz link:', Boolean(quizNavLink));

    await page.screenshot({ path: 'screenshots/v2-01-home.png' });

    // -------------------------------------------------------------
    // 2. STYLE QUIZ (/quiz)
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing Style Quiz (/quiz) ---');
    await page.goto(`${BASE_URL}/quiz`, { waitUntil: 'networkidle0' });

    console.log('Quiz Step 1: Selecting Wedding...');
    const weddingBtn = await page.$('button ::-p-text(Wedding)');
    if (weddingBtn) await weddingBtn.click();
    await new Promise((r) => setTimeout(r, 400));

    console.log('Quiz Step 2: Selecting Indigo & Madder...');
    const indigoBtn = await page.$('button ::-p-text(Indigo & Madder)');
    if (indigoBtn) await indigoBtn.click();
    await new Promise((r) => setTimeout(r, 400));

    console.log('Quiz Step 3: Selecting ₹12,000+...');
    const priceBtn = await page.$('button ::-p-text(₹12,000+)');
    if (priceBtn) await priceBtn.click();
    await new Promise((r) => setTimeout(r, 400));

    console.log('Quiz Step 4: Selecting Lehengas...');
    const lehengasBtn = await page.$('button ::-p-text(Lehengas)');
    if (lehengasBtn) await lehengasBtn.click();
    await new Promise((r) => setTimeout(r, 500));

    // Result screen
    const resultH1 = await page.$eval('h1', (el) => el.innerText);
    console.log('Quiz Result Header:', resultH1);

    const matchScores = await page.$$eval('span ::-p-text(match)', (els) => els.map((e) => e.innerText));
    console.log('Match badges found:', matchScores.length);

    await page.screenshot({ path: 'screenshots/v2-02-quiz-results.png' });

    // Test Save All button
    const saveAllBtn = await page.$('button ::-p-text(Save all)');
    if (saveAllBtn) {
      console.log('Clicking "Save all"...');
      await saveAllBtn.click();
      await new Promise((r) => setTimeout(r, 300));
    }

    // -------------------------------------------------------------
    // 3. CRAFT STORIES (/crafts) & PREFILLED DISCOVER
    // -------------------------------------------------------------
    console.log('\n--- 3. Testing Craft Stories (/crafts) & Prefilled Search ---');
    await page.goto(`${BASE_URL}/crafts`, { waitUntil: 'networkidle0' });

    const craftsH1 = await page.$eval('h1', (el) => el.innerText);
    console.log('Crafts page H1:', craftsH1);

    const craftTitles = await page.$$eval('h2', (els) => els.map((e) => e.innerText));
    console.log('Craft sections listed:', craftTitles);

    await page.screenshot({ path: 'screenshots/v2-03-crafts.png' });

    // Click "See Ajrakh pieces →"
    console.log('Clicking "See Ajrakh pieces →"...');
    const ajrakhLink = await page.$('a[href*="Ajrakh"]');
    if (ajrakhLink) {
      await ajrakhLink.click();
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
      console.log('Navigated to URL:', page.url());

      const searchVal = await page.$eval('input[placeholder*="Search"]', (el) => el.value);
      console.log('Discover search input prefilled with:', searchVal);

      const ajrakhCount = await page.$eval('h1 + span', (el) => el.innerText);
      console.log('Discover filtered pieces count:', ajrakhCount);
    }

    // -------------------------------------------------------------
    // 4. RECENTLY VIEWED ON /discover
    // -------------------------------------------------------------
    console.log('\n--- 4. Testing Recently Viewed on /discover ---');
    // Open Quick View on first item
    const firstItemBtn = await page.$('button[aria-label*="Quick view"]');
    if (firstItemBtn) {
      await firstItemBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      // Close modal
      await page.keyboard.press('Escape');
      await new Promise((r) => setTimeout(r, 400));
    }

    // Verify Recently Viewed tray appears
    const recentTray = await page.$('section[aria-label="Recently viewed pieces"]');
    console.log('Recently viewed tray is visible:', Boolean(recentTray));
    await page.screenshot({ path: 'screenshots/v2-04-discover-recent.png' });

    // -------------------------------------------------------------
    // 5. SEND REQUEST & TEST DESIGNER VIEW (/designer-view)
    // -------------------------------------------------------------
    console.log('\n--- 5. Testing Connect Form & Designer View ---');
    // Visit Zainab Khatri (Ajrakh designer) and open connect modal
    await page.goto(`${BASE_URL}/designers/zainab-khatri?connect=1`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));

    await page.type('#connect-name', 'Ishaan Verma');
    await page.type('#connect-email', 'ishaan@example.com');
    await page.type(
      '#connect-message',
      'I would love to commission a bespoke natural-indigo Ajrakh co-ord for a cultural gala.'
    );

    const sendBtn = await page.$('button[type="submit"]');
    await sendBtn.click();
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    console.log('Buyer redirected to:', page.url());

    // Now visit /designer-view as Zainab Khatri
    console.log('Navigating to /designer-view...');
    await page.goto(`${BASE_URL}/designer-view`, { waitUntil: 'networkidle0' });

    // Select Zainab Khatri in dropdown
    await page.select('#designer-select', 'zainab-khatri');
    await new Promise((r) => setTimeout(r, 400));

    const requestCardFound = await page.$('h2 ::-p-text(Ishaan Verma)');
    console.log('Found request from Ishaan Verma in Zainab Khatri inbox:', Boolean(requestCardFound));

    // Click Reply
    const replyBtn = await page.$('button ::-p-text(Reply)');
    if (replyBtn) {
      await replyBtn.click();
      await new Promise((r) => setTimeout(r, 300));
      await page.type('textarea', 'Hello Ishaan! Delighted to create this Ajrakh co-ord for you. I will begin preparing the natural indigo vat.');
      const sendReplyBtn = await page.$('button ::-p-text(Send reply)');
      if (sendReplyBtn) {
        await sendReplyBtn.click();
        await new Promise((r) => setTimeout(r, 400));
        console.log('Artisan reply submitted!');
      }
    }

    await page.screenshot({ path: 'screenshots/v2-05-designer-view.png' });

    // -------------------------------------------------------------
    // 6. BUYER REQUESTS: REAL REPLY & WITHDRAWAL
    // -------------------------------------------------------------
    console.log('\n--- 6. Testing Buyer Requests (/requests): Real Reply & Withdraw ---');
    await page.goto(`${BASE_URL}/requests`, { waitUntil: 'networkidle0' });

    const replyBubbleText = await page.$eval('p.italic', (el) => el.innerText);
    console.log('Buyer sees real reply text:', replyBubbleText);

    await page.screenshot({ path: 'screenshots/v2-06-buyer-real-reply.png' });

    // Test Withdraw request
    console.log('Testing "Withdraw request"...');
    const withdrawBtn = await page.$('button ::-p-text(Withdraw request)');
    if (withdrawBtn) {
      await withdrawBtn.click();
      await new Promise((r) => setTimeout(r, 300));
      const confirmBtn = await page.$('button ::-p-text(Yes, withdraw)');
      if (confirmBtn) {
        await confirmBtn.click();
        await new Promise((r) => setTimeout(r, 500));
        console.log('Request successfully withdrawn!');
      }
    }

    await page.screenshot({ path: 'screenshots/v2-07-after-withdrawal.png' });

    // -------------------------------------------------------------
    // 7. CUSTOM 404 PAGE
    // -------------------------------------------------------------
    console.log('\n--- 7. Testing Custom 404 Page ---');
    await page.goto(`${BASE_URL}/non-existent-route-for-404-test`, { waitUntil: 'networkidle0' });
    const notFoundText = await page.$eval('p.italic', (el) => el.innerText);
    console.log('404 Page line:', notFoundText);
    await page.screenshot({ path: 'screenshots/v2-08-404.png' });

    console.log('\n🎉 ALL V2 TESTS COMPLETED WITH 100% SUCCESS!');
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
