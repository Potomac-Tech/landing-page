import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { selectStoryScene } from '../lib/story-scenes.ts';

const scenePositions = [
  { scene: 'pathfinder', top: 0 },
  { scene: 'pathfinder', top: 800 },
  { scene: 'pathfinder', top: 1700 },
  { scene: 'platform', top: 2400 },
  { scene: 'team', top: 3500 },
  { scene: 'briefing', top: 4200 },
];

await test('Pathfinder remains pinned through the hero, hardware, and market copy', () => {
  for (const scroll of [0, 800, 1700, 2200]) {
    assert.equal(
      selectStoryScene(
        scenePositions.map(({ scene, top }) => ({ scene, top: top - scroll })),
        118,
      ),
      'pathfinder',
    );
  }
});

await test('media switches at each section and reverses cleanly on upward scrolling', () => {
  for (const [scroll, expected] of [
    [2300, 'platform'],
    [3400, 'team'],
    [4100, 'briefing'],
    [3400, 'team'],
    [2300, 'platform'],
    [0, 'pathfinder'],
  ]) {
    assert.equal(
      selectStoryScene(
        scenePositions.map(({ scene, top }) => ({ scene, top: top - scroll })),
        118,
      ),
      expected,
    );
  }
});

await test('deep links, exact boundaries, and an empty page have deterministic scenes', () => {
  assert.equal(selectStoryScene(scenePositions, 3500), 'team');
  assert.equal(selectStoryScene(scenePositions, 4200), 'briefing');
  assert.equal(selectStoryScene([], 118), 'pathfinder');
});

await test('the page has one rendering, one persistent form, and no retired labels', async () => {
  const page = await readFile(
    new URL('../app/page.tsx', import.meta.url),
    'utf8',
  );
  const story = await readFile(
    new URL('../app/scroll-story.tsx', import.meta.url),
    'utf8',
  );
  assert.equal((page.match(/src="\/pathfinder-1448.webp"/g) || []).length, 1);
  assert.equal((page.match(/<BriefingForm\s*\/>/g) || []).length, 1);
  assert.equal((page.match(/<StoryMedia scene=/g) || []).length, 4);
  assert.doesNotMatch(
    page,
    /mission-ready|78\.5°|pathfinder-image|Blue Ghost/i,
  );
  assert.match(page, /Site intelligence \/ Lunar south pole/);
  assert.match(story, /inert=\{inactive\}/);
  assert.match(story, /aria-hidden=\{inactive \|\| undefined\}/);
  assert.match(story, /\{children\}/);
});
