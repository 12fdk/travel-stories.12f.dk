import type { AppStoreMetadata } from "./appStoreData";

/**
 * Strings rendered by components (not section config) that must localize
 * with the homepage (#22). Defaults live in config.ts; translations override.
 */
export interface UiStrings {
    trustRow: string[];
    ctaAfterUseCases: string;
    ctaAfterComparison: string;
    downloadFree: string;
    stickyNote: string;
    sampleTrip: { label: string; budgetLabel: string; of: string; day: string };
    fromTheBlog: { title: string; heading: string; allPosts: string; minutes: string };
    pricingFootnote: string;
}

export type TemplateConfig = {
    appStore?: AppStoreMetadata;
    /** Locale metadata attached by src/i18n/getConfig.ts. */
    locale?: string;
    homeHref?: string;
    localeAlternates?: { hreflang: string; href: string }[];
    ui?: UiStrings;
    name: string;
    seo: {
        title: string;
        description: string;
    };
    logo: string;
    theme: string;
    backgroundGrid: boolean;
    forceTheme: boolean;
    showThemeSwitch: boolean;
    googlePlayLink?: string | undefined;
    appStoreLink?: string | undefined;
    termsAndConditions: {
        seo: {
            title: string;
            description: string;
        };
        content: string;
    };
    privacyPolicy: {
        seo: {
            title: string;
            description: string;
        };
        content: string;
    };
    cookiesPolicy: {
        seo: {
            title: string;
            description: string;
        };
        content: string;
    };
    footer: {
        links: {
            title: string;
            href: string;
        }[];
        legalLinks: {
            termsAndConditions: boolean;
            privacyPolicy: boolean;
            cookiesPolicy: boolean;
        };
        socials?: {
            facebook?: string | undefined;
            instagram?: string | undefined;
            twitter?: string | undefined;
        } | undefined;
    };
    topNavbar: {
        cta?: string | undefined;
        disableWidthAnimation?: boolean | undefined;
        links: {
            title: string;
            href: string;
        }[];
        hideGooglePlay?: boolean | undefined;
        hideAppStore?: boolean | undefined;
    };
    appBanner?: {
        id?: string | undefined;
        title: string;
        subtitle: string;
        screenshots: string[];
    } | undefined;
    home: {
        seo: {
            title: string;
            description: string;
        };
        header: {
            id?: string | undefined;
            headline: string;
            subtitle: string;
            headlineMark?: number[] | undefined;
            screenshots: string[];
            rewards?: string[] | undefined;
            usersDescription?: string | undefined;
        };
        testimonials?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            cards: {
                name: string;
                comment: string;
            }[];
        } | undefined;
        partners?: {
            id?: string | undefined;
            title: string;
            logos: string[];
        } | undefined;
        faq?: {
            id?: string | undefined;
            title: string;
            qa: {
                question: string;
                answer: string;
            }[];
        } | undefined;
        howItWorks?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            steps: {
                image: string;
                title: string;
                subtitle: string;
            }[];
        } | undefined;
        features?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            cards: {
                icon: string;
                title: string;
                subtitle: string;
            }[];
        } | undefined;
        pricing?: {
            id?: string | undefined;
            title: string;
            actionText?: string | undefined;
            subtitle?: string | undefined;
            plans?: {
                featured?: boolean | undefined;
                title: string;
                price: string;
                rows: string[];
            }[] | undefined;
        } | undefined;
        facts?: {
            label: string;
            value: string;
        }[] | undefined;
        capabilities?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            cards: {
                /** Key into the inline SVG icon set in the capabilities component. */
                icon: string;
                title: string;
                subtitle: string;
            }[];
        } | undefined;
        videoDemo?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            video: string;
            poster: string;
            videoAriaLabel?: string | undefined;
        } | undefined;
        useCases?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            cards: {
                emoji: string;
                title: string;
                subtitle: string;
            }[];
        } | undefined;
        comparison?: {
            id?: string | undefined;
            title: string;
            subtitle?: string | undefined;
            columns: {
                them: string;
                us: string;
            };
            rows: {
                aspect: string;
                them: string;
                us: string;
            }[];
        } | undefined;
    };
}