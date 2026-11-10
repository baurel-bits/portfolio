"use client";

import { useEffect, useRef, useState } from "react";

type InViewCallback = () => void;

const callbacks = new Map<Element, InViewCallback>();
let sharedObserver: IntersectionObserver | null = null;

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.12,
  rootMargin: "0px 0px -8% 0px",
};

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;

  sharedObserver ??= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      callbacks.get(entry.target)?.();
      callbacks.delete(entry.target);
      sharedObserver?.unobserve(entry.target);
    }
  }, OBSERVER_OPTIONS);

  return sharedObserver;
}

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;

    const node = ref.current;
    if (!node) return;

    const observer = getObserver();
    if (!observer) return;

    callbacks.set(node, () => setInView(true));
    observer.observe(node);

    return () => {
      callbacks.delete(node);
      observer.unobserve(node);
    };
  }, [inView]);

  return { ref, inView };
}
