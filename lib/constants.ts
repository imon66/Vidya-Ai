// API Keys Configuration
export const API_KEYS = {
  GEMINI_API_KEY: "AIzaSyDw7qRspqnaMZ5T0GUrSdL89LqP1tl0jNQ",
  GROQ_API_KEY: "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"
} as const;

// Model Configuration
export const MODELS = {
  GEMINI: "gemini-1.5-pro",
  GROQ: "llama-3.1-8b-instant"
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  GEMINI: "https://generativelanguage.googleapis.com/v1beta/models",
  GROQ: "https://api.groq.com/openai/v1/chat/completions"
} as const;

// Default Settings
export const DEFAULT_SETTINGS = {
  MODEL: "groq", // Default model is now Groq
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.7
} as const;