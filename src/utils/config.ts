import type { TemplateConfig } from "./configType";

const templateConfig: TemplateConfig = {
  name: "Travel Stories",
  seo: {
    title: "Travel Stories - Trip Planner for iPhone | Plan, Organize & Remember Adventures",
    description:
      "Travel Stories is a free iPhone app for planning, organising, and remembering every adventure. Create itineraries, track expenses, manage packing lists, and access everything offline. Download on the App Store.",
  },
  // Draws grid behind main container
  backgroundGrid: false,
  logo: "/logo.svg",
  theme: "travel",
  // Forces theme to be chosen above, no matter what user prefers
  forceTheme: false,
  // Shows switch to toggle between dark and light modes
  showThemeSwitch: true,
  appStoreLink:
    "https://apps.apple.com/dk/app/travel-stories-trip-planner/id6756801168",
  googlePlayLink: "",
  footer: {
    legalLinks: {
      termsAndConditions: false,
      cookiesPolicy: false,
      privacyPolicy: false,
    },
    socials: {},
    links: [
      { href: "/#features", title: "Features" },
      { href: "/#how-it-works", title: "How it works" },
      { href: "/#faq", title: "FAQ" },
    ],
  },
  topNavbar: {
    cta: "Get the app",
    disableWidthAnimation: false,
    hideAppStore: false,
    hideGooglePlay: true,
    links: [
      { href: "/#features", title: "Features" },
      { href: "/#how-it-works", title: "How it works" },
      { href: "/#faq", title: "FAQ" },
    ],
  },
  appBanner: {
    id: "app-banner",
    title: "Download Travel Stories Today!",
    subtitle:
      "Your all-in-one travel companion for planning, organising, and remembering every adventure. Available on the App Store.",
    screenshots: [
      "/screenshots/trips-list.webp",
      "/screenshots/trip-detail.webp",
      "/screenshots/itinerary.webp",
    ],
  },
  home: {
    seo: {
      title: "Travel Stories - Trip Planner for iPhone | Plan, Organize & Remember Adventures",
      description:
        "Travel Stories is a free iPhone app for planning, organising, and remembering every adventure. Create itineraries, track expenses, manage packing lists, and access everything offline. Download on the App Store.",
    },
    testimonials: {
      id: "testimonials",
      title: "What Travelers Say",
      subtitle: "Hear from adventurers using Travel Stories",
      cards: [
        {
          name: "Sarah M.",
          comment:
            "Travel Stories completely transformed how I plan my trips. The day-by-day itinerary feature with interactive maps made navigating Tokyo so easy. I never missed a single activity!",
        },
        {
          name: "Michael K.",
          comment:
            "The budget tracking feature is incredible. I used to always overspend on trips, but now I can see exactly where my money goes with the visual expense breakdowns. Saved me hundreds on my last Europe trip.",
        },
        {
          name: "Emma L.",
          comment:
            "As someone who always forgets something when packing, the smart packing lists with 100+ suggested items are a lifesaver. The departure reminders also ensure I never miss a booking!",
        },
      ],
    },
    partners: {
      title: "",
      logos: [],
    },
    howItWorks: {
      id: "how-it-works",
      title: "How it works",
      subtitle:
        "Plan your perfect trip in minutes with Travel Stories",
      steps: [
        {
          title: "Create Your Trip",
          subtitle:
            "Set your destination, travel dates, and budget to get started with your adventure planning.",
          image: "/stock/01.webp",
        },
        {
          title: "Build Your Itinerary",
          subtitle:
            "Add activities day-by-day with interactive maps to visualize your journey and never miss a moment.",
          image: "/stock/02.webp",
        },
        {
          title: "Organize Everything",
          subtitle:
            "Manage bookings for flights, hotels, and car rentals. Use smart packing lists and set departure reminders.",
          image: "/stock/03.webp",
        },
        {
          title: "Track Your Budget",
          subtitle:
            "Monitor expenses with visual breakdowns to stay on track and make the most of your travel budget.",
          image: "/stock/04.webp",
        },
        {
          title: "Capture Memories",
          subtitle:
            "Take photos and create a digital travel diary to remember every adventure, even offline.",
          image: "/stock/05.webp",
        },
      ],
    },
    features: {
      id: "features",
      title: "Everything You Need for Your Travels",
      subtitle:
        "Plan, organize, and remember every adventure with powerful features",
      cards: [
        {
          title: "Day-by-Day Itineraries",
          subtitle:
            "Create detailed trip plans with interactive maps to visualize your journey. Add activities, attractions, and reservations for each day.",
          icon: "/icons/itinerary.png",
        },
        {
          title: "Budget Tracking",
          subtitle:
            "Monitor your travel expenses with visual breakdowns by category. Set budgets and stay on track throughout your trip.",
          icon: "/icons/budget-tracking.png",
        },
        {
          title: "Smart Packing Lists",
          subtitle:
            "Never forget essentials with 100+ suggested items. Customize lists for each trip type and check off items as you pack.",
          icon: "/icons/packing-list.png",
        },
        {
          title: "Offline Access",
          subtitle:
            "Access your itineraries, bookings, and travel diary even without internet. Perfect for remote destinations.",
          icon: "/icons/offline-access.png",
        },
      ],
    },
    faq: {
      id: "faq",
      title: "Frequently Asked Questions",
      qa: [
        {
          question: "Is Travel Stories free to use?",
          answer:
            "Yes, it's free! We also offer a Premium Lifetime upgrade with more advanced features.",
        },
        {
          question: "Does the app work offline?",
          answer:
            "Absolutely! Travel Stories is designed to work offline so you can access your itineraries, bookings, packing lists, and travel diary even in remote destinations without internet access.",
        },
        {
          question: "What devices are supported?",
          answer:
            "Travel Stories is currently available for iPhone and requires iOS 17.0 or later. We're focused on delivering the best possible experience on iOS first.",
        },
        {
          question: "How do I track my travel expenses?",
          answer:
            "Simply add expenses as you go during your trip. Travel Stories provides visual breakdowns by category so you can see exactly where your money is going and stay within your budget.",
        },
        {
          question: "Can I share my itinerary with others?",
          answer:
            "Not yet, but it's coming!",
        },
      ],
    },
    header: {
      headline: "Plan Your Perfect Adventure",
      subtitle:
        "Travel Stories is your all-in-one travel companion for planning, organising, and remembering every adventure. Create itineraries, track expenses, and capture memories.",
      screenshots: [
        "/screenshots/packing-list.webp",
        "/screenshots/itinerary.webp",
        "/screenshots/trips-list.webp",
      ],
      rewards: [],
      usersDescription: "Join travelers planning their adventures",
      headlineMark: [2, 3],
    },
  },
  privacyPolicy: {
    seo: {
      title: "Privacy Policy - Travel Stories",
      description: "Privacy Policy for Travel Stories - Trip Planner",
    },
    content: `# Privacy Policy

**Effective Date:** January 2026

## Introduction

Welcome to Travel Stories (the "App"). Robert Jensen ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your personal information when you use our App.

For the full privacy policy, please visit: [https://www.12f.dk/travel-stories/privacy-policy/](https://www.12f.dk/travel-stories/privacy-policy/)

## Contact Us

If you have any questions or concerns about this Privacy Policy, please contact us at:

Robert Jensen
Adjudantvaenget 12, 3520 Farum, Denmark
robert@12f.dk
+45 29475566

`,
  },
  cookiesPolicy: {
    seo: {
      title: "Cookies Policy - Travel Stories",
      description: "Cookies Policy for Travel Stories",
    },
    content: `# Cookies Policy

This website does not use cookies for tracking or advertising purposes.

## Contact Us

If you have any questions, please contact us at robert@12f.dk
`,
  },
  termsAndConditions: {
    seo: {
      title: "Terms and Conditions - Travel Stories",
      description: "Terms and Conditions for Travel Stories - Trip Planner",
    },
    content: `# Terms and Conditions

**Effective Date:** January 2026

## Introduction

Welcome to Travel Stories (the "App"). These Terms and Conditions govern your use of the App provided by Robert Jensen ("we," "our," or "us"). By accessing or using our App, you agree to be bound by these Terms.

## Use of the App

### Eligibility
To use our App, you must be at least 4 years old (as per App Store rating).

### User Accounts
You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.

## Intellectual Property

All content and materials available on the App are the property of Robert Jensen and are protected by intellectual property laws.

## Disclaimers

The App is provided on an "as is" and "as available" basis. We make no warranties about the accuracy or completeness of the content.

## Governing Law

These Terms shall be governed by and construed in accordance with the laws of Denmark.

## Contact Us

If you have any questions about these Terms, please contact us at:

Robert Jensen
Adjudantvaenget 12, 3520 Farum, Denmark
robert@12f.dk
+45 29475566
`,
  },
};

export default templateConfig;
