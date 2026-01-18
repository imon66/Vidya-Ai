'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Moon, Sun, MessageSquare, Plus, Sparkles, Code, FileText, Calendar, BarChart3, BookOpen, Target, Users, Briefcase, Clock, Trophy, ChevronRight, Play, CheckCircle, Menu, X, Heart } from 'lucide-react'
import { useTheme } from './components/ThemeProvider'
import { cn } from '@/lib/utils'
import CodingChallenges from './components/CodingChallenges'
import ResumeReview from './components/ResumeReview'
import ProgressTracking from './components/ProgressTracking'
import DSAPreparation from './components/DSAPreparation'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

type ActiveSection = 'vidya-ai' | 'dashboard' | 'interview-practice' | 'coding-challenges' | 'dsa-preparation' | 'resume-review' | 'mock-interviews' | 'progress'

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState<'gemini' | 'groq'>('groq')
  const [activeSection, setActiveSection] = useState<ActiveSection>('vidya-ai')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme, toggleTheme } = useTheme()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Use different API endpoints based on the active section
      const apiEndpoint = activeSection === 'vidya-ai' ? '/api/general-chat' : '/api/chat'
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          model: selectedModel,
          history: messages
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const newChat = () => {
    setMessages([])
  }

  const sidebarItems = [
    { id: 'vidya-ai', icon: Sparkles, label: 'Vidya AI Chat', description: 'General AI assistant' },
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', description: 'Overview & Progress' },
    { id: 'interview-practice', icon: MessageSquare, label: 'AI Interview Practice', description: 'Practice with AI interviewer' },
    { id: 'coding-challenges', icon: Code, label: 'Coding Challenges', description: 'Programming problems' },
    { id: 'dsa-preparation', icon: BookOpen, label: 'DSA Preparation', description: '30 curated DSA problems' },
    { id: 'resume-review', icon: FileText, label: 'Resume Review', description: 'AI-powered feedback' },
    { id: 'mock-interviews', icon: Calendar, label: 'Mock Interviews', description: 'Schedule practice sessions' },
    { id: 'progress', icon: Trophy, label: 'Progress Tracking', description: 'Your improvement journey' }
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8 border border-accent/20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center neon-glow">
            <Target size={24} className="text-background" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Welcome to InterviewAce</h1>
            <p className="text-muted-foreground">Your AI-powered interview preparation platform</p>
          </div>
        </div>
        <p className="text-foreground/80 mb-6">
          Designed specifically for fresh graduates to master technical interviews, coding challenges, and land their dream job.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card/50 rounded-lg p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-green-500" />
              <span className="font-medium">AI-Powered Practice</span>
            </div>
            <p className="text-sm text-muted-foreground">Practice with intelligent AI that adapts to your skill level</p>
          </div>
          <div className="bg-card/50 rounded-lg p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-green-500" />
              <span className="font-medium">Real Interview Questions</span>
            </div>
            <p className="text-sm text-muted-foreground">Questions from top tech companies like Google, Microsoft, Amazon</p>
          </div>
          <div className="bg-card/50 rounded-lg p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-green-500" />
              <span className="font-medium">Progress Tracking</span>
            </div>
            <p className="text-sm text-muted-foreground">Monitor your improvement and identify areas to focus on</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          onClick={() => setActiveSection('interview-practice')}
          className="bg-card/50 rounded-xl p-6 border border-border/50 hover:border-accent/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <MessageSquare size={20} className="text-blue-500" />
            </div>
            <h3 className="font-semibold">Start AI Interview</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Practice behavioral and technical questions with our AI interviewer</p>
          <div className="flex items-center text-accent text-sm group-hover:translate-x-1 transition-transform">
            <span>Begin Practice</span>
            <ChevronRight size={16} className="ml-1" />
          </div>
        </div>

        <div 
          onClick={() => setActiveSection('coding-challenges')}
          className="bg-card/50 rounded-xl p-6 border border-border/50 hover:border-accent/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Code size={20} className="text-green-500" />
            </div>
            <h3 className="font-semibold">Coding Challenges</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Solve programming problems from easy to advanced levels</p>
          <div className="flex items-center text-accent text-sm group-hover:translate-x-1 transition-transform">
            <span>Start Coding</span>
            <ChevronRight size={16} className="ml-1" />
          </div>
        </div>

        <div 
          onClick={() => setActiveSection('resume-review')}
          className="bg-card/50 rounded-xl p-6 border border-border/50 hover:border-accent/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <FileText size={20} className="text-purple-500" />
            </div>
            <h3 className="font-semibold">Resume Review</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Get AI-powered feedback to improve your resume</p>
          <div className="flex items-center text-accent text-sm group-hover:translate-x-1 transition-transform">
            <span>Review Resume</span>
            <ChevronRight size={16} className="ml-1" />
          </div>
        </div>
      </div>

      {/* Recent Activity & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card/50 rounded-xl p-6 border border-border/50">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Clock size={18} className="text-accent" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <MessageSquare size={14} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Completed behavioral interview practice</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <Code size={14} className="text-green-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Solved 3 coding problems</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card/50 rounded-xl p-6 border border-border/50">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-accent" />
            Your Progress
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Interview Skills</span>
                <span className="text-accent">75%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Coding Proficiency</span>
                <span className="text-accent">60%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Resume Quality</span>
                <span className="text-accent">85%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderInterviewPractice = () => (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <MessageSquare size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">AI Interview Practice</h2>
          <p className="text-muted-foreground">Practice with our intelligent AI interviewer</p>
        </div>
      </div>

      {/* Interview Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-card/50 rounded-lg p-4 border border-border/50 hover:border-accent/50 transition-all cursor-pointer">
          <h3 className="font-semibold mb-2">Behavioral Interview</h3>
          <p className="text-sm text-muted-foreground mb-3">Practice common behavioral questions and STAR method</p>
          <button className="webdev-button text-sm">Start Practice</button>
        </div>
        <div className="bg-card/50 rounded-lg p-4 border border-border/50 hover:border-accent/50 transition-all cursor-pointer">
          <h3 className="font-semibold mb-2">Technical Interview</h3>
          <p className="text-sm text-muted-foreground mb-3">System design and technical concept discussions</p>
          <button className="webdev-button text-sm">Start Practice</button>
        </div>
        <div className="bg-card/50 rounded-lg p-4 border border-border/50 hover:border-accent/50 transition-all cursor-pointer">
          <h3 className="font-semibold mb-2">Company-Specific</h3>
          <p className="text-sm text-muted-foreground mb-3">Practice for specific companies like Google, Amazon</p>
          <button className="webdev-button text-sm">Start Practice</button>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-card/30 rounded-xl border border-border/50 overflow-hidden relative flex flex-col flex-1 min-h-0">
        {/* Fixed Header */}
        <div className="p-4 border-b border-border/50 bg-card/50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <span className="text-xs font-bold text-background">AI</span>
            </div>
            <div>
              <h3 className="font-semibold font-['Google_Sans',sans-serif]">AI Interviewer</h3>
              <p className="text-xs text-muted-foreground font-['Google_Sans',sans-serif]">Ready to conduct your interview</p>
            </div>
          </div>
        </div>

        {/* Scrollable Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center neon-glow">
                  <Play size={24} className="text-background" />
                </div>
                <h3 className="font-semibold mb-2">Ready to start your interview?</h3>
                <p className="text-sm text-muted-foreground mb-4">I'll ask you questions and provide feedback on your answers</p>
                <button 
                  onClick={() => {
                    const welcomeMessage: Message = {
                      id: Date.now().toString(),
                      content: "Hello! I'm your AI interviewer. Let's start with a simple question: Can you tell me about yourself and why you're interested in this role?",
                      role: 'assistant',
                      timestamp: new Date()
                    }
                    setMessages([welcomeMessage])
                  }}
                  className="webdev-button"
                >
                  Start Interview
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-background">AI</span>
                    </div>
                  )}
                  <div className={cn(
                    "flex-1 p-3 rounded-lg font-['Google_Sans',sans-serif]",
                    message.role === 'user'
                      ? 'bg-accent text-accent-foreground ml-auto'
                      : 'bg-muted'
                  )}>
                    <p className="text-sm whitespace-pre-wrap font-['Google_Sans',sans-serif]">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1 font-['Google_Sans',sans-serif]">{message.timestamp.toLocaleTimeString()}</p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-background">U</span>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                    <span className="text-xs font-bold text-background">AI</span>
                  </div>
                  <div className="bg-muted p-3 rounded-lg font-['Google_Sans',sans-serif]">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Fixed Input Area */}
        <div className="p-2 lg:p-3 border-t border-border/50 bg-card/50 flex-shrink-0">
          <div className="flex gap-2 lg:gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your answer here..."
              className="flex-1 p-2 lg:p-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent/50 resize-none transition-all duration-200 text-sm lg:text-base font-['Google_Sans',sans-serif]"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className={cn(
                "px-3 py-2 lg:px-4 lg:py-2 rounded-lg bg-accent hover:bg-accent/80 disabled:bg-muted",
                "text-accent-foreground disabled:text-muted-foreground",
                "transition-all duration-200 flex items-center justify-center",
                "disabled:cursor-not-allowed"
              )}
            >
              <Send size={14} className="lg:hidden" />
              <Send size={16} className="hidden lg:block" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'vidya-ai':
        return (
          <div className="flex flex-col h-full space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center neon-glow">
                <Sparkles size={20} className="text-background" />
              </div>
              <div>
                <h2 className="text-2xl font-bold gradient-text">Vidya AI</h2>
                <p className="text-muted-foreground">Your general AI assistant - ask me anything!</p>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="bg-card/30 rounded-xl border border-border/50 overflow-hidden relative flex flex-col flex-1 min-h-0">
              {/* Fixed Header */}
              <div className="p-4 border-b border-border/50 bg-card/50 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                    <span className="text-xs font-bold text-background">AI</span>
                  </div>
                  <div>
                    <h3 className="font-semibold font-['Google_Sans',sans-serif]">Vidya AI Assistant</h3>
                    <p className="text-xs text-muted-foreground font-['Google_Sans',sans-serif]">Ready to help with any questions</p>
                  </div>
                </div>
              </div>

              {/* Scrollable Messages Area */}
              <div className="flex-1 overflow-y-auto p-4">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center neon-glow">
                        <Sparkles size={24} className="text-background" />
                      </div>
                      <h3 className="font-semibold mb-2">Hello! I'm Vidya AI</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        I'm your general AI assistant. Ask me anything - from coding questions to general knowledge,
                        explanations, writing help, or just have a conversation!
                      </p>
                      <div className="grid grid-cols-1 gap-2 text-sm max-w-md mx-auto">
                        <div className="p-3 rounded-lg bg-card/50 border border-border/50">
                          <span className="text-accent">💡</span> Ask me to explain complex concepts
                        </div>
                        <div className="p-3 rounded-lg bg-card/50 border border-border/50">
                          <span className="text-accent">🔍</span> Get help with coding problems
                        </div>
                        <div className="p-3 rounded-lg bg-card/50 border border-border/50">
                          <span className="text-accent">✍️</span> Writing and content assistance
                        </div>
                        <div className="p-3 rounded-lg bg-card/50 border border-border/50">
                          <span className="text-accent">🤔</span> General knowledge and research
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3",
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {message.role === 'assistant' && (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-background">AI</span>
                          </div>
                        )}
                        <div className={cn(
                          "flex-1 p-3 rounded-lg font-['Google_Sans',sans-serif]",
                          message.role === 'user'
                            ? 'bg-accent text-accent-foreground ml-auto'
                            : 'bg-muted'
                        )}>
                          <p className="text-sm whitespace-pre-wrap font-['Google_Sans',sans-serif]">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1 font-['Google_Sans',sans-serif]">{message.timestamp.toLocaleTimeString()}</p>
                        </div>
                        {message.role === 'user' && (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-background">U</span>
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                          <span className="text-xs font-bold text-background">AI</span>
                        </div>
                        <div className="bg-muted p-3 rounded-lg font-['Google_Sans',sans-serif]">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Fixed Input Area */}
              <div className="p-2 lg:p-3 border-t border-border/50 bg-card/50 flex-shrink-0">
                <div className="flex gap-2 lg:gap-3">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 p-2 lg:p-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent/50 resize-none transition-all duration-200 text-sm lg:text-base font-['Google_Sans',sans-serif]"
                    rows={1}
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className={cn(
                      "px-3 py-2 lg:px-4 lg:py-2 rounded-lg bg-accent hover:bg-accent/80 disabled:bg-muted",
                      "text-accent-foreground disabled:text-muted-foreground",
                      "transition-all duration-200 flex items-center justify-center",
                      "disabled:cursor-not-allowed"
                    )}
                  >
                    <Send size={14} className="lg:hidden" />
                    <Send size={16} className="hidden lg:block" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      case 'dashboard':
        return renderDashboard()
      case 'interview-practice':
        return renderInterviewPractice()
      case 'coding-challenges':
        return <CodingChallenges />
      case 'dsa-preparation':
        return <DSAPreparation />
      case 'resume-review':
        return <ResumeReview />
      case 'mock-interviews':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Calendar size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Mock Interviews</h2>
                <p className="text-muted-foreground">Schedule practice sessions with experienced interviewers</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card/50 rounded-xl p-6 border border-border/50 hover:border-accent/50 transition-all cursor-pointer group">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                  <Users size={24} className="text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2">Technical Interview</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Practice system design, algorithms, and technical problem-solving with senior engineers
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent">60 min session</span>
                  <button className="webdev-button text-sm">Schedule</button>
                </div>
              </div>

              <div className="bg-card/50 rounded-xl p-6 border border-border/50 hover:border-accent/50 transition-all cursor-pointer group">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                  <MessageSquare size={24} className="text-green-500" />
                </div>
                <h3 className="font-semibold mb-2">Behavioral Interview</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Practice STAR method responses and common behavioral questions with HR professionals
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent">45 min session</span>
                  <button className="webdev-button text-sm">Schedule</button>
                </div>
              </div>

              <div className="bg-card/50 rounded-xl p-6 border border-border/50 hover:border-accent/50 transition-all cursor-pointer group">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                  <Briefcase size={24} className="text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">Company-Specific</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tailored interview practice for specific companies like Google, Amazon, Microsoft
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent">90 min session</span>
                  <button className="webdev-button text-sm">Schedule</button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-orange-500/20">
              <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Users size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Technical Interview with Sarah Chen</h4>
                      <p className="text-sm text-muted-foreground">Senior Software Engineer at Google</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Tomorrow, 2:00 PM</p>
                    <p className="text-xs text-muted-foreground">60 minutes</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <MessageSquare size={16} className="text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Behavioral Interview with Mike Johnson</h4>
                      <p className="text-sm text-muted-foreground">HR Director at Microsoft</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Friday, 10:00 AM</p>
                    <p className="text-xs text-muted-foreground">45 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'progress':
        return <ProgressTracking />
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="flex h-screen bg-background matrix-bg">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-accent/10 transition-all duration-200"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center neon-glow">
              <Briefcase size={16} className="text-background" />
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text">InterviewAce</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as 'gemini' | 'groq')}
              className="text-xs bg-background/80 border border-input rounded-lg px-2 py-1 text-foreground focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            >
              <option value="gemini">Gemini</option>
              <option value="groq">Groq</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "bg-card/50 backdrop-blur-md border-r border-border flex flex-col cyber-grid transition-all duration-300 ease-in-out",
        "lg:w-80 lg:relative lg:translate-x-0",
        "fixed top-0 left-0 h-full w-80 z-50",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 pt-20 lg:pt-6">
          <div className="hidden lg:flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center neon-glow">
              <Briefcase size={20} className="text-background" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">InterviewAce</h1>
              <p className="text-xs text-muted-foreground">AI Interview Prep Platform</p>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id as ActiveSection)
                    setSidebarOpen(false) // Close sidebar on mobile when item is selected
                  }}
                  className={cn(
                    "w-full p-3 rounded-lg text-left transition-all duration-200 group",
                    "hover:bg-accent/10 hover:border-accent/20 border border-transparent",
                    activeSection === item.id && "bg-accent/10 border-accent/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={cn(
                      "transition-colors",
                      activeSection === item.id ? "text-accent" : "text-muted-foreground"
                    )} />
                    <div className="flex-1">
                      <div className={cn(
                        "font-medium text-sm",
                        activeSection === item.id ? "text-foreground" : "text-foreground/80"
                      )}>
                        {item.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="flex-1"></div>

        <div className="p-4 border-t border-border/50 bg-gradient-to-b from-card/30 to-card/60">
          {/* Compact AI Model Selector */}
          <div className="mb-3">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as 'gemini' | 'groq')}
              className="w-full text-xs bg-card border border-accent/30 rounded-xl px-3 py-2.5 text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 font-medium appearance-none cursor-pointer hover:bg-card/80"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option value="gemini" className="bg-card text-foreground">✨ Gemini 1.5 Pro</option>
              <option value="groq" className="bg-card text-foreground">⚡ Groq Llama 3.1</option>
            </select>
          </div>
          
          {/* Compact Controls Row */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent/10 hover:bg-accent/20 transition-all duration-200 group"
            >
              {theme === 'light' ?
                <Moon size={14} className="text-accent group-hover:rotate-12 transition-transform" /> :
                <Sun size={14} className="text-accent group-hover:rotate-12 transition-transform" />
              }
              <span className="text-xs font-medium text-foreground">
                {theme === 'light' ? 'Dark' : 'Light'}
              </span>
            </button>
            
            {/* Quick Stats */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
          
          {/* Stylish Developer Credit */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 rounded-lg blur-sm"></div>
            <div className="relative bg-card/80 backdrop-blur-sm rounded-lg p-2 border border-accent/20">
              <div className="flex items-center justify-center gap-1.5 text-xs">
                <span className="text-muted-foreground/80">Made with</span>
                <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" />
                <span className="text-muted-foreground/80">by</span>
                <span className="font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  IMON DAS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden h-screen">
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 pt-20 lg:pt-6 h-full">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}