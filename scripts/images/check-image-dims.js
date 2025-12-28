const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const images = [
  "public/optimized/strong-cat-urine-smell.webp",
  "public/optimized/catonbed.avif",
  "public/optimized/carbon_magnified_image.webp",
  "public/optimized/before-after.webp",
  "public/optimized/activated-carbon-benefits.webp",
  "public/optimized/coconut-shell-natural.webp",
  "public/optimized/pet-safety-home.webp",
];

async function checkDims() {
  for (const img of images) {
    const filePath = path.join(process.cwd(), img);
    if (fs.existsSync(filePath)) {
      try {
        const metadata = await sharp(filePath).metadata();
        console.log(`${img}: ${metadata.width}x${metadata.height}`);
      } catch (e) {
        console.log(`${img}: Error reading dimensions - ${e.message}`);
      }
    } else {
      console.log(`${img}: Not found`);
    }
  }
}

checkDims();
