"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "theme";

type Theme = "light" | "dark";

const listeners = new Set<() => void>();

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function writeTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Navigation privée : le choix vaut pour la page, sans persistance.
  }

  listeners.forEach((listener) => listener());
}

type ThemeToggleProps = {
  toDark: string;
  toLight: string;
  className?: string;
};

export function ThemeToggle({ toDark, toLight, className }: ThemeToggleProps) {
  // La source de vérité est l'attribut `data-theme` posé avant le rendu :
  // pas d'état à synchroniser, donc pas de décalage d'hydratation.
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as Theme);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => writeTheme(isDark ? "light" : "dark")}
      aria-pressed={isDark}
      aria-label={isDark ? toLight : toDark}
      title={isDark ? toLight : toDark}
      className={cn(
        "theme-toggle inline-flex size-10 items-center justify-center rounded-sm border border-line text-ink transition-[border-color,background-color,transform] duration-200 hover:border-ink active:scale-95",
        className,
      )}
    >
      <MoonIcon className="theme-icon-moon" width={18} height={18} />
      <SunIcon className="theme-icon-sun" width={18} height={18} />
    </button>
  );
}
