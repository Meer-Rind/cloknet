import ContactForm from '../components/ContactForm';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

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
    <section className="relative py-16 overflow-hidden">
      {/* Ambient glows */}
      <span className="pointer-events-none absolute -top-28 -left-24 h-80 w-80 bg-cyan-400/10 blur-3xl rounded-full" />
      <span className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 bg-fuchsia-500/10 blur-3xl rounded-full" />
      {/* Conic halo */}
      <div className="pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]">
        <div className="absolute -inset-px bg-[conic-gradient(from_180deg_at_50%_0%,rgba(0,207,255,.18),transparent,rgba(255,0,128,.15),transparent,rgba(0,207,255,.18))]" />
      </div>
      {/* Subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold mb-4 drop-shadow-[0_0_24px_rgba(0,207,255,.15)]">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-lighttext max-w-2xl mx-auto">
            Have questions or need support? Reach out to our team and we'll get back to you as soon as possible.
          </p>

          {/* animated underline */}
          <div className="relative w-28 h-[3px] mx-auto mt-5 bg-white/10 rounded-full overflow-hidden">
            <span className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#00CFFF] to-[#9B5CFF] animate-[underline_2.2s_ease-in-out_infinite]" />
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left: Form (glassy card wrapper to match right side) */}
          <motion.div variants={fadeUp} className="relative">
            <span className="pointer-events-none absolute -inset-[1px] rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(140px_140px_at_20%_0%,rgba(0,207,255,.14),transparent_60%)]" />
            <ContactForm />
          </motion.div>

          {/* Right: Contact methods */}
          <motion.div
            variants={fadeUp}
            className="relative h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_0_28px_#00CFFF22]"
          >
            {/* soft inner ring */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />
            <h2 className="text-2xl font-semibold mb-6">Other Ways to Reach Us</h2>

            <div className="space-y-6">
              <InfoRow
                icon={<FiMail className="text-primary text-xl" />}
                title="Email Us"
                lines={['support@cloknetvpn.com', 'sales@cloknetvpn.com']}
              />
              <InfoRow
                icon={<FiPhone className="text-primary text-xl" />}
                title="Call Us"
                lines={['+1 (555) 123-4567', 'Mon-Fri, 9am-5pm EST']}
              />
              <InfoRow
                icon={<FiMapPin className="text-primary text-xl" />}
                title="Our Office"
                lines={['123 Security Lane', 'Privacy City, PC 10101']}
              />
              <InfoRow
                icon={<FiClock className="text-primary text-xl" />}
                title="Support Hours"
                lines={['24/7 Premium Support', 'Standard Support: Mon-Sun, 6am-10pm EST']}
              />
            </div>

            {/* Divider + micro CTA */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-lighttext">
                Prefer chat? Open the assistant from the bottom-right — we’re always here.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* local keyframes + reduced motion */}
      <style>{`
        @keyframes underline { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(0,207,255,.35) }
          100% { box-shadow: 0 0 0 18px rgba(0,207,255,0) }
        }
        @media (prefers-reduced-motion: reduce){
          *{animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important;}
        }
      `}</style>
    </section>
  );
};

/** Row with icon + animated glass chip */
const InfoRow = ({ icon, title, lines }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -2 }}
    transition={{ duration: 0.45, ease }}
    className="relative flex"
  >
    {/* Icon chip with pulse ring on hover */}
    <div className="mr-4">
      <div className="relative w-12 h-12 rounded-full bg-primary/15 border border-white/10 flex items-center justify-center backdrop-blur-md">
        <span className="absolute inset-0 rounded-full ring-1 ring-white/10" />
        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100" />
        <div className="group hover:animate-[pulseRing_1.8s_ease-out] rounded-full">
          {icon}
        </div>
      </div>
    </div>

    {/* Copy */}
    <div>
      <h3 className="font-medium text-white mb-1">{title}</h3>
      {lines.map((l, i) => (
        <p key={i} className="text-lighttext">{l}</p>
      ))}
    </div>

    {/* corner spotlight */}
    <span className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(120px_120px_at_15%_0%,rgba(0,207,255,.12),transparent_60%)]" />
  </motion.div>
);

export default Contact;
