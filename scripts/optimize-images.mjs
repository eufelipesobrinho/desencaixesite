import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");
const out = path.join(pub, "images");

mkdirSync(out, { recursive: true });

async function cropLogo() {
  const logo = sharp(path.join(pub, "logodesencaixe.jpg"));
  const { data, info } = await logo
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const threshold = 248;
  let minX = info.width;
  let minY = info.height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const i = (y * info.width + x) * info.channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const isWhite = r > threshold && g > threshold && b > threshold;
      if (!isWhite) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pad = 16;
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const width = Math.min(info.width - left, maxX - minX + pad * 2);
  const height = Math.min(info.height - top, maxY - minY + pad * 2);

  const extracted = sharp(path.join(pub, "logodesencaixe.jpg")).extract({
    left,
    top,
    width,
    height,
  });

  const raw = await extracted.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < raw.data.length; i += 4) {
    if (raw.data[i] > 245 && raw.data[i + 1] > 245 && raw.data[i + 2] > 245) {
      raw.data[i + 3] = 0;
    }
  }

  const transparent = sharp(raw.data, {
    raw: { width: raw.info.width, height: raw.info.height, channels: 4 },
  });

  await transparent.clone().png().toFile(path.join(out, "logo.png"));
  await transparent.clone().webp({ quality: 92 }).toFile(path.join(out, "logo.webp"));

  await sharp(path.join(pub, "logodesencaixe.jpg"))
    .extract({ left, top, width, height })
    .resize(64, 64, { fit: "contain", background: "#ffffff" })
    .png()
    .toFile(path.join(pub, "favicon-64.png"));

  console.log(`Logo cropped: ${width}x${height}`);
}

async function convertPhoto(inputName, outputName) {
  const input = path.join(pub, inputName);

  await sharp(input)
    .rotate()
    .resize(1400, 1400, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 76 })
    .toFile(path.join(out, `${outputName}.webp`));

  await sharp(input)
    .rotate()
    .resize(800, 800, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 74 })
    .toFile(path.join(out, `${outputName}-sm.webp`));

  await sharp(input)
    .rotate()
    .resize(1200, 630, { fit: "cover", position: "top" })
    .jpeg({ quality: 80 })
    .toFile(path.join(out, `${outputName}-og.jpg`));
}

await cropLogo();

await convertPhoto("fotomarta2.jpg", "marta-hero");
await convertPhoto("fotomarta5.jpg", "marta-about");
await convertPhoto("fotomarta1.jpg", "marta-desk");
await convertPhoto("fotomarta4.jpg", "marta-book");
await convertPhoto("fotomarta3.jpg", "marta-online");

await sharp(path.join(pub, "fotomarta2.jpg"))
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 82 })
  .toFile(path.join(pub, "og.jpg"));

console.log("Images optimized.");
