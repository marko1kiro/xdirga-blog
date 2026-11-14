# MASTER BUILD PROMPT — XDIRGA BLOG

Modern Minimalist Editorial Blog Platform

Astro | TypeScript | Markdown | MDX | Light & Dark Mode

---

## 1. YOUR ROLE

Act as a Senior UI/UX Designer, Senior Astro Developer, Frontend Architect, Design System Engineer, SEO Specialist, and Performance Engineer.

Your mission is to design and build a complete, modern, responsive, production-ready blog website named:

XDIRGA BLOG

This is a multi-niche digital publication focused on:

- News and current information.
- Technology and digital trends.
- Lifestyle and everyday knowledge.
- Education and general knowledge.
- Practical tips and tutorials.
- Business and productivity.
- Other useful informational topics.

The website must feel like a premium independent digital publication, not a traditional newspaper, not an outdated blog template, and not a generic corporate website.

You are responsible for both the visual implementation and the technical architecture.

Do not deliver a static mockup. Build a genuinely functional website.

---

## 2. VISUAL REFERENCE — CRITICAL

Use the user-provided reference screenshot as the primary visual direction.

Analyze its visual composition, spacing, hierarchy, layout, color treatment, and overall atmosphere.

Do NOT copy its branding, logo, content, or exact identity.

Create an original design identity for XDIRGA BLOG.

Visual characteristics to preserve

1. Soft, subtle magenta-to-cyan gradient surrounding the main website surface, on a white-teal canvas (LIME identity).
2. Clean white main content canvas.
3. Minimalist navigation header.
4. Spacious editorial layout.
5. Large, elegant article headline.
6. Compact author and article metadata.
7. Large featured article image with rounded corners.
8. Two-column article layout on desktop.
9. Contextual sidebar containing social sharing, tags, and related articles.
10. Premium, understated, modern visual language.

Design evolution

Improve the reference into a more contemporary and approachable experience.

The result must be:

- Modern.
- Minimalist.
- Casual but professional.
- Elegant.
- Friendly.
- Content-focused.
- Visually balanced.
- Easy to navigate.
- Comfortable for long-form reading.

Avoid the appearance of:

- Traditional newspapers.
- Old-fashioned magazine layouts.
- Corporate landing pages.
- Generic WordPress blog templates.
- Overly colorful news portals.
- Excessively rounded cartoon-like interfaces.

The design should look custom-made and professionally art-directed.

---

## 3. BRAND IDENTITY

Brand name: XDIRGA BLOG

Brand personality:

- Informative.
- Trustworthy.
- Modern.
- Independent.
- Knowledgeable.
- Approachable.

Brand positioning:

"A place to discover useful information, fresh perspectives, and practical knowledge."

Create a typographic logo using the text XDIRGA BLOG.

The logo should be:

- Clean.
- Distinctive.
- Readable.
- Minimalist.
- Suitable for desktop and mobile.

Do not use generic stock logos.

