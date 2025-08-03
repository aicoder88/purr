import dynamic from 'next/dynamic';
import Image from 'next/image';

const ChartSlide = dynamic(() => import('../components/ChartSlide'), { ssr: false });

const slides = [
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

function TitleSlide({ content }: any) {
  return (
    <section className="py-24 flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-[#FF3131]/10 to-[#5B2EFF]/10 dark:from-gray-900 dark:to-gray-950 text-center">
      <Image src="/purrify-logo.png" alt="Purrify Logo" width={160} height={160} className="mx-auto mb-6" />
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] bg-clip-text text-transparent">
        {content.title}
      </h1>
      <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        {content.subtitle}
      </p>
    </section>
  );
}

function TextSlide({ content }: any) {
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

function ImageSlide({ content }: any) {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#5B2EFF]">{content.title}</h2>
      {content.subtitle && <p className="mb-4 text-lg text-gray-500 dark:text-gray-300">{content.subtitle}</p>}
      <div className="flex justify-center">
        <Image src={content.imageUrl || '/vite.svg'} alt={content.title} width={320} height={320} className="rounded-xl shadow-lg" />
      </div>
    </section>
  );
}

function TeamSlide({ content }: any) {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-gray-950 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-10 text-[#5B2EFF]">{content.title}</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {content.content.map((member: string, i: number) => {
          const [name, role] = member.split(' — ');
          const avatarSeed = (name?.toLowerCase().replace(/\s/g, '')) || `member${i}`;
          return (
            <div key={i} className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-64">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                alt={name}
                className="w-24 h-24 rounded-full mb-4 border-2 border-[#5B2EFF]"
              />
              <h3 className="text-xl font-bold text-[#5B2EFF] mb-1">{name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{role}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function RoadmapSlide({ content }: any) {
  return (
    <section className="py-20 bg-gradient-to-br from-[#E0EFC7]/30 to-[#FF3131]/10 dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-10 text-[#FF3131]">{content.title}</h2>
      <div className="flex flex-col items-center gap-6">
        {content.content.map((item: string, i: number) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full max-w-xl">
            <span className="text-lg font-semibold text-[#5B2EFF]">{item.split(' — ')[0]}</span>
            <p className="text-gray-600 dark:text-gray-300">{item.split(' — ')[1]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TableSlide({ content }: any) {
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

const slideComponents: any = {
  title: TitleSlide,
  text: TextSlide,
  chart: ChartSlide,
  image: ImageSlide,
  team: TeamSlide,
  roadmap: RoadmapSlide,
  table: TableSlide,
};

export default function Invest() {
  return (
    <>
      {slides.map((slide) => {
        const SlideComponent = slideComponents[slide.type] || (() => <section className="py-20 text-center text-gray-400">Unsupported slide type: {slide.type}</section>);
        return <SlideComponent key={slide.id} content={slide.content} />;
      })}
    </>
  );
} 