import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EducationSection } from "@/components/sections/education-section";
import { GoalsSection } from "@/components/sections/goals-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const active: Locale = isLocale(locale) ? locale : defaultLocale;
  const dict = getDictionary(active);

  return (
    <>
      <HeroSection locale={active} hero={dict.hero} nav={dict.nav} />
      <AboutSection locale={active} about={dict.about} />
      <SkillsSection locale={active} skills={dict.skills} />
      <ProjectsSection locale={active} projectsCopy={dict.projects} />
      <EducationSection locale={active} education={dict.education} />
      <GoalsSection locale={active} goalsCopy={dict.goals} />
      <ContactSection locale={active} contact={dict.contact} />
    </>
  );
}
