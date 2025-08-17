import ContactForm from '../components/ContactForm';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

/* ---------- PALETTE ---------- */
const DeepBlue1 = '#021A2B';
const DeepBlue2 = '#053458';
const NeonBlue  = '#18A9FF';
const BurningBlue = '#00C7FF';

const ease = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const Contact = () => {
  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{ background: DeepBlue1 }}
    >
      {/* Ambient halos (palette only) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* top-left orb */}
        <span
          className="absolute -top-28 -left-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: `${NeonBlue}1A` }}
        />
        {/* bottom-right orb */}
        <span
          className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full blur-3xl"
          style={{ background: `${BurningBlue}1A` }}
        />
        {/* conic halo */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.30,
            maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 85%)',
            background: `conic-gradient(from 180deg at 50% 0%, ${BurningBlue}2E, transparent, ${NeonBlue}26, transparent, ${BurningBlue}2E)`
          }}
        />
        {/* subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.06,
            background: `linear-gradient(to right, ${NeonBlue} 1px, transparent 1px),
                         linear-gradient(to bottom, ${NeonBlue} 1px, transparent 1px)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center mb-12"
        >
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-4"
            style={{ color: '#FFFFFF', textShadow: '0 0 24px rgba(0,199,255,0.15)' }}
          >
            Contact <span style={{ color: BurningBlue }}>Us</span>
          </h1>
          <p
            className="max-w-2xl mx-auto"
            style={{ color: NeonBlue }}
          >
            Have questions or need support? Reach out to our team and we'll get back to you as soon as possible.
          </p>

          {/* animated underline (Neon → Burning) */}
          <div
            className="relative w-28 h-[3px] mx-auto mt-5 rounded-full overflow-hidden"
            style={{ background: `${NeonBlue}26` }}
          >
            <span
              className="absolute inset-y-0 left-0 w-1/2"
              style={{
                background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`,
                animation: 'underline 2.2s ease-in-out infinite'
              }}
            />
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
        >
          {/* Left: Form (kept glassy; ContactForm is already palette-pure) */}
          <motion.div variants={fadeUp} className="relative">
            <span
              className="pointer-events-none absolute -inset-[1px] rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(140px 140px at 20% 0%, rgba(0,199,255,0.14), transparent 60%)'
              }}
            />
            <ContactForm />
          </motion.div>

          {/* Right: Contact methods (glassy card) */}
          <motion.div
            variants={fadeUp}
            className="relative h-full rounded-3xl p-6 sm:p-8"
            style={{
              border: `1px solid ${NeonBlue}26`,
              background: `${DeepBlue2}CC`,
              backdropFilter: 'blur(16px)',
              boxShadow: '0 0 28px rgba(0,199,255,0.13)'
            }}
          >
            {/* soft inner ring */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{ border: `1px solid ${NeonBlue}26` }}
            />
            <h2
              className="text-2xl font-semibold mb-6"
              style={{ color: '#FFFFFF' }}
            >
              Other Ways to Reach Us
            </h2>

            <div className="space-y-6">
              <InfoRow
                iconColor={BurningBlue}
                icon={<FiMail size={20} />}
                title="Email Us"
                lines={['support@cloknetvpn.com', 'sales@cloknetvpn.com']}
              />
              <InfoRow
                iconColor={BurningBlue}
                icon={<FiPhone size={20} />}
                title="Call Us"
                lines={['+1 (555) 123-4567', 'Mon–Fri, 9am–5pm EST']}
              />
              <InfoRow
                iconColor={BurningBlue}
                icon={<FiMapPin size={20} />}
                title="Our Office"
                lines={['123 Security Lane', 'Privacy City, PC 10101']}
              />
              <InfoRow
                iconColor={BurningBlue}
                icon={<FiClock size={20} />}
                title="Support Hours"
                lines={['24/7 Premium Support', 'Standard: Mon–Sun, 6am–10pm EST']}
              />
            </div>

            {/* Divider + micro CTA */}
            <div
              className="mt-8 pt-6"
              style={{ borderTop: `1px solid ${NeonBlue}26` }}
            >
              <p className="text-xs" style={{ color: NeonBlue }}>
                Prefer chat? Open the assistant from the bottom-right — we’re always here.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* keyframes + reduced motion */}
      <style>{`
        @keyframes underline { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(0,199,255,.35) }
          100% { box-shadow: 0 0 0 18px rgba(0,199,255,0) }
        }
        @media (prefers-reduced-motion: reduce){
          *{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important;}
        }
      `}</style>
    </section>
  );
};

/** Row with icon + animated glass chip (palette-only) */
const InfoRow = ({ icon, iconColor, title, lines }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -2 }}
    transition={{ duration: 0.45, ease: [0.22,1,0.36,1] }}
    className="relative flex"
  >
    {/* Icon chip with pulse ring on hover */}
    <div className="mr-4">
      <div
        className="relative w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: `${DeepBlue1}CC`,
          border: `1px solid ${NeonBlue}26`,
          backdropFilter: 'blur(12px)'
        }}
      >
        <div
          className="group rounded-full"
          style={{ animation: 'none' }}
          onMouseEnter={(e)=>{ e.currentTarget.style.animation = 'pulseRing 1.8s ease-out'; }}
          onAnimationEnd={(e)=>{ e.currentTarget.style.animation = 'none'; }}
        >
          <span style={{ color: iconColor }}>{icon}</span>
        </div>
      </div>
    </div>

    {/* Copy */}
    <div>
      <h3 className="font-medium mb-1" style={{ color: '#FFFFFF' }}>{title}</h3>
      {lines.map((l, i) => (
        <p key={i} style={{ color: NeonBlue }}>{l}</p>
      ))}
    </div>

    {/* corner spotlight */}
    <span
      className="pointer-events-none absolute -inset-2 rounded-2xl"
      style={{
        opacity: 0,
        transition: 'opacity .5s',
        background: 'radial-gradient(120px 120px at 15% 0%, rgba(0,199,255,.12), transparent 60%)'
      }}
    />
  </motion.div>
);

export default Contact;
