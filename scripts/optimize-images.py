"""Generate responsive WebP variants for images in public/projects and public/brand.

Also indexes blog originals that already live under public/opt/blog/ (legacy
/blog/* 301s to /tr/rehber/, so OptImage keys stay as /blog/<file> while files
are served from /opt/blog/).

Output: public/opt/<relative-path-without-ext>-<width>.webp
Run: python3 scripts/optimize-images.py   (requires Pillow)
"""
import json, os, re
from PIL import Image, ImageOps

ROOT = os.path.join(os.path.dirname(__file__), "..", "public")
SRC_DIRS = ["projects", "brand", "control"]
# Control-card device photos: also keep a full-size WebP (same dimensions as the original).
FULL_SIZE_DIRS = {"control"}
WIDTHS = [480, 960, 1600]
manifest = {}
for d in SRC_DIRS:
    for r, _, files in os.walk(os.path.join(ROOT, d)):
        for f in files:
            if not f.lower().endswith((".jpg", ".jpeg", ".png")):
                continue
            src = os.path.join(r, f)
            rel = os.path.relpath(src, ROOT).replace(os.sep, "/")
            base = os.path.splitext(rel)[0]
            im = ImageOps.exif_transpose(Image.open(src))
            has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
            im = im.convert("RGBA" if has_alpha else "RGB")
            w, h = im.size
            widths = [x for x in WIDTHS if x < w] + [min(w, WIDTHS[-1])]
            if d in FULL_SIZE_DIRS:
                widths.append(w)
            widths = sorted(set(widths))
            out = []
            for tw in widths:
                th = round(h * tw / w)
                dst = os.path.join(ROOT, "opt", base + f"-{tw}.webp")
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                im.resize((tw, th), Image.LANCZOS).save(dst, "WEBP", quality=78 if not has_alpha else (80 if d in FULL_SIZE_DIRS else 85), method=6)
                out.append(tw)
            manifest["/" + rel] = {"w": w, "h": h, "widths": out}

# Blog: originals already under public/opt/blog/; keep /blog/ manifest keys.
blog_dir = os.path.join(ROOT, "opt", "blog")
if os.path.isdir(blog_dir):
    for f in sorted(os.listdir(blog_dir)):
        if not f.lower().endswith((".jpg", ".jpeg", ".png")):
            continue
        src = os.path.join(blog_dir, f)
        im = ImageOps.exif_transpose(Image.open(src))
        w, h = im.size
        stem = os.path.splitext(f)[0]
        widths = sorted(
            {
                int(m.group(1))
                for name in os.listdir(blog_dir)
                if (m := re.match(rf"^{re.escape(stem)}-(\d+)\.webp$", name))
            }
        )
        if not widths:
            widths = [x for x in WIDTHS if x < w] + [min(w, WIDTHS[-1])]
            widths = sorted(set(widths))
            has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
            rgb = im.convert("RGBA" if has_alpha else "RGB")
            for tw in widths:
                th = round(h * tw / w)
                dst = os.path.join(blog_dir, f"{stem}-{tw}.webp")
                rgb.resize((tw, th), Image.LANCZOS).save(
                    dst, "WEBP", quality=78 if not has_alpha else 85, method=6
                )
        manifest[f"/blog/{f}"] = {"w": w, "h": h, "widths": widths}

with open(os.path.join(os.path.dirname(__file__), "..", "src", "content", "image-manifest.json"), "w") as fh:
    json.dump(manifest, fh, indent=0, sort_keys=True)
    fh.write("\n")
print(len(manifest), "images")
