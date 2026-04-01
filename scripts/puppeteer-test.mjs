import puppeteer from 'puppeteer';

const BASE = 'http://localhost:3099';
const LOCALES = ['en', 'ko', 'ja', 'zh', 'es'];
const PAGES = ['', '/about', '/how-to-use', '/privacy', '/terms', '/gold-price-today', '/market-fear-index'];
const results = [];

function log(status, msg) {
  const icon = status === 'OK' ? '✅' : status === 'WARN' ? '⚠️' : '❌';
  console.log(`${icon} ${msg}`);
  results.push({ status, msg });
}

async function main() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Collect console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  // 1. Test locale auto-redirect from root
  console.log('\n=== 1. ROOT REDIRECT TEST ===');
  const resp = await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 15000 });
  const finalUrl = page.url();
  if (finalUrl.includes('/en') || LOCALES.some(l => finalUrl.includes(`/${l}`))) {
    log('OK', `Root redirects to locale: ${finalUrl}`);
  } else {
    log('FAIL', `Root did not redirect to locale. URL: ${finalUrl}`);
  }

  // 2. Test all pages for each locale
  console.log('\n=== 2. ALL PAGES TEST ===');
  for (const locale of LOCALES) {
    for (const pagePath of PAGES) {
      const url = `${BASE}/${locale}${pagePath}`;
      try {
        const r = await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
        const status = r.status();
        if (status === 200) {
          const title = await page.title();
          log('OK', `${locale}${pagePath || '/'} (${status}) — "${title.substring(0, 50)}"`);
        } else {
          log('FAIL', `${locale}${pagePath || '/'} returned ${status}`);
        }
      } catch (e) {
        log('FAIL', `${locale}${pagePath || '/'} error: ${e.message.substring(0, 80)}`);
      }
    }
  }

  // 3. Test API endpoints
  console.log('\n=== 3. API ENDPOINTS TEST ===');
  const apis = ['/api/prices', '/api/fear-gauge', '/api/visitors'];
  for (const api of apis) {
    try {
      const r = await page.goto(`${BASE}${api}`, { waitUntil: 'networkidle0', timeout: 15000 });
      const text = await r.text();
      const json = JSON.parse(text);
      log('OK', `${api} (${r.status()}) — ${JSON.stringify(json).substring(0, 80)}`);
    } catch (e) {
      log('FAIL', `${api} error: ${e.message.substring(0, 80)}`);
    }
  }

  // 4. Test SEO files
  console.log('\n=== 4. SEO FILES TEST ===');
  for (const f of ['/sitemap.xml', '/robots.txt', '/manifest.json']) {
    try {
      const r = await page.goto(`${BASE}${f}`, { waitUntil: 'networkidle0', timeout: 10000 });
      log(r.status() === 200 ? 'OK' : 'FAIL', `${f} (${r.status()})`);
    } catch (e) {
      log('FAIL', `${f} error: ${e.message.substring(0, 80)}`);
    }
  }

  // 5. Test main page functionality
  console.log('\n=== 5. MAIN PAGE FUNCTIONALITY TEST ===');
  await page.goto(`${BASE}/en`, { waitUntil: 'networkidle0', timeout: 15000 });

  // Check Fear Gauge renders
  const fearGauge = await page.$('[class*="fear"], h2');
  if (fearGauge) {
    log('OK', 'Fear Gauge section found');
  } else {
    log('WARN', 'Fear Gauge section not clearly found');
  }

  // Check asset cards
  const assetCards = await page.$$('text/Gold');
  log(assetCards.length > 0 ? 'OK' : 'WARN', `Asset card "Gold" found: ${assetCards.length > 0}`);

  // Check dark mode toggle
  const darkToggle = await page.$('button[aria-label="Toggle dark mode"]');
  if (darkToggle) {
    await darkToggle.click();
    await new Promise(r => setTimeout(r, 500));
    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    log(isDark ? 'OK' : 'FAIL', `Dark mode toggle works: ${isDark}`);
    // Toggle back
    await darkToggle.click();
    await new Promise(r => setTimeout(r, 300));
  } else {
    log('FAIL', 'Dark mode toggle not found');
  }

  // Check language selector
  const langBtn = await page.$('button[aria-label="Change language"]');
  if (langBtn) {
    await langBtn.click();
    await new Promise(r => setTimeout(r, 500));
    const langOptions = await page.$$('a[href^="/ko"], a[href^="/ja"], a[href^="/zh"], a[href^="/es"]');
    log(langOptions.length >= 4 ? 'OK' : 'WARN', `Language selector options: ${langOptions.length}`);
  } else {
    log('WARN', 'Language selector not found');
  }

  // Check feedback widget
  const feedbackBtn = await page.$('button[aria-label="Send feedback"]');
  if (feedbackBtn) {
    await feedbackBtn.click();
    await new Promise(r => setTimeout(r, 500));
    const feedbackForm = await page.$('textarea');
    log(feedbackForm ? 'OK' : 'FAIL', `Feedback widget opens with form: ${!!feedbackForm}`);
    // Close
    await feedbackBtn.click();
  } else {
    log('WARN', 'Feedback button not found');
  }

  // Check share buttons
  const shareButtons = await page.$$('a[aria-label*="Share"]');
  log(shareButtons.length >= 2 ? 'OK' : 'WARN', `Social share buttons found: ${shareButtons.length}`);

  // Check footer links
  const footerLinks = await page.$$('footer a');
  log(footerLinks.length >= 5 ? 'OK' : 'WARN', `Footer links found: ${footerLinks.length}`);

  // Check visitor counter
  const visitorText = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('footer *'));
    return els.find(el => el.textContent?.includes('Total'))?.textContent || 'not found';
  });
  log(visitorText.includes('Total') ? 'OK' : 'WARN', `Visitor counter: ${visitorText.substring(0, 40)}`);

  // 6. Mobile responsiveness
  console.log('\n=== 6. MOBILE RESPONSIVENESS TEST ===');
  await page.setViewport({ width: 375, height: 812 }); // iPhone X
  await page.goto(`${BASE}/en`, { waitUntil: 'networkidle0', timeout: 15000 });
  const mobileHeader = await page.$('header');
  log(mobileHeader ? 'OK' : 'FAIL', 'Mobile: header renders');

  const isScrollable = await page.evaluate(() => {
    return document.body.scrollWidth <= window.innerWidth + 5;
  });
  log(isScrollable ? 'OK' : 'WARN', `Mobile: no horizontal scroll (${isScrollable})`);

  // 7. Check OG meta tags
  console.log('\n=== 7. META TAGS TEST ===');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/en`, { waitUntil: 'networkidle0', timeout: 15000 });
  const ogTitle = await page.evaluate(() => document.querySelector('meta[property="og:title"]')?.content);
  const ogDesc = await page.evaluate(() => document.querySelector('meta[property="og:description"]')?.content);
  const ogImage = await page.evaluate(() => document.querySelector('meta[property="og:image"]')?.content);
  const twitterCard = await page.evaluate(() => document.querySelector('meta[name="twitter:card"]')?.content);
  log(ogTitle ? 'OK' : 'FAIL', `OG title: ${ogTitle?.substring(0, 50) || 'MISSING'}`);
  log(ogDesc ? 'OK' : 'FAIL', `OG description: ${ogDesc?.substring(0, 50) || 'MISSING'}`);
  log(ogImage ? 'OK' : 'FAIL', `OG image: ${ogImage?.substring(0, 50) || 'MISSING'}`);
  log(twitterCard ? 'OK' : 'FAIL', `Twitter card: ${twitterCard || 'MISSING'}`);

  // Check HTML lang attribute
  const htmlLang = await page.evaluate(() => document.documentElement.lang);
  log(htmlLang === 'en' ? 'WARN' : 'OK', `HTML lang attribute: "${htmlLang}" (should match locale)`);

  // 8. Console errors
  console.log('\n=== 8. CONSOLE ERRORS ===');
  if (consoleErrors.length === 0) {
    log('OK', 'No console errors');
  } else {
    consoleErrors.slice(0, 5).forEach(e => log('WARN', `Console error: ${e.substring(0, 100)}`));
  }

  // Summary
  console.log('\n=== SUMMARY ===');
  const ok = results.filter(r => r.status === 'OK').length;
  const warn = results.filter(r => r.status === 'WARN').length;
  const fail = results.filter(r => r.status === 'FAIL').length;
  console.log(`✅ OK: ${ok} | ⚠️ WARN: ${warn} | ❌ FAIL: ${fail}`);

  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
