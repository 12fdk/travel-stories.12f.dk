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

## Task Management

- All tasks should be tracked as GitHub issues
- View issues: `gh issue list` or https://github.com/12fdk/travel-stories.12f.dk/issues

### Workflow for Issues

1. Pick an issue to work on
2. Create a feature branch: `git checkout -b feature/<issue-number>-<short-description>`
3. Work on the feature, committing changes to the branch
4. When complete, merge back to main:
   ```bash
   git checkout main
   git merge feature/<branch-name>
   git push
   ```
5. Close the issue (or reference it in commit with `Fixes #<issue-number>`)
