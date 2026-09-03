const sharp = require("sharp");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "Fotos y videos", "LOGO.jpg");
const OUT_DIR = path.join(ROOT, "web", "assets", "logo");

async function run() {
  const fs = require("fs");
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Trim the flat white margin, then key white/near-white pixels to transparent.
  const trimmed = sharp(SRC).trim({ background: "#ffffff", threshold: 10 });
  const { data, info } = await trimmed.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.from(data);
  const LOW = 238; // fully transparent at/above this "min channel" value
  const HIGH = 248; // fully opaque at/below this value — narrow band = crisper edge, less halo

  for (let i = 0; i < out.length; i += channels) {
    const r = out[i], g = out[i + 1], b = out[i + 2];
    const minC = Math.min(r, g, b);
    let alpha;
    if (minC >= HIGH) alpha = 0;
    else if (minC <= LOW) alpha = 255;
    else alpha = Math.round(255 * (1 - (minC - LOW) / (HIGH - LOW)));
    out[i + 3] = alpha;
  }

  const cutout = sharp(out, { raw: { width, height, channels } });

  // Output sized for how small the logo actually renders (~90-140px wide on screen);
  // 480px covers retina with plenty of headroom, at a fraction of the file size.
  await cutout
    .resize({ width: 480, withoutEnlargement: true })
    .sharpen({ sigma: 0.5 })
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(OUT_DIR, "chaltu-logo.png"));

  console.log("logo saved:", width, "x", height);
}

run().catch((e) => { console.error(e); process.exit(1); });
