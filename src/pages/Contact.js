import ContactForm from '../components/ContactForm';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';

const Contact = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact <span className="text-primary">Us</span></h1>
          <p className="text-lighttext max-w-2xl mx-auto">
            Have questions or need support? Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ContactForm />
          </div>
          
          <div>
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 h-full">
              <h2 className="text-2xl font-semibold mb-6">Other Ways to Reach Us</h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                      <FiMail className="text-primary text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Email Us</h3>
                    <p className="text-lighttext">support@cloknetvpn.com</p>
                    <p className="text-lighttext">sales@cloknetvpn.com</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                      <FiPhone className="text-primary text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Call Us</h3>
                    <p className="text-lighttext">+1 (555) 123-4567</p>
                    <p className="text-lighttext">Mon-Fri, 9am-5pm EST</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                      <FiMapPin className="text-primary text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Our Office</h3>
                    <p className="text-lighttext">123 Security Lane</p>
                    <p className="text-lighttext">Privacy City, PC 10101</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                      <FiClock className="text-primary text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Support Hours</h3>
                    <p className="text-lighttext">24/7 Premium Support</p>
                    <p className="text-lighttext">Standard Support: Mon-Sun, 6am-10pm EST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;