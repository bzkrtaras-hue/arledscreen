# arleds.com → arledscreen.com/tr/ 301 (owner)

Legacy / side domain `arleds.com` must **not** remain a citation source. Until it 301s to the canonical TR hub, SERP and AI agents may prefer the wrong host.

## Live DNS first (do not open the wrong panel)

```bash
npm run verify:arleds-301
# or: npm run geo:status   → look for mode=…
```

`verify:arleds-301` resolves live NS/A and prints `mode:` plus **Where:/Open:/OpenAlt:** provider tabs. Follow that mode — Hostinger hPanel only helps when NS is actually Hostinger.

| mode | Meaning | Owner next | Open |
|---|---|---|---|
| `dnsenable_tls_dead` | NS = `*.dnsenable.com` (Isimtescil); TLS/HTTP dead | Registrar **Domain Redirect** (below) or move NS to Cloudflare | [isimtescil.net](https://www.isimtescil.net/) · OpenAlt: Gmail draft via `npm run geo:status` |
| `hostinger_*` / `http_200_no_redirect` | NS Hostinger-ish | hPanel Redirects (below) | [hpanel.hostinger.com](https://hpanel.hostinger.com/) |
| `cloudflare_*` / `wrong_location` | NS Cloudflare-ish | CF Bulk Redirect | [dash.cloudflare.com](https://dash.cloudflare.com/) |
| `nxdomain` | No A / NXDOMAIN | Restore NS at registrar first | [isimtescil.net](https://www.isimtescil.net/) |

Observed live (re-check with verify): apex + www on `eu/tr/us.dnsenable.com`, A `194.5.236.174`, probes timeout — **mode=`dnsenable_tls_dead`**. Hostinger hPanel will **not** apply until NS moves.

```
Where: Isimtescil/DNSEnable → Domain Redirect (permanent 301)
Open: https://www.isimtescil.net/
OpenAlt: (Gmail draft Send — see npm run geo:status / point-c.txt)
```

## Target

| From | To |
|---|---|
| `http://arleds.com/` | `https://arledscreen.com/tr/` |
| `http://www.arleds.com/` | `https://arledscreen.com/tr/` |
| `https://arleds.com/` | `https://arledscreen.com/tr/` |
| `https://www.arleds.com/` | `https://arledscreen.com/tr/` |

## Option A — Isimtescil / DNSEnable (current live NS)

**Open:** https://www.isimtescil.net/  
**OpenAlt (support email Send):** Gmail draft from `npm run geo:status` / `point-c.txt` · EML `npm run point-c:dnsenable-eml`

1. Log into the **registrar** panel that holds `arleds.com` (Isimtescil / DNSEnable — not Hostinger).
2. Domain → **Domain Redirect** (or URL Redirect / Forwarding).
3. Permanent **301**: `arleds.com` + `www.arleds.com` → `https://arledscreen.com/tr/`.
4. Re-check: `npm run verify:arleds-301` (exit 0).

### Support email (select-all) — DNSEnable / live NS

```
Subject: Kalıcı 301 yönlendirme arleds.com → https://arledscreen.com/tr/

Merhaba İsimtescil Destek,

arleds.com alan adımız için kalıcı (301) Domain Redirect / URL yönlendirme talebi:

Hedef: https://arledscreen.com/tr/

Lütfen şu eşlemeleri uygulayın (http + https, apex + www):
http://arleds.com/ → https://arledscreen.com/tr/
http://www.arleds.com/ → https://arledscreen.com/tr/
https://arleds.com/ → https://arledscreen.com/tr/
https://www.arleds.com/ → https://arledscreen.com/tr/

DNS: eu/tr/us.dnsenable.com (canlı NS). Hostinger hPanel bu domain için geçerli değil.
Telefon: +90 850 200 0 444 · Domain: arleds.com
Teşekkürler.
```

Also: `npm run point-c:dnsenable-eml` → `docs/ops/arleds-301-dnsenable.eml` · mailto `destek@isimtescil.net` in `point-c.txt` · Gmail draft in `npm run geo:status` / `point-c.txt` · `npm run verify:arleds-301` (prints Open:/OpenAlt:).

## Option B — Cloudflare (align with arledscreen.com)

**Open:** https://dash.cloudflare.com/

1. Add `arleds.com` to the same Cloudflare account as `arledscreen.com`.
2. At registrar, set NS to Cloudflare nameservers.
3. Rules → Bulk Redirects (or Redirect Rules):  
   `arleds.com/*` and `www.arleds.com/*` → `https://arledscreen.com/tr/` · **301**.
4. Re-check: `npm run verify:arleds-301`.

## Hostinger (only if NS is Hostinger)

**Open:** https://hpanel.hostinger.com/  
**OpenAlt:** Hostinger Gmail draft via `npm run geo:status` (only when mode=`hostinger_*`)

1. hPanel → Domains → `arleds.com` → Redirects (or DNS Zone).
2. Add permanent **301** redirect of the whole domain to `https://arledscreen.com/tr/`.
3. Ensure SSL on `arleds.com` either terminates and redirects, or use Hostinger “force HTTPS” then 301.
4. If the domain only has A record and no hosting: park with redirect, or point DNS to Cloudflare and use Bulk Redirects.

### Support email (select-all) — Hostinger NS only

```
Subject: Permanent 301 redirect arleds.com → https://arledscreen.com/tr/

Hello Hostinger Support,

Please set a permanent (301) redirect for the entire domain arleds.com
(including www and both http/https) to:

https://arledscreen.com/tr/

Required mappings:
http://arleds.com/ → https://arledscreen.com/tr/
http://www.arleds.com/ → https://arledscreen.com/tr/
https://arleds.com/ → https://arledscreen.com/tr/
https://www.arleds.com/ → https://arledscreen.com/tr/

Domain: arleds.com (only if Hostinger DNS; skip if NS is dnsenable.com).
Thank you.
```

Also: `npm run point-c:next` (Hostinger step) · `npm run geo:status` · `npm run point-c:hostinger-eml` (writes `docs/ops/arleds-301-hostinger.eml`) · mailto in `point-c.txt` — use only when verify mode is Hostinger.

## Verify

```bash
node scripts/verify-arleds-301.mjs
# or: npm run verify:arleds-301
```

Exit 0 only when all four probes return 301/308 with Location under `https://arledscreen.com/tr`.

## Notes

- Do **not** add `arleds.com` to Organization `sameAs` until the 301 is live.
- GBP / LinkedIn / IG web fields must already be `arledscreen.com` only (`npm run point-c`).
- This repo’s `_redirects` / apex Function only cover **arledscreen.com** `/` → `/tr/`, not the legacy domain.
