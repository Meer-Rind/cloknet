import { useEffect, useMemo, useState } from 'react';
import { FiUser, FiMail, FiMessageSquare, FiShield, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

/* ---------- PALETTE (single source of truth) ---------- */
const DeepBlue1 = '#021A2B';
const DeepBlue2 = '#053458';
const NeonBlue  = '#18A9FF';
const BurningBlue = '#00C7FF';

const ease = [0.22, 1, 0.36, 1];

const fieldVariants = {
  initial: { opacity: 0, y: 10 },
  in: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease }
  })
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simple validation (fast + clear)
  const errors = useMemo(() => {
    const e = {};
    if (touched.name && formData.name.trim().length < 2) e.name = 'Please enter your full name.';
    if (touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) e.email = 'Enter a valid email address.';
    if (touched.message && formData.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';
    return e;
  }, [formData, touched]);

  const isValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.message.trim() &&
    Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleBlur = (e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    setIsSubmitting(true);
    setProgress(0);

    // Faux progress (snappy + satisfying)
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

  // 3D tilt (premium feel)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useTransform(y, [-40, 40], [8, -8]);
  const rY = useTransform(x, [-40, 40], [-8, 8]);
  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <section className="relative">
      {/* Neon frame halo (conic, palette-only) */}
      <div className="absolute -inset-[1px] rounded-[28px] pointer-events-none" style={{ opacity: 0.7 }}>
        <div
          className="absolute -inset-[1px] rounded-[28px] blur-xl"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, ${BurningBlue}33, transparent 30%, ${NeonBlue}33, transparent 60%, ${BurningBlue}33)`
          }}
        />
      </div>

      <motion.div
        style={{ rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="relative rounded-[26px] p-6 sm:p-8 md:p-10"
        // glassy shell
        style={{
          background: `linear-gradient(160deg, ${DeepBlue2}CC, ${DeepBlue1}CC)`,
          border: `1px solid ${NeonBlue}26`,
          boxShadow: '0 0 25px rgba(0,199,255,0.20)',
          backdropFilter: 'blur(16px)'
        }}
      >
        {/* Ambient orbs (palette only) */}
        <span className="pointer-events-none absolute -left-10 -top-10 h-36 w-36 rounded-full blur-3xl"
              style={{ background: 'rgba(24,169,255,0.10)' }} />
        <span className="pointer-events-none absolute -right-12 bottom-0 h-40 w-40 rounded-full blur-3xl"
              style={{ background: 'rgba(0,199,255,0.10)' }} />

        {/* Top progress bar while sending */}
        <AnimatePresence>
          {isSubmitting && (
            <motion.div
              key="progress"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              exit={{ scaleX: 0 }}
              style={{
                transformOrigin: '0% 50%',
                background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`
              }}
              className="absolute left-0 top-0 h-[3px] w-full"
            />
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
          <div
            className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-2xl"
            style={{
              background: BurningBlue,
              color: DeepBlue1,
              boxShadow: '0 0 20px rgba(0,199,255,0.35)',
              border: `1px solid ${NeonBlue}26`
            }}
          >
            <FiShield className="text-xl" />
          </div>
          <div>
            {/* IMPORTANT headline in white */}
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: '#FFFFFF' }}>
              Connect with <span style={{ color: BurningBlue }}>Cloknet</span>
            </h2>
            <p className="mt-1 text-sm" style={{ color: NeonBlue }}>
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
              className="p-4 rounded-lg mb-6 text-sm"
              role="status"
              style={{
                background: `${DeepBlue1}B3`,
                border: `1px solid ${BurningBlue}4D`,
                color: '#FFFFFF',
                boxShadow: '0 12px 30px rgba(0,199,255,0.15)'
              }}
            >
              <div className="flex items-center gap-2">
                <FiCheckCircle style={{ color: BurningBlue }} />
                <span>Thank you for your message! We’ll reach out to you soon.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6" noValidate>
          {/* Name */}
          <motion.div variants={fieldVariants} initial="initial" animate={fieldVariants.in(0)}>
            <Label htmlFor="name">Your Name</Label>
            <FieldWrapper
              icon={<FiUser />}
              status={touched.name ? (errors.name ? 'error' : 'ok') : 'idle'}
            >
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="peer w-full pl-10 pr-11 py-3 rounded-xl outline-none"
                placeholder="John Doe"
                aria-invalid={!!errors.name}
                aria-describedby="name-help"
                // input skin
                style={{
                  background: 'transparent',
                  color: '#FFFFFF',
                  border: `1px solid ${NeonBlue}26`,
                  boxShadow: 'inset 0 0 0 1px rgba(0,199,255,0.06)'
                }}
                required
              />
              <FloatingPlaceholder>John Doe</FloatingPlaceholder>
            </FieldWrapper>
            <FieldHint id="name-help" error={errors.name} />
          </motion.div>

          {/* Email */}
          <motion.div variants={fieldVariants} initial="initial" animate={fieldVariants.in(1)}>
            <Label htmlFor="email">Email Address</Label>
            <FieldWrapper
              icon={<FiMail />}
              status={touched.email ? (errors.email ? 'error' : 'ok') : 'idle'}
            >
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="peer w-full pl-10 pr-11 py-3 rounded-xl outline-none"
                placeholder="you@securemail.com"
                aria-invalid={!!errors.email}
                aria-describedby="email-help"
                style={{
                  background: 'transparent',
                  color: '#FFFFFF',
                  border: `1px solid ${NeonBlue}26`,
                  boxShadow: 'inset 0 0 0 1px rgba(0,199,255,0.06)'
                }}
                required
              />
              <FloatingPlaceholder>you@securemail.com</FloatingPlaceholder>
            </FieldWrapper>
            <FieldHint id="email-help" error={errors.email} />
          </motion.div>

          {/* Message */}
          <motion.div variants={fieldVariants} initial="initial" animate={fieldVariants.in(2)}>
            <Label htmlFor="message">Message</Label>
            <FieldWrapper
              icon={<FiMessageSquare />}
              status={touched.message ? (errors.message ? 'error' : 'ok') : 'idle'}
            >
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="5"
                className="peer w-full pl-10 pr-11 py-3 rounded-xl outline-none resize-none"
                placeholder="Tell us how we can help you stay private and free online..."
                aria-invalid={!!errors.message}
                aria-describedby="message-help"
                style={{
                  background: 'transparent',
                  color: '#FFFFFF',
                  border: `1px solid ${NeonBlue}26`,
                  boxShadow: 'inset 0 0 0 1px rgba(0,199,255,0.06)'
                }}
                required
              />
              <FloatingPlaceholder>Tell us how we can help…</FloatingPlaceholder>
            </FieldWrapper>
            <div className="flex items-center justify-between">
              <FieldHint id="message-help" error={errors.message} />
              <span className="text-[11px]" style={{ color: `${NeonBlue}B3` }}>
                {formData.message.length}/1000
              </span>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !isValid}
            whileHover={{ y: isSubmitting || !isValid ? 0 : -1 }}
            whileTap={{ scale: isSubmitting || !isValid ? 1 : 0.98 }}
            className="group relative inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden"
            aria-busy={isSubmitting}
            style={{
              cursor: isSubmitting || !isValid ? 'not-allowed' : 'pointer',
              background: isSubmitting || !isValid ? `${DeepBlue2}99` : `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`,
              color: isSubmitting || !isValid ? '#FFFFFF' : DeepBlue1,
              boxShadow: isSubmitting || !isValid ? 'none' : '0 0 24px rgba(0,199,255,0.20)'
            }}
          >
            {/* shimmer on hover */}
            {!isSubmitting && isValid && (
              <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span
                  className="absolute inset-y-0 -left-1 w-1/3 skew-x-12"
                  style={{
                    background: `linear-gradient(90deg, ${NeonBlue}00, ${NeonBlue}55, ${NeonBlue}00)`,
                    animation: 'shimmer 1.8s ease-in-out infinite'
                  }}
                />
              </span>
            )}

            {isSubmitting ? (
              <span className="flex items-center gap-2">
                {/* spinner uses palette stroke */}
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke={NeonBlue} strokeWidth="4" fill="none" opacity="0.35" />
                  <path d="M4 12a8 8 0 018-8" fill="none" stroke={BurningBlue} strokeWidth="4" strokeLinecap="round" />
                </svg>
                <span style={{ color: '#FFFFFF' }}>Sending…</span>
              </span>
            ) : (
              <>
                <FiSend />
                <span>Send Secure Message</span>
              </>
            )}
          </motion.button>
        </form>

        {/* small reassurance line — readable but soft */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 text-center"
          style={{ color: `${NeonBlue}CC`, fontSize: 12 }}
        >
          🔐 We respect your privacy. Every message is encrypted and confidential.
        </motion.div>

        {/* decorative particles */}
        <Particles />
      </motion.div>

      {/* keyframes */}
      <style>{`
        @keyframes shimmer { 0%{ transform: translateX(-100%);} 100%{ transform: translateX(200%);} }
        @keyframes floaty { 0%{ transform: translateY(0) scale(1);} 50%{ transform: translateY(-6px) scale(1.02);} 100%{ transform: translateY(0) scale(1);} }
        @media (prefers-reduced-motion: reduce){
          *{ animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important; }
        }
      `}</style>
    </section>
  );
};

