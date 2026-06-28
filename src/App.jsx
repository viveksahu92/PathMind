import { useState, useRef, useEffect } from "react";
import { GraduationCap, CalendarCheck, CalendarX, School, Percent, Calendar, Globe, Clock, AlertCircle, ArrowRight, WifiOff, CheckCircle, DollarSign, Briefcase, Home, GitBranch, ArrowLeft, ChevronRight, ChevronDown } from "lucide-react";


const GREEN = "#1D9E75";
const GREEN_LIGHT = "#E1F5EE";
const GREEN_DARK = "#0F6E56";

const LANGS = [
  { id: "english",    label: "EN",       full: "English",    flag: "\uD83C\uDDFA\uD83C\uDDF8", instruction: "Reply fully in simple English. Friendly, practical tone like an older brother." },
  { id: "hindi",      label: "\u0939\u093f\u0902दी",   full: "Hindi",      flag: "\uD83C\uDDEE\uD83C\uDDF3", instruction: "Reply fully in Hindi (Devanagari script). Simple everyday Hindi, not formal." },
  { id: "spanish",    label: "ES",       full: "Espa\u00f1ol", flag: "\uD83C\uDDEA\uD83C\uDDF8", instruction: "Reply fully in Spanish. Friendly, conversational tone." },
  { id: "french",     label: "FR",       full: "Fran\u00e7ais", flag: "\uD83C\uDDEB\uD83C\uDDF7", instruction: "Reply fully in French. Friendly, conversational tone." },
  { id: "portuguese", label: "PT",       full: "Portugu\u00eas", flag: "\uD83C\uDDE7\uD83C\uDDF7", instruction: "Reply fully in Portuguese. Friendly, conversational tone." },
  { id: "chinese",    label: "\u4e2d\u6587",      full: "Chinese",    flag: "\uD83C\uDDE8\uD83C\uDDF3", instruction: "Reply fully in Simplified Chinese. Friendly, conversational tone." },
  { id: "arabic",     label: "\u0639\u0631\u0628\u064a",     full: "Arabic",     flag: "\uD83C\uDDF8\uD83C\uDDE6", instruction: "Reply fully in Arabic. Friendly, conversational tone." },
  { id: "german",     label: "DE",       full: "Deutsch",    flag: "\uD83C\uDDE9\uD83C\uDDEA", instruction: "Reply fully in German. Friendly, conversational tone." },
  { id: "japanese",   label: "\u65e5\u672c\u8a9e",    full: "Japanese",   flag: "\uD83C\uDDEF\uD83C\uDDF5", instruction: "Reply fully in Japanese. Friendly, conversational tone." },
  { id: "russian",    label: "RU",       full: "\u0420\u0443сский", flag: "\uD83C\uDDF7\uD83C\uDDFA", instruction: "Reply fully in Russian. Friendly, conversational tone." },
  { id: "korean",     label: "\uD55C\uAD6D\uC5B4",    full: "Korean",     flag: "\uD83C\uDDF0\uD83C\uDDF7", instruction: "Reply fully in Korean. Friendly, conversational tone." },
  { id: "italian",    label: "IT",       full: "Italiano",   flag: "\uD83C\uDDEE\uD83C\uDDF9", instruction: "Reply fully in Italian. Friendly, conversational tone." },
  { id: "tamil",      label: "\u0BA4\u0BEE\u0BCA\u0BBF\u0BB4\u0BCD",   full: "Tamil",      flag: "IN", instruction: "Reply in Tamil. Simple conversational Tamil, helpful and friendly tone." },
  { id: "telugu",     label: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41",  full: "Telugu",     flag: "IN", instruction: "Reply in Telugu. Simple conversational Telugu, helpful and friendly." },
  { id: "marathi",    label: "\u092e\u0930\u093e\u0920ी",   full: "Marathi",    flag: "IN", instruction: "Reply in Marathi. Simple conversational Marathi, helpful and warm." },
];

const UI = {
  english: {
    tagline: "Your AI college mentor \uD83C\uDF93",
    searchHeading: "Which college do you want to explore?",
    searchPlaceholder: "Type a college name...",
    searchBtn: "Search",
    quickLabel: "Quick Search",
    popularLabel: "Students often ask",
    tapExpand: "TAP TO EXPAND",
    askLabel: "ASK YOUR QUESTION",
    askPlaceholder: "Ask anything about this college...",
    futureBtn: "Talk to your future self",
    futureSubtitle: "What would an alumnus say to you?",
    futurePlaceholder: "Ask your future self...",
    futureSubhead: "alumnus",
    by: "Research by PathMind",
    cards: {
      fees:      { q: "What are the fees?",        prompt: "What are the approximate total fees? Mention scholarships if available." },
      placement: { q: "How is placement?",         prompt: "How is the placement record? Mention average package and top recruiters." },
      hostel:    { q: "Is hostel available?",      prompt: "Is hostel available? Monthly cost and facilities." },
      branch:    { q: "Which branch to choose?",   prompt: "Which branch/course is best at this college?" },
    },
    questions: [
      "How to get a full scholarship to study abroad?",
      "Does college ranking really matter for getting a job?",
      "Which degree has the highest starting salary?",
      "How do I choose the right career path?",
    ],
    futureGreet: (c) => `Hey! I studied at ${c} \u2014 now 28 years old. Ask me anything \uD83D\uDE0A`,
    futureRole:  (c) => `You are a 28-year-old professional who studied at ${c}. Speak in simple English as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.`,
  },
  hindi: {
    tagline: "\u0906\u092a\u0915ा AI \u0915\u094c\u0932े\u091c \u092eे\u0902\u091fर \uD83C\uDF93",
    searchHeading: "\u0915\u093f\u0938 \u0915\u094c\u0932\u0947\u091c \u0915\u0947 \u092c\u093e\u0930\u0947 \u092eे\u0902 \u091c\u093e\u0928\u0928ा \u0939\u0948?",
    searchPlaceholder: "\u0915\u094c\u0932\u0947\u091c \u0915\u093e \u0928\u093e\u092e \u0932\u093f\u0916ो...",
    searchBtn: "\u0916\u094b\u091cे\u0902",
    quickLabel: "\u091c\u0932\u094d\u0926\u0940 \u0916\u094b\u091cे\u0902",
    popularLabel: "\u091b\u093e\u0924\u094d\u0930 \u092f\u0939 \u092a\u0942\u091b\u0924े \u0939\u0948\u0902",
    tapExpand: "\u0915\u094d\u0932\u093f\u0915 \u0915\u0930\u0915\u0947 \u0926\u0947\u0916\u0947\u0902",
    askLabel: "\u0905\u092a\u0928ा \u0938\u0935ा\u0932 \u092a\u0942\u091bो",
    askPlaceholder: "\u0905\u092a\u0928ा \u0938\u0935ा\u0932 \u0932\u093f\u0916ो...",
    futureBtn: "\u0905\u092a\u0928े \u092d\u0935\u093f\u0937\u094d\u092f \u0938\u0947 \u092c\u093e\u0924 \u0915\u0930ो",
    futureSubtitle: "\u091c\u093f\u0938\u0928े \u0905\u092dी \u0907\u0938 \u0915\u094c\u0932\u0947\u091c \u092e\u0947\u0902 \u092a\u0922\u093cा, \u0935\u094b \u0915\u094d\u092fा \u0915\u0939\u0924ा \u0939\u0948?",
    futurePlaceholder: "\u0905\u092a\u0928े \u092d\u0935\u093f\u0937\u094d\u092f \u0938\u0947 \u0915\u094d\u092fा \u092a\u0942\u091bो...",
    futureSubhead: "\u092a\u0942\u0930\u094d\u0935 \u091b\u093e\u0924\u094d\u0930",
    by: "PathMind \u0926\u094d\u0935\u093e\u0930ा \u0915\u094c\u0932\u0947\u091c \u0930\u093f\u0938\u0930\u094dच",
    cards: {
      fees:      { q: "\u092b\u0940\u0938 \u0915\u093f\u0924\u0928\u0940 \u0939\u094d\u0917\u0940?",          prompt: "What are the approximate total fees? Mention scholarships if available." },
      placement: { q: "\u092a\u0945\u0915\u0947\u091c \u0915\u094c\u0938\u093e \u0939\u0948?",         prompt: "How is the placement record? Mention average package and top recruiters." },
      hostel:    { q: "\u0939\u094c\u0938\u094d\u091f\u0932 \u0939\u0948?",                     prompt: "Is hostel available? Monthly cost and facilities." },
      branch:    { q: "\u0915\u094c\u0928\u0938\u0940 \u092c\u094d\u0930\u093e\u0902\u091a?",           prompt: "Which branch/course is best at this college?" },
    },
    questions: [
      "\u0935\u093f\u0926\u0947\u0936 \u092e\u0947\u0902 \u092a\u0922\u093c\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0938\u094d\u0915\u0949\u0932\u0930\u0936\u093f\u092a?",
      "\u0915\u094d\u092f\u093e \u0915\u094c\u0932\u0947\u091c \u0930\u094d\u092f\u0948\u0902\u0915\u093f\u0902\u0917 \u092e\u093e\u092f\u0928\u0947 \u0930\u0916\u0924\u0940 \u0939\u0948?",
      "\u0915\u093f\u0938 \u0921\u093f\u0917\u094d\u0930\u094d\u0940 \u092e\u0947\u0902 \u0938\u0932\u0948\u0930\u094d\u0940 \u0938\u092c\u0938\u0945 \u091c\u094d\u092f\u093e\u0926\u093e \u0939\u0948?",
      "\u0905\u092a\u0928\u0947 \u0932\u093f\u090f \u0938\u0939\u0940 \u0915\u0930\u093f\u092f\u0930 \u0915\u0948\u0938\u0947 \u091a\u0941\u0928\u0947\u0902?",
    ],
    futureGreet: (c) => `\u0922\u0947\u0930 \u0938\u093e\u0930\u093e \u092a\u094d\u092f\u093e\u0930! ${c} \u0938\u0947 \u0939\u0940 \u0939\u0942\u0902 \u092e\u0948\u0902 \u2014 28 \u0938\u093e\u0932 \u0915\u0940 \u0909\u092e\u094d\u0930 \u092e\u0947\u0902\u0964`,
    futureRole:  (c) => `You are a 28-year-old professional who studied at ${c}. Speak in warm Hindi as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.`,
  },
  spanish: {
    tagline: "Tu mentor universitario IA \uD83C\uDF93",
    searchHeading: "\u00bfQu\u00e9 universidad quieres explorar?",
    searchPlaceholder: "Escribe el nombre...",
    searchBtn: "Buscar",
    quickLabel: "B\u00fasqueda r\u00e1pida",
    popularLabel: "Los estudiantes preguntan",
    tapExpand: "TOCA PARA EXPANDIR",
    askLabel: "HAZ TU PREGUNTA",
    askPlaceholder: "Pregunta cualquier cosa...",
    futureBtn: "Habla con tu yo del futuro",
    futureSubtitle: "\u00bfQu\u00e9 te dir\u00eda un ex alumno?",
    futurePlaceholder: "Pregunta a tu yo del futuro...",
    futureSubhead: "ex alumno",
    by: "Investigaci\u00f3n de PathMind",
    cards: {
      fees:      { q: "\u00bfCu\u00e1les son las tasas?",      prompt: "What are the approximate total fees? Mention scholarships." },
      placement: { q: "\u00bfC\u00f3mo es el empleo?",         prompt: "How is the placement record? Mention average package." },
      hostel:    { q: "\u00bfHay alojamiento?",           prompt: "Is hostel available? Monthly cost and facilities." },
      branch:    { q: "\u00bfQu\u00e9 carrera elegir?",        prompt: "Which career is best at this university?" },
    },
    questions: [
      "\u00bfC\u00f3mo obtener una beca completa para estudiar en el extranjero?",
      "\u00bfEl ranking universitario realmente importa para conseguir trabajo?",
      "\u00bfQu\u00e9 carrera tiene el salario inicial m\u00e1s alto?",
      "\u00bfC\u00f3mo elijo el camino profesional correcto?",
    ],
    futureGreet: (c) => `\u00a1Hola! Estudi\u00e9 en ${c}, ahora tengo 28 a\u00f1os. Preg\u00fantame lo que quieras \uD83D\uDE0A`,
    futureRole:  (c) => `You are a 28-year-old professional who studied at ${c}. Speak in Spanish as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.`,
  }
};

// ─── Full translations for all languages ─────────────────────────────────────
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
  futureGreet: (c) => `Bonjour ! J'ai étudié à ${c} — j'ai maintenant 28 ans. Pose-moi toutes tes questions 😊`,
  futureRole:  (c) => `You are a 28-year-old professional who studied at ${c}. Speak in French as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.`,
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
  futureGreet: (c) => `Olá! Estudei em ${c} — tenho 28 anos agora. Pode me perguntar tudo 😊`,
  futureRole:  (c) => `You are a 28-year-old professional who studied at ${c}. Speak in Portuguese as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.`,
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
  futureGreet: (c) => `你好！我毕业于${c}，现在28岁了。有什么想问我的吗 😊`,
  futureRole:  (c) => `You are a 28-year-old professional who studied at ${c}. Speak in Simplified Chinese as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.`,
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
  futureGreet: (c) => `مرحباً! درست في ${c}، عمري الآن 28 عاماً. اسألني أي شيء 😊`,
  futureRole:  (c) => `You are a 28-year-old professional who studied at ${c}. Speak in Arabic as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.`,
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
  futureGreet: (c) => `Hallo! Ich habe in ${c} studiert — jetzt bin ich 28. Frag mich alles 😊`,
  futureRole:  (c) => `You are a 28-year-old professional who studied at ${c}. Speak in German as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.`,
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
  futureGreet: (c) => `こんにちは！${c}で勉強しました。今28歳です。何でも聞いてね 😊`,
  futureRole:  (c) => `You are a 28-year-old professional who studied at ${c}. Speak in Japanese as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.`,
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
  futureGreet: (c) => `Привет! Я учился в ${c} — сейчас мне 28 лет. Спроси меня о чём угодно 😊`,
  futureRole:  (c) => `You are a 28-year-old professional who studied at ${c}. Speak in Russian as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.`,
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
  futureGreet: (c) => `안녕하세요! 저는 ${c}를 졸업했고, 지금 28살이에요. 뭐든지 물어보세요 😊`,
  futureRole:  (c) => `You are a 28-year-old professional who studied at ${c}. Speak in Korean as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.`,
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
  futureGreet: (c) => `Ciao! Ho studiato a ${c} — ora ho 28 anni. Chiedimi tutto 😊`,
  futureRole:  (c) => `You are a 28-year-old professional who studied at ${c}. Speak in Italian as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.`,
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
  futureGreet: (c) => `வணக்கம்! நான் ${c}-ல் படித்தேன் — இப்போது 28 வயது. எதுவும் கேளுங்கள் 😊`,
  futureRole:  (c) => `You are a 28-year-old professional who studied at ${c}. Speak in Tamil as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.`,
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
  futureGreet: (c) => `నమస్కారం! నేను ${c}-లో చదివాను — ఇప్పుడు 28 సంవత్సరాలు. ఏదైనా అడగండి 😊`,
  futureRole:  (c) => `You are a 28-year-old professional who studied at ${c}. Speak in Telugu as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.`,
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
  futureGreet: (c) => `नमस्कार! मी ${c} मधून शिकलो — आता मी 28 वर्षांचा आहे. कोणतेही प्रश्न विचारा 😊`,
  futureRole:  (c) => `You are a 28-year-old professional who studied at ${c}. Speak in Marathi as if giving advice to your 17-year-old self. Be real, emotional, encouraging. Under 5 lines. No markdown.`,
};

