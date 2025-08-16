import { useEffect, useMemo, useState } from 'react';
import { FiUser, FiMail, FiMessageSquare, FiShield, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

const fieldVariants = {
  initial: { opacity: 0, y: 10 },
  in: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  })
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simple validation
  const errors = useMemo(() => {
    const e = {};
    if (touched.name && formData.name.trim().length < 2) e.name = 'Please enter your full name.';
    if (touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) e.email = 'Enter a valid email address.';
    if (touched.message && formData.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';
    return e;
  }, [formData, touched]);

  const isValid = formData.name && formData.email && formData.message &&
                  Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    setIsSubmitting(true);
    setProgress(0);

    // Faux progress
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / 1200) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsSubmitting(false);
          setSubmitSuccess(true);
          setFormData({ name: '', email: '', message: '' });
          setTouched({ name: false, email: false, message: false });
          const t = setTimeout(() => setSubmitSuccess(false), 4800);
          return () => clearTimeout(t);
        }, 200);
      }
    }, 80);
  };

  // 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useTransform(y, [-40, 40], [8, -8]);
  const rY = useTransform(x, [-40, 40], [-8, 8]);

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const onMouseLeave = () => {
    x.set(0); y.set(0);
  };

  return (
    <section className="relative">
      {/* Ambient candy-glow border */}
      <div className="absolute -inset-[1px] rounded-[28px] pointer-events-none opacity-70">
        <div className="absolute -inset-[1px] rounded-[28px] bg-[conic-gradient(from_0deg_at_50%_50%,#00cfff33,transparent_30%,#9b5cff33,transparent_60%,#00cfff33)] blur-xl" />
      </div>

      <motion.div
        style={{ rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-gradient-to-br from-slate-900/55 via-gray-800/55 to-black/70 backdrop-blur-2xl rounded-[26px] p-8 sm:p-10 border border-white/10 shadow-[0_0_25px_#00CFFF33]"
      >
        {/* Soft floating blobs for depth */}
        <span className="pointer-events-none absolute -left-10 -top-10 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl" />
        <span className="pointer-events-none absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />

        {/* Top progress bar while sending */}
        <AnimatePresence>
          {isSubmitting && (
            <motion.div
              key="progress"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              exit={{ scaleX: 0 }}
              style={{ transformOrigin: '0% 50%' }}
              className="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-cyan-400 via-[#00CFFF] to-fuchsia-500"
            />
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex items-start sm:items-center gap-3 mb-4">
          <div className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-black shadow-[0_0_20px_#00CFFF55] ring-1 ring-white/10">
            <FiShield className="text-xl" />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Connect with <span className="text-primary">Cloknet</span>
            </h2>
            <p className="text-lighttext mt-1 text-sm">
              Have a question, feedback, or partnership idea? Your next step to online freedom starts here.
            </p>
          </div>
        </div>

        {/* Success toast */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-green-800/30 text-green-300 p-4 rounded-lg mb-6 text-sm border border-green-500/20 shadow-md"
              role="status"
            >
              <div className="flex items-center gap-2">
                <FiCheckCircle />
                <span>Thank you for your message! We’ll reach out to you soon.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6" noValidate>
          {/* Name */}
          <motion.div variants={fieldVariants} initial="initial" animate={fieldVariants.in(0)}>
            <Label htmlFor="name">Your Name</Label>
            <FieldWrapper icon={<FiUser className="text-gray-500" />} status={touched.name ? (errors.name ? 'error' : 'ok') : 'idle'}>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="peer bg-transparent text-white placeholder:text-transparent w-full pl-10 pr-11 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/70"
                placeholder="John Doe"
                aria-invalid={!!errors.name}
                aria-describedby="name-help"
                required
              />
              <FloatingPlaceholder>John Doe</FloatingPlaceholder>
            </FieldWrapper>
            <FieldHint id="name-help" error={errors.name} />
          </motion.div>

          {/* Email */}
          <motion.div variants={fieldVariants} initial="initial" animate={fieldVariants.in(1)}>
            <Label htmlFor="email">Email Address</Label>
            <FieldWrapper icon={<FiMail className="text-gray-500" />} status={touched.email ? (errors.email ? 'error' : 'ok') : 'idle'}>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="peer bg-transparent text-white placeholder:text-transparent w-full pl-10 pr-11 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/70"
                placeholder="you@securemail.com"
                aria-invalid={!!errors.email}
                aria-describedby="email-help"
                required
              />
              <FloatingPlaceholder>you@securemail.com</FloatingPlaceholder>
            </FieldWrapper>
            <FieldHint id="email-help" error={errors.email} />
          </motion.div>

          {/* Message */}
          <motion.div variants={fieldVariants} initial="initial" animate={fieldVariants.in(2)}>
            <Label htmlFor="message">Message</Label>
            <FieldWrapper icon={<FiMessageSquare className="text-gray-500" />} status={touched.message ? (errors.message ? 'error' : 'ok') : 'idle'}>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="5"
                className="peer bg-transparent text-white placeholder:text-transparent w-full pl-10 pr-11 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/70 resize-none"
                placeholder="Tell us how we can help you stay private and free online..."
                aria-invalid={!!errors.message}
                aria-describedby="message-help"
                required
              />
              <FloatingPlaceholder>Tell us how we can help…</FloatingPlaceholder>
            </FieldWrapper>
            <div className="flex items-center justify-between">
              <FieldHint id="message-help" error={errors.message} />
              <span className="text-[11px] text-lighttext/70">{formData.message.length}/1000</span>
            </div>
          </motion.div>

          {/* Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !isValid}
            whileHover={{ y: isSubmitting || !isValid ? 0 : -1 }}
            whileTap={{ scale: isSubmitting || !isValid ? 1 : 0.98 }}
            className={`group relative inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all duration-300 shadow-md overflow-hidden
              ${isSubmitting || !isValid ? 'bg-gray-700 text-white cursor-not-allowed' : 'bg-primary text-black hover:text-black'}`}
            aria-busy={isSubmitting}
          >
            {/* shimmer */}
            {!isSubmitting && isValid && (
              <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="absolute inset-y-0 -left-1 w-1/3 skew-x-12 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-[shimmer_1.8s_ease-in-out_infinite]" />
              </span>
            )}

            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.3 0 0 5.3 0 12h4z" />
                </svg>
                Sending…
              </span>
            ) : (
              <>
                <FiSend />
                <span>Send Secure Message</span>
              </>
            )}
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 text-xs text-lighttext text-center opacity-80"
        >
          🔐 We respect your privacy. Every message is encrypted and confidential.
        </motion.div>

        {/* Subtle particles */}
        <Particles />
      </motion.div>

      {/* local keyframes */}
      <style>{`
        @keyframes shimmer { 0%{ transform: translateX(-100%);} 100%{ transform: translateX(200%);} }
        @keyframes floaty { 0%{ transform: translateY(0) scale(1);} 50%{ transform: translateY(-6px) scale(1.02);} 100%{ transform: translateY(0) scale(1);} }
      `}</style>
    </section>
  );
};

/* ---------- small building blocks ---------- */

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-lighttext mb-1">
    {children}
  </label>
);

const FieldWrapper = ({ icon, children, status = 'idle' }) => (
  <div className="relative group">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{icon}</div>

    {/* focus ring glow */}
    <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 group-focus-within:ring-primary/60 transition" />

    {/* status icon */}
    <div className="absolute right-3 top-1/2 -translate-y-1/2">
      {status === 'ok' && <FiCheckCircle className="text-emerald-400" />}
      {status === 'error' && <FiAlertCircle className="text-rose-400" />}
    </div>

    {children}
  </div>
);

const FieldHint = ({ id, error }) => (
  <div id={id} className="min-h-[18px] mt-1 text-[12px]">
    <AnimatePresence mode="wait">
      {error ? (
        <motion.span
          key="err"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="text-rose-300/90"
        >
          {error}
        </motion.span>
      ) : (
        <motion.span
          key="ok"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="text-transparent"
        >
          .
        </motion.span>
      )}
    </AnimatePresence>
  </div>
);

const FloatingPlaceholder = ({ children }) => (
  <span className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-200
    peer-placeholder-shown:opacity-100 peer-placeholder-shown:translate-y-0
    peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:opacity-90">
    {children}
  </span>
);

/* ---------- tiny particle layer ---------- */
const Particles = () => {
  // lightweight, static decorative dots
  const dots = Array.from({ length: 8 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => (
        <span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/20"
          style={{
            left: `${(i * 13) % 100}%`,
            top: `${(i * 23) % 100}%`,
            animation: `floaty ${3 + (i % 4)}s ease-in-out ${i * 0.2}s infinite`
          }}
        />
      ))}
    </div>
  );
};

export default ContactForm;
