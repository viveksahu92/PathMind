const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8').replace(/\r\n/g, '\n');

const oldFallback = `// Add fallback keys for other languages pointing to english UI configs dynamically to ensure absolute stability
const allLangs = ["french", "portuguese", "chinese", "arabic", "german", "japanese", "russian", "korean", "italian", "tamil", "telugu", "marathi"];
allLangs.forEach(lang => {
  UI[lang] = UI.english;
});`;

const newTranslations = `// ─── Full translations for all languages ─────────────────────────────────────
UI.french = {
  tagline: "Votre mentor universitaire IA 🎓",
  searchHeading: "Quelle université voulez-vous explorer ?",
  searchPlaceholder: "Tapez le nom d'une université...",
  searchBtn: "Rechercher",
  quickLabel: "Recherche rapide",
  popularLabel: "Les étudiants demandent souvent",
  tapExpand: "APPUYER POUR VOIR",
  askLabel: "POSEZ VOTRE QUESTION",
  askPlaceholder: "Posez n'importe quelle question...",
  futureBtn: "Parler à votre futur vous",
  futureSubtitle: "Que vous dirait un ancien étudiant ?",
  futurePlaceholder: "Demandez à votre futur vous...",
  futureSubhead: "ancien étudiant",
  by: "Recherche par PathMind",
  cards: {
    fees:      { q: "Quels sont les frais ?",         prompt: "What are the approximate total fees? Mention scholarships." },
    placement: { q: "Comment est l'emploi ?",          prompt: "How is the placement record? Mention average package." },
    hostel:    { q: "Y a-t-il un hébergement ?",       prompt: "Is hostel available? Monthly cost and facilities." },
    branch:    { q: "Quelle filière choisir ?",        prompt: "Which branch/course is best at this college?" },
  },
  questions: [
    "Comment obtenir une bourse complète pour étudier à l'étranger ?",
    "Le classement universitaire compte-il vraiment pour l'emploi ?",
    "Quel diplôme offre le salaire de départ le plus élevé ?",
    "Comment choisir la bonne voie professionnelle ?",
  ],
  futureGreet: (c) => \`Bonjour ! J'ai étudié à \${c} — j'ai maintenant 28 ans. Pose-moi toutes tes questions 😊\`,
  futureRole:  (c) => \`You are a 28-year-old professional who studied at \${c}. Speak in French as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.\`,
};

UI.portuguese = {
  tagline: "Seu mentor universitário IA 🎓",
  searchHeading: "Qual universidade você quer explorar?",
  searchPlaceholder: "Digite o nome da universidade...",
  searchBtn: "Pesquisar",
  quickLabel: "Pesquisa rápida",
  popularLabel: "Estudantes frequentemente perguntam",
  tapExpand: "TOQUE PARA EXPANDIR",
  askLabel: "FAÇA SUA PERGUNTA",
  askPlaceholder: "Pergunte qualquer coisa...",
  futureBtn: "Fale com seu eu do futuro",
  futureSubtitle: "O que um ex-aluno te diria?",
  futurePlaceholder: "Pergunte ao seu eu do futuro...",
  futureSubhead: "ex-aluno",
  by: "Pesquisa do PathMind",
  cards: {
    fees:      { q: "Quais são as taxas?",             prompt: "What are the approximate total fees? Mention scholarships." },
    placement: { q: "Como é o emprego?",               prompt: "How is the placement record? Mention average package." },
    hostel:    { q: "Há alojamento disponível?",       prompt: "Is hostel available? Monthly cost and facilities." },
    branch:    { q: "Qual curso escolher?",            prompt: "Which branch/course is best at this college?" },
  },
  questions: [
    "Como obter uma bolsa completa para estudar no exterior?",
    "O ranking universitário realmente importa para o emprego?",
    "Qual graduação tem o maior salário inicial?",
    "Como escolho o caminho profissional certo?",
  ],
  futureGreet: (c) => \`Olá! Estudei em \${c} — tenho 28 anos agora. Pode me perguntar tudo 😊\`,
  futureRole:  (c) => \`You are a 28-year-old professional who studied at \${c}. Speak in Portuguese as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.\`,
};

UI.chinese = {
  tagline: "您的AI大学导师 🎓",
  searchHeading: "您想了解哪所大学？",
  searchPlaceholder: "输入大学名称...",
  searchBtn: "搜索",
  quickLabel: "快速搜索",
  popularLabel: "学生常问",
  tapExpand: "点击展开",
  askLabel: "提问",
  askPlaceholder: "随时提问...",
  futureBtn: "与未来的自己对话",
  futureSubtitle: "一位校友会对你说什么？",
  futurePlaceholder: "问问未来的自己...",
  futureSubhead: "校友",
  by: "PathMind 研究",
  cards: {
    fees:      { q: "学费是多少？",     prompt: "What are the approximate total fees? Mention scholarships." },
    placement: { q: "就业情况怎么样？", prompt: "How is the placement record? Mention average package." },
    hostel:    { q: "有宿舍吗？",       prompt: "Is hostel available? Monthly cost and facilities." },
    branch:    { q: "选哪个专业？",     prompt: "Which branch/course is best at this college?" },
  },
  questions: [
    "如何获得全额奖学金出国留学？",
    "大学排名对找工作真的重要吗？",
    "哪个学位起薪最高？",
    "我该如何选择职业方向？",
  ],
  futureGreet: (c) => \`你好！我毕业于\${c}，现在28岁了。有什么想问我的吗 😊\`,
  futureRole:  (c) => \`You are a 28-year-old professional who studied at \${c}. Speak in Simplified Chinese as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.\`,
};

UI.arabic = {
  tagline: "مرشدك الجامعي بالذكاء الاصطناعي 🎓",
  searchHeading: "أي جامعة تريد استكشافها؟",
  searchPlaceholder: "اكتب اسم الجامعة...",
  searchBtn: "بحث",
  quickLabel: "بحث سريع",
  popularLabel: "الطلاب يسألون كثيراً",
  tapExpand: "اضغط للتوسع",
  askLabel: "اطرح سؤالك",
  askPlaceholder: "اسأل أي شيء...",
  futureBtn: "تحدث مع نفسك في المستقبل",
  futureSubtitle: "ماذا سيقول لك خريج من هذه الجامعة؟",
  futurePlaceholder: "اسأل نفسك في المستقبل...",
  futureSubhead: "خريج",
  by: "بحث من PathMind",
  cards: {
    fees:      { q: "ما هي الرسوم الدراسية؟",   prompt: "What are the approximate total fees? Mention scholarships." },
    placement: { q: "كيف هي فرص التوظيف؟",       prompt: "How is the placement record? Mention average package." },
    hostel:    { q: "هل يوجد سكن جامعي؟",        prompt: "Is hostel available? Monthly cost and facilities." },
    branch:    { q: "أي تخصص أختار؟",            prompt: "Which branch/course is best at this college?" },
  },
  questions: [
    "كيف أحصل على منحة دراسية كاملة للدراسة في الخارج؟",
    "هل تصنيف الجامعة مهم حقاً للحصول على وظيفة؟",
    "أي شهادة تمنح أعلى راتب ابتدائي؟",
    "كيف أختار المسار المهني الصحيح؟",
  ],
  futureGreet: (c) => \`مرحباً! درست في \${c}، عمري الآن 28 عاماً. اسألني أي شيء 😊\`,
  futureRole:  (c) => \`You are a 28-year-old professional who studied at \${c}. Speak in Arabic as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.\`,
};

UI.german = {
  tagline: "Ihr KI-Universitätsmentor 🎓",
  searchHeading: "Welche Universität möchten Sie erkunden?",
  searchPlaceholder: "Universitätsnamen eingeben...",
  searchBtn: "Suchen",
  quickLabel: "Schnellsuche",
  popularLabel: "Studenten fragen oft",
  tapExpand: "TIPPEN ZUM ÖFFNEN",
  askLabel: "STELLEN SIE IHRE FRAGE",
  askPlaceholder: "Fragen Sie alles...",
  futureBtn: "Sprechen Sie mit Ihrem zukünftigen Ich",
  futureSubtitle: "Was würde ein Absolvent zu Ihnen sagen?",
  futurePlaceholder: "Fragen Sie Ihr zukünftiges Ich...",
  futureSubhead: "Absolvent",
  by: "Recherche von PathMind",
  cards: {
    fees:      { q: "Was sind die Studiengebühren?",  prompt: "What are the approximate total fees? Mention scholarships." },
    placement: { q: "Wie ist die Jobvermittlung?",    prompt: "How is the placement record? Mention average package." },
    hostel:    { q: "Gibt es ein Wohnheim?",          prompt: "Is hostel available? Monthly cost and facilities." },
    branch:    { q: "Welchen Studiengang wählen?",    prompt: "Which branch/course is best at this college?" },
  },
  questions: [
    "Wie bekommt man ein Vollstipendium für ein Auslandsstudium?",
    "Ist das Hochschulranking wirklich wichtig für die Jobsuche?",
    "Welcher Abschluss hat das höchste Einstiegsgehalt?",
    "Wie wähle ich den richtigen Berufsweg?",
  ],
  futureGreet: (c) => \`Hallo! Ich habe in \${c} studiert — jetzt bin ich 28. Frag mich alles 😊\`,
  futureRole:  (c) => \`You are a 28-year-old professional who studied at \${c}. Speak in German as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.\`,
};

UI.japanese = {
  tagline: "AIの大学メンター 🎓",
  searchHeading: "どの大学を調べたいですか？",
  searchPlaceholder: "大学名を入力...",
  searchBtn: "検索",
  quickLabel: "クイック検索",
  popularLabel: "学生がよく聞く質問",
  tapExpand: "タップして展開",
  askLabel: "質問する",
  askPlaceholder: "何でも聞いてください...",
  futureBtn: "未来の自分と話す",
  futureSubtitle: "卒業生はあなたに何を言うでしょう？",
  futurePlaceholder: "未来の自分に聞く...",
  futureSubhead: "卒業生",
  by: "PathMind 調査",
  cards: {
    fees:      { q: "学費はいくら？",       prompt: "What are the approximate total fees? Mention scholarships." },
    placement: { q: "就職率は？",           prompt: "How is the placement record? Mention average package." },
    hostel:    { q: "寮はありますか？",     prompt: "Is hostel available? Monthly cost and facilities." },
    branch:    { q: "どの学科がいい？",     prompt: "Which branch/course is best at this college?" },
  },
  questions: [
    "海外留学の奨学金を得るには？",
    "大学のランキングは就職に本当に重要？",
    "どの学位が一番高い初任給？",
    "正しいキャリアパスをどう選ぶ？",
  ],
  futureGreet: (c) => \`こんにちは！\${c}で勉強しました。今28歳です。何でも聞いてね 😊\`,
  futureRole:  (c) => \`You are a 28-year-old professional who studied at \${c}. Speak in Japanese as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.\`,
};

UI.russian = {
  tagline: "Ваш ИИ-ментор по университетам 🎓",
  searchHeading: "Какой университет вы хотите изучить?",
  searchPlaceholder: "Введите название университета...",
  searchBtn: "Искать",
  quickLabel: "Быстрый поиск",
  popularLabel: "Студенты часто спрашивают",
  tapExpand: "НАЖМИТЕ ДЛЯ ПРОСМОТРА",
  askLabel: "ЗАДАЙТЕ ВОПРОС",
  askPlaceholder: "Спросите что угодно...",
  futureBtn: "Поговори с будущим собой",
  futureSubtitle: "Что сказал бы тебе выпускник?",
  futurePlaceholder: "Спроси своё будущее я...",
  futureSubhead: "выпускник",
  by: "Исследование PathMind",
  cards: {
    fees:      { q: "Какая стоимость обучения?",  prompt: "What are the approximate total fees? Mention scholarships." },
    placement: { q: "Как с трудоустройством?",    prompt: "How is the placement record? Mention average package." },
    hostel:    { q: "Есть ли общежитие?",         prompt: "Is hostel available? Monthly cost and facilities." },
    branch:    { q: "Какой факультет выбрать?",   prompt: "Which branch/course is best at this college?" },
  },
  questions: [
    "Как получить полную стипендию для учёбы за рубежом?",
    "Действительно ли рейтинг университета важен для работы?",
    "Какая специальность даёт самую высокую начальную зарплату?",
    "Как выбрать правильный карьерный путь?",
  ],
  futureGreet: (c) => \`Привет! Я учился в \${c} — сейчас мне 28 лет. Спроси меня о чём угодно 😊\`,
  futureRole:  (c) => \`You are a 28-year-old professional who studied at \${c}. Speak in Russian as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.\`,
};

UI.korean = {
  tagline: "AI 대학 멘토 🎓",
  searchHeading: "어떤 대학을 알아보고 싶으신가요?",
  searchPlaceholder: "대학 이름 입력...",
  searchBtn: "검색",
  quickLabel: "빠른 검색",
  popularLabel: "학생들이 자주 묻는 질문",
  tapExpand: "탭하여 펼치기",
  askLabel: "질문하기",
  askPlaceholder: "무엇이든 물어보세요...",
  futureBtn: "미래의 나와 대화하기",
  futureSubtitle: "졸업생이 당신에게 무슨 말을 할까요?",
  futurePlaceholder: "미래의 나에게 물어보기...",
  futureSubhead: "졸업생",
  by: "PathMind 리서치",
  cards: {
    fees:      { q: "학비는 얼마인가요?",       prompt: "What are the approximate total fees? Mention scholarships." },
    placement: { q: "취업률은 어떤가요?",        prompt: "How is the placement record? Mention average package." },
    hostel:    { q: "기숙사가 있나요?",          prompt: "Is hostel available? Monthly cost and facilities." },
    branch:    { q: "어떤 전공이 좋나요?",       prompt: "Which branch/course is best at this college?" },
  },
  questions: [
    "해외 유학을 위한 전액 장학금을 받는 방법은?",
    "대학 순위가 취업에 정말 중요한가요?",
    "어떤 학위가 초봉이 가장 높나요?",
    "올바른 커리어 경로를 어떻게 선택하나요?",
  ],
  futureGreet: (c) => \`안녕하세요! 저는 \${c}를 졸업했고, 지금 28살이에요. 뭐든지 물어보세요 😊\`,
  futureRole:  (c) => \`You are a 28-year-old professional who studied at \${c}. Speak in Korean as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.\`,
};

UI.italian = {
  tagline: "Il tuo mentore universitario IA 🎓",
  searchHeading: "Quale università vuoi esplorare?",
  searchPlaceholder: "Digita il nome dell'università...",
  searchBtn: "Cerca",
  quickLabel: "Ricerca rapida",
  popularLabel: "Gli studenti chiedono spesso",
  tapExpand: "TOCCA PER ESPANDERE",
  askLabel: "FAI LA TUA DOMANDA",
  askPlaceholder: "Chiedi qualsiasi cosa...",
  futureBtn: "Parla con il tuo io futuro",
  futureSubtitle: "Cosa ti direbbe un ex studente?",
  futurePlaceholder: "Chiedi al tuo io futuro...",
  futureSubhead: "ex studente",
  by: "Ricerca di PathMind",
  cards: {
    fees:      { q: "Quali sono le tasse?",          prompt: "What are the approximate total fees? Mention scholarships." },
    placement: { q: "Com'è il lavoro?",              prompt: "How is the placement record? Mention average package." },
    hostel:    { q: "C'è un dormitorio?",            prompt: "Is hostel available? Monthly cost and facilities." },
    branch:    { q: "Quale corso scegliere?",        prompt: "Which branch/course is best at this college?" },
  },
  questions: [
    "Come ottenere una borsa di studio completa per studiare all'estero?",
    "Il ranking universitario conta davvero per trovare lavoro?",
    "Quale laurea ha lo stipendio iniziale più alto?",
    "Come scelgo il percorso professionale giusto?",
  ],
  futureGreet: (c) => \`Ciao! Ho studiato a \${c} — ora ho 28 anni. Chiedimi tutto 😊\`,
  futureRole:  (c) => \`You are a 28-year-old professional who studied at \${c}. Speak in Italian as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.\`,
};

UI.tamil = {
  tagline: "உங்கள் AI கல்லூரி வழிகாட்டி 🎓",
  searchHeading: "எந்த கல்லூரியை ஆராய விரும்புகிறீர்கள்?",
  searchPlaceholder: "கல்லூரி பெயர் தட்டச்சு செய்யுங்கள்...",
  searchBtn: "தேடு",
  quickLabel: "விரைவு தேடல்",
  popularLabel: "மாணவர்கள் அடிக்கடி கேட்பவை",
  tapExpand: "தட்டி விரிவாக்கு",
  askLabel: "உங்கள் கேள்வி கேளுங்கள்",
  askPlaceholder: "எதுவும் கேளுங்கள்...",
  futureBtn: "உங்கள் எதிர்கால நானிடம் பேசுங்கள்",
  futureSubtitle: "ஒரு முன்னாள் மாணவர் என்ன சொல்வார்?",
  futurePlaceholder: "எதிர்கால உங்களிடம் கேளுங்கள்...",
  futureSubhead: "முன்னாள் மாணவர்",
  by: "PathMind ஆராய்ச்சி",
  cards: {
    fees:      { q: "கட்டணம் எவ்வளவு?",           prompt: "What are the approximate total fees? Mention scholarships." },
    placement: { q: "வேலைவாய்ப்பு எப்படி?",        prompt: "How is the placement record? Mention average package." },
    hostel:    { q: "விடுதி உள்ளதா?",              prompt: "Is hostel available? Monthly cost and facilities." },
    branch:    { q: "எந்த பிரிவு தேர்வு செய்வது?", prompt: "Which branch/course is best at this college?" },
  },
  questions: [
    "வெளிநாட்டில் படிக்க முழு உதவித்தொகை எப்படி பெறுவது?",
    "கல்லூரி தரவரிசை வேலைக்கு உண்மையில் முக்கியமா?",
    "எந்த பட்டம் அதிக சம்பளம் தருகிறது?",
    "சரியான தொழில் பாதையை எப்படி தேர்வு செய்வது?",
  ],
  futureGreet: (c) => \`வணக்கம்! நான் \${c}-ல் படித்தேன் — இப்போது 28 வயது. எதுவும் கேளுங்கள் 😊\`,
  futureRole:  (c) => \`You are a 28-year-old professional who studied at \${c}. Speak in Tamil as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.\`,
};

UI.telugu = {
  tagline: "మీ AI కళాశాల మార్గదర్శి 🎓",
  searchHeading: "మీరు ఏ కళాశాలను అన్వేషించాలనుకుంటున్నారు?",
  searchPlaceholder: "కళాశాల పేరు టైప్ చేయండి...",
  searchBtn: "వెతుకు",
  quickLabel: "త్వరిత శోధన",
  popularLabel: "విద్యార్థులు తరచు అడిగేవి",
  tapExpand: "నొక్కి విస్తరించండి",
  askLabel: "మీ ప్రశ్న అడగండి",
  askPlaceholder: "ఏదైనా అడగండి...",
  futureBtn: "మీ భవిష్యత్తు నానితో మాట్లాడండి",
  futureSubtitle: "పూర్వ విద్యార్థి మీకు ఏమి చెప్తారు?",
  futurePlaceholder: "భవిష్యత్తు నానిని అడగండి...",
  futureSubhead: "పూర్వ విద్యార్థి",
  by: "PathMind పరిశోధన",
  cards: {
    fees:      { q: "ఫీజు ఎంత?",              prompt: "What are the approximate total fees? Mention scholarships." },
    placement: { q: "ప్లేస్‌మెంట్ ఎలా ఉంది?", prompt: "How is the placement record? Mention average package." },
    hostel:    { q: "హాస్టల్ ఉందా?",           prompt: "Is hostel available? Monthly cost and facilities." },
    branch:    { q: "ఏ బ్రాంచ్ ఎంచుకోవాలి?",  prompt: "Which branch/course is best at this college?" },
  },
  questions: [
    "విదేశాలలో చదవడానికి పూర్తి స్కాలర్‌షిప్ ఎలా పొందాలి?",
    "కళాశాల ర్యాంకింగ్ నిజంగా ఉద్యోగానికి ముఖ్యమా?",
    "ఏ డిగ్రీకి అత్యధిక ప్రారంభ జీతం ఉంటుంది?",
    "సరైన కెరీర్ మార్గాన్ని ఎలా ఎంచుకోవాలి?",
  ],
  futureGreet: (c) => \`నమస్కారం! నేను \${c}-లో చదివాను — ఇప్పుడు 28 సంవత్సరాలు. ఏదైనా అడగండి 😊\`,
  futureRole:  (c) => \`You are a 28-year-old professional who studied at \${c}. Speak in Telugu as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.\`,
};

UI.marathi = {
  tagline: "तुमचा AI महाविद्यालय मार्गदर्शक 🎓",
  searchHeading: "कोणत्या महाविद्यालयाबद्दल जाणून घ्यायचे आहे?",
  searchPlaceholder: "महाविद्यालयाचे नाव लिहा...",
  searchBtn: "शोधा",
  quickLabel: "जलद शोध",
  popularLabel: "विद्यार्थी नेहमी विचारतात",
  tapExpand: "विस्तारण्यासाठी दाबा",
  askLabel: "तुमचा प्रश्न विचारा",
  askPlaceholder: "काहीही विचारा...",
  futureBtn: "भविष्यातील स्वतःशी बोला",
  futureSubtitle: "एक माजी विद्यार्थी तुम्हाला काय सांगेल?",
  futurePlaceholder: "भविष्यातील स्वतःला विचारा...",
  futureSubhead: "माजी विद्यार्थी",
  by: "PathMind संशोधन",
  cards: {
    fees:      { q: "फी किती आहे?",              prompt: "What are the approximate total fees? Mention scholarships." },
    placement: { q: "प्लेसमेंट कसे आहे?",        prompt: "How is the placement record? Mention average package." },
    hostel:    { q: "वसतिगृह उपलब्ध आहे का?",   prompt: "Is hostel available? Monthly cost and facilities." },
    branch:    { q: "कोणती शाखा निवडावी?",       prompt: "Which branch/course is best at this college?" },
  },
  questions: [
    "परदेशात शिक्षणासाठी पूर्ण शिष्यवृत्ती कशी मिळवावी?",
    "महाविद्यालयाची रँकिंग नोकरीसाठी खरोखरच महत्त्वाची आहे का?",
    "कोणत्या पदवीला सर्वाधिक प्रारंभिक वेतन मिळते?",
    "योग्य करिअर मार्ग कसा निवडावा?",
  ],
  futureGreet: (c) => \`नमस्कार! मी \${c} मधून शिकलो — आता मी 28 वर्षांचा आहे. कोणतेही प्रश्न विचारा 😊\`,
  futureRole:  (c) => \`You are a 28-year-old professional who studied at \${c}. Speak in Marathi as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.\`,
};`;

if (content.includes(oldFallback)) {
  content = content.replace(oldFallback, newTranslations);
  console.log('✅ SUCCESS: All 12 language translations injected, fallback removed.');
} else {
  console.error('❌ Pattern not found. Dumping lines 119-125:');
  content.split('\n').slice(118, 125).forEach((l, i) => console.log(i+119, '|', JSON.stringify(l)));
}

fs.writeFileSync('src/App.jsx', content, 'utf8');
console.log('✅ File saved.');
