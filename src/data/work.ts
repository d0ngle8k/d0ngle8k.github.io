export type WorkItem = {
  role: string;
  company: string;
  start: string;
  end?: string;
  summary: string;
  bullets: string[];
};

export const workHistory: WorkItem[] = [
  {
    role: 'Custom PC Builder & Laptop Customization (Freelance)',
    company: 'Self-Employed',
    start: '2023',
    summary:
      'Build and tune gaming/coding laptops and desktops for best price-to-performance, tailored to specific user needs.',
    bullets: [
      'Pick optimal laptop or PC components for gaming or development workloads based on budget and goals.',
      'Install clean Windows or set up dual-boot Windows + Linux; configure Hackintosh on request (with noted stability trade-offs).',
      'Update BIOS/firmware, undervolt CPU/GPU, and tune RAM frequency/timings to safe maximums for stability and performance.',
      'Document configurations and maintenance steps so users can safely update and sustain their systems.'
    ]
  },
  {
    role: 'Home Business Owner',
    company: 'Mooncake Distribution (Seasonal)',
    start: '2019',
    end: '2025',
    summary:
      'Ran a seasonal mooncake distribution business, handling sourcing, inventory, sales, and last-mile fulfillment during peak festival periods.',
    bullets: [
      'Coordinated supplier relationships and quality checks to keep defect rates near zero during peak volume.',
      'Managed seasonal inventory planning and cash flow for high-demand weeks, minimizing overstock and spoilage.',
      'Built repeat customer base through responsive support, reliable delivery, and packaging improvements.'
    ]
  },
  {
    role: 'System Administrator',
    company: 'ETH Mining Rigs (Self-Operated)',
    start: '2017',
    end: '2019',
    summary:
      'Deployed and maintained GPU/ASIC Ethereum mining rigs with uptime-focused monitoring and cost control.',
    bullets: [
      'Assembled and tuned rigs (BIOS tweaks, firmware updates, overclock/undervolt) for stable hashrates.',
      'Automated health checks, temperature alerts, and graceful restarts to keep downtime minimal.',
      'Optimized power usage and cooling layouts to balance performance with electricity costs.'
    ]
  },
  {
    role: 'Prompt Engineer',
    company: 'Independent',
    start: '2024-12',
    end: '2025-06',
    summary:
      'Designed and iterated prompts for LLM workflows, focusing on accuracy, tone, and safety for varied tasks.',
    bullets: [
      'Built reusable prompt patterns for summaries, code assistance, and troubleshooting with guardrails.',
      'Benchmarked outputs across models, refining instructions to reduce hallucinations and improve clarity.',
      'Documented prompt playbooks so non-technical users could replicate high-quality results consistently.'
    ]
  }
];
