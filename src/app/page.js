"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowDown, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { ReactLenis } from "@studio-freight/react-lenis";
import Matter from "matter-js";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float, Html } from "@react-three/drei";
import * as THREE from "three";

// --- 1. DATA: PROJECTS ---
const projects = [
  {
    id: 1,
    title: "Enterprise AI Agent System",
    category: "AI Architecture",
    stack: ["Python", "LangChain", "ChromaDB", "Docker", "RAG"],
    color: "#3b82f6",
    description: "A scalable RAG system for enterprise data retrieval.",
  },
  {
    id: 2,
    title: "Moonz Nail Store",
    category: "E-Commerce",
    stack: ["React", "Firebase", "Firestore", "Vercel"],
    color: "#ec4899",
    description: "Full-stack booking & e-commerce platform for a beauty brand.",
  },
  {
    id: 3,
    title: "AI PDF Query System",
    category: "SaaS Tool",
    stack: ["Python", "LangChain", "Streamlit", "Vector Search"],
    color: "#f97316",
    description: "Intelligent document analysis tool using vector embeddings.",
  },
  {
    id: 4,
    title: "AI Chatbot Mobile App",
    category: "Mobile Dev",
    stack: ["React Native", "LLM APIs", "AsyncStorage"],
    color: "#10b981",
    description: "Cross-platform mobile assistant with persistent local storage.",
  },
  {
    id: 5,
    title: "Financial Risk Model",
    category: "Data Science",
    stack: ["Python", "Scikit-learn", "Pandas", "ML"],
    color: "#ef4444",
    description: "Predictive modeling for assessing financial portfolio risks.",
  },
  {
    id: 6,
    title: "CSV AI Agent",
    category: "Analytics",
    stack: ["Python", "Streamlit", "Groq API", "Hugging Face"],
    color: "#8b5cf6",
    description: "RAG-based Q&A agent for instant CSV data analysis.",
  },
];

// --- 2. 3D COMPONENTS (Laptop) ---
const LaptopModel = ({ activeProject }) => {
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
};

// --- KEY COMPONENT: PROJECT SHOWCASE (RESPONSIVE FIX) ---
const ProjectShowcase = () => {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <section id="projects" className="relative w-full bg-[#0a0a0a] text-white py-12 lg:py-32">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* 1. 3D SCENE (Sticky Header) */}
        {/* RESPONSIVE LOGIC:
            - Mobile (< 768px): h-[45vh], Sticky Top.
            - Tablet (768px - 1024px): h-[50vh], Sticky Top. (Added md:h-[50vh])
            - Desktop (> 1024px): h-screen, Sticky Top, Side Layout.
        */}
        <div className="sticky top-0 h-[45vh] md:h-[50vh] w-full z-50 bg-[#0a0a0a] border-b border-white/5 lg:h-screen lg:border-none lg:bg-transparent lg:sticky lg:top-0 flex flex-col justify-center shadow-2xl lg:shadow-none">
           <div className="w-full h-full relative">
              {/* Adjusted camera position for better framing on tablets */}
              <Canvas camera={{ position: [0, 0, 13], fov: 30 }} dpr={[1, 2]}> 
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <Environment preset="city" />
                <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                  <LaptopModel activeProject={activeProject} />
                </Float>
              </Canvas>
           </div>
           
           {/* Fade Gradient: Visible on Mobile & Tablet, Hidden on Desktop */}
           <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent lg:hidden" />
        </div>

        {/* 2. PROJECT LIST */}
        <div 
          className="flex flex-col gap-24 lg:gap-32 pb-32 px-2 md:px-8 lg:px-6 z-0 relative"
          style={{ 
            maskImage: 'linear-gradient(to bottom, transparent 0px, black 100px, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 100px, black 100%)' 
          }}
        >
          
          {/* Spacer: Larger for tablets to clear the bigger header */}
          <div className="h-[12vh] md:h-[15vh] lg:hidden" />

          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              // Sync Fix: On Mobile/Tablet, trigger when card hits center-bottom. On Desktop, center.
              viewport={{ amount: 0.3, margin: "-20% 0px -10% 0px" }}
              
              transition={{ 
                duration: 0.6, 
                ease: "easeOut", 
                delay: index === 0 ? 0.4 : 0 
              }}
              
              onViewportEnter={() => setActiveProject(project)}
              // Card Size: Slightly taller on tablets (md:min-h-[45vh])
              className="min-h-[40vh] md:min-h-[45vh] lg:min-h-[50vh] flex flex-col justify-center border-l-2 border-white/10 pl-6 md:pl-10 lg:pl-12 relative group"
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
                <button className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest hover:text-white/80 transition-colors"><ExternalLink className="w-4 h-4" /> Live Demo</button>
                <button className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest hover:text-white/80 transition-colors"><Github className="w-4 h-4" /> Source Code</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 3. CUSTOM CURSOR ---
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(hover: none)").matches) return;

    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => setIsHovering(['A', 'BUTTON', 'CANVAS'].includes(e.target.tagName));
    
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16, scale: isHovering ? 2.5 : 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    />
  );
};

