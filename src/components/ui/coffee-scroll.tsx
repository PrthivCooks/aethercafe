"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X, Clock, DollarSign, Plus, Check, ShoppingBag, Droplets, Flame } from "lucide-react";
import Image from "next/image";

const coffees = [
  {
    id: 2,
    name: "Cold Brew Reserve",
    shortDesc: "18-hour steep, incredibly smooth.",
    image: "/assets/coffee_new_2.png",
    price: 5.50,
    time: "Available 7AM - 8PM",
    description: "Our signature cold brew is steeped for 18 hours using single-origin beans, resulting in an incredibly smooth, low-acidity profile with natural notes of chocolate and stone fruit.",
    options: ["Extra Ice", "Oat Milk Splash", "Vanilla Syrup", "Caramel Drizzle"],
    initialRotate: -45,
    initialX: -120,
    initialY: 0,
    initialZ: 10,
    finalX: -380,
    finalY: 0,
    finalZ: 10,
    intensity: 4,
    type: "iced"
  },
  {
    id: 1,
    name: "Aether Signature Latte",
    shortDesc: "Perfectly balanced espresso & silk milk.",
    image: "/assets/coffee_new_1.png",
    price: 6.00,
    time: "Available 7AM - 6PM",
    description: "Our flagship latte features a double ristretto shot of our premium Aether Blend, perfectly integrated with micro-foamed milk for a sweet, creamy, and deeply comforting experience.",
    options: ["Whole Milk", "Almond Milk", "Extra Shot", "Hazelnut Syrup"],
    initialRotate: 0,
    initialX: 0,
    initialY: 0,
    initialZ: 30,
    finalX: 0,
    finalY: 0,
    finalZ: 20,
    intensity: 3,
    type: "hot"
  },
  {
    id: 3,
    name: "Matcha Cloud",
    shortDesc: "Ceremonial matcha with vanilla foam.",
    image: "/assets/coffee_new_3.png",
    price: 7.00,
    time: "Available 8AM - 4PM",
    description: "Premium ceremonial-grade matcha from Uji, Japan, hand-whisked to order and layered over icy milk, topped with our signature sweet vanilla cold foam.",
    options: ["Coconut Milk", "Less Sweet", "Extra Foam", "Strawberry Purée"],
    initialRotate: 39,
    initialX: 110,
    initialY: 20,
    initialZ: 20,
    finalX: 380,
    finalY: 0,
    finalZ: 30,
    intensity: 2,
    type: "iced"
  }
];

