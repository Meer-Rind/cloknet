import { useEffect, useMemo, useRef, useState } from 'react';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const AIChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm your Cloknet AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const chatRef = useRef(null);
  const dragBounds = useRef(null);

  // show launcher after 5s, prompt for 5s
  useEffect(() => {
    const t = setTimeout(() => {
      setIsVisible(true);
      setShowPrompt(true);
      const t2 = setTimeout(() => setShowPrompt(false), 5000);
      return () => clearTimeout(t2);
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  // auto scroll to last message
  useEffect(() => {
    if (!isOpen) return;
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isOpen, typing]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);

    // fake AI response
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: 'ai',
          text:
            "Got it! For privacy, Cloknet uses AES-256 encryption, WireGuard® speeds, and a strict no-logs policy. Want help picking the best server?",
        },
      ]);
      setTyping(false);
    }, 900);
  };

  const open = () => {
    setIsOpen(true);
    setShowPrompt(false);
  };

  const btnGlow = useMemo(
    () =>
      prefersReducedMotion
        ? ''
        : 'shadow-[0_0_24px_rgba(0,207,255,.45)] hover:shadow-[0_0_34px_rgba(0,207,255,.65)]',
    [prefersReducedMotion]
  );

  return (
    <>
      {/* drag bounds container */}
      <div ref={dragBounds} className="fixed inset-0 pointer-events-none z-[60]" />

      {/* Prompt bubble */}
      <AnimatePresence>
        {isVisible && showPrompt && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-28 right-6 z-50 pointer-events-auto"
          >
            <div className="bg-white text-black text-sm px-4 py-2 rounded-xl shadow-xl border border-gray-200">
              👋 Hi, I’m Cloky. How can I help you?
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button (draggable) */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            aria-label={isOpen ? 'Close chat' : 'Open chat'}
            onClick={() => (isOpen ? setIsOpen(false) : open())}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            drag
            dragConstraints={dragBounds}
            dragElastic={0.12}
            dragMomentum={!prefersReducedMotion}
            whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
            className={`fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-[#00BFEF] to-[#00E5FF] text-white flex items-center justify-center ${btnGlow} pointer-events-auto z-50 transition-transform`}
          >
            <motion.span
              key={isOpen ? 'x' : 'msg'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-white"
            >
              {isOpen ? <FiX size={26} /> : <FiMessageSquare size={26} />}
            </motion.span>

            {/* unread dot when closed & new AI messages exist */}
            {!isOpen && messages.length > 1 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-white/90 text-[#011E3C] text-[10px] font-bold flex items-center justify-center shadow">
                {Math.min(messages.length - 1, 9)}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-28 right-6 w-[22rem] max-w-[92vw] z-50 pointer-events-auto"
          >
            {/* glassy shell + conic halo */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-white/10 backdrop-blur-2xl shadow-2xl">
              <div className="absolute -inset-px rounded-2xl opacity-30 bg-[conic-gradient(from_140deg_at_50%_0%,rgba(0,207,255,.25),transparent,rgba(255,0,128,.18),transparent,rgba(0,207,255,.25))]" />

              {/* header */}
              <div className="relative bg-gradient-to-r from-[#0ABAF5] to-[#00E5FF] p-4 flex items-center justify-between">
                <h3 className="font-semibold text-[#011E3C]">Cloknet AI Assistant</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#011E3C] hover:opacity-80 transition"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* messages */}
              <div
                ref={chatRef}
                className="relative p-4 h-72 overflow-y-auto bg-[#0A1120]/70 text-white"
              >
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:28px_28px]" />

                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`relative mb-3 max-w-[85%] rounded-lg border ${
                      m.role === 'ai'
                        ? 'bg-white/10 border-white/15 shadow-sm'
                        : 'bg-[#00E5FF]/10 border-[#00E5FF]/30 ml-auto'
                    }`}
                  >
                    <div className="px-3 py-2 text-sm leading-relaxed">
                      {m.text}
                    </div>
                  </motion.div>
                ))}

                {/* typing indicator */}
                <AnimatePresence>
                  {typing && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-sm"
                    >
                      <span className="relative inline-flex -space-x-1">
                        <Dot />
                        <Dot delay={0.12} />
                        <Dot delay={0.24} />
                      </span>
                      Cloky is typing…
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* input */}
              <div className="relative border-t border-white/10 bg-[#0A1120]/60 p-3">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSend();
                    }}
                    placeholder="Ask me anything…"
                    className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#00CFFF]/60 placeholder:text-white/50 backdrop-blur"
                  />
                  <motion.button
                    whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
                    onClick={handleSend}
                    className="absolute right-2 top-1.5 text-[#011E3C] bg-[#00E5FF] hover:bg-white transition-colors w-9 h-9 rounded-full flex items-center justify-center shadow"
                    aria-label="Send message"
                  >
                    <FiSend />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* local keyframes */}
      <style>{`
        @media (prefers-reduced-motion: reduce){
          *{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important;scroll-behavior:auto !important}
        }
      `}</style>
    </>
  );
};

const Dot = ({ delay = 0 }) => (
  <span
    style={{ animationDelay: `${delay}s` }}
    className="relative inline-block h-2 w-2 rounded-full bg-white/80 animate-bounce"
  />
);

export default AIChatButton;
