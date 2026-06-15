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
    nuke: `<defs>
      <g id="official-bomb">
        <path d="M -40,-20 A 40,40 0 0 1 40,-20 C 40,15 20,55 18,55 L 18,70 C 22,70 25,72 25,78 L 25,85 C 25,87 18,89 0,89 C -18,89 -25,87 -25,85 L -25,78 C -25,72 -22,70 -18,70 L -18,55 C -20,55 -40,15 -40,-20 Z" fill="#00d8ff" stroke="${brandColor}" stroke-width="8" stroke-linejoin="round" />
        <path d="M -38,-5 C -20,5 20,5 38,-5" fill="none" stroke="${brandColor}" stroke-width="7" />
        <path d="M -32,15 C -15,25 15,25 32,15" fill="none" stroke="${brandColor}" stroke-width="7" />
        <path d="M -8,55 L -8,70 M 0,55 L 0,70 M 8,55 L 8,70" fill="none" stroke="${brandColor}" stroke-width="5" />
      </g>
    </defs>
    <use href="#official-bomb" x="175" y="205" />
    <use href="#official-bomb" x="337" y="205" />
    <path d="M 244,195 L 268,195 M 256,183 L 256,207" fill="none" stroke="${brandColor}" stroke-width="10" stroke-linecap="round" />
    <path d="M 244,195 L 268,195 M 256,183 L 256,207" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
    <text x="175" y="135" text-anchor="middle" font-family="Arial, sans-serif" font-size="44" font-weight="900" fill="#ffffff" stroke="${brandColor}" stroke-width="8" paint-order="stroke fill">1</text>
    <text x="337" y="135" text-anchor="middle" font-family="Arial, sans-serif" font-size="44" font-weight="900" fill="#ffffff" stroke="${brandColor}" stroke-width="8" paint-order="stroke fill">1</text>`,
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
  const raw = Buffer.alloc((size * 4 + 1) * size);

  const cx1 = size * 0.34;
  const cx2 = size * 0.66;
  const cy = size * 0.46;
  
  // Plus sign center
  const cx_plus = size * 0.5;
  const cy_plus = size * 0.44;

  function checkBomb(x, y, cx, cy) {
    const dx = x - cx;
    const dy = y - cy;
    const wx = Math.abs(dx);
    const y_start = cy - size * 0.14;
    const y_end = cy + size * 0.14;

    if (y < y_start || y > y_end) return 0; // outside

    const cap_cy = cy - size * 0.04;
    const R_cap = size * 0.08;

    if (y < cap_cy) {
      const dist = Math.sqrt(dx * dx + (y - cap_cy) * (y - cap_cy));
      if (dist <= R_cap) {
        if (dist > R_cap - size * 0.015) return 1; // outline
        return 2; // fill
      }
    } else if (y <= cy + size * 0.08) {
      const t = (y - cap_cy) / (size * 0.12);
      const hw = R_cap * (1 - 0.55 * t);
      if (wx <= hw) {
        if (wx > hw - size * 0.015) return 1; // outline
        
        // Add stripes
        const offset_y = y - cy;
        if (offset_y >= -size * 0.01 && offset_y <= size * 0.01) return 1;
        if (offset_y >= size * 0.035 && offset_y <= size * 0.055) return 1;
        
        return 2; // fill
      }
    } else {
      const hw = size * 0.05;
      if (wx <= hw) {
        if (wx > hw - size * 0.015 || y > y_end - size * 0.015) return 1; // outline
        
        // vertical tail fins inside the stabilizer ring
        const ox = dx / size;
        if (Math.abs(ox - 0.016) < 0.005 || Math.abs(ox) < 0.005 || Math.abs(ox + 0.016) < 0.005) {
          return 1;
        }

        return 2; // fill
      }
    }
    return 0;
  }

  function checkNumberOne(x, y, cx, cy) {
    const dx = x - cx;
    const dy = y - cy;
    const adx = Math.abs(dx);
    const y_len = size * 0.05;
    const x_thick = size * 0.008;

    // Outer outline (black)
    const stemOutline = (adx <= x_thick + size * 0.012 && dy >= -y_len/2 - size * 0.01 && dy <= y_len/2 + size * 0.01);
    const baseOutline = (adx <= size * 0.025 && dy >= y_len/2 - size * 0.008 && dy <= y_len/2 + size * 0.016);
    const flagOutline = (dx >= -size * 0.02 && dx <= 0 && dy >= -y_len/2 - size * 0.01 && dy <= -y_len/2 + size * 0.015);

    // Inner fill (white)
    const stemFill = (adx <= x_thick && dy >= -y_len/2 && dy <= y_len/2);
    const baseFill = (adx <= size * 0.016 && dy >= y_len/2 - size * 0.002 && dy <= y_len/2 + size * 0.008);
    const flagFill = (dx >= -size * 0.012 && dx <= 0 && dy >= -y_len/2 && dy <= -y_len/2 + size * 0.008);

    if (stemFill || baseFill || flagFill) return 2; // fill
    if (stemOutline || baseOutline || flagOutline) return 1; // outline
    return 0;
  }

  for (let y = 0; y < size; y += 1) {
    const rowStart = y * (size * 4 + 1);
    raw[rowStart] = 0;
    for (let x = 0; x < size; x += 1) {
      const offset = rowStart + 1 + x * 4;

      let r_val = br, g_val = bg, b_val = bb;
      let drawn = false;

      // 1. Plus Sign (+)
      const dx_p = x - cx_plus;
      const dy_p = y - cy_plus;
      const adx_p = Math.abs(dx_p);
      const ady_p = Math.abs(dy_p);

      const insideWhitePlus = (adx_p <= size * 0.008 && ady_p <= size * 0.04) || (ady_p <= size * 0.008 && adx_p <= size * 0.04);
      const insideBlackPlus = (adx_p <= size * 0.018 && ady_p <= size * 0.05) || (ady_p <= size * 0.018 && adx_p <= size * 0.05);

      if (insideWhitePlus) {
        r_val = 255;
        g_val = 255;
        b_val = 255;
        drawn = true;
      } else if (insideBlackPlus) {
        r_val = br;
        g_val = bg;
        b_val = bb;
        drawn = true;
      }

      // 2. Numbers "1"
      if (!drawn) {
        const leftNum = checkNumberOne(x, y, cx1, cy - size * 0.20);
        const rightNum = checkNumberOne(x, y, cx2, cy - size * 0.20);
        const numState = Math.max(leftNum, rightNum);

        if (numState === 2) {
          r_val = 255;
          g_val = 255;
          b_val = 255;
          drawn = true;
        } else if (numState === 1) {
          r_val = br;
          g_val = bg;
          b_val = bb;
          drawn = true;
        }
      }

      // 3. Left and Right Bombs
      if (!drawn) {
        const leftBomb = checkBomb(x, y, cx1, cy);
        const rightBomb = checkBomb(x, y, cx2, cy);
        const bombState = Math.max(leftBomb, rightBomb);

        if (bombState === 1) {
          r_val = br;
          g_val = bg;
          b_val = bb;
        } else if (bombState === 2) {
          r_val = 0;
          g_val = 216;
          b_val = 255;
        }
      }

      raw[offset] = r_val;
      raw[offset + 1] = g_val;
      raw[offset + 2] = b_val;
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