// --- 4. FLOATING NAVBAR ---
const FloatingNavbar = () => {
  const [activeTab, setActiveTab] = useState("Projects");
  const tabs = [{ name: "Projects", href: "#projects" }, { name: "About", href: "#about" }, { name: "Skills", href: "#skills" }];
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto max-w-[400px]">
      <div className="flex items-center justify-between p-1.5 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        {tabs.map((tab) => (
          <a key={tab.name} href={tab.href} onClick={() => setActiveTab(tab.name)} className="relative px-4 md:px-6 py-2.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-300 flex-1 text-center">
            {activeTab === tab.name && <motion.div layoutId="active-pill" className="absolute inset-0 bg-white/10 rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
            <span className="relative z-10">{tab.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

// --- 5. SKILLS PHYSICS (ALL DEVICES FIXED) ---
const SkillsPhysics = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const isMouseDownRef = useRef(false);

  const skills = [
    "Python", "SQL", "MongoDB", "AI Analytics", 
    "LLM Apps", "RAG Systems", "LangChain", 
    "LangGraph", "Streamlit", "Backend APIs", 
    "Data Pipelines", "Automation", "Git", "Deployment"
  ];

  useEffect(() => {
    if (!isInView || !containerRef.current || !canvasRef.current) return;

    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Events, Query, Composite, Vector, Body } = Matter;

    const engine = Engine.create();
    engine.world.gravity.y = 1; 
    engine.world.gravity.x = 0;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    // RESPONSIVE LOGIC: Treat iPad/Tablet (up to 1024px) as "Mobile" for physics sizing
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
        pixelRatio: window.devicePixelRatio,
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
      // SIZING: 
      // Mobile/Tablet: 40px-50px (Touch friendly)
      // Desktop: 48px-60px
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
    mouse.pixelRatio = window.devicePixelRatio; 
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
      {/* CONTAINER SIZING:
          - Mobile: 90% Width, 60vh Height
          - Tablet (md): 85% Width, 60vh Height
          - Desktop (lg): 70% Width, 450px Height
      */}
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
            Project Types<br />I Specialize In
          </h2>
        </div>
      </div>
    </div>
  );
};

// --- 6. UTILS ---
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
    <div className="absolute top-[20%] left-0 w-full overflow-hidden whitespace-nowrap z-0 pointer-events-none opacity-[0.06] select-none">
      <motion.div className="inline-block" animate={{ x: [0, -1200] }} transition={{ repeat: Infinity, ease: "linear", duration: 35 }}>
        <span className="text-[20vw] font-black uppercase leading-none tracking-[-0.05em] text-white">OM KUMAR — AI ENGINEER — OM KUMAR — AI ENGINEER — OM KUMAR — AI ENGINEER —</span>
      </motion.div>
    </div>
  );
}

