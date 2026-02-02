import prisma from './prisma';
import { ABVariant, AB_COOKIE_PREFIX, AB_VIEWED_PREFIX } from './ab-testing';

/**
 * Get variant from request cookies (server-side)
 */
export function getServerVariant(
    testSlug: string,
    cookies: Record<string, string>,
    trafficSplit: number = 50
): { variant: ABVariant; isNew: boolean } {
    const cookieName = `${AB_COOKIE_PREFIX}${testSlug}`;

    // Check for existing assignment
    if (cookies[cookieName]) {
        return { variant: cookies[cookieName] as ABVariant, isNew: false };
    }

    // Assign new variant
    const variant: ABVariant = Math.random() * 100 < trafficSplit ? 'variant' : 'control';
    return { variant, isNew: true };
}

/**
 * Parse cookies from request header
 */
export function parseCookies(cookieHeader: string | undefined): Record<string, string> {
    if (!cookieHeader) return {};

    return cookieHeader.split(';').reduce(
        (acc, cookie) => {
            const [name, ...valueParts] = cookie.trim().split('=');
            acc[name] = valueParts.join('=');
            return acc;
        },
        {} as Record<string, string>
    );
}

/**
 * Record a view for an A/B test (server-side)
 */
export async function recordView(testSlug: string, variant: ABVariant): Promise<void> {
    if (!prisma) return;

    try {
        if (variant === 'control') {
            await prisma.aBTest.update({
                where: { slug: testSlug },
                data: { controlViews: { increment: 1 } },
            });
        } else {
            await prisma.aBTest.update({
                where: { slug: testSlug },
                data: { variantViews: { increment: 1 } },
            });
        }
    } catch {
        // Silently fail - don't break the page for tracking
    }
}

/**
 * Record a conversion for an A/B test (server-side)
 */
export async function recordConversion(testSlug: string, variant: ABVariant): Promise<void> {
    if (!prisma) return;

    try {
        if (variant === 'control') {
            await prisma.aBTest.update({
                where: { slug: testSlug },
                data: { controlConversions: { increment: 1 } },
            });
        } else {
            await prisma.aBTest.update({
                where: { slug: testSlug },
                data: { variantConversions: { increment: 1 } },
            });
        }
    } catch {
        // Silently fail - don't break the page for tracking
    }
}

/**
 * Get active A/B test for a page path
 */
export async function getActiveTest(pagePath: string): Promise<{ testSlug: string; variant: ABVariant; config: Record<string, unknown> | null } | null> {
    if (!prisma) return null;

    try {
        const test = await prisma.aBTest.findFirst({
            where: {
                targetPage: pagePath,
                status: 'RUNNING',
            },
        });

        if (!test) return null;

        // Get variant for this session (server-side assignment)
        const variant: ABVariant = Math.random() * 100 < test.trafficSplit ? 'variant' : 'control';

        return {
            testSlug: test.slug,
            variant,
            config: variant === 'control' ? (test.controlConfig as Record<string, unknown>) : (test.variantConfig as Record<string, unknown>),
        };
    } catch {
        return null;
    }
}
