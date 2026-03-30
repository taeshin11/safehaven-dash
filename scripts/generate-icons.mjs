// Generate simple SVG-based PNG icons for PWA
// We create a simple branded icon using a canvas-like SVG approach
import { writeFileSync } from 'fs';

// Generate a simple SVG icon
function generateSVG(size) {
  const padding = Math.round(size * 0.1);
  const innerSize = size - padding * 2;
  const fontSize = Math.round(size * 0.28);
  const subtitleSize = Math.round(size * 0.09);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0F172A"/>
      <stop offset="100%" style="stop-color:#1E293B"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#D4AF37"/>
      <stop offset="100%" style="stop-color:#2563EB"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.15)}" fill="url(#bg)"/>
  <rect x="${padding}" y="${padding}" width="${innerSize}" height="${innerSize}" rx="${Math.round(size * 0.1)}" fill="url(#bg)" stroke="url(#accent)" stroke-width="${Math.round(size * 0.02)}"/>
  <text x="${size / 2}" y="${size * 0.48}" font-family="system-ui,-apple-system,sans-serif" font-size="${fontSize}" font-weight="700" fill="#F1F5F9" text-anchor="middle">SH</text>
  <text x="${size / 2}" y="${size * 0.65}" font-family="system-ui,-apple-system,sans-serif" font-size="${subtitleSize}" font-weight="500" fill="#D4AF37" text-anchor="middle">DASH</text>
</svg>`;
}

// Write SVG icons (browsers accept SVG for favicons)
writeFileSync('public/icons/icon-192.svg', generateSVG(192));
writeFileSync('public/icons/icon-512.svg', generateSVG(512));

// For the manifest, we need PNGs. We'll use the SVG as favicon and
// reference SVGs in the manifest (modern browsers support this)
console.log('SVG icons generated. For PNG conversion, use the OG image route.');
