"use client";

import { useRef, useState, useEffect, memo } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring, useVelocity } from "framer-motion";
import { ArrowDown, ArrowUpRight, ExternalLink, Github, X, ChevronRight, Globe } from "lucide-react"; 
import { ReactLenis, useLenis } from "lenis/react";
import Matter from "matter-js";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";
import Link from "next/link";

// --- 1. DATA: PROJECTS ---
const projects = [
  {
    id: 1,
    title: "Enterprise AI Agent",
    category: "AI Architecture",
    stack: ["Python", "LangChain", "ChromaDB", "Docker"],
    color: "#3b82f6",
    description: "A scalable RAG system for enterprise data retrieval.",
    longDescription: "Designed a centralized knowledge retrieval system for a large-scale enterprise. The system ingests thousands of PDFs, Docs, and internal wiki pages into a vector database.",
    challenge: "The primary challenge was handling latency with large-scale vector retrieval while maintaining context accuracy across 100+ document pages.",
    images: [
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=2000"
    ],
    link: "#"
  },
  {
    id: 2,
    title: "Moonz Nail Store",
    category: "E-Commerce",
    stack: ["React", "Firebase", "Firestore", "Vercel"],
    color: "#ec4899",
    description: "Full-stack booking & e-commerce platform.",
    longDescription: "A bespoke e-commerce solution tailored for a boutique nail salon. Features include real-time appointment scheduling, inventory management, and a custom CMS.",
    challenge: "Synchronizing physical store availability with online bookings in real-time to prevent double-booking slots.",
    images: [
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=2000"
    ],
    link: "#"
  },
  {
    id: 3,
    title: "AI PDF Query Tool",
    category: "SaaS Tool",
    stack: ["Python", "LangChain", "Streamlit"],
    color: "#f97316",
    description: "Intelligent document analysis tool.",
    longDescription: "A SaaS tool allowing users to upload legal contracts and ask complex questions. The AI highlights specific clauses and checks for compliance risks.",
    challenge: "Parsing complex PDF layouts with tables and multi-column text accurately.",
    images: ["https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=2000"],
    link: "#"
  },
  {
    id: 4,
    title: "AI Chatbot App",
    category: "Mobile Dev",
    stack: ["React Native", "LLM APIs", "AsyncStorage"],
    color: "#10b981",
    description: "Cross-platform mobile assistant.",
    longDescription: "A personal assistant app that runs a quantized LLM locally on the device for privacy, syncing only essential metadata to the cloud.",
    challenge: "Optimizing the model to run smoothly on older Android devices without draining battery.",
    images: ["https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2000"],
    link: "#"
  },
  {
    id: 5,
    title: "Risk Model",
    category: "Data Science",
    stack: ["Python", "Scikit-learn", "Pandas"],
    color: "#ef4444",
    description: "Predictive modeling for financial risks.",
    longDescription: "Built a regression model to predict stock volatility based on 10 years of historical market data and sentiment analysis from news APIs.",
    challenge: "Cleaning noisy financial data and preventing overfitting on historical trends.",
    images: ["https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=2000"],
    link: "#"
  },
  {
    id: 6,
    title: "CSV AI Agent",
    category: "Analytics",
    stack: ["Python", "Streamlit", "Groq API"],
    color: "#8b5cf6",
    description: "RAG-based Q&A agent for CSVs.",
    longDescription: "An agent that converts natural language questions into Pandas code to analyze uploaded CSV files instantly.",
    challenge: "Ensuring the generated Python code is safe to execute and handles edge cases.",
    images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"],
    link: "#"
  },
];

