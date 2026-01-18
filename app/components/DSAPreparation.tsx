
'use client'

import { useState } from 'react'
import { Code, Play, CheckCircle, Clock, Trophy, Star, ChevronRight, Filter, BookOpen, Target, Zap, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DSAProblem {
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
  timeComplexity: string
  spaceComplexity: string
  hints: string[]
  starterCode: {
    javascript: string
    python: string
    java: string
    cpp: string
  }
}

const dsaProblems: DSAProblem[] = [
  // EASY PROBLEMS (10)
  {
    id: 'easy-1',
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
      'Only one valid answer exists.'
    ],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: ['Use a hash map to store numbers and their indices', 'For each number, check if target - number exists in the map'],
    starterCode: {
      javascript: `function twoSum(nums, target) {
    // Your code here
    
}`,
      python: `def two_sum(nums, target):
    # Your code here
    pass`,
      java: `public int[] twoSum(int[] nums, int target) {
    // Your code here
    
}`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
    
}`
    }
  },
  {
    id: 'easy-2',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\''
    ],
    companies: ['Facebook', 'Google', 'Microsoft'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: ['Use a stack to keep track of opening brackets'],
    starterCode: {
      javascript: `function isValid(s) {
    // Your code here
    
}`,
      python: `def is_valid(s):
    # Your code here
    pass`,
      java: `public boolean isValid(String s) {
    // Your code here
    
}`,
      cpp: `bool isValid(string s) {
    // Your code here
    
}`
    }
  },
  {
    id: 'easy-3',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    category: 'Linked List',
    description: 'Merge two sorted linked lists and return it as a sorted list.',
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]'
      }
    ],
    constraints: [
      'The number of nodes in both lists is in the range [0, 50]',
      '-100 <= Node.val <= 100'
    ],
    companies: ['Amazon', 'Apple', 'Adobe'],
    solved: false,
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(1)',
    hints: ['Use two pointers to traverse both lists'],
    starterCode: {
      javascript: `function mergeTwoLists(list1, list2) {
    // Your code here
    
}`,
      python: `def merge_two_lists(list1, list2):
    # Your code here
    pass`,
      java: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    // Your code here
    
}`,
      cpp: `ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    // Your code here
    
}`
    }
  },
  {
    id: 'easy-4',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Array',
    description: 'Find the maximum profit from buying and selling stock once.',
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5'
      }
    ],
    constraints: [
      '1 <= prices.length <= 10^5'
    ],
    companies: ['Amazon', 'Google', 'Facebook'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: ['Keep track of minimum price seen so far'],
    starterCode: {
      javascript: `function maxProfit(prices) {
    // Your code here
    
}`,
      python: `def max_profit(prices):
    # Your code here
    pass`,
      java: `public int maxProfit(int[] prices) {
    // Your code here
    
}`,
      cpp: `int maxProfit(vector<int>& prices) {
    // Your code here
    
}`
    }
  },
  {
    id: 'easy-5',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    category: 'String',
    description: 'Check if a string is a palindrome, considering only alphanumeric characters.',
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true'
      }
    ],
    constraints: [
      '1 <= s.length <= 2 * 10^5'
    ],
    companies: ['Microsoft', 'Facebook', 'Amazon'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: ['Use two pointers from start and end'],
    starterCode: {
      javascript: `function isPalindrome(s) {
    // Your code here
    
}`,
      python: `def is_palindrome(s):
    # Your code here
    pass`,
      java: `public boolean isPalindrome(String s) {
    // Your code here
    
}`,
      cpp: `bool isPalindrome(string s) {
    // Your code here
    
}`
    }
  },
  {
    id: 'easy-6',
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    category: 'Tree',
    description: 'Invert a binary tree.',
    examples: [
      {
        input: 'root = [4,2,7,1,3,6,9]',
        output: '[4,7,2,9,6,3,1]'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100]'
    ],
    companies: ['Google', 'Amazon', 'Microsoft'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    hints: ['Recursively swap left and right children'],
    starterCode: {
      javascript: `function invertTree(root) {
    // Your code here
    
}`,
      python: `def invert_tree(root):
    # Your code here
    pass`,
      java: `public TreeNode invertTree(TreeNode root) {
    // Your code here
    
}`,
      cpp: `TreeNode* invertTree(TreeNode* root) {
    // Your code here
    
}`
    }
  },
  {
    id: 'easy-7',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    category: 'Array',
    description: 'Check if array contains any duplicates.',
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: 'true'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5'
    ],
    companies: ['Amazon', 'Google', 'Apple'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: ['Use a hash set to track seen elements'],
    starterCode: {
      javascript: `function containsDuplicate(nums) {
    // Your code here
    
}`,
      python: `def contains_duplicate(nums):
    # Your code here
    pass`,
      java: `public boolean containsDuplicate(int[] nums) {
    // Your code here
    
}`,
      cpp: `bool containsDuplicate(vector<int>& nums) {
    // Your code here
    
}`
    }
  },
  {
    id: 'easy-8',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    category: 'Tree',
    description: 'Find the maximum depth of a binary tree.',
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '3'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 10^4]'
    ],
    companies: ['Amazon', 'Microsoft', 'Google'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    hints: ['Use recursion to find depth of subtrees'],
    starterCode: {
      javascript: `function maxDepth(root) {
    // Your code here
    
}`,
      python: `def max_depth(root):
    # Your code here
    pass`,
      java: `public int maxDepth(TreeNode root) {
    // Your code here
    
}`,
      cpp: `int maxDepth(TreeNode* root) {
    // Your code here
    
}`
    }
  },
  {
    id: 'easy-9',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    category: 'Linked List',
    description: 'Reverse a singly linked list.',
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]'
      }
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000]'
    ],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: ['Use three pointers: prev, current, next'],
    starterCode: {
      javascript: `function reverseList(head) {
    // Your code here
    
}`,
      python: `def reverse_list(head):
    # Your code here
    pass`,
      java: `public ListNode reverseList(ListNode head) {
    // Your code here
    
}`,
      cpp: `ListNode* reverseList(ListNode* head) {
    // Your code here
    
}`
    }
  },
  {
    id: 'easy-10',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    description: 'Count distinct ways to climb n stairs (1 or 2 steps at a time).',
    examples: [
      {
        input: 'n = 3',
        output: '3'
      }
    ],
    constraints: [
      '1 <= n <= 45'
    ],
    companies: ['Amazon', 'Google', 'Adobe'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: ['This is a Fibonacci sequence problem'],
    starterCode: {
      javascript: `function climbStairs(n) {
    // Your code here
    
}`,
      python: `def climb_stairs(n):
    # Your code here
    pass`,
      java: `public int climbStairs(int n) {
    // Your code here
    
}`,
      cpp: `int climbStairs(int n) {
    // Your code here
    
}`
    }
  },

  // MEDIUM PROBLEMS (10)
  {
    id: 'medium-1',
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    category: 'Linked List',
    description: 'Add two numbers represented as linked lists.',
    examples: [
      {
        input: 'l1 = [2,4,3], l2 = [5,6,4]',
        output: '[7,0,8]'
      }
    ],
    constraints: [
      'The number of nodes in each linked list is in the range [1, 100]'
    ],
    companies: ['Amazon', 'Microsoft', 'Google'],
    solved: false,
    timeComplexity: 'O(max(m, n))',
    spaceComplexity: 'O(max(m, n))',
    hints: ['Handle carry properly'],
    starterCode: {
      javascript: `function addTwoNumbers(l1, l2) {
    // Your code here
    
}`,
      python: `def add_two_numbers(l1, l2):
    # Your code here
    pass`,
      java: `public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    // Your code here
    
}`,
      cpp: `ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    // Your code here
    
}`
    }
  },
  {
    id: 'medium-2',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'String',
    description: 'Find length of longest substring without repeating characters.',
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3'
      }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4'
    ],
    companies: ['Amazon', 'Google', 'Facebook'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(m, n))',
    hints: ['Use sliding window technique'],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
    // Your code here
    
}`,
      python: `def length_of_longest_substring(s):
    # Your code here
    pass`,
      java: `public int lengthOfLongestSubstring(String s) {
    // Your code here
    
}`,
      cpp: `int lengthOfLongestSubstring(string s) {
    // Your code here
    
}`
    }
  },
  {
    id: 'medium-3',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    category: 'Array',
    description: 'Find two lines that form container with most water.',
    examples: [
      {
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        output: '49'
      }
    ],
    constraints: [
      'n >= 2'
    ],
    companies: ['Amazon', 'Google', 'Facebook'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: ['Use two pointers approach'],
    starterCode: {
      javascript: `function maxArea(height) {
    // Your code here
    
}`,
      python: `def max_area(height):
    # Your code here
    pass`,
      java: `public int maxArea(int[] height) {
    // Your code here
    
}`,
      cpp: `int maxArea(vector<int>& height) {
    // Your code here
    
}`
    }
  },
  {
    id: 'medium-4',
    title: '3Sum',
    difficulty: 'Medium',
    category: 'Array',
    description: 'Find all unique triplets that sum to zero.',
    examples: [
      {
        input: 'nums = [-1,0,1,2,-1,-4]',
        output: '[[-1,-1,2],[-1,0,1]]'
      }
    ],
    constraints: [
      '3 <= nums.length <= 3000'
    ],
    companies: ['Amazon', 'Google', 'Facebook'],
    solved: false,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    hints: ['Sort the array first'],
    starterCode: {
      javascript: `function threeSum(nums) {
    // Your code here
    
}`,
      python: `def three_sum(nums):
    # Your code here
    pass`,
      java: `public List<List<Integer>> threeSum(int[] nums) {
    // Your code here
    
}`,
      cpp: `vector<vector<int>> threeSum(vector<int>& nums) {
    // Your code here
    
}`
    }
  },
  {
    id: 'medium-5',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    category: 'String',
    description: 'Group anagrams together.',
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]'
      }
    ],
    constraints: [
      '1 <= strs.length <= 10^4'
    ],
    companies: ['Amazon', 'Google', 'Facebook'],
    solved: false,
    timeComplexity: 'O(n * k log k)',
    spaceComplexity: 'O(n * k)',
    hints: ['Sort each string to use as a key'],
    starterCode: {
      javascript: `function groupAnagrams(strs) {
    // Your code here
    
}`,
      python: `def group_anagrams(strs):
    # Your code here
    pass`,
      java: `public List<List<String>> groupAnagrams(String[] strs) {
    // Your code here
    
}`,
      cpp: `vector<vector<string>> groupAnagrams(vector<string>& strs) {
    // Your code here
    
}`
    }
  },
  {
    id: 'medium-6',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: 'Find contiguous subarray with largest sum.',
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5'
    ],
    companies: ['Amazon', 'Google', 'Facebook'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: ['Use Kadane\'s algorithm'],
    starterCode: {
      javascript: `function maxSubArray(nums) {
    // Your code here
    
}`,
      python: `def max_sub_array(nums):
    # Your code here
    pass`,
      java: `public int maxSubArray(int[] nums) {
    // Your code here
    
}`,
      cpp: `int maxSubArray(vector<int>& nums) {
    // Your code here
    
}`
    }
  },
  {
    id: 'medium-7',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    category: 'Array',
    description: 'Return array where each element is product of all others.',
    examples: [
      {
        input: 'nums = [1,2,3,4]',
        output: '[24,12,8,6]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^5'
    ],
    companies: ['Amazon', 'Google', 'Facebook'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: ['Calculate left and right products separately'],
    starterCode: {
      javascript: `function productExceptSelf(nums) {
    // Your code here
    
}`,
      python: `def product_except_self(nums):
    # Your code here
    pass`,
      java: `public int[] productExceptSelf(int[] nums) {
    // Your code here
    
}`,
      cpp: `vector<int> productExceptSelf(vector<int>& nums) {
    // Your code here
    
}`
    }
  },
  {
    id: 'medium-8',
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    category: 'Tree',
    description: 'Determine if binary tree is a valid BST.',
    examples: [
      {
        input: 'root = [2,1,3]',
        output: 'true'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 10^4]'
    ],
    companies: ['Amazon', 'Google', 'Microsoft'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    hints: ['Use inorder traversal - should be sorted'],
    starterCode: {
      javascript: `function isValidBST(root) {
    // Your code here
    
}`,
      python: `def is_valid_bst(root):
    # Your code here
    pass`,
      java: `public boolean isValidBST(TreeNode root) {
    // Your code here
    
}`,
      cpp: `bool isValidBST(TreeNode* root) {
    // Your code here
    
}`
    }
  },
  {
    id: 'medium-9',
    title: 'Kth Largest Element in Array',
    difficulty: 'Medium',
    category: 'Array',
    description: 'Find the kth largest element in array.',
    examples: [
      {
        input: 'nums = [3,2,1,5,6,4], k = 2',
        output: '5'
      }
    ],
    constraints: [
      '1 <= k <= nums.length <= 10^5'
    ],
    companies: ['Amazon', 'Google', 'Facebook'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: ['Use quickselect algorithm'],
    starterCode: {
      javascript: `function findKthLargest(nums, k) {
    // Your code here
    
}`,
      python: `def find_kth_largest(nums, k):
    # Your code here
    pass`,
      java: `public int findKthLargest(int[] nums, int k) {
    // Your code here
    
}`,
      cpp: `int findKthLargest(vector<int>& nums, int k) {
    // Your code here
    
}`
    }
  },
  {
    id: 'medium-10',
    title: 'Course Schedule',
    difficulty: 'Medium',
    category: 'Graph',
    description: 'Determine if you can finish all courses given prerequisites.',
    examples: [
      {
        input: 'numCourses = 2, prerequisites = [[1,0]]',
        output: 'true'
      }
    ],
    constraints: [
      '1 <= numCourses <= 2000'
    ],
    companies: ['Amazon', 'Google', 'Facebook'],
    solved: false,
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    hints: ['Detect cycle in directed graph'],
    starterCode: {
      javascript: `function canFinish(numCourses, prerequisites) {
    // Your code here
    
}`,
      python: `def can_finish(num_courses, prerequisites):
    # Your code here
    pass`,
      java: `public boolean canFinish(int numCourses, int[][] prerequisites) {
    // Your code here
    
}`,
      cpp: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    // Your code here
    
}`
    }
  },

  // HARD PROBLEMS (10)
  {
    id: 'hard-1',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    category: 'Array',
    description: 'Find median of two sorted arrays in O(log(m+n)) time.',
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.0'
      }
    ],
    constraints: [
      'nums1.length == m',
      'nums2.length == n'
    ],
    companies: ['Google', 'Amazon', 'Microsoft'],
    solved: false,
    timeComplexity: 'O(log(min(m,n)))',
    spaceComplexity: 'O(1)',
    hints: ['Use binary search on the smaller array'],
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {
    // Your code here
    
}`,
      python: `def find_median_sorted_arrays(nums1, nums2):
    # Your code here
    pass`,
      java: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    // Your code here
    
}`,
      cpp: `double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    // Your code here
    
}`
    }
  },
  {
    id: 'hard-2',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    category: 'Array',
    description: 'Calculate how much water can be trapped after raining.',
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6'
      }
    ],
    constraints: [
      'n == height.length'
    ],
    companies: ['Amazon', 'Google', 'Facebook'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hints: ['Use two pointers approach'],
    starterCode: {
      javascript: `function trap(height) {
    // Your code here
    
}`,
      python: `def trap(height):
    # Your code here
    pass`,
      java: `public int trap(int[] height) {
    // Your code here
    
}`,
      cpp: `int trap(vector<int>& height) {
    // Your code here
    
}`
    }
  },
  {
    id: 'hard-3',
    title: 'Merge k Sorted Lists',
    difficulty: 'Hard',
    category: 'Linked List',
    description: 'Merge k sorted linked lists into one sorted list.',
    examples: [
      {
        input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
        output: '[1,1,2,3,4,4,5,6]'
      }
    ],
    constraints: [
      'k == lists.length'
    ],
    companies: ['Amazon', 'Google', 'Microsoft'],
    solved: false,
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(k)',
    hints: ['Use divide and conquer or priority queue'],
    starterCode: {
      javascript: `function mergeKLists(lists) {
    // Your code here
    
}`,
      python: `def merge_k_lists(lists):
    # Your code here
    pass`,
      java: `public ListNode mergeKLists(ListNode[] lists) {
    // Your code here
    
}`,
      cpp: `ListNode* mergeKLists(vector<ListNode*>& lists) {
    // Your code here
    
}`
    }
  },
  {
    id: 'hard-4',
    title: 'Sliding Window Maximum',
    difficulty: 'Hard',
    category: 'Array',
    description: 'Find maximum in each sliding window of size k.',
    examples: [
      {
        input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
        output: '[3,3,5,5,6,7]'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5'
    ],
    companies: ['Amazon', 'Google', 'Facebook'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k)',
    hints: ['Use deque to maintain window maximum'],
    starterCode: {
      javascript: `function maxSlidingWindow(nums, k) {
    // Your code here
    
}`,
      python: `def max_sliding_window(nums, k):
    # Your code here
    pass`,
      java: `public int[] maxSlidingWindow(int[] nums, int k) {
    // Your code here
    
}`,
      cpp: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    // Your code here
    
}`
    }
  },
  {
    id: 'hard-5',
    title: 'Serialize and Deserialize Binary Tree',
    difficulty: 'Hard',
    category: 'Tree',
    description: 'Design algorithm to serialize and deserialize binary tree.',
    examples: [
      {
        input: 'root = [1,2,3,null,null,4,5]',
        output: '[1,2,3,null,null,4,5]'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 10^4]'
    ],
    companies: ['Amazon', 'Google', 'Microsoft'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: ['Use preorder traversal for serialization'],
    starterCode: {
      javascript: `function serialize(root) {
    // Your code here
    
}

function deserialize(data) {
    // Your code here
    
}`,
      python: `def serialize(root):
    # Your code here
    pass

def deserialize(data):
    # Your code here
    pass`,
      java: `public String serialize(TreeNode root) {
    // Your code here
    
}

public TreeNode deserialize(String data) {
    // Your code here
    
}`,
      cpp: `string serialize(TreeNode* root) {
    // Your code here
    
}

TreeNode* deserialize(string data) {
    // Your code here
    
}`
    }
  },
  {
    id: 'hard-6',
    title: 'Word Ladder',
    difficulty: 'Hard',
    category: 'Graph',
    description: 'Find shortest transformation sequence from beginWord to endWord.',
    examples: [
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: '5'
      }
    ],
    constraints: [
      '1 <= beginWord.length <= 10'
    ],
    companies: ['Amazon', 'Google', 'Facebook'],
    solved: false,
    timeComplexity: 'O(M² × N)',
    spaceComplexity: 'O(M² × N)',
    hints: ['Use BFS to find shortest path'],
    starterCode: {
      javascript: `function ladderLength(beginWord, endWord, wordList) {
    // Your code here
    
}`,
      python: `def ladder_length(begin_word, end_word, word_list):
    # Your code here
    pass`,
      java: `public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    // Your code here
    
}`,
      cpp: `int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
    // Your code here
    
}`
    }
  },
  {
    id: 'hard-7',
    title: 'Longest Valid Parentheses',
    difficulty: 'Hard',
    category: 'String',
    description: 'Find length of longest valid parentheses substring.',
    examples: [
      {
        input: 's = "(()"',
        output: '2'
      }
    ],
    constraints: [
      '0 <= s.length <= 3 * 10^4'
    ],
    companies: ['Amazon', 'Google', 'Microsoft'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: ['Use dynamic programming or stack'],
    starterCode: {
      javascript: `function longestValidParentheses(s) {
    // Your code here
    
}`,
      python: `def longest_valid_parentheses(s):
    # Your code here
    pass`,
      java: `public int longestValidParentheses(String s) {
    // Your code here
    
}`,
      cpp: `int longestValidParentheses(string s) {
    // Your code here
    
}`
    }
  },
  {
    id: 'hard-8',
    title: 'Edit Distance',
    difficulty: 'Hard',
    category: 'Dynamic Programming',
    description: 'Find minimum operations to convert word1 to word2.',
    examples: [
      {
        input: 'word1 = "horse", word2 = "ros"',
        output: '3'
      }
    ],
    constraints: [
      '0 <= word1.length, word2.length <= 500'
    ],
    companies: ['Amazon', 'Google', 'Facebook'],
    solved: false,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n)',
    hints: ['Use 2D DP table'],
    starterCode: {
      javascript: `function minDistance(word1, word2) {
    // Your code here
    
}`,
      python: `def min_distance(word1, word2):
    # Your code here
    pass`,
      java: `public int minDistance(String word1, String word2) {
    // Your code here
    
}`,
      cpp: `int minDistance(string word1, string word2) {
    // Your code here
    
}`
    }
  },
  {
    id: 'hard-9',
    title: 'Largest Rectangle in Histogram',
    difficulty: 'Hard',
    category: 'Stack',
    description: 'Find area of largest rectangle in histogram.',
    examples: [
      {
        input: 'heights = [2,1,5,6,2,3]',
        output: '10'
      }
    ],
    constraints: [
      '1 <= heights.length <= 10^5'
    ],
    companies: ['Amazon', 'Google', 'Microsoft'],
    solved: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints: ['Use stack to find next smaller elements'],
    starterCode: {
      javascript: `function largestRectangleArea(heights) {
    // Your code here
    
}`,
      python: `def largest_rectangle_area(heights):
    # Your code here
    pass`,
      java: `public int largestRectangleArea(int[] heights) {
    // Your code here
    
}`,
      cpp: `int largestRectangleArea(vector<int>& heights) {
    // Your code here
    
}`
    }
  },
  {
    id: 'hard-10',
    title: 'Regular Expression Matching',
    difficulty: 'Hard',
    category: 'Dynamic Programming',
    description: 'Implement regular expression matching with . and *.',
    examples: [
      {
        input: 's = "aa", p = "a*"',
        output: 'true'
      }
    ],
    constraints: [
      '1 <= s.length <= 20'
    ],
    companies: ['Google', 'Amazon', 'Facebook'],
    solved: false,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n)',
    hints: ['Use 2D DP with careful handling of * cases'],
    starterCode: {
      javascript: `function isMatch(s, p) {
    // Your code here
    
}`,
      python: `def is_match(s, p):
    # Your code here
    pass`,
      java: `public boolean isMatch(String s, String p) {
    // Your code here
    
}`,
      cpp: `bool isMatch(string s, string p) {
    // Your code here
    
}`
    }
  }
]

export default function DSAPreparation() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedProblem, setSelectedProblem] = useState<DSAProblem | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'python' | 'java' | 'cpp'>('javascript')
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<Array<{passed: boolean, input: string, expected: string, actual: string}>>([])

  const difficulties = ['All', 'Easy', 'Medium', 'Hard']
  const categories = ['All', 'Array', 'String', 'Linked List', 'Tree', 'Stack', 'Dynamic Programming', 'Graph']
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' }
  ]

  const filteredProblems = dsaProblems.filter(problem => {
    const difficultyMatch = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty
    const categoryMatch = selectedCategory === 'All' || problem.category === selectedCategory
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

  const handleProblemSelect = (problem: DSAProblem) => {
    setSelectedProblem(problem)
    setCode(problem.starterCode[selectedLanguage])
  }

  const handleLanguageChange = (language: 'javascript' | 'python' | 'java' | 'cpp') => {
    setSelectedLanguage(language)
    if (selectedProblem) {
      setCode(selectedProblem.starterCode[language])
    }
  }

  const runCode = async () => {
    if (!selectedProblem || selectedLanguage !== 'javascript') {
      setOutput('Code execution is currently only supported for JavaScript')
      return
    }

    setIsRunning(true)
    setOutput('')
    setTestResults([])

    try {
      // Create a safe execution environment
      const safeCode = `
        ${code}
        
        // Test cases based on problem examples
        const testCases = ${JSON.stringify(selectedProblem.examples.map(ex => ({
          input: ex.input,
          expected: ex.output
        })))};
        
        const results = [];
        
        try {
          ${getTestCode(selectedProblem)}
        } catch (error) {
          results.push({ error: error.message });
        }
        
        results;
      `

      // Execute the code safely
      const func = new Function('return ' + safeCode)
      const results = func()
      
      if (results.some((r: any) => r.error)) {
        setOutput(`Error: ${results.find((r: any) => r.error)?.error}`)
      } else {
        setTestResults(results)
        const passedCount = results.filter((r: any) => r.passed).length
        setOutput(`✅ ${passedCount}/${results.length} test cases passed`)
      }
    } catch (error: any) {
      setOutput(`Error: ${error.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  const getTestCode = (problem: DSAProblem) => {
    // Generate test code based on problem type
    switch (problem.id) {
      case 'easy-1': // Two Sum
        return `
          for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];
            const [nums, target] = eval('[' + testCase.input.split('target = ')[0].replace('nums = ', '') + ', ' + testCase.input.split('target = ')[1] + ']');
            const result = twoSum(nums, target);
            const expected = JSON.parse(testCase.expected);
            const passed = JSON.stringify(result.sort()) === JSON.stringify(expected.sort());
            results.push({
              passed,
              input: testCase.input,
              expected: testCase.expected,
              actual: JSON.stringify(result)
            });
          }
        `
      case 'easy-2': // Valid Parentheses
        return `
          for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];
            const s = testCase.input.match(/"([^"]*)"/)[1];
            const result = isValid(s);
            const expected = testCase.expected === 'true';
            const passed = result === expected;
            results.push({
              passed,
              input: testCase.input,
              expected: testCase.expected,
              actual: String(result)
            });
          }
        `
      case 'easy-4': // Best Time to Buy and Sell Stock
        return `
          for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];
            const prices = JSON.parse(testCase.input.replace('prices = ', ''));
            const result = maxProfit(prices);
            const expected = parseInt(testCase.expected);
            const passed = result === expected;
            results.push({
              passed,
              input: testCase.input,
              expected: testCase.expected,
              actual: String(result)
            });
          }
        `
      case 'easy-7': // Contains Duplicate
        return `
          for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];
            const nums = JSON.parse(testCase.input.replace('nums = ', ''));
            const result = containsDuplicate(nums);
            const expected = testCase.expected === 'true';
            const passed = result === expected;
            results.push({
              passed,
              input: testCase.input,
              expected: testCase.expected,
              actual: String(result)
            });
          }
        `
      case 'easy-10': // Climbing Stairs
        return `
          for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];
            const n = parseInt(testCase.input.replace('n = ', ''));
            const result = climbStairs(n);
            const expected = parseInt(testCase.expected);
            const passed = result === expected;
            results.push({
              passed,
              input: testCase.input,
              expected: testCase.expected,
              actual: String(result)
            });
          }
        `
      default:
        return `
          // Generic test runner
          for (let i = 0; i < testCases.length; i++) {
            results.push({
              passed: false,
              input: testCases[i].input,
              expected: testCases[i].expected,
              actual: "Test runner not implemented for this problem yet"
            });
          }
        `
    }
  }

  const submitCode = () => {
    if (testResults.length === 0) {
      runCode()
      return
    }
    
    const allPassed = testResults.every(result => result.passed)
    if (allPassed) {
      setOutput('🎉 All test cases passed! Solution accepted.')
      // Mark problem as solved
      if (selectedProblem) {
        selectedProblem.solved = true
      }
    } else {
      setOutput('❌ Some test cases failed. Please review your solution.')
    }
  }

  if (selectedProblem) {
    return (
      <div className="flex flex-col h-full space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setSelectedProblem(null)}
            className="text-accent hover:text-accent/80 transition-colors"
          >
            ← Back to DSA Problems
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
          {/* Problem Description */}
          <div className="space-y-6 overflow-y-auto">
            <div className="bg-card/50 rounded-xl p-6 border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-2xl font-bold">{selectedProblem.title}</h1>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium border",
                  getDifficultyBg(selectedProblem.difficulty),
                  getDifficultyColor(selectedProblem.difficulty)
                )}>
                  {selectedProblem.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Code size={14} />
                  {selectedProblem.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {selectedProblem.timeComplexity}
                </span>
                <span className="flex items-center gap-1">
                  <Trophy size={14} />
                  {selectedProblem.companies.slice(0, 2).join(', ')}
                </span>
              </div>

              <p className="text-foreground/80 mb-6">{selectedProblem.description}</p>

              {/* Examples */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold">Examples:</h3>
                {selectedProblem.examples.map((example, index) => (
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
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Constraints:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {selectedProblem.constraints.map((constraint, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <code className="bg-muted px-1 rounded text-xs">{constraint}</code>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hints */}
              <div>
                <h3 className="font-semibold mb-3">Hints:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {selectedProblem.hints.map((hint, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-accent mt-1">💡</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex flex-col space-y-6 min-h-0">
            <div className="bg-card/50 rounded-xl border border-border/50 overflow-hidden flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card/30">
                <div className="flex items-center gap-2">
                  <Code size={16} className="text-accent" />
                  <span className="font-medium">Code Editor</span>
                </div>
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value as any)}
                  className="text-xs bg-background border border-input rounded px-2 py-1"
                >
                  {languages.map(lang => (
                    <option key={lang.value} value={lang.value}>{lang.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1 p-4 min-h-0">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full bg-background border border-input rounded-lg p-3 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent/50 min-h-[300px]"
                  placeholder="// Write your solution here..."
                />
              </div>

              <div className="p-4 border-t border-border/50 bg-card/30">
                <div className="flex gap-3">
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="webdev-button flex items-center gap-2 disabled:opacity-50"
                  >
                    <Play size={14} />
                    {isRunning ? 'Running...' : 'Run Code'}
                  </button>
                  <button
                    onClick={submitCode}
                    className="webdev-button flex items-center gap-2 bg-accent text-accent-foreground"
                  >
                    <CheckCircle size={14} />
                    Submit
                  </button>
                </div>
              </div>
            </div>

            {/* Output & Test Results */}
            <div className="bg-card/50 rounded-xl p-4 border border-border/50">
              <h3 className="font-semibold mb-3">Output</h3>
              {output && (
                <div className="bg-background/50 rounded-lg p-3 border border-border/30 mb-4">
                  <pre className="text-sm whitespace-pre-wrap font-mono">{output}</pre>
                </div>
              )}
              
              {testResults.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Test Results:</h4>
                  {testResults.map((result, index) => (
                    <div key={index} className={cn(
                      "p-2 rounded text-xs border",
                      result.passed
                        ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-300"
                        : "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-300"
                    )}>
                      <div className="flex items-center gap-2 mb-1">
                        {result.passed ? (
                          <CheckCircle size={12} className="text-green-500" />
                        ) : (
                          <X size={12} className="text-red-500" />
                        )}
                        <span className="font-medium">Test Case {index + 1}</span>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div><strong>Input:</strong> {result.input}</div>
                        <div><strong>Expected:</strong> {result.expected}</div>
                        <div><strong>Actual:</strong> {result.actual}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Complexity Info */}
              <div className="mt-4 pt-4 border-t border-border/30">
                <h4 className="font-medium mb-2 text-sm">Complexity Analysis</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-green-500">Time: </span>
                    <code className="bg-muted px-2 py-1 rounded text-xs">{selectedProblem.timeComplexity}</code>
                  </div>
                  <div>
                    <span className="font-medium text-blue-500">Space: </span>
                    <code className="bg-muted px-2 py-1 rounded text-xs">{selectedProblem.spaceComplexity}</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <BookOpen size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">DSA Preparation</h2>
          <p className="text-muted-foreground">Master Data Structures & Algorithms with 30 curated problems</p>
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
            <Target size={16} className="text-green-500" />
            <span className="text-sm font-medium">Easy</span>
          </div>
          <p className="text-2xl font-bold text-green-500">
            {dsaProblems.filter(p => p.difficulty === 'Easy').length}
          </p>
        </div>
        <div className="bg-card/50 rounded-lg p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-yellow-500" />
            <span className="text-sm font-medium">Medium</span>
          </div>
          <p className="text-2xl font-bold text-yellow-500">
            {dsaProblems.filter(p => p.difficulty === 'Medium').length}
          </p>
        </div>
        <div className="bg-card/50 rounded-lg p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={16} className="text-red-500" />
            <span className="text-sm font-medium">Hard</span>
          </div>
          <p className="text-2xl font-bold text-red-500">
            {dsaProblems.filter(p => p.difficulty === 'Hard').length}
          </p>
        </div>
        <div className="bg-card/50 rounded-lg p-4 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-accent" />
            <span className="text-sm font-medium">Solved</span>
          </div>
          <p className="text-2xl font-bold text-accent">
            {dsaProblems.filter(p => p.solved).length}
          </p>
        </div>
      </div>

      {/* Problems List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredProblems.map((problem) => (
          <div
            key={problem.id}
            onClick={() => handleProblemSelect(problem)}
            className="bg-card/50 rounded-xl p-4 border border-border/50 hover:border-accent/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-2">
                  {problem.solved ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold group-hover:text-accent transition-colors">
                      {problem.title}
                    </h3>
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-medium border",
                      getDifficultyBg(problem.difficulty),
                      getDifficultyColor(problem.difficulty)
                    )}>
                      {problem.difficulty}
                    </span>
                    <span className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                      {problem.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {problem.timeComplexity}
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy size={12} />
                      {problem.companies.slice(0, 2).join(', ')}
                      {problem.companies.length > 2 && ` +${problem.companies.length - 2}`}
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