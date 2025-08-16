import PricingTable from '../components/PricingTable';
import { FiCheckCircle, FiHelpCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

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
    <section className="relative py-16 overflow-hidden">
      {/* Ambient brand glows */}
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
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-lighttext max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core VPN features with different levels of access.
          </p>

          {/* animated underline */}
          <div className="relative w-28 h-[3px] mx-auto mt-5 bg-white/10 rounded-full overflow-hidden">
            <span className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#00CFFF] to-[#9B5CFF] animate-[underline_2.2s_ease-in-out_infinite]" />
          </div>
        </motion.div>

        {/* Pricing Table */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-1 shadow-[0_0_28px_#00CFFF22]"
        >
          {/* inner edge glow */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />
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
          <motion.h2 variants={fadeUp} className="text-2xl font-bold mb-6 text-center">
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
          <motion.div
            variants={fadeUp}
            className="mt-8 text-center"
          >
            <div className="relative inline-flex items-center rounded-lg p-[1px]">
              <div className="absolute inset-0 rounded-lg bg-[conic-gradient(from_0deg,rgba(0,207,255,.5),rgba(155,92,255,.4),rgba(0,207,255,.5))] opacity-40 blur-sm" />
              <div className="relative inline-flex items-center bg-gray-800/60 backdrop-blur-xl rounded-lg p-4 border border-white/10">
                <FiCheckCircle className="text-green-500 mr-2" size={20} />
                <span className="text-lighttext">
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
    className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
  >
    <button
      onClick={() => toggle(idx)}
      aria-expanded={isOpen}
      aria-controls={`faq-panel-${idx}`}
      className="w-full flex justify-between items-center p-4 text-left text-white group"
    >
      <span className="font-medium">{question}</span>
      <span className="ml-4 text-primary transition-transform duration-300 group-hover:rotate-12">
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
          <div className="px-4 pb-4 pt-0 text-lighttext">
            <p>{answer}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default Pricing;
