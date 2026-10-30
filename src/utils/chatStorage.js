// ============================================================
// CHAT STORAGE & CONVERSATION MANAGEMENT
// Handles persistent conversation history, search, and preferences.
// Uses browser localStorage with graceful error handling.
// ============================================================

const CONVERSATIONS_KEY = 'np_portfolio_chat_conversations';
const ACTIVE_CONV_KEY = 'np_portfolio_chat_active_id';
const SETTINGS_KEY = 'np_portfolio_chat_settings';

export const DEFAULT_SETTINGS = {
  theme: 'portfolio', // 'portfolio' | 'light' | 'dark' | 'forest'
  fontSize: 'normal', // 'compact' | 'normal' | 'large'
  soundEnabled: true,
};

// Generate a random unique ID
export function generateId(prefix = 'c') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Default initial conversation
export function createNewConversationObject(mode = 'standard') {
  return {
    id: generateId('conv'),
    title: 'New Conversation',
    mode, // 'standard' | 'recruiter'
    createdAt: Date.now(),
    updatedAt: Date.now(),
    messages: [
      {
        id: generateId('msg'),
        role: 'assistant',
        source: 'direct',
        content:
          mode === 'recruiter'
            ? "Hello! Recruiter & Interview Mode is active. I'm ready to provide structured, concise overviews of Nirbhay Patil's technical stack, project architecture, education, and role availability."
            : "Hi! I'm Nirbhay Patil's portfolio assistant. I can answer questions about his technical skills, projects, education, and how to get in touch. How can I help you?",
        timestamp: Date.now(),
        feedback: null, // 'helpful' | 'not-helpful' | null
        detectedProjects: [],
      },
    ],
  };
}

// Load all saved conversations
export function loadConversations() {
  try {
    const raw = localStorage.getItem(CONVERSATIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  } catch (err) {
    console.error('Failed to load conversations from localStorage:', err);
    return [];
  }
}

// Save all conversations
export function saveConversations(conversations) {
  try {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
  } catch (err) {
    console.error('Failed to save conversations to localStorage:', err);
  }
}

// Get or initialize active conversation ID
export function getActiveConversationId() {
  try {
    return localStorage.getItem(ACTIVE_CONV_KEY) || null;
  } catch {
    return null;
  }
}

export function setActiveConversationId(id) {
  try {
    if (id) {
      localStorage.setItem(ACTIVE_CONV_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_CONV_KEY);
    }
  } catch (err) {
    console.error('Failed to set active conversation ID:', err);
  }
}

// Save or update a single conversation
export function saveConversation(conversation) {
  const conversations = loadConversations();
  const index = conversations.findIndex((c) => c.id === conversation.id);

  const updatedConv = {
    ...conversation,
    updatedAt: Date.now(),
  };

  if (index >= 0) {
    conversations[index] = updatedConv;
  } else {
    conversations.unshift(updatedConv);
  }

  saveConversations(conversations);
  return updatedConv;
}

// Delete a conversation by ID
export function deleteConversation(id) {
  const conversations = loadConversations();
  const filtered = conversations.filter((c) => c.id !== id);
  saveConversations(filtered);
  return filtered;
}

// Rename conversation
export function renameConversation(id, newTitle) {
  const conversations = loadConversations();
  const target = conversations.find((c) => c.id === id);
  if (target) {
    target.title = newTitle.trim() || 'Untitled Conversation';
    target.updatedAt = Date.now();
    saveConversations(conversations);
  }
  return conversations;
}

// Search conversations by title or message contents
export function searchConversations(query) {
  if (!query || !query.trim()) {
    return [];
  }

  const q = query.trim().toLowerCase();
  const conversations = loadConversations();
  const results = [];

  for (const conv of conversations) {
    const titleMatch = (conv.title || '').toLowerCase().includes(q);
    let matchedSnippet = null;
    let matchedMessageIndex = -1;

    for (let i = 0; i < (conv.messages || []).length; i++) {
      const msg = conv.messages[i];
      const content = (msg.content || '').toLowerCase();
      const pos = content.indexOf(q);
      if (pos >= 0) {
        matchedMessageIndex = i;
        const start = Math.max(0, pos - 30);
        const end = Math.min(msg.content.length, pos + q.length + 50);
        matchedSnippet = (start > 0 ? '…' : '') + msg.content.substring(start, end) + (end < msg.content.length ? '…' : '');
        break;
      }
    }

    if (titleMatch || matchedSnippet) {
      results.push({
        conversationId: conv.id,
        title: conv.title,
        updatedAt: conv.updatedAt,
        snippet: matchedSnippet || (conv.messages[conv.messages.length - 1]?.content.substring(0, 80) + '…'),
        matchedMessageIndex,
      });
    }
  }

  return results;
}

// Load appearance settings
export function loadChatSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

// Save appearance settings
export function saveChatSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save chat settings:', err);
  }
}

