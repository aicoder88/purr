import type { FreshnessPlan } from '@/lib/freshness-plan';

interface FreshnessPlanCardProps {
  plan: FreshnessPlan;
  compact?: boolean;
}

export function FreshnessPlanCard({ plan, compact = false }: FreshnessPlanCardProps) {
  const visibleActions = compact ? plan.actions.slice(0, 4) : plan.actions;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 dark:border-emerald-900 dark:bg-emerald-950/20">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
          {plan.title}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {plan.summary}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{plan.starterNote}</p>
      </div>

      <div className={`mt-5 grid gap-4 ${compact ? 'md:grid-cols-2' : 'lg:grid-cols-2'}`}>
        {visibleActions.map((action) => (
          <div
            key={action.id}
            className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950/60"
          >
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{action.title}</p>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
