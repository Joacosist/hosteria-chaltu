const { chromium } = require("playwright");
const path = require("path");

const OUT = path.resolve(__dirname, "..", "scripts", "screenshots");
require("fs").mkdirSync(OUT, { recursive: true });

async function run() {
  const browser = await chromium.launch();
  const errors = [];

  // ---- Mobile ----
  {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    page.on("console", (msg) => { if (msg.type() === "error") errors.push("[mobile] " + msg.text()); });
    page.on("pageerror", (err) => errors.push("[mobile pageerror] " + err.message));
    await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(OUT, "01-mobile-hero.png") });

    // open mobile menu
    await page.click("#menu-toggle");
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT, "02-mobile-menu.png") });

    // switch to EN
    await page.click('.lang-btn[data-set-lang="en"]');
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(OUT, "03-mobile-menu-en.png") });
    await page.click("#menu-toggle"); // close

    // scroll to rooms
    await page.click('a[href="#habitaciones"]').catch(() => {});
    await page.locator("#habitaciones").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT, "04-mobile-rooms-en.png") });

    // gallery + lightbox
    await page.locator("#galeria").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT, "05-mobile-gallery.png") });
    await page.locator(".gallery-item").first().click();
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT, "06-mobile-lightbox.png") });
    await page.click("#lightbox-close");

    // footer form
    await page.locator("#contacto").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT, "07-mobile-footer.png") });

    await page.close();
  }

  // ---- Desktop ----
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    page.on("console", (msg) => { if (msg.type() === "error") errors.push("[desktop] " + msg.text()); });
    page.on("pageerror", (err) => errors.push("[desktop pageerror] " + err.message));
    await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(OUT, "10-desktop-hero.png") });

    await page.locator("#servicios").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT, "11-desktop-services.png") });

    await page.click('.lang-btn[data-set-lang="pt"]');
    await page.locator("#habitaciones").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT, "12-desktop-rooms-pt.png") });

    await page.locator("#ubicacion").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT, "13-desktop-location.png") });

    await page.locator("#contacto").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT, "14-desktop-footer.png") });

    await page.close();
  }

  await browser.close();

  console.log("Screenshots saved to", OUT);
  if (errors.length) {
    console.log("\nCONSOLE ERRORS:");
    errors.forEach((e) => console.log(e));
  } else {
    console.log("\nNo console errors.");
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
