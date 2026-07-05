import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { devices, DeviceCategory, DeviceModel, DeviceIssue } from "../data/devices";
import { Smartphone, Tablet, Laptop, Watch, ChevronLeft, Check, Star, Phone, MapPin, Zap, Wrench, ArrowRight } from "lucide-react";

// --- 3D Hero Image ---
function Hero3DImage() {
  return (
    <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center perspective-1000">
      <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-100 rounded-full blur-[100px] mix-blend-multiply" />
      <motion.div animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-indigo-100 rounded-full blur-[80px] mix-blend-multiply" />
      
      <motion.div className="relative z-10 float-anim" style={{ transformStyle: "preserve-3d" }}>
        <div className="relative w-[300px] h-[400px] lg:w-[360px] lg:h-[480px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden transform rotate-y-[-15deg] rotate-x-[10deg]">
          <div className="absolute inset-2 bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800">
            <img src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&h=1000&fit=crop" alt="iPhone Display" className="w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-indigo-500/10 pointer-events-none" />
          </div>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-900 rounded-full z-20 border border-slate-800 shadow-inner" />
        </div>
        
        <motion.div className="absolute -bottom-10 -right-5 lg:-bottom-12 lg:-right-12 w-[160px] h-[320px] lg:w-[180px] lg:h-[360px] bg-white rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
          <div className="absolute inset-1.5 bg-slate-900 rounded-[1.5rem] overflow-hidden border border-slate-800">
            <img src="https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600&h=1200&fit=crop" alt="iPhone" className="w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent" />
          </div>
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-slate-900 rounded-full z-20 shadow-inner" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// --- Hero Device Selector ---
function HeroDeviceSelector({ onSelect, selected }: { onSelect: (device: DeviceCategory) => void; selected: string | null }) {
  const deviceList = [
    { id: "iphone", name: "iPhone", icon: <Smartphone className="w-6 h-6" /> },
    { id: "apple-watch", name: "iWatch", icon: <Watch className="w-6 h-6" /> },
    { id: "ipad", name: "iPad", icon: <Tablet className="w-6 h-6" /> },
    { id: "macbook", name: "MacBook", icon: <Laptop className="w-6 h-6" /> },
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-6 lg:p-8 relative overflow-hidden bg-white">
      <div className="bg-slate-50 py-2.5 px-4 rounded-xl inline-block w-full text-center mb-6 border border-slate-100">
        <p className="text-slate-600 font-bold text-sm flex items-center justify-center gap-2"><Zap className="w-4 h-4 text-blue-500 fill-blue-500" /> Select your device to get started now!</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {deviceList.map((device) => (
          <motion.button 
            key={device.id} 
            onClick={() => onSelect(devices.find(d => d.id === device.id)!)} 
            className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all font-bold text-base group relative overflow-hidden ${selected === device.id ? "border-blue-500 bg-blue-50 text-blue-700 shadow-inner" : "border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50"}`} 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
          >
            <span className={`relative z-10 transition-colors ${selected === device.id ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500"}`}>{device.icon}</span> 
            <span className="relative z-10">{device.name}</span>
          </motion.button>
        ))}
      </div>
      <button className="w-full btn-primary py-4 flex items-center justify-center gap-2 group text-lg">
        Confirm & Proceed <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}


// --- Device Flow Component ---
function DeviceFlow({ initialDevice, onReset, onBook }: { initialDevice: DeviceCategory | null; onReset: () => void; onBook: (data: any) => void }) {
  const [step, setStep] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState<DeviceCategory | null>(initialDevice);
  const [selectedModel, setSelectedModel] = useState<DeviceModel | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<DeviceIssue | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const steps = ["Device", "Model", "Issue", "Quote"];

  const handleBack = () => { if (step > 0) setStep(step - 1); };
  const resetFlow = () => { setStep(0); setSelectedDevice(null); setSelectedModel(null); setSelectedIssue(null); setPhoneNumber(""); setShowPhoneInput(false); onReset(); };

  const handleBookNow = () => {
    if (phoneNumber.length >= 10) {
      const ticketNumber = Math.floor(10000 + Math.random() * 90000).toString();
      onBook({
        device: selectedDevice?.name || "",
        model: selectedModel?.name || "",
        issue: selectedIssue?.name || "",
        price: selectedIssue?.price || "",
        phone: phoneNumber,
        ticketNumber,
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="premium-card p-6 lg:p-8 bg-white relative overflow-hidden">
      
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center relative">
              <motion.div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border ${i <= step ? "bg-slate-900 text-white border-transparent" : "bg-slate-50 text-slate-400 border-slate-200"}`} animate={i === step ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 0.4 }}>
                {i < step ? <Check className="w-5 h-5" /> : i + 1}
              </motion.div>
              <span className={`text-[10px] mt-2 font-bold uppercase tracking-wider ${i <= step ? "text-slate-900" : "text-slate-400"}`}>{s}</span>
            </div>
            {i < steps.length - 1 && <div className="flex-1 h-0.5 mx-2 bg-slate-100 relative overflow-hidden rounded-full">
              {i < step && <motion.div className="absolute inset-0 bg-slate-900" initial={{ x: "-100%" }} animate={{ x: 0 }} transition={{ duration: 0.4 }} />}
            </div>}
          </div>
        ))}
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <HeroDeviceSelector onSelect={(d) => { setSelectedDevice(d); setStep(1); }} selected={null} />
            </motion.div>
          )}

          {step === 1 && selectedDevice && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">Select your <span className="text-blue-600">{selectedDevice.name}</span></h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                {selectedDevice.models.map((model) => (
                  <motion.button key={model.id} onClick={() => { setSelectedModel(model); setStep(2); }} className="p-4 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-slate-50 transition-all text-left group bg-white" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <div className="w-full aspect-square bg-slate-50 rounded-xl mb-3 overflow-hidden relative border border-slate-100 transition-colors">
                      <img src={model.image} alt={model.name} className="w-full h-full object-cover mix-blend-darken" loading="lazy" />
                    </div>
                    <p className="font-bold text-sm text-slate-700 group-hover:text-blue-600 transition-colors">{model.name}</p>
                  </motion.button>
                ))}
              </div>
              <button onClick={handleBack} className="flex items-center gap-1 text-slate-500 hover:text-slate-900 font-bold text-sm transition-colors"><ChevronLeft className="w-4 h-4" /> Back</button>
            </motion.div>
          )}

          {step === 2 && selectedModel && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200 flex-shrink-0 p-1">
                  <img src={selectedModel.image} alt={selectedModel.name} className="w-full h-full object-cover mix-blend-darken" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedModel.name}</h3>
                  <p className="text-slate-500 text-xs mt-0.5 font-medium">Select the issue you're facing</p>
                </div>
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {selectedModel.issues.map((issue) => (
                  <motion.button key={issue.id} onClick={() => { setSelectedIssue(issue); setStep(3); }} className="w-full p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex items-center justify-between group bg-white shadow-sm hover:shadow-md" whileHover={{ x: 4 }}>
                    <div>
                      <p className="font-bold text-slate-800 text-sm group-hover:text-blue-700">{issue.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{issue.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <p className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">{issue.price}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
              <button onClick={handleBack} className="flex items-center gap-1 text-slate-500 hover:text-slate-900 font-bold text-sm transition-colors"><ChevronLeft className="w-4 h-4" /> Back</button>
            </motion.div>
          )}

          {step === 3 && selectedModel && selectedIssue && !showPhoneInput && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6 pt-4">
              <motion.div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto shadow-xl relative" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}>
                <Check className="w-10 h-10 text-white relative z-10" />
              </motion.div>
              <div>
                <h3 className="text-3xl font-black text-slate-900">Your Quote</h3>
                <p className="text-slate-500 text-sm mt-2 font-medium">Estimated cost for professional repair</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-inner">
                <div className="flex items-center justify-center gap-4 mb-5 pb-5 border-b border-slate-200">
                  <div className="text-center">
                    <p className="font-bold text-slate-900 text-lg">{selectedModel.name}</p>
                    <p className="text-sm text-blue-600 font-bold mt-1">{selectedIssue.name}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Estimated Price</p>
                  <p className="text-5xl font-black text-slate-900 inline-block">{selectedIssue.price}</p>
                  <p className="text-xs text-slate-500 mt-3 font-medium">*Final price may vary after physical inspection</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button onClick={() => setShowPhoneInput(true)} className="flex-1 btn-primary py-4 text-sm" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Book Repair Now</motion.button>
                <motion.button className="flex-1 btn-outline py-4" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Call for Queries</motion.button>
              </div>
              <button onClick={resetFlow} className="text-slate-500 hover:text-slate-900 font-bold text-sm transition-colors pt-2">Start Over</button>
            </motion.div>
          )}

          {step === 3 && selectedModel && selectedIssue && showPhoneInput && (
            <motion.div key="phoneStep" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="text-center pt-2">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5 text-blue-600">
                  <Phone className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Share Contact Details</h3>
                <p className="text-slate-500 text-sm mt-2 font-medium">We'll send your quote via Call or WhatsApp instantly</p>
              </div>
              <div className="space-y-5">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-700 text-sm">{selectedModel.name} Repair</p>
                    <p className="font-black text-slate-900">{selectedIssue.price}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all bg-white">
                    <span className="px-4 py-4 bg-slate-50 text-slate-500 font-bold text-sm border-r border-slate-200">+91</span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="Enter 10-digit number"
                      className="flex-1 px-4 py-4 outline-none text-slate-900 font-bold bg-transparent placeholder-slate-400"
                      maxLength={10}
                    />
                  </div>
                </div>
                <motion.button
                  onClick={handleBookNow}
                  disabled={phoneNumber.length < 10}
                  className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${phoneNumber.length >= 10 ? "btn-primary" : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"}`}
                  whileHover={phoneNumber.length >= 10 ? { scale: 1.02 } : {}}
                  whileTap={phoneNumber.length >= 10 ? { scale: 0.98 } : {}}
                >
                  Get Quote & Book Appointment
                </motion.button>
                <button onClick={() => setShowPhoneInput(false)} className="w-full text-slate-500 hover:text-slate-900 font-bold text-sm transition-colors flex items-center justify-center gap-1 pt-2">
                  <ChevronLeft className="w-4 h-4" /> Back to Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// --- Features Bar ---
function FeaturesBar() {
  const features = [
    { icon: <Star className="w-6 h-6 text-amber-500" />, title: "4.9/5 Rating" },
    { icon: <Phone className="w-6 h-6 text-blue-500" />, title: "Instant Booking" },
    { icon: <MapPin className="w-6 h-6 text-indigo-500" />, title: "Doorstep Repair" },
    { icon: <Check className="w-6 h-6 text-emerald-500" />, title: "Lifetime Warranty" },
    { icon: <Zap className="w-6 h-6 text-orange-500" />, title: "Best Prices" },
    { icon: <Wrench className="w-6 h-6 text-slate-700" />, title: "Expert Techs" },
  ];
  return (
    <section className="py-12 border-y border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((f, i) => (
            <motion.div key={i} className="flex flex-col items-center justify-center gap-3 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group cursor-default shadow-sm border border-slate-100" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="bg-white p-3 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <p className="font-bold text-slate-700 text-xs uppercase tracking-wider text-center">{f.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- How It Works ---
function HowItWorks() {
  const steps = [
    { num: "1", icon: <Smartphone className="w-12 h-12 text-blue-600" />, title: "Select Device", desc: "Choose your Apple device and specify the issue you're facing." },
    { num: "2", icon: <Zap className="w-12 h-12 text-amber-500" />, title: "Instant Quote", desc: "Get a transparent, upfront price estimation immediately." },
    { num: "3", icon: <Wrench className="w-12 h-12 text-slate-700" />, title: "Doorstep Repair", desc: "Our expert technician arrives and fixes it right in front of you." },
  ];
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-black text-slate-900 mb-4">How it works</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">Three simple steps to bring your Apple device back to life.</motion.p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-200" />
          
          {steps.map((step, i) => (
            <motion.div key={i} className="relative group text-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}>
              <div className="w-24 h-24 mx-auto bg-white rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-slate-200 shadow-md group-hover:border-blue-300 transition-colors">
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {step.num}
                </div>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm font-medium">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Stats ---
function Stats() {
  const stats = [
    { value: "19+", label: "Cities Covered" },
    { value: "3L+", label: "Devices Repaired" },
    { value: "4.9★", label: "Customer Rating" },
    { value: "500+", label: "Expert Technicians" },
  ];
  return (
    <section className="py-24 relative overflow-hidden bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div key={i} className="text-center group p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-5xl md:text-6xl font-black text-slate-900 mb-4 group-hover:scale-110 transition-transform duration-500">{stat.value}</p>
              <p className="text-slate-500 font-bold text-sm md:text-base uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Home() {
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState<DeviceCategory | null>(null);

  const handleBook = (bookingData: any) => {
    navigate("/thank-you", { state: bookingData });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero Section */}
      <section className="pt-20 lg:pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <Hero3DImage />
              <div className="max-w-lg mx-auto lg:mx-0 mt-10 text-center lg:text-left relative">
                <div className="inline-flex items-center gap-2 bg-white text-slate-800 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-slate-200 shadow-sm">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Lifetime Warranty • Lowest Price
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
                  India's Premium <br/><span className="text-blue-600">Apple Repairs</span> <br/>at your doorstep
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed font-medium mb-8 max-w-md mx-auto lg:mx-0">Most trusted iPhone, iPad, iWatch & MacBook repair service. Expert repair at your location, instantly.</p>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="relative">
              {selectedDevice ? (
                <DeviceFlow initialDevice={selectedDevice} onReset={() => setSelectedDevice(null)} onBook={handleBook} />
              ) : (
                <HeroDeviceSelector onSelect={setSelectedDevice} selected={null} />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <FeaturesBar />
      <Stats />
    </motion.div>
  );
}