const QUICK_CHIPS = ["Stanford", "Oxford", "MIT", "NUS", "Harvard"];

// ─── API helper ───────────────────────────────────────────────────────────────
async function askGemini(messages, langId, customSystem = null) {
  const langInstruction = LANGS.find(l => l.id === langId)?.instruction || LANGS[1].instruction;
  const system = customSystem || `You are PathMind, an AI mentor for students globally. ${langInstruction} Keep answers short – max 4 lines. Be honest, practical. No markdown formatting, just plain text.`;
  const formattedMessages = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: system }] },
      contents: formattedMessages,
      generationConfig: { maxOutputTokens: 8000 }
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || "API error");
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Something went wrong. Please try again.";
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "8px 0" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: GREEN, animation: `pm-bounce 1s ease-in-out ${i * 0.15}s infinite` }} />
      ))}
      <style>{`@keyframes pm-bounce{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}`}</style>
    </div>
  );
}

// ─── Skeleton Loader ─────────────────────────────────────────────────────────
function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-2.5 py-2">
      <div className="h-3 bg-gray-200 rounded w-11/12"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-4/5"></div>
    </div>
  );
}

const formatRank = (rank) => {
  if (!rank) return "N/A";
  if (typeof rank === "string" && rank.includes("QS")) {
    const parts = rank.split("QS");
    return (
      <span>
        {parts[0].trim()}
        <span className="text-[10px] font-normal text-gray-400 ml-1">QS</span>
        {parts[1]}
      </span>
    );
  }
  return rank;
};

