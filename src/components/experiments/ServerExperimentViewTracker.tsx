'use client';

import { useEffect } from 'react';
import type { SerializedExperimentAssignment } from '@/lib/experiments/commercial';

interface ServerExperimentViewTrackerProps {
  assignments: SerializedExperimentAssignment[];
}

const VIEW_TRACK_PREFIX = 'purrify_server_exp_viewed_';

export function ServerExperimentViewTracker({ assignments }: ServerExperimentViewTrackerProps) {
  useEffect(() => {
    for (const assignment of assignments) {
      const sessionKey = `${VIEW_TRACK_PREFIX}${assignment.testSlug}:${assignment.variant}`;

      if (sessionStorage.getItem(sessionKey) === '1') {
        continue;
      }

      sessionStorage.setItem(sessionKey, '1');

      void fetch('/api/ab-test/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testSlug: assignment.testSlug,
          variant: assignment.variant,
          type: 'view',
        }),
      });
    }
  }, [assignments]);

  return null;
}
