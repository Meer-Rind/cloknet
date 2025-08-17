import { useEffect, useMemo, useRef, useState } from 'react';
import { FiMessageSquare, FiX, FiSend, FiClock, FiZap, FiTrash2, FiImage } from 'react-icons/fi';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/** -------------------------------------------------------
 *  Palette — ONLY these colors are used (with alpha)
 * -------------------------------------------------------- */
const DeepBlue1 = '#021A2B';
const DeepBlue2 = '#053458';
const NeonBlue  = '#18A9FF';
const BurningBlue = '#00C7FF';

/** -------------------------------------------------------
 *  INLINE Gemini config — as requested
 *  (Frontend keys are visible; ok per your instruction.)
 * -------------------------------------------------------- */
const GEMINI_API_KEY = "AIzaSyANsPOp5UZBferKu3l2pk2Xw8xDMdM6P2U"; // inline
const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

/** -------------------------------------------------------
 *  Localized UI strings & starter suggestions
 * -------------------------------------------------------- */
const UI = {
  en: {
    name: 'English',
    placeholder: 'Ask me anything…',
    typing: 'Cloky is typing…',
    header: 'Cloknet AI Assistant',
    clear: 'Clear',
    promptHello: "👋 Hi, I’m Cloky. How can I help you?",
    starter: [
      "What’s the fastest server right now?",
      "How do I unlock premium servers?",
      "Is my data logged?",
      "Speed is slow — what should I do?",
      "How to enable auto-reconnect?"
    ],
    send: 'Send',
    cancel: 'Cancel',
    attach: 'Attach image'
  },
  ur: {
    name: 'اردو',
    placeholder: 'جو بھی پوچھنا ہے لکھیں…',
    typing: 'کلونکی لکھ رہا ہے…',
    header: 'کلوک نیٹ اے آئی اسسٹنٹ',
    clear: 'کلئیر',
    promptHello: "👋 السلام علیکم! میں کلونکی ہوں۔ کیسے مدد کر سکتا ہوں؟",
    starter: [
      "ابھی سب سے تیز سرور کون سا ہے؟",
      "پریمیم سرور کیسے ان لاک کریں؟",
      "کیا میرا ڈیٹا لاگ ہوتا ہے؟",
      "سپیڈ سست ہے، کیا کروں؟",
      "آٹو ری کنیکٹ کیسے آن کریں؟"
    ],
    send: ' بھیجیں ',
    cancel: 'منسوخ',
    attach: 'تصویر منسلک کریں'
  },
  hi: {
    name: 'हिंदी',
    placeholder: 'जो भी पूछना हो लिखें…',
    typing: 'क्लोकी टाइप कर रहा है…',
    header: 'क्लोकनेट एआई असिस्टेंट',
    clear: 'क्लियर',
    promptHello: "👋 नमस्ते! मैं क्लोकी हूँ, आपकी मदद के लिए तैयार।",
    starter: [
      "अभी सबसे तेज़ सर्वर कौन सा है?",
      "प्रीमियम सर्वर कैसे अनलॉक करें?",
      "क्या मेरा डेटा लॉग होता है?",
      "स्पीड धीमी है, क्या करूँ?",
      "ऑटो-रीकनेक्ट कैसे ऑन करें?"
    ],
    send: 'भेजें',
    cancel: 'रद्द करें',
    attach: 'छवि जोड़ें'
  },
  bn: {
    name: 'বাংলা',
    placeholder: 'যা জানতে চান লিখুন…',
    typing: 'ক্লোকি লিখছে…',
    header: 'ক্লোকনেট এআই অ্যাসিস্ট্যান্ট',
    clear: 'ক্লিয়ার',
    promptHello: "👋 হ্যালো! আমি ক্লোকি। কীভাবে সাহায্য করতে পারি?",
    starter: [
      "এখন সবচেয়ে দ্রুত সার্ভার কোনটি?",
      "প্রিমিয়াম সার্ভার কীভাবে আনলক করবো?",
      "আমার ডাটা কি লগ করা হয়?",
      "স্পিড স্লো হলে কী করবো?",
      "অটো-রিকানেক্ট চালু করার উপায়?"
    ],
    send: 'পাঠান',
    cancel: 'বাতিল',
    attach: 'ছবি যোগ করুন'
  }
};

/** -------------------------------------------------------
 *  System prompt — accuracy, tone, app facts, language lock
 * -------------------------------------------------------- */