function RotatingButton() {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center cursor-pointer group">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }} className="absolute inset-0 w-full h-full rounded-full border border-white/20">
        <svg viewBox="0 0 100 100" className="w-full h-full p-2">
          <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
          <text className="text-[9px] font-bold uppercase fill-white tracking-[0.25em]"><textPath href="#circlePath" startOffset="0%">LEARN MORE — LEARN MORE —</textPath></text>
        </svg>
      </motion.div>
      <div className="bg-white text-[#0a0a0a] rounded-full p-4 group-hover:bg-neutral-200 transition-colors duration-300"><ArrowUpRight className="w-8 h-8" /></div>
    </motion.div>
  );
}

// --- 7. MAIN PAGE LAYOUT ---
export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textReveal = { hidden: { y: 120, opacity: 0 }, visible: (i) => ({ y: 0, opacity: 1, transition: { delay: 0.2 + i * 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] } }) };

  return (
    <ReactLenis root>
      <div className="relative bg-[#0a0a0a] text-white font-sans selection:bg-white selection:text-black cursor-none">
        <CustomCursor />
        <FloatingNavbar />
        <NoiseOverlay />

        {/* 1. HERO SECTION */}
        <section className="min-h-screen relative flex flex-col justify-center px-6 md:px-12 pt-24 z-10">
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-y-4">
            <div className="col-span-12 md:col-span-8 flex flex-col items-start leading-[0.85]">
              <div className="overflow-hidden"><motion.h1 custom={0} initial="hidden" animate="visible" variants={textReveal} className="text-[12vw] md:text-[13vw] font-black tracking-[-0.04em] uppercase">MULTI-</motion.h1></div>
              <div className="overflow-hidden"><motion.h1 custom={1} initial="hidden" animate="visible" variants={textReveal} className="text-[12vw] md:text-[13vw] font-black tracking-[-0.04em] uppercase">DISCIPLINARY</motion.h1></div>
              <div className="overflow-hidden"><motion.h1 custom={2} initial="hidden" animate="visible" variants={textReveal} className="text-[12vw] md:text-[13vw] font-black tracking-[-0.04em] uppercase">ENGINEER</motion.h1></div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="col-span-12 md:col-span-4 flex md:justify-end md:items-start mt-4 md:mt-2">
              <p className="text-sm font-light leading-relaxed max-w-xs text-left md:text-right opacity-70">Creative thinking and problem solving are where my mind wanders. Using my knowledge and passion for design as my medium.</p>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.5 }} className="absolute bottom-12 left-6 md:left-12 flex items-center gap-3 text-xs tracking-widest"><span>SCROLL</span><ArrowDown className="w-3 h-3 animate-bounce" /></motion.div>
        </section>

        {/* 2. ABOUT SECTION */}
        <section id="about" ref={containerRef} className="relative w-full min-h-screen bg-[#0a0a0a] flex flex-col justify-center py-24 z-20">
          <TornEdge />
          <InfiniteMarquee />
          <div className="w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-20">
            <div className="col-span-1 md:col-span-3">
              <p className="text-sm font-light leading-loose tracking-wide border-l border-white/20 pl-6 opacity-90">Hello, I'm Om. A senior Engineering student specializing in <strong className="text-white">Intelligent Systems</strong> and <strong className="text-white">Full Stack Architecture.</strong></p>
            </div>
            <div className="col-span-1 md:col-span-6 flex justify-center">
              <motion.div style={{ y: imageY }} className="w-full max-w-[400px] aspect-[3/4] bg-neutral-900 rounded-lg overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6"><span className="text-[10px] font-mono bg-black/50 px-2 py-1 backdrop-blur-md text-white/70">IMG_PROFILE.RAW</span></div>
              </motion.div>
            </div>
            <div className="col-span-1 md:col-span-3 flex justify-end"><RotatingButton /></div>
          </div>
        </section>

        {/* 3. SKILLS SECTION (FIXED PHYSICS) */}
        <section id="skills" className="relative z-30 w-full bg-[#0a0a0a]">
           <SkillsPhysics />
        </section>

        {/* 4. PROJECTS SECTION */}
        <ProjectShowcase />

      </div>
    </ReactLenis>
  );
}