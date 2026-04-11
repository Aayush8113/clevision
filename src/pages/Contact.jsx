import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle, Globe, Instagram, Twitter, Copy } from 'lucide-react';
import gsap from 'gsap';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: location.state?.subject || '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    gsap.fromTo('.contact-anim', 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      }
    );
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Identity required';
    if (!formData.email.trim()) {
      newErrors.email = 'Digital address required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid syntax';
    }
    if (!formData.message.trim()) newErrors.message = 'Statement required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const loadingToast = toast.loading('Recording identity...');
      setTimeout(() => {
        toast.success('Dialogue initialized.', { id: loadingToast });
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      }, 1500);
    } else {
      toast.error('Statement incomplete.');
      setErrors(validationErrors);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText('Ahmedabad, GS Highway');
    toast.success('Address copied to ledger');
  };

  return (
    <div className="relative bg-bg-base min-h-screen pt-32 md:pt-44 pb-32 transition-colors duration-500 overflow-hidden">
      {/* Ambient Premium Glow */}
      <div className="absolute top-0 right-0 w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-amber-500/5 md:bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-text-main/5 rounded-full blur-[120px] pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-20">
          {/* Brand Info */}
          <div className="lg:w-1/3 space-y-12 md:space-y-16">
            <div className="contact-anim">
              <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Communication</span>
              <h1 className="text-text-main text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] mb-10">
                START A<br/><span className="text-text-dim">DIALOGUE.</span>
              </h1>
              <p className="text-text-dim font-medium text-base md:text-lg leading-relaxed">
                Whether you seek an acquisition or a consultation, our desk is open for the discerning.
              </p>
            </div>

            <div className="space-y-6 md:space-y-8 contact-anim">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-bg-card border border-border-dim flex items-center justify-center text-text-main group-hover:bg-text-main group-hover:text-bg-base transition-all duration-500 shadow-sm">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-text-dim mb-1">Direct Line</p>
                  <p className="font-bold text-text-main text-sm md:text-base">+91 8000 900 100</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-bg-card border border-border-dim flex items-center justify-center text-text-main group-hover:bg-text-main group-hover:text-bg-base transition-all duration-500 shadow-sm">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-text-dim mb-1">Inquiry Ledger</p>
                  <p className="font-bold text-text-main text-sm md:text-base">atlas@urbannest.ai</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer" onClick={copyAddress}>
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-bg-card border border-border-dim flex items-center justify-center text-text-main group-hover:bg-amber-500 group-hover:text-zinc-950 transition-all duration-500 shadow-sm">
                  <MapPin size={22} className="group-hover:hidden" />
                  <Copy size={22} className="hidden group-hover:block" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-text-dim mb-1">Headquarters</p>
                  <p className="font-bold text-text-main text-sm md:text-base text-balance">Ahmedabad, GS Highway</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-10 border-t border-border-dim contact-anim">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-border-dim flex items-center justify-center hover:bg-text-main hover:text-bg-base transition-all text-text-dim">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-border-dim flex items-center justify-center hover:bg-text-main hover:text-bg-base transition-all text-text-dim">
                <Twitter size={18} />
              </a>
              <a href="https://urbannest.ai" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-border-dim flex items-center justify-center hover:bg-text-main hover:text-bg-base transition-all text-text-dim">
                <Globe size={18} />
              </a>
            </div>
          </div>

          <div className="lg:w-2/3 contact-anim">
            <div className="bg-bg-card p-8 md:p-16 lg:p-20 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl dark:shadow-none border border-border-dim relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              {isSubmitted ? (
                <div className="text-center py-10 animate-in zoom-in duration-700">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-text-main text-amber-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl">
                    <CheckCircle size={40} md:size={48} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-text-main mb-6 tracking-tighter uppercase leading-none">Message Recorded.</h3>
                  <p className="text-text-dim text-base md:text-lg mb-10 text-balance">Thank you for your interest. A consultant will reach out to schedule a private presentation shortly.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-amber-500 font-bold uppercase tracking-widest text-[10px] md:text-xs hover:underline"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="md:col-span-1">
                    <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-text-dim mb-3 md:mb-4">Your Identity</label>
                    <input 
                      type="text" 
                      placeholder="Name" 
                      className={`input-luxe ${errors.name ? 'border-red-500 ring-1 ring-red-100' : ''}`}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    {errors.name && <p className="text-red-500 text-[9px]  mt-2 font-bold uppercase tracking-widest">{errors.name}</p>}
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-text-dim mb-3 md:mb-4">Digital Address</label>
                    <input 
                      type="email" 
                      placeholder="Email" 
                      className={`input-luxe ${errors.email ? 'border-red-500 ring-1 ring-red-100' : ''}`}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    {errors.email && <p className="text-red-500 text-[9px] mt-2 font-bold uppercase tracking-widest">{errors.email}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-text-dim mb-3 md:mb-4">Focus of Interest</label>
                    <input 
                      type="text" 
                      placeholder="Subject" 
                      className="input-luxe"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-text-dim mb-3 md:mb-4">Detailed Statement</label>
                    <textarea 
                      rows={5}
                      placeholder="How can our vision serve yours?" 
                      className={`input-luxe resize-none ${errors.message ? 'border-red-500 ring-1 ring-red-100' : ''}`}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-[9px] mt-2 font-bold uppercase tracking-widest">{errors.message}</p>}
                  </div>

                  <div className="md:col-span-2 pt-4 md:pt-6">
                    <button type="submit" className="w-full btn-luxe flex items-center justify-center gap-4 py-4 md:py-5 shadow-2xl shadow-zinc-950/20 text-xs md:text-sm">
                      Submit Presentation Request <Send size={18} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
