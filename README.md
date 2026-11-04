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
| 3 | | | `form.css` | |    

## Experiment 0: the page without the viewport tag

What did the page look like in DevTools phone mode **before** adding the viewport meta tag?
What changed **after** adding it?

> (write your answer here)

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

> (write your answer here)
