const fs = require('fs');

// Read and normalize line endings to \n for reliable string matching
let content = fs.readFileSync('src/App.jsx', 'utf8').replace(/\r\n/g, '\n');

// ─── FIX 1: Repair the broken HomeExpandCard return + restore ExpandCard + getAdmissionData + AdmissionOverlay ──
const broken = `  return (
    <div className="rounded-2xl bg-white border border-gray-150 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button onClick={toggle} className="w-full p-4 bg-transparent border-none flex items-center justify-between cursor-pointer gap-3 text-sm text-gray-700 font-semibold text-left leading-normal">
        <span>{question}</span>
        <ChevronRight size={18} style={{ color: GREEN, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
      </button>
  const toggle = async () => {
  return data;
}

// ─── Admission Overlay ─────────────────────────────────────────────────────────
function AdmissionOverlay({ college, onClose }) {
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState(null);

  const fetchAdmission = async () => {
    setStatus("loading");
    setData(null);
    const timeoutId = setTimeout(() => setStatus("error"), 10000);
    try {
      const result = await getAdmissionData(college);
      clearTimeout(timeoutId);
      setData(result);
      setStatus("success");
    } catch {
      clearTimeout(timeoutId);
      setStatus("error");
    }
  };`;

const fixed = `  return (
    <div className="rounded-2xl bg-white border border-gray-150 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button onClick={toggle} className="w-full p-4 bg-transparent border-none flex items-center justify-between cursor-pointer gap-3 text-sm text-gray-700 font-semibold text-left leading-normal">
        <span>{question}</span>
        <ChevronRight size={18} style={{ color: GREEN, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed pt-1">
          {loading ? <Spinner /> : <p className="m-0 whitespace-pre-wrap">{answer}</p>}
        </div>
      )}
    </div>
  );
}

// ─── Expand Card ──────────────────────────────────────────────────────────────
function ExpandCard({ college, cardKey, lang, expandedCard, setExpandedCard }) {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const t = UI[lang].cards[cardKey];
  const meta = CARD_META[cardKey];

  useEffect(() => { setAnswer(null); setOpen(false); }, [lang]);

  useEffect(() => {
    if (expandedCard === cardKey) {
      setOpen(true);
      if (setExpandedCard) setExpandedCard(null);
    }
  }, [expandedCard, cardKey, setExpandedCard]);

  const toggle = async () => {
    const nextOpen = !open;
    setOpen(nextOpen);
    if (nextOpen && !answer && !loading) {
      setLoading(true);
      try {
        const text = await askGemini([{ role: "user", content: \`College: \${college}. \${t.prompt}\` }], lang);
        setAnswer(text);
      } catch (err) { setAnswer(err.message || "Could not fetch answer. Please try again."); }
      setLoading(false);
    }
  };

  return (
    <div id={\`card-\${cardKey}\`}
      className={\`rounded-2xl border overflow-hidden transition-all duration-200 \${open ? "shadow-md bg-green-50/10" : "shadow-sm bg-white hover:border-gray-300 hover:shadow"}\`}
      style={{ borderColor: open ? GREEN : "#e2e8f0", borderWidth: open ? "1.5px" : "1px", borderLeftWidth: open ? "4px" : "1px", borderLeftColor: open ? GREEN : undefined }}>
      <button onClick={toggle} className="w-full p-4 bg-transparent border-none flex items-start justify-between cursor-pointer gap-2 text-left">
        <div className="flex gap-3.5 items-start flex-1 min-w-0">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg border bg-gray-50 border-gray-150 text-gray-700">
            {CARD_ICONS[cardKey]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[15px] font-bold text-gray-900 tracking-tight">{t.q}</span>
              {meta.badge && meta.badge[lang] && (
                <span className={\`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider \${meta.badgeStyle}\`}>{meta.badge[lang]}</span>
              )}
            </div>
            <span className="text-xs text-gray-400 block mt-1.5 font-medium leading-normal truncate">{meta.subtitle[lang]}</span>
          </div>
        </div>
        <ChevronRight size={18} style={{ color: open ? GREEN : "#94a3b8", transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginTop: 4 }} />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-2.5" style={{ borderTop: \`1px solid \${GREEN}11\` }}>
          {loading ? <SkeletonLoader /> : <p className="m-0 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{answer}</p>}
        </div>
      )}
    </div>
  );
}

// ─── Admission Data Fetch ─────────────────────────────────────────────────────
async function getAdmissionData(collegeName) {
  const prompt = \`Return ONLY raw JSON with no markdown and no backticks.
Provide admission info for "\${collegeName}" college.
Use this exact JSON structure:
{
  "admissionOpen": true,
  "applicationDeadline": "YYYY-MM-DD or null",
  "admissionRound": "round name or null",
  "eligibility": {
    "qualification": "required qualification",
    "minMarks": "minimum marks/percentage",
    "minMarksReserved": "reserved category marks or null",
    "ageLimit": "age limit or No limit",
    "language": "English"
  },
  "acceptedExams": [
    { "code": "CODE", "name": "Full Name", "programs": "programs", "tag": "Preferred" }
  ],
  "applyUrl": "official URL or null",
  "processSteps": [
    { "title": "step 1", "subtitle": "detail", "status": "done" },
    { "title": "step 2", "subtitle": "detail", "status": "active" },
    { "title": "step 3", "subtitle": "detail", "status": "upcoming" },
    { "title": "step 4", "subtitle": "detail", "status": "upcoming" }
  ]
}
Use real data. Return exactly 4 processSteps. Return raw JSON only.\`;

  const raw = await askGemini(
    [{ role: "user", content: prompt }],
    "english",
    "You are a JSON generator. Return only valid raw JSON. No markdown. No explanation."
  );

  let data;
  try {
    const firstBrace = raw.indexOf('{');
    const lastBrace = raw.lastIndexOf('}');
    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) throw new Error("No JSON found");
    data = JSON.parse(raw.substring(firstBrace, lastBrace + 1));
  } catch (err) {
    console.error("Admission parse error:", err.message);
    throw new Error("Invalid JSON from Gemini");
  }

  if (data.applicationDeadline) {
    const today = new Date();
    const deadline = new Date(data.applicationDeadline);
    if (!isNaN(deadline) && deadline < today) {
      data.admissionOpen = false;
      data.deadlinePassed = true;
    }
  }
  return data;
}

// ─── Admission Overlay ─────────────────────────────────────────────────────────
function AdmissionOverlay({ college, onClose }) {
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState(null);

  const fetchAdmission = async () => {
    setStatus("loading");
    setData(null);
    // 30s timeout — thinking model needs more time
    const timeoutId = setTimeout(() => setStatus("error"), 30000);
    try {
      const result = await getAdmissionData(college);
      clearTimeout(timeoutId);
      setData(result);
      setStatus("success");
    } catch (err) {
      console.error("fetchAdmission error:", err.message);
      clearTimeout(timeoutId);
      setStatus("error");
    }
  };`;

