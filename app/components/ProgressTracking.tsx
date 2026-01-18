'use client'

import { useState } from 'react'
import { Trophy, TrendingUp, Calendar, Target, Star, Award, Clock, CheckCircle, BarChart3, Activity, Zap, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProgressData {
  overallProgress: number
  weeklyGoal: number
  weeklyCompleted: number
  streak: number
  totalSessions: number
  skillLevels: {
    name: string
    current: number
    target: number
    improvement: number
  }[]
  recentAchievements: {
    title: string
    description: string
    date: string
    type: 'interview' | 'coding' | 'resume' | 'milestone'
  }[]
  weeklyActivity: {
    day: string
    interviews: number
    coding: number
    resume: number
  }[]
  upcomingGoals: {
    title: string
    deadline: string
    progress: number
    priority: 'high' | 'medium' | 'low'
  }[]
}

const mockProgressData: ProgressData = {
  overallProgress: 68,
  weeklyGoal: 10,
  weeklyCompleted: 7,
  streak: 5,
  totalSessions: 42,
  skillLevels: [
    { name: 'Interview Skills', current: 75, target: 90, improvement: 15 },
    { name: 'Coding Proficiency', current: 60, target: 85, improvement: 25 },
    { name: 'Resume Quality', current: 85, target: 95, improvement: 10 },
    { name: 'Technical Knowledge', current: 70, target: 88, improvement: 18 },
    { name: 'Communication', current: 80, target: 92, improvement: 12 }
  ],
  recentAchievements: [
    {
      title: 'Coding Streak Master',
      description: 'Solved coding problems for 5 consecutive days',
      date: '2 hours ago',
      type: 'coding'
    },
    {
      title: 'Interview Ace',
      description: 'Completed 10 behavioral interview sessions',
      date: 'Yesterday',
      type: 'interview'
    },
    {
      title: 'Resume Optimizer',
      description: 'Improved resume score by 20 points',
      date: '2 days ago',
      type: 'resume'
    },
    {
      title: 'Weekly Champion',
      description: 'Exceeded weekly practice goal',
      date: '3 days ago',
      type: 'milestone'
    }
  ],
  weeklyActivity: [
    { day: 'Mon', interviews: 2, coding: 3, resume: 1 },
    { day: 'Tue', interviews: 1, coding: 4, resume: 0 },
    { day: 'Wed', interviews: 3, coding: 2, resume: 1 },
    { day: 'Thu', interviews: 2, coding: 5, resume: 0 },
    { day: 'Fri', interviews: 1, coding: 3, resume: 2 },
    { day: 'Sat', interviews: 0, coding: 2, resume: 1 },
    { day: 'Sun', interviews: 1, coding: 1, resume: 0 }
  ],
  upcomingGoals: [
    { title: 'Complete System Design Course', deadline: '2 weeks', progress: 60, priority: 'high' },
    { title: 'Practice 50 Coding Problems', deadline: '1 month', progress: 40, priority: 'medium' },
    { title: 'Mock Interview with Senior Dev', deadline: '1 week', progress: 20, priority: 'high' },
    { title: 'Update LinkedIn Profile', deadline: '3 days', progress: 80, priority: 'low' }
  ]
}

export default function ProgressTracking() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'all'>('week')
  const [data] = useState<ProgressData>(mockProgressData)

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'interview': return <Trophy size={16} className="text-blue-500" />
      case 'coding': return <Star size={16} className="text-green-500" />
      case 'resume': return <Award size={16} className="text-purple-500" />
      case 'milestone': return <Target size={16} className="text-yellow-500" />
      default: return <CheckCircle size={16} className="text-accent" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500/30 bg-red-500/10'
      case 'medium': return 'border-yellow-500/30 bg-yellow-500/10'
      case 'low': return 'border-green-500/30 bg-green-500/10'
      default: return 'border-border bg-card/50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
          <Trophy size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Progress Tracking</h2>
          <p className="text-muted-foreground">Monitor your improvement journey</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <TrendingUp size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <p className="text-2xl font-bold text-blue-500">{data.overallProgress}%</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl p-6 border border-green-500/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Zap size={20} className="text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold text-green-500">{data.streak} days</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-xl p-6 border border-purple-500/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Activity size={20} className="text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Sessions</p>
              <p className="text-2xl font-bold text-purple-500">{data.totalSessions}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-xl p-6 border border-yellow-500/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Target size={20} className="text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weekly Goal</p>
              <p className="text-2xl font-bold text-yellow-500">{data.weeklyCompleted}/{data.weeklyGoal}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Levels */}
        <div className="bg-card/50 rounded-xl p-6 border border-border/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-accent" />
            Skill Development
          </h3>
          <div className="space-y-4">
            {data.skillLevels.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{skill.current}%</span>
                    <span className="text-xs text-green-500">+{skill.improvement}%</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${skill.current}%` }}
                    ></div>
                  </div>
                  <div 
                    className="absolute top-0 w-1 h-2 bg-accent/50 rounded-full"
                    style={{ left: `${skill.target}%` }}
                    title={`Target: ${skill.target}%`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-card/50 rounded-xl p-6 border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar size={18} className="text-accent" />
              Weekly Activity
            </h3>
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as 'week' | 'month' | 'all')}
              className="text-xs bg-background border border-input rounded px-2 py-1"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
          
          <div className="space-y-3">
            {data.weeklyActivity.map((day, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 text-xs text-muted-foreground">{day.day}</div>
                <div className="flex-1 flex gap-1">
                  <div 
                    className="bg-blue-500 rounded-sm h-4 flex items-center justify-center"
                    style={{ width: `${Math.max(day.interviews * 20, 4)}px` }}
                    title={`${day.interviews} interviews`}
                  >
                    {day.interviews > 0 && <span className="text-xs text-white">{day.interviews}</span>}
                  </div>
                  <div 
                    className="bg-green-500 rounded-sm h-4 flex items-center justify-center"
                    style={{ width: `${Math.max(day.coding * 20, 4)}px` }}
                    title={`${day.coding} coding sessions`}
                  >
                    {day.coding > 0 && <span className="text-xs text-white">{day.coding}</span>}
                  </div>
                  <div 
                    className="bg-purple-500 rounded-sm h-4 flex items-center justify-center"
                    style={{ width: `${Math.max(day.resume * 20, 4)}px` }}
                    title={`${day.resume} resume reviews`}
                  >
                    {day.resume > 0 && <span className="text-xs text-white">{day.resume}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              <span>Interviews</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span>Coding</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
              <span>Resume</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <div className="bg-card/50 rounded-xl p-6 border border-border/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award size={18} className="text-accent" />
            Recent Achievements
          </h3>
          <div className="space-y-3">
            {data.recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center flex-shrink-0">
                  {getAchievementIcon(achievement.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  <p className="text-xs text-accent mt-1">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Goals */}
        <div className="bg-card/50 rounded-xl p-6 border border-border/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpen size={18} className="text-accent" />
            Upcoming Goals
          </h3>
          <div className="space-y-3">
            {data.upcomingGoals.map((goal, index) => (
              <div key={index} className={cn(
                "p-3 rounded-lg border",
                getPriorityColor(goal.priority)
              )}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{goal.title}</h4>
                  <span className="text-xs text-muted-foreground">{goal.deadline}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-accent h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    goal.priority === 'high' ? 'bg-red-500/20 text-red-500' :
                    goal.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-green-500/20 text-green-500'
                  )}>
                    {goal.priority} priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 border border-accent/20">
        <h3 className="text-lg font-semibold mb-4">Recommended Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card/50 rounded-lg p-4 border border-border/50">
            <h4 className="font-medium mb-2">Focus Area</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Your coding skills need the most improvement. Consider dedicating more time to algorithm practice.
            </p>
            <button className="webdev-button text-sm w-full">Start Coding Session</button>
          </div>
          
          <div className="bg-card/50 rounded-lg p-4 border border-border/50">
            <h4 className="font-medium mb-2">Streak Bonus</h4>
            <p className="text-sm text-muted-foreground mb-3">
              You're on a 5-day streak! Complete one more session today to earn a bonus achievement.
            </p>
            <button className="webdev-button text-sm w-full">Continue Streak</button>
          </div>
          
          <div className="bg-card/50 rounded-lg p-4 border border-border/50">
            <h4 className="font-medium mb-2">Weekly Goal</h4>
            <p className="text-sm text-muted-foreground mb-3">
              You're 70% towards your weekly goal. 3 more sessions to complete it!
            </p>
            <button className="webdev-button text-sm w-full">View Schedule</button>
          </div>
        </div>
      </div>
    </div>
  )
}