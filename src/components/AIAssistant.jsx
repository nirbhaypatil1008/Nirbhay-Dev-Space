import { useState, useRef, useEffect, useMemo } from 'react';
import { projects } from '../data/projects';
import { findDirectAnswer } from '../data/portfolioQA';
import ChatProjectCard from './ChatProjectCard';
import {
  loadConversations,
  saveConversation,
  deleteConversation,
  renameConversation,
  searchConversations,
  loadChatSettings,
  saveChatSettings,
  createNewConversationObject,
  getActiveConversationId,
  setActiveConversationId,
  generateId,
} from '../utils/chatStorage';
import './AIAssistant.css';

const SUGGESTED_QUESTIONS = [
  'Who is Nirbhay Patil?',
  'What technical skills does he have?',
  'Tell me about his Part-Time-Job project.',
  'What is the Dynamic Lab Workstation & Software Tracker?',
  'Tell me about his DSA Tracker project.',
  'What software development opportunities is he looking for?',
];

// Clean text for speech synthesis (strip markdown, tags, code blocks)
function cleanTextForSpeech(text = '') {
  return text
    .replace(/\[PROJECT:[^\]]+\]/g, '')
    .replace(/```[\s\S]*?```/g, 'Code block omitted.')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[*_#~>[\]]/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'history' | 'settings'

  // Conversations state
  const [conversations, setConversations] = useState(() => loadConversations());
  const [activeConvId, setActiveConvIdState] = useState(() => {
    const saved = getActiveConversationId();
    const all = loadConversations();
    if (saved && all.some((c) => c.id === saved)) return saved;
    if (all.length > 0) return all[0].id;
    const initial = createNewConversationObject('standard');
    saveConversation(initial);
    return initial.id;
  });

  // Current conversation
  const currentConversation =
    conversations.find((c) => c.id === activeConvId) ||
    conversations[0] ||
    createNewConversationObject('standard');

  const [mode, setMode] = useState(currentConversation.mode || 'standard');
  const [messages, setMessages] = useState(currentConversation.messages || []);

  // Composer state
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);

  // Settings state
  const [settings, setSettings] = useState(() => loadChatSettings());

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = useMemo(() => {
    if (activeTab !== 'history' || !searchQuery.trim()) return [];
    return searchConversations(searchQuery);
  }, [activeTab, searchQuery]);

  // Speech states
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState(null);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);

  // Delete modal state
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [editingTitleId, setEditingTitleId] = useState(null);
  const [editTitleText, setEditTitleText] = useState('');

  // Copy feedback
  const [copiedId, setCopiedId] = useState(null);

  // Refs
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const abortControllerRef = useRef(null);
  const recognitionRef = useRef(null);

  // Synchronize active conversation with storage
  useEffect(() => {
    setActiveConversationId(activeConvId);
  }, [activeConvId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isStreaming, activeTab]);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Clean speech synthesis & recognition on close or unmount
  useEffect(() => {
    if (!isOpen) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setSpeakingMessageId(null);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
        recognitionRef.current = null;
        setIsListening(false);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
        recognitionRef.current = null;
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);



  // Create New Chat
  const handleNewChat = (chatMode = mode) => {
    if (isStreaming && abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
    const newConv = createNewConversationObject(chatMode);
    const updated = [newConv, ...conversations];
    setConversations(updated);
    saveConversation(newConv);
    setActiveConvIdState(newConv.id);
    setMessages(newConv.messages);
    setActiveTab('chat');
    setError(null);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  // Switch Conversation
  const handleSelectConversation = (id) => {
    if (isStreaming && abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
    const conv = conversations.find((c) => c.id === id);
    if (conv) {
      setMessages(conv.messages || []);
      setMode(conv.mode || 'standard');
    }
    setActiveConvIdState(id);
    setActiveTab('chat');
    setError(null);
  };

  // Delete Conversation
  const handleDeleteConversation = (id) => {
    const remaining = deleteConversation(id);
    setConversations(remaining);
    setDeleteConfirmId(null);

    if (activeConvId === id) {
      if (remaining.length > 0) {
        setActiveConvIdState(remaining[0].id);
      } else {
        const fresh = createNewConversationObject(mode);
        saveConversation(fresh);
        setConversations([fresh]);
        setActiveConvIdState(fresh.id);
      }
    }
  };

  // Save Title Rename
  const handleSaveTitle = (id) => {
    const updated = renameConversation(id, editTitleText);
    setConversations([...updated]);
    setEditingTitleId(null);
    setEditTitleText('');
  };

  // Toggle Mode (Standard vs Recruiter)
  const handleToggleMode = () => {
    const nextMode = mode === 'standard' ? 'recruiter' : 'standard';
    setMode(nextMode);

    // Update current conversation mode
    const updatedConv = {
      ...currentConversation,
      mode: nextMode,
      updatedAt: Date.now(),
    };
    saveConversation(updatedConv);
    setConversations((prev) =>
      prev.map((c) => (c.id === updatedConv.id ? updatedConv : c))
    );
  };

  // Handle Send Message (Streamed)
  const sendMessage = async (textToSend) => {
    const content = (textToSend || input).trim();
    if (!content || isStreaming) return;

    setInput('');
    setError(null);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const userMsgId = generateId('msg');
    const userMsg = {
      id: userMsgId,
      role: 'user',
      content,
      timestamp: Date.now(),
      feedback: null,
      detectedProjects: [],
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    // Update conversation title if default
    let updatedTitle = currentConversation.title;
    if (
      currentConversation.title === 'New Conversation' &&
      newMessages.filter((m) => m.role === 'user').length === 1
    ) {
      updatedTitle = content.length > 32 ? content.substring(0, 32) + '…' : content;
    }

    // Check for direct answer first (bypasses Gemini API for known portfolio questions)
    const directResult = findDirectAnswer(content, mode);
    if (directResult) {
      const detectedProjects = [...(directResult.projects || [])];
      projects.forEach((p) => {
        if (
          (directResult.answer.toLowerCase().includes(p.title.toLowerCase()) ||
            directResult.answer.includes(p.id)) &&
          !detectedProjects.includes(p.id)
        ) {
          detectedProjects.push(p.id);
        }
      });

      const directAssistantMsg = {
        id: generateId('msg'),
        role: 'assistant',
        source: 'direct',
        content: directResult.answer,
        timestamp: Date.now(),
        feedback: null,
        detectedProjects,
        isPartial: false,
      };

      const finalMessages = [...newMessages, directAssistantMsg];
      setMessages(finalMessages);

      const savedConv = {
        ...currentConversation,
        title: updatedTitle,
        mode,
        messages: finalMessages,
        updatedAt: Date.now(),
      };
      saveConversation(savedConv);
      setConversations((prev) =>
        prev.map((c) => (c.id === savedConv.id ? savedConv : c))
      );
      return;
    }

    const assistantMsgId = generateId('msg');
    const assistantMsg = {
      id: assistantMsgId,
      role: 'assistant',
      source: 'gemini',
      content: '',
      timestamp: Date.now(),
      feedback: null,
      detectedProjects: [],
      isPartial: true,
    };

    setMessages([...newMessages, assistantMsg]);
    setIsStreaming(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        let errMessage = 'Failed to generate response.';
        try {
          const errData = await response.json();
          if (errData?.error) errMessage = errData.error;
        } catch {
          // ignore
        }
        throw new Error(errMessage);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let streamBuffer = '';
      let accumulatedText = '';
      let detectedProjects = [];

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        streamBuffer += decoder.decode(value, { stream: true });
        const lines = streamBuffer.split('\n\n');
        streamBuffer = lines.pop() || '';

        for (const line of lines) {
          const cleanLine = line.trim();
          if (cleanLine.startsWith('data: ')) {
            const dataStr = cleanLine.slice(6);
            try {
              const data = JSON.parse(dataStr);
              if (data.chunk) {
                accumulatedText += data.chunk;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsgId
                      ? {
                          ...m,
                          content: accumulatedText,
                          isPartial: true,
                        }
                      : m
                  )
                );
              }

              if (data.done) {
                if (data.detectedProjects) {
                  detectedProjects = data.detectedProjects;
                }
              }

              if (data.error) {
                throw new Error(data.error);
              }
            } catch {
              // Ignore non-json lines
            }
          }
        }
      }

      // Check for any project references in text if backend didn't catch them
      projects.forEach((p) => {
        if (
          (accumulatedText.toLowerCase().includes(p.title.toLowerCase()) ||
            accumulatedText.includes(p.id)) &&
          !detectedProjects.includes(p.id)
        ) {
          detectedProjects.push(p.id);
        }
      });

      const finalAssistantMsg = {
        ...assistantMsg,
        source: 'gemini',
        content: accumulatedText || 'I am ready to help with any questions about Nirbhay.',
        isPartial: false,
        detectedProjects,
      };

      const finalMessages = [...newMessages, finalAssistantMsg];
      setMessages(finalMessages);

      // Save to persistence
      const savedConv = {
        ...currentConversation,
        title: updatedTitle,
        mode,
        messages: finalMessages,
        updatedAt: Date.now(),
      };
      saveConversation(savedConv);
      setConversations((prev) =>
        prev.map((c) => (c.id === savedConv.id ? savedConv : c))
      );
    } catch (err) {
      if (err.name === 'AbortError') {
        // User deliberately stopped generation
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? { ...m, isPartial: false, wasStopped: true }
              : m
          )
        );
      } else {
        console.error('Chat error:', err);
        setError(err.message || 'Something went wrong. Please try again.');
        // Remove the empty assistant message on error
        setMessages((prev) => prev.filter((m) => m.id !== assistantMsgId));
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  // Stop active generation
  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  // Retry / Regenerate last message
  const handleRetry = () => {
    if (isStreaming) return;
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUserMsg) return;

    // Remove the last assistant message if it exists
    const trimmedMessages = messages.slice(0, messages.lastIndexOf(lastUserMsg));
    setMessages(trimmedMessages);
    sendMessage(lastUserMsg.content);
  };

  // Copy message text
  const handleCopy = async (id, text) => {
    try {
      const clean = text.replace(/\[PROJECT:[^\]]+\]/g, '').trim();
      await navigator.clipboard.writeText(clean);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  // Message feedback (helpful / not helpful)
  const handleFeedback = (msgId, type) => {
    const updatedMessages = messages.map((m) => {
      if (m.id === msgId) {
        return {
          ...m,
          feedback: m.feedback === type ? null : type,
        };
      }
      return m;
    });

    setMessages(updatedMessages);

    const updatedConv = {
      ...currentConversation,
      messages: updatedMessages,
      updatedAt: Date.now(),
    };
    saveConversation(updatedConv);
    setConversations((prev) =>
      prev.map((c) => (c.id === updatedConv.id ? updatedConv : c))
    );
  };

  // Text-to-Speech (Read Aloud)
  const handleSpeak = (msgId, text) => {
    if (!('speechSynthesis' in window)) {
      setSpeechError('Text-to-speech is not supported by your browser.');
      setTimeout(() => setSpeechError(null), 3000);
      return;
    }

    if (speakingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const clean = cleanTextForSpeech(text);
    if (!clean) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Speech-to-Text (Voice Input)
  const toggleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError(
        'Speech recognition is not supported in this browser. Try Chrome or Edge.'
      );
      setTimeout(() => setSpeechError(null), 4000);
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
        recognitionRef.current = null;
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i] && event.results[i][0]) {
            transcript += event.results[i][0].transcript;
          }
        }

        const cleanTranscript = transcript.trim();
        if (cleanTranscript) {
          setInput((prev) => {
            const base = prev.trim();
            return base ? `${base} ${cleanTranscript}` : cleanTranscript;
          });
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone permission was denied. Please allow microphone access.');
        } else if (event.error !== 'no-speech') {
          setSpeechError(`Voice input error: ${event.error}`);
        }
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Voice input error:', err);
      setSpeechError('Could not start voice recognition.');
      setIsListening(false);
      recognitionRef.current = null;
    }
  };

  // Keydown handler in textarea
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Update Settings
  const handleUpdateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    saveChatSettings(updated);
  };

  const handleResetSettings = () => {
    setSettings({ theme: 'portfolio', fontSize: 'normal', soundEnabled: true });
    saveChatSettings({ theme: 'portfolio', fontSize: 'normal', soundEnabled: true });
  };

  // Format message text to remove [PROJECT:id] tags from prose
  const formatMessageText = (content = '') => {
    return content.replace(/\[PROJECT:[a-zA-Z0-9_-]+\]/g, '').trim();
  };

  const isNewConv = messages.filter((m) => m.role === 'user').length === 0;

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        className={`ai-fab${isOpen ? ' ai-fab--active' : ''}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'}
        aria-expanded={isOpen}
        aria-controls="ai-panel"
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        <span className="ai-fab__label">Ask about Nirbhay</span>
      </button>

      {/* Main Chat Panel */}
      <div
        id="ai-panel"
        className={`ai-panel ai-panel--theme-${settings.theme} ai-panel--font-${settings.fontSize}${
          isOpen ? ' ai-panel--open' : ''
        }`}
        role="dialog"
        aria-label="Portfolio AI Assistant"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        {/* Panel Header */}
        <div className="ai-panel__header">
          <div className="ai-panel__title-group">
            <div className="ai-panel__avatar" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a10 10 0 1 0 10 10" />
                <circle cx="12" cy="12" r="3" />
                <path d="M22 2 12 12" />
              </svg>
            </div>
            <div>
              <div className="ai-panel__title-row">
                <h3 className="ai-panel__title">Portfolio Assistant</h3>
                <span className={`ai-mode-badge ai-mode-badge--${mode}`}>
                  {mode === 'recruiter' ? 'Recruiter Mode' : 'Standard'}
                </span>
              </div>
              <p className="ai-panel__subtitle">
                {mode === 'recruiter'
                  ? 'Concise qualifications & architecture'
                  : 'Grounded in authentic portfolio data'}
              </p>
            </div>
          </div>

          <div className="ai-panel__header-actions">
            {/* Recruiter Mode Toggle */}
            <button
              className={`ai-btn-icon${mode === 'recruiter' ? ' ai-btn-icon--active' : ''}`}
              onClick={handleToggleMode}
              title={`Switch to ${mode === 'recruiter' ? 'Standard' : 'Recruiter'} Mode`}
              aria-label={`Toggle recruiter mode. Currently ${mode}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </button>

            {/* History Tab Button */}
            <button
              className={`ai-btn-icon${activeTab === 'history' ? ' ai-btn-icon--active' : ''}`}
              onClick={() => setActiveTab(activeTab === 'history' ? 'chat' : 'history')}
              title="Conversation History"
              aria-label="Toggle Conversation History"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </button>

            {/* New Chat Button */}
            <button
              className="ai-btn-icon"
              onClick={() => handleNewChat()}
              title="Start New Chat"
              aria-label="Start New Chat"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            {/* Settings Tab Button */}
            <button
              className={`ai-btn-icon${activeTab === 'settings' ? ' ai-btn-icon--active' : ''}`}
              onClick={() => setActiveTab(activeTab === 'settings' ? 'chat' : 'settings')}
              title="Chat Settings"
              aria-label="Chat Appearance Settings"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>

            {/* Close Panel Button */}
            <button
              className="ai-panel__close"
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: CONVERSATION HISTORY ================= */}
        {activeTab === 'history' && (
          <div className="ai-history-panel" role="region" aria-label="Conversation History">
            <div className="ai-history-header">
              <div className="ai-search-box">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search previous conversations…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ai-search-input"
                  aria-label="Search conversations"
                />
                {searchQuery && (
                  <button
                    className="ai-search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="ai-history-list">
              {searchQuery.trim() ? (
                // Search Results
                searchResults.length > 0 ? (
                  searchResults.map((res) => (
                    <div
                      key={res.conversationId}
                      className={`ai-history-item${
                        res.conversationId === activeConvId ? ' ai-history-item--active' : ''
                      }`}
                      onClick={() => handleSelectConversation(res.conversationId)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="ai-history-item__header">
                        <span className="ai-history-item__title">{res.title}</span>
                        <span className="ai-history-item__date">
                          {new Date(res.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="ai-history-item__snippet">{res.snippet}</p>
                    </div>
                  ))
                ) : (
                  <div className="ai-history-empty">
                    <p>No matching conversations found.</p>
                  </div>
                )
              ) : (
                // Full History List
                conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`ai-history-item${
                      conv.id === activeConvId ? ' ai-history-item--active' : ''
                    }`}
                    onClick={() => handleSelectConversation(conv.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="ai-history-item__main">
                      {editingTitleId === conv.id ? (
                        <div
                          className="ai-history-edit-row"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="text"
                            value={editTitleText}
                            onChange={(e) => setEditTitleText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveTitle(conv.id);
                              if (e.key === 'Escape') setEditingTitleId(null);
                            }}
                            className="ai-history-input-edit"
                            autoFocus
                          />
                          <button
                            className="ai-btn-text"
                            onClick={() => handleSaveTitle(conv.id)}
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="ai-history-item__header">
                          <span className="ai-history-item__title">{conv.title}</span>
                          <span className="ai-history-item__date">
                            {new Date(conv.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      <p className="ai-history-item__snippet">
                        {conv.messages[conv.messages.length - 1]?.content.substring(0, 60)}…
                      </p>
                    </div>

                    <div
                      className="ai-history-item__actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="ai-history-btn-action"
                        onClick={() => {
                          setEditingTitleId(conv.id);
                          setEditTitleText(conv.title);
                        }}
                        title="Rename"
                        aria-label={`Rename ${conv.title}`}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                      </button>

                      <button
                        className="ai-history-btn-action ai-history-btn-action--delete"
                        onClick={() => setDeleteConfirmId(conv.id)}
                        title="Delete"
                        aria-label={`Delete ${conv.title}`}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirmId && (
              <div className="ai-modal-overlay" role="dialog" aria-modal="true">
                <div className="ai-modal-content">
                  <h4>Delete conversation?</h4>
                  <p>This action cannot be undone.</p>
                  <div className="ai-modal-actions">
                    <button
                      className="btn btn-ghost"
                      onClick={() => setDeleteConfirmId(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary ai-btn-danger"
                      onClick={() => handleDeleteConversation(deleteConfirmId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: APPEARANCE SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div className="ai-settings-panel" role="region" aria-label="Appearance Settings">
            <div className="ai-settings-group">
              <h4 className="ai-settings-group-title">Theme</h4>
              <div className="ai-settings-options">
                {[
                  { id: 'portfolio', label: 'Match Portfolio' },
                  { id: 'light', label: 'Light Ivory' },
                  { id: 'dark', label: 'Dark Forest' },
                  { id: 'forest', label: 'Forest Emerald' },
                ].map((th) => (
                  <button
                    key={th.id}
                    className={`ai-settings-choice${
                      settings.theme === th.id ? ' ai-settings-choice--selected' : ''
                    }`}
                    onClick={() => handleUpdateSetting('theme', th.id)}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="ai-settings-group">
              <h4 className="ai-settings-group-title">Text Size</h4>
              <div className="ai-settings-options">
                {[
                  { id: 'compact', label: 'Compact' },
                  { id: 'normal', label: 'Default' },
                  { id: 'large', label: 'Large' },
                ].map((fs) => (
                  <button
                    key={fs.id}
                    className={`ai-settings-choice${
                      settings.fontSize === fs.id ? ' ai-settings-choice--selected' : ''
                    }`}
                    onClick={() => handleUpdateSetting('fontSize', fs.id)}
                  >
                    {fs.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="ai-settings-footer">
              <button className="btn btn-ghost" onClick={handleResetSettings}>
                Reset to Default
              </button>
              <button className="btn btn-primary" onClick={() => setActiveTab('chat')}>
                Done
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 3: CHAT VIEW ================= */}
        {activeTab === 'chat' && (
          <>
            {/* Error or Alert banner */}
            {(error || speechError) && (
              <div className="ai-alert-banner" role="alert">
                <span>{error || speechError}</span>
                <button
                  className="ai-alert-close"
                  onClick={() => {
                    setError(null);
                    setSpeechError(null);
                  }}
                  aria-label="Dismiss alert"
                >
                  ×
                </button>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="ai-panel__messages" role="log" aria-live="polite">
              {messages.map((msg) => {
                const isAssistant = msg.role === 'assistant';
                const formattedText = formatMessageText(msg.content);
                const isSpeakingThis = speakingMessageId === msg.id;

                return (
                  <div
                    key={msg.id}
                    className={`ai-message ai-message--${msg.role}`}
                    aria-label={isAssistant ? 'Assistant response' : 'Your message'}
                  >
                    <div className="ai-message__bubble">
                      <p className="ai-message__content">{formattedText}</p>

                      {/* Render Structured Project Cards if referenced */}
                      {msg.detectedProjects && msg.detectedProjects.length > 0 && (
                        <div className="ai-message__projects">
                          {msg.detectedProjects.map((projId) => (
                            <ChatProjectCard
                              key={projId}
                              projectId={projId}
                              onNavigate={() => setIsOpen(false)}
                            />
                          ))}
                        </div>
                      )}

                      {/* Message Actions (Assistant only) */}
                      {isAssistant && !msg.isPartial && (
                        <div className="ai-message__actions">
                          {/* Copy button */}
                          <button
                            className="ai-msg-action"
                            onClick={() => handleCopy(msg.id, msg.content)}
                            title="Copy response"
                            aria-label="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <span className="ai-msg-action__copied">Copied!</span>
                            ) : (
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
                            )}
                          </button>

                          {/* Read Aloud button */}
                          <button
                            className={`ai-msg-action${isSpeakingThis ? ' ai-msg-action--active' : ''}`}
                            onClick={() => handleSpeak(msg.id, msg.content)}
                            title={isSpeakingThis ? 'Stop speaking' : 'Read aloud'}
                            aria-label={isSpeakingThis ? 'Stop speaking' : 'Read aloud'}
                          >
                            {isSpeakingThis ? (
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="6" y="6" width="12" height="12" />
                              </svg>
                            ) : (
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                              </svg>
                            )}
                          </button>

                          {/* Helpful Feedback */}
                          <button
                            className={`ai-msg-action${
                              msg.feedback === 'helpful' ? ' ai-msg-action--feedback-active' : ''
                            }`}
                            onClick={() => handleFeedback(msg.id, 'helpful')}
                            title="Helpful response"
                            aria-label="Mark response as helpful"
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                            </svg>
                          </button>

                          {/* Not Helpful Feedback */}
                          <button
                            className={`ai-msg-action${
                              msg.feedback === 'not-helpful'
                                ? ' ai-msg-action--feedback-active'
                                : ''
                            }`}
                            onClick={() => handleFeedback(msg.id, 'not-helpful')}
                            title="Not helpful response"
                            aria-label="Mark response as not helpful"
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
                            </svg>
                          </button>

                          {/* Retry button on the very last assistant message */}
                          {messages[messages.length - 1]?.id === msg.id && (
                            <button
                              className="ai-msg-action"
                              onClick={handleRetry}
                              title="Regenerate answer"
                              aria-label="Regenerate answer"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="1 4 1 10 7 10" />
                                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                              </svg>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isStreaming && messages[messages.length - 1]?.content === '' && (
                <div className="ai-message ai-message--assistant" aria-label="Assistant is generating answer">
                  <div className="ai-typing" aria-hidden="true">
                    <span /><span /><span />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions (Displayed on empty conversation or when few messages) */}
            {isNewConv && !isStreaming && (
              <div className="ai-suggestions" aria-label="Suggested questions">
                <span className="ai-suggestions__label">Suggested questions:</span>
                <div className="ai-suggestions__chips">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      className="ai-suggestion"
                      onClick={() => sendMessage(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Composer */}
            <form
              className="ai-panel__composer"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <div className="ai-composer-wrap">
                <textarea
                  ref={textareaRef}
                  className="ai-composer-input"
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isListening
                      ? 'Listening to your voice…'
                      : mode === 'recruiter'
                      ? 'Ask about qualifications, projects, architecture…'
                      : 'Ask about Nirbhay Patil…'
                  }
                  disabled={isStreaming}
                  aria-label="Your message to the portfolio assistant"
                  maxLength={2000}
                />

                <div className="ai-composer-tools">
                  {/* Microphone Voice Input */}
                  <button
                    type="button"
                    className={`ai-composer-btn${isListening ? ' ai-composer-btn--recording' : ''}`}
                    onClick={toggleVoiceInput}
                    title={isListening ? 'Stop recording voice' : 'Dictate with voice input'}
                    aria-label={isListening ? 'Stop recording voice' : 'Dictate with voice input'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={isListening ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  </button>

                  {/* Stop Streaming Button */}
                  {isStreaming ? (
                    <button
                      type="button"
                      className="ai-composer-btn ai-composer-btn--stop"
                      onClick={handleStopGeneration}
                      title="Stop generating"
                      aria-label="Stop generating response"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="6" width="12" height="12" rx="2" />
                      </svg>
                    </button>
                  ) : (
                    /* Send Button */
                    <button
                      type="submit"
                      className="ai-composer-btn ai-composer-btn--send"
                      disabled={!input.trim() || isStreaming}
                      title="Send message (Enter)"
                      aria-label="Send message"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
