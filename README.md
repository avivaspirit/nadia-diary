# Nadia's Diary Website

This is a private birthday and doll diary website for Nadia.

Project folder:

`C:\Users\Re dmi\Documents\Codex\2026-06-01\create-a-website-for-me-it\outputs\doll-diary`

Local website:

`http://127.0.0.1:4173/index.html`

GitHub Pages website:

`https://ddianeyy.github.io/nadia-diary/`

## Very Important Photo Rule

Whenever the user uploads a new photo in this chat or a future chat, copy it into:

`C:\Users\Re dmi\Documents\Codex\2026-06-01\create-a-website-for-me-it\outputs\doll-diary\ALL Nadia Website Photos`

If the photo is used on the website, also copy a web-ready version into:

`C:\Users\Re dmi\Documents\Codex\2026-06-01\create-a-website-for-me-it\outputs\doll-diary\assets\uploads`

Use `assets/uploads` paths in the website code, for example:

`./assets/uploads/photo-name.jpg`

Do not use absolute Windows paths in HTML/CSS/JS because they will not work on GitHub Pages.

## Current Pages

- `index.html` is the home page, called Dianeyy.
- `collection.html` is Nadia's Dolls / tiny cabinet.
- `birthday.html` is the Happy Birthday page (light the candles, then the letters).

Preview files may exist, but the real pages above are the ones to upload.

## How To Edit Content (Important)

ALL text, photos, notes, letters, and dolls live in ONE file:

`content/site-data.js`

Open it, edit any text or photo path, save, and re-upload that file.
No other file needs to change for content edits.

Supporting files (do not edit for content changes):

- `assets/css/diary.css` — the design system for all three pages.
- `assets/js/magic.js` — shared animation: sparkles, scroll reveals, lightbox, confetti, page transitions.
- `assets/js/home.js`, `assets/js/dolls.js`, `assets/js/birthday.js` — page renderers.

Legacy files (`styles.css`, `fluffy-preview.css`, `script.js`, `content/content.js`,
`content/site.json`, `content/dolls.json`, the `*-preview.*` files, and `admin/`)
are no longer used by the live pages. They are kept for history only —
editing `content/site.json` or the admin panel will NOT change the live site anymore.

## Uploading To GitHub

Upload the contents of this folder to GitHub, not just the HTML files.

Make sure these folders are included:

- `assets`
- `assets/uploads`
- `content`
- `admin`
- `ALL Nadia Website Photos`

If `assets/uploads` is missing online, the website will show broken photos.

After upload, test this image:

`https://ddianeyy.github.io/nadia-diary/assets/uploads/nadia-mac-pov-collage.jpg`

If that opens, the website photos should work.

## Design Direction

The website should feel soft, fluffy, romantic, and polished.

Nadia's style is feminine, polished, pretty, soft pink, elegant cafe/travel photos, cute dolls, plushies, charms, bows, and warm diary energy.

Keep the layout mobile-friendly and avoid cropping faces badly. For portrait photos, use frame/tape/card layouts where her face is clearly visible.

## Git Notes

This folder is already a git repo.

Remote should point to:

`https://github.com/ddianeyy/nadia-diary.git`

If pushing works, use git. If pushing is blocked, manually upload the whole folder contents on GitHub.
