import { useEffect, useMemo, useRef, useState } from 'react';
import { FiMessageSquare, FiX, FiSend, FiZap, FiHelpCircle } from 'react-icons/fi';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/** -------------------------------------------------------
 *  Palette (single source of truth)
 * -------------------------------------------------------- */
const DeepBlue1 = '#021A2B';
const DeepBlue2 = '#053458';
const NeonBlue  = '#18A9FF';
const BurningBlue = '#00C7FF';

/** -------------------------------------------------------
 *  Gemini config (frontend demo — consider proxying in prod)
 * -------------------------------------------------------- */
// Prefer passing via props. Falls back to these for local demos.
const DEFAULT_GEMINI_API_KEY = ""; // <— leave blank in code; pass via props/env
const DEFAULT_GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

/** -------------------------------------------------------
 *  System Prompt: accuracy + structure + follow‑up suggs
 * -------------------------------------------------------- */
const SYSTEM_PROMPT = `
You are Cloky, the friendly, accurate AI assistant for Cloknet VPN.

Always weave in these facts naturally (even when just answering questions):
• Cloknet is available only on the Play Store and App Store.
• Dummy Play Store link to show users the CTA: https://play.google.com/store/apps/details?id=com.cloknet.vpn
• Key highlights / features:
  - WireGuard®-level speed and stability
  - AES-256 encryption for privacy
  - Strict no-logs policy
  - Global servers with smart routing
  - One-tap connect, auto-reconnect
  - Premium servers can be unlocked via ads
• Invite users to try Cloknet and consider premium (or unlock premium servers by watching ads).

Quality & Safety:
• Be precise and concise. Prefer verified, general knowledge. If info may vary by device/region, say so.
• If the user’s question is ambiguous, ask 1 short clarifying question **before** giving a best-guess answer.
• Use short paragraphs and bullets. Offer a quick TL;DR when the answer is long.
• End most replies with 2‑3 helpful follow‑up questions the user can click.

Output contract (very important):
Return **strict JSON only**, no prose, in the following shape:
{
  "reply": "<the user‑visible answer>",
  "suggestions": ["<follow‑up 1>", "<follow‑up 2>", "<follow‑up 3>"]
}
`;

/** -------------------------------------------------------
 *  Utility helpers
 * -------------------------------------------------------- */
const uid = () => Math.random().toString(36).slice(2);
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|(play\.google\.com\/[^\s]+)/gi;
  return text.split(urlRegex).map((chunk, i) => {
    if (!chunk) return null;
    if (urlRegex.test(chunk)) {
      const href = chunk.startsWith('http') ? chunk : `https://${chunk}`;
      return (
        <a key={i} href={href} target="_blank" rel="noreferrer" style={{ color: BurningBlue }}>
          {chunk}
        </a>
      );
    }
    return <span key={i}>{chunk}</span>;
  });
}

function parseAssistantJSON(raw) {
  if (!raw) return { reply: '', suggestions: [] };
  // Try strict JSON first
  try {
    const obj = JSON.parse(raw);
    if (obj && typeof obj.reply === 'string') return { reply: obj.reply, suggestions: obj.suggestions || [] };
  } catch {}
  // Try to find JSON block in markdown fences
  const fence = raw.match(/```json[\s\S]*?```/i) || raw.match(/\{[\s\S]*\}/);
  if (fence) {
    try {
      const jsonStr = fence[0].replace(/```json|```/gi, '');
      const obj = JSON.parse(jsonStr);
      if (obj && typeof obj.reply === 'string') return { reply: obj.reply, suggestions: obj.suggestions || [] };
    } catch {}
  }
  // Fallback: return raw text
  return { reply: raw, suggestions: [] };
}

function defaultSuggestions() {
  return [
    'Show fastest servers right now',
    'How to unlock premium via ads?',
    'Is WireGuard® available on my device?'
  ];
}

