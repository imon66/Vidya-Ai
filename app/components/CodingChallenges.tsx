'use client'

import { useState } from 'react'
import { Code, Play, CheckCircle, Clock, Trophy, Star, ChevronRight, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Challenge {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  description: string
  examples: Array<{
    input: string
    output: string
    explanation?: string
  }>
  constraints: string[]
  companies: string[]
  solved: boolean
  timeLimit: number // in minutes
}

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Array',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    companies: ['Google', 'Amazon', 'Microsoft'],
    solved: true,
    timeLimit: 15
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\''
    ],
    companies: ['Facebook', 'Google', 'Microsoft'],
    solved: false,
    timeLimit: 20
  },
  {
    id: '3',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    category: 'Linked List',
    description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list.',
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]'
      }
    ],
    constraints: [
      'The number of nodes in both lists is in the range [0, 50]',
      '-100 <= Node.val <= 100',
      'Both list1 and list2 are sorted in non-decreasing order'
    ],
    companies: ['Amazon', 'Apple', 'Adobe'],
    solved: false,
    timeLimit: 25
  },
  {
    id: '4',
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'Medium',
    category: 'Tree',
    description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
    examples: [
      {
        input: 'root = [1,null,2,3]',
        output: '[1,3,2]'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100]',
      '-100 <= Node.val <= 100'
    ],
    companies: ['Microsoft', 'Amazon', 'Google'],
    solved: false,
    timeLimit: 30
  },
  {
    id: '5',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: '[4,-1,2,1] has the largest sum = 6'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    companies: ['Google', 'Amazon', 'Facebook'],
    solved: false,
    timeLimit: 35
  }
]

