'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Tabs } from '@/components/ui/tabs';
import { selectStoryScene, type StoryScene } from '@/lib/story-scenes';

const StoryContext = createContext({
  enhanced: false,
  scene: 'pathfinder' as StoryScene,
  product: 'explorer',
});

export function useStoryProduct() {
  return useContext(StoryContext).product;
}

export function ScrollStory({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const initialAnchorHandled = useRef(false);
  const [enhanced, setEnhanced] = useState(false);
  const [scene, setScene] = useState<StoryScene>('pathfinder');
  const [product, setProduct] = useState('explorer');

  useEffect(() => {
    if (!enhanced || initialAnchorHandled.current) return;
    initialAnchorHandled.current = true;
    const frame = window.requestAnimationFrame(() => {
      let id: string;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      const target = id ? document.getElementById(id) : null;
      if (target && rootRef.current?.contains(target)) {
        target.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [enhanced]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = window.matchMedia(
      '(min-width: 1100px) and (min-height: 720px)',
    );
    const sections = [
      ...root.querySelectorAll<HTMLElement>('[data-story-scene]'),
    ];
    const header = document.querySelector<HTMLElement>('.masthead');
    let frame = 0;
    const update = () => {
      frame = 0;
      const headerHeight = header?.getBoundingClientRect().height ?? 86;
      root.style.setProperty('--story-top', `${headerHeight}px`);
      setEnhanced(media.matches);
      if (!media.matches) return;
      const focused = document.activeElement;
      if (focused instanceof HTMLElement && root.contains(focused)) {
        const focusedMedia = focused.closest<HTMLElement>('[data-story-media]');
        if (
          focusedMedia &&
          !focusedMedia.inert &&
          focused.matches(':focus-visible')
        ) {
          setScene(focusedMedia.dataset.storyMedia as StoryScene);
          return;
        }
        const focusedSection =
          focused.closest<HTMLElement>('[data-story-scene]');
        const bounds = focused.getBoundingClientRect();
        if (
          focusedSection &&
          bounds.bottom > headerHeight &&
          bounds.top < window.innerHeight
        ) {
          setScene(focusedSection.dataset.storyScene as StoryScene);
          return;
        }
      }
      setScene(
        selectStoryScene(
          sections.map((section) => ({
            scene: section.dataset.storyScene as StoryScene,
            top: section.getBoundingClientRect().top,
          })),
          headerHeight + 32,
        ),
      );
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    if (header) observer.observe(header);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    window.addEventListener('pageshow', schedule);
    window.addEventListener('focusin', schedule);
    document.fonts.addEventListener('loadingdone', schedule);
    media.addEventListener('change', schedule);
    schedule();
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
      window.removeEventListener('pageshow', schedule);
      window.removeEventListener('focusin', schedule);
      document.fonts.removeEventListener('loadingdone', schedule);
      media.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <StoryContext.Provider value={{ enhanced, scene, product }}>
      <Tabs
        ref={rootRef}
        className="scroll-story"
        data-enhanced={enhanced}
        orientation="vertical"
        value={product}
        onValueChange={(value) => setProduct(String(value))}
        onFocusCapture={(event) => {
          const section = (event.target as HTMLElement).closest<HTMLElement>(
            '[data-story-scene]',
          );
          if (enhanced && section)
            setScene(section.dataset.storyScene as StoryScene);
        }}
      >
        {children}
      </Tabs>
    </StoryContext.Provider>
  );
}

export function StoryMedia({
  scene,
  children,
}: {
  scene: StoryScene;
  children: ReactNode;
}) {
  const current = useContext(StoryContext);
  const inactive = current.enhanced && current.scene !== scene;
  return (
    <div
      className={`story-media story-media-${scene}`}
      data-story-media={scene}
      data-active={!inactive}
      aria-hidden={inactive || undefined}
      inert={inactive}
    >
      {children}
    </div>
  );
}
