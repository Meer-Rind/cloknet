import { Link } from 'react-router-dom';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Section */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Take Back Your <span className="text-primary text-glow">Digital Privacy</span>
              <br className="hidden md:block" /> with Cloknet VPN
            </h1>

            <p className="text-lighttext text-lg mb-8 max-w-xl">
              Tired of being tracked online? Cloknet VPN gives you total internet freedom with military-grade encryption, blazing speeds, and global server access. Your data, your rules — anytime, anywhere.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href="#"
                className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition shadow-md"
              >
                <FaApple className="mr-2 text-xl" />
                <span className="font-semibold">Download on App Store</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-md"
              >
                <FaGooglePlay className="mr-2 text-xl" />
                <span className="font-semibold">Get it on Play Store</span>
              </a>
            </div>

            {/* CTA Links */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/pricing"
                className="bg-primary hover:bg-glow text-white px-8 py-3 rounded-md font-semibold hover-glow transition text-center"
              >
                Start Free Trial
              </Link>
              <Link
                to="/features"
                className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-md font-semibold transition text-center"
              >
                Why Choose Cloknet?
              </Link>
            </div>
          </div>

          {/* Right Visual UI */}
          <div className="md:w-1/2 relative">
            <div className="relative">
              <div className="w-full h-80 md:h-96 bg-gradient-to-br from-primary to-glow rounded-xl opacity-20 blur-3xl absolute -z-10"></div>

              <div className="bg-gray-900 bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm text-lighttext font-medium">Cloknet Interface</span>
                </div>

                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 hover-glow">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">VPN Connected</h3>
                  <p className="text-lighttext text-sm mb-4">AES-256 Encryption Enabled</p>

                  <div className="bg-deepnavy rounded-lg p-4 mb-4 border border-gray-700">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-lighttext">Location:</span>
                      <span className="text-white font-medium">Frankfurt, Germany</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-lighttext">IP Address:</span>
                      <span className="text-white font-medium">185.93.2.17</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-lighttext">Status:</span>
                      <span className="text-green-400 font-semibold">Secure</span>
                    </div>
                  </div>

                  <button className="bg-primary hover:bg-glow text-white px-6 py-2 rounded-md text-sm font-semibold w-full hover-glow transition">
                    Disconnect
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
