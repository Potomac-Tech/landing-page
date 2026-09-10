'use client';

import { useRef, useState } from 'react';
import { Menu, ArrowUpRight } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const followedLink = useRef(false);
  function followLink() {
    followedLink.current = true;
    setOpen(false);
  }
  return (
    <div className="mobile-navigation">
      <Sheet
        open={open}
        onOpenChange={(value) => {
          if (value) followedLink.current = false;
          setOpen(value);
        }}
      >
        <SheetTrigger className="menu-trigger" aria-label="Open navigation">
          <Menu size={20} aria-hidden="true" /> <span>Menu</span>
        </SheetTrigger>
        <SheetContent
          className="navigation-sheet"
          finalFocus={() => !followedLink.current}
        >
          <SheetTitle>Explore Potomac</SheetTitle>
          <SheetDescription>
            Lunar data, intelligence, and the people behind it.
          </SheetDescription>
          <nav aria-label="Mobile navigation">
            <a href="#intelligence-platform" onClick={followLink}>
              Intelligence Platform <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="#pathfinder" onClick={followLink}>
              Pathfinder <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="#company" onClick={followLink}>
              Company <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="#briefing" onClick={followLink}>
              Request a briefing <ArrowUpRight aria-hidden="true" />
            </a>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
