export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
    facebook?: string;
  };
  resumeUrl: string;
}

export const personalInfo: PersonalInfo = {
  name: "Truong Gia Thanh",
  title: "Junior Security Engineer & Computer Engineering Student",
  email: "trggiathanh2003@gmail.com",
  phone: "+84 942 380 283",
  location: "Ho Chi Minh, Viet Nam",
  bio: "Motivated 4th-year Computer Engineering student specializing in cybersecurity, with a strong drive to learn and grow in the field. Experienced in CTF competitions, security labs, and collaborative projects, I thrive on solving real-world security challenges and continuously expanding my technical skills. Eager to contribute fresh perspectives and energy to a professional security team, I am committed to building a safer digital world through ethical hacking, vulnerability research, and proactive defense. Let's connect and make an impact together!",
  socialLinks: {
    linkedin: "https://linkedin.com/in/d0ngle8k",
    github: "https://github.com/d0ngle8k",
    twitter: "https://twitter.com/d0ngle8k",
    facebook: "https://www.facebook.com/GiaThanh683/",
  },
  resumeUrl: "#"
};