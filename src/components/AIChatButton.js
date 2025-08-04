import { useState } from 'react';
import { FiMessageSquare, FiX } from 'react-icons/fi';

const AIChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg hover-glow transition z-50"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50 overflow-hidden">
          <div className="bg-deepnavy p-4 flex items-center justify-between">
            <h3 className="font-medium text-white">Cloknet AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-lighttext hover:text-white">
              <FiX size={20} />
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            <div className="bg-gray-700 bg-opacity-50 rounded-lg p-3 mb-3">
              <p className="text-sm text-lighttext">Hello! I'm your Cloknet AI assistant. How can I help you today?</p>
            </div>
            <div className="text-xs text-center text-lighttext mt-8">
              Type your question below to get started
            </div>
          </div>
          <div className="border-t border-gray-700 p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="w-full bg-gray-900 border border-gray-700 text-white text-sm rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="absolute right-2 top-2 text-primary hover:text-glow">
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