import { MentorKit } from '@/types';

export const mentorKits: MentorKit[] = [
  {
    id: 'phase1-kit',
    phase: 'phase1',
    title: 'Launch & Goal Setting',
    description: 'Establish rapport, introduce the program structure and tools, and define mentee goals using provided frameworks',
    prepTime: 90,
    objectives: [
      'Build rapport and trust within the mentoring group',
      'Introduce the program structure, tools, and expectations',
      'Define mentee goals using SMART framework',
      'Set up group norms and communication preferences',
      'Create action plans for goal achievement'
    ],
    discussionPoints: [
      'What do you hope to get out of this mentorship experience? (for mentees)',
      'What are your initial thoughts on the program\'s structure?',
      'What video conferencing tool does the group prefer to use?',
      'What are your current career goals and how do you plan to achieve them?',
      'What challenges do you anticipate in your professional journey?'
    ],
    activities: [
      {
        id: 'welcome-onboarding',
        title: 'Welcome & Onboarding Guide',
        description: 'Comprehensive onboarding session to establish group foundation',
        type: 'Onboarding',
        duration: 90,
        instructions: [
          'Facilitate introductions using structured format with brief overview of Phase 1 goals',
          'Review Week 1 activities checklist (Tool Onboarding, Program Review, Cadence & Expectations)',
          'Share tips for facilitating initial introductions and building rapport',
          'Provide access to Torc Mentorship Program Terms and Code of Conduct',
          'Set up Discord channel access and pre-configured private GitHub Repository'
        ],
        expectedOutcomes: [
          'Group rapport established and trust building initiated',
          'Technical tools configured and tested successfully',
          'Clear understanding of program expectations and structure',
          'Meeting schedule and communication preferences confirmed'
        ],
        materials: ['Program Overview', 'Tool Access Guide', 'Group Norms Checklist']
      },
      {
        id: 'goal-setting-workshop',
        title: 'Goal Setting Workshop',
        description: 'Step-by-step workshop for comprehensive SMART goal development',
        type: 'Workshop',
        duration: 120,
        instructions: [
          'Provide step-by-step agenda for the Goal Setting Workshop',
          'Use talking points for introducing SMART goals with clear examples',
          'Apply guidance on handling common challenges (vague goals, overly ambitious goals)',
          'Work through examples of well-defined tech career goals applying SMART framework',
          'Create action plans with specific next steps and accountability measures'
        ],
        expectedOutcomes: [
          'Each mentee has 2-3 well-defined SMART goals',
          'Detailed action plans with specific, measurable steps',
          'Understanding of effective goal-setting best practices',
          'Established accountability framework and check-in schedules'
        ],
        materials: ['SMART Goal Guide', 'Goal Setting Worksheet', 'Action Plan Template']
      }
    ],
    resources: [
      {
        id: 'smart-goal-guide',
        title: 'SMART Goal Guide (PDF/Google Doc)',
        type: 'Guide',
        estimatedReadTime: 15,
        url: '/resources/smart-goal-guide.pdf'
      },
      {
        id: 'program-terms',
        title: 'Torc Mentorship Program Terms and Code of Conduct',
        type: 'Document',
        estimatedReadTime: 10,
        url: '/resources/program-terms.pdf'
      },
      {
        id: 'tool-setup-guide',
        title: 'Tool Setup and Access Guide',
        type: 'Guide',
        estimatedReadTime: 12,
        url: '/resources/tool-setup-guide.pdf'
      }
    ],
    templates: [
      {
        id: 'goal-worksheet',
        title: 'Mentee Goal Setting Worksheet (Fillable PDF/Google Doc)',
        description: 'Sections for drafting preliminary goals with SMART criteria prompts',
        type: 'Worksheet',
        downloadUrl: '/templates/goal-setting-worksheet.pdf'
      },
      {
        id: 'action-plan-template',
        title: 'Action Plan Template (Google Doc/Markdown)',
        description: 'Simple template with columns for Task, Due Date, Responsible Person, Status',
        type: 'Template',
        downloadUrl: '/templates/action-plan-template.md'
      }
    ],
    nextSteps: [
      'Ensure all mentees complete Goal Setting Worksheets',
      'Verify technical setup for all group communication tools',
      'Schedule regular goal progress check-ins for Phase 2',
      'Share additional resources based on individual goal areas'
    ]
  },
  {
    id: 'phase2-kit',
    phase: 'phase2',
    title: 'Foundation & Exploration',
    description: 'Work on goals and explore professional topics using program-provided case studies and resources',
    prepTime: 120,
    objectives: [
      'Apply technical problem-solving skills to real-world scenarios',
      'Develop effective communication and feedback skills in tech environments',
      'Explore career navigation strategies and opportunities',
      'Learn productivity and agile practices for professional development',
      'Make measurable progress on personal goals established in Phase 1'
    ],
    discussionPoints: [
      'Share experiences overcoming technical challenges in your career',
      'Discuss the evolution of communication skills in professional settings',
      'Explore different specializations and career tracks within tech',
      'Address work-life balance and sustainable productivity practices',
      'Review progress on individual goals and adjust strategies as needed'
    ],
    activities: [
      {
        id: 'strengths-roadblocks',
        title: 'Developing Strengths & Overcoming Roadblocks',
        description: 'Technical case study discussion with real-world problem analysis',
        type: 'Case Study',
        duration: 90,
        instructions: [
          'Present the technical case study - anonymized real-world technical problem',
          'Use case study facilitator guide with discussion points to analyze the problem',
          'Encourage brainstorming of potential solutions using provided prompts',
          'Guide questions to identify roadblocks and discuss strategies for overcoming them',
          'Review solution guide - high-level overview of potential solutions after discussion'
        ],
        expectedOutcomes: [
          'Enhanced analytical thinking and problem-solving approach',
          'Experience with collaborative technical problem-solving',
          'Understanding of common roadblocks and mitigation strategies',
          'Improved ability to break down complex technical challenges'
        ],
        materials: ['Technical Case Study', 'Solution Guide', 'Goal Progress Reporting Template']
      },
      {
        id: 'communication-feedback',
        title: 'Effective Communication & Feedback in Tech',
        description: 'Interactive workshop on professional communication skills',
        type: 'Workshop',
        duration: 105,
        instructions: [
          'Use discussion slide outline covering active listening and clear technical communication',
          'Cover feedback topics: giving constructive feedback, receiving feedback, agile team feedback loops',
          'Include prompts for mentor to share personal anecdotes',
          'Facilitate role-playing scenarios (explaining bugs to non-technical stakeholders, peer code feedback)',
          'Provide links to 2-3 high-quality external articles on professional communication'
        ],
        expectedOutcomes: [
          'Improved technical communication confidence and skills',
          'Practical experience giving and receiving constructive feedback',
          'Understanding of professional communication norms and best practices',
          'Enhanced interpersonal skills for collaborative work environments'
        ],
        materials: ['Discussion Slides', 'Role-Playing Scenarios', 'Communication Resources']
      },
      {
        id: 'career-paths',
        title: 'Navigating Career Paths & Opportunities',
        description: 'Career journey exploration and opportunity identification session',
        type: 'Discussion',
        duration: 90,
        instructions: [
          'Use discussion prompts to structure sharing mentor\'s career journey and pivotal decisions',
          'Guide mentees through Career Path Reflector worksheet for skills/interests reflection',
          'Facilitate discussion on identifying desired roles, industries, and growth areas',
          'Use guest speaker facilitation guide if guest speaker is invited',
          'Help create career development action plans based on reflections'
        ],
        expectedOutcomes: [
          'Broader understanding of available career possibilities in tech',
          'Better self-awareness of personal skills, interests, and values',
          'Clearer individual career direction and next steps',
          'Network expansion opportunities through guest speakers'
        ],
        materials: ['Career Journey Prompts', 'Career Path Reflector Worksheet', 'Guest Speaker Guide']
      },
      {
        id: 'productivity-agile',
        title: 'Productivity & Agile Practices',
        description: 'Introduction to productivity techniques and agile methodologies',
        type: 'Workshop',
        duration: 90,
        instructions: [
          'Lead discussion on time management techniques (Pomodoro, time blocking) and prioritization',
          'Introduce core Agile principles (transparency, iteration, adaptation)',
          'Explain how Agile is applied in real-world tech teams',
          'Provide step-by-step instructions on setting up GitHub Projects board',
          'Practice using basic sprint-like workflows (To Do, In Progress, Done columns)'
        ],
        expectedOutcomes: [
          'Improved personal productivity systems and time management',
          'Understanding of Agile methodologies and their practical application',
          'Proficiency with GitHub Projects for personal goal tracking',
          'Functional group project management setup for collaborative tasks'
        ],
        materials: ['Productivity Guide', 'Agile Principles Overview', 'GitHub Projects Tutorial']
      }
    ],
    resources: [
      {
        id: 'technical-case-studies',
        title: 'Program-Provided Technical Challenge Collection',
        type: 'Case Study',
        estimatedReadTime: 30,
        url: '/resources/technical-challenges.pdf'
      },
      {
        id: 'communication-articles',
        title: 'Curated Communication & Feedback Articles',
        type: 'Article Collection',
        estimatedReadTime: 25,
        url: '/resources/communication-articles.pdf'
      },
      {
        id: 'agile-productivity-resources',
        title: 'Productivity & Agile Practices Resource Library',
        type: 'Resource Collection',
        estimatedReadTime: 20,
        url: '/resources/agile-productivity.pdf'
      }
    ],
    templates: [
      {
        id: 'progress-report-template',
        title: 'Goal Progress Reporting Template',
        description: 'Simple prompts for mentees to report progress since Phase 1',
        type: 'Template',
        downloadUrl: '/templates/progress-report.pdf'
      },
      {
        id: 'career-reflector-worksheet',
        title: 'Career Path Reflector Worksheet (Fillable PDF/Google Doc)',
        description: 'Prompts for reflecting on skills, interests, values, and potential career paths',
        type: 'Worksheet',
        downloadUrl: '/templates/career-path-reflector.pdf'
      }
    ],
    nextSteps: [
      'Monitor implementation of productivity systems learned',
      'Follow up on Career Path Reflector insights and action plans',
      'Coordinate with Jason for potential guest speakers',
      'Prepare advanced technical challenges for Phase 3'
    ]
  },
  {
    id: 'phase3-kit',
    phase: 'phase3',
    title: 'Deep Dive & Mid-Program Review',
    description: 'Tackle advanced technical scenarios and review progress with structured support',
    prepTime: 135,
    objectives: [
      'Master advanced problem-solving and technical decision-making skills',
      'Build strong professional networks and optimize online presence',
      'Conduct comprehensive mid-program progress assessment',
      'Develop confidence in complex technical scenarios',
      'Strengthen collaborative and system design thinking abilities'
    ],
    discussionPoints: [
      'Share experiences with complex technical decisions and architectural choices',
      'Discuss the importance of networking and professional relationship building',
      'Address challenges and breakthroughs experienced in the program so far',
      'Explore advanced concepts and emerging trends in your area of expertise',
      'Review individual progress and celebrate significant achievements'
    ],
    activities: [
      {
        id: 'advanced-problem-solving',
        title: 'Advanced Problem-Solving & Technical Decision Making',
        description: 'Complex system design challenge with collaborative whiteboarding',
        type: 'Technical Challenge',
        duration: 120,
        instructions: [
          'Present complex technical challenge - anonymized system design problem',
          'Use whiteboarding session facilitator guide for collaborative solution development',
          'Encourage different approaches and facilitate trade-off discussions',
          'Guide conversation without revealing solution too early using provided steering techniques',
          'Review detailed solution guide covering architectural patterns for scalability, reliability, cost'
        ],
        expectedOutcomes: [
          'Enhanced system design thinking and architectural decision-making',
          'Improved technical communication and collaborative problem-solving',
          'Understanding of complex technical trade-offs and system considerations',
          'Confidence in tackling large-scale technical challenges'
        ],
        materials: ['System Design Challenge', 'Whiteboarding Guide', 'Detailed Solution Guide']
      },
      {
        id: 'networking-presence',
        title: 'Building Your Professional Network & Online Presence',
        description: 'Comprehensive workshop on networking strategies and personal branding',
        type: 'Workshop',
        duration: 90,
        instructions: [
          'Lead discussion on networking importance (online and offline strategies)',
          'Cover professional brand building (LinkedIn, GitHub, personal website optimization)',
          'Share tips for effective online engagement (commenting, open source contributions)',
          'Use Technical Profile Checklist for LinkedIn/GitHub optimization review',
          'Facilitate peer review sessions within the group for profile improvements'
        ],
        expectedOutcomes: [
          'Significantly improved and optimized professional profiles',
          'Confidence and practical skills in networking situations',
          'Actionable networking strategy and personal brand development plan',
          'Enhanced online professional presence and engagement'
        ],
        materials: ['Networking Strategies Guide', 'Technical Profile Checklist', 'Brand Building Resources']
      },
      {
        id: 'mid-program-review',
        title: 'Mid-Program Review & Strategic Assessment',
        description: 'Comprehensive progress review and program optimization session',
        type: 'Review Session',
        duration: 90,
        instructions: [
          'Review mid-program survey results and feedback collected by Jason',
          'Facilitate open forum discussion on progress, challenges, and program effectiveness',
          'Guide comprehensive goal review and strategic adjustment process',
          'Address any program concerns, suggestions, and improvement opportunities',
          'Prepare detailed feedback for mentor check-in session with Jason'
        ],
        expectedOutcomes: [
          'Clear, comprehensive assessment of program effectiveness and individual progress',
          'Strategically adjusted goals and refined expectations for remaining program',
          'Improved mentor-mentee alignment and program optimization',
          'Valuable feedback for program enhancement and future iterations'
        ],
        materials: ['Program Assessment Framework', 'Goal Review Template', 'Feedback Collection Tools']
      }
    ],
    resources: [
      {
        id: 'system-design-challenges',
        title: 'Advanced System Design Challenge Collection',
        type: 'Technical Challenge',
        estimatedReadTime: 45,
        url: '/resources/advanced-system-design.pdf'
      },
      {
        id: 'networking-strategies',
        title: 'Professional Networking & Online Presence Comprehensive Guide',
        type: 'Guide',
        estimatedReadTime: 30,
        url: '/resources/networking-guide.pdf'
      },
      {
        id: 'mid-program-assessment',
        title: 'Mid-Program Review Framework and Tools',
        type: 'Assessment Tools',
        estimatedReadTime: 25,
        url: '/resources/mid-program-review.pdf'
      }
    ],
    templates: [
      {
        id: 'profile-checklist',
        title: 'Technical Profile Checklist (Fillable PDF/Google Doc)',
        description: 'Comprehensive checklist for LinkedIn and GitHub profile optimization',
        type: 'Checklist',
        downloadUrl: '/templates/profile-checklist.pdf'
      },
      {
        id: 'mid-program-template',
        title: 'Mid-Program Assessment Template',
        description: 'Structured template for comprehensive progress review and goal adjustment',
        type: 'Assessment',
        downloadUrl: '/templates/mid-program-assessment.pdf'
      }
    ],
    nextSteps: [
      'Complete comprehensive mentor check-in session with Jason',
      'Monitor implementation of profile improvements and networking activities',
      'Adjust program approach based on detailed mid-program feedback',
      'Prepare for final phase transition and comprehensive reflection activities'
    ]
  },
  {
    id: 'phase4-kit',
    phase: 'phase4',
    title: 'Reflection & Future Planning',
    description: 'Reflect on achievements and plan for continued growth beyond the program',
    prepTime: 75,
    objectives: [
      'Conduct comprehensive reflection on program achievements and personal growth',
      'Celebrate individual and group progress, milestones, and breakthrough moments',
      'Develop structured plans for continued professional development post-program',
      'Establish sustainable post-program peer support networks and accountability systems',
      'Set strategic new goals for future career growth and skill development'
    ],
    discussionPoints: [
      'What was your biggest learning or "aha!" moment during the program?',
      'Which of your initial goals did you make significant progress on, and how?',
      'What was the most challenging aspect, and how did you overcome it?',
      'What is one piece of advice you would give to future mentees?',
      'How will you continue your development journey after program completion?'
    ],
    activities: [
      {
        id: 'celebration-reflection',
        title: 'Celebrating Progress & Lessons Learned',
        description: 'Comprehensive reflection session with structured achievement celebration',
        type: 'Reflection',
        duration: 120,
        instructions: [
          'Use reflection prompts to guide mentees through structured reflection process',
          'Facilitate sharing of biggest learnings, "aha!" moments, and breakthrough experiences',
          'Use mentor\'s insights guide to share observations on group growth and individual achievements',
          'Celebrate significant progress on initial goals and overcome challenges',
          'Document valuable lessons learned and insights for future mentee cohorts'
        ],
        expectedOutcomes: [
          'Clear recognition and celebration of significant growth and achievements',
          'Articulated key learnings and insights from the comprehensive program experience',
          'Increased confidence, motivation, and sense of professional accomplishment',
          'Valuable documented insights and advice for future program participants'
        ],
        materials: ['Reflection Prompts', 'Mentor Insights Guide', 'Achievement Documentation']
      },
      {
        id: 'future-planning',
        title: 'Continuous Development Planning Workshop',
        description: 'Strategic planning session for sustained post-program growth',
        type: 'Planning',
        duration: 90,
        instructions: [
          'Guide creation of new short-term and long-term development goals using lessons learned',
          'Help identify specific resources, strategies, and learning opportunities for continued growth',
          'Establish accountability methods and support networks for post-program development',
          'Use Continuous Development Plan template for structured future planning',
          'Create specific action plans with timelines for immediate post-program implementation'
        ],
        expectedOutcomes: [
          'Comprehensive, actionable post-program development plan with clear goals',
          'Defined new learning objectives and professional growth targets',
          'Established accountability systems and ongoing support network structure',
          'Strategic approach to continued skill development and career advancement'
        ],
        materials: ['Continuous Development Plan Template', 'Resource Planning Guide', 'Accountability Framework']
      }
    ],
    resources: [
      {
        id: 'reflection-framework',
        title: 'Structured Reflection Framework for Professional Growth',
        type: 'Framework',
        estimatedReadTime: 15,
        url: '/resources/reflection-framework.pdf'
      },
      {
        id: 'continuous-learning',
        title: 'Continuous Learning and Development in Tech Careers',
        type: 'Guide',
        estimatedReadTime: 25,
        url: '/resources/continuous-learning.pdf'
      },
      {
        id: 'network-maintenance',
        title: 'Maintaining Professional Relationships and Networks',
        type: 'Guide',
        estimatedReadTime: 18,
        url: '/resources/network-maintenance.pdf'
      }
    ],
    templates: [
      {
        id: 'development-plan-template',
        title: 'Continuous Development Plan Template (Fillable PDF/Google Doc)',
        description: 'Comprehensive template for defining ongoing development strategy with accountability',
        type: 'Template',
        downloadUrl: '/templates/continuous-development-plan.pdf'
      },
      {
        id: 'reflection-template',
        title: 'Program Reflection and Insights Template',
        description: 'Structured format for capturing key takeaways, lessons learned, and future advice',
        type: 'Template',
        downloadUrl: '/templates/reflection-insights.pdf'
      }
    ],
    nextSteps: [
      'Implement structured continuous development plan with defined timelines',
      'Maintain active connections with mentor and peer group members',
      'Begin focused work on new post-program goals and skill development areas',
      'Continue contributing to tech community and supporting future mentees'
    ]
  }
];