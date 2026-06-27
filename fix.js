const fs = require('fs');
const path = 'c:/Users/vivek/OneDrive/Desktop/study material/PathMind/src/App.jsx';
const lines = fs.readFileSync(path, 'utf8').split('\n');
const top = lines.slice(0, 591).join('\n'); // 0 to 590, line 591 is // ─── Home Screen ──...
const bottom = `// ─── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({ onSearch, lang, setLang }) {
  const [query, setQuery] = useState("");
  const t = UI[lang];

  const go = (q) => { const v = (q || query).trim(); if (v) onSearch(v); };

  return (
    <div className="min-h-screen bg-white flex flex-col w-full">
      {/* Hero Section */}
      <div className="px-6 py-12 md:py-20 relative flex flex-col items-center md:text-center w-full" style={{ background: \`linear-gradient(160deg, \${GREEN_LIGHT} 0%, #fff 100%)\` }}>
        
        {/* Language selector */}
        <div className="absolute top-4 right-4 md:top-6 md:right-8">
          <select value={lang} onChange={e => setLang(e.target.value)} className="text-xs md:text-sm font-semibold rounded-lg px-2 py-1 outline-none cursor-pointer" style={{ border: \`1.5px solid \${GREEN}44\`, color: GREEN_DARK, background: "rgba(255,255,255,0.8)", backdropFilter: "blur(4px)" }}>
            {LANGS.map(l => <option key={l.id} value={l.id}>{l.flag} {l.full}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-3 md:gap-4 mb-3">
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center shadow-md" style={{ background: GREEN }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="md:w-8 md:h-8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">PathMind</span>
        </div>
        <p className="text-sm md:text-lg text-gray-600 mb-8 md:mb-12">{t.tagline}</p>

        {/* Search Box */}
        <div className="w-full max-w-2xl text-left">
          <p className="font-bold text-gray-800 md:text-lg mb-2 pl-1 md:text-center">{t.searchHeading}</p>
          <div className="flex items-center bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200 mb-5 md:p-2 md:rounded-3xl">
            <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && go()} placeholder={t.searchPlaceholder} className="flex-1 bg-transparent outline-none px-4 text-sm md:text-base text-gray-800" />
            <button onClick={() => go()} className="text-white px-5 py-2.5 md:px-8 md:py-3.5 rounded-xl md:rounded-2xl font-bold shadow-sm transition hover:opacity-90 cursor-pointer" style={{ background: GREEN }}>
              {t.searchBtn}
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:justify-center items-start md:items-center gap-3">
            <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">{t.quickLabel}</span>
            <div className="flex flex-wrap gap-2">
              {QUICK_CHIPS.map(chip => (
                <button key={chip} onClick={() => go(chip)} className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold transition cursor-pointer" style={{ background: GREEN_LIGHT + "88", color: GREEN_DARK, border: \`1px solid \${GREEN}33\` }}>
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Common questions */}
      <div className="w-full max-w-4xl mx-auto px-6 py-10 flex-1">
        <p className="text-[11px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{t.popularLabel}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          {t.questions.map(q => (
            <HomeExpandCard key={q} question={q} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Home Expand Card ─────────────────────────────────────────────────────────
function HomeExpandCard({ question, lang }) {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { setAnswer(null); setOpen(false); }, [lang]);

  const toggle = async () => {
    setOpen(o => !o);
    if (!answer && !loading) {
      setLoading(true);
      try {
        const text = await askGemini([{ role: "user", content: question }], lang);
        setAnswer(text);
      } catch (err) { setAnswer(err.message || "Error"); }
      setLoading(false);
    }
  };

  return (
    <div style={{ borderRadius: 10, background: "#f8f8f8", border: "1px solid #eeeeee", overflow: "hidden", transition: "all 0.2s" }}>
      <button onClick={toggle} style={{ width: "100%", padding: "12px 16px", background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", gap: 8, fontSize: 14, color: "#333", lineHeight: 1.4, textAlign: "left" }}>
        <span>{question}</span>
        <span style={{ color: "#ccc", fontSize: 16, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>›</span>
      </button>
      {open && (
        <div style={{ padding: "0 16px 16px", fontSize: 14, color: "#444", lineHeight: 1.6 }}>
          {loading ? <Spinner /> : <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{answer}</p>}
        </div>
      )}
    </div>
  );
}

// ─── Expand Card ──────────────────────────────────────────────────────────────
function ExpandCard({ college, cardKey, lang }) {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const t = UI[lang].cards[cardKey];
  const icons = { fees: "💰", placement: "💼", hostel: "🏠", branch: "🎯" };

  // Reset answer when language changes
  useEffect(() => { setAnswer(null); setOpen(false); }, [lang]);

  const toggle = async () => {
    setOpen(o => !o);
    if (!answer && !loading) {
      setLoading(true);
      try {
        const text = await askGemini([{ role: "user", content: \`College: \${college}. \${t.prompt}\` }], lang);
        setAnswer(text);
      } catch (err) { setAnswer(err.message || "Could not fetch answer. Please try again."); }
      setLoading(false);
    }
  };

  return (
    <div style={{ borderRadius: 12, border: \`1.5px solid \${open ? GREEN + "55" : "#ebebeb"}\`, overflow: "hidden", background: open ? GREEN_LIGHT + "44" : "#fff", transition: "border-color 0.2s" }}>
      <button onClick={toggle} style={{ width: "100%", padding: "14px 16px", background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: open ? GREEN : "#f2f2f2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s", fontSize: 16 }}>
            {icons[cardKey]}
          </div>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#111", textAlign: "left" }}>{t.q}</span>
        </div>
        <span style={{ fontSize: 18, color: open ? GREEN : "#ccc", transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>›</span>
      </button>
      {open && (
        <div style={{ padding: "4px 16px 16px", borderTop: \`1px solid \${GREEN}22\` }}>
          {loading ? <Spinner /> : <p style={{ margin: 0, fontSize: 14, color: "#333", lineHeight: 1.75 }}>{answer}</p>}
        </div>
      )}
    </div>
  );
}

// ─── Future Self Chat ─────────────────────────────────────────────────────────
function FutureSelfChat({ college, lang, onClose }) {
  const t = UI[lang];
  const [messages, setMessages] = useState([{ role: "assistant", content: t.futureGreet(college) }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async () => {
    const val = input.trim();
    if (!val || loading) return;
    setInput("");
    const newMsgs = [...messages, { role: "user", content: val }];
    setMessages(newMsgs);
    setLoading(true);
    try {
      const sysForFuture = t.futureRole(college);
      const text = await askGemini(newMsgs, lang, sysForFuture);
      setMessages(m => [...m, { role: "assistant", content: text || "..." }]);
    } catch { setMessages(m => [...m, { role: "assistant", content: "Network error. Try again." }]); }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.52)", zIndex: 100, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", maxHeight: "85vh", display: "flex", flexDirection: "column", overflow: "hidden", maxWidth: 600, margin: "0 auto", width: "100%" }}>
        <div style={{ padding: "14px 18px", background: GREEN, color: "#fff", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🧑💼</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>Tu @ 28</p>
            <p style={{ margin: 0, fontSize: 12, opacity: 0.85 }}>{college} {t.futureSubhead}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 4 }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 8px", display: "flex", flexDirection: "column", gap: 9 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "82%", padding: "10px 14px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role === "user" ? GREEN : "#f1f1f1", color: m.role === "user" ? "#fff" : "#222", fontSize: 14, lineHeight: 1.65 }}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex" }}>
              <div style={{ background: "#f1f1f1", borderRadius: "16px 16px 16px 4px", padding: "10px 14px" }}><Spinner /></div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={{ padding: "10px 12px 22px", borderTop: "1px solid #f0f0f0", display: "flex", gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder={t.futurePlaceholder}
            style={{ flex: 1, height: 44, borderRadius: 22, border: "1.5px solid #e0e0e0", padding: "0 16px", fontSize: 14, outline: "none", background: "#fafafa" }}
            onFocus={e => e.target.style.borderColor = GREEN} onBlur={e => e.target.style.borderColor = "#e0e0e0"} />
          <button onClick={send} style={{ width: 44, height: 44, borderRadius: "50%", background: GREEN, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────
function ResultScreen({ college, lang, setLang, onBack }) {
  const [showFuture, setShowFuture] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef(null);
  const t = UI[lang];

  useEffect(() => { chatBottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages, chatLoading]);

  const sendChat = async () => {
    const val = chatInput.trim();
    if (!val || chatLoading) return;
    setChatInput("");
    const userContent = \`College: \${college}. \${val}\`;
    const newMsgs = [...chatMessages, { role: "user", content: val }];
    setChatMessages(newMsgs);
    setChatLoading(true);
    try {
      const apiMsgs = chatMessages.map(m => ({ role: m.role, content: m.content }));
      apiMsgs.push({ role: "user", content: userContent });
      const res = await askGemini(apiMsgs, lang);
      setChatMessages(m => [...m, { role: "assistant", content: res }]);
    } catch { setChatMessages(m => [...m, { role: "assistant", content: "Error. Try again." }]); }
    setChatLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 md:px-8 md:py-4 flex items-center gap-4 shadow-sm">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-900 text-2xl font-light px-2 cursor-pointer bg-transparent border-none">←</button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg md:text-2xl font-bold text-gray-900 truncate m-0 leading-tight">{college}</h1>
          <p className="text-xs md:text-sm text-gray-400 m-0">{t.by}</p>
        </div>
        <select value={lang} onChange={e => setLang(e.target.value)} className="text-xs md:text-sm font-semibold rounded-lg px-2 py-1.5 outline-none cursor-pointer flex-shrink-0" style={{ border: \`1.5px solid \${GREEN}44\`, color: GREEN_DARK, background: GREEN_LIGHT }}>
          {LANGS.map(l => <option key={l.id} value={l.id}>{l.flag} {l.full}</option>)}
        </select>
      </div>

      <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
        
        {/* Left Column: Info Cards */}
        <div className="w-full md:flex-1 space-y-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest m-0">{t.tapExpand}</p>
          <div className="flex flex-col gap-3">
            {["fees", "placement", "hostel", "branch"].map(key => (
              <ExpandCard key={key + lang} college={college} cardKey={key} lang={lang} />
            ))}
          </div>
        </div>

        {/* Right Column: Future & Chat */}
        <div className="w-full md:w-[400px] lg:w-[460px] flex flex-col gap-6 md:sticky md:top-24">
          
          {/* Future self button */}
          <button onClick={() => setShowFuture(true)} className="w-full p-4 md:p-5 rounded-2xl border-none cursor-pointer text-white flex items-center gap-4 shadow-md transition hover:opacity-95 hover:scale-[1.02]" style={{ background: \`linear-gradient(135deg, \${GREEN} 0%, \${GREEN_DARK} 100%)\` }}>
            <span className="text-3xl md:text-4xl">🔮</span>
            <div className="text-left flex-1">
              <p className="m-0 font-bold text-base md:text-lg leading-tight">{t.futureBtn}</p>
              <p className="m-0 text-xs md:text-sm opacity-90 mt-1">{t.futureSubtitle}</p>
            </div>
            <span className="text-2xl opacity-60">›</span>
          </button>

          {/* Chat Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col h-[400px] md:h-[550px]">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t.askLabel}</p>
            
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-3 pr-2" style={{ scrollbarWidth: "thin" }}>
              {chatMessages.length === 0 && (
                <div className="flex-1 flex items-center justify-center text-gray-300 text-sm italic text-center px-4">
                  {t.askPlaceholder}
                </div>
              )}
              {chatMessages.map((m, i) => (
                <div key={i} className={\`flex \${m.role === "user" ? "justify-end" : "justify-start"}\`}>
                  <div className={\`max-w-[85%] px-4 py-2.5 text-sm md:text-base leading-relaxed \${m.role === "user" ? "rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm text-white" : "rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm text-gray-800 bg-gray-100"}\`} style={{ background: m.role === "user" ? GREEN : undefined }}>
                    {m.content}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm px-4 py-3"><Spinner /></div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-200 focus-within:border-gray-300 focus-within:bg-white transition-colors mt-auto">
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder={t.askPlaceholder} className="flex-1 bg-transparent border-none outline-none px-4 text-sm md:text-base text-gray-800 h-10" />
              <button onClick={sendChat} className="w-10 h-10 rounded-full flex items-center justify-center border-none cursor-pointer shadow-sm hover:scale-105 transition-transform flex-shrink-0" style={{ background: \`linear-gradient(135deg, \${GREEN} 0%, \${GREEN_DARK} 100%)\` }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginLeft: -2 }}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showFuture && <FutureSelfChat college={college} lang={lang} onClose={() => setShowFuture(false)} />}
    </div>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function PathMind() {
  const [college, setCollege] = useState(null);
  const [lang, setLang] = useState("english");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full font-sans" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Noto Sans, sans-serif" }}>
      {college
        ? <ResultScreen college={college} lang={lang} setLang={setLang} onBack={() => setCollege(null)} />
        : <HomeScreen onSearch={setCollege} lang={lang} setLang={setLang} />}
    </div>
  );
}
`;
fs.writeFileSync(path, top + '\n' + bottom);
console.log('Fixed file successfully.');