if (content.includes(broken)) {
  content = content.replace(broken, fixed);
  console.log('✅ FIX 1: Repaired ExpandCard + getAdmissionData + AdmissionOverlay');
} else {
  console.error('❌ FIX 1 FAILED: Pattern not found');
}

// ─── FIX 2: Rating — add "via Google" source below star rating ───────────────
const oldRating = `{snapshot?.rating ? \`\${snapshot.rating.replace(/[^0-9./]/g, '').trim()} \\u2B50\` : "N/A"}`;
const newRating = `{snapshot?.rating ? (
                    <div style={{ lineHeight: 1.1 }}>
                      <span>{snapshot.rating.replace(/[^0-9./]/g, '').trim()} ⭐</span>
                      <span style={{ fontSize: 8, color: "#9ca3af", display: "block", marginTop: 2 }}>via Google</span>
                    </div>
                  ) : "N/A"}`;

if (content.includes(oldRating)) {
  content = content.replace(oldRating, newRating);
  console.log('✅ FIX 2: Rating source added');
} else {
  console.log('ℹ️  FIX 2: Rating pattern not found, trying alternate...');
  // Try after previous fix that may have replaced it already
  const alt = `{snapshot?.rating ? (
                    <>
                      <span>{snapshot.rating.replace(/[^0-9./]/g, '').trim()} ⭐</span>
                      <span className="text-[8px] font-normal text-gray-400 block mt-0.5 leading-tight">via Google</span>
                    </>
                  ) : "N/A"}`;
  if (content.includes(alt)) {
    console.log('✅ FIX 2: Rating source already applied');
  }
}

// ─── FIX 3: Ask Your Question — replace empty chatMessages empty state ────────
// Make the empty state compact and show a suggested question
const oldEmptyChat = `{chatMessages.length === 0 && !chatLoading && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 py-12">
                      <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mb-1">
                        <MessageCircle size={20} color="#d1d5db" strokeWidth={1.5} />
                      </div>
                      <p className="text-xs text-gray-400 m-0 font-medium">{CHAT_EMPTY_TEXT[lang] || "No questions yet. Ask anything below!"}</p>
                    </div>
                  )}`;

const newEmptyChat = `{chatMessages.length === 0 && !chatLoading && (
                    <div className="flex flex-col gap-2 py-3">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider m-0 px-1">Try asking:</p>
                      {[
                        "What is the average placement package?",
                        "Is this college good for CSE?",
                        "What are the hostel facilities like?"
                      ].map((q) => (
                        <button
                          key={q}
                          onClick={() => setChatInput(q)}
                          className="text-left px-3 py-2 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 text-xs text-gray-600 font-medium cursor-pointer transition-colors"
                          style={{ fontFamily: "inherit" }}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}`;

if (content.includes(oldEmptyChat)) {
  content = content.replace(oldEmptyChat, newEmptyChat);
  console.log('✅ FIX 3: Empty chat state replaced with suggested questions');
} else {
  console.log('ℹ️  FIX 3: Empty chat pattern not found — may already be updated');
}

// ─── FIX 4: Green CTA card — replace heavy gradient with flat solid color ─────
// The "Talk to your future self" CTA card uses a gradient that clashes with flat UI
const oldCTAGradient = `style={{ background: \`linear-gradient(135deg, \${GREEN} 0%, \${GREEN_DARK} 100%)\` }}`;
const newCTAFlat = `style={{ background: GREEN }}`;

if (content.includes(oldCTAGradient)) {
  content = content.replace(new RegExp(oldCTAGradient.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newCTAFlat);
  console.log('✅ FIX 4: CTA gradient replaced with flat color');
} else {
  console.log('ℹ️  FIX 4: CTA gradient pattern not found — checking alternate form...');
  // Try simple gradient replace
  const altGrad = 'linear-gradient(135deg, #1a7a4a 0%, #0d3d26 100%)';
  if (content.includes(altGrad)) {
    content = content.replace(altGrad, '#1a7a4a');
    console.log('✅ FIX 4: CTA gradient replaced (alternate form)');
  }
}

fs.writeFileSync('src/App.jsx', content, 'utf8');
console.log('\n✅ All fixes written to src/App.jsx');
