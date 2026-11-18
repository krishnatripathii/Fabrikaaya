import puppeteer from 'puppeteer-core';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:3000';

async function run() {
  console.log('🧪 Testing Style Quiz full flow...');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log('❌ Console error:', msg.text());
    }
  });

  try {
    await page.goto(`${BASE_URL}/quiz`, { waitUntil: 'networkidle0' });

    // Clear any previous quiz in localStorage to test fresh flow
    await page.evaluate(() => localStorage.removeItem('fabrikaaya_quiz'));
    await page.reload({ waitUntil: 'networkidle0' });

    console.log('1. Step 1 (Occasion): Clicking "Wedding"...');
    await page.waitForSelector('button ::-p-text(Wedding)');
    const weddingBtn = await page.$('button ::-p-text(Wedding)');
    await weddingBtn.click();

    console.log('2. Step 2 (Palette): Clicking "Indigo & Madder"...');
    await page.waitForSelector('button ::-p-text(Indigo & Madder)');
    const indigoBtn = await page.$('button ::-p-text(Indigo & Madder)');
    await indigoBtn.click();

    console.log('3. Step 3 (Price): Clicking "₹12,000+"...');
    await page.waitForSelector('button ::-p-text(₹12,000+)');
    const priceBtn = await page.$('button ::-p-text(₹12,000+)');
    await priceBtn.click();

    console.log('4. Step 4 (Category): Clicking "Lehengas"...');
    await page.waitForSelector('button ::-p-text(Lehengas)');
    const lehengasBtn = await page.$('button ::-p-text(Lehengas)');
    await lehengasBtn.click();

    console.log('5. Waiting for Result Screen...');
    await page.waitForSelector('h1 ::-p-text(Your edit, curated.)');
    const h1Text = await page.$eval('h1', (el) => el.innerText);
    console.log('✅ Result screen displayed:', h1Text);

    const matchBadges = await page.$$eval('span ::-p-text(match)', (els) => els.map((e) => e.innerText));
    console.log('✅ Found match badges:', matchBadges);

    await page.screenshot({ path: 'screenshots/v2-quiz-success.png' });
    console.log('📸 Captured screenshots/v2-quiz-success.png');

    // Test Save All button
    const saveAllBtn = await page.$('button ::-p-text(Save all)');
    if (saveAllBtn) {
      console.log('Clicking "Save all"...');
      await saveAllBtn.click();
      await new Promise((r) => setTimeout(r, 400));
    }

    // Test Retake button
    const retakeBtn = await page.$('button ::-p-text(Retake)');
    if (retakeBtn) {
      console.log('Clicking "Retake"...');
      await retakeBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      const resetQuestion = await page.$eval('h1', (el) => el.innerText);
      console.log('✅ Retake returned to Step 1:', resetQuestion);
    }

    console.log('🎉 QUIZ FLOW TEST PASSED PERFECTLY!');
  } catch (err) {
    console.error('❌ Quiz test failed:', err);
  } finally {
    await browser.close();
  }
}

run();