// --- 2. 3D COMPONENTS (Laptop) ---
const LaptopModel = memo(({ activeProject }) => {
  const group = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 20 + 0.25, 0.1);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 10, 0.1);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t / 4) / 20, 0.1);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (-1.5 + Math.sin(t / 1.5)) / 5, 0.1);
  });

  return (
    <group ref={group} rotation={[0.3, 0, 0]}>
      <mesh position={[0, -0.75, 0]}>
        <boxGeometry args={[4.5, 0.2, 3]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.8} />
      </mesh>
      <group position={[0, -0.65, -1.4]} rotation={[-0.25, 0, 0]}>
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[4.5, 3, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0, 1.5, 0.06]}>
          <planeGeometry args={[4.2, 2.7]} />
          <meshBasicMaterial color={activeProject.color} toneMapped={false} />
          <Html transform wrapperClass="htmlScreen" distanceFactor={1.5} position={[0, 0, 0.01]}>
            <div className="w-[420px] h-[270px] bg-black/90 flex flex-col items-center justify-center text-center p-8 border-2 border-white/10 rounded-lg select-none">
                <div className="absolute inset-0 opacity-30" style={{ background: `linear-gradient(to bottom right, ${activeProject.color}, transparent)` }} />
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter relative z-10 drop-shadow-lg">{activeProject.title}</h3>
                <p className="text-sm text-white/80 mt-2 font-mono relative z-10">{activeProject.category}</p>
                <div className="mt-6 flex flex-wrap gap-2 justify-center relative z-10">
                  {activeProject.stack.slice(0,3).map((tech, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-widest border border-white/30 px-3 py-1 rounded-full text-white bg-white/10">{tech}</span>
                  ))}
                </div>
            </div>
          </Html>
        </mesh>
      </group>
    </group>
  );
}, (prevProps, nextProps) => prevProps.activeProject.id === nextProps.activeProject.id);

// --- 3. PROJECT DETAIL MODAL ---
const ProjectDetailModal = ({ project, onClose }) => {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.stop();
    }
    return () => {
      if (lenis) {
        lenis.start();
      }
    };
  }, [lenis]);

  if (!project) return null;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 z-[90] lg:hidden backdrop-blur-sm"
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-20 bottom-10 right-10 z-[100] w-[92%] lg:w-[45%] bg-[#111] shadow-2xl overflow-hidden flex flex-col rounded-[2rem] border border-white/10" 
      >
        <div className="flex items-center justify-between p-6 md:p-8 bg-[#111] z-20 border-b border-white/5">
           <div className="flex gap-2">
              <button 
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest transition-colors text-white/70 hover:text-white"
              >
                 <ChevronRight className="w-3 h-3" /> Back
              </button>
           </div>
           
           <div className="flex gap-2">
              <a href={project.link} className="p-2 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors">
                 <ExternalLink className="w-4 h-4" />
              </a>
              <button onClick={onClose} className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors">
                 <X className="w-4 h-4" />
              </button>
           </div>
        </div>

        <div 
          className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar"
          data-lenis-prevent 
        >
           <div className="mb-10">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-4 block"
                style={{ color: project.color }}
              >
                {project.category}
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight"
              >
                {project.title}
              </motion.h1>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.stack.map(tech => (
                  <span key={tech} className="px-3 py-1 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/50">
                    {tech}
                  </span>
                ))}
              </div>
           </div>

           <div className="w-full h-[1px] bg-white/10 mb-10" />

           <div className="grid grid-cols-1 gap-12 mb-16">
              <div>
                 <h3 className="text-xl text-white font-medium mb-4">Overview</h3>
                 <p className="text-white/60 leading-relaxed text-sm md:text-base">
                    {project.longDescription}
                 </p>
              </div>
              
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-white/90 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" /> The Challenge
                 </h3>
                 <p className="text-white/60 leading-relaxed text-sm">
                    {project.challenge}
                 </p>
              </div>
           </div>

           <div className="flex flex-col gap-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">Project Gallery</h3>
              {project.images?.map((img, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative w-full aspect-[16/10] bg-neutral-900 rounded-lg overflow-hidden border border-white/5 group"
                >
                   <Image 
                     src={img}
                     alt="Project detail"
                     fill
                     className="object-cover transition-transform duration-700 group-hover:scale-105"
                     unoptimized
                   />
                </motion.div>
              ))}
           </div>

           <div className="h-20" />
           <div className="flex gap-4">
               <a href={project.link} target="_blank" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors">
                  <Github className="w-4 h-4" /> View Code
               </a>
               <a href="#" className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                  <Globe className="w-4 h-4" /> Live Demo
               </a>
            </div>
        </div>
      </motion.div>
    </>
  );
};

