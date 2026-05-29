# Tatoosh Marine — Neah Bay PWA (v0.1)

A weekend prototype: live marine weather, buoy obs, tides, and bar-crossing assessment for the area within 65 mi of Tatoosh Island, tuned for sport/commercial fishing.

## What's in the box

- `index.html` — the whole app (UI + logic in one file)
- `manifest.json` — makes it installable as a PWA
- `sw.js` — service worker (offline shell, network-first for data)
- `icon-192.png`, `icon-512.png` — app icons

## Data sources (all NOAA, public, free)

| Source | What it gives |
|---|---|
| NDBC realtime2 (.txt) | Live wind, gust, wave height, dominant period, SST, air temp, pressure |
| NWS api.weather.gov | Zone PZZ150 plain-language marine forecast (Cape Flattery → James Island out 10 NM) |
| CO-OPS tidesandcurrents.noaa.gov | Neah Bay tide predictions (station 9443090) |

## Stations included (within / near 65 mi of Tatoosh)

| ID | Name | Dist (mi) |
|---|---|---|
| TTIW1 | Tatoosh Island C-MAN | 0.1 |
| NEAW1 | Neah Bay (land) | 5.7 |
| 46087 | Neah Bay Buoy (offshore) | 7.1 |
| LAPW1 | La Push | 33.4 |
| DESW1 | Destruction Island | 50.7 |
| PTAW1 | Port Angeles | 62.4 |
| 46041 | Cape Elizabeth (ext) | 71.8 |
| 46088 | New Dungeness (ext) | 72.2 |

## How to host it (free options)

The simplest free static hosts:

1. **GitHub Pages** — drop these 5 files into a repo, enable Pages on the main branch. Live in 2 minutes.
2. **Netlify Drop** — go to app.netlify.com/drop, drag the folder in. Done.
3. **Cloudflare Pages** — connect a repo or upload via wrangler.
4. **Vercel** — `vercel deploy` from this directory.

You need HTTPS for the PWA to be installable. All four options above give you HTTPS free.

## How to install on your phone

Once hosted at an HTTPS URL:
- **iPhone**: open in Safari → Share → "Add to Home Screen"
- **Android**: open in Chrome → menu → "Install app" or "Add to Home Screen"

## CORS note

`api.weather.gov` and `tidesandcurrents.noaa.gov` send CORS headers, so they work direct from the browser. NDBC's `.txt` endpoint sometimes does, sometimes doesn't, depending on which edge node responds. The app tries direct first, then falls back to `corsproxy.io` (a free public proxy). For production you'd want your own tiny worker (Cloudflare Workers, ~10 lines) to proxy NDBC.

## What's next (if you want v0.2)

- WaveWatch III forecast at a chosen point (16-day swell forecast)
- HRRR/NAM wind forecast at a chosen point
- Map view, tap-to-pick location
- Saved spots, alert thresholds ("notify me when 46087 swell < 5 ft")
- Push notifications
- Plain-language "captain's brief" via an LLM API
- Canadian DFO buoys (46206 La Pérouse Bank — just outside 65 mi but very relevant)
