"use client";

import { useRef } from "react";
import { ReactLenis } from "lenis/react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Terminal, ArrowLeft } from "lucide-react"; // Added ArrowLeft back
import Link from "next/link";

// --- 1. FLOATING NAVBAR ---
const FloatingNavbar = () => {
  const activeTab = "About"; 
  
  const tabs = [
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" }
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto max-w-[400px]">
      <div className="flex items-center justify-between p-1.5 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className={`relative px-4 md:px-6 py-2.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 flex-1 text-center ${
              activeTab === tab.name ? "text-white" : "text-white/60 hover:text-white"
            }`}
          >
            {activeTab === tab.name && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-white/10 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

// --- DATA ---
const experiences = [
  {
    role: "Freelance Full Stack Developer",
    company: "MoonzNails (Boutique Salon)",
    period: "Oct 2025 - Present",
    description: "Built a bespoke e-commerce and booking platform for a nail art business. Engineered a real-time scheduling system using React and Firebase to prevent double-booking and managing inventory.",
    skills: ["React", "Firebase", "Firestore", "Stripe API"]
  },
  {
    role: "Freelance AI Engineer",
    company: "Stealth Startup Project",
    period: "Late 2023",
    description: "Developed an AI-powered conversational mobile application. Implemented local LLM quantization for privacy-first on-device inference and synced metadata via AsyncStorage.",
    skills: ["React Native", "LLM APIs", "Mobile Dev"]
  },
  {
    role: "Freelance Data Engineer",
    company: "Research Team Project",
    period: "Mid 2023",
    description: "Collaborated with a team to build a DNA file analysis platform. Processed large-scale genetic datasets using Python and Pandas for pattern recognition.",
    skills: ["Python", "Pandas", "Data Science"]
  }
];

const education = [
  {
    degree: "B.Tech in Computer Science Engineering",
    school: "Your University Name",
    period: "2022 - 2026 (Expected)",
    details: "Specializing in Intelligent Systems. Active member of the coding club and lead organizer for campus hackathons.",
  }
];

const skills = [
  { category: "Languages", items: ["Python", "JavaScript (ES6+)", "C++", "SQL", "HTML/CSS"] },
  { category: "Frontend", items: ["React", "Next.js 14", "Framer Motion", "Three.js", "Tailwind CSS"] },
  { category: "Backend & AI", items: ["Node.js", "LangChain", "RAG Systems", "Firebase", "Supabase"] },
  { category: "Tools", items: ["Git", "Docker", "Figma", "Vercel", "Postman"] }
];

// --- COMPONENTS ---
const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-4 mb-12">
    <div className="p-3 bg-white/5 rounded-full border border-white/10">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">{title}</h2>
  </div>
);

const Card = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay }}
    className="p-8 bg-[#111] border border-white/10 rounded-2xl hover:border-white/20 transition-colors group"
  >
    {children}
  </motion.div>
);

// --- MAIN PAGE ---
export default function AboutPage() {
  const lenisOptions = {
    lerp: 0.1,
    duration: 1.5,
    smoothTouch: false,
    smoothWheel: true,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-white selection:text-black">
        
        {/* 1. FLOATING NAVBAR (Center) */}
        <FloatingNavbar />

        {/* 2. BACK BUTTON (Top-Left) - Restored */}
        <div className="fixed top-8 left-8 z-[60] mix-blend-difference">
          <Link href="/#about" className="group flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-widest hover:text-white/70 transition-colors">
            <div className="p-3 bg-white text-black rounded-full group-hover:scale-110 transition-transform">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="hidden md:inline-block">Back to Home</span>
          </Link>
        </div>

        {/* NOISE OVERLAY */}
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        <div className="max-w-5xl mx-auto px-6 pt-32 pb-20 relative z-10">
          
          {/* HERO HEADER */}
          <section className="mb-32">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[15vw] leading-[0.8] font-black uppercase tracking-tighter text-white mb-8"
            >
              ABOUT<br/><span className="text-white/20">ME.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl md:text-2xl font-light text-white/60 max-w-2xl leading-relaxed"
            >
              I am a multi-disciplinary engineer bridging the gap between <strong className="text-white">complex data systems</strong> and <strong className="text-white">fluid user experiences</strong>. 
            </motion.p>
          </section>

          {/* EXPERIENCE SECTION */}
          <section className="mb-32">
            <SectionHeader title="Experience" icon={Briefcase} />
            <div className="grid gap-6">
              {experiences.map((exp, i) => (
                <Card key={i} delay={i * 0.1}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40 border border-white/10 px-3 py-1 rounded-full">{exp.period}</span>
                  </div>
                  <h4 className="text-lg text-blue-400 mb-4">{exp.company}</h4>
                  <p className="text-white/60 leading-relaxed mb-6">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-white/5 text-[10px] uppercase tracking-widest text-white/70 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* EDUCATION SECTION */}
          <section className="mb-32">
            <SectionHeader title="Education" icon={GraduationCap} />
            {education.map((edu, i) => (
              <Card key={i}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                   <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                   <span className="text-white/40 font-mono text-sm">{edu.period}</span>
                </div>
                <div className="text-xl text-white/80 mb-4">{edu.school}</div>
                <p className="text-white/60">{edu.details}</p>
              </Card>
            ))}
          </section>

          {/* SKILLS SECTION */}
          <section className="mb-32">
            <SectionHeader title="Technical Arsenal" icon={Terminal} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((group, i) => (
                <Card key={i} delay={i * 0.1}>
                  <h3 className="text-lg font-bold uppercase tracking-widest text-white/40 mb-6 border-b border-white/10 pb-2">{group.category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {group.items.map(item => (
                      <div key={item} className="flex items-center gap-2 text-white/80">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <span className="text-lg font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

        </div>
      </div>
    </ReactLenis>
  );
}