/* ---------- small building blocks (palette + white for important text) ---------- */

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium mb-1" style={{ color: '#FFFFFF' }}>
    {children}
  </label>
);

const FieldWrapper = ({ icon, children, status = 'idle' }) => {
  const rightIcon =
    status === 'ok' ? <FiCheckCircle style={{ color: BurningBlue }} /> :
    status === 'error' ? <FiAlertCircle style={{ color: NeonBlue }} /> : null;

  return (
    <div className="relative group">
      {/* left icon */}
      <div
        className="absolute left-3 top-1/2 -translate-y-1/2"
        style={{ color: `${NeonBlue}` }}
      >
        {icon}
      </div>

      {/* focus ring glow */}
      <span
        className="pointer-events-none absolute inset-0 rounded-xl transition"
        style={{ boxShadow: '0 0 0 0 rgba(0,199,255,0)', borderRadius: 12 }}
      />

      {/* right status icon */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightIcon}</div>

      {children}
    </div>
  );
};

const FieldHint = ({ id, error }) => (
  <div id={id} className="min-h-[18px] mt-1 text-[12px]">
    <AnimatePresence mode="wait">
      {error ? (
        <motion.span
          key="err"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          style={{ color: '#FFFFFF' }}
        >
          {error}
        </motion.span>
      ) : (
        <motion.span
          key="ok"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          style={{ color: 'transparent' }}
        >
          .
        </motion.span>
      )}
    </AnimatePresence>
  </div>
);

const FloatingPlaceholder = ({ children }) => (
  <span
    className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 text-sm transition-all duration-200
               peer-placeholder-shown:opacity-100 peer-placeholder-shown:translate-y-0
               peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:opacity-90"
    style={{ color: `${NeonBlue}` }}
  >
    {children}
  </span>
);

/* ---------- tiny particle layer ---------- */
const Particles = () => {
  const dots = Array.from({ length: 8 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            height: 6,
            width: 6,
            left: `${(i * 13) % 100}%`,
            top: `${(i * 23) % 100}%`,
            background: `${NeonBlue}40`,
            animation: `floaty ${3 + (i % 4)}s ease-in-out ${i * 0.2}s infinite`,
            border: `1px solid ${BurningBlue}55`
          }}
        />
      ))}
    </div>
  );
};

export default ContactForm;