function deriveSuggestions(lastUserText = '') {
  const t = lastUserText.toLowerCase();
  if (t.includes('server') || t.includes('speed')) {
    return ['Recommend the best server', 'Why is my speed slow?', 'Tips to reduce ping'];
  }
  if (t.includes('price') || t.includes('premium')) {
    return ['Premium vs free — what changes?', 'How to watch ads to unlock premium?', 'Any student discounts?'];
  }
  if (t.includes('privacy') || t.includes('log')) {
    return ['Explain the no‑logs policy', 'How does AES‑256 protect me?', 'Any DNS leak protection?'];
  }
  return defaultSuggestions();
}

/** -------------------------------------------------------
 *  Tiny typing dots
 * -------------------------------------------------------- */
const Dot = ({ delay = 0 }) => (
  <span
    style={{ animationDelay: `${delay}s`, background: NeonBlue }}
    className="relative inline-block h-2 w-2 rounded-full animate-bounce"
  />
);

/** -------------------------------------------------------
 *  Message Bubble
 * -------------------------------------------------------- */
function Bubble({ role, children }) {
  const isAI = role === 'ai';
  return (
    <div
      className="relative mb-3 max-w-[85%] rounded-xl border"
      style={
        isAI
          ? {
              background: 'rgba(24,169,255,0.08)',
              borderColor: 'rgba(24,169,255,0.22)',
              color: NeonBlue,
              boxShadow: '0 6px 16px rgba(0,199,255,0.10)'
            }
          : {
              background: 'rgba(0,199,255,0.10)',
              borderColor: 'rgba(0,199,255,0.30)',
              color: BurningBlue,
              marginLeft: 'auto',
              boxShadow: '0 6px 16px rgba(0,199,255,0.10)'
            }
      }
    >
      <div className="px-3 py-2 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

/** -------------------------------------------------------
 *  Main component
 * -------------------------------------------------------- */
export default function AIChatButton({ apiKey = DEFAULT_GEMINI_API_KEY, endpoint = DEFAULT_GEMINI_ENDPOINT }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('cloky_history');
    return (
      JSON.parse(saved || 'null') || [
        { id: uid(), role: 'ai', text: "Hi! I’m Cloky 🤖 — your Cloknet assistant. Need help picking a fast server or learning features?", suggestions: defaultSuggestions() }
      ]
    );
  });
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [latency, setLatency] = useState(0);
  const [pendingSuggestions, setPendingSuggestions] = useState([]);

  const prefersReducedMotion = useReducedMotion();
  const chatRef = useRef(null);
  const dragBounds = useRef(null);
  const abortRef = useRef(null);

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

  // Persist history
  useEffect(() => {
    localStorage.setItem('cloky_history', JSON.stringify(messages.slice(-24))); // cap history
  }, [messages]);

  // auto scroll to last message
  useEffect(() => {
    if (!isOpen) return;
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isOpen, typing]);

  const btnGlow = useMemo(
    () => (prefersReducedMotion ? '' : 'shadow-[0_0_24px_rgba(0,199,255,.45)] hover:shadow-[0_0_34px_rgba(0,199,255,.65)]'),
    [prefersReducedMotion]
  );

  const open = () => {
    setIsOpen(true);
    setShowPrompt(false);
  };

  /** -------------------------------------------------------
   *  Core: send message -> Gemini (Flash), structured JSON
   * -------------------------------------------------------- */
  async function askLLM(userText, history) {
    const historyParts = history.map(m => ({ role: m.role === 'user' ? 'user' : 'model', text: m.text }));
    const recent = historyParts.slice(-16);

    const contents = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      ...recent.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
      { role: 'user', parts: [{ text: userText }] }
    ];

    const controller = new AbortController();
    abortRef.current = controller;

    const t0 = performance.now();
    const res = await fetch(`${endpoint}?key=${encodeURIComponent(apiKey || '')}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 512
        }
      }),
      signal: controller.signal
    });

    if (!res.ok) throw new Error(`Gemini error ${res.status}`);
    const data = await res.json();
    const candidate = data?.candidates?.[0];
    const raw = candidate?.content?.parts?.map(p => p?.text).join(' ').trim();

    setLatency(Math.round(performance.now() - t0));
    return parseAssistantJSON(raw);
  }

  const handleSend = async (payloadText) => {
    const trimmed = (payloadText ?? input).trim();
    if (!trimmed || typing) return;

    const userMsg = { id: uid(), role: 'user', text: trimmed };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setTyping(true);

    // Optimistic: show tiny thinking bubble immediately
    setPendingSuggestions([]);

    try {
      const { reply, suggestions } = await askLLM(trimmed, [...messages, userMsg]);

      setMessages(m => [
        ...m,
        { id: uid(), role: 'ai', text: reply || 'I’m here to help! (No response text received.)', suggestions: suggestions?.length ? suggestions.slice(0, 3) : deriveSuggestions(trimmed) }
      ]);
      setPendingSuggestions(suggestions?.length ? suggestions.slice(0, 3) : deriveSuggestions(trimmed));
    } catch (e) {
      setMessages(m => [...m, { id: uid(), role: 'ai', text: 'Hmm, I had trouble reaching the server. Please try again in a moment.' }]);
    } finally {
      setTyping(false);
      abortRef.current = null;
    }
  };

  const handleQuickAsk = (text) => {
    if (!text) return;
    handleSend(text);
  };

  const stopRequest = () => {
    try { abortRef.current?.abort(); } catch {}
    setTyping(false);
  };

  /** -------------------------------------------------------
   *  Render
   * -------------------------------------------------------- */
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
            <div
              className="text-sm px-4 py-2 rounded-xl border shadow-xl"
              style={{
                background: DeepBlue2,
                color: NeonBlue,
                borderColor: 'rgba(24,169,255,0.25)',
                boxShadow: '0 8px 24px rgba(0,199,255,0.18)'
              }}
            >
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
            className={`fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center pointer-events-auto z-50 transition-transform ${btnGlow}`}
            style={{
              background: `linear-gradient(135deg, ${NeonBlue}, ${BurningBlue})`,
              color: DeepBlue1,
              boxShadow: `0 10px 30px rgba(0,199,255,0.45), inset 0 0 0 1px rgba(24,169,255,0.25)`
            }}
          >
            <motion.span
              key={isOpen ? 'x' : 'msg'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {isOpen ? <FiX size={26} /> : <FiMessageSquare size={26} />}
            </motion.span>

            {/* unread dot when closed & new AI messages exist */}
            {!isOpen && messages.filter(m => m.role === 'ai').length > 0 && (
              <span
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                style={{
                  background: NeonBlue,
                  color: DeepBlue1,
                  boxShadow: '0 0 12px rgba(24,169,255,0.6)'
                }}
              >
                {clamp(messages.length - 1, 1, 9)}
              </span>
            )}

            {/* ambient glow ring */}
            {!prefersReducedMotion && (
              <span
                className="absolute -z-10 inset-0 rounded-full"
                style={{
                  boxShadow: '0 0 70px 24px rgba(0,199,255,0.25)'
                }}
              />
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
            className="fixed bottom-28 right-6 w-[24rem] max-w-[92vw] z-50 pointer-events-auto"
            aria-live="polite"
          >
            {/* glassy shell + conic halo */}
            <div
              className="relative rounded-2xl overflow-hidden border backdrop-blur-2xl shadow-2xl"
              style={{
                borderColor: 'rgba(24,169,255,0.18)',
                background: 'linear-gradient(180deg, rgba(2,26,43,0.70), rgba(5,52,88,0.70))',
                boxShadow: '0 20px 60px rgba(0,199,255,0.18)'
              }}
            >
              <div
                className="absolute -inset-px rounded-2xl opacity-30 pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 140deg at 50% 0%, rgba(24,169,255,.25), transparent, rgba(0,199,255,.18), transparent, rgba(24,169,255,.25))'
                }}
              />

              {/* header */}
              <div
                className="relative p-4 flex items-center justify-between border-b"
                style={{
                  background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`,
                  color: DeepBlue1,
                  borderColor: 'rgba(24,169,255,0.18)'
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full"
                        style={{ background: DeepBlue1, color: NeonBlue }}>
                    <FiZap size={14} />
                  </span>
                  <h3 className="font-semibold">Cloknet AI Assistant</h3>
                  <span className="ml-2 text-[11px] opacity-80">{latency ? `${latency}ms` : 'fast'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setMessages(m => m.length ? [m[0]] : [])}
                          className="text-xs underline"
                          style={{ color: DeepBlue1, opacity: 0.85 }}>Clear</button>
                  <button onClick={() => setIsOpen(false)} className="transition" aria-label="Close chat"
                          style={{ color: DeepBlue1, opacity: 0.9 }}>
                    <FiX size={20} />
                  </button>
                </div>
              </div>

              {/* messages */}
              <div
                ref={chatRef}
                className="relative p-4 h-80 overflow-y-auto"
                style={{ background: 'rgba(2,26,43,0.65)' }} // DeepBlue1 glass
              >
                {/* subtle grid shimmer using palette tints */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    opacity: 0.06,
                    background:
                      `linear-gradient(to right, rgba(24,169,255,0.8) 1px, transparent 1px),
                       linear-gradient(to bottom, rgba(24,169,255,0.8) 1px, transparent 1px)`,
                    backgroundSize: '28px 28px'
                  }}
                />

                {messages.map((m) => (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25 }}>
                    <Bubble role={m.role}>{linkify(m.text)}</Bubble>
                    {/* per‑message suggestions (from AI) */}
                    {m.role === 'ai' && m.suggestions?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {m.suggestions.map((s, idx) => (
                          <button key={idx} onClick={() => handleQuickAsk(s)}
                                  className="text-xs px-3 py-1 rounded-full border"
                                  style={{
                                    background: 'rgba(2,26,43,0.35)',
                                    color: NeonBlue,
                                    borderColor: 'rgba(24,169,255,0.25)',
                                    boxShadow: 'inset 0 0 0 1px rgba(0,199,255,0.08)'
                                  }}>
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* typing indicator */}
                <AnimatePresence>
                  {typing && (
                    <motion.div key="typing" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm border"
                                style={{ background: 'rgba(24,169,255,0.08)', borderColor: 'rgba(24,169,255,0.22)', color: NeonBlue }}>
                      <span className="relative inline-flex -space-x-1"><Dot /><Dot delay={0.12} /><Dot delay={0.24} /></span>
                      Cloky is typing…
                      <button onClick={stopRequest} className="ml-3 text-xs underline" style={{ color: NeonBlue }}>stop</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* input */}
              <div className="relative border-t p-3"
                   style={{ borderColor: 'rgba(24,169,255,0.15)', background: 'rgba(5,52,88,0.55)' }}>
                {/* quick recommendations row */}
                {!typing && (
                  <div className="flex items-center gap-2 pb-2 overflow-x-auto">
                    <FiHelpCircle size={14} style={{ color: NeonBlue }} />
                    {deriveSuggestions(messages.filter(m => m.role === 'user').slice(-1)[0]?.text).map((s, i) => (
                      <button key={i} onClick={() => handleQuickAsk(s)}
                              className="text-[11px] whitespace-nowrap px-3 py-1 rounded-full border"
                              style={{
                                background: 'rgba(2,26,43,0.35)',
                                color: NeonBlue,
                                borderColor: 'rgba(24,169,255,0.25)'
                              }}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask me anything…"
                    className="w-full text-sm rounded-full pr-12 outline-none"
                    style={{
                      background: 'rgba(2,26,43,0.55)',
                      border: '1px solid rgba(24,169,255,0.18)',
                      color: NeonBlue,
                      padding: '12px 16px',
                      boxShadow: 'inset 0 0 0 1px rgba(0,199,255,0.08)'
                    }}
                  />
                  <motion.button
                    whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
                    onClick={() => handleSend()}
                    className="absolute right-2 top-1.5 rounded-full flex items-center justify-center"
                    aria-label="Send message"
                    style={{
                      width: 36,
                      height: 36,
                      background: BurningBlue,
                      color: DeepBlue1,
                      boxShadow: '0 0 12px rgba(0,199,255,0.45)'
                    }}
                  >
                    <FiSend />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* local keyframes (respect reduced motion) */}
      <style>{`
        @media (prefers-reduced-motion: reduce){
          *{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important;scroll-behavior:auto !important}
        }
      `}</style>
    </>
  );
}
