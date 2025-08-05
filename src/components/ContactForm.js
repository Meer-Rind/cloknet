import { useState } from 'react';
import { FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900/40 via-gray-800/40 to-black/60 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-[0_0_25px_#00CFFF33] transition-all duration-300">
      <h2 className="text-4xl font-extrabold text-white mb-3 tracking-tight">Connect with <span className="text-primary">Cloknet</span></h2>
      <p className="text-lighttext mb-6 text-sm">Have a question, feedback, or partnership idea? Reach out — your next step to online freedom starts here.</p>

      {submitSuccess && (
        <div className="bg-green-800/30 text-green-300 p-4 rounded-lg mb-6 text-sm border border-green-500/20 shadow-md animate-fade-in">
          ✅ Thank you for your message! We’ll reach out to you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-lighttext mb-1">Your Name</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="pl-10 pr-4 py-2.5 w-full text-sm rounded-lg bg-white/5 text-white border border-white/10 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400 backdrop-blur-md"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-lighttext mb-1">Email Address</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 pr-4 py-2.5 w-full text-sm rounded-lg bg-white/5 text-white border border-white/10 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400 backdrop-blur-md"
              placeholder="you@securemail.com"
              required
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-lighttext mb-1">Message</label>
          <div className="relative">
            <FiMessageSquare className="absolute left-3 top-3 text-gray-500" />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="pl-10 pr-4 py-2.5 w-full text-sm rounded-lg bg-white/5 text-white border border-white/10 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400 resize-none backdrop-blur-md"
              placeholder="Tell us how we can help you stay private and free online..."
              required
            ></textarea>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 shadow-md ${
            isSubmitting
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-primary hover:bg-glow hover:text-black'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.3 0 0 5.3 0 12h4z" />
              </svg>
              Sending...
            </div>
          ) : (
            'Send Secure Message'
          )}
        </button>
      </form>

      <div className="mt-6 text-xs text-lighttext text-center opacity-75">
        🔐 We respect your privacy. Every message is encrypted and confidential.
      </div>
    </div>
  );
};

export default ContactForm;
