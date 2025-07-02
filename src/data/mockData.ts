import { 
  User, 
  Group, 
  Goal, 
  Task, 
  Meeting, 
  Resource, 
  MentorKit, 
  Activity,
  Analytics,
  Survey,
  Notification
} from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jason Torres',
    email: 'jason@torc.dev',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    createdAt: new Date('2025-01-01'),
    lastActive: new Date(),
    onboardingStep: 'completed',
    isOnboardingComplete: true,
    bio: 'Program Coordinator and Community Evangelist',
    skills: ['Leadership', 'Program Management', 'Community Building'],
    experience: '8+ years',
    linkedinUrl: 'https://linkedin.com/in/jasontorres',
    githubUrl: 'https://github.com/jasontorres'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    role: 'mentor',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b5c6e3d8?w=32&h=32&fit=crop&crop=face',
    groupId: 'group-1',
    createdAt: new Date('2025-01-02'),
    lastActive: new Date(),
    onboardingStep: 'completed',
    isOnboardingComplete: true,
    bio: 'Senior Software Engineer with expertise in React and Node.js',
    skills: ['React', 'Node.js', 'TypeScript', 'System Design'],
    experience: '6+ years',
    linkedinUrl: 'https://linkedin.com/in/sarahchen',
    githubUrl: 'https://github.com/sarahchen',
    discordUsername: 'sarah#5678',
    preferredVideoTool: 'Google Meet'
  },
  {
    id: '3',
    name: 'Alex Rivera',
    email: 'alex.rivera@email.com',
    role: 'mentee',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    groupId: 'group-1',
    createdAt: new Date('2025-01-03'),
    lastActive: new Date(),
    onboardingStep: 'tool-setup',
    isOnboardingComplete: false,
    bio: 'Aspiring full-stack developer transitioning from marketing',
    skills: ['HTML', 'CSS', 'JavaScript'],
    experience: '1 year',
    linkedinUrl: 'https://linkedin.com/in/alexrivera',
    githubUrl: 'https://github.com/alexrivera'
  }
];

// Mock Groups
export const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Frontend Focus Group',
    mentorId: '2',
    menteeIds: ['3', '4', '5'],
    currentPhase: 'phase1',
    status: 'active',
    createdAt: new Date('2025-01-02'),
    discordChannel: '#frontend-focus',
    githubRepo: 'torc-mentorship/frontend-focus',
    meetingSchedule: 'Wednesdays 6PM EST',
    nextMeeting: new Date('2025-01-15T18:00:00'),
    completedSessions: 2,
    totalSessions: 12
  }
];

// Mock Goals
export const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    userId: '3',
    title: 'Build a Full-Stack Application',
    description: 'Create a complete web application using React and Node.js',
    category: 'technical',
    priority: 'high',
    status: 'in-progress',
    targetDate: new Date('2025-06-01'),
    createdAt: new Date('2025-01-03'),
    progress: 35,
    milestones: [
      {
        id: 'milestone-1',
        title: 'Complete React fundamentals',
        completed: true,
        completedAt: new Date('2025-01-10')
      },
      {
        id: 'milestone-2',
        title: 'Build first component',
        completed: true,
        completedAt: new Date('2025-01-12')
      },
      {
        id: 'milestone-3',
        title: 'Set up backend API',
        completed: false
      }
    ],
    mentorNotes: 'Great progress on React fundamentals. Ready to move to backend development.'
  }
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Complete Goal Setting Worksheet',
    description: 'Use the provided SMART Goal Guide to define 2-3 development goals',
    assignedTo: '3',
    assignedBy: '2',
    groupId: 'group-1',
    phase: 'phase1',
    category: 'submission',
    status: 'completed',
    priority: 'high',
    dueDate: new Date('2025-01-10'),
    createdAt: new Date('2025-01-03'),
    completedAt: new Date('2025-01-09'),
    estimatedTime: 60
  },
  {
    id: 'task-2',
    title: 'Set up GitHub and Discord',
    description: 'Join the group Discord channel and GitHub repository',
    assignedTo: '3',
    assignedBy: '1',
    groupId: 'group-1',
    phase: 'phase1',
    category: 'preparation',
    status: 'in-progress',
    priority: 'medium',
    dueDate: new Date('2025-01-15'),
    createdAt: new Date('2025-01-05'),
    estimatedTime: 30
  }
];

// Mock Meetings
export const mockMeetings: Meeting[] = [
  {
    id: 'meeting-1',
    groupId: 'group-1',
    title: 'Phase 1: Goal Setting Workshop',
    description: 'SMART goals discussion and action planning',
    scheduledDate: new Date('2025-01-15T18:00:00'),
    duration: 90,
    status: 'scheduled',
    agenda: [
      'Introductions and check-in',
      'Goal sharing session',
      'SMART Goal refinement',
      'Action plan creation',
      'Next steps discussion'
    ],
    attendees: ['2', '3', '4', '5'],
    createdBy: '2',
    phase: 'phase1',
    sessionNumber: 2
  }
];

