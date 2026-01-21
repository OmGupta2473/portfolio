"use client";

import { useRef } from "react";
import { ReactLenis } from "lenis/react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Terminal, ArrowLeft, ArrowUpRight, Github, Linkedin, Instagram } from "lucide-react";
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
    <div className="fixed top-6 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[85%] md:w-auto max-w-[400px]">
      <div className="flex items-center justify-between p-1 md:p-1.5 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
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

// --- SKILLS ---
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
  <div className="flex items-center gap-4 mb-8 md:mb-12">
    <div className="p-3 bg-white/5 rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
    </div>
    <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter text-white">{title}</h2>
  </div>
);

const Card = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay }}
    // RESPONSIVE PADDING: p-6 on mobile, p-8 on desktop
    className="relative p-6 md:p-8 bg-[#111]/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden group hover:border-white/20 transition-colors duration-500"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

// --- UPDATED CONTACT FOOTER ---
const ContactSection = () => {
  return (
    // Adjusted 'pt-52' to 'pt-40' to balance the smaller text vertically
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden z-20 pt-40 pb-16">
      
      {/* Background Gradient Spotlights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-40 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        
        {/* SMALL LABEL */}
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-white/60 mb-[-5px] relative z-20"
        >
          Got a project in mind?
        </motion.span>
        
        {/* HEADLINE: FIXED FONT SIZE */}
        <div className="overflow-hidden relative z-10">
          <motion.h2 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            // CHANGE IS HERE: text-[7vw] fits "LET'S CONNECT" on one line on mobile
            className="text-[7vw] md:text-[9vw] leading-none font-black uppercase text-white tracking-tighter whitespace-nowrap"
          >
            Let's Connect
          </motion.h2>
        </div>

        {/* BUTTON */}
        <motion.a 
          href="mailto:omgupta24733@gmail.com"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative mt-2 w-24 h-24 md:w-36 md:h-36 rounded-full bg-white flex items-center justify-center cursor-pointer group overflow-hidden z-20"
        >
          <div className="absolute inset-0 bg-neutral-200 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full origin-center ease-out" />
          
          <div className="relative z-10 flex flex-col items-center gap-1 transition-transform duration-300 group-hover:-translate-y-[150%]">
             <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-black">Write a</span>
             <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-black">Message</span>
          </div>
          
          <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-y-[150%] group-hover:translate-y-0 transition-transform duration-300">
             <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-black" />
          </div>
        </motion.a>

        {/* SOCIAL LINKS */}
        <div className="flex items-center gap-6 md:gap-8 mt-6 relative z-20">
            <a 
              href="https://github.com/OmGupta2473" 
              target="_blank" 
              className="group flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors relative"
            >
              <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors border border-white/5 group-hover:border-white/20">
                <Github className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 pointer-events-none">Github</span>
            </a>

            <a 
              href="https://www.linkedin.com/in/om-gupta-265b80268/" 
              target="_blank" 
              className="group flex flex-col items-center gap-2 text-white/50 hover:text-blue-400 transition-colors relative"
            >
              <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors border border-white/5 group-hover:border-blue-400/30">
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 pointer-events-none text-blue-400">LinkedIn</span>
            </a>

            <a 
              href="https://www.instagram.com/omguptaa.__?igsh=Nmp3azduOHlmOTky&utm_source=qr" 
              target="_blank" 
              className="group flex flex-col items-center gap-2 text-white/50 hover:text-pink-400 transition-colors relative"
            >
              <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors border border-white/5 group-hover:border-pink-400/30">
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 pointer-events-none text-pink-400">Instagram</span>
            </a>
        </div>

      </div>

      {/* Footer Bottom Text */}
      <div className="absolute bottom-4 w-full text-center z-10">
         <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white/20">© 2026 Om Gupta</span>
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
        
        <FloatingNavbar />

        {/* BACK BUTTON: Repositioned for mobile to avoid overlap */}
        <div className="fixed top-8 left-4 md:top-16 md:left-8 z-[60] mix-blend-difference">
          <Link href="/#about" className="group flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-widest hover:text-white/70 transition-colors">
            <div className="p-2 md:p-3 bg-white text-black rounded-full group-hover:scale-110 transition-transform">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="hidden md:inline-block">Back to Home</span>
          </Link>
        </div>

        <div className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        <div className="w-full max-w-[95vw] md:max-w-full mx-auto px-4 md:px-20 pt-32 pb-20 relative z-10">
          
          {/* HERO HEADER */}
          <section className="mb-24 md:mb-32 mt-10 md:mt-0">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[15vw] leading-[0.8] font-black uppercase tracking-tighter text-white mb-6 md:mb-8"
            >
              ABOUT<br/><span className="text-white/20">ME.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-base md:text-xl font-light text-white/60 w-full max-w-full leading-relaxed"
            >
              I focus on building AI-powered products using <strong className="text-white">Generative AI</strong> and <strong className="text-white">modern full-stack technologies</strong>. 
              I’ve worked on <strong className="text-white">LLM-based analytics systems</strong>, <strong className="text-white">RAG pipelines</strong>, and AI-driven applications, taking ideas from concept and system design to production-ready deployment.
              <br /><br />
              I enjoy fast iteration, problem-solving, and building scalable systems that create real-world impact. I’m motivated by product-driven, high-ownership environments where engineering decisions matter.
            </motion.p>
          </section>

          {/* EXPERIENCE SECTION */}
          <section className="mb-24 md:mb-32">
            <SectionHeader title="Experience" icon={Briefcase} />
            <div className="grid gap-4 md:gap-6">
              {experiences.map((exp, i) => (
                <Card key={i} delay={i * 0.1}>
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 leading-tight">{exp.role}</h3>
                        <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-blue-400">{exp.company}</h4>
                    </div>
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/40 border border-white/10 px-2 py-1 md:px-3 rounded-full whitespace-nowrap w-fit">{exp.period}</span>
                  </div>
                  
                  <p className="text-white/60 leading-relaxed font-light mb-6 text-sm md:text-base">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {exp.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 md:px-3 bg-white/5 hover:bg-white/10 transition-colors text-[10px] uppercase tracking-widest text-white/70 rounded-md border border-white/5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* EDUCATION SECTION */}
          <section className="mb-24 md:mb-32">
            <SectionHeader title="Education" icon={GraduationCap} />
            <div className="grid gap-4 md:gap-6">
                {education.map((edu, i) => (
                <Card key={i}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{edu.degree}</h3>
                      <span className="text-white/40 font-mono text-[10px] md:text-sm border border-white/10 px-2 py-1 md:px-3 rounded-full w-fit">{edu.period}</span>
                    </div>
                    <div className="text-lg md:text-xl text-white/80 mb-4">{edu.school}</div>
                    <p className="text-white/60 font-light text-sm md:text-base">{edu.details}</p>
                </Card>
                ))}
            </div>
          </section>

          {/* SKILLS SECTION */}
          <section className="mb-32">
            <SectionHeader title="Technical Arsenal" icon={Terminal} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {skills.map((group, i) => (
                <Card key={i} delay={i * 0.1}>
                  <h3 className="text-sm md:text-lg font-bold uppercase tracking-widest text-white/40 mb-4 md:mb-6 border-b border-white/10 pb-2">{group.category}</h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {group.items.map(item => (
                      <div key={item} className="flex items-center gap-2 text-white/80 group/skill">
                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-blue-500 rounded-full group-hover/skill:scale-150 transition-transform" />
                        <span className="text-base md:text-lg font-medium group-hover/skill:text-white transition-colors">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <ContactSection />

        </div>
      </div>
    </ReactLenis>
  );
}