export interface Skill {
  name: string;
  proficiency: number; // 0-100
  icon: string;
  category: 'offensive' | 'defensive' | 'cloud' | 'infrastructure' | 'tools' | 'other';
}

export const techStack: Skill[] = [
  // Offensive Security
  {
    name: 'Penetration Testing',
    proficiency: 90,
    icon: 'Bug',
    category: 'offensive'
  },
  {
    name: 'Vulnerability Assessment',
    proficiency: 85,
    icon: 'Search',
    category: 'offensive'
  },
  {
    name: 'Exploit Development',
    proficiency: 75,
    icon: 'Code',
    category: 'offensive'
  },
  
  // Defensive Security
  {
    name: 'Security Monitoring',
    proficiency: 88,
    icon: 'BarChart',
    category: 'defensive'
  },
  {
    name: 'Incident Response',
    proficiency: 82,
    icon: 'ShieldAlert',
    category: 'defensive'
  },
  {
    name: 'Threat Intelligence',
    proficiency: 78,
    icon: 'Eye',
    category: 'defensive'
  },
  {
    name: 'Reverse Engineering',
    proficiency: 20,
    icon: 'Binary',
    category: 'defensive'
  },
  
  // Cloud Security
  {
    name: 'AWS Security',
    proficiency: 80,
    icon: 'Cloud',
    category: 'cloud'
  },
  {
    name: 'Azure Security',
    proficiency: 75,
    icon: 'Cloud',
    category: 'cloud'
  },
  
  // Infrastructure
  {
    name: 'Network Security',
    proficiency: 92,
    icon: 'Network',
    category: 'infrastructure'
  },
  {
    name: 'Linux Administration',
    proficiency: 88,
    icon: 'Terminal',
    category: 'infrastructure'
  },
  {
    name: 'Windows Security',
    proficiency: 85,
    icon: 'MonitorCheck',
    category: 'infrastructure'
  },
  
  // Tools & Programming
  {
    name: 'Python',
    proficiency: 90,
    icon: 'FileCode',
    category: 'tools'
  },
  {
    name: 'Bash Scripting',
    proficiency: 85,
    icon: 'Terminal',
    category: 'tools'
  },
  {
    name: 'SIEM Tools',
    proficiency: 88,
    icon: 'Shield',
    category: 'tools'
  },
  {
    name: 'Wireshark',
    proficiency: 90,
    icon: 'Waves',
    category: 'tools'
  },
  {
    name: 'Metasploit',
    proficiency: 92,
    icon: 'Target',
    category: 'tools'
  },
  {
    name: 'C++',
    proficiency: 65,
    icon: 'Code',
    category: 'tools'
  },
  {
    name: 'C',
    proficiency: 50,
    icon: 'Code',
    category: 'tools'
  },
  {
    name: 'Java',
    proficiency: 70,
    icon: 'Coffee',
    category: 'tools'
  },
  {
    name: 'JavaScript',
    proficiency: 50,
    icon: 'FileCode',
    category: 'tools'
  },
];