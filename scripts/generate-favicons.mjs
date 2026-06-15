import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = process.cwd();
const publicDir = path.join(root, "public");
const configPath = path.join(root, "src/data/config.ts");
fs.mkdirSync(publicDir, { recursive: true });

function readConfigValue(source, key, fallback) {
  const match = source.match(new RegExp(`${key}:\\s*["']([^"']*)["']`, "m"));
  return match?.[1] || fallback;
}

function normalizeHex(value, fallback) {
  const trimmed = String(value || "").trim();
  return /^#[0-9a-fA-F]{6}$/.test(trimmed) ? trimmed.toLowerCase() : fallback;
}

function gameInitials(name) {
  const words = String(name || "Game")
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .filter(w => !["a", "an", "the", "of", "in", "on", "at", "to", "for", "with", "by"].includes(w.toLowerCase()));

  if (words.length === 0) return "GG";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

function themeShape(theme, accentColor, brandColor) {
  const shapes = {
    magic: `<path d="M256 96 288 214 408 214 310 284 348 400 256 330 164 400 202 284 104 214 224 214Z" fill="${accentColor}" />`,
    farm: `<path d="M118 330h276v78H118z" fill="${accentColor}" /><path d="M142 330 256 204l114 126H142Z" fill="${accentColor}" opacity="0.86" /><circle cx="256" cy="190" r="42" fill="#ffffff" opacity="0.8" />`,
    anime: `<path d="M256 112c88 0 160 64 160 144s-72 144-160 144S96 336 96 256s72-144 160-144Z" fill="${accentColor}" /><path d="M170 248c42-70 130-70 172 0-44-26-128-26-172 0Z" fill="#ffffff" opacity="0.86" />`,
    combat: `<path d="M150 386 350 126l38 38-200 260-38-38Z" fill="${accentColor}" /><path d="M124 166l38-38 226 226-38 38L124 166Z" fill="#ffffff" opacity="0.82" />`,
    racing: `<path d="M100 282c44-84 268-84 312 0v88H100v-88Z" fill="${accentColor}" /><circle cx="172" cy="372" r="36" fill="#ffffff" /><circle cx="340" cy="372" r="36" fill="#ffffff" />`,
    simulator: `<rect x="128" y="132" width="256" height="256" rx="46" fill="${accentColor}" /><circle cx="256" cy="260" r="82" fill="#ffffff" opacity="0.84" /><path d="M256 190v70l54 36" stroke="#17241f" stroke-width="34" stroke-linecap="round" fill="none" />`,
    nuke: `<circle cx="256" cy="220" r="120" fill="${accentColor}" /><path d="M 256,130 C 246,130 236,150 236,180 L 236,280 L 216,305 L 241,295 L 246,290 L 256,290 L 266,290 L 271,295 L 296,305 L 276,280 L 276,180 C 276,150 266,130 256,130 Z" fill="${brandColor}" /><g transform="translate(256, 230) scale(0.12) rotate(90)" fill="${accentColor}"><circle cx="0" cy="0" r="30" /><path id="radiation-petal-small" d="M39,-22.5 L95.3,-55 A110,110 0 0 1 95.3,55 L39,22.5 A45,45 0 0 0 39,-22.5 Z" /><use href="#radiation-petal-small" transform="rotate(120)" /><use href="#radiation-petal-small" transform="rotate(240)" /></g>`,
    default: `<path d="M160 284 256 120l96 164h-58l-38-70-38 70h-58Z" fill="${accentColor}" /><path d="M170 342h172v42H170z" fill="#ffffff" opacity="0.92" />`
  };

  return shapes[theme] || shapes.default;
}

function buildSvg({ siteName, gameName, theme, brandColor, accentColor }) {
  const initials = gameInitials(gameName);
  const safeTitle = `${siteName} icon`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" role="img" aria-label="${safeTitle}">
  <rect width="512" height="512" rx="112" fill="${brandColor}" />
  <circle cx="256" cy="256" r="170" fill="#ffffff" opacity="0.08" />
  ${themeShape(theme, accentColor, brandColor)}
  <rect x="154" y="360" width="204" height="70" rx="35" fill="${brandColor}" opacity="0.88" />
  <text x="256" y="410" text-anchor="middle" font-family="Arial, sans-serif" font-size="54" font-weight="800" fill="#ffffff">${initials}</text>
</svg>
`;
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return [parseInt(clean.slice(0, 2), 16), parseInt(clean.slice(2, 4), 16), parseInt(clean.slice(4, 6), 16)];
}

function crc32(buffer) {
  let crc = -1;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ -1) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function createPng(size, brandColor, accentColor) {
  const [br, bg, bb] = hexToRgb(brandColor);
  const [ar, ag, ab] = hexToRgb(accentColor);
  const raw = Buffer.alloc((size * 4 + 1) * size);

  const cx = size / 2;
  const cy = size / 2;
  const r_circle = size * 0.38;

  const y_start = cy - size * 0.22;
  const y_nose = cy - size * 0.10;
  const y_base = cy + size * 0.16;
  const y_fin_start = cy + size * 0.08;
  const y_end = cy + size * 0.22;
  const half_width_body = size * 0.08;

  // Radiation symbol engraved on missile body
  const cy_body = cy + size * 0.02;
  const r_rad_center = size * 0.024;
  const r_rad_inner = size * 0.036;
  const r_rad_outer = size * 0.088;

  for (let y = 0; y < size; y += 1) {
    const rowStart = y * (size * 4 + 1);
    raw[rowStart] = 0;
    for (let x = 0; x < size; x += 1) {
      const dx = x - cx;
      const dy = y - cy;
      const dist_from_center = Math.sqrt(dx * dx + dy * dy);

      let isYellow = false;
      let isMissile = false;

      // 1. Background Circle
      if (dist_from_center < r_circle) {
        isYellow = true;
      }

      // 2. Missile Body
      if (y >= y_start && y <= y_end) {
        const wx = Math.abs(dx);
        let hw = 0;
        if (y < y_nose) {
          const t = (y - y_start) / (y_nose - y_start);
          hw = half_width_body * t;
        } else if (y <= y_base) {
          hw = half_width_body;
        } else {
          const t = (y_end - y) / (y_end - y_base);
          hw = half_width_body * t;
        }

        if (wx <= hw) {
          isMissile = true;
        }

        // Left/Right Fins
        if (y >= y_fin_start && y <= y_fin_start + size * 0.12) {
          const fin_flare = (y - y_fin_start) / (size * 0.12);
          const fin_hw = half_width_body + size * 0.08 * fin_flare;
          if (wx <= fin_hw) {
            isMissile = true;
          }
        }
      }

      // 3. Radiation Symbol Cutout on Missile
      if (isMissile) {
        const dy_rad = y - cy_body;
        const r_rad = Math.sqrt(dx * dx + dy_rad * dy_rad);
        if (r_rad < r_rad_center) {
          isMissile = false; // color yellow
        } else if (r_rad >= r_rad_inner && r_rad <= r_rad_outer) {
          const angle_rad = Math.atan2(dy_rad, dx);
          const angleDeg_rad = (angle_rad * 180 / Math.PI + 360) % 360;
          if ((angleDeg_rad >= 60 && angleDeg_rad <= 120) || 
              (angleDeg_rad >= 180 && angleDeg_rad <= 240) || 
              (angleDeg_rad >= 300 && angleDeg_rad <= 360)) {
            isMissile = false; // color yellow
          }
        }
      }

      const offset = rowStart + 1 + x * 4;
      if (isMissile) {
        raw[offset] = br;
        raw[offset + 1] = bg;
        raw[offset + 2] = bb;
      } else if (isYellow) {
        raw[offset] = ar;
        raw[offset + 1] = ag;
        raw[offset + 2] = ab;
      } else {
        raw[offset] = br;
        raw[offset + 1] = bg;
        raw[offset + 2] = bb;
      }
      raw[offset + 3] = 255;
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const idat = zlib.deflateSync(raw);
  return Buffer.concat([signature, pngChunk("IHDR", ihdr), pngChunk("IDAT", idat), pngChunk("IEND", Buffer.alloc(0))]);
}

const configSource = fs.existsSync(configPath) ? fs.readFileSync(configPath, "utf8") : "";
const siteName = readConfigValue(configSource, "siteName", "Example Game Guide");
const gameName = readConfigValue(configSource, "gameName", "Example Roblox Game");
const iconTheme = readConfigValue(configSource, "iconTheme", "default");
const brandColor = normalizeHex(readConfigValue(configSource, "brandColor", "#17241f"), "#17241f");
const accentColor = normalizeHex(readConfigValue(configSource, "accentColor", "#facc15"), "#facc15");

const svg = buildSvg({ siteName, gameName, theme: iconTheme, brandColor, accentColor });
const webmanifest = {
  name: siteName,
  short_name: gameName.slice(0, 24),
  start_url: "/",
  display: "standalone",
  background_color: brandColor,
  theme_color: brandColor,
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    { src: "/icon-192.webp", sizes: "192x192", type: "image/webp" },
    { src: "/icon-512.webp", sizes: "512x512", type: "image/webp" }
  ]
};

for (const file of ["favicon.svg", "icon.svg"]) {
  fs.writeFileSync(path.join(publicDir, file), svg);
}

for (const size of [16, 32, 48, 96, 192, 512]) {
  fs.writeFileSync(path.join(publicDir, `icon-${size}.png`), createPng(size, brandColor, accentColor));
}

fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), createPng(180, brandColor, accentColor));
fs.writeFileSync(path.join(publicDir, "favicon.ico"), createPng(32, brandColor, accentColor));
fs.writeFileSync(path.join(publicDir, "icon-192.webp"), createPng(192, brandColor, accentColor));
fs.writeFileSync(path.join(publicDir, "icon-512.webp"), createPng(512, brandColor, accentColor));
fs.writeFileSync(path.join(publicDir, "site.webmanifest"), `${JSON.stringify(webmanifest, null, 2)}\n`);

console.log(`Generated themed favicon assets in public/ using iconTheme=${iconTheme}.`);
