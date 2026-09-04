const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "Fotos y videos");
const OUT = path.join(ROOT, "web", "assets", "img");

// [srcRelativePath, outRelativePath, maxWidth, quality, options]
// options.crop = { top, left, width, height } in fractions of the source (0-1), applied before resize
// options.sharpen = true to apply a light sharpen pass (useful for hero-sized images)
const jobs = [
  // Hero — daytime facade, high-res source
  ["Exterior/Principal.jpg", "exterior/hero-principal.jpg", 2000, 62, { sharpen: true }],

  // Gallery — pool at night (repurposed from the previous hero)
  ["Servicios/Pileta noche.jpg", "servicios/pileta-noche.jpg", 1400, 72],

  // Sobre Chaltu — hotel facade at night
  ["Exterior/Exterior noche.jpg", "exterior/hero-noche.jpg", 1400, 78, { sharpen: true }],

  // Gallery extras
  ["Exterior/A-14-2.jpg", "exterior/fachada-bosque.jpg", 1400, 76, { crop: { top: 0, left: 0, width: 1, height: 0.78 } }],
  ["Exterior/Distancia playa .jpg", "exterior/aerea-bosque-mar.jpg", 1400, 74],

  // Exterior / Ubicacion
  ["Exterior/A-11-2.jpg", "exterior/fachada-dia.jpg", 1400, 70],
  ["Exterior/Playa.jpg", "exterior/aerea-playa.jpg", 1600, 70],

  // Habitaciones
  ["Habitaciones/Habitacion doble.jpg", "habitaciones/hab-matrimonial.jpg", 1200, 72],
  ["Habitaciones/simple doble.jpg", "habitaciones/hab-individuales.jpg", 1200, 72],
  ["Habitaciones/doble mas simle.jpg", "habitaciones/hab-triple.jpg", 1200, 72],
  ["Habitaciones/Bano1.jpg", "habitaciones/hab-bano.jpg", 1200, 72],

  // Lobby
  ["Lobby/DJI_20260112_091635_229.JPG", "lobby/lobby-recepcion.jpg", 1400, 70],
  ["Lobby/DJI_20260112_091652_838.JPG", "lobby/lobby-hall.jpg", 1400, 70],

  // Servicios
  ["Servicios/Pileta.jpg", "servicios/pileta-dia.jpg", 1400, 70],
  ["Servicios/pileta2.jpg", "servicios/pileta-deck.jpg", 1400, 70],
  ["Servicios/SPA.jpg", "servicios/spa.jpg", 1200, 72],
  ["Servicios/Gym.jpg", "servicios/gym.jpg", 1200, 72],
  ["Servicios/Pileta 3.jpg", "servicios/jacuzzi.jpg", 1400, 70],
  ["Servicios/Pileta 4.jpg", "servicios/pileta-techada.jpg", 1400, 70],
  ["Servicios/SPA 4.jpg", "servicios/sauna-toallas.jpg", 1200, 72],

  // Desayuno
  ["Desayuno/11.jpg", "desayuno/salon.jpg", 1400, 72],
  ["Desayuno/A-37.jpg", "desayuno/buffet.jpg", 1400, 70],
  ["Desayuno/DSC_6338.jpg", "desayuno/buffet2.jpg", 1400, 70],
  ["Desayuno/DSC_6344.jpg", "desayuno/mesa.jpg", 1200, 72],
];

async function run() {
  for (const [src, out, width, quality, options = {}] of jobs) {
    const srcPath = path.join(SRC, src);
    const outPath = path.join(OUT, out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });

    let img = sharp(srcPath).rotate(); // auto-orient from EXIF

    if (options.crop) {
      const meta = await img.metadata();
      const { top, left, width: cw, height: ch } = options.crop;
      img = img.extract({
        left: Math.round(left * meta.width),
        top: Math.round(top * meta.height),
        width: Math.round(cw * meta.width),
        height: Math.round(ch * meta.height),
      });
    }

    img = img.resize({ width, withoutEnlargement: true });

    if (options.sharpen) img = img.sharpen({ sigma: 0.8 });

    await img.jpeg({ quality, progressive: true, mozjpeg: true }).toFile(outPath);
    const size = fs.statSync(outPath).size;
    console.log(`${out} -> ${(size / 1024).toFixed(0)} KB`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
