export type Project = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
};

export const projects: Project[] = [
  {
    slug: 'reinforcement-learning-mario-project',
    title: 'Reinforcement Learning Mario Project',
    date: '2025-12-15',
    tags: ['machine-learning', 'deep-learning', 'reinforcement-learning', 'python'],
    summary: 'Deep RL agent that learns to play Super Mario Bros using neural networks and policy gradients.'
  },
  {
    slug: 'personal-schedule-assistant',
    title: 'Personal Schedule Assistant',
    date: '2024-12-08',
    tags: ['machine-learning', 'python', 'pretrained-models', 'hybrid-model', 'window-application', 'rule-based'],
    summary: 'AI-powered desktop app for intelligent schedule management using hybrid ML models.'
  },
  {
    slug: 'cognative-radio-research',
    title: 'Cognitive Radio Research',
    date: '2024-11-04',
    tags: ['research-paper', '5g', '4g-lte', 'cognitive-radio'],
    summary: 'Research on cognitive radio technology for next-generation wireless networks.'
  },
  {
    slug: 'blockchain-demo',
    title: 'Blockchain Demo',
    date: '2024-10-26',
    tags: ['blockchain', 'web-based', 'pug'],
    summary: 'Web-based demonstration of blockchain concepts and implementations.'
  },
  {
    slug: 'leetcode-solutions',
    title: 'LeetCode Solutions',
    date: '2024-10-23',
    tags: ['java', 'algorithms', 'data-structures'],
    summary: 'Collection of LeetCode problem solutions in Java covering various algorithms.'
  },
  {
    slug: 'blockchain-from-scratch',
    title: 'Blockchain from Scratch',
    date: '2024-10-22',
    tags: ['ruby', 'blockchain', 'cryptography'],
    summary: 'Educational project building blockchain from fundamentals using Ruby.'
  },
  {
    slug: 'simple-ransomware',
    title: 'Simple Ransomware (Educational)',
    date: '2024-05-19',
    tags: ['python', 'security', 'encryption'],
    summary: 'Educational demonstration of ransomware mechanics for cybersecurity learning.'
  },
  {
    slug: 'facial-recognition',
    title: 'Facial Recognition',
    date: '2024-03-14',
    tags: ['python', 'computer-vision', 'opencv'],
    summary: 'Face detection and recognition system using Python and computer vision.'
  },
  {
    slug: 'cisco-packet-tracer-cafe',
    title: 'Internet Cafe Network Simulation',
    date: '2024-03-04',
    tags: ['networking', 'cisco', 'packet-tracer'],
    summary: 'Network design and simulation for internet cafe using Cisco Packet Tracer.'
  },
  {
    slug: 'marketing-project',
    title: 'Marketing Project',
    date: '2023-12-12',
    tags: ['css', 'html', 'web-design'],
    summary: 'Marketing website project (study assignment with deadline constraints).'
  },
  {
    slug: 'phone-store-oop',
    title: 'Phone Store Management (OOP)',
    date: '2023-12-11',
    tags: ['java', 'oop', 'desktop-app'],
    summary: 'Object-oriented phone store management system built with Java.'
  },
  {
    slug: 'python-game',
    title: 'Python Game Project',
    date: '2024-09-05',
    tags: ['python', 'game-development', 'pygame'],
    summary: 'Interactive game developed using Python and game development frameworks.'
  }
];