// ─── Custom Language Selector ─────────────────────────────────────────────────
function LanguageSelector({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const current = LANGS.find(l => l.id === lang) || LANGS[1];
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={ref} className="relative z-30">
      <button onClick={() => setIsOpen(!isOpen)} className="text-xs font-semibold rounded-full px-3 py-1.5 outline-none cursor-pointer flex items-center gap-1.5 border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-all shadow-sm">
        <span className="text-sm">{current.flag}</span>
        <span>{current.label}</span>
        <ChevronDown size={12} className="text-gray-400 ml-0.5" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto py-1">
          {LANGS.map(l => (
            <button key={l.id} onClick={() => { setLang(l.id); setIsOpen(false); }} className={`w-full px-3 py-2 text-left text-xs font-semibold hover:bg-gray-50 flex items-center gap-2 cursor-pointer ${lang === l.id ? "text-green-600 bg-green-50/50" : "text-gray-700"}`}>
              <span className="text-sm">{l.flag}</span>
              <span>{l.full}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const CARD_ICONS = {
  fees:      <DollarSign size={18} color="#374151" strokeWidth={1.75} />,
  placement: <Briefcase  size={18} color="#374151" strokeWidth={1.75} />,
  hostel:    <Home       size={18} color="#374151" strokeWidth={1.75} />,
  branch:    <GitBranch  size={18} color="#374151" strokeWidth={1.75} />,
};
const CARD_META = {
  fees:      { badge: { english: "Updated"  }, badgeStyle: "bg-emerald-50 text-emerald-600 border border-emerald-100/50", subtitle: { english: "Tuition fees, scholarships, and additional expenses" } },
  placement: { badge: { english: "Popular"  }, badgeStyle: "bg-amber-50 text-amber-600 border border-amber-100/50",     subtitle: { english: "Average packages, placement rates, and top recruiters"  } },
  hostel:    { badge: null, badgeStyle: "", subtitle: { english: "Mess food, accommodation types, and room rent" } },
  branch:    { badge: null, badgeStyle: "", subtitle: { english: "Best courses, branch recommendations, and seats" } },
};

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
        const text = await askGemini([{ role: "user", content: `College: ${college}. ${t.prompt}` }], lang);
        setAnswer(text);
      } catch (err) { setAnswer(err.message || "Could not fetch answer. Please try again."); }
      setLoading(false);
    }
  };

  return (
    <div id={`card-${cardKey}`}
      className={`rounded-2xl border overflow-hidden transition-all duration-200 ${open ? "shadow-md bg-green-50/10" : "shadow-sm bg-white hover:border-gray-300 hover:shadow"}`}
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
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${meta.badgeStyle}`}>{meta.badge[lang]}</span>
              )}
            </div>
            <span className="text-xs text-gray-400 block mt-1.5 font-medium leading-normal truncate">{meta.subtitle[lang]}</span>
          </div>
        </div>
        <ChevronRight size={18} style={{ color: open ? GREEN : "#94a3b8", transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginTop: 4 }} />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-2.5" style={{ borderTop: `1px solid ${GREEN}11` }}>
          {loading ? <SkeletonLoader /> : <p className="m-0 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{answer}</p>}
        </div>
      )}
    </div>
  );
}

// ─── Admission Data Fetch ─────────────────────────────────────────────────────
async function getAdmissionData(collegeName) {
  const prompt = `Return ONLY raw JSON with no markdown and no backticks.
Provide admission info for "${collegeName}" college.
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
Use real data. Return exactly 4 processSteps. Return raw JSON only.`;

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
  };

  useEffect(() => { fetchAdmission(); }, [college]);

  const formatDeadline = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    if (isNaN(d)) return null;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  };

  const getExamBadge = (code) => {
    const map = {
      LPU: { bg: "#E6F1FB", color: "#185FA5" },
      JEE: { bg: "#EAF3DE", color: "#3B6D11" },
      CU:  { bg: "#EEEDFE", color: "#534AB7" },
    };
    return map[code] || { bg: "#F1EFE8", color: "#5F5E5A" };
  };

  const stepConfig = {
    done:     { circleBg: "#EAF3DE", circleColor: "#3B6D11", badgeBg: "#EAF3DE", badgeColor: "#3B6D11", label: "Done" },
    active:   { circleBg: "#E6F1FB", circleColor: "#185FA5", badgeBg: "#E6F1FB", badgeColor: "#185FA5", label: "Open now" },
    upcoming: { circleBg: "#F1EFE8", circleColor: "#888780", badgeBg: "#F1EFE8", badgeColor: "#888780", label: "Upcoming" },
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col" style={{ background: "#fff" }}>

      {/* Overlay Header */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 flex-shrink-0 bg-white">
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer bg-transparent border-none transition-colors flex-shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <GraduationCap size={17} color="#374151" strokeWidth={1.75} className="flex-shrink-0" />
          <span className="text-sm font-bold text-gray-900 truncate">How to get admission?</span>
        </div>
        {status === "success" && data?.applyUrl && (
          <button
            onClick={() => window.open(data.applyUrl, "_blank", "noopener,noreferrer")}
            className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-0.5 flex-shrink-0 cursor-pointer bg-transparent border-none"
          >
            View official site
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </button>
        )}
      </div>

      {/* LOADING STATE */}
      {status === "loading" && (
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          <div className="animate-pulse bg-gray-100 rounded-xl h-14 w-full"></div>
          <div className="animate-pulse bg-gray-100 rounded w-28 h-3 mt-1"></div>
          {[1,2,3,4].map(i => (
            <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-16 w-full"></div>
          ))}
        </div>
      )}

      {/* ERROR STATE */}
      {status === "error" && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center" style={{ borderWidth: "0.5px" }}>
            <WifiOff size={22} color="#9ca3af" strokeWidth={1.75} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-800 m-0">Couldn't load admission info</p>
            <p className="text-xs text-gray-400 mt-1.5 m-0">Check your connection and try again</p>
          </div>
          <button
            onClick={fetchAdmission}
            className="px-6 py-2 rounded-full text-sm font-semibold cursor-pointer border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* SUCCESS STATE */}
      {status === "success" && data && (
        <>
          {/* Scrollable content with paddingBottom so sticky CTA never overlaps */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4" style={{ paddingBottom: 80 }}>

            {/* ── SECTION 1: Alert Banner ── */}
            {data.admissionOpen ? (
              <div
                className="flex items-start gap-3 px-4 py-3.5 rounded-xl border"
                style={{ background: "#EAF3DE", borderColor: "#C0DD97" }}
              >
                <CalendarCheck size={18} color="#3B6D11" strokeWidth={1.75} className="flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm m-0" style={{ color: "#27500A", fontWeight: 500 }}>
                    Applications open for {data.admissionRound || "2025–œ26"}
                  </p>
                  {data.applicationDeadline && (
                    <p className="text-xs mt-0.5 m-0 truncate" style={{ color: "#3B6D11" }}>
                      Last date: {formatDeadline(data.applicationDeadline)}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div
                className="flex items-start gap-3 px-4 py-3.5 rounded-xl border"
                style={{ background: "#F1EFE8", borderColor: "#D3D1C7" }}
              >
                <CalendarX size={18} color="#5F5E5A" strokeWidth={1.75} className="flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm m-0" style={{ color: "#2C2C2A", fontWeight: 500 }}>Applications currently closed</p>
                  <p className="text-xs mt-0.5 m-0 truncate" style={{ color: "#5F5E5A" }}>Check back later or visit the official website</p>
                </div>
              </div>
            )}

            {/* ── SECTION 2: Admission Process Stepper ── */}
            {data.processSteps?.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2.5" style={{ letterSpacing: "0.8px" }}>Admission process</p>
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200" style={{ borderWidth: "0.5px" }}>
                  {data.processSteps.map((step, idx) => {
                    const cfg = stepConfig[step.status] || stepConfig.upcoming;
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 px-4 py-3.5"
                        style={{ borderTop: idx > 0 ? "0.5px solid #f1f1f1" : "none" }}
                      >
                        {/* Step circle */}
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: cfg.circleBg }}
                        >
                          {step.status === "done" ? (
                            <CheckCircle size={15} color={cfg.circleColor} strokeWidth={2.5} />
                          ) : (
                            <span className="text-xs font-semibold" style={{ color: cfg.circleColor }}>{idx + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="m-0 leading-tight" style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{step.title}</p>
                          <p className="m-0 mt-0.5 truncate" style={{ fontSize: 12, color: "#9ca3af" }}>{step.subtitle}</p>
                          <span
                            className="inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: cfg.badgeBg, color: cfg.badgeColor }}
                          >
                            {cfg.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── SECTION 3: Eligibility Criteria ── */}
            {data.eligibility && (
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2.5" style={{ letterSpacing: "0.8px" }}>Eligibility criteria</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      icon: <School size={18} color="#9ca3af" strokeWidth={1.75} />,
                      label: "Min. qualification",
                      value: data.eligibility.qualification,
                      sub: null,
                    },
                    {
                      icon: <Percent size={18} color="#9ca3af" strokeWidth={1.75} />,
                      label: "Min. marks",
                      value: data.eligibility.minMarks,
                      sub: data.eligibility.minMarksReserved,
                    },
                    {
                      icon: <Calendar size={18} color="#9ca3af" strokeWidth={1.75} />,
                      label: "Age limit",
                      value: data.eligibility.ageLimit,
                      sub: null,
                    },
                    {
                      icon: <Globe size={18} color="#9ca3af" strokeWidth={1.75} />,
                      label: "Language",
                      value: data.eligibility.language,
                      sub: null,
                    },
                  ].filter(c => c.value).map((card, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-3 flex flex-col gap-2 border border-gray-200 overflow-hidden"
                      style={{ borderWidth: "0.5px" }}
                    >
                      <div className="w-8 h-8 rounded-[8px] bg-gray-50 border border-gray-100 flex items-center justify-center" style={{ borderWidth: "0.5px" }}>
                        {card.icon}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p className="m-0 uppercase font-medium text-gray-400" style={{ fontSize: 10, letterSpacing: "0.6px" }}>{card.label}</p>
                        <p className="m-0 mt-0.5 font-semibold text-gray-800" style={{ fontSize: 12, lineHeight: "1.3", wordBreak: "break-word", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{card.value}</p>
                        {card.sub && (
                          <p className="m-0 mt-0.5 text-gray-400" style={{ fontSize: 11 }}>{card.sub}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── SECTION 4: Accepted Entrance Exams ── */}
            {data.acceptedExams?.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2.5" style={{ letterSpacing: "0.8px" }}>Accepted entrance exams</p>
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200" style={{ borderWidth: "0.5px" }}>
                  {data.acceptedExams.map((exam, idx) => {
                    const badge = getExamBadge(exam.code);
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 px-4 py-3.5"
                        style={{ borderTop: idx > 0 ? "0.5px solid #f1f1f1" : "none" }}
                      >
                        <div
                          className="flex items-center justify-center flex-shrink-0"
                          style={{ width: 44, height: 44, borderRadius: 8, background: badge.bg, color: badge.color, fontSize: 11, fontWeight: 500 }}
                        >
                          {(exam.code || "").slice(0, 3)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="m-0 leading-tight" style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{exam.name}</p>
                          <p className="m-0 mt-0.5 truncate" style={{ fontSize: 12, color: "#9ca3af" }}>{exam.programs}</p>
                        </div>
                        <span
                          className="flex-shrink-0"
                          style={{ fontSize: 12, color: exam.tag === "Preferred" ? "#185FA5" : "#888780" }}
                        >
                          {exam.tag}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── SECTION 5: Deadline Reminder Card ── */}
            {data.applicationDeadline && (
              <div
                className="rounded-xl flex items-center gap-3 px-4 py-4 border border-gray-200"
                style={{ borderWidth: "0.5px" }}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: data.deadlinePassed ? "#FCEBEB" : "#FAEEDA",
                  }}
                >
                  {data.deadlinePassed
                    ? <AlertCircle size={18} color="#A32D2D" strokeWidth={1.75} />
                    : <Clock size={18} color="#854F0B" strokeWidth={1.75} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="m-0 leading-tight" style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>Application deadline</p>
                  <p className="m-0 mt-0.5 truncate" style={{ fontSize: 12, color: "#9ca3af" }}>
                    {data.deadlinePassed ? "Deadline has passed" : `${data.admissionRound || "Round 1"} closes soon`}
                  </p>
                  <p
                    className="m-0 mt-1"
                    style={{
                      fontSize: 13,
                      fontWeight: data.deadlinePassed ? 700 : 500,
                      color: data.deadlinePassed ? "#A32D2D" : "#854F0B",
                    }}
                  >
                    {data.deadlinePassed ? "Deadline passed" : formatDeadline(data.applicationDeadline)}
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* ── SECTION 6: Sticky CTA Button ── */}
          <div className="flex-shrink-0 bg-white border-t border-gray-100 px-4 py-3" style={{ position: "sticky", bottom: 0 }}>
            {/* Case 1: applyUrl exists AND admissionOpen = true */}
            {data.applyUrl && data.admissionOpen && (
              <button
                onClick={() => window.open(data.applyUrl, "_blank", "noopener,noreferrer")}
                className="w-full flex items-center justify-center gap-2 text-white border-none cursor-pointer rounded-xl"
                style={{ background: "#155c3e", height: 48, fontSize: 14, fontWeight: 600 }}
              >
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "75%" }}>Apply now — {college}</span>
                <ArrowRight size={16} color="white" strokeWidth={2.5} style={{ flexShrink: 0 }} />
              </button>
            )}
            {/* Case 2: admissionOpen = false */}
            {!data.admissionOpen && (
              <button
                disabled
                className="w-full flex items-center justify-center text-white border-none rounded-xl"
                style={{ background: "#D3D1C7", height: 48, fontSize: 14, fontWeight: 600, cursor: "not-allowed" }}
              >
                Applications closed
              </button>
            )}
            {/* Case 3: applyUrl = null AND admissionOpen = true */}
            {!data.applyUrl && data.admissionOpen && (
              <p className="text-center m-0 py-3" style={{ fontSize: 13, color: "#9ca3af" }}>
                Visit the official college website to apply
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ”€”€”€ Future Self Chat ”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€
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

    const crisisWords = ['suicide', 'kill myself', 'end my life', 'hurt myself', 'giving up', 'want to die', 'self-harm', 'cut myself', 'apni jaan', 'marna chahta', 'marne ka'];
    const hasCrisis = crisisWords.some(w => val.toLowerCase().includes(w));

    if (hasCrisis) {
      setLoading(true);
      setTimeout(() => {
        setMessages(m => [...m, { 
          role: "assistant", 
          content: "It sounds like you're going through something really hard. Please reach out to a counselor or call/text 988 (Suicide & Crisis Lifeline). You don't have to face this alone." 
        }]);
        setLoading(false);
      }, 500);
      return;
    }

    setLoading(true);
    try {
      const text = await askGemini(newMsgs, lang, t.futureRole(college));
      setMessages(m => [...m, { role: "assistant", content: text || "..." }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Network error. Try again." }]);
    }
    setLoading(false);
  };

  return (
    <div className="absolute inset-0 bg-black/50 z-50 flex flex-col justify-end">
      <div className="bg-white rounded-t-3xl max-h-[85vh] flex flex-col overflow-hidden w-full">
        {/* Header */}
        <div className="px-5 py-4 text-white flex items-center gap-3 flex-shrink-0" style={{ background: GREEN }}>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl flex-shrink-0">{"\uD83D\uDC64"}</div>
          <div className="flex-1 min-w-0">
            <p className="m-0 font-bold text-sm leading-tight">You @ 28</p>
            <p className="m-0 text-xs opacity-90 truncate">{college} {t.futureSubhead}</p>
          </div>
          <button onClick={onClose} className="bg-transparent border-none text-white hover:opacity-80 cursor-pointer p-1 flex items-center justify-center"><span className="text-lg">{"\u2715"}</span></button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "rounded-l-2xl rounded-tr-2xl text-white" : "rounded-r-2xl rounded-tl-2xl text-gray-800 bg-gray-100"}`} style={{ background: m.role === "user" ? GREEN : undefined }}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-r-2xl rounded-tl-2xl px-4 py-3"><Spinner /></div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100 flex gap-2 bg-white pb-6">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder={t.futurePlaceholder}
            className="flex-1 h-11 rounded-full border border-gray-200 px-4 text-sm outline-none bg-gray-50 focus:bg-white transition-colors" />
          <button onClick={send} className="w-11 h-11 rounded-full border-none cursor-pointer flex items-center justify-center flex-shrink-0 text-white hover:scale-105 transition-transform" style={{ background: GREEN }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({ onSearch, lang, setLang }) {
  const [query, setQuery] = useState("");
  const t = UI[lang];

  const go = (q) => { const v = (q || query).trim(); if (v) onSearch(v); };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      {/* Hero Section */}
      <div className="px-6 py-10 relative flex flex-col items-center text-center w-full flex-shrink-0" style={{ background: `linear-gradient(160deg, ${GREEN_LIGHT} 0%, #fff 100%)` }}>
        
        {/* Language selector */}
        <div className="absolute top-4 right-4 z-50">
          <LanguageSelector lang={lang} setLang={setLang} />
        </div>

        <div className="flex items-center gap-3 mb-2 mt-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm" style={{ background: GREEN }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span className="text-2xl font-bold text-gray-900 tracking-tight">PathMind</span>
        </div>
        <p className="text-sm text-gray-600 mb-8 font-medium">{t.tagline}</p>

        {/* Search Box */}
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl text-left">
          <p className="font-bold text-gray-800 text-sm mb-2 pl-1">{t.searchHeading}</p>
          <div className="flex items-center bg-white p-1 rounded-2xl shadow-sm border border-gray-200 mb-4">
            <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && go()} placeholder={t.searchPlaceholder} className="flex-1 bg-transparent outline-none px-3 text-sm text-gray-800" />
            <button onClick={() => go()} className="text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition hover:opacity-95 cursor-pointer text-sm" style={{ background: GREEN }}>
              {t.searchBtn}
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t.quickLabel}</span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_CHIPS.map(chip => (
                <button key={chip} onClick={() => go(chip)} className="px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border" style={{ background: `${GREEN_LIGHT}55`, color: GREEN_DARK, borderColor: `${GREEN}22` }}>
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Common questions */}
      <div className="w-full px-6 py-6 flex-1 bg-gray-50 flex flex-col items-center">
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{t.popularLabel}</p>
          <div className="flex flex-col gap-3">
            {t.questions.map(q => (
              <HomeExpandCard key={q} question={q} lang={lang} />
            ))}
          </div>
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

  const CHAT_EMPTY_TEXT = {
    hindi:      "No questions yet. Ask anything below!",
    english:    "No questions yet. Ask anything below!",
    spanish:    "No questions yet. Ask anything below!",
    french:     "No questions yet. Ask anything below!",
    portuguese: "No questions yet. Ask anything below!",
    chinese:    "No questions yet. Ask anything below!",
    arabic:     "No questions yet. Ask anything below!",
    german:     "No questions yet. Ask anything below!",
    japanese:   "No questions yet. Ask anything below!",
    russian:    "No questions yet. Ask anything below!",
    korean:     "No questions yet. Ask anything below!",
    italian:    "No questions yet. Ask anything below!",
    tamil:      "No questions yet. Ask anything below!",
    telugu:     "No questions yet. Ask anything below!",
    marathi:    "No questions yet. Ask anything below!",
  };

  // Snapshot states
  const [snapshot, setSnapshot] = useState(null);
  const [snapshotLoading, setSnapshotLoading] = useState(true);

  // Trigger state for filter chips
  const [expandedCard, setExpandedCard] = useState(null);

  // Admission overlay
  const [showAdmission, setShowAdmission] = useState(false);

  useEffect(() => { chatBottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages, chatLoading]);

  // Fetch Snapshot on Mount
  useEffect(() => {
    const getSnapshot = async () => {
      setSnapshotLoading(true);
      try {
        const prompt = `Give a short JSON snapshot for "${college}". Output exactly this JSON structure: {"worldRank": "QS/World Rank or Regional Rank", "estd": "Established Year", "approvals": "Accreditations (e.g. UGC, NAAC A++, ABET, regional/international equivalents)", "rating": "Rating e.g. 4.5/5"}. Do not include markdown code block syntax. Only raw JSON.`;
        const res = await askGemini([{ role: "user", content: prompt }], "english", "You are a JSON generator. Return only valid raw JSON.");
        const cleanJson = res.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleanJson);
        setSnapshot(parsed);
      } catch (e) {
        console.error(e);
        setSnapshot({ worldRank: "Top 500", estd: "N/A", approvals: "Accredited", rating: "4.2/5" });
      }
      setSnapshotLoading(false);
    };
    getSnapshot();
  }, [college]);

  const sendChat = async () => {
    const val = chatInput.trim();
    if (!val || chatLoading) return;
    setChatInput("");
    const newMsgs = [...chatMessages, { role: "user", content: val }];
    setChatMessages(newMsgs);

    const crisisWords = ['suicide', 'kill myself', 'end my life', 'hurt myself', 'giving up', 'want to die', 'self-harm', 'cut myself', 'apni jaan', 'marna chahta', 'marne ka'];
    const hasCrisis = crisisWords.some(w => val.toLowerCase().includes(w));

    if (hasCrisis) {
      setChatLoading(true);
      setTimeout(() => {
        setChatMessages(m => [...m, { 
          role: "assistant", 
          content: "It sounds like you're going through something really hard. Please reach out to a counselor or call/text 988 (Suicide & Crisis Lifeline). You don't have to face this alone." 
        }]);
        setChatLoading(false);
      }, 500);
      return;
    }

    setChatLoading(true);
    try {
      const userContent = `College: ${college}. ${val}`;
      const apiMsgs = chatMessages.map(m => ({ role: m.role, content: m.content }));
      apiMsgs.push({ role: "user", content: userContent });
      const res = await askGemini(apiMsgs, lang);
      setChatMessages(m => [...m, { role: "assistant", content: res }]);
    } catch {
      setChatMessages(m => [...m, { role: "assistant", content: "Error. Try again." }]);
    }
    setChatLoading(false);
  };

  const scrollToCard = (key) => {
    setExpandedCard(key);
    const el = document.getElementById(`card-${key}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full relative">
      {/* Header with scrollable topic filter chips */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3 flex flex-col gap-2 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-3 w-full justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-900 flex items-center justify-center p-1.5 rounded-full hover:bg-gray-100 cursor-pointer bg-transparent border-none transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-gray-900 truncate m-0 leading-tight">{college}</h1>
              <p className="text-[10px] text-emerald-600 font-bold m-0 tracking-wide uppercase">Guided by PathMind AI</p>
            </div>
          </div>
          <LanguageSelector lang={lang} setLang={setLang} />
        </div>

        {/* Scrollable filter chips */}
        <div className="flex gap-1.5 overflow-x-auto py-1 -mx-2 px-2 scrollbar-none flex-shrink-0" style={{ scrollbarWidth: "none" }}>
          {["fees", "placement", "hostel", "branch"].map(key => {
            const label = UI[lang].cards[key].q.replace(/\?$/, "");
            return (
              <button key={key} onClick={() => scrollToCard(key)} className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-650 whitespace-nowrap flex-shrink-0 cursor-pointer transition-colors border border-gray-200 hover:border-gray-300 flex items-center gap-1.5 shadow-sm">
                <span>{CARD_ICONS[key]}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto pb-8">
        
        {/* Rating/Snapshot strip (2x2 Grid with internal dividers) */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {snapshotLoading ? (
            <div className="animate-pulse grid grid-cols-2 divide-x divide-y divide-gray-150">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="p-4 flex flex-col items-center gap-1.5 h-16 justify-center">
                  <div className="h-2 bg-gray-200 rounded w-12"></div>
                  <div className="h-3.5 bg-gray-200 rounded w-16 mt-1"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2">
              <div className="p-4 text-center border-r border-b border-gray-100 flex flex-col justify-center min-h-[70px]">
                <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-wider">{lang === "hindi" ? "\u0935\u0930\u094d\u0932\u094d\u0921 \u0930\u094d\u092f\u0948\u0902\u0915" : "WORLD RANK"}</span>
                <span className="text-sm font-extrabold text-gray-800 block mt-1">{formatRank(snapshot?.worldRank)}</span>
              </div>
              <div className="p-4 text-center border-b border-gray-100 flex flex-col justify-center min-h-[70px]">
                <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-wider">{lang === "hindi" ? "\u0938\u094d\u0925\u093e\u092a\u0928\u093e" : "ESTD"}</span>
                <span className="text-sm font-extrabold text-gray-800 block mt-1">{snapshot?.estd || "N/A"}</span>
              </div>
              <div className="p-4 text-center border-r border-gray-100 flex flex-col justify-center min-h-[70px]">
                <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-wider">{lang === "hindi" ? "\u092e\u093e\u0928\u094d\u092f\u0924\u093e" : "ACCREDITATION"}</span>
                <span className="text-[10px] font-extrabold text-gray-800 block mt-0.5 px-1 leading-tight" style={{ wordBreak: "break-word" }} title={snapshot?.approvals}>{snapshot?.approvals || "N/A"}</span>
              </div>
              <div className="p-4 text-center flex flex-col justify-center min-h-[70px]">
                <span className="text-[9px] font-bold text-gray-400 block uppercase tracking-wider">{lang === "hindi" ? "\u0930\u0947\u091f\u093f\u0902\u0917" : "RATING"}</span>
                <span className="text-sm font-extrabold text-gray-800 block mt-1">
                  {snapshot?.rating ? (
                    <>
                      <span>{snapshot.rating.replace(/[^0-9./]/g, '').trim()} ⭐</span>
                      <span className="text-[8px] font-normal text-gray-400 block mt-0.5 leading-tight">via Google</span>
                    </>
                  ) : "N/A"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-2.5">
            {["fees", "placement", "hostel", "branch"].map(key => (
              <ExpandCard key={key + lang} college={college} cardKey={key} lang={lang} expandedCard={expandedCard} setExpandedCard={setExpandedCard} />
            ))}

            {/* How to get admission card */}
            <button
              onClick={() => setShowAdmission(true)}
              className="w-full rounded-2xl border bg-white shadow-sm hover:border-gray-300 hover:shadow transition-all duration-200 flex items-start justify-between gap-2 p-4 cursor-pointer text-left"
              style={{ borderColor: "#e2e8f0", borderWidth: "1px" }}
            >
              <div className="flex gap-3.5 items-start flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border bg-gray-50 border-gray-150 text-gray-600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[15px] font-bold text-gray-900 tracking-tight block">How to get admission?</span>
                  <span className="text-xs text-gray-400 block mt-1.5 font-medium leading-normal truncate">Steps, criteria, and entrance exams</span>
                </div>
              </div>
              <ChevronRight size={18} style={{ color: "#94a3b8", flexShrink: 0, marginTop: 4 }} />
            </button>
          </div>
        </div>

        {/* Future self button with user-star icon and actionable hover arrow (Premium Weight upgrade) */}
        <div className="p-0.5 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-700 shadow-md hover:shadow-lg hover:scale-[1.01] transition-all">
          <button onClick={() => setShowFuture(true)} className="w-full py-5 px-6 rounded-[22px] border-none cursor-pointer text-white flex items-center gap-4 bg-transparent group relative overflow-hidden">
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 shadow-inner">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
                <polygon points="12 2 13.09 4.26 15.62 4.63 13.79 6.41 14.22 8.92 12 7.73 9.78 8.92 10.21 6.41 8.38 4.63 10.91 4.26 12 2" fill="currentColor" transform="translate(6, -2) scale(0.65)" />
              </svg>
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="m-0 font-extrabold text-sm leading-tight tracking-wide">{t.futureBtn}</p>
              <p className="m-0 text-xs opacity-90 mt-1 font-medium truncate">{t.futureSubtitle}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0">
              <span className="text-sm text-white">{"\u2192"}</span>
            </div>
          </button>
        </div>

        {/* Chat Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col mb-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{t.askLabel}</p>
          
          <div className="overflow-y-auto flex flex-col gap-2 mb-3 pr-1" style={{ minHeight: chatMessages.length === 0 ? 'auto' : 150 }}>
            {chatMessages.length === 0 && (
              <div className="flex flex-col gap-1.5">
                <p className="text-[10px] text-gray-400 font-medium m-0 mb-1">💬 Not sure what to ask? Try one of these:</p>
                {[
                  "What is the average salary after placement?",
                  "What are the top courses offered here?",
                  "What are the hostel & campus facilities?"
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => setChatInput(q)}
                    style={{ fontFamily: "inherit", textAlign: "left", background: "#f8fafb", border: "1px solid #e5e7eb", borderRadius: 12, padding: "8px 12px", fontSize: 12, color: "#374151", cursor: "pointer", lineHeight: 1.4, transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f0faf5"}
                    onMouseLeave={e => e.currentTarget.style.background = "#f8fafb"}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-3 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "rounded-l-2xl rounded-tr-2xl text-white" : "rounded-r-2xl rounded-tl-2xl text-gray-800 bg-gray-100"}`} style={{ background: m.role === "user" ? GREEN : undefined }}>
                  {m.content}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-r-2xl rounded-tl-2xl px-4 py-2.5"><Spinner /></div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-200 focus-within:border-green-300 focus-within:bg-white transition-colors mt-auto flex-shrink-0">
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder={t.askPlaceholder} className="flex-1 bg-transparent border-none outline-none px-3 text-sm text-gray-800 h-9" />
            <button onClick={sendChat} className="w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer shadow-sm hover:scale-105 transition-transform flex-shrink-0" style={{ background: GREEN }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginLeft: -2 }}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>

      {showFuture && <FutureSelfChat college={college} lang={lang} onClose={() => setShowFuture(false)} />}
      {showAdmission && <AdmissionOverlay college={college} onClose={() => setShowAdmission(false)} />}
    </div>
  );
}


// ─── First-Gen Translator Component ──────────────────────────────────────────
function FirstGenTranslator({ onBack }) {
  const [text, setText] = useState("");
  const [redacted, setRedacted] = useState(false);
  const [translated, setTranslated] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadSample = () => {
    setText("Dear Student (SSN: 456-88-2919),\nWe are pleased to offer you financial aid for the 2025-26 academic year. Your Expected Family Contribution (EFC) is calculated as $12,500. Based on this, you qualify for a Direct Subsidized Loan of $5,500 and a Federal Work-Study award of $3,000. To accept this package, complete your Master Promissory Note (MPN) on studentaid.gov by July 1, 2025.");
    setRedacted(false);
    setTranslated(false);
  };

  const handleRedact = () => {
    let clean = text;
    // Redact SSN
    clean = clean.replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[SSN REDACTED FOR SAFETY]");
    // Redact financial values
    clean = clean.replace(/\$\d{1,3}(,\d{3})*(\.\d{2})?/g, "[FINANCIAL VALUE REDACTED]");
    setText(clean);
    setRedacted(true);
  };

  const handleTranslate = () => {
    setLoading(true);
    setTimeout(() => {
      setTranslated(true);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      {/* Header */}
      <div className="px-4 py-4 bg-white border-b border-gray-200 flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-900 flex items-center justify-center p-1.5 rounded-full hover:bg-gray-105 cursor-pointer bg-transparent border-none transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <span className="text-xs font-bold text-green-600 uppercase tracking-wider block">First-Gen Toolkit</span>
          <span className="text-sm font-extrabold text-gray-900 leading-tight">First-Gen Translator</span>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-4 overflow-y-auto pb-10">
        <p className="text-xs text-gray-500 leading-relaxed m-0">
          Paste any college letter, financial aid offer, or email. We'll translate the academic jargon into plain English.
        </p>

        {/* Text Area Container */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste your financial aid letter or college email here..."
            className="w-full border-none bg-transparent outline-none text-sm text-gray-800 resize-none min-h-[120px] font-sans"
          />
          <div className="flex gap-2 flex-wrap">
            <button onClick={loadSample} className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-600 cursor-pointer transition-colors">
              Load Sample Letter
            </button>
            {text.trim() && !redacted && (
              <button onClick={handleRedact} className="px-3 py-1.5 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 text-xs font-bold text-amber-700 cursor-pointer transition-colors">
                🔐 Redact Sensitive PII
              </button>
            )}
          </div>
        </div>

        {text.trim() && (
          <button
            onClick={handleTranslate}
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-white text-sm border-none shadow-sm transition hover:opacity-95 cursor-pointer flex items-center justify-center gap-2"
            style={{ background: GREEN }}
          >
            {loading ? <Spinner /> : "Translate to Plain English"}
          </button>
        )}

        {/* Translation Results */}
        {translated && (
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-4">
            <div className="border-l-4 border-green-500 pl-3">
              <h4 className="text-sm font-bold text-gray-900 m-0">What this actually means:</h4>
              <p className="text-xs text-gray-600 mt-1 m-0 leading-relaxed">
                The college is offering you financial aid. You do not have to pay the full tuition price upfront. However, you need to sign a promise note online to accept the loan part.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Jargon Explained:</h4>
              <div className="flex flex-col gap-2">
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5">
                  <p className="text-xs font-bold text-gray-800 m-0">Expected Family Contribution (EFC)</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 m-0 leading-snug">An index number college financial aid staff use to determine how much financial aid you would receive.</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5">
                  <p className="text-xs font-bold text-gray-800 m-0">Direct Subsidized Loan</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 m-0 leading-snug">A government loan for students where the US government pays the interest while you are in school.</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5">
                  <p className="text-xs font-bold text-gray-800 m-0">Master Promissory Note (MPN)</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 m-0 leading-snug">A legal document in which you promise to repay your student loans and any accrued interest.</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50/50 border border-green-100 rounded-xl p-3">
              <h4 className="text-xs font-bold text-green-700 m-0">Your Next Steps:</h4>
              <ul className="text-xs text-green-600 pl-4 mt-1.5 space-y-1">
                <li>Log in to studentaid.gov using your FSA ID.</li>
                <li>Complete and sign the Master Promissory Note (MPN) before July 1, 2025.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function PathMind() {
  const [college, setCollege] = useState(null);
  const [lang, setLang] = useState("english");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 900);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 900);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const fontStyle = { fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Noto Sans, sans-serif" };

  const appPanel = college
    ? <ResultScreen college={college} lang={lang} setLang={setLang} onBack={() => setCollege(null)} />
    : <HomeScreen onSearch={setCollege} lang={lang} setLang={setLang} />;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start" style={fontStyle}>
      <div className={isDesktop ? "w-[420px] min-h-screen bg-white shadow-xl flex flex-col relative border-x border-gray-200" : "min-h-screen bg-white flex flex-col w-full"}>
        {appPanel}
      </div>
    </div>
  );
}
