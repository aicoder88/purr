export { CatBlessingTool } from './CatBlessingTool';
export { WhacAMouse } from './WhacAMouse';
export { LaserChase } from './LaserChase';
export { CatTrivia } from './CatTrivia';
export { CatNameGenerator } from './CatNameGenerator';

// Re-export sound utilities for convenience
export {
  playRandomMeow,
  playRandomPurr,
  startContinuousPurr,
  stopPurr,
  initAudioContext,
  preloadSounds,
  testAllSounds,
  REAL_MEOW_SOUNDS,
  REAL_PURR_SOUNDS,
} from '@/lib/sounds/cat-sounds';
