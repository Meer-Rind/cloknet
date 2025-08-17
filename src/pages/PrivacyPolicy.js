import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

const DeepBlue1 = '#021A2B';
const DeepBlue2 = '#053458';
const NeonBlue  = '#18A9FF';
const BurningBlue = '#00C7FF';

const ease = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const PrivacyPolicy = () => {
  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{ background: DeepBlue1 }}
    >
      {/* Ambient brand glows (palette-only) */}
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

      <div className="relative container mx-auto px-4 max-w-4xl">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.4, ease } }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center group"
            style={{ color: BurningBlue }}
          >
            <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-0.5" /> Back to Home
          </Link>
        </motion.div>

        {/* Glassy article shell */}
        <motion.article
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative rounded-3xl p-6 md:p-10 prose prose-invert max-w-none"
          style={{
            color: NeonBlue,
            background: `${DeepBlue2}CC`,
            backdropFilter: 'blur(16px)',
            border: `1px solid ${NeonBlue}26`,
            boxShadow: '0 0 28px rgba(0,199,255,0.13)'
          }}
        >
          {/* Inner soft border */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{ border: `1px solid ${NeonBlue}26` }}
          />

          {/* Title + underline */}
          <header className="relative not-prose mb-6">
            <h1
              className="text-4xl font-extrabold"
              style={{ color: '#FFFFFF', textShadow: '0 0 24px rgba(0,199,255,0.15)' }}
            >
              Privacy Policy
            </h1>
            <p style={{ color: NeonBlue, marginTop: 4 }}>Last updated: June 1, 2023</p>
            <div
              className="relative w-28 h-[3px] mt-5 rounded-full overflow-hidden"
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
          </header>

          {/* Content */}
          <Section>
            <h2 style={{ color: '#FFFFFF' }}>1. Introduction</h2>
            <p>
              Cloknet VPN ("us", "we", or "our") operates the Cloknet VPN service (the "Service"). This page informs you of our policies
              regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated
              with that data.
            </p>
          </Section>

          <Section>
            <h2 style={{ color: '#FFFFFF' }}>2. Information Collection and Use</h2>
            <p>
              We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>

            <h3 style={{ color: '#FFFFFF' }}>Types of Data Collected</h3>
            <p>
              <strong style={{ color: '#FFFFFF' }}>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable
              information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include,
              but is not limited to:
            </p>
            <ul>
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Cookies and Usage Data</li>
            </ul>

            <h3 style={{ color: '#FFFFFF' }}>Usage Data</h3>
            <p>
              We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information
              such as your computer&apos;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our
              Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other
              diagnostic data.
            </p>
          </Section>

          <Section>
            <h2 style={{ color: '#FFFFFF' }}>3. Use of Data</h2>
            <p>Cloknet VPN uses the collected data for various purposes:</p>
            <ul>
              <li>To provide and maintain the Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
              <li>To provide customer care and support</li>
              <li>To provide analysis or valuable information so that we can improve the Service</li>
              <li>To monitor the usage of the Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </Section>

          <Section>
            <h2 style={{ color: '#FFFFFF' }}>4. No Logs Policy</h2>
            <p>
              Cloknet VPN has a strict no-logs policy. We do not monitor, record, store, or log any information regarding your internet
              activities while using our VPN service, including:
            </p>
            <ul>
              <li>Websites you visit</li>
              <li>Applications you use</li>
              <li>Content you access</li>
              <li>DNS queries</li>
              <li>Connection timestamps</li>
            </ul>
          </Section>

          <Section>
            <h2 style={{ color: '#FFFFFF' }}>5. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on
              this page and updating the &quot;effective date&quot; at the top of this Privacy Policy.
            </p>
          </Section>

          <Section>
            <h2 style={{ color: '#FFFFFF' }}>6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@cloknetvpn.com.
            </p>
          </Section>
        </motion.article>
      </div>

      {/* local keyframes + accessibility */}
      <style>{`
        @keyframes underline { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @media (prefers-reduced-motion: reduce){
          *{animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important;}
        }
        /* prose reset so lists & body inherit NeonBlue while headings stay white */
        .prose :where(p, ul, ol, li){ color: ${NeonBlue}; }
        .prose :where(h1, h2, h3, h4){ color: #FFFFFF; }
        .prose strong{ color:#FFFFFF; }
        .prose a{ color:${BurningBlue}; }
      `}</style>
    </section>
  );
};

/** Section wrapper with gentle fade-up per block + palette separator */
const Section = ({ children }) => (
  <motion.section
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-80px' }}
    className="space-y-3"
  >
    {children}
    {/* subtle separator (palette) */}
    <div
      className="h-px w-full my-6"
      style={{ background: `${NeonBlue}26` }}
    />
  </motion.section>
);

export default PrivacyPolicy;
