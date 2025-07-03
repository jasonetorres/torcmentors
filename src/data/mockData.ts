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

// Mock Resources - cleared for fresh start
export const mockResources: Resource[] = [];

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

// Mock Survey - cleared for fresh start
export const mockSurveys: Survey[] = [];