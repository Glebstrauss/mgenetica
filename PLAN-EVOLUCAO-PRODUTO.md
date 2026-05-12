# MGenética Academy - Roadmap & Project Plan

## 1. Product Vision
Transform MGenética from a static course website into a **Scientific Interactive Learning Platform**. The core value proposition is "Luminous Precision": bridging biological theory, R simulation, and technical decision-making with a premium, academic-grade user experience.

## 2. Technology Stack Evolution

### Current Stack (v5)
- **Engine:** Quarto (Static Website)
- **Language:** R (Content generation)
- **Frontend:** SCSS (Bootstrap-based custom design) + Vanilla JS (Local storage progress)
- **Hosting:** GitHub Pages

### Suggested Stack (v6 - "The Lab")
- **Content Engine:** **Quarto** (Keep for modules; it's the best for R-native content).
- **Platform Shell:** **Astro** (Migrate landing pages and layout to Astro for better DX, performance, and component-based UI).
- **Interactivity:** **WebR** (Integrate R execution directly in the browser for "Script Lab" modules).
- **Components:** **Svelte or React** (For complex UI like the Quiz engine and interactive simulations).
- **Persistence:** **Supabase (Lite)** (For optional cloud-sync progress and certificate verification).

## 3. UI/UX Enhancement Plan

### Phase 1: Visual Refinement (v5 Finalization)
- [ ] **Typography:** Standardize on "Inter" Variable font. Use tight tracking for headings and generous leading (1.7) for body text.
- [ ] **Spacing:** Implement a strict 8px-based spacing system. Increase negative space in the Hero.
- [ ] **Modules Grid:** Ensure 3-column layout is perfectly balanced with consistent card heights.

### Phase 2: Interactive Experience (v6)
- [ ] **In-Browser Lab:** Replace static code blocks with editable WebR playgrounds in Module pages.
- [ ] **Real-time Progress:** Create a "Dashboard" view (perfil.qmd) showing completion badges and time-spent analytics.
- [ ] **View Transitions:** Use the View Transitions API for smooth, app-like navigation between modules.
- [ ] **Micro-interactions:** Add subtle hover states (cyan borders) and scroll-triggered fade-ins for "Scientific Precision" feel.

## 4. Performance Optimization
- **Image Optimization:** Use Astro's `Image` component (or Quarto's equivalent) for automatic WebP conversion and resizing.
- **Bundle Splitting:** Move from a single 7k+ line SCSS file to component-scoped styles.
- **Critical CSS:** Inline critical styles to ensure <1s LCP (Largest Contentful Paint).
- **Pagefind:** Optimize search indexing for faster client-side results.

## 5. Security Approach
- **Client-side Sandbox:** Using WebR ensures all user code runs in a sandboxed browser environment, preventing server-side vulnerabilities.
- **Content Integrity:** Use Subresource Integrity (SRI) for all third-party libraries (e.g., MathJax, Pagefind).
- **Secure Certificates:** Implement a verification system where certificates are generated via a signed hash of the user's completion record, checkable via a public API endpoint (Supabase RLS).

## 6. Project Status & Interoperability
I have created `project_status.md` to serve as the source of truth for all AI agents working on this repository.
