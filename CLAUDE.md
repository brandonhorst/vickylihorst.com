# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for Vicky Li Horst Product Coaching - a personal website showcasing product management coaching services. The site is built with vanilla HTML, CSS, and JavaScript without any build tools or frameworks.

## Development Commands

### Local Development Server
```sh
cd site
python3 -m http.server
```
This starts a local development server to preview the site. Access via http://localhost:8000

### File Structure
- `site/` - Contains all website files
  - `index.html` - Main landing page with all content sections
  - `style.css` - All styling and responsive design
  - `script.js` - Testimonial carousel functionality
  - `lineicons.css` - Icon font styles
  - `img/` - Responsive images including headshots and social media assets
  - `fonts/` - LineIcons font files
  - Redirect pages: `about/index.html`, `newsletter/index.html`, `schedule/index.html`
  - Utility pages: `404.html`, `error.html`, `success.html`

## Architecture

### Single Page Application
The main content lives in `site/index.html` as a single-page site with these key sections:
- Hero section with call-to-action
- About/problem statement sections
- Testimonials with interactive carousel
- Contact form with external submission handling

### Styling Approach
- CSS custom properties (variables) for theming in `:root`
- Responsive design with mobile-first breakpoints
- Flexbox-based layout system with `.content` containers
- Consistent spacing and typography scales

### Interactive Features
- Testimonial carousel (`script.js`) with infinite scroll effect
- Smooth scrolling navigation between sections
- Form submission via submit-form.com service
- Botpoison integration for spam protection

### External Integrations
- Google Analytics (gtag.js) for tracking
- Contact form submission via submit-form.com
- Botpoison for form spam protection
- LineIcons for consistent iconography

## Key Files to Understand

- `site/index.html` - Complete site structure and content
- `site/script.js` - Carousel functionality with DOM manipulation
- `site/style.css` - CSS variables and responsive design foundation

The site uses no build process, package managers, or JavaScript frameworks - all code is vanilla web technologies served statically.