# Travel Stories Landing Page

## Project Overview
Static landing page for the **Travel Stories - Trip Planner** iOS app, hosted on GitHub Pages at `travel-stories.12f.dk`.

Based on [mobile-app-landing-template](https://github.com/sofiyevsr/mobile-app-landing-template).

## Tech Stack
- **Framework**: Astro + React
- **Language**: TypeScript
- **Styling**: TailwindCSS + DaisyUI
- **Package Manager**: pnpm
- **Node Version**: 20+

## App Store Integration
The website should automatically pull data from the iOS App Store:

- **App Store URL**: https://apps.apple.com/dk/app/travel-stories-trip-planner/id6756801168
- **App ID**: 6756801168
- **Bundle ID**: 12f.travel-stories

### Data to Fetch Automatically
- App icon
- Screenshots
- App name and description
- Version info
- Rating/reviews (if available)
- Price information

### App Store Lookup API
```
https://itunes.apple.com/lookup?id=6756801168&country=dk
```

## Development

### Local Development (Docker)
```bash
docker-compose up
```
Site available at: http://localhost:4321

### Local Development (Native)
```bash
pnpm install
pnpm dev
```

### Build for Production
```bash
pnpm build
```
Output in `dist/` folder.

## Configuration
Main configuration in `src/utils/config.ts` - customize:
- App details
- Theme (DaisyUI themes available)
- Feature sections
- Testimonials
- Partner logos

## Deployment
- **Host**: GitHub Pages
- **Domain**: travel-stories.12f.dk
- **Branch**: Deploy from `gh-pages` branch or use GitHub Actions

### GitHub Pages Setup
1. Enable GitHub Pages in repository settings
2. Configure custom domain: `travel-stories.12f.dk`
3. Add CNAME file with domain
4. Configure DNS: CNAME record pointing to `<username>.github.io`

## Project Structure
```
/
├── public/           # Static assets
├── src/
│   ├── components/   # React/Astro components
│   ├── layouts/      # Page layouts
│   ├── pages/        # Astro pages
│   └── utils/        # Config and utilities
├── docker-compose.yml
├── Dockerfile.dev
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## App Information (Reference)
- **App Name**: Travel Stories - Trip Planner
- **Developer**: Robert Jensen
- **Contact**: robert@12f.dk
- **Privacy Policy**: https://www.12f.dk/travel-stories/privacy-policy/
- **Category**: Travel
- **Price**: Free (Premium Lifetime: 19 kr)
- **iOS Requirement**: iOS 17.0+

## Claude Code Instructions

- Always run all local tests using Docker
- Use agent-browser to test the website after making changes

## Tasks / Roadmap

- [ ] Set up base template
- [ ] Configure Docker development environment
- [ ] Implement App Store data fetching
- [ ] Customize theme and branding
- [ ] Add app screenshots to hero section
- [ ] Configure GitHub Pages deployment
- [ ] Set up GitHub Actions for automatic builds
