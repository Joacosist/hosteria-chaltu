const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "Fotos y videos");
const OUT = path.join(ROOT, "web", "assets", "img");

// [srcRelativePath, outRelativePath, maxWidth, quality]
const jobs = [
  // Hero
  ["Exterior/Exterior noche.jpg", "exterior/hero-noche.jpg", 2200, 78],

  // Sobre Chaltu
  ["Exterior/Distancia playa .jpg", "exterior/aerea-bosque-mar.jpg", 1600, 70],

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
  ["Servicios/Pileta noche.jpg", "servicios/pileta-noche.jpg", 1400, 72],
  ["Servicios/pileta2.jpg", "servicios/pileta-deck.jpg", 1400, 70],
  ["Servicios/SPA.jpg", "servicios/spa.jpg", 1200, 72],
  ["Servicios/Gym.jpg", "servicios/gym.jpg", 1200, 72],

  // Desayuno
  ["Desayuno/11.jpg", "desayuno/salon.jpg", 1400, 72],
  ["Desayuno/A-37.jpg", "desayuno/buffet.jpg", 1400, 70],
  ["Desayuno/DSC_6344.jpg", "desayuno/mesa.jpg", 1200, 72],
];

async function run() {
  for (const [src, out, width, quality] of jobs) {
    const srcPath = path.join(SRC, src);
    const outPath = path.join(OUT, out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    await sharp(srcPath)
      .rotate() // auto-orient from EXIF
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality, progressive: true, mozjpeg: true })
      .toFile(outPath);
    const size = fs.statSync(outPath).size;
    console.log(`${out} -> ${(size / 1024).toFixed(0)} KB`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
