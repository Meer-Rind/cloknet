import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const PrivacyPolicy = () => {
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
          <h1>Privacy Policy</h1>
          <p className="text-lighttext">Last updated: June 1, 2023</p>
          
          <h2>1. Introduction</h2>
          <p>
            Cloknet VPN ("us", "we", or "our") operates the Cloknet VPN service (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>
          
          <h2>2. Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to you.
          </p>
          
          <h3>Types of Data Collected</h3>
          <p>
            <strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
          </p>
          <ul>
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Cookies and Usage Data</li>
          </ul>
          
          <h3>Usage Data</h3>
          <p>
            We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
          </p>
          
          <h2>3. Use of Data</h2>
          <p>
            Cloknet VPN uses the collected data for various purposes:
          </p>
          <ul>
            <li>To provide and maintain the Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
            <li>To provide customer care and support</li>
            <li>To provide analysis or valuable information so that we can improve the Service</li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
          
          <h2>4. No Logs Policy</h2>
          <p>
            Cloknet VPN has a strict no-logs policy. We do not monitor, record, store, or log any information regarding your internet activities while using our VPN service, including:
          </p>
          <ul>
            <li>Websites you visit</li>
            <li>Applications you use</li>
            <li>Content you access</li>
            <li>DNS queries</li>
            <li>Connection timestamps</li>
          </ul>
          
          <h2>5. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
          </p>
          
          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@cloknetvpn.com.
          </p>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;