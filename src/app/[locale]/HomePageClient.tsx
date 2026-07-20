"use client";

import { useState, Suspense, lazy } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock,
  Compass,
  Crosshair,
  Crown,
  Dna,
  Dumbbell,
  Egg,
  ExternalLink,
  Footprints,
  Gamepad2,
  Gift,
  Lightbulb,
  Package,
  PawPrint,
  Sparkles,
  Star,
  Swords,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

// Tools Grid 卡片对应的 section 锚点（与下方 8 个模块一一对应）
const TOOLS_SECTION_IDS = [
  "codes",
  "beginner-guide",
  "dinosaur-tier-list",
  "dinosaurs-guide",
  "gameplay-guide",
  "upgrade-guide",
  "tips-and-tricks",
  "updates-guide",
];

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.dinohunterswiki.wiki";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Dino Hunters Wiki",
        description:
          "Complete Dino Hunters Wiki covering codes, dinosaurs, weapons, maps, upgrades, tier lists, bosses, and hunting guides for the Roblox dinosaur hunting adventure.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Dino Hunters - Dinosaur Hunting Adventure Game",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Dino Hunters Wiki",
        alternateName: "Dino Hunters",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Dino Hunters Wiki - Dinosaur Hunting Adventure Game",
        },
        description:
          "Complete Dino Hunters Wiki resource hub for codes, dinosaurs, weapons, maps, upgrades, and hunting guides",
        sameAs: [
          "https://www.roblox.com/games/119031147890918/Dino-Hunters",
          "https://www.roblox.com",
        ],
      },
      {
        "@type": "VideoGame",
        name: "Dino Hunters",
        gamePlatform: ["Roblox", "PC", "Mobile"],
        applicationCategory: "Game",
        genre: ["Adventure", "Action", "Survival", "Hunting"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 20,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: "0",
          availability: "https://schema.org/InStock",
          url: "https://www.roblox.com/games/119031147890918/Dino-Hunters",
        },
      },
      {
        "@type": "VideoObject",
        name: "How to Play Dino Hunters Roblox - Full Guide",
        description:
          "Dino Hunters gameplay guide video covering dinosaur hunting, capturing, upgrades and progression in the Roblox dinosaur hunting adventure.",
        uploadDate: "2024-08-10",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/8RO7tA-6feY",
        url: "https://www.youtube.com/watch?v=8RO7tA-6feY",
      },
    ],
  };

  // Tips & Tricks accordion state
  const [tipsExpanded, setTipsExpanded] = useState<number | null>(null);
  const mobileBannerAd = getPreferredMobileBannerSelection();

  const handleToolClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("codes")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <Gift className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://www.roblox.com/games/119031147890918/Dino-Hunters"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section - 紧跟 Hero 区域之后 */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="8RO7tA-6feY"
              title="How to Play Dino Hunters Roblox - Full Guide"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards（视频区之后、Latest Updates 之前） */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = TOOLS_SECTION_IDS[index];
              return (
                <a
                  key={index}
                  href={`#${sectionId}`}
                  onClick={(e) => handleToolClick(e, sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Updates Section（Tools Grid 之后） */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: Codes */}
      <section id="codes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Gift className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {t.modules.dinoHuntersCodes.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.dinoHuntersCodes.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              {t.modules.dinoHuntersCodes.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-3xl mx-auto">
              {t.modules.dinoHuntersCodes.intro}
            </p>
          </div>

          {/* Reward category cards */}
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Gift, ...t.modules.dinoHuntersCodes.rewards[0] },
              { icon: Zap, ...t.modules.dinoHuntersCodes.rewards[1] },
              { icon: Package, ...t.modules.dinoHuntersCodes.rewards[2] },
              { icon: Star, ...t.modules.dinoHuntersCodes.rewards[3] },
            ].map((card: any, index: number) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="mb-3 h-10 w-10 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <h3 className="font-bold text-base md:text-lg mb-1.5">
                    {card.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{card.description}</p>
                </div>
              );
            })}
          </div>

          {/* How to redeem steps */}
          <div className="scroll-reveal p-5 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4 md:mb-5">
              <Check className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-base md:text-lg">
                How to Redeem Codes
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t.modules.dinoHuntersCodes.redeemSteps.map(
                (step: any, index: number) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                      <span className="text-sm font-bold text-[hsl(var(--nav-theme-light))]">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 广告位 4: 第一模块之后的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: Beginner Guide */}
      <section
        id="beginner-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <BookOpen className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {t.modules.dinoHuntersBeginnerGuide.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.dinoHuntersBeginnerGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              {t.modules.dinoHuntersBeginnerGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-3xl mx-auto">
              {t.modules.dinoHuntersBeginnerGuide.intro}
            </p>
          </div>

          {/* Steps */}
          <div className="scroll-reveal space-y-3 md:space-y-4 mb-8 md:mb-10">
            {t.modules.dinoHuntersBeginnerGuide.steps.map(
              (step: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                    <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Quick Tips */}
          <div className="scroll-reveal p-4 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Lightbulb className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-base md:text-lg">Quick Tips</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.dinoHuntersBeginnerGuide.quickTips.map(
                (tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{tip}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Module 3: Dinosaur Tier List */}
      <section
        id="dinosaur-tier-list"
        className="scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Trophy className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {t.modules.dinoHuntersDinosaurTierList.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.dinoHuntersDinosaurTierList.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              {t.modules.dinoHuntersDinosaurTierList.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-3xl mx-auto">
              {t.modules.dinoHuntersDinosaurTierList.intro}
            </p>
          </div>

          {/* Tier grid */}
          <div className="scroll-reveal space-y-3 md:space-y-4">
            {[
              { icon: Crown, opacity: 0.28, ...t.modules.dinoHuntersDinosaurTierList.tiers[0] },
              { icon: Trophy, opacity: 0.22, ...t.modules.dinoHuntersDinosaurTierList.tiers[1] },
              { icon: Target, opacity: 0.16, ...t.modules.dinoHuntersDinosaurTierList.tiers[2] },
              { icon: PawPrint, opacity: 0.1, ...t.modules.dinoHuntersDinosaurTierList.tiers[3] },
            ].map((tier: any, index: number) => {
              const Icon = tier.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-white/5 border border-border rounded-xl"
                  style={{ borderLeft: `4px solid hsl(var(--nav-theme))` }}
                >
                  <div
                    className="flex h-14 w-14 md:h-20 md:w-20 flex-shrink-0 items-center justify-center rounded-xl border"
                    style={{
                      backgroundColor: `hsl(var(--nav-theme)/${tier.opacity})`,
                      borderColor: `hsl(var(--nav-theme)/${Math.min(tier.opacity + 0.15, 0.5)})`,
                    }}
                  >
                    <span className="text-2xl md:text-4xl font-bold text-[hsl(var(--nav-theme-light))]">
                      {tier.tier}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--nav-theme-light))] flex-shrink-0" />
                      <h3 className="font-bold text-base md:text-lg">
                        {tier.label}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base">
                      {tier.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 4: Dinosaurs Guide */}
      <section
        id="dinosaurs-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <PawPrint className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {t.modules.dinoHuntersDinosaursGuide.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.dinoHuntersDinosaursGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              {t.modules.dinoHuntersDinosaursGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-3xl mx-auto">
              {t.modules.dinoHuntersDinosaursGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: PawPrint, ...t.modules.dinoHuntersDinosaursGuide.items[0] },
              { icon: Footprints, ...t.modules.dinoHuntersDinosaursGuide.items[1] },
              { icon: Egg, ...t.modules.dinoHuntersDinosaursGuide.items[2] },
              { icon: Crown, ...t.modules.dinoHuntersDinosaursGuide.items[3] },
              { icon: Dumbbell, ...t.modules.dinoHuntersDinosaursGuide.items[4] },
              { icon: Dna, ...t.modules.dinoHuntersDinosaursGuide.items[5] },
            ].map((card: any, index: number) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center">
                      <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                      {card.rarity}
                    </span>
                  </div>
                  <h3 className="font-bold mb-1.5">{card.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 5: 内容中段阅读停顿 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 5: Gameplay Guide */}
      <section id="gameplay-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Gamepad2 className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {t.modules.dinoHuntersGameplayGuide.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.dinoHuntersGameplayGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              {t.modules.dinoHuntersGameplayGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-3xl mx-auto">
              {t.modules.dinoHuntersGameplayGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Crosshair, ...t.modules.dinoHuntersGameplayGuide.items[0] },
              { icon: Swords, ...t.modules.dinoHuntersGameplayGuide.items[1] },
              { icon: Users, ...t.modules.dinoHuntersGameplayGuide.items[2] },
              { icon: Compass, ...t.modules.dinoHuntersGameplayGuide.items[3] },
              { icon: Package, ...t.modules.dinoHuntersGameplayGuide.items[4] },
            ].map((card: any, index: number) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="mb-3 h-10 w-10 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                  </div>
                  <h3 className="font-bold mb-1.5">{card.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 6: Upgrade Guide */}
      <section
        id="upgrade-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Dumbbell className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {t.modules.dinoHuntersUpgradeGuide.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.dinoHuntersUpgradeGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              {t.modules.dinoHuntersUpgradeGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-3xl mx-auto">
              {t.modules.dinoHuntersUpgradeGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-3 md:space-y-4">
            {t.modules.dinoHuntersUpgradeGuide.steps.map(
              (step: any, index: number) => (
                <div
                  key={index}
                  className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                    <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* Module 7: Tips and Tricks */}
      <section id="tips-and-tricks" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Lightbulb className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {t.modules.dinoHuntersTipsAndTricks.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.dinoHuntersTipsAndTricks.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              {t.modules.dinoHuntersTipsAndTricks.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-3xl mx-auto">
              {t.modules.dinoHuntersTipsAndTricks.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-3">
            {t.modules.dinoHuntersTipsAndTricks.items.map(
              (faq: any, index: number) => (
                <div
                  key={index}
                  className="border border-border rounded-xl overflow-hidden bg-white/[0.02]"
                >
                  <button
                    onClick={() =>
                      setTipsExpanded(tipsExpanded === index ? null : index)
                    }
                    className="w-full flex items-center justify-between gap-3 p-4 md:p-5 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-semibold text-sm md:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 text-[hsl(var(--nav-theme-light))] transition-transform ${tipsExpanded === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {tipsExpanded === index && (
                    <div className="px-4 md:px-5 pb-4 md:pb-5 text-muted-foreground text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 8: Updates Guide (table) */}
      <section
        id="updates-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
              <Clock className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {t.modules.dinoHuntersUpdatesGuide.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.modules.dinoHuntersUpdatesGuide.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              {t.modules.dinoHuntersUpdatesGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-3xl mx-auto">
              {t.modules.dinoHuntersUpdatesGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal overflow-x-auto rounded-xl border border-border">
            <table className="w-full border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-[hsl(var(--nav-theme)/0.1)] border-b border-border">
                  <th className="text-left p-4 md:p-5 font-semibold text-sm md:text-base">
                    Update
                  </th>
                  <th className="text-left p-4 md:p-5 font-semibold text-sm md:text-base w-32 md:w-40">
                    Category
                  </th>
                  <th className="text-left p-4 md:p-5 font-semibold text-sm md:text-base">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.modules.dinoHuntersUpdatesGuide.items.map(
                  (row: any, index: number) => (
                    <tr
                      key={index}
                      className={index !== t.modules.dinoHuntersUpdatesGuide.items.length - 1 ? "border-b border-border" : ""}
                    >
                      <td className="p-4 md:p-5 align-top">
                        <span className="font-semibold text-sm md:text-base text-[hsl(var(--nav-theme-light))]">
                          {row.update}
                        </span>
                      </td>
                      <td className="p-4 md:p-5 align-top">
                        <span className="inline-block text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                          {row.category}
                        </span>
                      </td>
                      <td className="p-4 md:p-5 align-top">
                        <span className="text-muted-foreground text-sm">
                          {row.description}
                        </span>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.roblox.com/games/119031147890918/Dino-Hunters"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition inline-flex items-center gap-1"
                  >
                    {t.footer.discord}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.roblox.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition inline-flex items-center gap-1"
                  >
                    {t.footer.twitter}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://corp.roblox.com/news/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition inline-flex items-center gap-1"
                  >
                    {t.footer.steamCommunity}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://corp.roblox.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition inline-flex items-center gap-1"
                  >
                    {t.footer.steamStore}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
