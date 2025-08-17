import PricingTable from '../components/PricingTable';
import { FiCheckCircle, FiHelpCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

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

const Pricing = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      question: "What's the difference between Free and Premium?",
      answer:
        "The Free plan gives you access to 7 servers with a 100MB daily limit. Premium unlocks all 13 servers with unlimited data, higher speeds, and no ads.",
    },
    {
      question: "Can I switch plans later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time from your account settings.",
    },
    {
      question: "Is there a money-back guarantee?",
      answer:
        "We offer a 30-day money-back guarantee for all paid plans if you're not satisfied with our service.",
    },
    {
      question: "How many devices can I use with one account?",
      answer:
        "You can use Cloknet VPN on up to 5 devices simultaneously with a single account.",
    },
  ];

  const toggleFAQ = (idx) => setOpenIdx((prev) => (prev === idx ? -1 : idx));

  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{ background: DeepBlue1 }}
    >
      {/* Ambient brand glows (palette only) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <span
          className="absolute -top-28 -left-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: `${NeonBlue}1A` }}
        />
        <span
          className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full blur-3xl"
          style={{ background: `${BurningBlue}1A` }}
        />
        {/* Conic halo (Neon ↔ Burning) */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.30,
            maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 85%)',
            background: `conic-gradient(from 180deg at 50% 0%, ${BurningBlue}2E, transparent, ${NeonBlue}26, transparent, ${BurningBlue}2E)`
          }}
        />
        {/* Subtle grid (neon lines) */}
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
            Simple, Transparent <span style={{ color: BurningBlue }}>Pricing</span>
          </h1>
          <p
            className="max-w-2xl mx-auto"
            style={{ color: NeonBlue }}
          >
            Choose the plan that fits your needs. All plans include our core VPN features with different levels of access.
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

        {/* Pricing Table (glassy shell) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="relative rounded-3xl p-1"
          style={{
            border: `1px solid ${NeonBlue}26`,
            background: `${DeepBlue2}CC`,
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 28px rgba(0,199,255,0.13)'
          }}
        >
          {/* inner edge glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{ border: `1px solid ${NeonBlue}26` }}
          />
          <div className="rounded-3xl bg-transparent">
            <PricingTable />
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-3xl font-bold mb-6 text-center"
            style={{ color: '#FFFFFF' }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={idx}
                idx={idx}
                isOpen={openIdx === idx}
                toggle={toggleFAQ}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>

          {/* Guarantee pill */}
          <motion.div variants={fadeUp} className="mt-8 text-center">
            <div className="relative inline-flex items-center rounded-lg p-[1px]">
              {/* soft neon ring */}
              <div
                className="absolute inset-0 rounded-lg opacity-40 blur-sm"
                style={{
                  background: `conic-gradient(from 0deg, ${BurningBlue}80, ${NeonBlue}66, ${BurningBlue}80)`
                }}
              />
              <div
                className="relative inline-flex items-center rounded-lg p-4"
                style={{
                  background: `${DeepBlue2}CC`,
                  backdropFilter: 'blur(12px)',
                  border: `1px solid ${NeonBlue}26`,
                }}
              >
                <FiCheckCircle className="mr-2" size={20} color={BurningBlue} />
                <span style={{ color: '#FFFFFF' }}>
                  All plans include our 30-day money-back guarantee
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* local keyframes + reduced motion */}
      <style>{`
        @keyframes underline { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @media (prefers-reduced-motion: reduce){
          *{animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important;}
        }
      `}</style>
    </section>
  );
};

const FAQItem = ({ idx, isOpen, toggle, question, answer }) => (
  <motion.div
    variants={fadeUp}
    className="rounded-xl overflow-hidden"
    style={{
      border: `1px solid ${NeonBlue}26`,
      background: `${DeepBlue2}CC`,
      backdropFilter: 'blur(12px)',
      boxShadow: '0 0 18px rgba(0,199,255,0.13)'
    }}
  >
    <button
      onClick={() => toggle(idx)}
      aria-expanded={isOpen}
      aria-controls={`faq-panel-${idx}`}
      className="w-full flex justify-between items-center p-4 text-left group"
      style={{ color: '#FFFFFF' }}
    >
      <span className="font-medium">{question}</span>
      <span
        className="ml-4 transition-transform duration-300 group-hover:rotate-12"
        style={{ color: BurningBlue }}
      >
        <FiHelpCircle className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} />
      </span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`faq-panel-${idx}`}
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1, transition: { duration: 0.35, ease } }}
          exit={{ height: 0, opacity: 0, transition: { duration: 0.25, ease } }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-4 pt-0" style={{ color: NeonBlue }}>
            <p>{answer}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default Pricing;