export function CoffeeScrollListing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCoffee, setSelectedCoffee] = useState<typeof coffees[0] | null>(null);
  const [animatingId, setAnimatingId] = useState<number | null>(null);

  // UX States
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<"Regular" | "Large">("Regular");
  const [isAdding, setIsAdding] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform values for cards
  const cardOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0.2, 0.4], [50, 0]);

  // Reset UX states when a new coffee is selected
  useEffect(() => {
    if (selectedCoffee) {
      setSelectedOptions([]);
      setSelectedSize("Regular");
      setIsAdding(false);
    }
  }, [selectedCoffee]);

  const toggleOption = (opt: string) => {
    setSelectedOptions(prev =>
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    );
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setSelectedCoffee(null);
    }, 1200);
  };

  const currentPrice = selectedCoffee
    ? (selectedCoffee.price + (selectedSize === "Large" ? 1.5 : 0) + (selectedOptions.length * 0.5)).toFixed(2)
    : "0.00";

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#050403] w-full">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* NEW SECTION TITLE */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-0 pointer-events-none"
        >
          <span className="text-[#D4AF37] tracking-[0.2em] text-sm font-semibold uppercase block mb-4 drop-shadow-md">Aether Signature</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-lg">The Collection</h2>
        </motion.div>

        <div className="relative w-full max-w-7xl h-[700px] flex items-center justify-center mt-20 z-10">
          {coffees.map((coffee, i) => {
            const x = useTransform(scrollYProgress, [0, 0.4], [coffee.initialX, coffee.finalX]);
            const y = useTransform(scrollYProgress, [0, 0.4], [coffee.initialY, coffee.finalY]);
            const rotate = useTransform(scrollYProgress, [0, 0.4], [coffee.initialRotate, 0]);
            const scale = useTransform(scrollYProgress, [0, 0.4], [coffee.id !== 1 ? 0.8 : 1, 1]);
            const zIndex = useTransform(scrollYProgress, (latest) => {
              const progress = Math.min(Math.max(latest / 0.4, 0), 1);
              return Math.round(coffee.initialZ + progress * (coffee.finalZ - coffee.initialZ));
            });

            // Use animatingId to keep zIndex high even during the closing animation
            const isSelected = selectedCoffee?.id === coffee.id;
            const isAnimating = animatingId === coffee.id;

            return (
              <motion.div
                key={coffee.id}
                style={{
                  x,
                  y,
                  rotate,
                  scale,
                  zIndex
                }}
                className={`absolute flex flex-col items-center justify-end cursor-pointer group w-[340px] h-[580px] ${isAnimating ? "!z-[100]" : ""}`}
                onClick={() => {
                  setAnimatingId(coffee.id);
                  setSelectedCoffee(coffee);
                }}
              >
                {/* The Card Background that fades in */}
                <motion.div
                  style={{ opacity: isSelected ? 0 : cardOpacity, y: cardY }}
                  className="absolute bottom-0 w-[340px] h-[460px] bg-[#120F0D] border border-white/5 rounded-[2rem] -z-10 group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.1)] transition-all duration-500 flex flex-col justify-end items-center pb-10 px-6 overflow-hidden"
                >
                  {/* Subtle highlight inside the card on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <h3 className="text-2xl font-bold text-white mb-2 text-center relative z-10">{coffee.name}</h3>
                  <p className="text-sm text-white/50 mb-6 text-center relative z-10">{coffee.shortDesc}</p>
                  <div className="flex items-center justify-center gap-2 text-[#D4AF37] font-semibold bg-white/5 py-3 px-6 rounded-full w-max relative z-10 group-hover:bg-[#D4AF37] group-hover:text-[#0B0908] transition-colors">
                    <span>{isSelected ? "Brewing..." : "View Details"}</span>
                    <Plus className="w-4 h-4" />
                  </div>
                </motion.div>

                {/* The Coffee Image with layoutId for shared element transition */}
                <motion.div className="relative w-[300px] h-[400px] z-20 group-hover:scale-110 group-hover:-translate-y-6 transition-all duration-700 ease-out mb-[180px]">
                  {/* Continuous floating animation wrapper (doesn't interfere with layoutId) */}
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: i * 0.3 }}
                    className="w-full h-full"
                  >
                    <motion.div layoutId={`coffee-image-${coffee.id}`} className="relative w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                      <Image
                        src={coffee.image}
                        alt={coffee.name}
                        fill
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal / Expanded View */}
      <AnimatePresence onExitComplete={() => setAnimatingId(null)}>
        {selectedCoffee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8 overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0B0908] border border-white/10 rounded-[2rem] w-full max-w-6xl h-[90vh] flex flex-col lg:flex-row relative shadow-[0_0_120px_rgba(212,175,55,0.15)] overflow-hidden"
            >
              <button
                onClick={() => setSelectedCoffee(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-white/5 hover:bg-[#D4AF37] hover:text-black rounded-full text-white transition-colors group"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
              </button>

              {/* Left: Huge Enqueue Image Container */}
              <div className="w-full lg:w-1/2 p-8 md:p-16 bg-gradient-to-b from-[#1A1714] to-[#0B0908] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.2),transparent_70%)]" />

                {/* Background decorative typography (behind the image) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] font-black text-white/5 whitespace-nowrap -rotate-90 pointer-events-none select-none z-0"
                >
                  {selectedCoffee.name.split(' ')[0].toUpperCase()}
                </motion.div>

                {/* The layoutId connected image */}
                <div className="relative w-[120%] h-[800px] z-50 flex items-center justify-center pointer-events-none">
                  <motion.div
                    layoutId={`coffee-image-${selectedCoffee.id}`}
                    className="relative w-full h-full z-50"
                  >
                    <Image
                      src={selectedCoffee.image}
                      alt={selectedCoffee.name}
                      fill
                      className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                      priority
                    />
                  </motion.div>
                </div>
              </div>

              {/* Right: Details & UX Interactive Logic */}
              <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center overflow-y-auto z-10">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#D4AF37] tracking-[0.2em] text-xs font-bold uppercase px-3 py-1 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20">
                      Signature Series
                    </span>
                    {selectedCoffee.type === "hot" ? (
                      <span className="flex items-center gap-1 text-orange-400 text-xs font-bold uppercase tracking-widest bg-orange-400/10 px-3 py-1 rounded-full border border-orange-400/20">
                        <Flame className="w-3 h-3" /> Hot
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                        <Droplets className="w-3 h-3" /> Iced
                      </span>
                    )}
                  </div>

                  <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4 leading-none">
                    {selectedCoffee.name}
                  </h2>

                  <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-white/5">
                    <div className="flex items-center gap-1 text-4xl font-light text-white">
                      <span className="text-xl text-[#D4AF37] -translate-y-2">$</span>
                      {currentPrice}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/60 bg-white/5 px-4 py-2 rounded-full">
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      {selectedCoffee.time}
                    </div>
                  </div>

                  <p className="text-lg text-white/60 leading-relaxed font-light mb-8">
                    {selectedCoffee.description}
                  </p>

                  {/* Attributes */}
                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <div>
                      <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-3">Intensity</h4>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-2 rounded-full flex-1 ${level <= selectedCoffee.intensity ? 'bg-[#D4AF37]' : 'bg-white/10'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-3">Size</h4>
                      <div className="flex gap-2 bg-[#120F0D] p-1 rounded-xl border border-white/5">
                        <button
                          onClick={() => setSelectedSize("Regular")}
                          className={`flex-1 py-2 text-xs font-bold tracking-widest uppercase rounded-lg transition-colors ${selectedSize === "Regular" ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/80'}`}
                        >
                          Regular
                        </button>
                        <button
                          onClick={() => setSelectedSize("Large")}
                          className={`flex-1 py-2 text-xs font-bold tracking-widest uppercase rounded-lg transition-colors ${selectedSize === "Large" ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/80'}`}
                        >
                          Large
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Customizations */}
                  <div className="mb-12">
                    <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4 flex justify-between items-end">
                      Customizable Options
                      <span className="text-[10px] text-[#D4AF37]">+ $0.50 each</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedCoffee.options.map((opt, idx) => {
                        const isSelected = selectedOptions.includes(opt);
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleOption(opt)}
                            className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border ${isSelected ? 'bg-[#D4AF37]/10 border-[#D4AF37]/50' : 'bg-[#120F0D] border-white/5 hover:border-white/20'}`}
                          >
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-white/20'}`}>
                              <Check className={`w-3 h-3 ${isSelected ? 'text-[#0B0908]' : 'opacity-0'}`} />
                            </div>
                            <span className={`text-sm font-medium ${isSelected ? 'text-[#D4AF37]' : 'text-white/80'}`}>{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="w-full bg-[#D4AF37] text-[#0B0908] font-bold tracking-widest uppercase py-6 rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-80 mt-auto"
                  >
                    <AnimatePresence mode="wait">
                      {isAdding ? (
                        <motion.div
                          key="adding"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                            <ShoppingBag className="w-5 h-5" />
                          </motion.div>
                          <span>Brewing...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          <span>Add to Order - ${currentPrice}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
