# 05 · Site Architecture

```
/                                   Home: problem → three fixes → process → letter (form)
├── /services                       Hub (new): the three ways, one paragraph each
│   ├── /services/website-design      (was /services/websites, 308)
│   ├── /services/custom-software     (was /services/software, 308)
│   └── /services/ai-automation       (was /services/automation, 308)
├── /contact                        The letter + form
├── /privacy                        Privacy notice
└── (later, only with real material)
    ├── /work, /work/[slug]         Case studies, after client permission (see 07)
    ├── /insights/[slug]            Guides written from first-hand experience (see 07, 08)
    └── /about                      After founder photos and an approved bio
```

## Decisions

- **No city or country pages.** There's no confirmed physical presence, and Google's spam policies treat near-identical location pages as doorways.
- **No industry pages yet.** No case studies back them. Add one only when a real project exists in that industry.
- **Breadcrumbs** (visible plus `BreadcrumbList`) on every page below the homepage.
- **Internal links:**
    - Home → hub and each service, with descriptive anchors.
    - Each service → the other two ("Not the right fix?") and → contact.
    - The footer links all services, contact and privacy.
- **Not linked and not indexed:** `/concepts/*` is `noindex` and allowed to be crawled, so Google can see the noindex. It's internal design history.
