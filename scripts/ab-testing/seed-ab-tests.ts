/**
 * Seed A/B Tests
 *
 * Creates and activates the initial A/B tests in the database.
 * Run with: npx tsx scripts/ab-testing/seed-ab-tests.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from multiple sources
config({ path: resolve(process.cwd(), '.env') });
config({ path: resolve(process.cwd(), '.env.local') });

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

interface ABTestSeed {
  name: string;
  slug: string;
  description: string;
  targetPage: string;
  trafficSplit: number;
  controlName: string;
  variantName: string;
  controlConfig: Prisma.InputJsonValue;
  variantConfig: Prisma.InputJsonValue;
}

const abTests: ABTestSeed[] = [
  {
    name: 'Homepage Hero Test',
    slug: 'homepage-hero-test',
    description: 'Testing simplified hero with prominent pricing vs current hero. Goal: Increase clicks to product page.',
    targetPage: '/',
    trafficSplit: 50,
    controlName: 'Current Hero',
    variantName: 'Simplified Hero',
    controlConfig: {
      variant: 'current',
      showFullDescription: true,
      showPricingBadges: true,
      showUrgencyIndicators: true,
    },
    variantConfig: {
      variant: 'simplified',
      showFullDescription: false,
      showPricingBadges: true,
      showUrgencyIndicators: false,
      priceProminent: true,
      simplifiedHeadline: true,
    },
  },
  {
    name: 'CTA Button Color Test',
    slug: 'cta-button-color-test',
    description: 'Testing orange CTA button vs current green/coral button. Goal: Increase add-to-cart clicks.',
    targetPage: '/',
    trafficSplit: 50,
    controlName: 'Coral Button',
    variantName: 'Orange Button',
    controlConfig: {
      buttonColor: 'coral',
      className: 'bg-gradient-to-r from-deep-coral to-deep-coral/90',
    },
    variantConfig: {
      buttonColor: 'orange',
      className: 'bg-gradient-to-r from-orange-500 to-amber-500',
    },
  },
  {
    name: 'Social Proof Position Test',
    slug: 'social-proof-position-test',
    description: 'Testing social proof badges above fold vs below fold. Goal: Increase conversion rate.',
    targetPage: '/',
    trafficSplit: 50,
    controlName: 'Below Fold',
    variantName: 'Above Fold',
    controlConfig: {
      position: 'below-fold',
      showAfterHero: false,
    },
    variantConfig: {
      position: 'above-fold',
      showAfterHero: true,
    },
  },
];

async function seedABTests() {
  console.log('Starting A/B test seeding...\n');

  for (const test of abTests) {
    try {
      // Check if test already exists
      const existing = await prisma.aBTest.findUnique({
        where: { slug: test.slug },
      });

      if (existing) {
        console.log(`[SKIP] Test "${test.name}" already exists (status: ${existing.status})`);

        // If test exists but is DRAFT, update and start it
        if (existing.status === 'DRAFT') {
          await prisma.aBTest.update({
            where: { slug: test.slug },
            data: {
              status: 'RUNNING',
              startedAt: new Date(),
            },
          });
          console.log(`[START] Activated "${test.name}"`);
        }
        continue;
      }

      // Create the test
      const created = await prisma.aBTest.create({
        data: {
          name: test.name,
          slug: test.slug,
          description: test.description,
          targetPage: test.targetPage,
          trafficSplit: test.trafficSplit,
          controlName: test.controlName,
          variantName: test.variantName,
          controlConfig: test.controlConfig,
          variantConfig: test.variantConfig,
          status: 'RUNNING',
          startedAt: new Date(),
          createdBy: 'system-seed',
        },
      });

      console.log(`[CREATE] Created and activated "${created.name}"`);
    } catch (error) {
      console.error(`[ERROR] Failed to seed "${test.name}":`, error);
    }
  }

  console.log('\nA/B test seeding complete!');

  // Print summary
  const allTests = await prisma.aBTest.findMany({
    orderBy: { createdAt: 'desc' },
  });

  console.log('\n--- Current A/B Tests ---');
  for (const test of allTests) {
    console.log(`${test.status === 'RUNNING' ? '[RUNNING]' : `[${test.status}]`} ${test.name} (${test.slug})`);
    console.log(`  Target: ${test.targetPage} | Split: ${test.trafficSplit}%`);
    console.log(`  Control: ${test.controlViews} views, ${test.controlConversions} conversions`);
    console.log(`  Variant: ${test.variantViews} views, ${test.variantConversions} conversions`);
    console.log('');
  }
}

seedABTests()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
