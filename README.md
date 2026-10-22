# Jarvis Collegiate MUN Portal

A responsive, clean/minimal static website for Jarvis Collegiate Model United Nations. It includes announcement cards, searchable conference listings, modal forms, simple animations, and a browser-local demo profile.

## Run it locally

**Quickest:** open `index.html` in a modern browser.

**Recommended:** from this folder, run a small local server:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

No build step or package installation is required.

## Update announcements and conferences

Edit `data.js`. The file contains `announcements` and `conferences` arrays. Change the sample entries to official information and keep the JavaScript syntax (quotes, commas, and brackets) valid.

For conference cards:
- `name`: conference or event name
- `type`: e.g. In-person, Virtual, Workshop
- `status`: e.g. Applications open, Registration soon, Planning
- `date`, `location`, `description`: display information
- `link`: optional official URL, beginning with `https://`
- `linkLabel`: optional link label

For announcements, edit the first item to change the featured card. Later items appear in the notice list.

## Publish it free with GitHub Pages

1. Sign in to GitHub and create a repository, e.g. `jarvis-mun-portal`.
2. Upload `index.html`, `styles.css`, `app.js`, `data.js`, and this README to the repository root.
3. Open **Settings → Pages**.
4. Under build/deployment, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
5. Wait for the published URL shown on the Pages settings screen.
6. To post an update later, open `data.js` on GitHub, click the pencil icon, edit the relevant text, and commit the change. Pages will redeploy automatically.

You can also clone the repository and edit locally, then commit and push your changes.

## What works now

- Responsive desktop/mobile layout and navigation
- Conference search
- Announcement and conference content loaded from `data.js`
- Student demo profile saved in the current browser using `localStorage`
- Interest form saved in the current browser using `localStorage`
- Form validation, confirmation messages, dialogs, and reduced-motion support

## Important limitations: accounts and shared submissions

This is a **static front-end implementation**. It does **not** provide real authentication, shared data, an administrator dashboard, or server-side form submissions.

- The demo profile is not a secure account. It is only stored in that browser/device; do not use passwords or sensitive information.
- Interest form submissions remain in the submitting browser. Club leaders will not receive them.
- `localStorage` is specific to a browser/device and can be cleared by the user.
- Anyone with repository write access can edit `data.js`. Do not put private student information in it.

### To make accounts and forms genuinely shared

Connect a backend such as **Supabase** (Auth + Postgres database) or Firebase:
1. Create a project and enable student authentication (use school-approved sign-in options if available).
2. Create an announcements/conferences table and an interest-submissions table.
3. Add access rules so only authorized club administrators can publish/edit portal content, and students can submit/view only what they are allowed to.
4. Replace the demo localStorage handlers with authenticated database operations.
5. Keep privileged service-role keys on a server; never commit them into GitHub or browser JavaScript.
6. Add an admin interface or continue managing public announcement content through reviewed GitHub commits.

For a school portal, check with the club advisor and school board before collecting student emails or other personal information. Use school-approved storage and privacy practices.

## Suggested first launch checklist

- Replace all sample/TBA entries in `data.js` with verified information.
- Add the club advisor's approved contact method.
- Confirm whether the school permits a public GitHub Pages site.
- Decide whether the interest form should be connected to an approved backend or replaced with an official school form.
