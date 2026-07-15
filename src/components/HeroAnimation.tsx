import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Shield, Sparkles, Zap, Eye, RefreshCw } from 'lucide-react';

export default function HeroAnimation() {
  const [activeModelColor, setActiveModelColor] = useState<'cyan' | 'emerald' | 'amber'>('cyan');
  const [conversionRate, setConversionRate] = useState(1.2);
  const [interactiveRotate, setInteractiveRotate] = useState(0);

  // Auto increment conversion rate for interactive proof
  useEffect(() => {
    const interval = setInterval(() => {
      setConversionRate((prev) => {
        if (prev >= 4.8) {
          setTimeout(() => setConversionRate(1.2), 2000);
          return 4.8;
        }
        return parseFloat((prev + 0.1).toFixed(1));
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Soft continuous rotation for the custom "3D" object
  useEffect(() => {
    const rotInterval = setInterval(() => {
      setInteractiveRotate((prev) => (prev + 0.6) % 360);
    }, 16);
    return () => clearInterval(rotInterval);
  }, []);

  // Hover parallax movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="relative w-full h-[380px] sm:h-[450px] lg:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative ambient glowing behind the mockup */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[280px] h-[280px] rounded-full bg-emerald-500/[0.04] blur-[100px] animate-pulse" />
        <div className="w-[380px] h-[380px] rounded-full bg-teal-500/[0.02] blur-[120px] delay-1000 animate-pulse" />
      </div>

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[500px] border border-zinc-200 bg-white rounded-2xl overflow-hidden shadow-2xl shadow-zinc-200 flex flex-col"
      >
        {/* Minimal browser header */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 border-b border-zinc-200">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="px-3 py-0.5 rounded-md bg-zinc-100 text-[10px] text-zinc-600 font-mono border border-zinc-200 flex items-center gap-1">
            <Shield className="w-2.5 h-2.5 text-emerald-600" /> immersive-conversion.studio
          </div>
          <div className="w-5" />
        </div>

        {/* Browser Content */}
        <div className="flex-1 p-5 flex flex-col justify-between relative bg-gradient-to-b from-white to-zinc-50/50 select-none">

          {/* Tag & Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-600 font-bold">
                PROTOTYPE v3.4 [LIVE]
              </span>
            </div>

            {/* Interactive Model Color Picker */}
            <div className="flex items-center gap-1 bg-zinc-100 rounded-full p-1 border border-zinc-200">
              {(['cyan', 'emerald', 'amber'] as const).map((color) => (
                <button
                  key={color}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModelColor(color);
                  }}
                  className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-all ${
                    color === 'cyan' ? 'bg-cyan-400' : color === 'emerald' ? 'bg-emerald-400' : 'bg-amber-400'
                  } ${
                    activeModelColor === color ? 'ring-2 ring-zinc-950 scale-110' : 'opacity-40 hover:opacity-100'
                  }`}
                  aria-label={`Switch color to ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Core Interactive Walkthrough Simulation */}
          <div className="my-auto py-4 flex flex-col items-center justify-center relative">

            {/* 3D Wireframe Wire Object / Interactive Element */}
            <div className="relative w-44 h-44 flex items-center justify-center">

              {/* Outer rotating ring */}
              <div
                style={{ transform: `rotate(${interactiveRotate}deg)` }}
                className={`absolute inset-0 rounded-full border border-dashed opacity-25 transition-colors duration-500 ${
                  activeModelColor === 'cyan' ? 'border-cyan-500' : activeModelColor === 'emerald' ? 'border-emerald-500' : 'border-amber-500'
                }`}
              />

              {/* Secondary rotating ring reversed */}
              <div
                style={{ transform: `rotate(${-interactiveRotate * 1.5}deg)` }}
                className={`absolute inset-4 rounded-full border border-double opacity-25 transition-colors duration-500 ${
                  activeModelColor === 'cyan' ? 'border-cyan-400' : activeModelColor === 'emerald' ? 'border-emerald-400' : 'border-amber-400'
                }`}
              />

              {/* Central 3D Object Render */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{ rotateY: interactiveRotate * 2 }}
                className={`w-24 h-24 rounded-2xl flex items-center justify-center border shadow-xl transition-all duration-700 ${
                  activeModelColor === 'cyan'
                    ? 'border-cyan-200 bg-cyan-50 shadow-cyan-100 text-cyan-600'
                    : activeModelColor === 'emerald'
                    ? 'border-emerald-200 bg-emerald-50 shadow-emerald-100 text-emerald-600'
                    : 'border-amber-200 bg-amber-50 shadow-amber-100 text-amber-600'
                }`}
              >
                <div className="absolute inset-0 rounded-2xl bg-radial-gradient opacity-10" />
                <Sparkles className="w-10 h-10 animate-pulse" />
              </motion.div>

              {/* Floating feature labels */}
              <div className="absolute top-2 -right-8 bg-white/90 border border-zinc-200 rounded px-2 py-1 text-[9px] font-mono text-zinc-600 shadow-sm">
                3D WebGL Content
              </div>
              <div className="absolute bottom-6 -left-10 bg-white/90 border border-zinc-200 rounded px-2 py-1 text-[9px] font-mono text-zinc-600 shadow-sm">
                Instant Interaction
              </div>
            </div>

            {/* Live conversion meter overlay */}
            <div className="absolute bottom-0 right-4 bg-white border border-zinc-200 rounded-lg p-2.5 shadow-lg flex items-center gap-2.5 max-w-[150px]">
              <div className="p-1 rounded bg-emerald-50 text-emerald-600">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-wider text-zinc-400 font-bold">CONVERSION RATE</span>
                <span className="text-xs font-mono font-bold text-zinc-950 transition-all">
                  {conversionRate}%
                </span>
                <span className="text-[7px] text-emerald-600 block font-semibold">+400% boost</span>
              </div>
            </div>
          </div>

          {/* Call to action footer section */}
          <div className="border-t border-zinc-100 pt-3 mt-2 flex items-center justify-between text-zinc-400 text-[10px] font-mono">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-zinc-500" /> Hover to rotate perspective
            </span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold animate-pulse">
              <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} /> Fast-sync 60fps
            </span>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
