const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const inputDir = __dirname;

const WIDTH = 1600;
const HEIGHT = 900;

console.log("💧 ABN Animated SVG");
console.log("🌱 Vol.6 — Agriculture & AgTech");
console.log("🚰 Irrigation Water Management");
console.log("----------------------------------------");
console.log("📂 Input:", inputDir);
console.log(`📐 Output: ${WIDTH} × ${HEIGHT} px`);
console.log("----------------------------------------");

if (!fs.existsSync(inputDir)) {
  console.error("❌ Folder tidak ditemukan:");
  console.error(inputDir);
  process.exit(1);
}

// =====================================================
// FIND ALL SVG FILES
// =====================================================

const files = fs
  .readdirSync(inputDir)
  .filter((file) => /\.svg$/i.test(file))
  .sort((a, b) => a.localeCompare(b));

if (files.length === 0) {
  console.error("❌ Tidak ada file SVG ditemukan.");
  process.exit(1);
}

console.log(`🔎 SVG ditemukan: ${files.length}`);

// =====================================================
// CONVERT ALL
// =====================================================

async function convertAll() {
  let success = 0;
  let failed = 0;

  for (const file of files) {
    const input = path.join(inputDir, file);

    const output = path.join(inputDir, file.replace(/\.svg$/i, ".png"));

    console.log("\n----------------------------------------");
    console.log(`📥 ${file}`);
    console.log(`📤 ${path.basename(output)}`);

    if (!fs.existsSync(input)) {
      console.error("❌ SVG tidak ditemukan:", input);
      failed++;
      continue;
    }

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

      success++;
    } catch (err) {
      console.error("❌ Gagal:", err.message);
      failed++;
    }
  }

  // =====================================================
  // SUMMARY
  // =====================================================

  console.log("\n========================================");
  console.log("🏁 CONVERSION COMPLETE");
  console.log("========================================");

  console.log(`✅ Berhasil : ${success}`);
  console.log(`❌ Gagal    : ${failed}`);
  console.log(`📦 Total    : ${files.length}`);

  console.log("========================================");

  if (failed > 0) {
    process.exit(1);
  }
}

convertAll();