// --- 4. PROJECT SHOWCASE ---
const ProjectShowcase = () => {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [selectedProject, setSelectedProject] = useState(null); 

  return (
    <>
      <section id="projects" className="relative w-full bg-[#0a0a0a] text-white py-12 lg:py-32">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          <div className="sticky top-0 h-[45vh] md:h-[50vh] w-full z-50 bg-[#0a0a0a] border-b border-white/5 lg:h-screen lg:border-none lg:bg-transparent lg:sticky lg:top-0 flex flex-col justify-center shadow-2xl lg:shadow-none">
             <div className="w-full h-full relative">
                <Canvas 
                    camera={{ position: [0, 0, 13], fov: 30 }} 
                    dpr={[1, 1.5]}
                    gl={{ preserveDrawingBuffer: true, powerPreference: "high-performance" }}
                > 
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1.5} />
                  <Environment preset="city" />
                  <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4.5} frames={1} />
                  <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <LaptopModel activeProject={activeProject} />
                  </Float>
                </Canvas>
             </div>
             
             <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent lg:hidden" />
          </div>

          <div 
            className="flex flex-col gap-24 lg:gap-32 pb-32 px-2 md:px-8 lg:px-6 z-0 relative"
            style={{ 
              maskImage: 'linear-gradient(to bottom, transparent 0px, black 100px, black 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 100px, black 100%)' 
            }}
          >
            <div className="h-[12vh] md:h-[15vh] lg:hidden" />

            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.3, margin: "-20% 0px -10% 0px" }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeOut", 
                  delay: index === 0 ? 0.4 : 0 
                }}
                onViewportEnter={() => setActiveProject(project)}
                onClick={() => setSelectedProject(project)}
                className="min-h-[40vh] md:min-h-[45vh] lg:min-h-[50vh] flex flex-col justify-center border-l-2 border-white/10 pl-6 md:pl-10 lg:pl-12 relative group cursor-pointer"
              >
                <div className="absolute -left-[2px] top-0 h-full w-[4px] bg-white/10 rounded-full overflow-hidden">
                   <motion.div className="w-full h-full origin-top" style={{ backgroundColor: project.color }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ duration: 0.5 }} />
                </div>
                <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: project.color }}>{project.category}</span>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 group-hover:text-white/90 transition-colors">{project.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm md:text-lg lg:text-base max-w-md mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/5 rounded-full text-[10px] md:text-xs text-white/50 border border-white/5">{tech}</span>
                  ))}
                </div>
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest hover:text-white/80 transition-colors pointer-events-none"><ExternalLink className="w-4 h-4" /> View Details</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

// --- 5. CUSTOM CURSOR ---
const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const velocityX = useVelocity(smoothX);
  const velocityY = useVelocity(smoothY);
  
  const scaleX = useTransform(velocityX, [-800, 0, 800], [1.2, 1, 1.2]);
  const scaleY = useTransform(velocityY, [-800, 0, 800], [0.8, 1, 0.8]);

  useEffect(() => {
    const updateMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = target.closest('a') || target.closest('button') || target.tagName === 'CANVAS';
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 md:w-10 md:h-10 bg-white rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
        scaleX: scaleX,
        scaleY: scaleY,
        translateX: "-50%",
        translateY: "-50%"
      }}
      animate={{ 
        scale: isHovering ? 2.5 : 1, 
      }}
      transition={{ 
        scale: { type: "spring", stiffness: 300, damping: 20 } 
      }}
    />
  );
};

// --- 6. FLOATING NAVBAR ---
const FloatingNavbar = () => {
  const [activeTab, setActiveTab] = useState("About");

  const tabs = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" }, 
    { name: "Projects", href: "#projects" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const tab of tabs) {
        const sectionId = tab.href.substring(1);
        const element = document.getElementById(sectionId);

        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(tab.name);
          }
        }
      }
      
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
         if (window.scrollY > projectsSection.offsetTop + projectsSection.offsetHeight) {
             setActiveTab("Projects");
         }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto max-w-[400px]">
      <div className="flex items-center justify-between p-1.5 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(tab.name);
              const element = document.getElementById(tab.href.substring(1));
              if (element) {
                 window.scrollTo({
                   top: element.offsetTop,
                   behavior: "smooth"
                 });
              }
            }}
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
          </a>
        ))}
      </div>
    </div>
  );
};

