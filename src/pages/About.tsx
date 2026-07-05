import { motion } from "framer-motion";
import { Star, Check, MapPin, Wrench } from "lucide-react";

function TrustFeatures() {
  const features = [
    { icon: <Star className="w-8 h-8" />, title: "Lifetime Warranty", desc: "India's only Apple Service Company to provide Lifetime Warranty on Display Repairs.", align: "left", color: "from-amber-400 to-orange-500", glow: "shadow-orange-500/20" },
    { icon: <Check className="w-8 h-8" />, title: "Repairs In Front Of You", desc: "Get your device repaired stress-free! We repair the device at your location, maintaining absolute data privacy.", align: "right", color: "from-indigo-500 to-violet-600", glow: "shadow-indigo-500/20" },
    { icon: <MapPin className="w-8 h-8" />, title: "Same Day Doorstep Service", desc: "Apple Repair Service is now quick & convenient. Book now and get it fixed within hours.", align: "left", color: "from-cyan-400 to-blue-500", glow: "shadow-cyan-500/20" },
    { icon: <Star className="w-8 h-8 fill-current" />, title: "Highest Rated Service", desc: "Rated 4.9/5 by over 10,000+ happy customers across 19+ cities in India.", align: "right", color: "from-emerald-400 to-green-500", glow: "shadow-emerald-500/20" },
  ];
  return (
    <section className="py-24 relative bg-slate-50 border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-3xl md:text-5xl font-black text-slate-900 mb-20 tracking-tight">Why Fix<span className="text-blue-600">Swift</span> is trusted</motion.h2>
        <div className="space-y-12 md:space-y-24">
          {features.map((feature, i) => (
            <motion.div key={i} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${feature.align === "right" ? "md:flex-row-reverse md:text-right" : ""}`} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <motion.div className={`w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-gradient-to-br ${feature.color} flex items-center justify-center text-white flex-shrink-0 shadow-2xl ${feature.glow} relative`} whileHover={{ scale: 1.05, rotate: feature.align === 'left' ? 5 : -5 }}>
                <div className="absolute inset-0 bg-white/20 rounded-[2rem] blur-xl opacity-50 mix-blend-overlay" />
                {feature.icon}
              </motion.div>
              <div className="flex-1 text-center md:text-left md:[&]:nth-child(even):text-right w-full">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    { name: "Rahul Sharma", location: "Hyderabad", rating: 5, text: "Got my iPhone 15 screen replaced in just 25 minutes at my home. The technician was extremely professional and the new display is flawless.", avatar: "R", bg: "from-blue-500 to-cyan-500" },
    { name: "Priya Patel", location: "Bangalore", rating: 5, text: "Best repair service I've ever used. The lifetime warranty gives total peace of mind. Price was 30% lower than official center.", avatar: "P", bg: "from-emerald-400 to-teal-500" },
    { name: "Amit Kumar", location: "Mumbai", rating: 5, text: "MacBook battery replacement was quick. I didn't have to leave my desk, they came to my office and fixed it right there!", avatar: "A", bg: "from-violet-500 to-purple-500" },
  ];
  return (
    <section className="py-24 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-3xl md:text-5xl font-black text-slate-900 mb-16">Loved by thousands</motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={i} className="premium-card p-8 relative group" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} whileHover={{ y: -5 }}>
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-600 text-base mb-8 leading-relaxed relative z-10">"{t.text}"</p>
              <div className="flex items-center gap-4 relative z-10 mt-auto pt-6 border-t border-slate-100">
                <div className={`w-10 h-10 bg-gradient-to-br ${t.bg} text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md`}>{t.avatar}</div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center justify-center md:justify-start gap-3">
          <Wrench className="w-5 h-5 text-blue-600" /> Premium Apple Repairs
        </h3>
        <div className="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed font-medium">
          <p>SISOLIONLINE SERVICES LLP (FixSwift.in) provides absolute premium Doorstep Apple Repair Services across major metropolitan cities in India including Hyderabad, Bangalore, Mumbai, Pune, Chennai, Delhi NCR, and many more.</p>
          <p>We bring over 17+ years of specialized Apple hardware experience. Our mission is to make the process of iPhone, iPad, Apple Watch & MacBook repairs completely transparent, incredibly fast, and wonderfully convenient through our direct-to-doorstep model.</p>
          <p>We execute repairs right in front of you, ensuring your data never leaves your sight. Have suggestions? Reach out directly at <a href="mailto:Repair@FixSwift.in" className="text-blue-600 hover:text-blue-800 transition-colors font-bold underline">Repair@FixSwift.in</a>.</p>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="bg-white pt-10 pb-20 text-center">
        <h1 className="text-5xl font-black text-slate-900 mb-4">Who We Are</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">India's most trusted premium doorstep repair service for Apple devices.</p>
      </div>
      <TrustFeatures />
      <Testimonials />
      <AboutSection />
    </motion.div>
  );
}
