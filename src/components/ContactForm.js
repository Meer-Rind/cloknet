import { useState } from 'react';
import { FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-semibold text-white mb-6">Send us a message</h2>
      
      {submitSuccess && (
        <div className="bg-green-900 text-green-300 p-4 rounded-md mb-6">
          Thank you for your message! We'll get back to you soon.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-lighttext text-sm mb-2">Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-gray-500" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5"
              placeholder="Your name"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-lighttext text-sm mb-2">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-500" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-lighttext text-sm mb-2">Message</label>
          <div className="relative">
            <div className="absolute top-3 left-3">
              <FiMessageSquare className="text-gray-500" />
            </div>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5"
              placeholder="Your message..."
              required
            ></textarea>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-md font-medium ${isSubmitting ? 'bg-gray-600' : 'bg-primary hover:bg-glow'} text-white hover-glow transition flex items-center justify-center`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;