function buildSystemPrompt(targetLangCode) {
  const langName = UI[targetLangCode]?.name || 'English';
  return `
You are Cloky, the friendly AI assistant for Cloknet VPN.

RESPOND STRICTLY IN: ${langName} (${targetLangCode}).
- Do not mix languages.
- Do not miss punctuation or diacritics (even a single dot).
- Be professional and friendly.
- Prefer short, precise paragraphs and helpful bullet points.
- If the user’s question is unclear, ask ONE concise clarifying question first (in ${langName}).
- If an image is provided, use it to improve the answer.

Always and naturally weave in these facts when relevant:
• Cloknet is available only on the Play Store and App Store.
• Dummy Play Store link (CTA): https://play.google.com/store/apps/details?id=com.cloknet.vpn
• Key highlights:
  - WireGuard®-level speed & stability
  - AES-256 encryption for privacy
  - Strict no-logs policy
  - Global servers with smart routing
  - One-tap connect, auto-reconnect
  - Premium servers can be unlocked by watching ads

Return answers in pure JSON (no markdown fences):
{
  "reply": "<final answer in ${langName}>",
  "suggestions": ["<3-5 short follow-up questions in ${langName}>"]
}
`.trim();
}

/** -------------------------------------------------------
 *  Script-based auto-detect (per message)
 * -------------------------------------------------------- */
function detectLangByScript(text) {
  if (/[؀-ۿ]/.test(text)) return 'ur';     // Arabic script → Urdu
  if (/[ऀ-ॿ]/.test(text)) return 'hi';     // Devanagari → Hindi
  if (/[ঀ-৿]/.test(text)) return 'bn';     // Bengali script
  return 'en';
}

/** -------------------------------------------------------
 *  Linkify plaintext
 * -------------------------------------------------------- */
