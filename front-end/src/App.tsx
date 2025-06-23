import React, { useState, useCallback } from 'react';
import './App.css';

interface TransformResponse {
  original: string;
  transformed: string;
  isAI?: boolean;
  persona?: string;
}

interface Persona {
  id: string;
  name: string;
  description: string;
}

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [transformedText, setTransformedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('dad');
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [isAIResponse, setIsAIResponse] = useState(false);

  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  React.useEffect(() => {
    const checkAIAvailability = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/health');
        if (response.ok) {
          const data = await response.json();
          setAiEnabled(data.aiEnabled);
        }
      } catch (error) {
        console.error('Failed to check AI availability:', error);
      }
    };

    const fetchPersonas = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/personas');
        if (response.ok) {
          const data = await response.json();
          setPersonas(data.personas);
        }
      } catch (error) {
        console.error('Failed to fetch personas:', error);
      }
    };

    checkAIAvailability();
    fetchPersonas();
  }, []);

  const transformText = useCallback(async (text: string) => {
    if (!text.trim()) {
      setTransformedText('');
      setIsAIResponse(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text, 
          useAI: useAI && aiEnabled,
          persona: selectedPersona 
        }),
      });

      if (response.ok) {
        const data: TransformResponse = await response.json();
        setTransformedText(data.transformed);
        setIsAIResponse(data.isAI || false);
      }
    } catch (error) {
      console.error('Error transforming text:', error);
      setTransformedText('Error: Could not connect to server. Make sure backend is running.');
      setIsAIResponse(false);
    } finally {
      setIsLoading(false);
    }
  }, [useAI, selectedPersona, aiEnabled]);

  const handleKeyPress = (key: string) => {
    const newText = inputText + key;
    setInputText(newText);
  };

  const handleBackspace = () => {
    const newText = inputText.slice(0, -1);
    setInputText(newText);
  };

  const handleSpace = () => {
    const newText = inputText + ' ';
    setInputText(newText);
  };

  const handleClear = () => {
    setInputText('');
    setTransformedText('');
  };

  const handleCopy = async () => {
    if (transformedText) {
      try {
        await navigator.clipboard.writeText(transformedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy text:', error);
      }
    }
  };

  const handleDirectInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🧔 Text Like Your Indian Parents/Relatives</h1>
        <p>Transform your messages into desi responses!</p>
      </header>

      <div className="keyboard-container">
        <div className="controls">
          <div className="persona-selector">
            <label htmlFor="persona-select">Choose Persona:</label>
            <select 
              id="persona-select"
              value={selectedPersona} 
              onChange={(e) => setSelectedPersona(e.target.value)}
              className="persona-dropdown"
            >
              {personas.map((persona) => (
                <option key={persona.id} value={persona.id}>
                  {persona.name}
                </option>
              ))}
            </select>
            <span className="persona-description">
              {personas.find(p => p.id === selectedPersona)?.description}
            </span>
          </div>

          {aiEnabled && (
            <div className="ai-toggle">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={useAI}
                  onChange={(e) => setUseAI(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
              <span className="ai-label">
                🤖 AI-Powered {isAIResponse && '(AI Generated)'}
              </span>
            </div>
          )}
        </div>

        <div className="text-areas">
          <div className="input-section">
            <label htmlFor="input-text">Your Text:</label>
            <textarea
              id="input-text"
              value={inputText}
              onChange={handleDirectInput}
              placeholder="Type your message here..."
              rows={3}
            />
            <button 
              className="transform-btn"
              onClick={() => transformText(inputText)}
              disabled={!inputText.trim() || isLoading}
            >
              {isLoading ? 'Transforming...' : 'Transform Text'}
            </button>
          </div>

          <div className="output-section">
            <label htmlFor="output-text">
              {personas.find(p => p.id === selectedPersona)?.name || 'Indian Dad'} Response: 
              {isLoading && <span className="loading">transforming...</span>}
              {isAIResponse && <span className="ai-badge">🤖 AI</span>}
            </label>
            <textarea
              id="output-text"
              value={transformedText}
              readOnly
              placeholder="Your transformed message will appear here..."
              rows={4}
            />
            {transformedText && (
              <button
                className={`copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            )}
          </div>
        </div>

        <div className="virtual-keyboard">
          <div className="keyboard-title">Virtual Keyboard</div>
          {keyboardLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="keyboard-row">
              {row.map((key) => (
                <button
                  key={key}
                  className="key"
                  onClick={() => handleKeyPress(key)}
                >
                  {key.toUpperCase()}
                </button>
              ))}
            </div>
          ))}
          
          <div className="keyboard-row special-keys">
            <button className="key space-key" onClick={handleSpace}>
              SPACE
            </button>
            <button className="key backspace-key" onClick={handleBackspace}>
              ⌫
            </button>
            <button className="key clear-key" onClick={handleClear}>
              CLEAR
            </button>
          </div>
        </div>

        <div className="examples">
          <h3>Try these examples:</h3>
          <div className="example-buttons">
            <button onClick={() => setInputText('where r u')}>
              "where r u"
            </button>
            <button onClick={() => setInputText('okay')}>
              "okay"
            </button>
            <button onClick={() => setInputText('need money')}>
              "need money"
            </button>
            <button onClick={() => setInputText('going out')}>
              "going out"
            </button>
            <button onClick={() => setInputText('I am tired')}>
              "I am tired"
            </button>
            <button onClick={() => setInputText('can we talk later')}>
              "can we talk later"
            </button>
          </div>
          
          {!aiEnabled && (
            <div className="ai-notice">
              💡 <strong>Want AI-powered responses?</strong> Add your OpenAI API key to the backend .env file for unlimited, contextual responses!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
