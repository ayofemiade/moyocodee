# 12 · Analytics and Conversion Plan

**Today:** no analytics, no cookies, no tracking. The privacy notice says so. **Nothing was installed in this round.** Any analytics needs the founder's decision and a privacy-notice update first.

## Step 1: Google Search Console (free, no tracking on visitors). Recommended now

1. Open [search.google.com/search-console](https://search.google.com/search-console) and add a **Domain** property `moyocode.com`.
2. Google shows a TXT record. Add it in Hostinger → DNS for moyocode.com, then click Verify. (Or send Claude the HTML-tag token, and it goes into `metadata.verification.google`.)
3. Submit `https://www.moyocode.com/sitemap.xml` under Sitemaps.
4. In Bing Webmaster Tools, choose "Import from Google Search Console".

This gives the real numbers this audit couldn't: index coverage, queries, impressions, clicks, Core Web Vitals field data and links.

## Step 2: conversions without personal data

- **The conversion is "enquiry delivered".** It already happens server-side and lands in Gmail. Each email is the source of truth for counting qualified enquiries.
- **Monthly log:** enquiries, qualified (yes/no), source if the visitor said, and outcome. Kept by the founder in a sheet. Personal data never goes to analytics.

## Step 3 (optional): privacy-friendly analytics

| Option | Cookies | Notes |
|---|---|---|
| **Vercel Web Analytics** (recommended if wanted) | None | Page views and referrers on the same host. Enable in the Vercel dashboard; check plan limits and custom-event availability there |
| GA4 | Yes, by default | Needs a consent banner under NDPA-style consent and a privacy update. Heavier. Not recommended for this site's size |

**Events worth counting (no personal data):**
- `enquiry_submitted` (success state only)
- `cta_click` (hero and service CTAs)
- `pick_problem` (the problem ledger)
- Later `whatsapp_click` and `email_click` once those channels are published
