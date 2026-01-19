"use client";

import { useRef } from "react";
import { ReactLenis } from "lenis/react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Terminal, ArrowLeft, ArrowUpRight } from "lucide-react";
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
    // UPDATED: 'top-4' for mobile (higher up), 'w-[85%]' (slightly smaller width)
    <div className="fixed top-6 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[85%] md:w-auto max-w-[400px]">
      
      {/* UPDATED: 'p-1' (smaller inner spacing) for mobile, 'md:p-1.5' for desktop */}
      <div className="flex items-center justify-between p-1 md:p-1.5 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            // UPDATED PADDING: 
            // Mobile: 'px-3 py-2' (Compact)
            // Desktop: 'md:px-6 md:py-2.5' (Original size)
            className={`relative px-3 py-2 md:px-6 md:py-2.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 flex-1 text-center ${
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
    role: "File Analysis & AI Query System",
    company: "Freelance Project",
    period: "2024",
    description: "Clients needed a way to explore complex DNA-related PDFs without manually searching through documents. I built a natural language query system using NLP and RAG, enabling accurate, context-aware answers from unstructured files. The system leveraged vector databases for semantic retrieval and was deployed as an interactive Streamlit application with integrated analytics, making complex scientific data accessible and usable.",
    skills: ["Python", "Streamlit", "LangChain", "RAG"]
  },
  {
    role: "CSV Agent (RAG Application)",
    company: "Freelance Project",
    period: "2024",
    description: "To solve the challenge of querying large CSV datasets without technical expertise, I developed a RAG-powered CSV agent that converts natural language questions into meaningful data insights. Using embeddings and prompt engineering, the system delivers accurate interpretations while a real-time Streamlit interface enables live analytics and exploration. The solution bridges raw data and decision-making through conversational AI.",
    skills: ["Python", "Groq API", "HuggingFace", "Pandas"]
  },
  {
    role: "AI-Powered Conversational Mobile App",
    company: "Freelance Project",
    period: "2023",
    description: "For a mobile application requiring intelligent, human-like interaction, I integrated an LLM-powered chatbot into a React Native app. I optimized response quality by analyzing user behavior and refining prompt logic across multiple AI personas. The result was a smooth, reliable conversational experience with consistent performance across user sessions.",
    skills: ["React Native", "LLM API", "AsyncStorage", "Mobile Dev"]
  }
];

const education = [
  {
    degree: "B.E. in Computer Science Engineering (Big Data Analytics)",
    school: "Chandigarh University, Mohali",
    period: "Expected 2026",
    details: "CGPA: 7.46 / 10 (till 7th Semester)",
  },
  {
    degree: "Senior Secondary (12th Grade)",
    school: "DAV Public School, Jharkhand",
    period: "2019 – 2021",
    details: "Secured 80.83% in 12th board exams and 84.67% in 10th board exams.",
  }
];

// --- UPDATED SKILLS SECTION ---
const skills = [
  { 
    category: "Languages & Databases", 
    items: ["Python", "JavaScript", "C++", "SQL (MySQL/Postgres)", "MongoDB"] 
  },
  { 
    category: "Generative AI & Analytics", 
    items: ["LLMs & RAG", "LangChain & LangGraph", "Vector Embeddings", "Numpy","Pandas", "Scikit-learn", "Hugging Face APIs", "Ollama2", "Groq"] 
  },
  { 
    category: "Full Stack Development", 
    items: ["React & React Native", "Node.js", "FastAPI", "Firebase", "Supabase"] 
  },
  { 
    category: "Tools & DevOps", 
    items: ["Git & GitHub", "Docker", "Streamlit", "Vercel", "Render"] 
  }
];

// --- COMPONENTS ---
const SectionHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-4 mb-12">
    <div className="p-3 bg-white/5 rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">{title}</h2>
  </div>
);

// Enhanced Card Component
const Card = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay }}
    className="relative p-8 bg-[#111]/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden group hover:border-white/20 transition-colors duration-500"
  >
    {/* Subtle gradient hover effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

// --- CONTACT FOOTER ---
const ContactSection = () => {
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden z-20 mt-32 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-40 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white/40"
        >
          Got a project in mind?
        </motion.span>
        
        <div className="overflow-hidden">
          <motion.h2 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[12vw] leading-[0.85] font-black uppercase text-white tracking-tighter"
          >
            Let's Connect
          </motion.h2>
        </div>

        <motion.a 
          href="mailto:omgupta2473@gmail.com"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative mt-12 w-32 h-32 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center cursor-pointer group overflow-hidden"
        >
          <div className="absolute inset-0 bg-neutral-200 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full origin-center ease-out" />
          
          <div className="relative z-10 flex flex-col items-center gap-1 transition-transform duration-300 group-hover:-translate-y-[150%]">
             <span className="text-[10px] font-bold uppercase tracking-widest text-black">Write a</span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-black">Message</span>
          </div>
          
          <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-y-[150%] group-hover:translate-y-0 transition-transform duration-300">
             <ArrowUpRight className="w-8 h-8 text-black" />
          </div>
        </motion.a>
      </div>

      <div className="absolute bottom-8 w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/30">
         <span className="hidden md:block">Connect with me on social</span>
         <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors duration-300">Instagram</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Twitter</a>
            <a href="#" className="hover:text-white transition-colors duration-300">LinkedIn</a>
         </div>
         <span className="md:hidden">© 2026 Om Gupta</span>
      </div>
    </section>
  );
};

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
        
        {/* 1. FLOATING NAVBAR */}
        <FloatingNavbar />

        {/* 2. BACK BUTTON */}
        <div className="fixed top-16 left-8 z-[60] mix-blend-difference">
          <Link href="/#about" className="group flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-widest hover:text-white/70 transition-colors">
            <div className="p-3 bg-white text-black rounded-full group-hover:scale-110 transition-transform">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="hidden md:inline-block">Back to Home</span>
          </Link>
        </div>

        {/* NOISE OVERLAY */}
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        {/* WIDE CONTAINER */}
        <div className="w-full max-w-[90vw] md:max-w-full mx-auto px-6 md:px-20 pt-32 pb-20 relative z-10">
          
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
            
            {/* BIO */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-lg md:text-xl font-light text-white/60 w-full max-w-full leading-relaxed"
            >
              I focus on building AI-powered products using <strong className="text-white">Generative AI</strong> and <strong className="text-white">modern full-stack technologies</strong>. 
              I’ve worked on <strong className="text-white">LLM-based analytics systems</strong>, <strong className="text-white">RAG pipelines</strong>, and AI-driven applications, taking ideas from concept and system design to production-ready deployment.
              <br /><br />
              I enjoy fast iteration, problem-solving, and building scalable systems that create real-world impact. I’m motivated by product-driven, high-ownership environments where engineering decisions matter.
            </motion.p>
          </section>

          {/* EXPERIENCE SECTION (NARRATIVE STYLE) */}
          <section className="mb-32">
            <SectionHeader title="Professional Experience" icon={Briefcase} />
            <div className="grid gap-6">
              {experiences.map((exp, i) => (
                <Card key={i} delay={i * 0.1}>
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-blue-400">{exp.company}</h4>
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40 border border-white/10 px-3 py-1 rounded-full whitespace-nowrap">{exp.period}</span>
                  </div>
                  
                  {/* Description Paragraph */}
                  <p className="text-white/60 leading-relaxed font-light mb-6 text-sm md:text-base">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {exp.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-white/5 hover:bg-white/10 transition-colors text-[10px] uppercase tracking-widest text-white/70 rounded-md border border-white/5">
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
            <div className="grid gap-6">
                {education.map((edu, i) => (
                <Card key={i}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                    <span className="text-white/40 font-mono text-sm border border-white/10 px-3 py-1 rounded-full">{edu.period}</span>
                    </div>
                    <div className="text-xl text-white/80 mb-4">{edu.school}</div>
                    <p className="text-white/60 font-light">{edu.details}</p>
                </Card>
                ))}
            </div>
          </section>

          {/* SKILLS SECTION (UPDATED) */}
          <section className="mb-32">
            <SectionHeader title="Technical Arsenal" icon={Terminal} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((group, i) => (
                <Card key={i} delay={i * 0.1}>
                  <h3 className="text-lg font-bold uppercase tracking-widest text-white/40 mb-6 border-b border-white/10 pb-2">{group.category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {group.items.map(item => (
                      <div key={item} className="flex items-center gap-2 text-white/80 group/skill">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover/skill:scale-150 transition-transform" />
                        <span className="text-lg font-medium group-hover/skill:text-white transition-colors">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* CONTACT FOOTER */}
          <ContactSection />

        </div>
      </div>
    </ReactLenis>
  );
}