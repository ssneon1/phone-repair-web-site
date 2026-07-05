import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wrench, Phone, MapPin, Search, Menu, X, Mail, MessageCircle } from "lucide-react";

function EMIBanner() {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <motion.div 
      initial={{ y: -100 }} animate={{ y: 0 }} 
      className="fixed top-0 left-0 right-0 z-[60] bg-slate-900 text-white text-center py-2.5 text-sm font-medium shadow-md flex items-center justify-center gap-2"
    >
      <Sparkles className="w-4 h-4 text-blue-400" /> Ask Our Executive for No Cost EMI Offer
      <button onClick={() => setShow(false)} className="ml-3 hover:bg-white/20 rounded-full p-1 transition-colors">✕</button>
    </motion.div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState("Hyderabad");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "top-0 glass-nav py-3" : "py-5 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-md group-hover:bg-blue-600 transition-colors">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">Fix<span className="text-blue-600">Swift</span></span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className={`text-sm font-semibold transition-colors ${location.pathname === '/' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>Home</Link>
            <Link to="/about" className={`text-sm font-semibold transition-colors ${location.pathname === '/about' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>Who we are</Link>
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">Offers</a>
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">Blog</a>
            
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            
            <a href="tel:7600997355" className="flex items-center gap-2 text-slate-900 font-bold text-sm hover:text-blue-600 transition-colors">
              <Phone className="w-4 h-4 text-blue-600" /> 76009 97355
            </a>
            
            <div className="flex items-center gap-1.5 text-slate-600 text-sm font-medium cursor-pointer hover:text-slate-900 transition-colors bg-slate-100 px-3 py-1.5 rounded-full" onClick={() => setCity(city === "Hyderabad" ? "Pune" : "Hyderabad")}>
              <MapPin className="w-4 h-4 text-blue-600" /> {city}
            </div>
          </div>
          
          <button className="lg:hidden text-slate-900 p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            <div className="px-6 py-4 space-y-4">
              <Link to="/" className="block py-2 text-slate-700 font-semibold text-sm">Home</Link>
              <Link to="/about" className="block py-2 text-slate-700 font-semibold text-sm">Who we are</Link>
              <a href="#" className="block py-2 text-slate-700 font-semibold text-sm">Offers</a>
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                <a href="tel:7600997355" className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Phone className="w-4 h-4 text-blue-600" /> 76009 97355
                </a>
                <div className="flex items-center gap-2 text-slate-600 font-medium text-sm" onClick={() => setCity(city === "Hyderabad" ? "Pune" : "Hyderabad")}>
                  <MapPin className="w-4 h-4 text-blue-600" /> {city}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-200 relative overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 text-center md:text-left">
            <Link to="/" className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tight">Fix<span className="text-blue-600">Swift</span></span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto md:mx-0 mb-8">
              India's most trusted premium doorstep repair service for Apple devices. Expert technicians, lifetime warranty, zero hassle.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              {[
                { icon: <MessageCircle className="w-4 h-4" />, bg: "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-500 hover:text-white" },
                { label: "IG", bg: "bg-pink-50 text-pink-600 border-pink-100 hover:bg-pink-500 hover:text-white" },
                { label: "𝕏", bg: "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-800 hover:text-white" }
              ].map((social, i) => (
                <a key={i} href="#" className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border transition-all ${social.bg}`}>
                  {social.icon || social.label}
                </a>
              ))}
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-900">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors">Book Repair</Link></li>
              <li><Link to="/about" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors">About Us</Link></li>
              <li><a href="#" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors">Cities We Serve</a></li>
              <li><a href="#" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-900">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+917600997355" className="inline-flex items-center gap-3 text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors group">
                  <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors"><Phone className="w-3.5 h-3.5" /></span>
                  +91 76009 97355
                </a>
              </li>
              <li>
                <a href="mailto:Repair@FixSwift.in" className="inline-flex items-center gap-3 text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors group">
                  <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors"><Mail className="w-3.5 h-3.5" /></span>
                  Repair@FixSwift.in
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center text-slate-500 text-xs font-medium">
          <p>© 2026 FixSwift.in — SISOLIONLINE SERVICES LLP. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Layout() {
  return (
    <>
      <EMIBanner />
      <Navbar />
      <main className="min-h-screen pt-28 pb-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