Use magenta as the primary brand accent and cyan/teal as the secondary accent, following the LIME identity (magenta #c026d3, teal ink #10333d, pink #d946ef).

The identity must remain recognizable in both light and dark modes.

---

## 4. DESIGN SYSTEM

Establish a consistent design system before building individual pages.

### 4.1 Color palette

Palette follows the LIME identity: magenta primary, cyan/teal secondary, white-teal background. Source tokens from the LIME landing page (lihatmeja.com): ink #10333d, magenta #c026d3, pink #d946ef, background #faf8fb, muted #46626c.

Light theme:

--color-background: #FAF8FB;
--color-surface: #FFFFFF;
--color-surface-secondary: #FDF4FF;
--color-text: #10333D;
--color-text-secondary: #46626C;
--color-border: rgba(16, 51, 61, 0.14);
--color-primary: #C026D3;
--color-primary-hover: #A21CAF;
--color-accent: #0891B2;
--color-accent-soft: #ECFEFF;

Dark theme:

--color-background: #0B2730;
--color-surface: #10333D;
--color-surface-secondary: #143F4D;
--color-text: #F2F7F8;
--color-text-secondary: #9DB8C0;
--color-border: rgba(255, 255, 255, 0.12);
--color-primary: #D946EF;
--color-primary-hover: #E879F9;
--color-accent: #22D3EE;
--color-accent-soft: #164E63;

These colors are initial design tokens. Refine their contrast and visual harmony during implementation.

Use a subtle magenta-to-cyan gradient for the outer website background over a white-teal base.

The main reading surface must remain visually calm and comfortable.

Avoid excessive gradients.

### 4.2 Typography

Primary UI font:
Inter or Plus Jakarta Sans.

Editorial headline:
Inter with appropriate weight and spacing.

Optional editorial accent:
Newsreader for selected large headlines only, if it improves the overall composition.

Body typography must prioritize readability.

Suggested sizes:

- Hero headline: 42–52px desktop.
- Article headline: 36–44px desktop.
- Section headings: 24–30px.
- Card headings: 17–21px.
- Article body: 17–19px.
- Metadata: 12–14px.

Mobile typography must scale naturally.

Use comfortable line-height and appropriate paragraph spacing.

### 4.3 Layout

Desktop:

- Maximum main container width: approximately 1280px.
- Article layout: main content + contextual sidebar.
- Main article column: approximately 70%.
- Sidebar: approximately 30%.
- Reading content width: approximately 720px.
- Consistent spacing and alignment.

Tablet:

- Adapt the two-column composition.
- Reduce sidebar width.
- Preserve readability.

Mobile:

- Single-column layout.
- Hide or reposition secondary sidebar content.
- Use comfortable horizontal padding.
- Avoid horizontal scrolling.
- Preserve important article metadata.
- Make navigation touch-friendly.

### 4.4 Component styling

Use:

- Card radius: 12–16px.
- Image radius: 12–16px.
- Button radius: 8–12px.
- Subtle borders.
- Very soft shadows.
- Consistent spacing.
- Clear hover and focus states.

Avoid excessive shadows and unnecessary decorative effects.

---

## 5. WEBSITE ARCHITECTURE

Build using:

- Astro.
- TypeScript.
- Astro Content Collections / Content Layer API.
- Markdown.
- MDX.
- CSS Variables.
- Semantic HTML.
- Minimal client-side JavaScript.

Use Astro's static-first architecture.

Prefer build-time rendering whenever possible.

Do not introduce React, Vue, or other frontend frameworks unless there is a concrete requirement that cannot be handled efficiently with Astro components and lightweight JavaScript.

Use reusable Astro components.

Separate content, layouts, components, utilities, and design tokens.

---

## 6. REQUIRED WEBSITE PAGES

Build all essential pages.

### 6.1 Homepage

Route: /

The homepage should introduce XDIRGA BLOG and provide a comfortable content discovery experience.

Required sections:

1. Header and primary navigation.
2. Featured article / hero section.
3. Latest articles.
4. Trending articles.
5. Category navigation.
6. Selected tips and tutorials.
7. Editor's picks.
8. More articles / discovery section.
9. Optional newsletter section.
10. Footer.

The homepage must use varied content compositions.

Do not repeat the same article card layout for every section.

Use a balance of:

- Featured image cards.
- Compact article lists.
- Horizontal article cards.
- Grid layouts.
- Category highlights.

Keep the homepage clean and avoid excessive content density.

### 6.2 Article Detail

Route: /artikel/[slug]/

This is the most important page.

The article page must closely follow the supplied visual reference.

Desktop composition:

HEADER:

- XDIRGA BLOG logo.
- Navigation.
- Search.
- Theme toggle.

BREADCRUMB:
Home > Category > Article title.

ARTICLE HEADER:

- Category badge.
- Large article headline.
- Article description / subtitle.
- Author avatar and name.
- Publication date.
- Updated date when available.
- Estimated reading time.
- Optional share action.

FEATURED IMAGE:

- Large image.
- Rounded corners.
- Responsive aspect ratio.
- Proper alt text.
- Optional image caption and credit.

ARTICLE BODY:

- Comfortable reading width.
- Clear heading hierarchy.
- Paragraphs with sufficient spacing.
- Lists.
- Blockquotes.
- Inline images.
- Tables.
- Code blocks.
- Callout components.
- Embedded content when appropriate.

SIDEBAR:

- Social sharing.
- Article tags.
- Related articles.
- Optional table of contents.

ARTICLE END:

- Author information.
- Tags.
- Related articles.
- Previous and next article navigation.

On mobile, transform the sidebar into appropriate content sections below or around the article.

Do not squeeze the sidebar into a narrow mobile column.

### 6.3 Category Archive

Route: /kategori/[slug]/

Requirements:

- Category title.
- Category description.
- Featured category article.
- Article listing.
- Pagination.
- Optional subcategory navigation.

### 6.4 Search

Route: /search/

Requirements:

- Functional search input.
- Search result count.
- Matching article cards.
- Empty state.
- Clear search action.

Search must work with statically generated content.

Build a lightweight search index during the Astro build.

Do not download entire Markdown documents into the browser.

### 6.5 Author Archive

Route: /author/[slug]/

Requirements:

- Author profile.
- Avatar.
- Biography.
- Social links when available.
- Published articles.
- Pagination.

### 6.6 Tag Archive

Route: /tag/[slug]/

Requirements:

- Tag title.
- Related articles.
- Pagination.

### 6.7 Static pages

Implement:

- About.
- Contact.
- Privacy Policy.
- Terms of Service.
- 404 Not Found.

---

## 7. HEADER AND NAVIGATION

Create a minimalist responsive header.

Desktop:

- Logo on the left.
- Navigation centered or aligned to the right.
- Search action.
- Light/dark theme toggle.

Suggested navigation:

- Home.
- Berita.
- Teknologi.
- Lifestyle.
- Edukasi.
- Tips.
- Lainnya.

Navigation categories must be configurable.

Mobile:

- Compact header.
- Logo.
- Search icon.
- Theme toggle.
- Mobile menu trigger.

The mobile navigation must be accessible and fully functional.

Use a sticky header only if it improves usability without consuming too much viewport space.

---

## 8. CONTENT MANAGEMENT SYSTEM

Use Astro Content Collections.

Organize content into structured collections.

Recommended structure:

src/content/
articles/
berita/
teknologi/
lifestyle/
edukasi/
tips/
bisnis/
authors/
categories/

Create validated schemas using Zod.

Article frontmatter

Support these fields:

- title
- description
- category
- tags
- author
- publishedAt
- updatedAt
- status
- featured
- trending
- cover
- coverAlt
- coverCaption
- seoTitle
- seoDescription
- canonicalURL
- noindex

Use a validated and consistent schema.

Requirements:

1. Draft content must never appear publicly.
2. Only published content should enter public article listings.
3. Draft content must be excluded from search, sitemap, and RSS.
4. Dates must be validated.
5. Slugs must be unique.
6. Missing required content should produce understandable build errors.
7. Related article logic must not create circular or broken references.

Use Markdown and MDX for article authoring.

Create custom MDX components for:

- Callout.
- InfoBox.
- Article image.
- Table of contents.
- Quote.
- Related content.
- Video embed.

MDX components must have consistent styling in both themes.

---

## 9. ARTICLE CARD SYSTEM

Create reusable article card variants:

1. FeaturedCard.
2. StandardCard.
3. HorizontalCard.
4. CompactCard.
5. TrendingCard.
6. RelatedArticleCard.

Every card should support:

- Cover image.
- Category.
- Title.
- Short description when appropriate.
- Author.
- Publication date.
- Reading time.

Do not force every card to display every field.

Use responsive image dimensions.

Avoid excessive text repetition.

---

## 10. LIGHT AND DARK MODE

Implement a complete theme system.

Required modes:

- Light.
- Dark.
- System preference.

Requirements:

1. Detect system preference.
2. Allow manual theme switching.
3. Save user preference in localStorage.
4. Apply the theme before initial rendering to prevent flash.
5. Ensure all components support both themes.
6. Preserve preference between page navigation.
7. Provide accessible theme controls.
8. Respect system changes when System mode is selected.

Do not implement dark mode by simply inverting colors.

Review contrast, borders, surfaces, images, buttons, code blocks, and overlays separately.

---

## 11. SEO IMPLEMENTATION

SEO is a core requirement.

Implement:

- Dynamic page title.
- Meta description.
- Canonical URL.
- Open Graph.
- Twitter Cards.
- XML sitemap.
- robots.txt.
- RSS feed.
- Breadcrumb structured data.
- Article structured data.
- Organization structured data.
- Person structured data for authors.
- Proper heading hierarchy.

Use:

- BlogPosting or Article for general informational articles.
- NewsArticle for genuine news content.

Do not incorrectly label evergreen tips as breaking news.

Implement correct publication and modification timestamps.

Ensure every indexable article has appropriate metadata.

Prevent draft and noindex content from entering the public sitemap.

Create a consistent URL structure.

Avoid duplicate metadata.

---

## 12. PERFORMANCE

The website must be optimized for real-world usage.

Requirements:

- Use Astro image optimization.
- Support modern image formats.
- Use appropriate responsive image sizes.
- Lazy-load below-the-fold images.
- Prioritize the main hero image.
- Avoid unnecessary JavaScript.
- Avoid layout shifts.
- Optimize font loading.
- Avoid oversized dependencies.
- Use semantic HTML.
- Minimize third-party scripts.

Target Core Web Vitals:

- LCP <= 2.5 seconds.
- INP <= 200ms.
- CLS <= 0.1.

These are acceptance targets, not assumed achievements. Measure the production build.

---

## 13. ACCESSIBILITY

Follow WCAG 2.2 AA principles.

Implement:

- Keyboard navigation.
- Visible focus states.
- Semantic landmarks.
- Accessible navigation.
- Proper button labels.
- Image alt text.
- Sufficient color contrast.
- Accessible form labels.
- Reduced motion support.
- Proper heading hierarchy.

Do not rely on color alone to communicate information.

---

## 14. RESPONSIVE DESIGN

The website must be designed mobile-first.

Test at:

- 360px.
- 375px.
- 390px.
- 430px.
- 768px.
- 1024px.
- 1280px.
- 1440px.

Special attention:

- Article title wrapping.
- Featured image dimensions.
- Sidebar transformation.
- Mobile navigation.
- Category badges.
- Search layout.
- Card image ratios.
- Long article content.
- Tables and code blocks.

No horizontal overflow.

No clipped content.

No excessively small text.

The desktop design must not simply be compressed to fit mobile.

---

## 15. RECOMMENDED PROJECT STRUCTURE

src/
assets/
components/
layout/
navigation/
article/
cards/
sections/
sidebar/
ui/
seo/
content/
articles/
authors/
categories/
layouts/
pages/
styles/
config/
utils/

Use a clean and scalable folder architecture.

Keep components focused and reusable.

Avoid giant components containing unrelated logic.

Do not duplicate the same styling across multiple components.

---

## 16. DESIGN QUALITY REQUIREMENTS

The final implementation must look like a professionally designed digital publication.

Important visual priorities:

1. Strong but elegant visual hierarchy.
2. Consistent spacing.
3. Beautiful article typography.
4. Proper image proportions.
5. Well-balanced sidebar.
6. Clean header.
7. Magenta and cyan visual identity, matching LIME.
8. Comfortable reading surface.
9. Consistent light/dark theme.
10. Excellent mobile experience.

Avoid:

- Generic AI-generated website appearance.
- Excessive gradient effects.
- Too many badges.
- Unnecessary icons.
- Excessive animation.
- Huge empty sections.
- Repetitive card grids.
- Random font combinations.
- Fake interactive elements.
- Placeholder links that appear functional.

Use realistic demo content to demonstrate the complete website.

Do not use Lorem Ipsum.

---

## 17. IMPLEMENTATION WORKFLOW

Work in controlled phases.

PHASE 1 — PROJECT AUDIT

Before making changes:

1. Inspect the existing repository.
2. Identify the current Astro version.
3. Inspect package.json.
4. Inspect existing dependencies.
5. Inspect existing pages and components.
6. Identify existing design tokens.
7. Understand current build and deployment configuration.

Do not blindly replace existing project files.

Preserve working functionality unless a change is necessary.

PHASE 2 — DESIGN FOUNDATION

Build:

- Brand identity.
- Color tokens.
- Typography system.
- Spacing system.
- Responsive containers.
- Light/dark theme foundation.
- Shared UI components.

PHASE 3 — CORE LAYOUTS

Build:

- Base layout.
- Homepage layout.
- Article layout.
- Archive layout.
- Header.
- Navigation.
- Footer.
- Mobile menu.

PHASE 4 — HOMEPAGE

Implement the complete homepage with realistic sample articles.

PHASE 5 — ARTICLE EXPERIENCE

Implement:

- Article detail.
- MDX rendering.
- Article metadata.
- Sidebar.
- TOC.
- Related articles.
- Reading time.
- Reading progress.

PHASE 6 — ARCHIVES AND DISCOVERY

Implement:

- Category pages.
- Tag pages.
- Author pages.
- Search.
- Pagination.

PHASE 7 — SEO AND OPTIMIZATION

Implement all SEO requirements.

Optimize images, typography, rendering, and JavaScript.

PHASE 8 — QUALITY ASSURANCE

Run:

- TypeScript checks.
- Astro checks.
- Production build.
- Route verification.
- Responsive testing.
- Dark mode testing.
- Accessibility testing.
- SEO validation.
- Broken link checks.
- Image loading checks.

Fix all critical errors.

Do not report a feature as complete if it has not been tested.

---

## 18. ACCEPTANCE CRITERIA

The project is complete only when:

[ ] XDIRGA BLOG branding is implemented.
[ ] The visual direction matches the supplied reference.
[ ] The design is modern, minimal, and approachable.
[ ] Homepage is fully functional.
[ ] Article detail page is fully functional.
[ ] Sidebar works correctly on desktop and mobile.
[ ] Category archive works.
[ ] Tag archive works.
[ ] Author archive works.
[ ] Search works with actual article data.
[ ] Pagination works.
[ ] Markdown rendering works.
[ ] MDX components work.
[ ] Draft filtering works.
[ ] Light mode works.
[ ] Dark mode works.
[ ] System theme preference works.
[ ] Theme preference persists.
[ ] SEO metadata is dynamic.
[ ] Structured data is valid.
[ ] Sitemap works.
[ ] RSS works.
[ ] Responsive layouts work.
[ ] Accessibility requirements are addressed.
[ ] Production build succeeds.
[ ] No critical console errors.
[ ] No broken internal links.
[ ] No horizontal overflow.

---

## 19. FINAL DELIVERABLES

At completion, provide:

1. Fully implemented Astro website.
2. Complete reusable design system.
3. Responsive homepage.
4. Article detail template.
5. All required archive pages.
6. Markdown/MDX content architecture.
7. Light/dark theme system.
8. SEO infrastructure.
9. Sample content.
10. Setup and development documentation.
11. Content authoring documentation.
12. Production build instructions.

Also provide a concise implementation report containing:

- What was implemented.
- Important architectural decisions.
- Files and components created.
- Features tested.
- Build results.
- Known limitations, if any.
- Recommended next steps.

---

## 20. FINAL INSTRUCTION

Prioritize visual quality, usability, maintainability, and performance.

Do not rush into generating all pages without establishing a coherent design system.

Use the provided screenshot as the visual inspiration, but create an original and distinctive identity for XDIRGA BLOG.

Make the website feel like a carefully crafted modern digital publication.

The final result should be visually impressive, genuinely functional, responsive, SEO-ready, and maintainable.

Start by auditing the existing project, then proceed through the implementation phases.

Do not stop after producing a plan or mockup.

BUILD THE ACTUAL WEBSITE.
