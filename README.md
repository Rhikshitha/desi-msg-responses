# 🧔 Text Like Your Indian Dad

A fun web application that transforms your casual messages into typical Indian family responses! Now featuring AI-powered responses and multiple personas.

<img width="1390" alt="image" src="https://github.com/user-attachments/assets/cdda1569-4e70-418b-a44b-6afb4d0522b8" />

<img width="1409" alt="image" src="https://github.com/user-attachments/assets/6782fa0b-5eab-4019-8f0c-9ef82df70280" />

<img width="1412" alt="image" src="https://github.com/user-attachments/assets/0b4bd36a-b4ff-4bd1-ab95-9f02f5b6bfe7" />

<img width="1401" alt="image" src="https://github.com/user-attachments/assets/4adb2553-fd11-4b5f-ab5f-45f3073f8dba" />


## ✨ Features

- **🧠 AI-Powered Responses**: Get unlimited, contextual responses using OpenAI GPT
- **👨‍👩‍👦 Multiple Personas**: Choose from Indian Dad, Mom, or Uncle
- **⌨️ Virtual Keyboard**: Click keys to type your message
- **⚡ Real-time Transformation**: See your text transform as you type
- **📋 Copy Functionality**: Easily copy the transformed text
- **📱 Mobile Responsive**: Works on all devices
- **💡 Smart Examples**: Try common phrases with example buttons
- **🔄 Fallback System**: Falls back to pre-defined responses if AI fails

## 💬 Response Examples

### 👨 Indian Dad
- "where r u" → "Where are you roaming unnecessarily? Focus on your studies instead!"
- "okay" → "Hmm. Do whatever you want. But remember, papa's advice is always right."
- "need money" → "Money doesn't grow on trees, beta. Work hard and earn it yourself."

### 👩 Indian Mom  
- "I'm hungry" → "Beta, there's dal chawal at home! Why order outside food?"
- "going out" → "Where are you going? Have you eaten? Take water bottle!"

### 👨‍🦳 Indian Uncle
- "job interview" → "In my time, we walked 10km for interviews. You have it easy with video calls!"
- "confused" → "Let me tell you what happened when I was your age..."

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm
- Anthropic Claude API Key (optional, for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd indian-dad-keyboard
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Setup Environment Variables (Optional - for AI features)**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env and add your Anthropic Claude API key:
   # ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

   **To get a Claude API key:**
   - Visit [Anthropic Console](https://console.anthropic.com/)
   - Sign up for an account
   - Go to API Keys section
   - Create a new API key
   - Copy and paste it in your .env file

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   PORT=5001 npm start
   ```
   The backend will run on `http://localhost:5001`

2. **Start the Frontend (in a new terminal)**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

3. **Open your browser** and navigate to `http://localhost:3000`

## 🎯 Usage

1. **Choose a Persona**: Select from Indian Dad, Mom, or Uncle
2. **Toggle AI Mode**: Enable AI for unlimited, contextual responses (requires API key)
3. **Type Your Message**: Use the input area or virtual keyboard
4. **Get Response**: Watch as your text transforms into family-style responses
5. **Copy & Share**: Click the copy button to share your transformed text
6. **Try Examples**: Use the example buttons for quick demonstrations

## 🔧 API Endpoints

- `POST /api/transform` - Transform text with optional AI and persona
- `GET /api/personas` - Get available personas
- `GET /api/health` - Check server and AI status
- `GET /api/suggestions` - Get example phrases

## 💻 Technology Stack

- **Frontend**: React with TypeScript, CSS3 Grid/Flexbox
- **Backend**: Node.js with Express
- **AI Integration**: Anthropic Claude Haiku
- **Styling**: Custom CSS with responsive design
- **API**: RESTful architecture

## Project Structure

```
indian-dad-keyboard/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── ...
│   └── package.json
└── README.md
```

## 🚀 Future Enhancements

- **🎤 Voice Synthesis**: Hear responses in different Indian accents
- **📚 Conversation History**: Save and revisit favorite transformations  
- **🌏 Regional Languages**: Support for Hindi, Tamil, Bengali, etc.
- **📱 Mobile App**: React Native version with keyboard integration
- **👥 Social Features**: Share responses and community-submitted phrases
- **🎭 More Personas**: Aunty, Teacher, Neighbor personalities

## 🤝 Contributing

Feel free to contribute by:
- Adding more Indian family phrases and responses
- Improving the AI prompts for better responses
- Enhancing the UI/UX design
- Adding new personas and features
- Fixing bugs and optimizing performance

## 📄 License

This project is for educational and entertainment purposes. Feel free to use and modify!
