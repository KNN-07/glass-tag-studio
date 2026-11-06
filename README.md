# Glass / Tag Studio

A browser-based glass mousepad artwork and signature editor. Choose common dimensions or custom millimeters, upload PNG/JPEG/WebP artwork, adjust cropping, and customize brand/model tags, colors, placement and opacity. Export PNGs at a chosen pixel density or save/open an editable JSON project.

Images stay in the browser. No backend, account, or upload service is required. The optional Google Fonts stylesheet is external.

Serve `dist/` with any static HTTP server. GitHub Actions deploys this directory to GitHub Pages.

## Design reference

The compact edge branding is inspired by the WALLHACK SP-004 brand/model signature documented at https://dpqp.jp/archive/wallhack-sp-004 and the official product page https://wallhack.com/en-eu/pages/sp-004-landing-page. This is an independent tool. It does not reproduce the proprietary logo or claim to identify the factory printing process.

Presets are convenient size templates, not a catalog of verified product specifications. Exports do not include bleed or CMYK conversion. Set physical dimensions in printing software; the chosen DPI determines pixel dimensions, not embedded PNG resolution metadata.
