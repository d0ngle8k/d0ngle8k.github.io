export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  expires?: string;
  credentialId?: string;
  description: string;
  skills: string[];
  logo: string;
}

export const certificates: Certificate[] = [
  {
    id: 1,
    name: "Google Professional Cybersecurity Certificate",
    issuer: "Google",
    date: "2025-05-20",
    description: "Comprehensive cybersecurity program covering security operations, threat detection, incident response, and security tools.",
    skills: ["Security Operations", "Threat Detection", "Incident Response", "Python", "Linux", "SIEM"],
    logo: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    name: "Google IT Support Professional Certificate",
    issuer: "Google",
    date: "2025-07-01",
    description: "Advanced IT support certification covering system administration, networking, security, and troubleshooting.",
    skills: ["System Administration", "Networking", "Security", "Troubleshooting", "Cloud Computing"],
    logo: "https://images.pexels.com/photos/5380651/pexels-photo-5380651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    name: "VMware vSphere 8+ Certificate",
    issuer: "VMware",
    date: "2024-11-01",
    expires: "2027-02-28",
    description: "Expert-level certification in VMware vSphere 8+ implementation, management, and security.",
    skills: ["Virtualization", "Cloud Infrastructure", "Security Hardening", "Performance Optimization", "Disaster Recovery"],
    logo: "https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];