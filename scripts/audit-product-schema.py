#!/usr/bin/env python3
"""Audit JSON-LD Product/Offer completeness across all sitemap pages (TR+EN).

usage: audit-product-schema.py BASE_URL OUT_FILE [--sitemap-from URL]
BASE_URL: where pages are fetched (live site, local server or preview).
Sitemap is read from --sitemap-from (default BASE_URL/sitemap.xml); <loc> hosts are rewritten to BASE_URL.
"""
import sys, re, json, random, concurrent.futures as cf
from urllib.parse import urlparse
import requests

base = sys.argv[1].rstrip("/")
out = sys.argv[2]
smurl = base + "/sitemap.xml"
if "--sitemap-from" in sys.argv:
    smurl = sys.argv[sys.argv.index("--sitemap-from") + 1]
sm = requests.get(smurl, timeout=30).text
paths = []
for loc in re.findall(r"<loc>([^<]+)</loc>", sm):
    p = urlparse(loc)
    paths.append(p.path or "/")
paths = sorted(set(paths))

RE = re.compile(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', re.S)

def types_of(n):
    t = n.get("@type")
    return t if isinstance(t, list) else [t]

def walk(x, ctx=""):
    """yield (node, path) for every dict with @type"""
    if isinstance(x, dict):
        if "@type" in x:
            yield x, ctx
        for k, v in x.items():
            yield from walk(v, ctx + "/" + k)
    elif isinstance(x, list):
        for i, v in enumerate(x):
            yield from walk(v, ctx)

def first(x):
    return x[0] if isinstance(x, list) and x else x

def offer_issues(o, require_ship_rate=True):
    t = types_of(o)
    iss = []
    agg = "AggregateOffer" in t
    if agg:
        for f in ("lowPrice", "priceCurrency"):
            if not o.get(f):
                iss.append("missing " + f)
    else:
        ps = o.get("priceSpecification") or {}
        if not (o.get("price") not in (None, "") or (isinstance(ps, dict) and ps.get("price") not in (None, ""))):
            iss.append("missing price")
        if not (o.get("priceCurrency") or (isinstance(ps, dict) and ps.get("priceCurrency"))):
            iss.append("missing priceCurrency")
    for f in ("availability", "validFrom", "priceValidUntil", "description"):
        if not o.get(f):
            iss.append("missing " + f)
    mrp = o.get("hasMerchantReturnPolicy")
    if not mrp:
        iss.append("missing hasMerchantReturnPolicy")
    else:
        mrp = first(mrp)
        if isinstance(mrp, dict) and not mrp.get("returnMethod"):
            iss.append("missing returnMethod")
    sd = o.get("shippingDetails")
    if not sd:
        iss.append("missing shippingDetails")
    else:
        sd = first(sd)
        if isinstance(sd, dict):
            if not sd.get("shippingRate"):
                iss.append("missing shippingDetails.shippingRate")
            if not sd.get("deliveryTime"):
                iss.append("missing shippingDetails.deliveryTime")
            if not sd.get("shippingDestination"):
                iss.append("missing shippingDetails.shippingDestination")
    return iss

def audit_page(path):
    url = base + path + ("&" if "?" in path else "?") + "cb=%d" % random.randint(1, 10**9)
    try:
        r = requests.get(url, timeout=40, headers={"Cache-Control": "no-cache"})
    except Exception as e:
        return path, {"error": str(e)}
    if r.status_code != 200:
        return path, {"error": "HTTP %d" % r.status_code}
    res = {"parse_errors": 0, "products": [], "offers_free": [], "nameless_product": [], "no_offers_product": [], "product_offer_issues": [], "other_offer_issues": []}
    blocks = RE.findall(r.text)
    nodes = []
    for b in blocks:
        try:
            d = json.loads(b)
        except Exception:
            res["parse_errors"] += 1
            continue
        nodes.append(d)
    all_nodes = []
    for d in nodes:
        for n, ctx in walk(d):
            all_nodes.append((n, ctx))
    # Offers that belong to a Product (checked under C) are excluded from D.
    owned = set()
    for n, ctx in all_nodes:
        if "Product" in types_of(n) or "ProductModel" in types_of(n):
            offs = n.get("offers")
            for o in (offs if isinstance(offs, list) else [offs] if offs else []):
                if isinstance(o, dict):
                    owned.add(id(o))
    for n, ctx in all_nodes:
        t = types_of(n)
        if "Product" in t:
            pid = n.get("@id") or n.get("sku") or "?"
            has_offers = bool(n.get("offers")) or bool(n.get("review")) or bool(n.get("aggregateRating"))
            res["products"].append(pid)
            if not n.get("name"):
                res["nameless_product"].append("%s (at %s)" % (pid, ctx or "/"))
            elif not has_offers:
                res["no_offers_product"].append(pid)
            # offers of this product
            offs = n.get("offers")
            offs = offs if isinstance(offs, list) else ([offs] if offs else [])
            for o in offs:
                if isinstance(o, dict) and "@type" in o:
                    iss = offer_issues(o)
                    if iss:
                        res["product_offer_issues"].append((pid, o.get("@id", "(no id)"), iss))
                    for sub in (o.get("offers") if isinstance(o.get("offers"), list) else []):
                        if isinstance(sub, dict) and "@type" in sub:
                            iss = offer_issues(sub)
                            if iss:
                                res["product_offer_issues"].append((pid, sub.get("@id", "(no id)"), iss))
        elif "ProductModel" in t:
            res.setdefault("models", []).append(n.get("@id") or n.get("sku") or "?")
        elif ("Offer" in t or "AggregateOffer" in t) and id(n) not in owned:
            # Offers not directly under a Product (Service, Organization, ItemList...) - informational
            if "/offers" in ctx and ("Product" in ctx or False):
                pass
            iss = offer_issues(n)
            if iss:
                res["other_offer_issues"].append((n.get("@id", "(no id)"), ctx, iss))
        # shipping rate 0 / free claims
        sd = n.get("shippingRate") if isinstance(n, dict) else None
        if isinstance(sd, dict) and str(sd.get("value")) in ("0", "0.0", "0.00"):
            res["offers_free"].append(path)
    return path, res

results = {}
with cf.ThreadPoolExecutor(max_workers=10) as ex:
    for path, res in ex.map(audit_page, paths):
        results[path] = res

lines = []
P = lines.append
P("Product/Offer JSON-LD audit")
P("base=%s sitemap=%s pages=%d" % (base, smurl, len(paths)))
errs = {p: r["error"] for p, r in results.items() if "error" in r}
ok = {p: r for p, r in results.items() if "error" not in r}
P("fetch errors: %d" % len(errs))
for p, e in errs.items():
    P("  ERR %s %s" % (p, e))
P("JSON-LD parse errors (blocks): %d" % sum(r["parse_errors"] for r in ok.values()))
pages_with_prod = {p: r for p, r in ok.items() if r["products"]}
P("pages with typed Product nodes: %d  (Product node occurrences: %d)" % (len(pages_with_prod), sum(len(r["products"]) for r in ok.values())))
np = [(p, x) for p, r in ok.items() for x in r["nameless_product"]]
no = [(p, x) for p, r in ok.items() for x in r["no_offers_product"]]
pi = [(p, x) for p, r in ok.items() for x in r["product_offer_issues"]]
oi = [(p, x) for p, r in ok.items() for x in r["other_offer_issues"]]
P("")
P("A) Product nodes WITHOUT name (stubs): %d on %d pages" % (len(np), len({p for p, _ in np})))
P("B) Named Product nodes WITHOUT offers/review/aggregateRating: %d on %d pages" % (len(no), len({p for p, _ in no})))
P("C) Offers under Products with missing fields: %d on %d pages" % (len(pi), len({p for p, _ in pi})))
P("D) Offers elsewhere (Service/Org/etc., informational) with missing fields: %d on %d pages" % (len(oi), len({p for p, _ in oi})))
from collections import Counter
c = Counter()
for p, (pid, oid, iss) in pi:
    for i in iss:
        c[i] += 1
P("   C) by field: " + ", ".join("%s=%d" % kv for kv in sorted(c.items())))
c2 = Counter()
for p, (oid, ctx, iss) in oi:
    for i in iss:
        c2[i] += 1
P("   D) by field: " + ", ".join("%s=%d" % kv for kv in sorted(c2.items())))
P("ProductModel nodes (quote-only datasheet pages, no published price; not Google Product items): %d on %d pages" % (sum(len(r.get("models", [])) for r in ok.values()), sum(1 for r in ok.values() if r.get("models"))))
P("shippingRate value 0 (free shipping claim) occurrences: %d" % sum(len(r["offers_free"]) for r in ok.values()))
P("")
P("== A) nameless Product nodes (page | node) ==")
byp = {}
for p, x in np:
    byp.setdefault(p, []).append(x)
for p, xs in sorted(byp.items()):
    P("%s : %d  e.g. %s" % (p, len(xs), xs[0]))
P("")
P("== B) named Product nodes lacking offers ==")
for p, x in no:
    P("%s | %s" % (p, x))
P("")
P("== C) Product offers with missing fields (page | product | offer | issues) ==")
seen = set()
for p, (pid, oid, iss) in pi:
    P("%s | %s | %s | %s" % (p, pid, oid, "; ".join(iss)))
P("")
P("== D) other Offers with missing fields (grouped by issue set; first 3 pages) ==")
grp = {}
for p, (oid, ctx, iss) in oi:
    grp.setdefault((tuple(iss), ctx.split("/")[-1] if ctx else ""), []).append((p, oid))
for (iss, ctx), lst in grp.items():
    P("- %s [ctx=%s] x%d  e.g. %s" % ("; ".join(iss), ctx, len(lst), "; ".join("%s %s" % x for x in lst[:3])))
P("")
P("== ProductModel pages ==")
for p, r in sorted(ok.items()):
    for m in r.get("models", []):
        P("%s : %s" % (p, m))
P("")
P("== Pages with typed Product nodes ==")
for p, r in sorted(pages_with_prod.items()):
    P("%s : %s" % (p, ", ".join(sorted(set(r["products"])))[:300]))
open(out, "w").write("\n".join(lines) + "\n")
print("\n".join(lines[:22]))
