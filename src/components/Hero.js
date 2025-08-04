import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Secure Your <span className="text-primary text-glow">Digital Life</span> with VPN
            </h1>
            <p className="text-lighttext text-lg mb-8 max-w-lg">
              Cloknet VPN provides military-grade encryption to protect your online privacy and security. Browse anonymously and access content without restrictions.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/pricing"
                className="bg-primary hover:bg-glow text-white px-8 py-3 rounded-md font-medium hover-glow transition text-center"
              >
                Get Started
              </Link>
              <Link
                to="/features"
                className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-md font-medium transition text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative">
              <div className="w-full h-80 md:h-96 bg-gradient-to-br from-primary to-glow rounded-xl opacity-20 blur-3xl absolute -z-10"></div>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm text-lighttext">Cloknet VPN</span>
                </div>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 hover-glow">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Connection Secure</h3>
                  <p className="text-lighttext text-sm mb-4">Your data is encrypted with AES-256</p>
                  <div className="bg-deepnavy rounded-lg p-4 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-lighttext">Location:</span>
                      <span className="text-white">United States</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-lighttext">IP Address:</span>
                      <span className="text-white">192.168.1.1</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-lighttext">Status:</span>
                      <span className="text-green-400">Protected</span>
                    </div>
                  </div>
                  <button className="bg-primary hover:bg-glow text-white px-6 py-2 rounded-md text-sm font-medium w-full hover-glow transition">
                    Connect Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;