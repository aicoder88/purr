/**
 * @jest-environment node
 */

import fs from 'node:fs';
import path from 'node:path';

import { LEARN_PAGE_PREVIEW_IMAGES } from '@/lib/learn/page-preview-images';
import { getPageImage } from '@/lib/seo/page-images';

type RouteFixture = {
  route: keyof typeof LEARN_PAGE_PREVIEW_IMAGES;
  clientFile: string;
  metadataFiles: string[];
};

const ROUTE_FIXTURES: RouteFixture[] = [
  {
    route: '/learn/how-activated-carbon-works',
    clientFile: 'app/learn/how-activated-carbon-works/HowActivatedCarbonWorksClient.tsx',
    metadataFiles: [
      'app/learn/how-activated-carbon-works/page.tsx',
      'app/[locale]/learn/how-activated-carbon-works/page.tsx',
    ],
  },
  {
    route: '/learn/solutions/ammonia-smell-cat-litter',
    clientFile: 'app/learn/solutions/ammonia-smell-cat-litter/AmmoniaSmellPageClient.tsx',
    metadataFiles: [
      'app/learn/solutions/ammonia-smell-cat-litter/page.tsx',
      'app/[locale]/learn/solutions/ammonia-smell-cat-litter/page.tsx',
    ],
  },
  {
    route: '/learn/solutions/how-to-neutralize-ammonia-cat-litter',
    clientFile: 'app/learn/solutions/how-to-neutralize-ammonia-cat-litter/HowToNeutralizeAmmoniaPageClient.tsx',
    metadataFiles: [
      'app/learn/solutions/how-to-neutralize-ammonia-cat-litter/page.tsx',
      'app/[locale]/learn/solutions/how-to-neutralize-ammonia-cat-litter/page.tsx',
    ],
  },
  {
    route: '/learn/solutions/apartment-cat-smell-solution',
    clientFile: 'app/learn/solutions/apartment-cat-smell-solution/ApartmentCatSmellPageClient.tsx',
    metadataFiles: [
      'app/learn/solutions/apartment-cat-smell-solution/page.tsx',
      'app/[locale]/learn/solutions/apartment-cat-smell-solution/page.tsx',
    ],
  },
  {
    route: '/learn/solutions/litter-box-smell-elimination',
    clientFile: 'app/learn/solutions/litter-box-smell-elimination/LitterBoxSmellPageClient.tsx',
    metadataFiles: [
      'app/learn/solutions/litter-box-smell-elimination/page.tsx',
      'app/[locale]/learn/solutions/litter-box-smell-elimination/page.tsx',
    ],
  },
  {
    route: '/learn/solutions/multiple-cats-odor-control',
    clientFile: 'app/learn/solutions/multiple-cats-odor-control/MultipleCatsOdorControlPageClient.tsx',
    metadataFiles: [
      'app/learn/solutions/multiple-cats-odor-control/page.tsx',
      'app/[locale]/learn/solutions/multiple-cats-odor-control/page.tsx',
    ],
  },
  {
    route: '/learn/solutions/natural-cat-litter-additive',
    clientFile: 'app/learn/solutions/natural-cat-litter-additive/NaturalCatLitterAdditivePageClient.tsx',
    metadataFiles: [
      'app/learn/solutions/natural-cat-litter-additive/page.tsx',
      'app/[locale]/learn/solutions/natural-cat-litter-additive/page.tsx',
    ],
  },
  {
    route: '/learn/solutions/senior-cat-litter-solutions',
    clientFile: 'app/learn/solutions/senior-cat-litter-solutions/SeniorCatPageClient.tsx',
    metadataFiles: [
      'app/learn/solutions/senior-cat-litter-solutions/page.tsx',
      'app/[locale]/learn/solutions/senior-cat-litter-solutions/page.tsx',
    ],
  },
];

function readWorkspaceFile(relativePath: string): string {
  return fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8');
}

function expectFileToReferencePreviewImage(relativePath: string, route: string, imagePath: string) {
  const content = readWorkspaceFile(relativePath);
  const absoluteImageUrl = `https://www.purrify.ca${imagePath}`;
  const sharedKeyReference = `LEARN_PAGE_PREVIEW_IMAGES['${route}'].image`;

  const referencesExpectedImage = (
    content.includes(`'${imagePath}'`)
    || content.includes(`"${imagePath}"`)
    || content.includes(`'${absoluteImageUrl}'`)
    || content.includes(`"${absoluteImageUrl}"`)
    || content.includes(sharedKeyReference)
  );

  expect(referencesExpectedImage).toBe(true);
}

describe('learn page preview image consistency', () => {
  it('keeps shared preview image routes aligned with the SEO page-image resolver', () => {
    for (const [route, previewImage] of Object.entries(LEARN_PAGE_PREVIEW_IMAGES)) {
      expect(getPageImage(route)).toEqual(previewImage);
    }
  });

  it.each(ROUTE_FIXTURES)('keeps $route hero images aligned across page sources', ({ route, clientFile, metadataFiles }) => {
    const previewImage = LEARN_PAGE_PREVIEW_IMAGES[route];

    expect(previewImage).toBeDefined();
    expectFileToReferencePreviewImage(clientFile, route, previewImage.image);

    for (const metadataFile of metadataFiles) {
      expectFileToReferencePreviewImage(metadataFile, route, previewImage.image);
    }
  });
});