function LinkifiedText({ text }) {
  const parts = (text || '').split(/(https?:\/\/[^\s)]+)|(\n+)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        if (p?.startsWith('http')) {
          return (
            <a key={i} href={p} target="_blank" rel="noopener noreferrer"
               style={{ textDecoration: 'underline', color: NeonBlue }}>
              {p}
            </a>
          );
        }
        if (p === '\n') return <br key={i} />;
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

/** Tiny typing dot */
const Dot = ({ delay = 0 }) => (
  <span
    style={{ animationDelay: `${delay}s`, background: NeonBlue }}
    className="relative inline-block h-2 w-2 rounded-full animate-bounce"
  />
);

/** Language picker (glassy) */
function LangPicker({ value, onChange }) {
  return (
    <div
      className="rounded-lg px-2 py-1 text-xs"
      style={{
        background: 'rgba(2,26,43,0.18)',
        color: DeepBlue1,
        boxShadow: 'inset 0 0 0 1px rgba(2,26,43,0.22)'
      }}
      title="Language"
    >
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none"
        style={{ color: DeepBlue1 }}
      >
        <option value="en">{UI.en.name}</option>
        <option value="ur">{UI.ur.name}</option>
        <option value="hi">{UI.hi.name}</option>
        <option value="bn">{UI.bn.name}</option>
      </select>
    </div>
  );
}

/** -------------------------------------------------------
 *  Main component — fully responsive + image upload
 * -------------------------------------------------------- */
const AIChatButton = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const [selectedLang, setSelectedLang] = useState('en');
  const [messages, setMessages] = useState([{ role: 'ai', text: UI.en.promptHello, ts: Date.now() }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [latency, setLatency] = useState(null);
  const [errTip, setErrTip] = useState('');
  const [chips, setChips] = useState(UI.en.starter);

  const [imageFile, setImageFile] = useState(null);          // File
  const [imagePreview, setImagePreview] = useState('');      // data URL
  const [imageBase64, setImageBase64] = useState('');        // base64 (without prefix)
  const [imageMime, setImageMime] = useState('');            // mime

  const chatRef = useRef(null);
  const dragBounds = useRef(null);
  const abortRef = useRef(null);

  // Show launcher after 5s, prompt for 5s
  useEffect(() => {
    const t = setTimeout(() => {
      setIsVisible(true);
      setShowPrompt(true);
      const t2 = setTimeout(() => setShowPrompt(false), 5000);
      return () => clearTimeout(t2);
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  // Auto scroll
  useEffect(() => {
    if (!isOpen) return;
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isOpen, typing, imagePreview]);

  // Update localized chips when language changes
  useEffect(() => {
    setChips(UI[selectedLang]?.starter || UI.en.starter);
  }, [selectedLang]);

  const btnGlow = useMemo(
    () => (prefersReducedMotion ? '' : 'shadow-[0_0_24px_rgba(0,199,255,.45)] hover:shadow-[0_0_34px_rgba(0,199,255,.65)]'),
    [prefersReducedMotion]
  );

  const open = () => {
    setIsOpen(true);
    setShowPrompt(false);
  };

  /** Convert image to base64 for Gemini inlineData */
  const handleImagePick = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result; // e.g., data:image/png;base64,xxxx
      setImagePreview(String(dataUrl));
      const [prefix, b64] = String(dataUrl).split('base64,');
      const mime = (prefix || '').match(/data:(.*);base64/i)?.[1] || file.type;
      setImageBase64(b64 || '');
      setImageMime(mime);
      setImageFile(file);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview('');
    setImageBase64('');
    setImageMime('');
  };

  /** ---------------------------------------------
   * Core: ask Gemini → JSON {reply, suggestions}
   * Supports optional inline image.
   * --------------------------------------------- */
  async function askLLM(userText, history, targetLang) {
    const controller = new AbortController();
    abortRef.current = controller;

    const now = performance.now();

    // Prepare history (last 16 turns)
    const histParts = history.slice(-16).map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    // Build parts for the user's message: text + optional image inlineData
    const userParts = [{ text: userText }];
    if (imageBase64 && imageMime) {
      userParts.push({
        inlineData: {
          mimeType: imageMime,
          data: imageBase64
        }
      });
    }

    const contents = [
      { role: 'user', parts: [{ text: buildSystemPrompt(targetLang) }] },
      ...histParts,
      { role: 'user', parts: userParts }
    ];

    const res = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: { temperature: 0.2, topP: 0.8, topK: 40, maxOutputTokens: 700 }
      }),
      signal: controller.signal
    });

    const elapsed = Math.round(performance.now() - now);
    setLatency(elapsed);

    let data;
    try { data = await res.json(); } catch {}

    if (!res.ok) {
      const reason = data?.error?.message || `HTTP ${res.status}`;
      throw new Error(`Gemini error: ${reason}`);
    }

    const text = data?.candidates?.[0]?.content?.parts?.map(p => p?.text).join(' ')?.trim() || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    let json;
    if (jsonMatch) {
      try { json = JSON.parse(jsonMatch[0]); } catch {}
    }
    if (!json || typeof json.reply !== 'string') {
      json = { reply: text || '…', suggestions: [] };
    }
    if (!Array.isArray(json.suggestions)) json.suggestions = [];
    return json;
  }

  /** ---------------------------------------------
   *  Send message
   * --------------------------------------------- */
  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed && !imageBase64) return; // allow image-only questions
    if (typing) return;

    // Auto-detect language from script; prefer user script
    const detected = detectLangByScript(trimmed || '');
    const targetLang = detected !== selectedLang ? detected : selectedLang;
    if (detected && detected !== selectedLang) setSelectedLang(detected);

    // Render user's message bubble + (optional) attached image preview below it
    const composedUserText = imagePreview
      ? `${trimmed || ''}${trimmed ? '\n' : ''}[Image attached]`
      : trimmed || (UI[targetLang]?.attach || UI.en.attach);

    const userMsg = { role: 'user', text: composedUserText, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setErrTip('');

    try {
      const { reply, suggestions } = await askLLM(trimmed || '(image query)', [...messages, userMsg], targetLang);
      setMessages((m) => [...m, { role: 'ai', text: reply, ts: Date.now() }]);

      // Update chips
      const localizedFallback = UI[targetLang]?.starter || UI.en.starter;
      const uniq = Array.from(new Set((suggestions || []).concat(localizedFallback))).slice(0, 5);
      setChips(uniq);
    } catch (e) {
      const reason = e?.message || 'Network error';
      setErrTip(reason);
      setMessages((m) => [
        ...m,
        {
          role: 'ai',
          text:
`I couldn’t reach the AI service.

Reason: ${reason}

Checklist:
• API key present?
• API enabled & billing/quota ok?
• Referrer/domain allowed (browser key)?
• Endpoint correct (${GEMINI_ENDPOINT})?
`,
          ts: Date.now()
        }
      ]);
    } finally {
      setTyping(false);
      abortRef.current = null;
      // After sending an image, clear it (so next msg is clean)
      clearImage();
    }
  };

  const handleCancel = () => {
    try { abortRef.current?.abort(); } catch {}
    setTyping(false);
  };

  const handleChip = (q) => {
    setInput(q);
    setTimeout(handleSend, 0);
  };

  const clearChat = () => {
    setMessages([{ role: 'ai', text: UI[selectedLang]?.promptHello || UI.en.promptHello, ts: Date.now() }]);
    setErrTip('');
    setLatency(null);
    clearImage();
  };

  /** ------------- RENDER ------------- */
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
            className="fixed bottom-28 right-4 sm:right-6 z-50 pointer-events-auto"
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
              {UI[selectedLang]?.promptHello || UI.en.promptHello}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button (draggable on desktop, fixed on mobile) */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            aria-label={isOpen ? 'Close chat' : 'Open chat'}
            onClick={() => (isOpen ? setIsOpen(false) : open())}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            drag={typeof window !== 'undefined' && window.innerWidth >= 640}  // draggable on >= sm
            dragConstraints={dragBounds}
            dragElastic={0.12}
            dragMomentum={!useReducedMotion}
            whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center pointer-events-auto z-50 transition-transform ${btnGlow}`}
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
              {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
            </motion.span>

            {/* unread dot when closed & new AI messages exist */}
            {!isOpen && messages.length > 1 && (
              <span
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                style={{ background: NeonBlue, color: DeepBlue1, boxShadow: '0 0 12px rgba(24,169,255,0.6)' }}
              >
                {Math.min(messages.length - 1, 9)}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Box — FULL-SCREEN on mobile, FLOATING on desktop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`
              fixed z-50 pointer-events-auto
              inset-x-0 bottom-0 top-14
              sm:top-auto sm:bottom-28 sm:right-6 sm:left-auto
              sm:w-[26rem] sm:max-w-[92vw]
            `}
          >
            {/* glassy shell + conic halo */}
            <div
              className={`
                relative overflow-hidden border backdrop-blur-2xl shadow-2xl
                rounded-none sm:rounded-2xl
                h-full sm:h-auto
              `}
              style={{
                borderColor: 'rgba(24,169,255,0.18)',
                background: 'linear-gradient(180deg, rgba(2,26,43,0.80), rgba(5,52,88,0.78))',
                boxShadow: '0 20px 60px rgba(0,199,255,0.18)'
              }}
            >
              <div
                className="absolute -inset-px opacity-30 pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 140deg at 50% 0%, rgba(24,169,255,.25), transparent, rgba(0,199,255,.18), transparent, rgba(24,169,255,.25))'
                }}
              />

              {/* header */}
              <div
                className="relative px-3 sm:px-4 py-3 flex items-center justify-between border-b"
                style={{
                  background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`,
                  color: DeepBlue1,
                  borderColor: 'rgba(24,169,255,0.18)'
                }}
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm sm:text-base">{UI[selectedLang]?.header || UI.en.header}</h3>
                  {latency != null && (
                    <span
                      className="hidden sm:inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(2,26,43,0.18)',
                        color: DeepBlue1,
                        boxShadow: 'inset 0 0 0 1px rgba(2,26,43,0.22)'
                      }}
                      title="Round-trip time"
                    >
                      <FiClock size={12} />
                      {latency}ms
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <LangPicker value={selectedLang} onChange={setSelectedLang} />
                  <button
                    onClick={clearChat}
                    className="rounded-md px-2 py-1 text-xs font-semibold"
                    title={UI[selectedLang]?.clear || UI.en.clear}
                    style={{
                      background: 'rgba(2,26,43,0.18)',
                      color: DeepBlue1,
                      boxShadow: 'inset 0 0 0 1px rgba(2,26,43,0.22)'
                    }}
                  >
                    <span className="inline-flex items-center gap-1">
                      <FiTrash2 size={12} /> {UI[selectedLang]?.clear || UI.en.clear}
                    </span>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="transition"
                    style={{ color: DeepBlue1, opacity: 0.9 }}
                    aria-label="Close chat"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              </div>

              {/* messages area */}
              <div
                ref={chatRef}
                className="relative p-3 sm:p-4 overflow-y-auto"
                style={{
                  background: 'rgba(2,26,43,0.65)',
                  height: 'calc(100% - 152px)' // header + suggestions + input approx on mobile
                }}
              >
                {/* subtle grid shimmer */}
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

                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="relative mb-3 max-w-[92%] sm:max-w-[85%] rounded-lg border text-sm"
                    style={
                      m.role === 'ai'
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
                    <div className="px-3 py-2 leading-relaxed">
                      <LinkifiedText text={m.text} />
                    </div>
                  </motion.div>
                ))}

                {/* show image preview bubble (before sending) */}
                {imagePreview && (
                  <div
                    className="relative mb-3 max-w-[92%] sm:max-w-[85%] rounded-lg border"
                    style={{
                      background: 'rgba(0,199,255,0.10)',
                      borderColor: 'rgba(0,199,255,0.30)',
                      color: BurningBlue,
                      marginLeft: 'auto',
                      boxShadow: '0 6px 16px rgba(0,199,255,0.10)'
                    }}
                  >
                    <div className="px-3 py-2 text-xs opacity-80">Image attached (will be sent)</div>
                    <div className="px-3 pb-3">
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="w-full h-auto rounded-md border"
                        style={{ borderColor: 'rgba(24,169,255,0.22)' }}
                      />
                    </div>
                  </div>
                )}

                {/* typing indicator */}
                <AnimatePresence>
                  {typing && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm border"
                      style={{
                        background: 'rgba(24,169,255,0.08)',
                        borderColor: 'rgba(24,169,255,0.22)',
                        color: NeonBlue
                      }}
                    >
                      <span className="relative inline-flex -space-x-1">
                        <Dot />
                        <Dot delay={0.12} />
                        <Dot delay={0.24} />
                      </span>
                      {UI[selectedLang]?.typing || UI.en.typing}
                      <button
                        onClick={handleCancel}
                        className="ml-3 inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(0,199,255,0.12)',
                          color: BurningBlue,
                          boxShadow: 'inset 0 0 0 1px rgba(0,199,255,0.25)'
                        }}
                        title={UI[selectedLang]?.cancel || UI.en.cancel}
                      >
                        <FiZap size={12} /> {UI[selectedLang]?.cancel || UI.en.cancel}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* error tip */}
                {errTip && (
                  <div className="mt-2 text-xs" style={{ color: BurningBlue, opacity: 0.9 }}>
                    {errTip}
                  </div>
                )}
              </div>

              {/* suggestions (chips) */}
              <div
                className="relative border-t p-2"
                style={{ borderColor: 'rgba(24,169,255,0.15)', background: 'rgba(5,52,88,0.55)' }}
              >
                <div className="flex gap-2 flex-wrap">
                  {chips.slice(0, 5).map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChip(s)}
                      className="text-xs px-3 py-1 rounded-full border transition"
                      style={{
                        background: 'rgba(2,26,43,0.35)',
                        borderColor: 'rgba(24,169,255,0.25)',
                        color: NeonBlue,
                        boxShadow: '0 4px 10px rgba(0,199,255,0.12)'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* input + image attach */}
              <div
                className="relative border-t p-2 sm:p-3"
                style={{ borderColor: 'rgba(24,169,255,0.15)', background: 'rgba(5,52,88,0.55)' }}
              >
                <div className="flex items-center gap-2">
                  {/* image uploader */}
                  <label
                    className="shrink-0 inline-flex items-center gap-2 text-xs px-3 py-2 rounded-full border cursor-pointer"
                    style={{
                      background: 'rgba(2,26,43,0.35)',
                      borderColor: 'rgba(24,169,255,0.25)',
                      color: NeonBlue
                    }}
                    title={UI[selectedLang]?.attach || UI.en.attach}
                  >
                    <FiImage />
                    <span className="hidden sm:inline">{UI[selectedLang]?.attach || UI.en.attach}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImagePick(e.target.files?.[0])}
                    />
                  </label>

                  {/* text input */}
                  <div className="relative grow">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                      placeholder={UI[selectedLang]?.placeholder || UI.en.placeholder}
                      className="w-full text-sm rounded-full pr-24 outline-none"
                      style={{
                        background: 'rgba(2,26,43,0.55)',
                        border: '1px solid rgba(24,169,255,0.18)',
                        color: NeonBlue,
                        padding: '12px 16px',
                        boxShadow: 'inset 0 0 0 1px rgba(0,199,255,0.08)'
                      }}
                    />
                    <div className="absolute right-1 top-1 flex gap-2">
                      {imagePreview && (
                        <button
                          onClick={clearImage}
                          className="rounded-full px-3 text-xs"
                          style={{
                            background: 'rgba(2,26,43,0.35)',
                            color: NeonBlue,
                            boxShadow: 'inset 0 0 0 1px rgba(24,169,255,0.25)'
                          }}
                          title="Remove image"
                        >
                          ×
                        </button>
                      )}
                      <motion.button
                        whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
                        onClick={handleSend}
                        className="rounded-full flex items-center justify-center"
                        aria-label={UI[selectedLang]?.send || UI.en.send}
                        style={{
                          minWidth: 36,
                          height: 36,
                          padding: '0 12px',
                          background: BurningBlue,
                          color: DeepBlue1,
                          boxShadow: '0 0 12px rgba(0,199,255,0.45)'
                        }}
                        title={UI[selectedLang]?.send || UI.en.send}
                      >
                        <FiSend />
                        <span className="hidden sm:inline ml-1 text-xs">{UI[selectedLang]?.send || UI.en.send}</span>
                      </motion.button>
                    </div>
                  </div>
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
};

export default AIChatButton;
