"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let nextActive: string | null = null;
        let highestRatio = 0;

        for (const [id, ratio] of ratios) {
          if (ratio > highestRatio) {
            nextActive = id;
            highestRatio = ratio;
          }
        }

        setActiveId(nextActive);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-30% 0px -40% 0px" },
    );

    for (const section of sections) observer.observe(section);

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
