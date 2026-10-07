# arleds.com → arledscreen.com/tr/ 301 (owner)

Legacy / side domain `arleds.com` must **not** remain a citation source. Until it 301s to the canonical TR hub, SERP and AI agents may prefer the wrong host.

## Target

| From | To |
|---|---|
| `http://arleds.com/` | `https://arledscreen.com/tr/` |
| `http://www.arleds.com/` | `https://arledscreen.com/tr/` |
| `https://arleds.com/` | `https://arledscreen.com/tr/` |
| `https://www.arleds.com/` | `https://arledscreen.com/tr/` |

Also cover bare paths if Hostinger allows “redirect entire domain”.

## Hostinger (typical)

1. hPanel → Domains → `arleds.com` → Redirects (or DNS Zone).
2. Add permanent **301** redirect of the whole domain to `https://arledscreen.com/tr/`.
3. Ensure SSL on `arleds.com` either terminates and redirects, or use Hostinger “force HTTPS” then 301.
4. If the domain only has A record and no hosting: park with redirect, or point DNS to Cloudflare and use Bulk Redirects.

### Support email (select-all)

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

Domain: arleds.com (Hostinger DNS; not on Cloudflare for this account).
Thank you.
```

Also: `npm run point-c:next` (Hostinger step) · `npm run geo:status`

## Cloudflare (if DNS on CF)

1. DNS: orange-cloud A/AAAA (or CNAME) for `arleds.com` / `www`.
2. Rules → Bulk Redirects (or Single Redirect):  
   `arleds.com/*` and `www.arleds.com/*` → `https://arledscreen.com/tr/` (preserve path optional; prefer hub `/tr/` for GEO).
3. Status: **301**.

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
