import React, { useRef, useState } from 'react'; // useRef aur useState add kiya
import { motion } from "motion/react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import emailjs from '@emailjs/browser'; // EmailJS import kiya

const Contact = () => {
  const form = useRef<HTMLFormElement>(null); // Form reference with type
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return; // Ensure form exists

    setIsSending(true);

    emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
    .then((result) => {
        setStatus("success");
        setIsSending(false);
        form.current?.reset(); // Use ref to reset form safely
        setTimeout(() => setStatus(""), 5000); // 5 sec baad message gayab
    }, (error) => {
        setStatus("error");
        setIsSending(false);
    });
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Side: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-sm label-editorial text-primary uppercase tracking-widest font-bold">Contact</h2>
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
                Let's build <br className="hidden sm:block" />
                something <span className="text-primary">extraordinary.</span>
              </h3>
            </div>

            <div className="space-y-8">
              {[
                { 
                  icon: Mail, 
                  label: "Email Me", 
                  value: "alihassan.fullstack.dev@gmail.com", 
                  href: "mailto:alihassan.fullstack.dev@gmail.com" 
                },
                { 
                  icon: Phone, 
                  label: "Call Me", 
                  value: "+92 301 6159800", 
                  href: "tel:+923016159800" 
                },
                { 
                  icon: Linkedin, 
                  label: "LinkedIn Profile", 
                  value: "Ali Hassan", 
                  href: "https://www.linkedin.com/in/ali-hassan-4880b3266/" 
                },
                { 
                  icon: Github, 
                  label: "GitHub Profile", 
                  value: "alihassan-code", 
                  href: "https://github.com/alihassanfullstackdev-code" 
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 group text-center sm:text-left">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full glass flex items-center justify-center text-primary group-hover:bg-primary/20 transition-all shrink-0">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm uppercase tracking-widest text-on-surface-variant mb-1 font-bold">{item.label}</p>
                    <a 
                      href={item.href} 
                      target={item.href.startsWith('http') ? "_blank" : undefined}
                      rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                      className="text-xl md:text-2xl font-bold hover:text-primary transition-colors break-all"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-6 md:p-10 rounded-[2rem] glow-shadow"
          >
            <form ref={form} className="space-y-6 md:space-y-8" onSubmit={sendEmail}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs label-editorial text-on-surface-variant uppercase font-bold tracking-widest">Full Name</label>
                  <input 
                    name="from_name" // Template Variable: {{from_name}}
                    required
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 text-on-surface transition-all placeholder:text-neutral-600" 
                    placeholder="Your Name" 
                    type="text" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs label-editorial text-on-surface-variant uppercase font-bold tracking-widest">Email Address</label>
                  <input 
                    name="from_email" // Template Variable: {{from_email}}
                    required
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 text-on-surface transition-all placeholder:text-neutral-600" 
                    placeholder="your@email.com" 
                    type="email" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs label-editorial text-on-surface-variant uppercase font-bold tracking-widest">Subject</label>
                <input 
                  name="subject" // Template Variable: {{subject}}
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 text-on-surface transition-all placeholder:text-neutral-600" 
                  placeholder="Project Inquiry" 
                  type="text" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs label-editorial text-on-surface-variant uppercase font-bold tracking-widest">Message</label>
                <textarea 
                  name="message" // Template Variable: {{message}}
                  required
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-0 py-3 text-on-surface transition-all placeholder:text-neutral-600 resize-none" 
                  placeholder="Tell me about your project..." 
                  rows={4}
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSending}
                className="w-full py-4 md:py-5 bg-gradient-to-r from-primary to-primary-container text-on-surface font-bold rounded-2xl hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSending ? "Sending Message..." : "Send Message"}
              </button>

              {/* Status Messages */}
              {status === "success" && (
                <p className="text-green-500 text-center font-bold text-sm">Message sent successfully! ✨</p>
              )}
              {status === "error" && (
                <p className="text-red-500 text-center font-bold text-sm">Oops! Something went wrong. ❌</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;