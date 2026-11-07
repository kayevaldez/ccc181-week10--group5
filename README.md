# CCC181 Week 10: CampusConnect Mobile-First Login Page

React + TypeScript starter for the Week 10 group activity. The page is already
built. Your group's job is the **mobile-first CSS** and the **GitHub teamwork**.

## Run it

```bash
npm install
npm run dev          # open the local URL it prints
npm run dev:phone    # same, but your phone (same Wi-Fi) can open the Network URL
npm run build        # must finish with no errors before you submit
```

## Rules

- Edit only the CSS files in `src/styles/` (one member = one file). Do not edit `reset.css`.
- Plain CSS only. No Tailwind, Bootstrap, Material UI, styled-components, or any UI library.
- Phone styles first (no media query), then `min-width` queries only. Never `max-width`.
- Do not edit the `.tsx` files or rename classes. If you must, tell the group first.

## Group information (fill in)

| Item | Your answer |
| --- | --- |
| Group number | 4 |
| Section | IT3-A |
| Repository URL | https://github.com/kayevaldez/ccc181-week10--group5 |

## Members (each member fills in their own row in their own commit)

| Member | Name | GitHub username | CSS file | What I did |
| --- | --- | --- | --- | --- |
| 1 (leader) | Sam Dadole | samdadole-max | `base.css` | Added the viewport meta tag in index.html. Wrote base.css: phone layout, container, and brand panel with Grid and rem, plus 768px, 1024px, and 1280px rules. |
| 2 | Kaye Valdez | kayevaldez | `nav.css` | Wrote nav.css: phone navbar with brand on top and stacked 48px links, and footer in 1 column. Used Flexbox for the navbar (brand left and links in one row with flex-direction: row from 768px) and Grid for the footer (3 columns from 1024px). |
| 3 | Faith Alexa Jabien | faith alexa jabien | form.css | Wrote form.css with Flexbox: phone layout with stacked full-width fields, checkbox row, link and buttons, 48px tall inputs with 16px text, and the Show/Hide button beside the password input. At 768px, the checkbox and "Forgot password?" sit side by side, the two bottom buttons sit side by side, and the card gets max-width: 32rem, centered. At 1024px, the card padding becomes 2.5rem. |  

## Experiment 0: the page without the viewport tag

What did the page look like in DevTools phone mode **before** adding the viewport meta tag?
What changed **after** adding it?

> (
Before adding the viewport meta tag, the browser assumed a standard desktop screen width (around 980px) and forcibly zoomed out the page to make the entire layout fit within the small mobile screen width. Because of this artificial zoom-out effect, all text, inputs, buttons, and layout elements appeared microscopic, compressed, and completely unreadable without manually pinching and zooming in.

Adding the viewport meta tag (`<meta name="viewport" content="width=device-width, initial-scale=1.0">`) instructed the browser to match the layout viewport width directly to the physical device's screen width (e.g., 360px). As a result:
1. Text, inputs, and touch targets scaled up to human-readable size at a 1:1 pixel scale without manual zooming.
2. Mobile-first CSS rules and media queries evaluated against the actual screen width rather than the simulated desktop width.
3. Horizontal overflow was eliminated, allowing the mobile layout to stack smoothly in a single column.)

## DevTools test results

| Width | What must be true | Pass? |
| --- | --- | --- |
| 360 px | 1 column. Nav links stacked and 48px tall. Options and buttons stacked. Footer in 1 column. No sideways scrollbar. | |
| 768 px | Nav in one row (brand left, links right). Checkbox and link in one row. Two buttons side by side. | |
| 1024 px | Brand panel and login card side by side. Footer in 3 columns. Heading is larger. | |
| 1280 px | Content centered and stops at 1200px. | |

### Breakpoints I observed

Using **Show media queries** and dragging slowly from 360 px to 1280 px, the layout changed at these exact widths:

> (Using Show media queries and dragging slowly from 360 px to 1280 px, the layout changed at these exact widths:
- **360 px:** Starting layout (no breakpoint here). Nav links stacked in one column. Checkbox and "Forgot password?" stacked. The two bottom buttons stacked. Brand panel above the login card. Footer in 1 column.
- **768 px:** Nav changed to one row. Checkbox and "Forgot password?" moved side by side. The two bottom buttons moved side by side.
- **1024 px:** Brand panel and login card moved side by side. Footer changed to 3 columns. Heading grew larger and the extra list appeared.
- **1280 px:** Container stopped at 1200px and became centered.

No width looked broken, and no sideways scrollbar appeared, including when the error messages showed.)

Screenshots are in `screenshots/` as `360.png`, `768.png`, `1024.png`, `1280.png`.

## What our group learned (leader writes this last)

> (The group applied mobile-first web development principles to style the CampusConnect login page, leveraging relative units, CSS Grid, Flexbox, and min-width media queries at 360px, 768px, 1024px, and 1280px to build a responsive layout. Beyond layout design, the activity emphasized key accessibility and usability practices, such as optimizing touch targets, ensuring readable inputs, testing focus states, and verifying form interactions to prevent horizontal scrolling. Finally, the team reinforced best collaboration practices by managing feature branches, conducting pull request reviews, maintaining clear README documentation, and validating the final submission through error-free npm run build checks.)

## Part 2: How to run

**Terminal 1: the backend**
cd server
npm install
copy .env.example .env      (Mac/Linux: cp .env.example .env)
npm start

Edit `server/.env` first. It must show: `API running on http://localhost:3000`.

**Terminal 2: the front end (project root)**
npm install
copy .env.example .env      (Mac/Linux: cp .env.example .env)
npm run dev

Open `http://localhost:5173`.

Demo account: `student@campusconnect.test` / `Campus26`

Two settings files (never commit `.env`):
- `server/.env.example`: `PORT`, `JWT_SECRET`, `CLIENT_ORIGIN`
- `.env.example` (root): `VITE_API_URL`

## API summary

| Method | Endpoint | Success | Errors |
| --- | --- | --- | --- |
| GET | `/api/v1/health` | 200 | none |
| POST | `/api/v1/sessions` | 200 | 400, 401 |
| GET | `/api/v1/users/me` | 200 | 401 |

Full details: [docs/API-SPEC.md](docs/API-SPEC.md)

## Who did what in Part 2

| Member | Name | GitHub username | What I did in Part 2 |
| --- | --- | --- | --- |
| 1 | Sam Dadole | samdadole-max | Set up `server/` with Express, `.env`, CORS and JSON. Built `POST /api/v1/sessions` with validation, bcryptjs, a 1-hour token, and the demo user. |