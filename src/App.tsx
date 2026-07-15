import { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Check,
  Phone,
  Mail,
  Calendar,
  User,
  AlertTriangle,
  Zap,
  X,
  ArrowUpRight
} from 'lucide-react';
import BookingModal from './components/BookingModal';
import HeroAnimation from './components/HeroAnimation';
import InteractiveMockups from './components/InteractiveMockups';
import { Booking } from './types';

// Parse a "YYYY-MM-DD" key as a local date (avoids the UTC off-by-one
// that `new Date("YYYY-MM-DD")` introduces in negative-offset timezones).
const parseLocalDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
};

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  // Pull existing bookings if any
  useEffect(() => {
    const checkBookings = () => {
      const stored = localStorage.getItem('convers_bookings');
      if (stored) {
        try {
          setUserBookings(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      } else {
        setUserBookings([]);
      }
    };
    checkBookings();

    // React to updates from other tabs (`storage`) and from the booking
    // modal in this same tab (custom `convers_bookings_updated` event),
    // instead of polling on a wasteful interval.
    window.addEventListener('storage', checkBookings);
    window.addEventListener('convers_bookings_updated', checkBookings);
    return () => {
      window.removeEventListener('storage', checkBookings);
      window.removeEventListener('convers_bookings_updated', checkBookings);
    };
  }, []);

  const handleCancelBooking = (id: string) => {
    const updated = userBookings.filter(b => b.id !== id);
    localStorage.setItem('convers_bookings', JSON.stringify(updated));
    setUserBookings(updated);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-emerald-500 selection:text-white overflow-x-hidden">

      {/* 1. TOP HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-100 bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-black uppercase tracking-wider text-zinc-950">
              CONVERS<span className="text-emerald-500">.</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-600">
                Only 2 slots left for July 2026
              </span>
            </div>

            <a
              href="https://calendly.com/converswebsites/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-zinc-950 text-white hover:bg-emerald-500 transition-all cursor-pointer shadow-sm font-mono uppercase inline-flex items-center"
            >
              Book Call
            </a>
          </div>
        </div>
      </header>

      {/* 2. MAIN LANDING CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* 🟩 1. HERO SECTION */}
        <section id="hero" className="py-12 md:py-20 lg:py-24 border-b border-zinc-100 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* Left Text Column */}
          <div className="flex-1 space-y-6 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-600">
                Next-Gen Web Conversion
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-zinc-950 leading-tight">
              We build websites that <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600">make you more clients.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 font-light leading-relaxed">
              Immersive, 3D-powered websites designed to convert — not just look good.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href="https://calendly.com/converswebsites/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 rounded-xl font-bold bg-emerald-500 text-black hover:bg-emerald-400 transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 text-base inline-flex"
              >
                Book a Free Call
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Proof lines directly under button */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-6 text-zinc-600 text-xs font-mono font-semibold">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">✔</span> Built for modern businesses
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">✔</span> Designed to convert
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">✔</span> Fully custom
              </div>
            </div>
          </div>

          {/* Right Walkthrough / Visual Column */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <HeroAnimation />
          </div>
        </section>


        {/* 🟩 2. PROBLÈME SECTION */}
        <section id="problem" className="py-16 md:py-24 border-b border-zinc-100 relative">

          {/* Accent lighting */}
          <div className="absolute top-1/2 left-0 w-32 h-32 bg-red-500/[0.02] blur-[100px] rounded-full" />

          <div className="max-w-3xl mx-auto text-center space-y-8">
            <span className="text-[10px] font-mono tracking-widest uppercase text-red-600 font-semibold flex items-center justify-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> THE HARSH REALITY
            </span>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-zinc-950">
                Most business websites don’t convert.
              </h2>
              <p className="text-lg sm:text-xl text-zinc-600 font-light max-w-2xl mx-auto">
                They look okay… <span className="text-zinc-950 font-semibold">but they don’t bring clients.</span>
              </p>
            </div>

            {/* Punchy Problem Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50">
                <span className="block text-zinc-400 font-mono text-xs mb-1">01 / ATTENTION</span>
                <p className="text-sm font-bold text-zinc-900">No experience.</p>
              </div>
              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50">
                <span className="block text-zinc-400 font-mono text-xs mb-1">02 / VISIBILITY</span>
                <p className="text-sm font-bold text-zinc-900">No impact.</p>
              </div>
              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50">
                <span className="block text-zinc-400 font-mono text-xs mb-1">03 / CONVERSION</span>
                <p className="text-sm font-bold text-zinc-900">No results.</p>
              </div>
            </div>
          </div>
        </section>


        {/* 🟩 3. SOLUTION SECTION */}
        <section id="solution" className="py-16 md:py-24 border-b border-zinc-100 relative">

          {/* Accent lighting */}
          <div className="absolute top-1/2 right-0 w-32 h-32 bg-emerald-500/[0.02] blur-[100px] rounded-full" />

          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-600 font-semibold flex items-center justify-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> OUR PHILOSOPHY
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-zinc-950 leading-tight">
              We create websites that people <span className="text-emerald-600">actually remember.</span>
            </h2>

            <p className="text-lg sm:text-xl text-zinc-600 font-light max-w-2xl mx-auto pt-2">
              And more importantly… websites that <span className="text-emerald-600 font-semibold underline decoration-emerald-500/50 decoration-2 underline-offset-4">convert.</span>
            </p>
          </div>
        </section>


        {/* 🟩 4. VISUEL IMPACT SECTION */}
        <section id="work" className="py-16 md:py-24 border-b border-zinc-100">
          <div className="mb-10 text-center">
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 block mb-2">
              PROOF OF CRAFT
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-zinc-950">
              Interactive Prototypes
            </h2>
          </div>

          <InteractiveMockups />
        </section>


        {/* 🟩 5. OFFRE CLAIRE SECTION */}
        <section id="offer" className="py-16 md:py-24 border-b border-zinc-100 relative">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <div className="space-y-6 text-left">
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-600 font-semibold">
                THE SCOPE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-zinc-950">
                What you get
              </h2>
              <p className="text-zinc-600 font-light text-sm leading-relaxed">
                We design and engineer bespoke web systems engineered around single-action user paths. No generic packages, no bloated templates.
              </p>

              <div className="pt-2">
                <p className="text-emerald-600 font-semibold text-base font-display">
                  Built to make your business stand out instantly.
                </p>
              </div>
            </div>

            {/* List box styled with high-end border */}
            <div className="bg-zinc-50/50 border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">Custom high-end website</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Engineered from ground zero. Absolute brand alignment.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">Immersive scroll experience</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Captive user-retention paths with ultra-smooth layouts.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">3D integration (if needed)</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Interactive products that users can rotate and paint.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">Conversion-focused structure</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Strategic placement of triggers to double inbound pipelines.</p>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* 🟩 6. DIFFÉRENCIATION SECTION */}
        <section id="differentiation" className="py-16 md:py-24 border-b border-zinc-100 text-center">
          <div className="max-w-xl mx-auto space-y-6">
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 block">
              NOT ANOTHER AGENCY
            </span>

            {/* Three massive vertical punchlines */}
            <div className="py-4 space-y-2">
              <p className="text-3xl sm:text-4xl font-extrabold font-display text-zinc-300 line-through decoration-red-500/40 decoration-4">
                Not a template
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold font-display text-zinc-300 line-through decoration-red-500/40 decoration-4">
                Not basic
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold font-display text-zinc-300 line-through decoration-red-500/40 decoration-4">
                Not forgettable
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-100">
              <p className="text-xl sm:text-2xl font-black font-display text-zinc-950">
                This is not a website.
              </p>
              <p className="text-2xl sm:text-3xl font-black font-display text-emerald-600 mt-1">
                It’s a digital experience.
              </p>
            </div>
          </div>
        </section>


        {/* 🟩 7. URGENCE / DÉCLENCHEUR SECTION */}
        <section id="urgency" className="py-16 md:py-20 border-b border-zinc-100 relative">

          {/* Absolute glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.01] to-transparent pointer-events-none" />

          <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-mono font-bold uppercase">
              <AlertTriangle className="w-3 h-3 animate-bounce" /> High Demand Warning
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-display text-zinc-950">
              We only take a limited number of clients each month.
            </h3>

            <p className="text-sm sm:text-base text-zinc-600 font-light">
              If you want something different — <span className="text-zinc-950 font-semibold">now is the time.</span> We enforce this limit strictly to secure elite focus and immaculate engineering for each brand.
            </p>
          </div>
        </section>


        {/* 🟩 8. CTA FINAL SECTION */}
        <section id="cta" className="py-24 md:py-32 text-center relative">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]" />

          <div className="max-w-xl mx-auto space-y-8 relative z-10">
            <h2 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-zinc-950 leading-tight">
              Let’s build something that actually works.
            </h2>

            <div className="flex justify-center pt-2">
              <a
                href="https://calendly.com/converswebsites/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-5 rounded-2xl font-black bg-emerald-500 text-black hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/45 text-lg uppercase tracking-wider inline-flex"
              >
                Book a Free Call
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
              </a>
            </div>

            <p className="text-xs text-zinc-500 font-mono tracking-wider">
              No obligation • 15 minutes of pure strategy diagnostic • Zero template pitch
            </p>
          </div>
        </section>

      </main>

      {/* Real-time Session active booking notification badge */}
      {userBookings.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 max-w-sm w-full bg-white border border-emerald-500/50 rounded-xl p-4 shadow-2xl shadow-emerald-500/10 flex items-start gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 mt-0.5">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-zinc-950 flex items-center gap-1.5">
              <span>Your Session is Secured!</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </p>
            <p className="text-[10px] text-zinc-600 mt-0.5">
              Call scheduled for {parseLocalDate(userBookings[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {userBookings[0].timeSlot}.
            </p>
            <button
              onClick={() => handleCancelBooking(userBookings[0].id)}
              className="text-[9px] text-red-600 hover:text-red-500 font-mono font-bold uppercase mt-2 block transition-colors cursor-pointer"
            >
              Cancel Booking
            </button>
          </div>
          <button
            onClick={() => handleCancelBooking(userBookings[0].id)}
            className="text-zinc-400 hover:text-zinc-600 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 🟩 9. FOOTER MINIMAL */}
      <footer className="border-t border-zinc-100 bg-zinc-50 py-12 text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

          {/* Partners & Phone */}
          <div className="space-y-3">
            <span className="font-display text-sm font-bold tracking-wider text-zinc-950 uppercase">
              CONVERS<span className="text-emerald-500">.</span>
            </span>
            <div className="flex flex-col text-xs space-y-1">
              <span className="text-zinc-600 font-medium flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-zinc-400" /> Adam Arahou
              </span>
              <span className="text-zinc-600 font-medium flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-zinc-400" /> Zayd Ben Massaoud
              </span>
              <span className="text-zinc-600 font-medium flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-zinc-400" /> Taha Lahlou
              </span>
              <span className="text-zinc-600 font-medium flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-zinc-400" /> Reda Ben Massaoud
              </span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col md:items-end gap-2 text-xs font-mono">
            <a
              href="tel:0611202701"
              className="flex items-center gap-2 text-zinc-600 hover:text-emerald-600 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-500" /> 06 11 20 27 01
            </a>
            <a
              href="mailto:converswebsites@gmail.com"
              className="flex items-center gap-2 text-zinc-600 hover:text-emerald-600 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-500" /> converswebsites@gmail.com
            </a>
          </div>

        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-zinc-200/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono">
          <span>&copy; 2026 CONVERS. All rights secured.</span>
          <span className="text-zinc-400 uppercase tracking-widest flex items-center gap-1">
            Built to Convert <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </footer>

      {/* Core Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        userEmail="converswebsites@gmail.com"
      />

    </div>
  );
}
