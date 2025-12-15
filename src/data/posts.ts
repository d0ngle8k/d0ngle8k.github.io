export type Post = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
};

export const posts: Post[] = [
  {
    slug: 'league-of-legends-mastery',
    title: 'How to Be Good at League of Legends',
    date: '2025-12-15',
    tags: ['gaming', 'league-of-legends', 'strategy', 'esports'],
    excerpt: 'Master the fundamentals: CS, vision control, map awareness, champion pools, and mental game. Climb smarter, not harder.'
  },
  {
    slug: 'cs2-improvement-guide',
    title: 'How to Be Good at Counter-Strike 2',
    date: '2025-12-14',
    tags: ['gaming', 'counter-strike', 'fps', 'esports'],
    excerpt: 'Crosshair placement, utility usage, positioning, and game sense. Build muscle memory through deliberate practice and demo reviews.'
  },
  {
    slug: 'league-diamond-climb',
    title: 'How to Climb to Diamond (and Beyond) in League of Legends',
    date: '2025-12-13',
    tags: ['league-of-legends', 'ranked', 'strategy', 'improvement'],
    excerpt: 'Focus on 2-3 champions, perfect your macro, abuse win conditions, and learn when to dodge. Diamond is a mindset, not just mechanics.'
  },
  {
    slug: 'voltaic-aim-training',
    title: 'How to Get Good at Aim (Voltaic Enjoyer Edition)',
    date: '2025-12-12',
    tags: ['aim-training', 'fps', 'voltaic', 'gaming'],
    excerpt: 'Structured routines, consistency over intensity, tracking smoothness vs. clicking speed. Voltaic benchmarks reveal your weak points—train them ruthlessly.'
  },
  {
    slug: 'faceit-level-10-grind',
    title: 'How to Climb to FACEIT Level 10',
    date: '2025-12-11',
    tags: ['counter-strike', 'faceit', 'competitive', 'fps'],
    excerpt: "Comms, trading, anti-flash discipline, and watching your own demos. Level 10 isn't about fragging—it's about making fewer mistakes than your opponents."
  },
  {
    slug: 'becoming-good-at-coding',
    title: 'How to Get Good at Coding',
    date: '2025-12-10',
    tags: ['programming', 'learning', 'career', 'development'],
    excerpt: "Build projects that matter to you, read other people's code, debug relentlessly, and embrace discomfort. Expertise is pattern recognition across thousands of bugs."
  },
  {
    slug: 'avoiding-burnout',
    title: 'How to Avoid Burnout',
    date: '2025-12-09',
    tags: ['mental-health', 'productivity', 'wellness', 'career'],
    excerpt: "Set boundaries, protect recovery time, diversify your identity beyond work. Burnout is not a badge of honor—it's a systems failure you can engineer around."
  },
  {
    slug: 'becoming-cybersecurity-researcher',
    title: 'How to Be a Cybersecurity Researcher',
    date: '2025-12-08',
    tags: ['cybersecurity', 'research', 'career', 'hacking'],
    excerpt: 'Deep-dive into protocols, reverse engineer binaries, publish your findings, and contribute to CVEs. Curiosity and persistence trump certifications.'
  }
];
