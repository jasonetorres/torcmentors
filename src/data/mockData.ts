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

// Mock Users and Groups - now managed through authentication system
export const mockUsers: User[] = [];
export const mockGroups: Group[] = [];

// Mock Goals - cleared for fresh start
export const mockGoals: Goal[] = [];

// Mock Tasks - cleared for fresh start
export const mockTasks: Task[] = [];

// Mock Meetings - cleared for fresh start
export const mockMeetings: Meeting[] = [];

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

// Mock mentor kits have been moved to src/data/mentorKits.ts for production use

// Mock Analytics - cleared for fresh start
export const mockAnalytics: Analytics = {
  groupProgress: [],
  menteeEngagement: [],
  phaseCompletion: [],
  goalAchievement: [],
  resourceUsage: []
};

// Mock Notifications - cleared for fresh start
export const mockNotifications: Notification[] = [];

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