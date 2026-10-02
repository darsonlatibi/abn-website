const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const inputDir = __dirname;

const inputFile = "whop-preview-responsive.svg";
const outputFile = "whop-preview-responsive.png";

const WIDTH = 1600;
const HEIGHT = 900;

const input = path.join(inputDir, inputFile);
const output = path.join(inputDir, outputFile);

console.log("🖼️ ABN Whop Preview");
console.log("📥 Input :", inputFile);
console.log("📤 Output:", outputFile);
console.log(`📐 Size  : ${WIDTH} × ${HEIGHT} px`);
console.log("----------------------------------------");

if (!fs.existsSync(input)) {
  console.error("❌ SVG tidak ditemukan:");
  console.error(input);
  process.exit(1);
}

async function convert() {
  try {
    await sharp(input)
      .resize(WIDTH, HEIGHT, {
        fit: "fill",
      })
      .png({
        quality: 100,
        compressionLevel: 9,
      })
      .toFile(output);

    console.log("✅ PNG berhasil dibuat");
    console.log(`📐 ${WIDTH} × ${HEIGHT} px`);
    console.log(`📦 ${output}`);
  } catch (err) {
    console.error("❌ Gagal:", err.message);
    process.exit(1);
  }
}

convert();