// Mock Resources
export const mockResources: Resource[] = [
  {
    id: 'resource-1',
    title: 'SMART Goal Setting Guide',
    description: 'A comprehensive guide to setting Specific, Measurable, Achievable, Relevant, and Time-bound goals',
    type: 'document',
    phase: 'phase1',
    category: 'Goal Setting',
    tags: ['goals', 'planning', 'framework'],
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    isPublic: true,
    estimatedReadTime: 15
  },
  {
    id: 'resource-2',
    title: 'Technical Decision Making Case Study',
    description: 'Real-world scenario for practicing technical decision making skills',
    type: 'case-study',
    phase: 'phase3',
    category: 'Problem Solving',
    tags: ['case-study', 'technical', 'decision-making'],
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    isPublic: false,
    estimatedReadTime: 30
  }
];

// Mock Mentor Kits
export const mockMentorKits: MentorKit[] = [
  {
    id: 'kit-phase1',
    phase: 'phase1',
    title: 'Launch & Goal Setting',
    description: 'Establish rapport, introduce program structure, and define mentee goals',
    prepTime: 90,
    objectives: [
      'Build group rapport and establish trust',
      'Introduce program structure and expectations',
      'Guide mentees through SMART goal setting',
      'Create actionable development plans'
    ],
    resources: mockResources.filter(r => r.phase === 'phase1'),
    discussionPoints: [
      'Share personal development journeys',
      'Discuss common challenges in tech careers',
      'Explore individual motivations and aspirations',
      'Review program timeline and milestones'
    ],
    activities: [
      {
        id: 'activity-1',
        title: 'Goal Setting Workshop',
        description: 'Interactive session to define and refine development goals',
        type: 'workshop',
        duration: 45,
        instructions: [
          'Have each mentee share their preliminary goals',
          'Use SMART criteria to evaluate and refine goals',
          'Create action plans with specific next steps',
          'Set accountability measures and check-in schedules'
        ],
        expectedOutcomes: [
          '2-3 well-defined SMART goals per mentee',
          'Clear action plans with next steps',
          'Established accountability framework'
        ]
      }
    ],
    templates: [
      {
        id: 'template-1',
        title: 'Goal Setting Worksheet',
        type: 'template',
        phase: 'phase1',
        category: 'Goal Setting',
        tags: ['template', 'goals', 'worksheet'],
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublic: true
      }
    ],
    nextSteps: [
      'Schedule regular check-ins on goal progress',
      'Share additional resources based on individual goals',
      'Prepare for Phase 2 foundation topics',
      'Encourage peer connections and support'
    ],
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  }
];

// Mock Analytics
export const mockAnalytics: Analytics = {
  groupProgress: [
    {
      groupId: 'group-1',
      groupName: 'Frontend Focus Group',
      mentor: 'Sarah Chen',
      currentPhase: 'phase1',
      completionPercentage: 45,
      activeMentees: 3,
      upcomingDeadlines: 2,
      lastActivity: new Date()
    }
  ],
  menteeEngagement: [
    {
      userId: '3',
      userName: 'Alex Rivera',
      groupId: 'group-1',
      engagementScore: 85,
      goalsCompleted: 1,
      meetingsAttended: 2,
      tasksCompleted: 3,
      lastActive: new Date()
    }
  ],
  phaseCompletion: [
    {
      phase: 'phase1',
      totalGroups: 10,
      completedGroups: 2,
      inProgressGroups: 8,
      averageCompletionTime: 21,
      successRate: 95
    }
  ],
  goalAchievement: [
    {
      category: 'technical',
      totalGoals: 25,
      completedGoals: 8,
      avgCompletionTime: 45,
      successRate: 78
    }
  ],
  resourceUsage: [
    {
      resourceId: 'resource-1',
      resourceTitle: 'SMART Goal Setting Guide',
      viewCount: 45,
      downloadCount: 23,
      avgRating: 4.8,
      lastAccessed: new Date()
    }
  ]
};

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: '3',
    type: 'info',
    title: 'Upcoming Meeting',
    message: 'Goal Setting Workshop scheduled for Wednesday at 6PM EST',
    read: false,
    createdAt: new Date(),
    actionUrl: '/meetings',
    actionLabel: 'View Details'
  },
  {
    id: 'notif-2',
    userId: '3',
    type: 'success',
    title: 'Goal Completed!',
    message: 'Congratulations on completing your React fundamentals milestone',
    read: false,
    createdAt: new Date(),
    actionUrl: '/goals',
    actionLabel: 'View Goals'
  }
];

// Mock Survey
export const mockSurveys: Survey[] = [
  {
    id: 'survey-1',
    title: 'Mid-Program Feedback',
    description: 'Help us improve the mentorship experience',
    phase: 'phase3',
    questions: [
      {
        id: 'q1',
        type: 'rating',
        question: 'How satisfied are you with your mentor?',
        required: true,
        order: 1
      },
      {
        id: 'q2',
        type: 'textarea',
        question: 'What has been most valuable about the program so far?',
        required: true,
        order: 2
      }
    ],
    targetRole: ['mentee'],
    isActive: true,
    responses: [],
    createdAt: new Date(),
    expiresAt: new Date('2025-11-30')
  }
];