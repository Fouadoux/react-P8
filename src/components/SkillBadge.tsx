import type { Skill } from '../types/skill';

interface SkillBadgeProps {
  skill: Skill;
  // Boxed look, for the skills overview.
  chip?: boolean;
  // Compact mode: icon only (name shown on hover), for tight spaces like project rows.
  iconOnly?: boolean;
}

export function SkillBadge({ skill, iconOnly = false, chip = false }: SkillBadgeProps) {
  const { icon: Icon, iconColor, name, category } = skill;

  // Without an icon, the name is the only thing left to show, even in compact mode.
  if (iconOnly && Icon) {
    return (
      <span title={name} aria-label={name} role="img">
        <Icon aria-hidden="true" className="size-6" color={iconColor} />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 font-medium ${chip ? 'rounded border border-border px-3 py-1.5 text-sm' : ''}`}
      title={category}
    >
      {Icon && <Icon aria-hidden="true" className="size-5" color={iconColor} />}
      {name}
    </span>
  );
}