// --- 7. SKILLS PHYSICS ---
const SkillsPhysics = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const isMouseDownRef = useRef(false);

  const skills = [
    "Python", "SQL", "Embeddings", "React", 
    "LLMs", "RAG", "LangChain", 
    "LangGraph", "Streamlit", "APIs", 
    "Pandas", "Automation", "Git", "Deployment"
  ];

  useEffect(() => {
    if (!isInView || !containerRef.current || !canvasRef.current) return;

    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Events, Query, Composite, Vector, Body } = Matter;

    const engine = Engine.create();
    engine.world.gravity.y = 1; 
    engine.world.gravity.x = 0;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    const isMobile = width < 1024; 

    const render = Render.create({
      element: containerRef.current,
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: width,
        height: height,
        background: "transparent",
        wireframes: false,
        pixelRatio: 1,
      },
    });

    const addWalls = (w, h) => {
      const thickness = 100;
      const wallOptions = { isStatic: true, render: { visible: false } };
      return [
        Bodies.rectangle(w / 2, -thickness/2, w * 2, thickness, wallOptions),
        Bodies.rectangle(w / 2, h + thickness/2, w * 2, thickness, wallOptions),
        Bodies.rectangle(w + thickness/2, h/2, thickness, h * 2, wallOptions),
        Bodies.rectangle(-thickness/2, h/2, thickness, h * 2, wallOptions),
      ];
    };

    let worldWalls = addWalls(width, height);

    const skillBodies = skills.map((skill, i) => {
      const radius = (isMobile ? 40 : 48) + Math.random() * (isMobile ? 10 : 12);
      const spawnX = Math.random() * (width - 100) + 50; 
      const spawnY = Math.random() * (height * 0.3) + 50; 

      return Bodies.circle(spawnX, spawnY, radius, {
        label: skill,
        friction: 0.2,
        frictionAir: 0.03,  
        restitution: 0.2,   
        density: 0.001,
        render: {
          fillStyle: "transparent",
          strokeStyle: "rgba(255, 255, 255, 0.5)",
          lineWidth: isMobile ? 1.5 : 1.5,
        }
      });
    });

    World.add(engine.world, [...worldWalls, ...skillBodies]);

    const mouse = Mouse.create(render.canvas);
    mouse.pixelRatio = 1;
    
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } }
    });

    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
    World.add(engine.world, mouseConstraint);

    Events.on(engine, "afterUpdate", () => {
      skillBodies.forEach((body) => {
        const { x, y } = body.position;
        if (y > height + 100 || x < -100 || x > width + 100 || y < -100) {
          Body.setPosition(body, { x: width / 2, y: 100 });
          Body.setVelocity(body, { x: 0, y: 0 });
        }
      });
    });

    Events.on(engine, 'beforeUpdate', () => {
      if (!isMouseDownRef.current) return;
      const mousePos = mouse.position;
      skillBodies.forEach(body => {
        const bodyPos = body.position;
        const vector = Vector.sub(bodyPos, mousePos);
        const distance = Vector.magnitude(vector);
        if (distance < 300) {
          const forceMagnitude = (300 - distance) * 0.0005;
          const force = Vector.mult(Vector.normalise(vector), forceMagnitude);
          Body.applyForce(body, bodyPos, force);
        } 
      });
    });

    Events.on(render, "afterRender", () => {
      const ctx = render.context;
      const fontSize = isMobile ? 12 : 14;
      ctx.font = `bold ${fontSize}px 'Inter', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      skillBodies.forEach((body) => {
        const { x, y } = body.position;
        const isHovered = Query.point([body], mouse.position).length > 0;
        ctx.fillStyle = isHovered ? "#000000" : "#ffffff";
        if (isHovered) {
            body.render.fillStyle = "#ffffff";
            body.render.strokeStyle = "transparent";
        } else {
            body.render.fillStyle = "transparent";
            body.render.strokeStyle = "rgba(255, 255, 255, 0.5)";
        }
        ctx.fillText(body.label.toUpperCase(), x, y);
      });
    });

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      render.canvas.width = w; render.canvas.height = h;
      Composite.remove(engine.world, worldWalls);
      worldWalls = addWalls(w, h);
      Composite.add(engine.world, worldWalls);
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Render.stop(render); Runner.stop(runner); World.clear(engine.world); Engine.clear(engine);
      if (render.canvas) render.canvas.remove();
    };
  }, [isInView]);

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-[#0a0a0a] min-h-screen relative z-30">
       <div className="mb-6 text-[10px] uppercase tracking-[0.25em] text-white/40 font-semibold animate-pulse">
         Hover • Drag • Throw
       </div>
      <div 
        ref={containerRef} 
        onMouseDown={() => { isMouseDownRef.current = true; }}
        onMouseUp={() => { isMouseDownRef.current = false; }}
        onMouseLeave={() => { isMouseDownRef.current = false; }}
        onTouchStart={() => { isMouseDownRef.current = true; }}
        onTouchEnd={() => { isMouseDownRef.current = false; }}
        className="relative w-[90%] md:w-[85%] lg:w-[70%] max-w-[900px] h-[60vh] lg:h-[450px] border border-white/10 rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm cursor-grab active:cursor-grabbing"
      >
        <canvas ref={canvasRef} className="absolute inset-0 z-20 block" style={{ touchAction: "none" }} />
        <div className="absolute inset-0 flex items-center justify-center z-10 select-none pointer-events-none px-4 md:px-8">
          <h2 className="text-3xl md:text-6xl lg:text-6xl font-black text-white/[0.08] text-center uppercase leading-[0.9] tracking-tighter">
            Areas I<br />Specialize In
          </h2>
        </div>
      </div>
    </div>
  );
};

// --- 8. UTILS ---
const NoiseOverlay = () => (
  <div className="fixed inset-0 w-full h-full pointer-events-none z-40 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
);

const TornEdge = () => (
  <div className="absolute -top-[58px] left-0 w-full h-[60px] z-30 overflow-hidden leading-none rotate-180 pointer-events-none">
    <svg className="w-full h-full fill-[#0a0a0a] scale-[1.02]" preserveAspectRatio="none" viewBox="0 0 1200 120">
      <path d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z" opacity=".3" />
      <path d="M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28 42.39-19.72 88.18-37.06 136.39-4.85V0z" />
    </svg>
  </div>
);

function InfiniteMarquee() {
  return (
    <div className="absolute top-[60%] left-0 w-full overflow-hidden z-0 pointer-events-none opacity-[0.7] select-none">
      <motion.div 
        className="flex whitespace-nowrap"
        style={{ width: "max-content" }} 
        animate={{ x: "-50%" }} 
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 15 
        }}
      >
        <span className="text-[20vw] font-black uppercase leading-none tracking-[-0.05em] text-white pr-12">
          OM GUPTA — AI & FULL STACK ENGINEER — 
        </span>
        <span className="text-[20vw] font-black uppercase leading-none tracking-[-0.05em] text-white pr-12">
          OM GUPTA — AI & FULL STACK ENGINEER — 
        </span>
      </motion.div>
    </div>
  );
}

function RotatingButton() {
  return (
    <Link href="/about">
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }} 
        className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center cursor-pointer group"
      >
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }} 
          className="absolute inset-0 w-full h-full rounded-full border border-white/20"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full p-2">
            <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
            <text className="text-[9px] font-bold uppercase fill-white tracking-[0.25em]">
              <textPath href="#circlePath" startOffset="0%">LEARN MORE — LEARN MORE —</textPath>
            </text>
          </svg>
        </motion.div>
        <div className="bg-white text-[#0a0a0a] rounded-full p-4 group-hover:bg-neutral-200 transition-colors duration-300">
          <ArrowUpRight className="w-8 h-8" />
        </div>
      </motion.div>
    </Link>
  );
}

// --- 9. CONTACT SECTION ---
const ContactSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden z-20">
      
      {/* Background Gradient Spotlights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-40 pointer-events-none" />

      {/* Main Content */}
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

        {/* Circular Interactive Button */}
        <motion.a 
          href="mailto:omgupta@example.com"
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

      {/* Footer Bottom Bar */}
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

// --- 10. MAIN PAGE LAYOUT ---
export default function Home() {
  const containerRef = useRef(null);
  const textReveal = { hidden: { y: 120, opacity: 0 }, visible: (i) => ({ y: 0, opacity: 1, transition: { delay: 0.2 + i * 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] } }) };

  const lenisOptions = {
    lerp: 0.1, 
    duration: 1.5,
    smoothTouch: false,
    smoothWheel: true,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <div className="relative bg-[#0a0a0a] text-white font-sans selection:bg-white selection:text-black">
        <CustomCursor />
        <FloatingNavbar />
        <NoiseOverlay />

        {/* HERO SECTION */}
        <section className="min-h-screen relative flex flex-col justify-center px-6 md:px-12 pt-24 z-10 border-b border-white/5">
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-y-4">
            <div className="col-span-12 md:col-span-8 flex flex-col items-start leading-[0.85]">

              {/* UPDATED: Changed text size from [12vw] to [9vw] */}
              <div className="overflow-hidden">
                <motion.h1 custom={0} initial="hidden" animate="visible" variants={textReveal} className="text-[12vw] md:text-[10vw] font-black tracking-[-0.04em] uppercase">
                  THINKING
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 custom={1} initial="hidden" animate="visible" variants={textReveal} className="text-[12vw] md:text-[10vw] font-black tracking-[-0.04em] uppercase">
                  BUILDING
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 custom={2} initial="hidden" animate="visible" variants={textReveal} className="text-[12vw] md:text-[10vw] font-black tracking-[-0.04em] uppercase">
                  ENGINEERING
                </motion.h1>
              </div>

            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="col-span-12 md:col-span-4 flex md:justify-end md:items-start mt-4 md:mt-2">
              <p className="mt-28 text-[11px] font-light leading-[1.75] text-right max-w-[420px] ml-auto opacity-60 pr-6">
                 Welcome to the portfolio of an engineer who enjoys solving problems.
                 Through thoughtful thinking, disciplined work, and continuous learning,
                 I build solutions designed to make a real impact.
              </p>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.5 }} className="absolute bottom-12 left-6 md:left-12 flex items-center gap-3 text-xs tracking-widest"><span>SCROLL</span><ArrowDown className="w-3 h-3 animate-bounce" /></motion.div>
        </section>

        {/* 2. ABOUT SECTION */}
        <section id="about" ref={containerRef} className="relative w-full min-h-screen bg-[#0a0a0a] flex flex-col justify-center py-24 z-20">
          <TornEdge />
          <InfiniteMarquee />
          <div className="w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-20">

            {/* BIO TEXT (With your specific positioning) */}
            <div className="col-span-1 md:col-span-3 -mt-12 md:-mt-32">
              <p className="text-sm font-light leading-loose tracking-wide border-l border-white/20 pl-6 opacity-90">
                Hello, I’m Om. A Computer Science Engineering student who enjoys solving complex problems by building intelligent, data-driven systems using <strong className="text-white">Generative AI</strong> and <strong className="text-white">modern full-stack technologies.</strong>
              </p>
            </div>

            {/* IMAGE CONTAINER (Updated for Mobile Size) */}
            <div className="col-span-1 md:col-span-6 flex justify-center">
              {/* CHANGE IS HERE: max-w-[220px] for mobile, md:max-w-[350px] for desktop */}
              <div className="w-full max-w-[245px] md:max-w-[350px] aspect-[3/4] bg-neutral-900 rounded-lg overflow-hidden relative shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/dzxxtkn16/image/upload/v1768650926/profile-portfolio_iguynx.png"
                  alt="Om Gupta"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              </div>
            </div>

            {/* ROTATING BUTTON */}
            <div className="col-span-1 md:col-span-3 flex justify-end"><RotatingButton /></div>
          </div>
        </section>
        {/* 3. SKILLS SECTION */}
        <section id="skills" className="relative z-30 w-full bg-[#0a0a0a]">
           <SkillsPhysics />
        </section>

        {/* 4. PROJECTS SECTION */}
        <ProjectShowcase />
        
        {/* 5. CONTACT FOOTER */}
        <ContactSection />

      </div>
    </ReactLenis>
  );
}