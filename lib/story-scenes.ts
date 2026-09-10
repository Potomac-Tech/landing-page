export type StoryScene = 'pathfinder' | 'platform' | 'team' | 'briefing';

export function selectStoryScene(
  sections: ReadonlyArray<{ scene: StoryScene; top: number }>,
  activationLine: number,
): StoryScene {
  let active: StoryScene = 'pathfinder';
  for (const section of sections) {
    if (section.top > activationLine) break;
    active = section.scene;
  }
  return active;
}
