import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const Terms = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Ambient brand glows */}
      <span className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 bg-cyan-400/10 blur-3xl rounded-full" />
      <span className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 bg-fuchsia-500/10 blur-3xl rounded-full" />

      {/* Conic halo + soft grid */}
      <div className="pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]">
        <div className="absolute -inset-px bg-[conic-gradient(from_180deg_at_50%_0%,rgba(0,207,255,.18),transparent,rgba(255,0,128,.15),transparent,rgba(0,207,255,.18))]" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="relative container mx-auto px-4 max-w-4xl">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease } }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center group text-primary hover:text-glow transition"
          >
            <span className="mr-2 rounded-full bg-primary/10 p-1 ring-1 ring-white/10 group-hover:rotate-[-6deg] transition-transform">
              <FiArrowLeft />
            </span>
            <span className="relative">
              Back to Home
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#00CFFF] to-[#9B5CFF] group-hover:w-full transition-all duration-300" />
            </span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#B9F6FF] to-white">
              Terms of Service
            </span>
          </h1>
          <p className="text-lighttext mt-2">Last updated: June 1, 2023</p>

          {/* animated underline */}
          <div className="relative w-28 h-[3px] mx-auto mt-5 bg-white/10 rounded-full overflow-hidden">
            <span className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#00CFFF] to-[#9B5CFF] animate-[underline_2.2s_ease-in-out_infinite]" />
          </div>
        </motion.header>

        {/* Glassy Article Card */}
        <motion.article
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.45, ease } }}
          className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-[0_0_24px_rgba(0,207,255,.12)]"
        >
          {/* soft inner ring */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />

          <div className="prose prose-invert max-w-none">
            <h2>1. Terms</h2>
            <p>
              By accessing the website at https://cloknetvpn.com and using the Cloknet VPN service (the "Service"), you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site and the Service.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Cloknet VPN&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>attempt to decompile or reverse engineer any software contained on Cloknet VPN&apos;s website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
            </ul>

            <h2>3. Account Registration</h2>
            <p>
              To access and use certain features of the Service, you must register for an account. You agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Be responsible for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>

            <h2>4. Acceptable Use</h2>
            <p>You agree not to use the Service to:</p>
            <ul>
              <li>Engage in any illegal activities</li>
              <li>Distribute malware or engage in hacking activities</li>
              <li>Violate copyright or other intellectual property rights</li>
              <li>Distribute spam or engage in phishing</li>
              <li>Engage in activities that threaten network security or integrity</li>
            </ul>

            <h2>5. Termination</h2>
            <p>
              We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
            </p>

            <h2>6. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the &quot;effective date&quot; at the top of these Terms.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at <span className="text-primary">legal@cloknetvpn.com</span>.
            </p>
          </div>
        </motion.article>

        {/* Bottom CTA strip (subtle, still legal looking) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease, delay: 0.05 } }}
          className="mt-8"
        >
          <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 flex items-center justify-between">
            <p className="text-sm text-lighttext">
              Need clarification on a term? Our team is happy to help.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-lg bg-primary text-black px-4 py-2 text-sm font-semibold hover:bg-glow transition"
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
