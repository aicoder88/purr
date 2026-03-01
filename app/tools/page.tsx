import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Purrify Tools | Smell Quiz and Litter Calculator',
  description: 'Interactive tools to diagnose litter odor problems and compare litter costs.',
  alternates: {
    canonical: 'https://www.purrify.ca/tools/',
  },
};

const TOOL_LINKS = [
  {
    href: '/tools/smell-quiz/',
    title: 'Smell Quiz',
    description: 'Find likely odor causes and get a tailored action plan.',
  },
  {
    href: '/tools/cat-litter-calculator/',
    title: 'Cat Litter Calculator',
    description: 'Compare litter usage and annual costs across litter types.',
  },
] as const;

export default function ToolsPage() {
  return (
    <main className="bg-gray-50 bg-gray-950 py-16 md:py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-gray-100 tracking-tight">
            Purrify Tools
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-gray-300">
            Use these interactive tools to diagnose odor issues and choose your next step.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {TOOL_LINKS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block rounded-2xl border border-gray-200 border-gray-800 bg-white bg-gray-900 p-6 hover:border-green-300 hover:border-green-700 transition-colors"
              >
                <h2 className="text-xl font-bold text-gray-900 text-gray-100">{tool.title}</h2>
                <p className="mt-2 text-gray-600 text-gray-400">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
