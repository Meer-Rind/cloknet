import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const PrivacyPolicy = () => {
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

      <div className="relative container mx-auto px-4 max-w-4xl">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.4, ease } }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center text-primary hover:text-glow transition group"
          >
            <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-0.5" /> Back to Home
          </Link>
        </motion.div>

        {/* Glassy article shell */}
        <motion.article
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-10 shadow-[0_0_28px_#00CFFF22] prose prose-invert max-w-none"
        >
          {/* Inner soft border */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />

          {/* Title + underline */}
          <header className="relative not-prose mb-6">
            <h1 className="text-4xl font-extrabold drop-shadow-[0_0_24px_rgba(0,207,255,.15)]">
              Privacy Policy
            </h1>
            <p className="text-lighttext mt-1">Last updated: June 1, 2023</p>
            <div className="relative w-28 h-[3px] mt-5 bg-white/10 rounded-full overflow-hidden">
              <span className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#00CFFF] to-[#9B5CFF] animate-[underline_2.2s_ease-in-out_infinite]" />
            </div>
          </header>

          {/* Content (unchanged text) */}
          <Section>
            <h2>1. Introduction</h2>
            <p>
              Cloknet VPN ("us", "we", or "our") operates the Cloknet VPN service (the "Service"). This page informs you of our policies
              regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated
              with that data.
            </p>
          </Section>

          <Section>
            <h2>2. Information Collection and Use</h2>
            <p>
              We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>

            <h3>Types of Data Collected</h3>
            <p>
              <strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable
              information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include,
              but is not limited to:
            </p>
            <ul>
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Cookies and Usage Data</li>
            </ul>

            <h3>Usage Data</h3>
            <p>
              We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information
              such as your computer&apos;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our
              Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other
              diagnostic data.
            </p>
          </Section>

          <Section>
            <h2>3. Use of Data</h2>
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
            <h2>4. No Logs Policy</h2>
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
            <h2>5. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on
              this page and updating the &quot;effective date&quot; at the top of this Privacy Policy.
            </p>
          </Section>

          <Section>
            <h2>6. Contact Us</h2>
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
      `}</style>
    </section>
  );
};

/** Section wrapper with gentle fade-up per block */
const Section = ({ children }) => (
  <motion.section
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-80px' }}
    className="space-y-3"
  >
    {children}
    {/* subtle separator */}
    <div className="h-px w-full bg-white/5 my-6" />
  </motion.section>
);

export default PrivacyPolicy;
