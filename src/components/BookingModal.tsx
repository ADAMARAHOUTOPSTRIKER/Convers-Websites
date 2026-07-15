import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, X, Check, Loader2, Link2, Sparkles, ArrowRight } from 'lucide-react';
import { Booking, TimeSlot } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

// Format a Date as a local "YYYY-MM-DD" key. Using `toISOString()` here would
// convert to UTC and can shift the day by one in negative-offset timezones.
const toDateKey = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

// Parse a "YYYY-MM-DD" key back into a local Date (see note above).
const parseDateKey = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
};

export default function BookingModal({ isOpen, onClose, userEmail = '' }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Date & Time, 2: Info form, 3: Success
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState(userEmail);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate next 7 available business days
  const getUpcomingDays = () => {
    const days = [];
    const today = new Date();
    let count = 0;
    let iterations = 0;

    while (count < 7 && iterations < 15) {
      iterations++;
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + iterations);

      // Skip weekends (Sunday = 0, Saturday = 6)
      const dayOfWeek = nextDay.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        days.push(nextDay);
        count++;
      }
    }
    return days;
  };

  const upcomingDays = getUpcomingDays();

  // Mock available time slots
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '09:30 AM', available: true },
    { id: '2', time: '11:00 AM', available: true },
    { id: '3', time: '02:00 PM', available: true },
    { id: '4', time: '03:30 PM', available: false },
    { id: '5', time: '04:30 PM', available: true },
    { id: '6', time: '06:00 PM', available: true },
  ];

  // Set default date
  useEffect(() => {
    if (upcomingDays.length > 0 && !selectedDate) {
      setSelectedDate(toDateKey(upcomingDays[0]));
    }
  }, []);

  const formatDateLabel = (dateStr: string) => {
    if (!dateStr) return '';
    const date = parseDateKey(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !selectedDate || !selectedSlot) return;

    setIsSubmitting(true);

    // Simulate elite speed API call
    setTimeout(() => {
      const newBooking: Booking = {
        id: Math.random().toString(36).slice(2, 11),
        name,
        email,
        date: selectedDate,
        timeSlot: selectedSlot,
        websiteUrl: websiteUrl || undefined,
        notes: notes || undefined,
        createdAt: new Date().toISOString()
      };

      const existing = localStorage.getItem('convers_bookings');
      let bookingsList: Booking[] = [];
      if (existing) {
        try {
          bookingsList = JSON.parse(existing);
        } catch (e) {
          bookingsList = [];
        }
      }
      bookingsList.push(newBooking);
      localStorage.setItem('convers_bookings', JSON.stringify(bookingsList));

      // Notify listeners in this same tab (the `storage` event only fires in
      // other tabs) so the confirmation badge updates immediately.
      window.dispatchEvent(new Event('convers_bookings_updated'));

      setIsSubmitting(false);
      setStep(3);
    }, 1200);
  };

  const resetState = () => {
    setStep(1);
    setSelectedSlot('');
    setName('');
    setWebsiteUrl('');
    setNotes('');
  };

  // Close on ESC keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-400/20 backdrop-blur-xl"
          >
            {/* Upper Emerald gradient line */}
            <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 sm:p-8">
              {/* STAGE 1: PICK DATE & TIME */}
              {step === 1 && (
                <div>
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      <Sparkles className="h-3 w-3 animate-pulse" /> Free Strategy Diagnostic
                    </span>
                    <h3 className="mt-2 text-2xl font-bold font-display text-zinc-950">Book Your Conversion Call</h3>
                    <p className="mt-1 text-sm text-zinc-600">
                      Select a date and time for a direct, high-impact 1-on-1 strategy call to transform your website.
                    </p>
                  </div>

                  {/* Date Selector Grid */}
                  <div className="mb-6">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600 flex items-center gap-1.5 mb-3">
                      <Calendar className="h-4 w-4 text-emerald-600" /> 1. Select Date
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {upcomingDays.map((day) => {
                        const formatted = toDateKey(day);
                        const isSelected = selectedDate === formatted;
                        return (
                          <button
                            key={formatted}
                            type="button"
                            onClick={() => setSelectedDate(formatted)}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-semibold'
                                : 'border-zinc-200 bg-zinc-50/50 text-zinc-800 hover:border-zinc-300 hover:bg-zinc-100'
                            }`}
                          >
                            <span className="text-xs text-zinc-500 uppercase font-medium">
                              {day.toLocaleDateString('en-US', { weekday: 'short' })}
                            </span>
                            <span className="text-lg font-bold mt-0.5">
                              {day.getDate()}
                            </span>
                            <span className="text-[10px] text-zinc-400 mt-0.5">
                              {day.toLocaleDateString('en-US', { month: 'short' })}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slot Grid */}
                  <div className="mb-8">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600 flex items-center gap-1.5 mb-3">
                      <Clock className="h-4 w-4 text-emerald-600" /> 2. Pick a Time (Your Local Time)
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {timeSlots.map((slot) => {
                        const isSelected = selectedSlot === slot.time;
                        return (
                          <button
                            key={slot.id}
                            disabled={!slot.available}
                            type="button"
                            onClick={() => setSelectedSlot(slot.time)}
                            className={`p-3 rounded-lg border text-center font-mono text-sm transition-all cursor-pointer ${
                              !slot.available
                                ? 'border-zinc-100 bg-zinc-50 text-zinc-300 line-through cursor-not-allowed'
                                : isSelected
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold'
                                : 'border-zinc-200 bg-zinc-50/50 text-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-100'
                            }`}
                          >
                            {slot.time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation Button */}
                  <div className="flex justify-end pt-4 border-t border-zinc-100">
                    <button
                      disabled={!selectedDate || !selectedSlot}
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-lg font-semibold bg-zinc-950 text-white hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      Next Step <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 2: FILL DETAILS */}
              {step === 2 && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      Step 2 of 2
                    </span>
                    <h3 className="mt-2 text-2xl font-bold font-display text-zinc-950">Let’s lock your slot</h3>
                    <p className="mt-1 text-sm text-zinc-600">
                      Booking for <span className="text-emerald-600 font-semibold">{formatDateLabel(selectedDate)}</span> at <span className="text-emerald-600 font-semibold">{selectedSlot}</span>.
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-zinc-900 placeholder-zinc-400 outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-zinc-900 placeholder-zinc-400 outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 flex items-center gap-1 mb-1.5">
                        Current Website URL <span className="text-zinc-400 font-normal lowercase italic">(if you have one)</span>
                      </label>
                      <div className="relative">
                        <Link2 className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                        <input
                          type="url"
                          placeholder="https://yourcompany.com"
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 pl-10 pr-4 py-2.5 text-zinc-900 placeholder-zinc-400 outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">
                        What is your #1 goal with a new website?
                      </label>
                      <textarea
                        rows={2}
                        placeholder="E.g., We want to double our client bookings, refresh our high-end brand feel..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-zinc-900 placeholder-zinc-400 outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-zinc-500 hover:text-zinc-950 transition-colors text-sm font-semibold cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !name || !email}
                      className="px-6 py-3 rounded-lg font-bold bg-zinc-950 text-white hover:bg-emerald-500 transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Securing Your Spot...
                        </>
                      ) : (
                        <>
                          Confirm Call Booking <Check className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* STAGE 3: SUCCESS STATE */}
              {step === 3 && (
                <div className="text-center py-6">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-4">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-zinc-950">Your Call is Booked!</h3>
                  <p className="mt-2 text-sm text-zinc-600 max-w-md mx-auto">
                    Excellent choice, <span className="text-zinc-950 font-semibold">{name}</span>. We've locked in your consultation for:
                  </p>

                  <div className="my-6 inline-block bg-zinc-50/50 border border-zinc-200 rounded-xl px-6 py-4 text-left max-w-sm mx-auto w-full">
                    <div className="flex items-center gap-3 text-zinc-900">
                      <Calendar className="h-5 w-5 text-emerald-600 shrink-0" />
                      <span className="font-semibold">{formatDateLabel(selectedDate)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-900 mt-2">
                      <Clock className="h-5 w-5 text-emerald-600 shrink-0" />
                      <span className="font-semibold">{selectedSlot}</span>
                    </div>
                    <div className="text-xs text-zinc-500 mt-3 pt-3 border-t border-zinc-100">
                      We've sent a calendar invite to <span className="text-zinc-800 font-mono">{email}</span>.
                    </div>
                  </div>

                  {/* Performance Target simulation block */}
                  <div className="bg-zinc-50/50 border border-zinc-200 rounded-xl p-5 mb-6 text-left">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5 mb-2">
                      <Sparkles className="h-3.5 w-3.5" /> Client Conversion Booster
                    </h4>
                    <p className="text-xs text-zinc-600 mb-4">
                      While we prepare for our call, we run an automated assessment of custom immersive elements for your category. Here are our quick targets for your industry:
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-white p-2.5 rounded-lg border border-zinc-200">
                        <span className="block text-xl font-bold text-zinc-900 font-mono">2.8x</span>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Conversion Boost Target</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-zinc-200">
                        <span className="block text-xl font-bold text-zinc-900 font-mono">&lt; 0.9s</span>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Load Speed Goal</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <a
                      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Conversion+Strategy+Call+with+Convers&dates=${selectedDate.replace(/-/g, '')}T150000Z/${selectedDate.replace(/-/g, '')}T153000Z&details=1-on-1+immersive+website+conversion+strategy+call.`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-bold bg-zinc-100 border border-zinc-200 text-zinc-900 hover:bg-zinc-200 transition-colors text-center cursor-pointer"
                    >
                      Add to Google Calendar
                    </a>
                    <button
                      onClick={() => {
                        resetState();
                        onClose();
                      }}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-bold bg-zinc-950 text-white hover:bg-emerald-500 transition-all text-center cursor-pointer"
                    >
                      Done, see you there!
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
