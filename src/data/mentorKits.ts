import { MentorKit, Activity, Resource } from '@/types';

// Phase 1: Launch & Goal Setting (July)
const phase1Resources: Resource[] = [
  {
    id: 'smart-goals-guide',
    title: 'SMART Goals Framework Guide',
    type: 'document',
    description: 'Comprehensive guide to setting Specific, Measurable, Achievable, Relevant, Time-bound goals',
    phase: 'phase1',
    category: 'Goal Setting',
    tags: ['goals', 'framework', 'planning'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    estimatedReadTime: 15
  },
  {
    id: 'goal-worksheet',
    title: 'Goal Setting Worksheet',
    type: 'template',
    description: 'Interactive worksheet for mentees to draft and refine their development goals',
    phase: 'phase1',
    category: 'Template',
    tags: ['worksheet', 'goals', 'template'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    estimatedReadTime: 30
  },
  {
    id: 'program-terms',
    title: 'Torc Mentorship Program Terms & Code of Conduct',
    type: 'document',
    description: 'Official program guidelines, expectations, and behavioral standards',
    phase: 'phase1',
    category: 'Program Guidelines',
    tags: ['terms', 'conduct', 'guidelines'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    estimatedReadTime: 10
  }
];

const phase1Activities: Activity[] = [
  {
    id: 'kickoff-meeting',
    title: 'Program Kick-off & First Group Meeting',
    description: 'Initial group meeting to establish rapport and introduce program structure',
    type: 'workshop',
    duration: 90,
    instructions: [
      'Facilitate introductions using structured format',
      'Walk through Discord channel, GitHub repo, and video conferencing setup',
      'Review Torc Mentorship Program Terms and Code of Conduct',
      'Discuss and agree on group meeting schedule',
      'Assign Goal Setting Worksheet for completion'
    ],
    expectedOutcomes: [
      'Group rapport established',
      'Technical tools configured and tested',
      'Meeting schedule confirmed',
      'Clear understanding of program expectations'
    ]
  },
  {
    id: 'goal-setting-workshop',
    title: 'Goal Setting Workshop',
    description: 'Structured session to define and refine mentee development goals',
    type: 'workshop',
    duration: 75,
    instructions: [
      'Have each mentee present their preliminary goals (5 minutes each)',
      'Apply SMART criteria to evaluate each goal collaboratively',
      'Use provided templates to create action plans',
      'Establish accountability measures and check-in schedules',
      'Document final goals in shared GitHub repository'
    ],
    expectedOutcomes: [
      '2-3 well-defined SMART goals per mentee',
      'Detailed action plans with specific next steps',
      'Accountability framework established',
      'Goals documented and trackable'
    ]
  }
];

// Phase 2: Foundation & Exploration (August - September)
const phase2Resources: Resource[] = [
  {
    id: 'technical-case-study',
    title: 'Technical Problem-Solving Case Study',
    type: 'case-study',
    description: 'Real-world technical challenge with solution guide for group discussion',
    phase: 'phase2',
    category: 'Technical Skills',
    tags: ['case-study', 'problem-solving', 'technical'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    estimatedReadTime: 25
  },
  {
    id: 'communication-guide',
    title: 'Effective Communication & Feedback in Tech',
    type: 'document',
    description: 'Slide deck outline and discussion points for tech communication skills',
    phase: 'phase2',
    category: 'Communication',
    tags: ['communication', 'feedback', 'soft-skills'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    estimatedReadTime: 20
  },
  {
    id: 'career-path-reflector',
    title: 'Career Path Reflector Worksheet',
    type: 'template',
    description: 'Structured worksheet for exploring and planning career trajectories',
    phase: 'phase2',
    category: 'Career Development',
    tags: ['career', 'planning', 'worksheet'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    estimatedReadTime: 30
  },
  {
    id: 'github-projects-guide',
    title: 'GitHub Projects for Productivity Guide',
    type: 'document',
    description: 'How to use GitHub Projects board for sprint-like task management',
    phase: 'phase2',
    category: 'Productivity Tools',
    tags: ['github', 'productivity', 'agile'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    estimatedReadTime: 15
  }
];

const phase2Activities: Activity[] = [
  {
    id: 'strengths-roadblocks',
    title: 'Developing Strengths & Overcoming Roadblocks',
    description: 'Technical case study discussion and goal progress review',
    type: 'case-study',
    duration: 75,
    instructions: [
      'Present the technical case study from Mentor Kit',
      'Facilitate group discussion using provided talking points',
      'Guide group through solution analysis',
      'Have each mentee report on goal progress',
      'Identify common roadblocks and brainstorm solutions'
    ],
    expectedOutcomes: [
      'Enhanced problem-solving approach',
      'Progress accountability established',
      'Common challenges identified and addressed'
    ]
  },
  {
    id: 'communication-feedback',
    title: 'Effective Communication & Feedback Workshop',
    description: 'Interactive session on communication skills with role-playing',
    type: 'roleplay',
    duration: 75,
    instructions: [
      'Lead discussion based on slide deck outline',
      'Facilitate role-playing scenarios from Mentor Kit',
      'Practice giving and receiving constructive feedback',
      'Share personal examples of communication challenges'
    ],
    expectedOutcomes: [
      'Improved communication confidence',
      'Practical feedback skills developed',
      'Understanding of professional communication norms'
    ]
  },
  {
    id: 'career-paths',
    title: 'Navigating Career Paths & Opportunities',
    description: 'Career journey sharing and path exploration session',
    type: 'discussion',
    duration: 75,
    instructions: [
      'Share your career journey using Mentor Kit prompts',
      'Facilitate discussion on different career paths in tech',
      'Invite optional guest speaker (coordinate with Jason)',
      'Guide mentees through Career Path Reflector worksheet'
    ],
    expectedOutcomes: [
      'Broader understanding of career possibilities',
      'Clearer individual career direction',
      'Network expansion through guest speakers'
    ]
  },
  {
    id: 'productivity-agile',
    title: 'Productivity & Agile Practices',
    description: 'Time management and agile methodology discussion with GitHub Projects setup',
    type: 'workshop',
    duration: 75,
    instructions: [
      'Lead discussion on time management using talking points',
      'Introduce Agile principles and their application',
      'Set up GitHub Projects board for group task management',
      'Practice sprint planning with personal goals'
    ],
    expectedOutcomes: [
      'Improved personal productivity systems',
      'Understanding of Agile methodologies',
      'Functional group project management setup'
    ]
  }
];

// Phase 3: Deep Dive & Mid-Program Review (October - November)
const phase3Resources: Resource[] = [
  {
    id: 'system-design-challenge',
    title: 'Advanced System Design Challenge',
    type: 'case-study',
    description: 'Complex technical challenge with anonymized real-world scenario and solution guide',
    phase: 'phase3',
    category: 'System Design',
    tags: ['system-design', 'architecture', 'advanced'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    estimatedReadTime: 45
  },
  {
    id: 'networking-strategies',
    title: 'Professional Networking & Online Presence Guide',
    type: 'document',
    description: 'Comprehensive guide to building professional networks and personal brand',
    phase: 'phase3',
    category: 'Professional Development',
    tags: ['networking', 'personal-brand', 'online-presence'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    estimatedReadTime: 30
  },
  {
    id: 'profile-checklist',
    title: 'Technical Profile Checklist',
    type: 'template',
    description: 'Comprehensive checklist for optimizing LinkedIn and GitHub profiles',
    phase: 'phase3',
    category: 'Professional Tools',
    tags: ['linkedin', 'github', 'profile', 'checklist'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    estimatedReadTime: 20
  }
];

const phase3Activities: Activity[] = [
  {
    id: 'advanced-problem-solving',
    title: 'Advanced Problem-Solving & Technical Decision Making',
    description: 'Whiteboarding session with complex technical challenge',
    type: 'case-study',
    duration: 90,
    instructions: [
      'Present the system design challenge from Mentor Kit',
      'Facilitate whiteboarding session for group solution',
      'Use solution guide to steer conversation and highlight key concepts',
      'Encourage different approaches and trade-off discussions',
      'Debrief on decision-making processes used'
    ],
    expectedOutcomes: [
      'Enhanced system thinking skills',
      'Improved technical communication',
      'Understanding of architectural trade-offs'
    ]
  },
  {
    id: 'networking-presence',
    title: 'Building Professional Network & Online Presence',
    description: 'Profile review session and networking strategy development',
    type: 'workshop',
    duration: 75,
    instructions: [
      'Discuss networking strategies using provided materials',
      'Facilitate peer review of LinkedIn/GitHub profiles',
      'Use Technical Profile Checklist as review guide',
      'Practice elevator pitches and professional introductions',
      'Create action plans for profile improvements'
    ],
    expectedOutcomes: [
      'Optimized professional profiles',
      'Confidence in networking situations',
      'Actionable networking strategy'
    ]
  },
  {
    id: 'mid-program-review',
    title: 'Mid-Program Review & Open Q&A',
    description: 'Progress assessment and program feedback session',
    type: 'discussion',
    duration: 75,
    instructions: [
      'Review mid-program survey results (sent by Jason)',
      'Facilitate open forum discussion on progress and challenges',
      'Guide goal review and adjustment process',
      'Address any program concerns or suggestions',
      'Prepare for mentor check-in with Jason'
    ],
    expectedOutcomes: [
      'Clear assessment of program effectiveness',
      'Adjusted goals and expectations',
      'Improved mentor-mentee alignment'
    ]
  }
];

// Phase 4: Reflection & Future Planning (December)
const phase4Resources: Resource[] = [
  {
    id: 'reflection-framework',
    title: 'Structured Reflection Framework',
    type: 'template',
    description: 'Format for mentees to share key takeaways and lessons learned',
    phase: 'phase4',
    category: 'Reflection',
    tags: ['reflection', 'lessons', 'framework'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    estimatedReadTime: 15
  },
  {
    id: 'continuous-development-plan',
    title: 'Continuous Development Plan Template',
    type: 'template',
    description: 'Template for creating ongoing professional development strategy',
    phase: 'phase4',
    category: 'Career Planning',
    tags: ['development', 'planning', 'future'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    estimatedReadTime: 25
  }
];

const phase4Activities: Activity[] = [
  {
    id: 'celebration-reflection',
    title: 'Celebrating Progress & Lessons Learned',
    description: 'Final reflection session and future planning workshop',
    type: 'workshop',
    duration: 90,
    instructions: [
      'Have each mentee share key takeaways using structured format',
      'Share your observations on group growth and individual progress',
      'Celebrate achievements and milestones reached',
      'Discuss how to sustain momentum using Continuous Development Plan',
      'Plan for ongoing peer connections and accountability'
    ],
    expectedOutcomes: [
      'Clear sense of achievement and progress',
      'Structured plan for continued development',
      'Strong peer network for ongoing support'
    ]
  }
];

// Complete Mentor Kits
export const mentorKits: MentorKit[] = [
  {
    id: 'phase1-kit',
    phase: 'phase1',
    title: 'Phase 1: Launch & Goal Setting',
    description: 'Establish rapport, introduce program structure and tools, and define mentee goals using provided frameworks.',
    prepTime: 60,
    objectives: [
      'Build group rapport and establish trust',
      'Successfully onboard all technical tools (Discord, GitHub, video conferencing)',
      'Guide mentees through comprehensive SMART goal setting process',
      'Create detailed action plans with accountability measures',
      'Set clear expectations for program participation and engagement'
    ],
    resources: phase1Resources,
    discussionPoints: [
      'Share your own career journey and early challenges in tech',
      'Discuss the importance of goal setting in professional development',
      'Explore individual motivations and long-term career aspirations',
      'Address common concerns about the mentorship process',
      'Review program timeline, expectations, and available support resources'
    ],
    activities: phase1Activities,
    templates: phase1Resources.filter(r => r.type === 'template'),
    nextSteps: [
      'Ensure all mentees have completed Goal Setting Worksheets',
      'Verify technical setup for all group communication tools',
      'Schedule regular goal progress check-ins for Phase 2',
      'Share additional resources based on individual goal areas',
      'Prepare for Phase 2 foundation topics and case studies'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'phase2-kit',
    phase: 'phase2',
    title: 'Phase 2: Foundation & Exploration',
    description: 'Work on goals and explore professional topics using program-provided case studies and resources.',
    prepTime: 75,
    objectives: [
      'Apply technical problem-solving skills through real-world case studies',
      'Develop effective communication and feedback skills',
      'Explore diverse career paths and opportunities in tech',
      'Implement productivity systems using Agile methodologies',
      'Maintain accountability for individual goal progress'
    ],
    resources: phase2Resources,
    discussionPoints: [
      'Share experiences overcoming technical challenges in your career',
      'Discuss the evolution of communication skills in professional settings',
      'Explore different specializations and career tracks within tech',
      'Address work-life balance and sustainable productivity practices',
      'Review progress on individual goals and adjust strategies as needed'
    ],
    activities: phase2Activities,
    templates: phase2Resources.filter(r => r.type === 'template'),
    nextSteps: [
      'Monitor implementation of productivity systems',
      'Follow up on Career Path Reflector insights',
      'Coordinate with Jason for potential guest speakers',
      'Prepare advanced technical challenges for Phase 3',
      'Document lessons learned and successful strategies'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'phase3-kit',
    phase: 'phase3',
    title: 'Phase 3: Deep Dive & Mid-Program Review',
    description: 'Tackle advanced technical scenarios and review progress with structured support.',
    prepTime: 90,
    objectives: [
      'Master advanced problem-solving and system design thinking',
      'Build strong professional networks and online presence',
      'Conduct comprehensive mid-program assessment and adjustments',
      'Develop confidence in technical decision-making processes',
      'Strengthen peer connections and collaborative skills'
    ],
    resources: phase3Resources,
    discussionPoints: [
      'Share experiences with complex technical decisions in your career',
      'Discuss the importance of networking and relationship building',
      'Address challenges faced in the program so far',
      'Explore advanced concepts in your area of expertise',
      'Review individual progress and celebrate achievements'
    ],
    activities: phase3Activities,
    templates: phase3Resources.filter(r => r.type === 'template'),
    nextSteps: [
      'Complete mentor check-in session with Jason',
      'Monitor implementation of profile improvements',
      'Adjust program approach based on mid-program feedback',
      'Prepare for final phase transition and reflection activities',
      'Document successful strategies for future program iterations'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'phase4-kit',
    phase: 'phase4',
    title: 'Phase 4: Reflection & Future Planning',
    description: 'Reflect on achievements and plan for continued growth beyond the program.',
    prepTime: 60,
    objectives: [
      'Conduct comprehensive reflection on program achievements',
      'Celebrate individual and group progress and milestones',
      'Create sustainable plans for continued professional development',
      'Establish ongoing peer support and accountability networks',
      'Provide valuable feedback for future program improvements'
    ],
    resources: phase4Resources,
    discussionPoints: [
      'Reflect on the most impactful aspects of the mentorship experience',
      'Share observations about individual growth and development',
      'Discuss strategies for maintaining momentum after program completion',
      'Address remaining challenges and create action plans',
      'Explore opportunities for ongoing connection and collaboration'
    ],
    activities: phase4Activities,
    templates: phase4Resources.filter(r => r.type === 'template'),
    nextSteps: [
      'Complete final program surveys and feedback collection',
      'Facilitate exchange of contact information for ongoing peer support',
      'Provide individual feedback and recommendations to each mentee',
      'Submit comprehensive program feedback to Jason for future improvements',
      'Celebrate successful completion of the mentorship program'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];