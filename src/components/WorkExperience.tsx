import { useMemo, useState } from 'react';
import type { WorkItem } from '../data/work';

type Props = { workHistory: WorkItem[] };

/**
 * WorkExperience Component
 * 
 * A professional component that displays work history with:
 * - Staggered fade-in-up animations for each item
 * - Interactive hover states with elevation and smooth transitions
 * - Role-based badge highlighting
 * - Responsive design (mobile-first)
 * - Smooth filtering/visibility changes
 * 
 * Animation Strategy:
 * - Each item animates in with a cascade effect (0.08s stagger)
 * - Hover state triggers: border highlight, shadow elevation, upward translation
 * - Smooth transitions on text color and arrow icon translation
 */
export function WorkExperience({ workHistory }: Props) {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  // Memoize filtering logic to avoid unnecessary recalculations
  const visibleItems = useMemo(() => {
    return workHistory;
  }, [workHistory]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {visibleItems.map((job, index) => (
        <article
          key={`${job.role}-${job.company}`}
          className="card p-4 sm:p-6 space-y-3 transition-all duration-300 hover:border-white/30 hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
          style={{
            // Staggered animation: each item delays by 80ms for cascade effect
            animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`
          }}
          onClick={() =>
            setExpandedRole(
              expandedRole === `${job.role}-${job.company}`
                ? null
                : `${job.role}-${job.company}`
            )
          }
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setExpandedRole(
                expandedRole === `${job.role}-${job.company}`
                  ? null
                  : `${job.role}-${job.company}`
              );
            }
          }}
        >
          {/* Header: Role Badge, Company, Timeline */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-secondary">
            {/* Role Badge - Interactive with hover highlight */}
            <span className="rounded-full bg-white/10 px-3 py-1 text-primary font-semibold whitespace-nowrap group-hover:bg-white/20 transition-colors">
              {job.role}
            </span>
            <span className="hidden sm:block">•</span>
            
            {/* Company */}
            <span className="group-hover:text-white transition-colors">{job.company}</span>
            <span className="hidden sm:block">•</span>
            
            {/* Timeline */}
            <span className="group-hover:text-white transition-colors text-xs sm:text-sm">
              {job.start} — {job.end ?? 'Present'}
            </span>
          </div>

          {/* Summary - Main description */}
          <p className="text-secondary text-sm sm:text-base group-hover:text-white/80 transition-colors">
            {job.summary}
          </p>

          {/* Bullets - Responsibilities/achievements list */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              expandedRole === `${job.role}-${job.company}`
                ? 'max-h-96 opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            <ul className="list-disc space-y-1 sm:space-y-2 pl-5 text-secondary text-xs sm:text-sm">
              {job.bullets.map((item) => (
                <li key={item} className="group-hover:text-white/70 transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Expand/Collapse Indicator */}
          <div className="flex items-center justify-end pt-2">
            <span
              className="text-secondary group-hover:text-white group-hover:translate-x-1 transition-all text-lg"
              aria-hidden="true"
            >
              {expandedRole === `${job.role}-${job.company}` ? '↑' : '↓'}
            </span>
          </div>
        </article>
      ))}

      {/* Keyframe animations - defined inline for component encapsulation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
