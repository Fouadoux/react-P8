import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  // One short line under the title: says what the visitor will find in the section.
  subtitle?: string;
  children: ReactNode;
}

// Shared layout for every section: same rule, same heading, same spacing.
export const Section = ({ id, title, subtitle, children }: SectionProps) => (
  <section id={id} className="border-t border-border pt-10">
    <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
    {subtitle && <p className="mt-2 max-w-xl text-lg text-muted-foreground">{subtitle}</p>}
    <div className="mt-10">{children}</div>
  </section>
);
