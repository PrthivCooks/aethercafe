"use client";

import { useState } from "react";
import Hero from "@/components/sections/Hero";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { BendText } from "@/components/ui/bend-text";
import { StackedCardsInteraction } from "@/components/ui/stacked-cards-interaction";
import { AnimatedTextWave } from "@/components/ui/text-wave-animation";
import { ReviewSummaryCard } from "@/components/ui/card-2";
import { AnimatedReviewCards } from "@/components/ui/animated-review-card";
import { AnimatedTeamSection } from "@/components/ui/team-section";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { InteractiveSelector, SelectorOption } from "@/components/ui/interactive-selector";
import { WorldMap } from "@/components/ui/map";
import { ArrowRight, Coffee, Instagram, MapPin, Clock, Croissant, Cake, Leaf, Sandwich, Cookie, Droplet, Sparkles, FlaskConical, Facebook, MessageCircle, Send, Phone, Mail, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const parallaxImages = [
    { src: "/assets/parallax-1.jpeg", alt: "Placeholder 1" },
    { src: "/assets/parallax-2.jpeg", alt: "Placeholder 2" },
    { src: "/assets/parallax-3.jpeg", alt: "Placeholder 3" },
    { src: "/assets/parallax-4.jpeg", alt: "Placeholder 4" },
    { src: "/assets/parallax-5.jpeg", alt: "Placeholder 5" },
    { src: "/assets/parallax-6.jpeg", alt: "Placeholder 6" },
    { src: "/assets/parallax-7.jpeg", alt: "Placeholder 7" },
  ];

  const cafeSpecials = [
    {
      image: "/assets/card-1.jpeg",
      title: "Midnight Espresso",
      description: "A dark, intense double shot pulled over a frozen steel sphere to instantly lock in aromatics.",
      price: "$6.50"
    },
    {
      image: "/assets/card-2.jpeg",
      title: "Vanilla Storm Latte",
      description: "Madagascar vanilla bean infused milk, steamed to perfection, kissed with sea salt.",
      price: "$7.00"
    },
    {
      image: "/assets/card-3.jpeg",
      title: "Sakura Cold Brew",
      description: "18-hour Kyoto-style slow drip over cherry blossoms and crushed ice.",
      price: "$8.50"
    }
  ];

  const cafeEatables: SelectorOption[] = [
    {
      title: "Almond Croissant",
      description: "Twice-baked, filled with rich almond frangipane.",
      image: "/assets/eats-1.jpeg",
      icon: <Croissant className="w-6 h-6" />
    },
    {
      title: "Artisan Cheesecake",
      description: "Basque-style burnt cheesecake with a gooey center.",
      image: "/assets/eats-2.jpeg",
      icon: <Cake className="w-6 h-6" />
    },
    {
      title: "Avocado Sourdough",
      description: "Smashed avocado, heirloom tomatoes, microgreens.",
      image: "/assets/eats-3.jpeg",
      icon: <Leaf className="w-6 h-6" />
    },
    {
      title: "Truffle Mushroom Melt",
      description: "Wild mushrooms, gruyere, truffle oil on brioche.",
      image: "/assets/eats-4.jpeg",
      icon: <Sandwich className="w-6 h-6" />
    },
    {
      title: "Sea Salt Chocolate Chip",
      description: "Brown butter, dark chocolate chunks, flaky salt.",
      image: "/assets/eats-5.jpeg",
      icon: <Cookie className="w-6 h-6" />
    }
  ];

  const reviews = [
    {
      id: 1,
      name: "James Bryan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
      text: "The absolute best pour-over I've ever had. The Midnight Espresso defied physics. I literally watched time slow down while they brewed it.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
      text: "It's expensive, but the atmosphere is worth every penny. You aren't just buying coffee, you are buying an hour of complete serenity.",
      rating: 4,
    },
    {
      id: 3,
      name: "Mark Sloan",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
      text: "Is it a coffee shop? Is it an art gallery? I'm not sure. But the Sakura Cold Brew changed my life.",
      rating: 5,
    },
  ];

  const teamMembers = [
    { name: "Julian Thorne", role: "Founder & Visionary", image: "/assets/team-1.jpeg" },
    { name: "Elena Rostova", role: "Master Roaster", image: "/assets/team-2.jpeg" },
    { name: "Marcus Chen", role: "Head Barista", image: "/assets/team-3.jpeg" },
    { name: "Sarah Jenkins", role: "Director of Coffee", image: "/assets/team-4.jpeg" },
    { name: "David Althaus", role: "Pastry Chef", image: "/assets/team-5.jpeg" },
    { name: "Priya Patel", role: "Head of Operations", image: "/assets/team-6.jpeg" },
    { name: "Kenji Sato", role: "Interior Architect", image: "/assets/team-7.jpeg" },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#0B0908] text-[#F2EFEA]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-black/20 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xl tracking-widest uppercase">
          <Coffee className="w-6 h-6" />
          Aether Café
        </div>
        <div className="hidden md:flex gap-10 text-xs font-semibold tracking-widest uppercase text-white/70">
          <a href="#origin" className="hover:text-[#D4AF37] transition-colors">The Origin</a>
          <a href="#specials" className="hover:text-[#D4AF37] transition-colors">Specials</a>
          <a href="#edibles" className="hover:text-[#D4AF37] transition-colors">Edibles</a>
          <a href="#reviews" className="hover:text-[#D4AF37] transition-colors">Reviews</a>
          <a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact</a>
        </div>
        <button 
          className="md:hidden text-white hover:text-[#D4AF37] transition-colors mr-2 sm:mr-4"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed top-[81px] left-0 right-0 z-40 bg-[#0B0908]/95 backdrop-blur-xl border-b border-white/5 md:hidden">
          <div className="flex flex-col p-6 gap-6 text-sm font-semibold tracking-widest uppercase text-white/70">
            <a href="#origin" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4AF37] transition-colors">The Origin</a>
            <a href="#specials" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4AF37] transition-colors">Specials</a>
            <a href="#edibles" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4AF37] transition-colors">Edibles</a>
            <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4AF37] transition-colors">Reviews</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4AF37] transition-colors">Contact</a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <Hero />

      {/* NEW SECTION - SCROLL EXPAND MEDIA (Replacing Video Reveal) */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/assets/promo.mp4"
        bgImageSrc="/assets/parallax-1.jpeg"
        title="Art in Motion"
        date="Aether Craft"
        scrollToExpand="Scroll to Experience"
        textBlend={true}
      />

      {/* CAFE TIMINGS & QUOTE SECTION */}
      <section className="relative py-32 bg-[#120F0D] border-t border-b border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="text-[#D4AF37] tracking-[0.2em] text-sm font-semibold uppercase block">Operating Hours</span>
            <div className="flex items-center gap-4 text-3xl font-light">
              <Clock className="w-8 h-8 text-[#D4AF37]" />
              <div>
                <p>Mon - Fri <span className="text-white/40 ml-4 font-mono text-xl">07:00 AM — 06:00 PM</span></p>
                <p className="mt-2">Weekends <span className="text-white/40 ml-4 font-mono text-xl">08:00 AM — 08:00 PM</span></p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }}
            className="pl-0 md:pl-12 border-l border-white/10"
          >
            <p className="text-3xl italic font-serif leading-relaxed text-white/80">
              "We open when the beans are ready, and we close when we run out. Usually, that means 7 AM. But we don't rush perfection."
            </p>
            <p className="text-[#D4AF37] mt-6 font-bold tracking-widest uppercase text-sm">— The Head Roaster</p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1 - THE ORIGIN (Zoom Parallax) */}
      <section id="origin" className="relative bg-[#0B0908] pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_50%)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center px-6 mb-12 relative z-10"
        >
          <span className="text-[#D4AF37] tracking-[0.2em] text-sm font-semibold uppercase mb-4 block">Section 01</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">The Origin.</h2>
          <p className="text-xl text-white/60 leading-relaxed font-light mb-8">
            Every bean tells a story of the soil it grew in, the sun that warmed it, and the hands that nurtured it.
            From the high altitudes of Ethiopia to your cup in the city.
          </p>
          <p className="text-sm italic font-serif text-[#D4AF37]/80">"I don't need an inspirational quote. I need coffee."</p>
        </motion.div>
        <ZoomParallax images={parallaxImages} />
      </section>

      {/* SECTION - OUR STORY (Team Cards) */}
      <section id="story" className="relative py-32 bg-[#120F0D] border-t border-white/5">
        <AnimatedTeamSection
          title="Our Story. The People Behind the Pour."
          description="Aether Café wasn't born out of a business plan. It was born out of an obsession. After a decade of sourcing the world's most remote beans, we realized the experience was missing. We built Aether to be a sanctuary where the art of cultivation meets absolute precision in brewing."
          members={teamMembers}
        />
      </section>


      {/* SECTION 2 - CAFE SPECIALS (Stacked Cards) */}
      <section id="specials" className="relative py-32 bg-[#120F0D]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
            <span className="text-[#D4AF37] tracking-[0.2em] text-sm font-semibold uppercase mb-4 block">Section 02</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Café Specials.</h2>
            <p className="text-lg text-white/60 leading-relaxed font-light mb-10 max-w-md">
              Our signature drinks are an exploration of flavor. We combine premium roasted beans with
              culinary techniques to create something entirely new. Hover over the cards to explore our creations.
            </p>
            <p className="text-sm italic font-serif text-white/40 mb-8 border-l-2 border-[#D4AF37] pl-4">"Decaf only exists so we can test people's patience."</p>

          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }} className="h-[600px] w-full flex justify-center items-center">
            <StackedCardsInteraction
              cards={cafeSpecials}
              spreadDistance={60}
              rotationAngle={8}
            />
          </motion.div>
        </div>
      </section>

      {/* NEW SECTION - ARTISAN EDIBLES (Interactive Selector) */}
      <section id="edibles" className="relative py-32 bg-[#0B0908] border-t border-white/5">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto">
          <InteractiveSelector
            title="Section 03: Artisan Edibles."
            subtitle="Carefully crafted pastries and savory bites, designed to perfectly complement our signature roasts."
            options={cafeEatables}
          />
        </motion.div>
      </section>

      {/* SECTION 4 - REVIEWS (Animated Review Cards) */}
      <section id="reviews" className="relative py-32 bg-[#0B0908] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:w-1/3 flex justify-center lg:justify-start">
            <ReviewSummaryCard
              rating={4.9}
              reviewCount={1092}
              summaryText="Consistently rated world-class by coffee enthusiasts around the globe."
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:w-2/3 w-full">
            <div className="text-center lg:text-left mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">What our patrons say</h2>
              <p className="text-white/50">Drag the cards to explore more reviews.</p>
            </div>

            <AnimatedReviewCards
              reviews={reviews}
              autoRotate={true}
              rotateInterval={5000}
              theme="elegant"
              showBorderBeam={true}
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 - CAFE ATMOSPHERE (Text Wave) */}
      <section className="relative py-32 bg-[#050403] overflow-hidden flex flex-col items-center border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center px-6 mb-16 relative z-10">
          <span className="text-[#D4AF37] tracking-[0.2em] text-sm font-semibold uppercase mb-4 block">Section 05</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Atmosphere.</h2>
          <p className="text-xl text-white/60 leading-relaxed font-light">
            More than just coffee. A space designed for thought, conversation, and presence.
          </p>
        </div>

        <AnimatedTextWave
          text="AETHER"
          count={6}
          backgroundColor="transparent"
          fontSize="15vw"
          heightFactor={1.5}
        />
      </section>

      {/* SECTION - GLOBAL NETWORK / ROASTERIES */}
      <section id="network" className="relative py-32 bg-[#050403] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <span className="text-[#D4AF37] tracking-[0.2em] text-sm font-semibold uppercase mb-4 block">Our Reach</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-white">
            Global Sourcing.
          </h2>
          <p className="text-xl text-white/60 leading-relaxed font-light max-w-2xl mx-auto">
            From high-altitude farms across the equator to our flagship cafe in London. We source our beans globally to bring you an unparalleled coffee experience.
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <WorldMap
            lineColor="#D4AF37"
            dots={[
              {
                start: { lat: 9.0222, lng: 38.7468, label: "Addis Ababa" }, // Ethiopia
                end: { lat: 51.5074, lng: -0.1278, label: "London (Flagship)" },
              },
              {
                start: { lat: 4.7110, lng: -74.0721, label: "Bogotá" }, // Colombia
                end: { lat: 51.5074, lng: -0.1278, label: "London (Flagship)" },
              },
              {
                start: { lat: -23.5505, lng: -46.6333, label: "São Paulo" }, // Brazil
                end: { lat: 51.5074, lng: -0.1278, label: "London (Flagship)" },
              },
              {
                start: { lat: -6.2088, lng: 106.8456, label: "Jakarta" }, // Indonesia
                end: { lat: 51.5074, lng: -0.1278, label: "London (Flagship)" },
              },
              {
                start: { lat: 9.9281, lng: -84.0907, label: "San José" }, // Costa Rica
                end: { lat: 51.5074, lng: -0.1278, label: "London (Flagship)" },
              },
            ]}
          />
        </div>
      </section>

      {/* NEW SECTION - CONTACT & SOCIALS */}
      <section id="contact" className="relative py-32 bg-[#120F0D] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="text-[#D4AF37] tracking-[0.2em] text-sm font-semibold uppercase mb-4 block">Connect With Us</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white">Let's Talk Coffee.</h2>
            <p className="text-lg text-white/60 leading-relaxed font-light mb-10 max-w-md">
              Whether you're looking to host an event, inquire about wholesale beans, or just want to tell us how much you loved the Sakura Cold Brew. We're here.
            </p>
            <p className="text-xl italic font-serif text-[#D4AF37] mb-12">"Given enough coffee, I could rule the world. Or at least this cafe."</p>

            <div className="flex flex-col sm:flex-row gap-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-[#1E1A17] hover:bg-[#D4AF37] hover:text-[#0B0908] text-white border border-white/10 px-8 py-4 rounded-xl transition-all duration-300 group">
                <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="font-bold tracking-wider uppercase text-sm">Instagram</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-[#1E1A17] hover:bg-[#D4AF37] hover:text-[#0B0908] text-white border border-white/10 px-8 py-4 rounded-xl transition-all duration-300 group">
                <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="font-bold tracking-wider uppercase text-sm">Facebook</span>
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-[#1E1A17] hover:bg-[#D4AF37] hover:text-[#0B0908] text-white border border-white/10 px-8 py-4 rounded-xl transition-all duration-300 group">
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="font-bold tracking-wider uppercase text-sm">WhatsApp</span>
              </a>
            </div>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4 text-white/70 hover:text-[#D4AF37] transition-colors cursor-pointer">
                <Phone className="w-6 h-6" />
                <span className="text-xl font-light">+44 (0) 20 7123 4567</span>
              </div>
              <div className="flex items-center gap-4 text-white/70 hover:text-[#D4AF37] transition-colors cursor-pointer">
                <Mail className="w-6 h-6" />
                <span className="text-xl font-light">hello@aethercafe.com</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-[#0B0908] p-10 rounded-3xl border border-white/5 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">Send a message</h3>
            <form className="space-y-6">
              <div>
                <label className="text-xs font-bold tracking-widest uppercase text-white/40 block mb-2">Name</label>
                <input type="text" className="w-full bg-[#1E1A17] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest uppercase text-white/40 block mb-2">Email</label>
                <input type="email" className="w-full bg-[#1E1A17] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="john@example.com" />
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest uppercase text-white/40 block mb-2">Message</label>
                <textarea rows={4} className="w-full bg-[#1E1A17] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="w-full bg-[#D4AF37] text-[#0B0908] font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 group">
                <span>Send Message</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-[#050403] pt-12 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-2xl tracking-widest uppercase mb-6">
                <Coffee className="w-8 h-8" />
                Aether Café
              </div>
              <p className="text-white/50 max-w-sm text-lg font-light italic">
                "Some coffees are consumed. Some are remembered."
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-sm">Location</h4>
              <ul className="space-y-4 text-white/60 font-light">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span>100 Coffee Lane<br />London, UK<br />EC1V 9HX</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold tracking-widest uppercase mb-6 text-sm">Connect</h4>
              <ul className="space-y-4 text-white/60 font-light">
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] flex items-center gap-2 transition-colors"><Instagram className="w-4 h-4" /> Instagram</a></li>
                <li><a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">Reservations</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/40 text-sm">
            <p>&copy; {new Date().getFullYear()} Aether Café. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
