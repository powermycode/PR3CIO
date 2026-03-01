'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { 
  Music, 
  Sparkles, 
  Rocket, 
  Play, 
  Instagram, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Disc3,
  Search,
  Zap,
  Layout,
  BarChart3
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const SectionHeading = ({ title, subtitle, centered = true }: { title: string; subtitle?: string; centered?: boolean }) => (
  <motion.div 
    {...fadeInUp}
    className={`${centered ? 'text-center' : 'text-left'} mb-24 max-w-4xl ${centered ? 'mx-auto' : ''} px-6`}
  >
    {subtitle && (
      <span className="text-accent font-black uppercase tracking-[0.5em] text-xs mb-6 block">
        {subtitle}
      </span>
    )}
    <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 uppercase italic">
      {title}
    </h2>
  </motion.div>
);

export default function InvestorsPage() {
  const { scrollYProgress } = useScroll();
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

  return (
    <div className="bg-[#050505] text-white selection:bg-accent/30 selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* SECTION 1 — CINEMATIC HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/10 rounded-full blur-[200px] animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#3b0764,transparent_50%)]" />
          <div className="absolute inset-0 bg-background/20" />
        </div>

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-6xl"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-[160px] font-black tracking-tighter leading-[0.85] mb-12 uppercase italic bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
          >
            The Future <br />of Indie Music
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl md:text-3xl font-medium text-gray-400 mb-12 max-w-3xl mx-auto leading-tight"
          >
            PR3CIO is building the first AI-powered platform where artists create, launch, and earn from original music.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <Link href="/explore" className="px-12 py-6 bg-white text-black text-xl font-black uppercase rounded-full hover:scale-105 transition-all shadow-2xl shadow-white/5 italic">
              Explore Artists
            </Link>
            <button 
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="px-12 py-6 bg-white/5 border border-white/10 text-white text-xl font-black uppercase rounded-full hover:bg-white/10 transition-all italic backdrop-blur-xl"
            >
              View Growth Strategy
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Particles Mockup */}
        <div className="absolute inset-0 pointer-events-none z-5 opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%", 
                opacity: Math.random() 
              }}
              animate={{ 
                y: [null, "-20%", "120%"],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 10 + Math.random() * 10, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 10
              }}
            />
          ))}
        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM */}
      <section className="py-40 px-6 max-w-7xl mx-auto border-t border-white/5">
        <SectionHeading 
          subtitle="The Barrier"
          title="Indie Artists Have No Launch Platform"
        />

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {[
            { icon: Search, title: "Relying on Covers", desc: "Most artists stay hidden behind other people's hits because they lack original content." },
            { icon: Zap, title: "No Creation Tools", desc: "Traditional production is expensive and slow. PR3CIO removes the friction of high-cost studios." },
            { icon: Users, title: "No Direct Path", desc: "Artists are at the mercy of opaque algorithms. We build direct bridges to fans." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              className="p-12 rounded-[48px] bg-white/[0.03] border border-white/10 hover:border-accent/50 transition-colors group flex flex-col justify-between h-[450px]"
            >
              <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500">
                <item.icon size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-black uppercase italic mb-6 leading-none">{item.title}</h3>
                <p className="text-xl text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 3 — PR3CIO SOLUTION */}
      <section className="py-40 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            subtitle="The System"
            title="PR3CIO Solves the Music Creation Problem"
          />

          <div className="space-y-12">
            {[
              { 
                title: "AI Music Studio", 
                desc: "Artists generate lyrics, beats and instrumentals instantly. Our engine owns the full creative cycle.",
                icon: Sparkles,
                image: "/images/hero-ai-music.png",
                tag: "Creative"
              },
              { 
                title: "Artist Launch Pages", 
                desc: "Each artist gets a bespoke marketing page designed to convert casual listeners into dedicated fans.",
                icon: Layout,
                image: "/artists/RicoMilanoPr3cio.png",
                tag: "Conversion"
              },
              { 
                title: "Streaming Platform", 
                desc: "A premium discovery-first player. Fans discover talent and every stream drives real artist revenue.",
                icon: Disc3,
                image: "/artists/ArtizzPr3cio.png",
                tag: "Monetization"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 p-12 md:p-20 rounded-[64px] bg-white/[0.03] border border-white/10`}
              >
                <div className="flex-1 space-y-8">
                  <span className="text-accent font-bold uppercase tracking-widest text-sm">{item.tag}</span>
                  <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9]">
                    {item.title}
                  </h3>
                  <p className="text-2xl text-gray-400 font-medium leading-tight">
                    {item.desc}
                  </p>
                </div>
                <div className="flex-1 w-full aspect-square md:aspect-[4/3] rounded-[40px] bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/5 relative overflow-hidden group">
                  <item.icon size={120} className="text-white/20 opacity-50 blur-sm absolute group-hover:scale-110 transition-transform duration-700" />
                  <div className="relative z-10 w-full h-full p-4">
                    <div className="w-full h-full bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative group">
                       <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                       />
                       <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-blue-500/10 opacity-60 group-hover:opacity-30 transition-opacity" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — FEATURED ARTISTS */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <SectionHeading 
          subtitle="Talent"
          title="Sponsored Artist Spotlight"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Rico Milano", genre: "Hip Hop", listeners: "283K", img: "/artists/rico-milano.png" },
            { name: "Artizz", genre: "Hip Hop", listeners: "413K", img: "/artists/artizz.png" },
            { name: "Lesj", genre: "Hip Hop", listeners: "269K", img: "/artists/lesj.png" }
          ].map((artist, i) => (
            <motion.div
              key={artist.name}
              {...fadeInUp}
              transition={{ delay: i * 0.1, duration: 1 }}
              whileHover={{ rotateY: i % 2 === 0 ? 5 : -5, y: -20, scale: 1.02 }}
              style={{ perspective: 1000 }}
              className="group relative aspect-[3/4] rounded-[48px] overflow-hidden bg-white/5 border border-white/10"
            >
              <Link href={`/${artist.name.toLowerCase().replace(' ', '-')}`} className="absolute inset-0 z-20">
                <span className="sr-only">View {artist.name}</span>
              </Link>
              <img 
                src={artist.img} 
                alt={artist.name}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-12 pointer-events-none">
                <span className="text-accent font-black text-xs tracking-[0.3em] uppercase mb-4 block">{artist.genre}</span>
                <h3 className="text-4xl font-black mb-2 italic uppercase tracking-tighter">{artist.name}</h3>
                <p className="text-gray-400 text-lg font-bold mb-8 flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  {artist.listeners} monthly listeners
                </p>
                <div 
                  className="w-full py-5 bg-white text-black rounded-full text-center font-black text-sm uppercase tracking-widest group-hover:bg-accent group-hover:text-white transition-all block italic pointer-events-auto relative z-30"
                >
                  View Artist
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — INSTAGRAM TALENT FUNNEL */}
      <section className="py-40 bg-accent text-black overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading 
            subtitle="Acquisition"
            title="Artist Acquisition Engine"
            centered={false}
          />

          <div className="relative mt-20">
            {/* Horizontal Line with Glow */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black/10 hidden md:block -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {[
                { icon: Instagram, title: "Discover", desc: "Find cover artists on Instagram" },
                { icon: Rocket, title: "Invite", desc: "Offer them an original path" },
                { icon: Sparkles, title: "Generate", desc: "Create original music instantly" },
                { icon: Play, title: "Launch", desc: "Upload and promote original songs" },
                { icon: TrendingUp, title: "Promote", desc: "Platform-driven marketing" }
              ].map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  className="bg-white/10 backdrop-blur-xl border border-black/5 p-8 rounded-[32px] md:rounded-[40px] text-center group h-full flex flex-col items-center justify-between"
                >
                  <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <step.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black uppercase italic mb-4">{i + 1}. {step.title}</h4>
                    <p className="font-bold text-black/60 leading-tight">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Large background text */}
        <div className="absolute -bottom-10 -right-10 text-[300px] font-black italic text-black/5 leading-none pointer-events-none select-none">
          FUNNEL
        </div>
      </section>

      {/* SECTION 6 — ARTIST MARKETING PAGES */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp}>
            <span className="text-accent font-black uppercase tracking-[0.5em] text-xs mb-6 block">Exposure</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 uppercase italic">
              Every Artist <br />Gets a <br />Launch Page.
            </h2>
            <p className="text-2xl text-gray-500 font-medium mb-12 max-w-xl">
              Engineered for high-conversion marketing. Our pages turn Instagram traffic into loyal platform fans.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                "Instagram Traffic",
                "Fan Conversion",
                "Track Preview",
                "Direct Follows"
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 font-black uppercase text-sm italic tracking-widest">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  {feature}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/[0.03] border border-white/10 rounded-[64px] p-4 shadow-2xl relative"
          >
            {/* Mock Landing Page UI */}
            <div className="aspect-[3/4] md:aspect-square bg-[#0B0B0F] rounded-[48px] overflow-hidden relative shadow-2xl">
              <img 
                src="/artists/LesjPr3cio.png" 
                alt="Lesj" 
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-10 left-10 flex items-center gap-2">
                 <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <img src="/logo.webp" className="w-6 h-6 object-contain" />
                 </div>
                 <span className="font-black italic uppercase tracking-widest text-xs">PR3CIO</span>
              </div>
              <div className="absolute bottom-12 left-12 right-12 space-y-4">
                 <div className="w-20 h-1 bg-accent rounded-full" />
                 <h4 className="text-5xl font-black uppercase italic tracking-tighter">LESJ</h4>
                 <div className="flex gap-4">
                    <div className="px-6 py-3 bg-white text-black rounded-full font-black text-xs uppercase italic">Follow</div>
                    <div className="px-6 py-3 bg-white/10 border border-white/20 rounded-full font-black text-xs uppercase italic">Share</div>
                 </div>
              </div>
            </div>
            {/* Stats Overlay */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -right-10 p-8 bg-surface border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl hidden md:block"
            >
              <div className="text-4xl font-black italic text-accent">+42%</div>
              <div className="font-bold text-xs uppercase tracking-widest text-gray-500">Conversion Rate</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7 — FUTURE PLAYER */}
      <section className="py-40 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            subtitle="V2.0"
            title="PR3CIO Streaming Player"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Music Player", icon: Music, color: "bg-accent/10 text-accent" },
              { title: "Smart Playlist", icon: Disc3, color: "bg-blue-500/10 text-blue-500" },
              { title: "Discover Feed", icon: Search, color: "bg-purple-500/10 text-purple-500" },
              { title: "Artist Analytics", icon: BarChart3, color: "bg-pink-500/10 text-pink-500" }
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[48px] bg-card border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between h-[300px]"
              >
                <div className={`w-16 h-16 rounded-3xl ${item.color} flex items-center justify-center`}>
                  <item.icon size={32} />
                </div>
                <h4 className="text-2xl font-black uppercase italic">{item.title}</h4>
              </motion.div>
            ))}
          </div>

          <motion.div 
            {...fadeInUp}
            className="mt-20 p-12 bg-white/[0.03] border border-white/10 rounded-[64px] text-center"
          >
            <p className="text-2xl md:text-4xl font-bold text-gray-400 max-w-4xl mx-auto leading-tight italic">
              &quot;Future versions will track real-time listener engagement and automate stream revenue payouts to artists.&quot;
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 8 — GROWTH LOOP */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <SectionHeading 
          subtitle="Flywheel"
          title="Self Reinforcing Music Ecosystem"
        />

        <div className="relative h-[600px] flex items-center justify-center">
          {/* Loop Animation Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="w-[500px] h-[500px] border border-accent/20 rounded-full border-dashed" 
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
               className="w-[700px] h-[700px] border border-white/5 rounded-full" 
             />
          </div>

          <div className="grid grid-cols-2 gap-20 relative z-10">
            {[
              { title: "Artists Create Music", pos: "top-left" },
              { title: "Fans Discover Songs", pos: "top-right" },
              { title: "Listeners Join Platform", pos: "bottom-right" },
              { title: "New Artists Join PR3CIO", pos: "bottom-left" }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="w-56 h-56 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] flex items-center justify-center text-center p-8 group hover:border-accent/50 transition-colors shadow-2xl"
              >
                <div className="space-y-4">
                  <ArrowRight className={`w-8 h-8 text-accent mx-auto ${i === 0 ? 'rotate-0' : i === 1 ? 'rotate-90' : i === 2 ? 'rotate-180' : '-rotate-90'}`} />
                  <h5 className="text-xl font-black uppercase italic tracking-tighter leading-none">{step.title}</h5>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Logo Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(139,92,246,0.5)] border-[8px] border-black">
             <img src="/logo.webp" alt="PR3CIO" className="w-16 h-16 object-contain" />
          </div>
        </div>
      </section>

      {/* SECTION 9 — PLATFORM VISION */}
      <section className="py-40 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            subtitle="The Goal"
            title="PR3CIO Becomes the Artist Operating System"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "AI Music Creation", desc: "Instantly bridging the gap from cover artist to original creator." },
              { title: "Artist Launch Platform", desc: "The essential infrastructure for the next generation of music superstars." },
              { title: "Global Discovery", desc: "Owning the listener experience and the streaming pipeline." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1, duration: 1 }}
                className="p-16 rounded-[56px] bg-white/[0.03] border border-white/10 relative overflow-hidden group h-[500px] flex flex-col justify-end"
              >
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-[80px] group-hover:bg-accent/20 transition-all duration-700" />
                <div className="relative z-10 space-y-8">
                  <h3 className="text-4xl font-black uppercase italic leading-[0.9]">{item.title}</h3>
                  <p className="text-xl text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — FINAL MOMENT */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#8b5cf610,transparent_70%)]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-6xl"
        >
          <h2 className="text-7xl md:text-[140px] font-black tracking-tighter leading-[0.8] mb-12 uppercase italic">
            The Next <br />Generation <br />of Music <br />Starts Here
          </h2>
          <p className="text-2xl md:text-3xl text-gray-400 font-medium mb-16 max-w-4xl mx-auto">
            PR3CIO empowers independent artists to create original music and reach global audiences.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link href="/signup" className="px-16 py-8 bg-accent text-white text-2xl font-black uppercase rounded-full hover:scale-110 transition-all shadow-[0_0_50px_rgba(139,92,246,0.3)] italic">
              Launch PR3CIO
            </Link>
            <Link href="/explore" className="px-16 py-8 bg-white/5 border border-white/10 text-white text-2xl font-black uppercase rounded-full hover:bg-white/10 transition-all italic backdrop-blur-xl">
              Explore Artists
            </Link>
          </div>
        </motion.div>

        {/* Closing Footer Text */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600 font-black text-xs uppercase tracking-[1em] whitespace-nowrap">
           PR3CIO Investor Presentation 2026
        </div>
      </section>

      {/* Global Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[200] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

    </div>
  );
}
