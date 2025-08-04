import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';

const ChartSlide = dynamic(() => import('../components/ChartSlide'), { ssr: false });

// TypeScript interfaces for slide content
interface TitleSlideContent {
  title: string;
  subtitle: string;
}

interface TextSlideContent {
  title: string;
  points?: string[];
  content?: string;
}

interface ImageSlideContent {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

interface TeamSlideContent {
  title: string;
  content: string[];
}

interface RoadmapSlideContent {
  title: string;
  content: string[];
}

interface TableSlideContent {
  title: string;
  tableData: {
    headers: string[];
    rows: string[][];
  };
}

interface ChartSlideContent {
  title: string;
  chartType: string;
  data: Array<{
    name: string;
    value: number;
    fill: string;
  }>;
}

// Slide type definitions
interface BaseSlide {
  id: string;
  type: string;
  notes?: string;
}

interface TitleSlideType extends BaseSlide {
  type: 'title';
  content: TitleSlideContent;
}

interface TextSlideType extends BaseSlide {
  type: 'text';
  content: TextSlideContent;
}

interface ChartSlideType extends BaseSlide {
  type: 'chart';
  content: ChartSlideContent;
}

interface ImageSlideType extends BaseSlide {
  type: 'image';
  content: ImageSlideContent;
}

interface TeamSlideType extends BaseSlide {
  type: 'team';
  content: TeamSlideContent;
}

interface RoadmapSlideType extends BaseSlide {
  type: 'roadmap';
  content: RoadmapSlideContent;
}

interface TableSlideType extends BaseSlide {
  type: 'table';
  content: TableSlideContent;
}

type Slide = TitleSlideType | TextSlideType | ChartSlideType | ImageSlideType | TeamSlideType | RoadmapSlideType | TableSlideType;

const slides: Slide[] = [
  {
    id: "1",
    type: "title",
    content: {
      title: "Purrify — The Future of Cat Litter Odor Control",
      subtitle: "Raising CAD $200k SAFE @ $2M pre-money",
    },
    notes:
      "Welcome to our pitch for Purrify. We're revolutionizing cat litter odor control with our innovative carbon additive solution.",
  },
  {
    id: "2",
    type: "text",
    content: {
      title: "The Problem",
      points: [
        "#1 complaint of urban cat owners? Litter box odor.",
        "Existing 'fixes' just mask smell or demand frequent litter changes.",
      ],
    },
    notes:
      "Cat owners consistently rank litter box odor as their top complaint. Current solutions only mask the smell temporarily or require constant maintenance.",
  },
  {
    id: "3",
    type: "chart",
    content: {
      title: "Market Opportunity",
      chartType: "pie",
      data: [
        { name: "Canada TAM", value: 160, fill: "#8884d8" },
        { name: "US Expansion", value: 1200, fill: "#82ca9d" },
      ],
    },
    notes:
      "Our total addressable market in Canada is CAD $160M, with potential for USD $1.2B with US expansion.",
  },
  // Add more slides here if you have them in your full deck
];

function TitleSlide({ content }: { content: TitleSlideContent }) {
  const [logoError, setLogoError] = useState(false);

  return (
    <section className="py-24 flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-[#FF3131]/10 to-[#5B2EFF]/10 dark:from-gray-900 dark:to-gray-950 text-center">
      {!logoError ? (
        <Image 
          src="/purrify-logo.png" 
          alt="Purrify Logo" 
          width={160} 
          height={160} 
          className="mx-auto mb-6"
          onError={() => setLogoError(true)}
        />
      ) : (
        <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-[#FF3131] to-[#5B2EFF] rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-2xl">P</span>
        </div>
      )}
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] bg-clip-text text-transparent">
        {content.title}
      </h1>
      <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        {content.subtitle}
      </p>
    </section>
  );
}

function TextSlide({ content }: { content: TextSlideContent }) {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#FF3131]">{content.title}</h2>
      <div className="max-w-2xl mx-auto">
        {content.points && (
          <ul className="text-xl text-gray-700 dark:text-gray-300 mb-8 space-y-4">
            {content.points.map((point: string, i: number) => (
              <li key={i}>{point.replace(/^#/, '')}</li>
            ))}
          </ul>
        )}
        {content.content && (
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">{content.content}</p>
        )}
      </div>
    </section>
  );
}

function ImageSlide({ content }: { content: ImageSlideContent }) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="py-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#5B2EFF]">{content.title}</h2>
      {content.subtitle && <p className="mb-4 text-lg text-gray-500 dark:text-gray-300">{content.subtitle}</p>}
      <div className="flex justify-center">
        {content.imageUrl && !imageError ? (
          <Image 
            src={content.imageUrl} 
            alt={content.title} 
            width={320} 
            height={320} 
            className="rounded-xl shadow-lg"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-80 h-80 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-lg flex items-center justify-center">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#5B2EFF]/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#5B2EFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {content.imageUrl ? 'Image not available' : 'No image provided'}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function TeamSlide({ content }: { content: TeamSlideContent }) {
  const [avatarErrors, setAvatarErrors] = useState<Set<number>>(new Set());

  const handleAvatarError = (index: number) => {
    setAvatarErrors(prev => new Set([...prev, index]));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-gray-950 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-10 text-[#5B2EFF]">{content.title}</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {content.content.map((member: string, i: number) => {
          // Robust parsing with error handling
          let name = 'Unknown';
          let role = 'Team Member';
          
          try {
            const parts = member.split(' — ');
            if (parts.length >= 2) {
              name = parts[0]?.trim() || 'Unknown';
              role = parts[1]?.trim() || 'Team Member';
            } else if (parts.length === 1) {
              name = parts[0]?.trim() || 'Unknown';
            }
          } catch (error) {
            console.warn(`Failed to parse team member string: "${member}"`, error);
          }
          
          const avatarSeed = name.toLowerCase().replace(/\s/g, '') || `member${i}`;
          const hasAvatarError = avatarErrors.has(i);
          
          return (
            <div key={i} className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-64">
              {!hasAvatarError ? (
                <Image
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                  alt={`${name} avatar`}
                  className="w-24 h-24 rounded-full mb-4 border-2 border-[#5B2EFF]"
                  width={96}
                  height={96}
                  onError={() => handleAvatarError(i)}
                />
              ) : (
                <div className="w-24 h-24 rounded-full mb-4 border-2 border-[#5B2EFF] bg-gradient-to-br from-[#5B2EFF] to-[#FF3131] flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{name.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-[#5B2EFF] mb-1">{name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{role}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function RoadmapSlide({ content }: { content: RoadmapSlideContent }) {
  return (
    <section className="py-20 bg-gradient-to-br from-[#E0EFC7]/30 to-[#FF3131]/10 dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-10 text-[#FF3131]">{content.title}</h2>
      <div className="flex flex-col items-center gap-6">
        {content.content.map((item: string, i: number) => {
          // Robust parsing for roadmap items
          let title = item;
          let description = '';
          
          try {
            const parts = item.split(' — ');
            if (parts.length >= 2) {
              title = parts[0]?.trim() || item;
              description = parts[1]?.trim() || '';
            }
          } catch (error) {
            console.warn(`Failed to parse roadmap item: "${item}"`, error);
          }
          
          return (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full max-w-xl">
              <span className="text-lg font-semibold text-[#5B2EFF]">{title}</span>
              {description && <p className="text-gray-600 dark:text-gray-300">{description}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TableSlide({ content }: { content: TableSlideContent }) {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-10 text-[#5B2EFF]">{content.title}</h2>
      <div className="overflow-x-auto flex justify-center">
        <table className="min-w-[400px] border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <thead className="bg-[#5B2EFF]/10">
            <tr>
              {content.tableData.headers.map((header: string, i: number) => (
                <th key={i} className="px-6 py-3 text-left text-xs font-medium text-[#5B2EFF] uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.tableData.rows.map((row: string[], i: number) => (
              <tr key={i} className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                {row.map((cell: string, j: number) => (
                  <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const slideComponents = {
  title: TitleSlide,
  text: TextSlide,
  chart: ChartSlide,
  image: ImageSlide,
  team: TeamSlide,
  roadmap: RoadmapSlide,
  table: TableSlide,
} as const;

type SlideType = keyof typeof slideComponents;

export default function Invest() {
  return (
    <>
      {slides.map((slide) => {
        switch (slide.type) {
          case 'title':
            return <TitleSlide key={slide.id} content={slide.content} />;
          case 'text':
            return <TextSlide key={slide.id} content={slide.content} />;
          case 'chart':
            return <ChartSlide key={slide.id} content={slide.content} />;
          case 'image':
            return <ImageSlide key={slide.id} content={slide.content} />;
          case 'team':
            return <TeamSlide key={slide.id} content={slide.content} />;
          case 'roadmap':
            return <RoadmapSlide key={slide.id} content={slide.content} />;
          case 'table':
            return <TableSlide key={slide.id} content={slide.content} />;
          default: {
            // Handle unknown slide types with proper typing
            const unknownSlide = slide as BaseSlide;
            return (
              <article 
                key={unknownSlide.id} 
                className="py-20 text-center bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400"
                role="alert"
                aria-live="polite"
              >
                <div className="max-w-2xl mx-auto px-4">
                  <h2 className="text-2xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    Unsupported Slide Type
                  </h2>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    The slide type "{unknownSlide.type}" is not currently supported. Please check the slide configuration.
                  </p>
                  <details className="mt-4 text-left">
                    <summary className="cursor-pointer text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200">
                      Show slide data
                    </summary>
                    <pre className="mt-2 p-3 bg-yellow-100 dark:bg-yellow-900/40 rounded text-xs overflow-auto">
                      {JSON.stringify(unknownSlide, null, 2)}
                    </pre>
                  </details>
                </div>
              </article>
            );
          }
        }
      })}
    </>
  );
} 