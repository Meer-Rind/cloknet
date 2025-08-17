import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

const DeepBlue1 = '#021A2B';
const DeepBlue2 = '#053458';
const NeonBlue  = '#18A9FF';
const BurningBlue = '#00C7FF';

const ease = [0.22, 1, 0.36, 1];

const Terms = () => {
  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{ background: DeepBlue1 }}
    >
      {/* Ambient brand glows (palette only) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <span
          className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: `${NeonBlue}1A` }}
        />
        <span
          className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full blur-3xl"
          style={{ background: `${BurningBlue}1A` }}
        />
        {/* Conic halo */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.28,
            maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 85%)',
            background: `conic-gradient(from 180deg at 50% 0%, ${BurningBlue}2E, transparent, ${NeonBlue}26, transparent, ${BurningBlue}2E)`
          }}
        />
        {/* Subtle neon grid */}
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

      <div className="relative container mx-auto px-4 max-w-4xl">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease } }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center group"
            style={{ color: BurningBlue }}
          >
            <span
              className="mr-2 rounded-full p-1 transition-transform group-hover:-rotate-6"
              style={{
                background: `${BurningBlue}1A`,
                boxShadow: `0 0 0 1px ${NeonBlue}26 inset`
              }}
            >
              <FiArrowLeft />
            </span>
            <span className="relative">
              Back to Home
              <span
                className="absolute left-0 -bottom-1 h-[2px] w-0 transition-all duration-300"
                style={{
                  background: `linear-gradient(90deg, ${BurningBlue}, ${NeonBlue})`
                }}
              />
            </span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
          className="text-center mb-8"
        >
          <h1
            className="text-4xl md:text-5xl font-extrabold"
            style={{
              color: '#FFFFFF',
              textShadow: '0 0 24px rgba(0,199,255,0.15)'
            }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, #FFFFFF, ${NeonBlue}, #FFFFFF)`
              }}
            >
              Terms of Service
            </span>
          </h1>
          <p className="mt-2" style={{ color: NeonBlue }}>
            Last updated: June 1, 2023
          </p>

          {/* animated underline */}
          <div
            className="relative w-28 h-[3px] mx-auto mt-5 rounded-full overflow-hidden"
            style={{ background: `${NeonBlue}26` }}
          >
            <span
              className="absolute inset-y-0 left-0 w-1/2"
              style={{
                background: `linear-gradient(90deg, ${BurningBlue}, ${NeonBlue})`,
                animation: 'underline 2.2s ease-in-out infinite'
              }}
            />
          </div>
        </motion.header>

        {/* Glassy Article Card */}
        <motion.article
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.45, ease } }}
          className="relative rounded-2xl p-6 md:p-8"
          style={{
            background: `${DeepBlue2}CC`,
            border: `1px solid ${NeonBlue}26`,
            boxShadow: `0 0 24px rgba(0,199,255,0.12)`,
            backdropFilter: 'blur(14px)'
          }}
        >
          {/* inner ring */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ boxShadow: `0 0 0 1px ${NeonBlue}26 inset` }}
          />

          <div className="prose prose-invert max-w-none">
            <h2 style={{ color: '#FFFFFF' }}>1. Terms</h2>
            <p style={{ color: NeonBlue }}>
              By accessing the website at https://cloknetvpn.com and using the Cloknet VPN service (the "Service"), you are agreeing to be
              bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with
              any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site
              and the Service.
            </p>

            <h2 style={{ color: '#FFFFFF' }}>2. Use License</h2>
            <p style={{ color: NeonBlue }}>
              Permission is granted to temporarily download one copy of the materials (information or software) on Cloknet VPN&apos;s
              website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and
              under this license you may not:
            </p>
            <ul>
              {[
                'modify or copy the materials;',
                'use the materials for any commercial purpose, or for any public display (commercial or non-commercial);',
                'attempt to decompile or reverse engineer any software contained on Cloknet VPN\'s website;',
                'remove any copyright or other proprietary notations from the materials; or',
                'transfer the materials to another person or "mirror" the materials on any other server.'
              ].map((li, i) => (
                <li key={i} style={{ color: NeonBlue }}>{li}</li>
              ))}
            </ul>

            <h2 style={{ color: '#FFFFFF' }}>3. Account Registration</h2>
            <p style={{ color: NeonBlue }}>
              To access and use certain features of the Service, you must register for an account. You agree to:
            </p>
            <ul>
              {[
                'Provide accurate, current, and complete information during registration',
                'Maintain and promptly update your account information',
                'Maintain the security of your account credentials',
                'Be responsible for all activities that occur under your account',
                'Notify us immediately of any unauthorized use of your account'
              ].map((li, i) => (
                <li key={i} style={{ color: NeonBlue }}>{li}</li>
              ))}
            </ul>

            <h2 style={{ color: '#FFFFFF' }}>4. Acceptable Use</h2>
            <p style={{ color: NeonBlue }}>You agree not to use the Service to:</p>
            <ul>
              {[
                'Engage in any illegal activities',
                'Distribute malware or engage in hacking activities',
                'Violate copyright or other intellectual property rights',
                'Distribute spam or engage in phishing',
                'Engage in activities that threaten network security or integrity'
              ].map((li, i) => (
                <li key={i} style={{ color: NeonBlue }}>{li}</li>
              ))}
            </ul>

            <h2 style={{ color: '#FFFFFF' }}>5. Termination</h2>
            <p style={{ color: NeonBlue }}>
              We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever,
              including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive
              termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity
              and limitations of liability.
            </p>

            <h2 style={{ color: '#FFFFFF' }}>6. Changes</h2>
            <p style={{ color: NeonBlue }}>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any
              changes by posting the new Terms on this page and updating the &quot;effective date&quot; at the top of these Terms.
            </p>

            <h2 style={{ color: '#FFFFFF' }}>7. Contact Us</h2>
            <p style={{ color: NeonBlue }}>
              If you have any questions about these Terms, please contact us at{' '}
              <span style={{ color: BurningBlue }}>legal@cloknetvpn.com</span>.
            </p>
          </div>
        </motion.article>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease, delay: 0.05 } }}
          className="mt-8"
        >
          <div
            className="relative rounded-xl p-4 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between"
            style={{
              background: `${DeepBlue2}CC`,
              border: `1px solid ${NeonBlue}26`,
              backdropFilter: 'blur(14px)'
            }}
          >
            <p className="text-sm" style={{ color: NeonBlue }}>
              Need clarification on a term? Our team is happy to help.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold transition"
              style={{
                background: BurningBlue,
                color: '#021A2B'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 24px ${BurningBlue}66`)}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Keyframes + reduced motion guard */}
      <style>{`
        @keyframes underline { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @media (prefers-reduced-motion: reduce){
          *{animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important;}
        }
        /* Prose tweaks for legal readability */
        .prose h2{margin-top:1.75rem; margin-bottom:.75rem}
        .prose ul{margin-top:.5rem; margin-bottom:1rem}
        .prose li{margin:.25rem 0}
      `}</style>
    </section>
  );
};

export default Terms;
