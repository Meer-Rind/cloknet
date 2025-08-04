import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const Terms = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary hover:text-glow mb-6 transition"
        >
          <FiArrowLeft className="mr-2" /> Back to Home
        </Link>
        
        <article className="prose prose-invert max-w-none">
          <h1>Terms of Service</h1>
          <p className="text-lighttext">Last updated: June 1, 2023</p>
          
          <h2>1. Terms</h2>
          <p>
            By accessing the website at https://cloknetvpn.com and using the Cloknet VPN service (the "Service"), you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site and the Service.
          </p>
          
          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on Cloknet VPN's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>attempt to decompile or reverse engineer any software contained on Cloknet VPN's website;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
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
          <p>
            You agree not to use the Service to:
          </p>
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
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "effective date" at the top of these Terms.
          </p>
          
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at legal@cloknetvpn.com.
          </p>
        </article>
      </div>
    </div>
  );
};

export default Terms;