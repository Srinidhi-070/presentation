/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  ChevronRight, 
  MoveRight, 
  Circle,
  Plus,
  Minus
} from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

const SlideNumber = ({ number }: { number: string }) => (
  <div className="absolute top-0 right-0 p-12 overflow-hidden pointer-events-none">
    <motion.span 
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="block text-[15vw] font-serif italic text-white opacity-5 select-none leading-none"
    >
      {number}
    </motion.span>
  </div>
);

const MetaLabel = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="w-1.5 h-1.5 bg-solar rounded-full" />
    <span className="mono-label">{children}</span>
  </div>
);

const ImageStrip = ({ images }: { images: string[] }) => (
  <div className="flex gap-4 overflow-hidden py-12 relative">
    <motion.div 
      animate={{ x: [0, -1000] }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="flex gap-4 shrink-0"
    >
      {[...images, ...images].map((img, i) => (
        <div key={i} className="w-[300px] h-[450px] bg-white/5 border slide-border overflow-hidden relative group cursor-pointer">
          <img src={img} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="mono-label text-[8px] text-solar">Visual Stream // Reference Index {i % images.length}</span>
          </div>
        </div>
      ))}
    </motion.div>
  </div>
);

const Section = ({ title, subtitle, number, children, className = "", id = "", images }: { title: string, subtitle?: string, number: string, children: ReactNode, className?: string, id?: string, images?: string[] }) => (
  <section id={id} className={`min-h-screen relative flex flex-col border-b slide-border overflow-hidden ${className}`}>
    <SlideNumber number={number} />
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 flex flex-col justify-center relative">
      <div className="mb-8 relative z-10">
        <MetaLabel className="mb-6">{subtitle || "Scientific Creative Core"}</MetaLabel>
        <motion.h2 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-serif italic tracking-tight"
        >
          {title}
        </motion.h2>
      </div>

      <div className="relative z-10">
        {children}
      </div>

      {images && (
        <div className="mt-12 relative z-0">
          <ImageStrip images={images} />
        </div>
      )}
    </div>
  </section>
);

const FeatureItem = ({ label, description, detail }: { label: string, description: string, detail?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-t slide-border">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full group py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-all px-4 cursor-pointer text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-4 h-4 flex items-center justify-center">
            {isOpen ? (
              <Minus className="text-solar w-4 h-4" />
            ) : (
              <Plus className="text-solar w-4 h-4 group-hover:rotate-90 transition-transform" />
            )}
          </div>
          <h4 className={`text-xl md:text-2xl font-serif italic transition-colors ${isOpen ? 'text-solar' : 'text-bone hover:text-solar'}`}>
            {label}
          </h4>
        </div>
        {!isOpen && (
          <p className="text-bone/40 max-w-md text-sm md:text-right italic font-serif">
            {description}
          </p>
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-12 pb-8 flex flex-col md:flex-row gap-8 items-start">
               <div className="flex-1 space-y-4">
                  <p className="text-bone/60 italic font-serif text-lg leading-relaxed">
                    {description}
                  </p>
                  <p className="text-bone/30 text-sm leading-relaxed max-w-2xl font-sans uppercase tracking-tight">
                    {detail || "Technical Architecture phase in implementation. Our neural backbone ensures temporal logic and high-fidelity output across all supported spatial environments."}
                  </p>
               </div>
               <div className="shrink-0 pt-2">
                  <div className="mono-label px-3 py-1 border slide-border text-[8px] opacity-40">Status: Operational</div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <div className="grain" />
      
      {/* Dynamic Cursor Spotlight */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-[60]"
        animate={{
          background: `radial-gradient(1200px at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.05), transparent 70%)`
        }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-8 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-8 pointer-events-auto mix-blend-difference">
          <div className="text-2xl font-serif italic tracking-tighter text-white">N° Atlas</div>
          <div className="hidden md:block w-px h-8 bg-white/20" />
          <div className="hidden md:block mono-label opacity-70 text-white">Nexus Phase 01</div>
        </div>
        <div className="pointer-events-auto mix-blend-difference">
          <button 
            onClick={() => alert('Accessing secure digital archive... [Unauthorized Checkpoints Detected]')}
            className="mono-label text-white hover:text-solar hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Digital Archive // 26
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen relative flex items-center px-6 lg:px-12 border-b slide-border overflow-hidden">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
          <div className="max-w-4xl">
            <MetaLabel className="mb-12">A Synthesis of Art & Neural Logic</MetaLabel>
            <motion.h1 
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[14vw] font-serif italic tracking-tighter leading-[0.7]"
            >
              Namaah <br/>
              <span className="text-solar pr-8">Atlas</span>
            </motion.h1>
          </div>
          <div className="pb-12 text-right">
            <div className="w-24 h-24 border border-solar/30 rounded-full flex items-center justify-center animate-spin-slow mb-8 ml-auto">
               <ArrowUpRight className="text-solar" size={32} />
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-xl md:text-2xl font-serif italic text-bone/50 leading-relaxed max-w-xs ml-auto"
            >
              The AI creative ecosystem. Unified, intelligent, and boundless.
            </motion.p>
          </div>
        </div>

        {/* Hero Content Container - Centered and Clean */}
        
        {/* Background Decorative */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] opacity-10 blur-[100px] pointer-events-none">
           <div className="w-full h-full bg-gradient-to-r from-deep to-solar rounded-full animate-pulse" />
        </div>
      </section>

      {/* Section 01: Core Vision */}
      <Section 
        number="01" 
        title="The Future of Media" 
        subtitle="The Big Idea"
        images={[
          "/images/creative/3d457541-e459-44c4-b92a-4aac3f238c86_1764974464601.webp",
          "/images/media/03577356-e084-432d-ae4e-0070976aaef9 (1).jpg",
          "/images/games/05-9.png"
        ]}
      >
        <div className="grid md:grid-cols-2 gap-24 items-start">
          <p className="text-3xl font-serif italic leading-relaxed text-bone/70">
            We are building a single platform where you can create everything—from videos and logos to 3D worlds—using AI.
          </p>
          <div className="space-y-8">
            <p className="text-sm text-bone/30 leading-relaxed tracking-wide">
              Namaah ATLAS unifies all creative tools into one simple ecosystem. No more jumping between apps. Just one space to bring your ideas to life.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => alert('Documentation bundle request queued for Nexus v1.0 release.')}
                className="px-10 py-5 bg-solar text-ink font-mono text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white active:scale-95 transition-all cursor-pointer"
              >
                Join the Waitlist
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 02: Media Studio */}
      <Section 
        number="02" 
        title="AI Media Studio" 
        subtitle="Space 01 // Movies & Video"
        images={[
          "/images/media/03577356-e084-432d-ae4e-0070976aaef9 (1).jpg",
          "/images/media/08c205c4-5d38-4fe5-ba6d-a932a698a64b.jpg",
          "/images/media/10862453-a958-4ef8-9838-05d900204972.jpg",
          "/images/media/16301c0f-fffd-47c3-bc5e-b846ae7b1559_converted.jpg",
          "/images/media/30637936-1d4c-43eb-809b-3add8e6abfe1.jpg"
        ]}
      >
        <div className="space-y-0">
          <FeatureItem 
            label="Neural Movies" 
            description="Create cinematic scenes from simple text prompts."
            detail="Our engine handles lighting and camera movement automatically, giving you professional video results in seconds."
          />
          <FeatureItem 
            label="Viral Clips" 
            description="Generate thumb-stopping social content for any brand."
            detail="Optimized for vertical and wide formats, perfect for modern storytelling platforms."
          />
          <FeatureItem 
            label="Smart Voiceover" 
            description="Realistic narration and sound effects synced to your video."
            detail="AI voices that sound human, combined with background audio that matches the mood of your scene."
          />
        </div>
      </Section>

      {/* Section 03: Design Studio */}
      <Section 
        number="03" 
        title="Creative Design Studio" 
        subtitle="Space 02 // Logos & Apparel"
        images={[
          "/images/creative/0d02f1ef-9be0-4a3c-b9bc-2d214c599054_1765006333771.webp",
          "/images/creative/0d56358c-d408-4d99-9dad-e3fe88980f6a_1764780443014.webp",
          "/images/creative/14d138fe-54fe-4a81-838a-8fc61d2033f6_1764780317365.webp",
          "/images/creative/26fe1adc-be6b-4c9c-9925-0b07cc6065d1_1764780098041.webp",
          "/images/creative/Kittl Flows - Streetwear Brand Builder - Cap Mockup 1.png"
        ]}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-4xl font-serif italic text-solar">Apparel & Branding.</h3>
            <p className="text-bone/40 max-w-md">Design anything from custom t-shirts and hoodies to high-end logos. Just type your idea and let the AI do the layout work.</p>
            <div className="flex flex-wrap gap-4">
               {["Shirt Mockups", "Logo Design", "Social Ads", "Brand Style"].map((tag, i) => (
                 <span key={i} className="mono-label border slide-border px-3 py-1 opacity-50">{tag}</span>
               ))}
            </div>
          </div>
          <div className="p-12 border slide-border bg-solar/[0.05] relative overflow-hidden group">
             <div className="relative z-10 italic font-serif text-xl">
                "Turn any idea into a physical product or a professional brand identity instantly."
             </div>
             <img src="/images/creative/Kittl Flows - Streetwear Brand Builder - T-shirt Mockup 1.png" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-30 transition-opacity" alt="" />
          </div>
        </div>
      </Section>

      {/* Section 04: Game Studio */}
      <Section 
        number="04" 
        title="AI Game Studio" 
        subtitle="Space 03 // Worlds & Assets"
        images={[
          "/images/games/05-9.png",
          "/images/games/19-4-qo5i0rfgwsfr66bzkv1kd7n3mcv0ibpudahdxy6gm8.png",
          "/images/games/31961634-65e273fab2317.jpg",
          "/images/games/3d-environments-img12.webp",
          "/images/games/Future-trends-of-assets-in-game-design-1024x576.jpg"
        ]}
      >
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="space-y-4">
             <h4 className="mono-label">World Gen</h4>
             <p className="font-serif italic text-lg text-bone/60">Build massive 3D landscapes and cities with a single prompt.</p>
          </div>
          <div className="space-y-4">
             <h4 className="mono-label">AI Characters</h4>
             <p className="font-serif italic text-lg text-bone/60">Create characters that talk and act naturally based on your story.</p>
          </div>
          <div className="space-y-4">
             <h4 className="mono-label">Fast Prototyping</h4>
             <p className="font-serif italic text-lg text-bone/60">Test game ideas instantly without writing complex code.</p>
          </div>
        </div>
      </Section>

      {/* Section 05: 3D Studio */}
      <Section 
        number="05" 
        title="AI 3D Creation" 
        subtitle="Space 04 // Interactive Form"
        images={[
          "/images/3d%20models/iloveimg-converted/019e1658-a6d9-777a-9a0e-0f24db8d6f12.jpg",
          "/images/3d%20models/iloveimg-converted/019e17c8-a8dc-7c60-a5ef-e81f626e9ef4.jpg",
          "/images/3d%20models/iloveimg-converted/019e19ad-0b18-7b36-b3e2-480471386492.jpg",
          "/images/3d%20models/iloveimg-converted/019e186c-4f89-7d97-93f3-022410375862.jpg",
          "/images/3d%20models/iloveimg-converted/019e1827-f434-7d91-abf6-1c0d84ae0ace.jpg"
        ]}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="max-w-xl">
             <p className="text-4xl font-serif italic leading-tight">Create 3D Models & Avatars instantly.</p>
             <p className="mt-6 text-bone/40">From character avatars for games to complex industrial models. Our AI handles the geometry while you focus on the vision.</p>
           </div>
                  {/* 3D INTERACTIVE COMPONENT - Elegant Neural Orbit */}
           <div className="relative w-80 h-80 group">
             {/* Neural Glow Background */}
             <div className="absolute inset-[-100px] bg-solar/5 blur-[100px] rounded-full scale-50 group-hover:scale-100 transition-transform duration-1000 opacity-20" />
             
             <motion.div 
               animate={{ 
                 x: (mousePos.x - window.innerWidth/2) / 40,
                 y: (mousePos.y - window.innerHeight/2) / 40
               }}
               transition={{ 
                 x: { type: 'spring', stiffness: 30, damping: 25 },
                 y: { type: 'spring', stiffness: 30, damping: 25 }
               }}
               className="w-full h-full relative flex items-center justify-center transform-style-3d overflow-visible"
             >
               {/* Central Core Point */}
               <motion.div
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className="w-2 h-2 bg-solar shadow-[0_0_20px_#38bdf8] rounded-full z-10"
               />

               {/* Concentric Orbital Rings */}
               {[0, 1, 2, 3].map((i) => (
                 <motion.div
                   key={i}
                   animate={{ 
                     rotateX: [0, 360],
                     rotateY: [0, 360],
                     rotateZ: [0, 360],
                   }}
                   transition={{ 
                     duration: 15 + (i * 5), 
                     repeat: Infinity, 
                     ease: "linear",
                     delay: i * 0.5 
                   }}
                   style={{ 
                     width: `${100 + (i * 50)}px`,
                     height: `${100 + (i * 50)}px`,
                   }}
                   className="absolute border-[0.5px] border-solar/30 rounded-full transform-style-3d pointer-events-none group-hover:border-solar/60 transition-colors duration-700 font-mono text-[6px] text-solar/20"
                 >
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-solar/40 rounded-full" />
                   <div className="absolute top-1/2 left-0 -translate-y-1/2 px-2">ORBIT_{i}</div>
                 </motion.div>
               ))}

               {/* Outer Pulsing Aura */}
               <motion.div
                 animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.1, 0.2, 0.1] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-[-40px] border border-solar/10 rounded-full pointer-events-none"
               />
             </motion.div>
           </div>
        </div>
      </Section>

      {/* Section 06: The Ecosystem */}
      <Section number="06" title="Why ATLAS?" subtitle="The Argument // Convergence">
        <div className="grid md:grid-cols-2 gap-12 text-bone/60 italic font-serif text-2xl">
          <p>The danger of current AI is fragmentation. Every tool is an island.</p>
          <p className="text-white">ATLAS is a continent. Where assets flow between spaces without friction.</p>
        </div>
        <div className="mt-24 grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
           {["Cross-Studio Sync", "Neural Identity", "Quantum Scalability"].map((feat, i) => (
             <div key={i} className="bg-ink p-12">
                <h4 className="text-solar mono-label mb-4">{feat}</h4>
                <p className="text-sm text-bone/40 italic">A singular data model ensures that what you create in Space A is natively understood by Space B.</p>
             </div>
           ))}
        </div>
      </Section>

      {/* Section 07: Roadmap */}
      <Section number="07" title="Rollout Plan" subtitle="Development // Phases">
        <div className="space-y-4">
          {[
            { phase: "01", status: "Active", label: "AI Media Studio (MVP Architecture)", date: "Current" },
            { phase: "02", status: "Queued", label: "Creative Design Neural Layer", date: "Q4 2026" },
            { phase: "03", status: "R&D", label: "3D Volumetric Mesh Synthesis", date: "2027" },
            { phase: "04", status: "Long Range", label: "Procedural World Generator", date: "2028" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-8 py-6 border-b slide-border group cursor-crosshair">
               <span className="mono-label text-solar/40 group-hover:text-solar transition-colors">{item.phase}</span>
               <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <span className="text-2xl font-serif italic">{item.label}</span>
                  <div className="flex items-center gap-4">
                     <span className="mono-label opacity-30">{item.status}</span>
                     <span className="mono-label text-solar">{item.date}</span>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Closing */}
      <section className="h-screen flex items-center justify-center text-center px-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="space-y-12"
        >
          <MetaLabel className="justify-center">Mission Directive 001</MetaLabel>
          <h2 className="text-[10vw] font-serif italic tracking-tighter leading-none">
            Namaah <br/> Atlas
          </h2>
          <p className="mono-label text-white/40 tracking-[0.5em]">The Future of AI-Powered Creative Production</p>
          <div className="pt-24 border-t slide-border">
             <button 
               onClick={() => alert('Access request submitted to Atlas Nexus.')}
               className="text-solar mono-label hover:tracking-[0.8em] active:scale-95 transition-all cursor-pointer"
             >
               Request Access for Partners
             </button>
          </div>
        </motion.div>
      </section>

      <footer className="p-12 border-t slide-border flex flex-col md:flex-row justify-between items-center gap-8 opacity-50">
         <span className="mono-label">© 2026 Namaah Labs</span>
         <div className="flex gap-12">
            <button className="mono-label hover:text-solar transition-colors cursor-pointer">Intelligence</button>
            <button className="mono-label hover:text-solar transition-colors cursor-pointer">Form</button>
            <button className="mono-label hover:text-solar transition-colors cursor-pointer">Synthesis</button>
         </div>
      </footer>
    </div>
  );
}
