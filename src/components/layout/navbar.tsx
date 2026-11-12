"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Container } from "@/components/ui/container";
import { DownloadCVButton } from "@/components/ui/download-cv-button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrolled } from "@/hooks/use-scrolled";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { sectionIds } from "@/lib/sections";
import { cn } from "@/lib/utils";

type NavbarProps = {
  locale: Locale;
  nav: Dictionary["nav"];
};

const linkBase =
  "relative text-body-s font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-accent after:transition-transform after:duration-200";

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Navbar({ locale, nav }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const activeSection = useActiveSection(sectionIds);

  // Le panneau mobile est un frère du header : le backdrop-blur du header crée
  // un bloc conteneur qui annulerait le positionnement fixed du panneau.
  const menuRootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);

  const links = [
    { id: "a-propos", label: nav.about },
    { id: "competences", label: nav.skills },
    { id: "projets", label: nav.projects },
    { id: "formation", label: nav.education },
    { id: "objectifs", label: nav.goals },
    { id: "contact", label: nav.contact },
  ];

  // Le menu est un dialogue modal : focus déplacé et piégé, Échap ferme,
  // focus rendu au bouton d'ouverture, scroll de la page verrouillé.
  useEffect(() => {
    if (!open) return;

    const root = menuRootRef.current;
    if (!root) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const toggle = toggleRef.current;

    menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus({ preventScroll: true });

    const focusables = () =>
      Array.from(root.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => element.offsetParent !== null,
      );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        restoreFocus.current = true;
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (!(active instanceof HTMLElement) || !root.contains(active)) {
        event.preventDefault();
        first.focus();
        return;
      }

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";

      if (restoreFocus.current) {
        (toggle ?? previouslyFocused)?.focus({ preventScroll: true });
        restoreFocus.current = false;
      }
    };
  }, [open]);

  // Un passage au format desktop referme le menu : le verrou de scroll ne reste pas actif.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (desktop.matches) setOpen(false);
    };

    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  function openMenu() {
    restoreFocus.current = false;
    setOpen(true);
  }

  function closeMenu() {
    restoreFocus.current = true;
    setOpen(false);
  }

  return (
    // `contents` : sans cela, ce wrapper de la hauteur du header borne le
    // `sticky` et le header disparaît dès que la page défile.
    <div ref={menuRootRef} className="contents">
      <header
        className={cn(
          "no-print sticky top-0 z-50 border-b bg-paper/85 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-200",
          scrolled ? "border-line-strong bg-paper/95 shadow-soft" : "border-line",
        )}
      >
        <Container size="wide" className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Link
            href={`/${locale}`}
            className="font-display text-[1.15rem] font-bold tracking-[-0.04em] text-ink"
          >
            TEKER<span className="text-accent">/</span>Codes
          </Link>

          <nav aria-label={nav.label} className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {links.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <li key={link.id}>
                    <Link
                      href={`/${locale}#${link.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        linkBase,
                        isActive
                          ? "text-ink after:scale-x-100"
                          : "text-ink-soft after:scale-x-0 hover:text-ink hover:after:scale-x-100",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <LanguageSwitcher locale={locale} label={nav.language} />
            </div>

            <span className="hidden sm:inline-flex">
              <DownloadCVButton label={nav.cvLong} size="sm" variant="primary" />
            </span>

            <ThemeToggle toDark={nav.themeDark} toLight={nav.themeLight} />

            <button
              ref={toggleRef}
              type="button"
              onClick={() => (open ? closeMenu() : openMenu())}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? nav.close : nav.menu}
              className="inline-flex size-10 items-center justify-center rounded-sm border border-line text-ink transition-[border-color,background-color,transform] duration-200 hover:border-ink active:scale-95 lg:hidden"
            >
              {open ? <CloseIcon width={18} height={18} /> : <MenuIcon width={18} height={18} />}
            </button>
          </div>
        </Container>
        <span aria-hidden="true" className="scroll-progress" />
      </header>

      {/* `inert` retire le panneau fermé du parcours de tabulation et de l'arbre
          d'accessibilité sans différer le style, contrairement à `visibility`
          qui restait `hidden` pendant la première frame. */}
      <div
        id="menu-mobile"
        ref={menuRef}
        role="dialog"
        aria-modal={open ? true : undefined}
        aria-label={nav.menu}
        inert={!open}
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-paper transition-[opacity,transform] duration-200 lg:hidden",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <Container className="flex min-h-full flex-col gap-10 py-10">
          <nav aria-label={nav.label}>
            <ul>
              {links.map((link, index) => (
                <li key={link.id}>
                  <Link
                    href={`/${locale}#${link.id}`}
                    onClick={() => {
                      restoreFocus.current = false;
                      setOpen(false);
                    }}
                    aria-current={activeSection === link.id ? "true" : undefined}
                    className="menu-link block border-b border-line py-4 font-display text-heading-l font-semibold text-ink"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
            <LanguageSwitcher locale={locale} label={nav.language} />
            <DownloadCVButton label={nav.cvLong} size="sm" />
          </div>
        </Container>
      </div>
    </div>
  );
}
