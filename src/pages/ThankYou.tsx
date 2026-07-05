import { motion } from "framer-motion";
import { Wrench, Phone, Mail, MessageCircle, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state as { phone: string; ticketNumber: string; device: string; };

  // If no booking data, redirect home
  if (!booking) {
    navigate("/");
    return null;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto premium-card p-8 lg:p-12 relative overflow-hidden mt-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      {/* Logo */}
      <div className="flex justify-center mb-8 relative z-10">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
          <Wrench className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 text-center mb-6">Thank You</h1>
      
      <p className="text-center text-slate-600 mb-8 relative z-10">
        Your quote will be sent via Call/WhatsApp to this number : <br/>
        <span className="font-bold text-blue-600 text-xl tracking-wider mt-2 inline-block">+91 {booking.phone}</span>
      </p>
      
      {/* Ticket Number */}
      <div className="text-center mb-10 relative z-10">
        <p className="text-slate-500 mb-4 font-bold uppercase tracking-widest text-xs">Your ticket number</p>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-block bg-slate-50 border border-slate-200 rounded-2xl px-10 py-5 shadow-inner"
        >
          <p className="text-5xl font-black text-slate-900 tracking-[0.4em]">{booking.ticketNumber.split("").join(" ")}</p>
        </motion.div>
        <p className="text-slate-500 text-xs mt-4 font-medium">Keep this number handy for future reference.</p>
      </div>
      
      {/* Working Hours */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10 text-center mb-10 relative z-10 border-y border-slate-100 py-6">
        <div>
          <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">Working Hours</p>
          <p className="font-bold text-slate-900">10:00 AM - 09:00 PM</p>
        </div>
        <div className="hidden sm:block w-px bg-slate-200"></div>
        <div>
          <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">Support Timings</p>
          <p className="font-bold text-slate-900">09:00 AM - 09:00 PM</p>
        </div>
      </div>
      
      {/* Contact Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-10 relative z-10">
        <a href="tel:+917600997355" className="flex items-center gap-2 text-slate-700 font-bold text-sm hover:text-blue-600 transition-colors">
          <Phone className="w-5 h-5 text-blue-600" /> +91 76009 97355
        </a>
        <a href="mailto:Repair@FixSwift.in" className="flex items-center gap-2 text-slate-700 font-bold text-sm hover:text-blue-600 transition-colors">
          <Mail className="w-5 h-5 text-blue-600" /> Repair@FixSwift.in
        </a>
        <a href="#" className="flex items-center gap-2 text-slate-700 font-bold text-sm hover:text-blue-600 transition-colors">
          <MessageCircle className="w-5 h-5 text-blue-600" /> Instant Chat
        </a>
      </div>
      
      <button onClick={() => navigate("/")} className="flex items-center justify-center gap-2 mx-auto text-slate-500 font-bold text-base hover:text-slate-900 transition-colors relative z-10 group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Return to Home
      </button>
    </motion.div>
  );
}
