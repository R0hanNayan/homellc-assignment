# Mìí - AI Chatbot

## 🚀 Overview

Mìí is an AI-powered chatbot designed to answer questions about me in a concise and factual manner, just as I would. The chatbot is built using Next.js, OpenAI's GPT-4o-mini, and includes voice interaction through speech recognition and text-to-speech synthesis.

## 🏗 Features

- **✅ AI-Powered Responses**
  - Uses OpenAI's GPT-4o-mini to generate responses.
  - Optimized for concise, factual, and professional replies.
- **🎤 Voice Interaction**
  - Speech Recognition: Users can speak queries instead of typing.
  - Text-to-Speech (TTS): The chatbot can read responses aloud.
- **🌟 User-Friendly UI**
  - Minimalistic design for easy interaction.
  - Framer Motion animations for smooth transitions.
  - Option to remove products from comparison.
  - Material UI icons for accessibility.
  - Prevents adding duplicate products.
- **🛠️ Secure API Handling**
  - OpenAI API key stored securely in environment variables.
  - Uses Next.js API routes (/api/gpt) to handle AI requests safely.

## 🛠 Tech Stack

- **Frontend:** React (Next.js), Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes (Node.js/Express)
- **AI Model:** OpenAI GPT-4o-mini
- **Voice Integration:** Web Speech API (Speech Recognition & TTS)
- **Deployment:** Vercel

## 🚀 Installation & Setup

1. **Clone the repository**

   ```sh
    git clone https://github.com/R0hanNayan/homellc-assignment.git
    cd homellc-assignment
   ```
2. **Install dependencies**

```sh
    npm install
```

3. **Set Up Environment Variables**

- Get your OpenAI GPT-4o mini developer key at:
  https://github.com/marketplace/models/azure-openai/gpt-4o-mini
- Create a .env.local file and add your Developer key:

```sh
  GPT_TOKEN=your-openai-api-key
```

4. **Run the development server**

```sh
  npm run dev
```
