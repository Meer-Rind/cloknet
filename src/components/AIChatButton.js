import { useEffect, useState } from 'react';
import { FiMessageSquare, FiX } from 'react-icons/fi';

const AIChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
      setShowPrompt(true);

      setTimeout(() => setShowPrompt(false), 5000); // hide prompt after 5s
    }, 5000); // show button after 5s

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isVisible && (
        <>
          {/* Prompt bubble */}
          {showPrompt && !isOpen && (
            <div className="fixed bottom-28 right-6 z-50 bg-white text-black text-sm px-4 py-2 rounded-xl shadow-xl animate-fade-in-up border border-gray-200">
              👋 Hi, I’m Cloky. How can I help you?
            </div>
          )}

          {/* Floating Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white flex items-center justify-center shadow-xl z-50 hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            {isOpen ? <FiX size={26} /> : <FiMessageSquare size={26} />}
          </button>
        </>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 w-80 bg-white rounded-xl shadow-2xl border border-gray-300 z-50 overflow-hidden transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">Cloknet AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <FiX size={20} />
            </button>
          </div>

          {/* Message Body */}
          <div className="p-4 h-64 overflow-y-auto bg-gray-50">
            <div className="bg-white border border-blue-100 rounded-lg p-3 mb-3 shadow-sm">
              <p className="text-sm text-gray-800">
                Hello! I'm your Cloknet AI assistant. How can I help you today?
              </p>
            </div>
            <div className="text-xs text-center text-gray-500 mt-8">
              Type your question below to get started
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="w-full bg-white border border-gray-300 text-gray-800 text-sm rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              />
              <button className="absolute right-3 top-2.5 text-blue-600 hover:text-blue-800 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatButton;
