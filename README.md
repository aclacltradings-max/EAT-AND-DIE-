# EAT BELLEFULL

Single-page landing site for EAT BELLEFULL, a food and drinks business selling
hot meals, soft drinks, bottled water, snacks and everyday provisions.
Plain HTML, CSS and JavaScript — no framework, no build step.

## Sections

- **Hero** — headline, call to action and a demo order basket
- **What We Sell** — nine food, drink and provision categories
- **Pricing Demo** — indicative price table plus three order plans
- **Why Us** — four trust points
- **Contact** — form that opens WhatsApp with the order pre-filled

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Configure

All the details you need to change live in two files:

| What | Where |
| --- | --- |
| WhatsApp number | `script.js` → `WHATSAPP_NUMBER` |
| Phone, email, address, hours | `index.html` → `#contact` section |
| Prices | `index.html` → `#pricing` table and `.quote-lines` |
| Brand colours | `styles.css` → `:root` cream variables |

The WhatsApp number must be digits only, in full international format with no
`+` or spaces — for example `2348012345678` for a Nigerian number.

> The prices shipped in the repo are demo values. Replace them with your real
> rates before going live.