export default function CodingChallenges() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)

  const difficulties = ['All', 'Easy', 'Medium', 'Hard']
  const categories = ['All', 'Array', 'Stack', 'Linked List', 'Tree', 'Dynamic Programming']

  const filteredChallenges = mockChallenges.filter(challenge => {
    const difficultyMatch = selectedDifficulty === 'All' || challenge.difficulty === selectedDifficulty
    const categoryMatch = selectedCategory === 'All' || challenge.category === selectedCategory
    return difficultyMatch && categoryMatch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-500'
      case 'Medium': return 'text-yellow-500'
      case 'Hard': return 'text-red-500'
      default: return 'text-muted-foreground'
    }
  }

  const getDifficultyBg = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/10 border-green-500/20'
      case 'Medium': return 'bg-yellow-500/10 border-yellow-500/20'
      case 'Hard': return 'bg-red-500/10 border-red-500/20'
      default: return 'bg-muted border-border'
    }
  }

  if (selectedChallenge) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => setSelectedChallenge(null)}
            className="text-accent hover:text-accent/80 transition-colors"
          >
            ← Back to Challenges
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="space-y-6">
            <div className="bg-card/50 rounded-xl p-6 border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-2xl font-bold">{selectedChallenge.title}</h1>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium border",
                  getDifficultyBg(selectedChallenge.difficulty),
                  getDifficultyColor(selectedChallenge.difficulty)
                )}>
                  {selectedChallenge.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Code size={14} />
                  {selectedChallenge.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {selectedChallenge.timeLimit} min
                </span>
                <span className="flex items-center gap-1">
                  <Trophy size={14} />
                  {selectedChallenge.companies.join(', ')}
                </span>
              </div>

              <p className="text-foreground/80 mb-6">{selectedChallenge.description}</p>

              {/* Examples */}
              <div className="space-y-4">
                <h3 className="font-semibold">Examples:</h3>
                {selectedChallenge.examples.map((example, index) => (
                  <div key={index} className="bg-background/50 rounded-lg p-4 border border-border/30">
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Input: </span>
                        <code className="bg-muted px-2 py-1 rounded text-xs">{example.input}</code>
                      </div>
                      <div>
                        <span className="font-medium">Output: </span>
                        <code className="bg-muted px-2 py-1 rounded text-xs">{example.output}</code>
                      </div>
                      {example.explanation && (
                        <div>
                          <span className="font-medium">Explanation: </span>
                          <span className="text-muted-foreground">{example.explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Constraints:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {selectedChallenge.constraints.map((constraint, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <code className="bg-muted px-1 rounded text-xs">{constraint}</code>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="space-y-6">
            <div className="bg-card/50 rounded-xl border border-border/50 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card/30">
                <div className="flex items-center gap-2">
                  <Code size={16} className="text-accent" />
                  <span className="font-medium">Code Editor</span>
                </div>
                <select className="text-xs bg-background border border-input rounded px-2 py-1">
                  <option>JavaScript</option>
                  <option>Python</option>
                  <option>Java</option>
                  <option>C++</option>
                </select>
              </div>
              
              <div className="p-4">
                <textarea
                  className="w-full h-64 bg-background border border-input rounded-lg p-3 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent/50"
                  placeholder="// Write your solution here..."
                  defaultValue={`function twoSum(nums, target) {
    // Your code here
    
}`}
                />
              </div>

              <div className="p-4 border-t border-border/50 bg-card/30">
                <div className="flex gap-3">
                  <button className="webdev-button flex items-center gap-2">
                    <Play size={14} />
                    Run Code
                  </button>
                  <button className="webdev-button flex items-center gap-2 bg-accent text-accent-foreground">
                    <CheckCircle size={14} />
                    Submit
                  </button>
                </div>
              </div>
            </div>

            {/* Test Results */}
            <div className="bg-card/50 rounded-xl p-6 border border-border/50">
              <h3 className="font-semibold mb-4">Test Results</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-sm">Test Case 1: Passed</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-sm">Test Case 2: Passed</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted border border-border/30 rounded-lg">
                  <Clock size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Test Case 3: Not run</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
          <Code size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Coding Challenges</h2>
          <p className="text-muted-foreground">Practice programming problems from top tech companies</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 p-4 bg-card/30 rounded-xl border border-border/50">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Difficulty:</span>
          <select 
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="text-xs bg-background border border-input rounded px-2 py-1"
          >
            {difficulties.map(diff => (
              <option key={diff} value={diff}>{diff}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Category:</span>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs bg-background border border-input rounded px-2 py-1"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card/50 rounded-lg p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-green-500" />
            <span className="text-sm font-medium">Solved</span>
          </div>
          <p className="text-2xl font-bold text-green-500">
            {mockChallenges.filter(c => c.solved).length}
          </p>
        </div>
        <div className="bg-card/50 rounded-lg p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Code size={16} className="text-blue-500" />
            <span className="text-sm font-medium">Total</span>
          </div>
          <p className="text-2xl font-bold text-blue-500">{mockChallenges.length}</p>
        </div>
        <div className="bg-card/50 rounded-lg p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Star size={16} className="text-yellow-500" />
            <span className="text-sm font-medium">Easy</span>
          </div>
          <p className="text-2xl font-bold text-yellow-500">
            {mockChallenges.filter(c => c.difficulty === 'Easy').length}
          </p>
        </div>
        <div className="bg-card/50 rounded-lg p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={16} className="text-accent" />
            <span className="text-sm font-medium">Success Rate</span>
          </div>
          <p className="text-2xl font-bold text-accent">
            {Math.round((mockChallenges.filter(c => c.solved).length / mockChallenges.length) * 100)}%
          </p>
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-3">
        {filteredChallenges.map((challenge) => (
          <div 
            key={challenge.id}
            onClick={() => setSelectedChallenge(challenge)}
            className="bg-card/50 rounded-xl p-4 border border-border/50 hover:border-accent/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-2">
                  {challenge.solved ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold group-hover:text-accent transition-colors">
                      {challenge.title}
                    </h3>
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-medium border",
                      getDifficultyBg(challenge.difficulty),
                      getDifficultyColor(challenge.difficulty)
                    )}>
                      {challenge.difficulty}
                    </span>
                    <span className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                      {challenge.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {challenge.timeLimit} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy size={12} />
                      {challenge.companies.slice(0, 2).join(', ')}
                      {challenge.companies.length > 2 && ` +${challenge.companies.length - 2}`}
                    </span>
                  </div>
                </div>
              </div>
              
              <ChevronRight size={16} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}