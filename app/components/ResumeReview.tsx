'use client'

import { useState } from 'react'
import { FileText, Upload, CheckCircle, AlertCircle, Star, TrendingUp, Eye, Download, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ResumeAnalysis {
  overallScore: number
  sections: {
    name: string
    score: number
    feedback: string
    suggestions: string[]
    status: 'excellent' | 'good' | 'needs-improvement' | 'missing'
  }[]
  keyStrengths: string[]
  criticalIssues: string[]
  industryComparison: {
    percentile: number
    averageScore: number
  }
}

const mockAnalysis: ResumeAnalysis = {
  overallScore: 78,
  sections: [
    {
      name: 'Contact Information',
      score: 95,
      feedback: 'Complete and professional contact details',
      suggestions: ['Consider adding LinkedIn profile URL'],
      status: 'excellent'
    },
    {
      name: 'Professional Summary',
      score: 72,
      feedback: 'Good summary but could be more impactful',
      suggestions: [
        'Add specific achievements with numbers',
        'Include relevant keywords for your target role',
        'Make it more concise (2-3 lines maximum)'
      ],
      status: 'good'
    },
    {
      name: 'Work Experience',
      score: 85,
      feedback: 'Strong experience section with good use of action verbs',
      suggestions: [
        'Quantify more achievements with specific metrics',
        'Add more technical skills mentioned in job descriptions'
      ],
      status: 'excellent'
    },
    {
      name: 'Education',
      score: 90,
      feedback: 'Well-formatted education section',
      suggestions: ['Consider adding relevant coursework or projects'],
      status: 'excellent'
    },
    {
      name: 'Skills',
      score: 65,
      feedback: 'Skills section needs improvement',
      suggestions: [
        'Organize skills by category (Technical, Soft Skills, etc.)',
        'Add proficiency levels',
        'Include more industry-relevant technologies'
      ],
      status: 'needs-improvement'
    },
    {
      name: 'Projects',
      score: 45,
      feedback: 'Projects section is weak and needs significant improvement',
      suggestions: [
        'Add 2-3 relevant projects with descriptions',
        'Include technologies used and outcomes achieved',
        'Provide GitHub links or live demos'
      ],
      status: 'needs-improvement'
    }
  ],
  keyStrengths: [
    'Strong educational background',
    'Good use of action verbs in experience',
    'Clean and professional formatting',
    'Relevant work experience'
  ],
  criticalIssues: [
    'Missing projects section details',
    'Skills section lacks organization',
    'No quantified achievements in summary',
    'Missing technical portfolio links'
  ],
  industryComparison: {
    percentile: 68,
    averageScore: 72
  }
}

export default function ResumeReview() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    setIsAnalyzing(true)
    
    // Simulate analysis
    setTimeout(() => {
      setAnalysis(mockAnalysis)
      setIsAnalyzing(false)
    }, 3000)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/10 border-green-500/20'
    if (score >= 60) return 'bg-yellow-500/10 border-yellow-500/20'
    return 'bg-red-500/10 border-red-500/20'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle size={16} className="text-green-500" />
      case 'good': return <CheckCircle size={16} className="text-blue-500" />
      case 'needs-improvement': return <AlertCircle size={16} className="text-yellow-500" />
      case 'missing': return <AlertCircle size={16} className="text-red-500" />
      default: return null
    }
  }

  if (isAnalyzing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <FileText size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Resume Review</h2>
            <p className="text-muted-foreground">AI-powered analysis in progress...</p>
          </div>
        </div>

        <div className="bg-card/50 rounded-xl p-8 border border-border/50 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center animate-pulse">
            <Sparkles size={24} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Analyzing Your Resume</h3>
          <p className="text-muted-foreground mb-6">Our AI is reviewing your resume for content, formatting, and industry best practices...</p>
          
          <div className="space-y-3 max-w-md mx-auto">
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm">Scanning document structure...</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <span className="text-sm">Analyzing content quality...</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <span className="text-sm">Comparing with industry standards...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (analysis) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <FileText size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Resume Analysis Results</h2>
              <p className="text-muted-foreground">Comprehensive AI-powered review</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setAnalysis(null)
              setUploadedFile(null)
            }}
            className="webdev-button"
          >
            Analyze New Resume
          </button>
        </div>

        {/* Overall Score */}
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-6 border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">Overall Score</h3>
              <p className="text-muted-foreground">Based on industry standards and best practices</p>
            </div>
            <div className="text-right">
              <div className={cn(
                "text-4xl font-bold",
                getScoreColor(analysis.overallScore)
              )}>
                {analysis.overallScore}/100
              </div>
              <div className="text-sm text-muted-foreground">
                {analysis.industryComparison.percentile}th percentile
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card/50 rounded-lg p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-accent" />
                <span className="font-medium">Industry Comparison</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your resume scores higher than {analysis.industryComparison.percentile}% of candidates in your field
              </p>
            </div>
            <div className="bg-card/50 rounded-lg p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Star size={16} className="text-accent" />
                <span className="font-medium">Improvement Potential</span>
              </div>
              <p className="text-sm text-muted-foreground">
                With recommended changes, you could reach the top 15% of candidates
              </p>
            </div>
          </div>
        </div>

        {/* Section Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Section Analysis</h3>
            {analysis.sections.map((section, index) => (
              <div key={index} className="bg-card/50 rounded-xl p-4 border border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(section.status)}
                    <h4 className="font-semibold">{section.name}</h4>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium border",
                    getScoreBg(section.score),
                    getScoreColor(section.score)
                  )}>
                    {section.score}/100
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{section.feedback}</p>
                
                {section.suggestions.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Suggestions:</p>
                    <ul className="space-y-1">
                      {section.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {/* Key Strengths */}
            <div className="bg-card/50 rounded-xl p-6 border border-border/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                Key Strengths
              </h3>
              <ul className="space-y-2">
                {analysis.keyStrengths.map((strength, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* Critical Issues */}
            <div className="bg-card/50 rounded-xl p-6 border border-border/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertCircle size={18} className="text-red-500" />
                Critical Issues
              </h3>
              <ul className="space-y-2">
                {analysis.criticalIssues.map((issue, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-red-500 mt-1">!</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Items */}
            <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-6 border border-accent/20">
              <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
              <div className="space-y-3">
                <button className="webdev-button w-full flex items-center justify-center gap-2">
                  <Download size={16} />
                  Download Detailed Report
                </button>
                <button className="webdev-button w-full flex items-center justify-center gap-2">
                  <Eye size={16} />
                  View Resume Templates
                </button>
                <button className="webdev-button w-full flex items-center justify-center gap-2">
                  <Sparkles size={16} />
                  Get AI Writing Help
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
          <FileText size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Resume Review</h2>
          <p className="text-muted-foreground">Get AI-powered feedback to improve your resume</p>
        </div>
      </div>

      {/* Upload Area */}
      <div 
        className={cn(
          "border-2 border-dashed rounded-2xl p-12 text-center transition-all",
          dragActive 
            ? "border-accent bg-accent/5" 
            : "border-border hover:border-accent/50 hover:bg-accent/5"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
          <Upload size={24} className="text-white" />
        </div>
        
        <h3 className="text-xl font-semibold mb-2">Upload Your Resume</h3>
        <p className="text-muted-foreground mb-6">
          Drag and drop your resume here, or click to browse
        </p>
        
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileUpload(e.target.files[0])
            }
          }}
          className="hidden"
          id="resume-upload"
        />
        
        <label htmlFor="resume-upload" className="webdev-button inline-flex items-center gap-2 cursor-pointer">
          <Upload size={16} />
          Choose File
        </label>
        
        <p className="text-xs text-muted-foreground mt-4">
          Supported formats: PDF, DOC, DOCX (Max 5MB)
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card/50 rounded-xl p-6 border border-border/50">
          <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
            <Eye size={24} className="text-blue-500" />
          </div>
          <h3 className="font-semibold mb-2">ATS Optimization</h3>
          <p className="text-sm text-muted-foreground">
            Ensure your resume passes Applicant Tracking Systems used by top companies
          </p>
        </div>

        <div className="bg-card/50 rounded-xl p-6 border border-border/50">
          <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
            <TrendingUp size={24} className="text-green-500" />
          </div>
          <h3 className="font-semibold mb-2">Industry Benchmarking</h3>
          <p className="text-sm text-muted-foreground">
            Compare your resume against industry standards and successful candidates
          </p>
        </div>

        <div className="bg-card/50 rounded-xl p-6 border border-border/50">
          <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
            <Sparkles size={24} className="text-purple-500" />
          </div>
          <h3 className="font-semibold mb-2">AI-Powered Insights</h3>
          <p className="text-sm text-muted-foreground">
            Get personalized recommendations based on your target role and experience
          </p>
        </div>
      </div>
    </div>
  )
}