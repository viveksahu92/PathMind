# PathMind - AI College Mentor 🎓

PathMind is an AI-powered application designed to help first-generation college students and aspirants explore colleges, understand admission processes, and get instant answers to their questions using Google's Gemini AI. 

The application is built with a focus on simplicity, responsiveness, and accessibility in multiple languages.

## 🚀 Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite v8
- **Styling:** Tailwind CSS (via inline utility classes) & Vanilla CSS
- **Icons:** Lucide React
- **AI Integration:** Google Gemini API (`gemini-3.5-flash`)

## 📂 Key Files & Project Structure

To upload this project to GitHub, you only need the following important files and folders. **Do NOT upload the `node_modules` folder or `.env` file containing your API key.**

```text
PathMind/
├── src/
│   ├── App.jsx        # 🌟 Main application file (Contains all UI, State & Logic)
│   ├── index.css      # Base Tailwind imports
│   └── main.jsx       # React DOM rendering entry point
├── public/            # Static assets (favicons, etc.)
├── index.html         # Main HTML template
├── package.json       # Project dependencies and scripts
├── vite.config.js     # Vite configuration
└── README.md          # This documentation file
```

## 🧠 Core Logic & Features

The entire application logic is consolidated into a single monolithic file (`src/App.jsx`) for rapid prototyping. Here is how the core systems work:

### 1. Two-Screen Architecture
The app switches between two main components based on the `college` state variable:
- **`HomeScreen`:** The landing page where users can search for a college or select a quick chip (e.g., Stanford, MIT).
- **`ResultScreen`:** The detailed view for a specific college that shows data snapshots, eligibility criteria, and a chat interface.

### 2. Multi-Language Support
The app supports 14 languages (English, Hindi, Spanish, French, Portuguese, Chinese, Arabic, German, Japanese, Russian, Korean, Italian, Tamil, Telugu, Marathi).
- A `LANGS` array holds language definitions and specific system instructions for the AI.
- A massive `UI` object holds translations for every static text element, button, and prompt on the screen.
- State (`lang`) is passed down to dynamically update the UI in real-time.

### 3. AI Integration (Gemini)
The app uses the `fetch` API to talk directly to `generativelanguage.googleapis.com`.
- **Chat Interface:** Users can ask free-form questions. The app injects a system prompt instructing the AI to act as a helpful college mentor, responding in the user's selected language.
- **JSON Data Extraction:** To populate the "College Snapshot" (World Rank, Estd, Rating, Accreditations) and Admission logic, the app prompts Gemini to return strict JSON.
- **Robust Parsing:** Since LLMs sometimes wrap JSON in markdown (````json ... ````), the `askGemini` helper uses a smart extraction method (`indexOf('{')` and `lastIndexOf('}')`) to guarantee the app doesn't crash even if the AI includes conversational text.

### 4. Safety Interceptor
The application includes a client-side keyword scanner. If a user inputs crisis-related keywords (e.g., self-harm, depression), the app intercepts the request before it hits the API and immediately renders a supportive message with emergency helpline information.

### 5. Future Self Feature
A unique UI element where users can "Talk to their future self". The AI is prompted to adopt the persona of a 28-year-old successful professional who graduated from the selected college, offering empathetic and encouraging advice.

## 🛠️ How to Run Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Setup API Key:**
   Create a `.env` file in the root directory (do not upload this file to GitHub) and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Build for Production:**
   ```bash
   npm run build
   ```

## 🎨 Design Philosophy

- **Mobile-First:** The app uses a single-column layout centered on the screen, optimizing the experience for mobile devices where most first-gen students access information.
- **Accessible UI:** Heavy use of clear typography, subtle gradients (Mint Green), and iconography (Lucide) to reduce cognitive load.
