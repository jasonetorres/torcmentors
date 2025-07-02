export type UserRole = 'admin' | 'mentor' | 'mentee';

export type ProgramPhase = 'phase1' | 'phase2' | 'phase3' | 'phase4';

export type OnboardingStep = 
  | 'welcome'
  | 'profile-setup' 
  | 'goal-setting'
  | 'tool-setup'
  | 'group-assignment'
  | 'readiness-check'
  | 'completed';

export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'overdue';
export type MeetingStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
export type GroupStatus = 'forming' | 'active' | 'completed';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  createdAt: Date;
  lastActive: Date;
  onboardingStep: OnboardingStep;
  isOnboardingComplete: boolean;
  groupId?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  discordUsername?: string;
  preferredVideoTool?: string;
}

export interface Group {
  id: string;
  name: string;
  mentorId: string;
  menteeIds: string[];
  currentPhase: ProgramPhase;
  status: GroupStatus;
  createdAt: Date;
  discordChannel?: string;
  githubRepo?: string;
  meetingSchedule?: string;
  nextMeeting?: Date;
  completedSessions: number;
  totalSessions: number;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: 'technical' | 'career' | 'personal';
  priority: 'low' | 'medium' | 'high';
  status: TaskStatus;
  targetDate?: Date;
  createdAt: Date;
  progress: number; // 0-100
  milestones: Milestone[];
  mentorNotes?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  completedAt?: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string; // userId
  assignedBy: string; // userId
  groupId?: string;
  phase: ProgramPhase;
  category: 'preparation' | 'activity' | 'followup' | 'submission';
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  completedAt?: Date;
  estimatedTime?: number; // minutes
  resources?: Resource[];
  submissions?: Submission[];
}

export interface Meeting {
  id: string;
  groupId: string;
  title: string;
  description?: string;
  scheduledDate: Date;
  duration: number; // minutes
  status: MeetingStatus;
  agenda?: string[];
  notes?: string;
  attendees: string[]; // userIds
  resources?: Resource[];
  recordingUrl?: string;
  createdBy: string; // userId
  phase: ProgramPhase;
  sessionNumber: number;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  type: 'document' | 'video' | 'link' | 'template' | 'case-study' | 'exercise';
  url?: string;
  content?: string;
  phase: ProgramPhase;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  downloadUrl?: string;
  estimatedReadTime?: number; // minutes
}

export interface MentorKit {
  id: string;
  phase: ProgramPhase;
  title: string;
  description: string;
  prepTime: number; // minutes
  objectives: string[];
  resources: Resource[];
  discussionPoints: string[];
  activities: Activity[];
  templates: Resource[];
  nextSteps: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: 'discussion' | 'exercise' | 'roleplay' | 'case-study' | 'workshop';
  duration: number; // minutes
  materials?: string[];
  instructions: string[];
  expectedOutcomes: string[];
}

export interface Submission {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  fileUrl?: string;
  submittedAt: Date;
  feedback?: string;
  grade?: number;
  reviewedBy?: string;
  reviewedAt?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
  actionLabel?: string;
}

export interface Analytics {
  groupProgress: GroupProgressData[];
  menteeEngagement: EngagementData[];
  phaseCompletion: PhaseCompletionData[];
  goalAchievement: GoalAchievementData[];
  resourceUsage: ResourceUsageData[];
}

export interface GroupProgressData {
  groupId: string;
  groupName: string;
  mentor: string;
  currentPhase: ProgramPhase;
  completionPercentage: number;
  activeMentees: number;
  upcomingDeadlines: number;
  lastActivity: Date;
}

export interface EngagementData {
  userId: string;
  userName: string;
  groupId: string;
  engagementScore: number; // 0-100
  goalsCompleted: number;
  meetingsAttended: number;
  tasksCompleted: number;
  lastActive: Date;
}

export interface PhaseCompletionData {
  phase: ProgramPhase;
  totalGroups: number;
  completedGroups: number;
  inProgressGroups: number;
  averageCompletionTime: number; // days
  successRate: number; // percentage
}

export interface GoalAchievementData {
  category: string;
  totalGoals: number;
  completedGoals: number;
  avgCompletionTime: number; // days
  successRate: number; // percentage
}

export interface ResourceUsageData {
  resourceId: string;
  resourceTitle: string;
  viewCount: number;
  downloadCount: number;
  avgRating: number;
  lastAccessed: Date;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  phase: ProgramPhase;
  questions: SurveyQuestion[];
  targetRole: UserRole[];
  isActive: boolean;
  responses: SurveyResponse[];
  createdAt: Date;
  expiresAt?: Date;
}

export interface SurveyQuestion {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'rating' | 'boolean';
  question: string;
  options?: string[];
  required: boolean;
  order: number;
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  userId: string;
  responses: Record<string, any>;
  submittedAt: Date;
}