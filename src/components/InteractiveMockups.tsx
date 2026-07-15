import { useState } from 'react';
import { motion } from 'motion/react';
import { Car, Gem, Palmtree } from 'lucide-react';
// @ts-ignore
import carImage from '../assets/images/ferrari_3d_dealership_1784123405941.jpg';
// @ts-ignore
import perfumeImage from '../assets/images/sentia_perfume_1784123805572.jpg';
// @ts-ignore
import beachClubImage from '../assets/images/marsa_beach_club_1784124066341.jpg';

export default function InteractiveMockups() {
  // Mockup 1 State (Concessionnaire / Dealership)
  const [carColor, setCarColor] = useState<'carbon' | 'monaco' | 'alpine' | 'emerald'>('carbon');

  // Mockup 2 State (Luxe Immersive)
  const [luxuryFinish, setLuxuryFinish] = useState<'gold' | 'platinum'>('gold');

  // Mockup 3 State (Beach Club)
  const [beachTab, setBeachTab] = useState<'sunset' | 'lounge' | 'yacht'>('sunset');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">

      {/* MOCKUP 1: SITE CONCESSIONNAIRE 3D */}
      <div className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white overflow-hidden transition-all duration-500 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200">

        {/* Label and Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-zinc-950/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-zinc-800 text-[10px] font-mono tracking-wider uppercase text-zinc-300 shadow-lg">
          <Car className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          <span>Interactive 3D Dealership</span>
        </div>

        {/* Visual Preview Window */}
        <div className="relative h-[260px] bg-zinc-950 flex flex-col items-center justify-between p-4 border-b border-zinc-100 overflow-hidden">

          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(228,228,231,0.08)_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

          {/* Dynamic glowing background light beneath the car */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-12 blur-2xl rounded-full transition-colors duration-1000 ${
              carColor === 'carbon' ? 'bg-zinc-500/20' :
              carColor === 'monaco' ? 'bg-red-500/35' :
              carColor === 'alpine' ? 'bg-sky-500/35' :
              'bg-emerald-500/35'
            }`}
          />

          {/* Rendered 3D Ferrari Image */}
          <div className="relative w-full flex-1 flex items-center justify-center min-h-0 mt-4">
            <motion.img
              key={carColor}
              src={carImage}
              alt="3D Car Visualizer"
              referrerPolicy="no-referrer"
              initial={{ opacity: 0.7, scale: 0.92, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              className={`w-full h-full max-h-[170px] object-contain transition-all duration-700 ${
                carColor === 'carbon' ? 'grayscale brightness-90 contrast-110' :
                carColor === 'monaco' ? 'hue-rotate-0 saturate-[1.3]' :
                carColor === 'alpine' ? 'hue-rotate-[195deg] saturate-[1.3] brightness-110' :
                'hue-rotate-[95deg] saturate-[1.15]'
              }`}
            />
          </div>

          {/* Interactivity tools inside mockup */}
          <div className="w-full flex justify-between items-center z-10 pt-2 border-t border-zinc-900/40">
            <span className="text-[9px] font-mono text-zinc-500 tracking-wider">3D ACTIVE CUSTOMIZER</span>

            <div className="flex gap-1.5 bg-zinc-900/95 p-1 rounded-full border border-zinc-800 backdrop-blur-md">
              {(['carbon', 'monaco', 'alpine', 'emerald'] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => setCarColor(color)}
                  className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-all border ${
                    color === 'carbon' ? 'bg-zinc-400 border-zinc-500' :
                    color === 'monaco' ? 'bg-red-600 border-red-500' :
                    color === 'alpine' ? 'bg-sky-400 border-sky-300' : 'bg-emerald-600 border-emerald-500'
                  } ${
                    carColor === color ? 'scale-125 ring-2 ring-emerald-500 ring-offset-1 ring-offset-zinc-900' : 'hover:scale-110'
                  }`}
                  aria-label={`Select ${color}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Small label at bottom */}
        <div className="p-4 bg-zinc-50 flex justify-between items-center mt-auto">
          <div>
            <h4 className="text-sm font-bold font-display text-zinc-950">Your Showroom. Their First Test Drive.</h4>
            <span className="text-[10px] text-zinc-500 font-mono">Custom 3D model with zero loading delay</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] bg-red-50 text-red-700 font-mono font-semibold px-2 py-0.5 rounded border border-red-100 uppercase tracking-wider">
              Obsidienne
            </span>
          </div>
        </div>
      </div>


      {/* MOCKUP 2: SITE LUXE IMMERSIF (SENTIA PERFUME) */}
      <div className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white overflow-hidden transition-all duration-500 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200">

        {/* Label and Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-zinc-950/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-zinc-800 text-[10px] font-mono tracking-wider uppercase text-zinc-300 shadow-lg">
          <Gem className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Luxury Immersive Experience</span>
        </div>

        {/* Visual Preview Window */}
        <div className="relative h-[260px] bg-zinc-950 flex flex-col justify-between p-4 border-b border-zinc-100 overflow-hidden">

          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(228,228,231,0.04)_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

          {/* Premium brand header inside mockup */}
          <div className="w-full flex justify-between items-center z-10 text-[9px] font-serif tracking-[0.25em] text-amber-100/90 border-b border-zinc-800/40 pb-1.5">
            <span>S E N T I A</span>
            <div className="flex gap-2 text-[7px] font-sans tracking-widest text-zinc-500">
              <span>LA MAISON</span>
              <span>LES ICÔNES</span>
              <span>LA COLLECTION</span>
            </div>
          </div>

          {/* Perfume Visualizer */}
          <div className="relative w-full flex-1 flex items-center justify-center min-h-0 py-2">

            {/* Dynamic ambient back-glow */}
            <motion.div
              animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.1, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute w-36 h-36 blur-3xl rounded-full transition-colors duration-1000 ${
                luxuryFinish === 'gold' ? 'bg-amber-600/30' : 'bg-rose-500/20'
              }`}
            />

            {/* Rendered Perfume Image */}
            <motion.img
              key={luxuryFinish}
              src={perfumeImage}
              alt="Sentia Luxury Perfume"
              referrerPolicy="no-referrer"
              initial={{ opacity: 0.8, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 90, damping: 14 }}
              className={`w-full h-full max-h-[175px] object-contain rounded-lg transition-all duration-700 ${
                luxuryFinish === 'gold' ? 'brightness-110 contrast-105 saturate-[1.05]' : 'hue-rotate-[130deg] brightness-105 saturate-[1.1]'
              }`}
            />
          </div>

          {/* Micro controls inside the mockup */}
          <div className="w-full flex justify-between items-center z-10 pt-2 border-t border-zinc-900/40">
            <span className="text-[8px] font-mono text-zinc-500 tracking-wider">FRAGRANCE ESSENCE</span>

            <div className="flex gap-2 bg-zinc-900/90 px-2 py-1 rounded-full border border-zinc-800 backdrop-blur-md">
              <button
                onClick={() => setLuxuryFinish('gold')}
                className={`text-[8px] font-bold tracking-widest cursor-pointer uppercase transition-colors ${
                  luxuryFinish === 'gold' ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                GOLD
              </button>
              <div className="w-[1px] h-2.5 bg-zinc-800 self-center" />
              <button
                onClick={() => setLuxuryFinish('platinum')}
                className={`text-[8px] font-bold tracking-widest cursor-pointer uppercase transition-colors ${
                  luxuryFinish === 'platinum' ? 'text-rose-400' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                AMETHYST
              </button>
            </div>
          </div>

        </div>

        {/* Small label at bottom */}
        <div className="p-4 bg-zinc-50 flex justify-between items-center mt-auto">
          <div>
            <h4 className="text-sm font-bold font-display text-zinc-950">SENTIA Luxury Experience</h4>
            <span className="text-[10px] text-zinc-500 font-mono">Premium typography & fluid visualizer</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] bg-amber-50 text-amber-800 font-mono font-semibold px-2 py-0.5 rounded border border-amber-100 uppercase tracking-wider">
              Sentia
            </span>
          </div>
        </div>
      </div>


      {/* MOCKUP 3: BEACH CLUB EXPERIENCES (MARSA) */}
      <div className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white overflow-hidden transition-all duration-500 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200">

        {/* Label and Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-zinc-950/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-zinc-800 text-[10px] font-mono tracking-wider uppercase text-zinc-300 shadow-lg">
          <Palmtree className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Beach Club Immersive</span>
        </div>

        {/* Visual Preview Window */}
        <div className="relative h-[260px] bg-zinc-950 flex flex-col justify-between p-4 border-b border-zinc-100 overflow-hidden">

          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(228,228,231,0.04)_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

          {/* Premium brand header inside mockup */}
          <div className="w-full flex justify-between items-center z-10 text-[9px] font-serif tracking-[0.25em] text-amber-100/90 border-b border-zinc-800/40 pb-1.5">
            <span>M A R S A</span>
            <div className="flex gap-2 text-[7px] font-sans tracking-widest text-zinc-500">
              <span>LE CLUB</span>
              <span>ACTIVITÉS</span>
              <span>GALERIE</span>
            </div>
          </div>

          {/* Beach Club Visualizer */}
          <div className="relative w-full flex-1 flex items-center justify-center min-h-0 py-2">

            {/* Dynamic ambient back-glow */}
            <motion.div
              animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.15, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute w-36 h-36 blur-3xl rounded-full transition-colors duration-1000 ${
                beachTab === 'sunset' ? 'bg-orange-500/20' :
                beachTab === 'lounge' ? 'bg-sky-500/20' :
                'bg-emerald-500/15'
              }`}
            />

            {/* Rendered Beach Club Image */}
            <motion.img
              key={beachTab}
              src={beachClubImage}
              alt="Marsa Beach Club"
              referrerPolicy="no-referrer"
              initial={{ opacity: 0.8, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 90, damping: 14 }}
              className={`w-full h-full max-h-[175px] object-cover rounded-lg transition-all duration-700 ${
                beachTab === 'sunset' ? 'brightness-110 saturate-[1.05]' :
                beachTab === 'lounge' ? 'hue-rotate-15 saturate-[0.85] brightness-125' :
                'hue-rotate-[190deg] brightness-110 contrast-110'
              }`}
            />

            {/* Floating elegant text on top of the image */}
            <div className="absolute inset-x-0 bottom-2 flex flex-col justify-end p-3 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-lg">
              <span className="text-[10px] font-serif text-white tracking-widest uppercase">
                {beachTab === 'sunset' ? "L'Océan Comme Art De Vivre" :
                 beachTab === 'lounge' ? 'Les Cabanas Privées' :
                 'Yacht & Club Nautique'}
              </span>
              <span className="text-[7px] text-amber-200/80 uppercase font-mono tracking-wider mt-0.5">
                Casablanca, Maroc
              </span>
            </div>
          </div>

          {/* Micro controls inside the mockup */}
          <div className="w-full flex justify-between items-center z-10 pt-2 border-t border-zinc-900/40">
            <span className="text-[8px] font-mono text-zinc-500 tracking-wider">SELECT VIEW</span>

            <div className="flex gap-2 bg-zinc-900/90 px-2 py-1 rounded-full border border-zinc-800 backdrop-blur-md">
              <button
                onClick={() => setBeachTab('sunset')}
                className={`text-[8px] font-bold tracking-widest cursor-pointer uppercase transition-colors ${
                  beachTab === 'sunset' ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                SUNSET
              </button>
              <div className="w-[1px] h-2.5 bg-zinc-800 self-center" />
              <button
                onClick={() => setBeachTab('lounge')}
                className={`text-[8px] font-bold tracking-widest cursor-pointer uppercase transition-colors ${
                  beachTab === 'lounge' ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                CABANAS
              </button>
              <div className="w-[1px] h-2.5 bg-zinc-800 self-center" />
              <button
                onClick={() => setBeachTab('yacht')}
                className={`text-[8px] font-bold tracking-widest cursor-pointer uppercase transition-colors ${
                  beachTab === 'yacht' ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                NAUTIQUE
              </button>
            </div>
          </div>

        </div>

        {/* Small label at bottom */}
        <div className="p-4 bg-zinc-50 flex justify-between items-center mt-auto">
          <div>
            <h4 className="text-sm font-bold font-display text-zinc-950">MARSA Beach Club Experience</h4>
            <span className="text-[10px] text-zinc-500 font-mono">Premium resort brand showcase</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] bg-amber-50 text-amber-800 font-mono font-semibold px-2 py-0.5 rounded border border-amber-100 uppercase tracking-wider">
              Marsa
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
