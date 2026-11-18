export type CareerTopicContent = {
  overview: string;
  outcomes: string[];
  skills: string[];
  workflow: string[];
  practice: string[];
  evidence: string[];
  interview: string[];
  checklist: string[];
};

type TopicPlan = {
  overview: string;
  focus: string[];
  actions: string[];
  evidence: string[];
  questions: string[];
};

const plans: Record<string, TopicPlan> = {
  "DevOps Career Overview": {
    overview: "Understand how DevOps connects software delivery, infrastructure operations, security and reliability. This topic helps you evaluate whether the work style fits your interests before choosing a specialization.",
    focus: ["Software delivery lifecycle and team collaboration", "Automation, cloud operations and service reliability", "Differences between DevOps, platform, cloud and SRE roles"],
    actions: ["Map a sample feature from code commit through build, test, release and monitoring", "Review three real job descriptions and highlight recurring responsibilities", "Write a short career-fit reflection based on the work you enjoy"],
    evidence: ["Career comparison notes with role responsibilities", "Lifecycle diagram annotated with team ownership", "A concise personal role preference statement"],
    questions: ["What does DevOps change about the way development and operations teams work?", "Which parts of the delivery lifecycle interest you most, and why?"]
  },
  "Compare DevOps Engineering Roles": {
    overview: "Compare adjacent engineering roles by their outcomes and day-to-day ownership rather than job title alone. Companies use titles differently, so responsibilities and expectations are the reliable signals.",
    focus: ["DevOps engineer versus SRE versus platform engineer", "Cloud, release, build and infrastructure engineering responsibilities", "Shared skills and role-specific depth"],
    actions: ["Build a comparison matrix from five current job descriptions", "Mark responsibilities as build, operate, secure, enable or improve", "Choose two roles to target and list the gaps between them"],
    evidence: ["Role comparison matrix with source job descriptions", "Target-role rationale and skills gap list", "A prioritized 60-day preparation plan"],
    questions: ["How would you distinguish platform engineering from traditional DevOps?", "Why might the same title mean different work at two companies?"]
  },
  "Choose a Role Based on Your Strengths": {
    overview: "Select a realistic first or next role by matching your current strengths, interests, learning time and the responsibilities employers actually need.",
    focus: ["Strengths inventory and transferable experience", "Role requirements versus current evidence", "Choosing a focused target instead of applying indiscriminately"],
    actions: ["Rate your confidence in Linux, networking, automation, cloud and collaboration with evidence", "Select a target role and identify the five most important gaps", "Create a weekly plan with measurable practice outcomes"],
    evidence: ["Skills self-assessment with links to proof", "Target-role statement", "Prioritized gap-closure plan"],
    questions: ["How did you decide this role is right for you?", "What is your largest gap for this role and how are you closing it?"]
  },
  "Career Opportunities & Industry Trends": {
    overview: "Learn how to assess career demand without chasing every new technology. Look for recurring business problems, role responsibilities and durable engineering capabilities.",
    focus: ["Hiring signals across cloud, automation, reliability and security", "Industry and company-stage differences", "Transferable foundations versus short-lived tool trends"],
    actions: ["Compare job postings across product, consulting and enterprise companies", "Track repeated skills and distinguish must-have from nice-to-have", "Choose one durable skill area to deepen over the next quarter"],
    evidence: ["Dated job-market observation sheet", "Skill demand summary with role examples", "Quarterly learning priority and rationale"],
    questions: ["How do you decide whether a technology trend is relevant to your career?", "Which DevOps capabilities remain valuable across tool changes?"]
  },
  "DevOps Job Titles & Responsibilities": {
    overview: "Decode job titles into concrete responsibilities, ownership boundaries, collaboration patterns and expected outcomes. This prevents applying based only on a familiar title.",
    focus: ["Responsibilities, deliverables and on-call expectations", "Required versus preferred qualifications", "Team structure, reporting line and service ownership"],
    actions: ["Annotate a job description into responsibilities, skills and outcomes", "Prepare clarification questions about on-call, deployment and infrastructure ownership", "Summarize the role in five plain-language statements"],
    evidence: ["Annotated job description", "Role responsibility summary", "Questions to ask the hiring manager"],
    questions: ["Which responsibilities in this description would you own independently?", "What would you clarify before accepting this role?"]
  },
  "Fresher vs Experienced Expectations": {
    overview: "Understand how hiring expectations change with experience. Entry-level candidates are usually assessed on foundations, learning ability and honest project evidence; experienced candidates must show ownership, judgment and outcomes.",
    focus: ["Foundational knowledge and coachability for early-career roles", "Independent delivery and incident ownership at intermediate levels", "Architecture, mentoring and risk management at senior levels"],
    actions: ["Map each job requirement to an example appropriate to your experience", "Rewrite project descriptions to show your personal contribution", "Identify where you need guided practice versus independent ownership"],
    evidence: ["Experience-to-requirement mapping", "Accurate project contribution statements", "Examples showing increasing scope and responsibility"],
    questions: ["How do you demonstrate capability when you have limited industry experience?", "What evidence shows that you can own work independently?"]
  },
  "Understanding Experience Requirements": {
    overview: "Interpret years-of-experience requirements carefully. Focus on the scope, complexity and recency of work behind the number, and never misrepresent employment history or production exposure.",
    focus: ["Must-have experience versus flexible preferences", "Equivalent project, internship and transferable experience", "Evidence of complexity, ownership and recency"],
    actions: ["Separate strict eligibility requirements from preferred skills", "Map relevant experience and projects to each responsibility", "Prepare an honest explanation for any gaps"],
    evidence: ["Requirement mapping table", "Timeline of relevant work and projects", "Clear explanation of transferable experience"],
    questions: ["How do you assess a role asking for more years than you have?", "How can project work demonstrate relevant capability without claiming employment experience?"]
  },
  "What Employers Look For": {
    overview: "Employers assess more than tool familiarity. They look for reliable execution, clear communication, security awareness, problem solving, collaboration and the ability to learn from mistakes.",
    focus: ["Technical foundations and practical judgment", "Communication, ownership and teamwork", "Reliability, security and customer impact"],
    actions: ["Collect examples of a problem, your action and the result", "Practise explaining trade-offs in plain language", "Review a target employer's product, engineering context and values"],
    evidence: ["Achievement stories with measurable or verifiable outcomes", "Project README showing decisions and validation", "Examples of collaboration and learning"],
    questions: ["What makes an engineer dependable during a production issue?", "Tell me about a time you changed your approach after feedback."]
  },
  "Build a DevOps Resume": {
    overview: "Create a concise, truthful resume that makes relevant experience easy to evaluate. Prioritize role fit, evidence, readable structure and clear outcomes over decorative design or keyword stuffing.",
    focus: ["Resume structure and role-specific summary", "Relevant experience, projects and education", "ATS-readable formatting and accurate keywords"],
    actions: ["Choose a clean single-column layout and consistent dates", "Tailor the summary and top skills to one target role", "Check every claim against a project, work example or certification"],
    evidence: ["Role-targeted resume PDF", "Plain-text copy for ATS review", "Checklist confirming links, dates and claims"],
    questions: ["Walk me through the most relevant part of your resume.", "Which resume item best proves you can do this job?"]
  },
  "Write Achievement-Based Experience": {
    overview: "Turn responsibilities into achievement statements that explain the problem, your contribution, the action and the result. Use metrics only when you can substantiate them.",
    focus: ["Action verbs and individual contribution", "Context, scale, tools and outcome", "Credible metrics and qualitative impact"],
    actions: ["Rewrite task statements using situation-action-result structure", "Add scale or quality measures where records support them", "Remove inflated claims and clarify team versus personal work"],
    evidence: ["Before-and-after resume bullets", "Source notes supporting metrics", "Two concise stories ready for interview follow-up"],
    questions: ["What exactly did you contribute to this result?", "How was the improvement measured and verified?"]
  },
  "Create a Strong LinkedIn Profile": {
    overview: "Make your professional profile consistent with your resume and useful to recruiters. Communicate your target role, strongest evidence and the engineering problems you can help solve.",
    focus: ["Headline, About section and experience alignment", "Featured repositories and project links", "Professional networking and respectful outreach"],
    actions: ["Write a role-focused headline without unsupported seniority claims", "Create an About section with strengths and evidence links", "Review profile visibility, contact details and consistency"],
    evidence: ["Completed profile checklist", "Featured project links with clear descriptions", "A concise networking introduction"],
    questions: ["How does your profile communicate the role you are targeting?", "Which featured item best demonstrates your skills?"]
  },
  "Present Your Existing Projects & Portfolio": {
    overview: "Present project work as evidence of your decisions and contribution, while keeping technical project tutorials in the dedicated project and lab areas of DevMavox. This topic focuses only on how to communicate existing work to employers.",
    focus: ["Selecting relevant evidence for a target role", "Explaining personal contribution and project context", "Clear links, documentation and honest experience labels"],
    actions: ["Choose two relevant projects and write a short employer-facing summary", "State the problem, your contribution, decisions and verified result", "Check that repository links, screenshots and README files are accessible"],
    evidence: ["Curated project summaries", "Contribution and outcome statements", "Working links to existing repositories and artifacts"],
    questions: ["Which project is most relevant to this role and why?", "What did you personally design, implement or validate?"]
  },
  "Understand the Interview Process": {
    overview: "Know the typical hiring stages and prepare for the purpose of each conversation. Processes vary, so confirm the sequence and format with the recruiter rather than assuming every company follows the same pattern.",
    focus: ["Recruiter screen and role-fit discussion", "Technical, practical and scenario rounds", "Hiring manager, behavioral and final decision stages"],
    actions: ["Create a preparation checklist for each confirmed interview stage", "Ask about format, duration, tools and expected participants", "Plan time for your questions and post-interview follow-up"],
    evidence: ["Interview-stage preparation plan", "Recruiter clarification questions", "Post-interview reflection notes"],
    questions: ["How do you prepare differently for a recruiter screen and technical round?", "What would you ask to understand the interview format?"]
  },
  "Technical Round Preparation Strategy": {
    overview: "Prepare to explain technical fundamentals and engineering decisions clearly. This career topic covers how to organize preparation; detailed tool lessons and hands-on labs remain in their separate DevMavox sections.",
    focus: ["Role-aligned topic prioritization", "Clear explanations of concepts and trade-offs", "Structured revision and timed practice"],
    actions: ["Extract technical themes from the target job description", "Prepare concise explanations and examples for each theme", "Practise answering aloud and identify unclear reasoning"],
    evidence: ["Role-specific revision tracker", "A set of concise explanation notes", "Self-recorded practice and improvement notes"],
    questions: ["How do you prioritize preparation when the job description is broad?", "How do you explain a technical decision and its trade-offs?"]
  },
  "Scenario & Problem-Solving Communication": {
    overview: "Show how you reason under uncertainty. Interviewers want a safe, structured approach: clarify impact, gather evidence, form hypotheses, mitigate risk, validate recovery and communicate.",
    focus: ["Clarifying questions and impact assessment", "Evidence-led reasoning and prioritization", "Mitigation, validation and stakeholder updates"],
    actions: ["Use a consistent explain-think-act-validate structure for scenario answers", "Practise stating assumptions before proposing a solution", "Include rollback, escalation and communication in your response"],
    evidence: ["Written scenario response", "Decision tree with assumptions and validation", "Reflection on clarity and missing steps"],
    questions: ["A release causes user impact. What do you do first and why?", "How do you communicate when the root cause is not yet known?"]
  },
  "HR & Behavioral Interview Preparation": {
    overview: "Prepare honest stories that demonstrate collaboration, accountability, adaptability, conflict resolution and learning. Strong answers describe your own actions without blaming colleagues or exaggerating outcomes.",
    focus: ["Behavioral question themes and STAR structure", "Conflict, feedback, failure and ownership examples", "Motivation, communication and team fit"],
    actions: ["Prepare six STAR stories from work, study or projects", "Practise concise answers that separate your actions from the team's", "Prepare a genuine explanation of motivation and career direction"],
    evidence: ["STAR story bank", "Feedback and learning examples", "Questions about team culture and expectations"],
    questions: ["Tell me about a mistake and what you learned.", "Describe a disagreement and how you reached a constructive outcome."]
  },
  "Mock Interview Self-Evaluation": {
    overview: "Use deliberate practice to improve answer structure, accuracy, confidence and listening. Self-evaluation should identify specific changes for the next attempt, not just assign a vague score.",
    focus: ["Answer relevance and structure", "Technical accuracy and reasoning", "Clarity, timing and follow-up handling"],
    actions: ["Record a mock interview using role-specific questions", "Score answers for accuracy, structure, evidence and clarity", "Rewrite weak answers and repeat the practice after feedback"],
    evidence: ["Recording or written transcript", "Scoring rubric with improvement actions", "Updated answers showing progress"],
    questions: ["Which answer changed most after feedback?", "How do you know your explanation is clear to a non-specialist?"]
  },
  "Find Relevant DevOps Opportunities": {
    overview: "Search strategically across company career pages, reputable job boards, professional networks and referrals. Prioritize role fit, location, work model and genuine responsibilities over application volume.",
    focus: ["Reliable job-search channels and search terms", "Company, role and work-model fit", "Search routines and opportunity prioritization"],
    actions: ["Create role-specific search queries and saved searches", "Shortlist employers based on responsibilities and eligibility", "Set a sustainable weekly search and review routine"],
    evidence: ["Target-company list with reasons", "Saved search criteria", "Prioritized opportunity shortlist"],
    questions: ["How do you decide which openings deserve an application?", "Which sources do you use to verify a job posting?"]
  },
  "Read Job Descriptions & Identify Fit": {
    overview: "Evaluate a vacancy by separating core responsibilities, mandatory requirements, preferred skills, constraints and warning signs. Apply when you can credibly meet the central needs, even if you do not match every preferred item.",
    focus: ["Responsibilities versus qualification lists", "Must-have and nice-to-have requirements", "Seniority, on-call, location and employment conditions"],
    actions: ["Highlight the top five outcomes expected from the role", "Map each requirement to evidence or a learning gap", "Prepare questions for ambiguous responsibilities or conditions"],
    evidence: ["Job description fit matrix", "Application decision with rationale", "Questions for recruiter or hiring manager"],
    questions: ["Which requirements are essential for success in this role?", "How do you handle a job description containing unfamiliar preferred tools?"]
  },
  "Tailor Applications & Cover Letters": {
    overview: "Customize each application enough to show relevance without rewriting your career history. Match truthful experience to the employer's needs and keep the message concise and specific.",
    focus: ["Role-specific resume emphasis", "Concise cover letter structure", "Accurate keywords and consistent claims"],
    actions: ["Select the two strongest matching achievements for the vacancy", "Write a short opening explaining role fit and interest", "Proofread names, dates, links and required application fields"],
    evidence: ["Tailored resume version", "Role-specific cover letter", "Application checklist and submission record"],
    questions: ["Why are you interested in this company and role?", "Which experience most closely matches the position's needs?"]
  },
  "Recruiter Communication & Application Tracking": {
    overview: "Manage communication professionally and maintain an accurate record of applications, stages, commitments and follow-ups. Respect privacy and avoid repeated or overly aggressive messages.",
    focus: ["Clear recruiter messages and response etiquette", "Application status, dates and follow-up timing", "Confidentiality and personal-data care"],
    actions: ["Create a simple tracker with company, role, date and next action", "Draft concise responses for availability, status and clarification", "Schedule one polite follow-up based on the stated timeline"],
    evidence: ["Application tracker without sensitive credentials", "Reusable professional message templates", "Follow-up log"],
    questions: ["How would you follow up after a delayed response?", "What information should never be shared in an unsolicited recruiter message?"]
  },
  "Understand DevOps Compensation": {
    overview: "Understand the full compensation structure rather than focusing only on a headline salary. Pay varies by geography, company, experience, role scope and market conditions.",
    focus: ["Base pay, variable pay and equity concepts", "Benefits, allowances and working arrangements", "Reliable market comparisons and total compensation"],
    actions: ["Compare compensation ranges for similar roles and locations", "Separate guaranteed components from conditional or variable amounts", "List benefits and work conditions that matter to you"],
    evidence: ["Compensation comparison worksheet", "Questions about variable pay and benefits", "Personal priorities for evaluating an offer"],
    questions: ["How do you compare two offers with different compensation structures?", "Which parts of a compensation package require clarification?"]
  },
  "Evaluate an Offer & Benefits": {
    overview: "Review a written offer as a complete employment decision. Confirm role scope, reporting, location, compensation, benefits, probation, notice period and any conditions before accepting.",
    focus: ["Written terms and total rewards", "Role expectations, manager and growth opportunities", "Joining date, notice, probation and policy conditions"],
    actions: ["Compare the written offer against what was discussed", "Ask for unclear terms in writing before making a decision", "Evaluate non-salary factors such as support, on-call and learning"],
    evidence: ["Offer comparison table", "List of clarified terms", "Decision rationale based on priorities"],
    questions: ["What would you clarify before accepting an offer?", "How do you weigh role scope against compensation?"]
  },
  "Salary Negotiation & Offer Decisions": {
    overview: "Negotiate respectfully using role scope, relevant evidence and market context. Keep the discussion factual, understand constraints and make a decision you can support without bluffing.",
    focus: ["Preparation, target range and alternatives", "Evidence-based value discussion", "Professional negotiation and written confirmation"],
    actions: ["Define an acceptable range and priorities before the call", "Prepare two evidence-backed reasons for your request", "Review the revised written terms before confirming"],
    evidence: ["Negotiation preparation notes", "Evidence of relevant impact and capability", "Final offer decision checklist"],
    questions: ["How would you respond if the offer is below your expectations?", "What would make you accept an offer beyond salary alone?"]
  },
  "Prepare for Your First DevOps Job": {
    overview: "Prepare for a smooth transition into a new team by understanding expectations, access processes, communication norms and learning priorities. Do not make production changes before authorization and onboarding.",
    focus: ["Pre-joining communication and onboarding", "Access, security and policy awareness", "Learning the service and team ownership model"],
    actions: ["Prepare questions about onboarding, documentation and support", "Plan how to learn systems safely in read-only mode first", "Agree on initial goals with your manager"],
    evidence: ["Personal onboarding checklist", "Questions for manager and buddy", "First-week learning notes"],
    questions: ["What would you focus on during your first week?", "How do you learn an unfamiliar production environment safely?"]
  },
  "Understand Team Workflow & Ownership": {
    overview: "Learn how engineering work moves through planning, code review, release, operations and incident response. Clear ownership helps avoid missed handoffs and unsafe changes.",
    focus: ["Team responsibilities and service ownership", "Change approval, release and escalation paths", "Documentation, handovers and collaboration"],
    actions: ["Map a team's work intake-to-delivery workflow", "Identify owners for services, approvals and incident escalation", "Clarify how work is prioritized and how completion is measured"],
    evidence: ["Team workflow map", "Ownership and escalation contact notes", "Personal handover checklist"],
    questions: ["How do you handle unclear ownership during an incident?", "What information makes a handover effective?"]
  },
  "First 30-60-90 Days Plan": {
    overview: "Create a realistic onboarding plan that moves from learning and relationships to safe contributions and then independently owned improvements. Align milestones with your manager and team priorities.",
    focus: ["First 30 days: context, access and relationships", "Days 31-60: supported contributions and operational understanding", "Days 61-90: ownership, improvement and feedback"],
    actions: ["Agree on learning goals and success measures for each phase", "Schedule regular feedback and progress reviews", "Choose a small improvement only after understanding risk and ownership"],
    evidence: ["30-60-90 day plan", "Weekly learning and contribution log", "Manager feedback and agreed next steps"],
    questions: ["What would success look like after 30, 60 and 90 days?", "How would you choose a safe first improvement?"]
  },
  "Professional Communication & Collaboration": {
    overview: "Communicate technical work so teammates can make decisions and coordinate safely. Good collaboration includes concise updates, respectful disagreement, useful documentation and timely escalation.",
    focus: ["Status updates and written technical communication", "Cross-team collaboration and constructive feedback", "Escalation, handover and meeting practices"],
    actions: ["Write a short status update with impact, progress, risk and next step", "Practise explaining a technical issue to a non-specialist", "Use a decision record to document a disagreement and resolution"],
    evidence: ["Sample status and handover updates", "Decision record", "Feedback reflection and action"],
    questions: ["How do you explain a production risk to a business stakeholder?", "How do you disagree with a technical decision respectfully?"]
  },
  "Set Career Goals & Growth Milestones": {
    overview: "Turn a broad ambition into measurable career goals. Select outcomes that demonstrate increased capability and responsibility, then review progress regularly.",
    focus: ["Short-, medium- and long-term career direction", "Measurable capability and impact milestones", "Feedback, reflection and adjustment"],
    actions: ["Write one 6-month and one 2-year career outcome", "Define evidence and review dates for each milestone", "Discuss priorities with a mentor or manager"],
    evidence: ["Career development plan", "Milestone tracker", "Evidence links and review notes"],
    questions: ["How do you know your career goal is measurable?", "What would cause you to revise your development plan?"]
  },
  "Build a Promotion Case": {
    overview: "Prepare a fair promotion case by demonstrating sustained performance at the next level, broader impact, sound judgment and alignment with the organization's expectations.",
    focus: ["Level expectations and scope of responsibility", "Sustained impact and cross-team influence", "Feedback, sponsorship and promotion process"],
    actions: ["Request the written expectations for the next level", "Collect examples of impact, ownership and collaboration over time", "Review gaps with your manager and agree on milestones"],
    evidence: ["Promotion evidence document", "Impact examples and stakeholder feedback", "Agreed development milestones"],
    questions: ["What evidence shows sustained next-level performance?", "How would you respond to feedback that you are not yet ready?"]
  },
  "Develop Leadership & Mentoring Skills": {
    overview: "Grow leadership through influence, clarity and support for others, even without a formal management title. Effective technical leaders create alignment and help teams make better decisions.",
    focus: ["Mentoring and knowledge sharing", "Facilitation, delegation and decision-making", "Conflict resolution and psychological safety"],
    actions: ["Create a mentoring plan around a specific learning goal", "Facilitate a small technical discussion with clear decisions", "Ask for feedback on listening, clarity and follow-through"],
    evidence: ["Mentoring notes with agreed goals", "Meeting decisions and action log", "Feedback and leadership reflection"],
    questions: ["How do you help a teammate grow without taking over their work?", "Describe a decision where you aligned people with different views."]
  },
  "Plan a Career Transition or Specialization": {
    overview: "Plan a deliberate move into a specialization or adjacent role by reusing transferable strengths, validating the target role and closing the most important gaps with credible evidence.",
    focus: ["Transferable skills and target-role requirements", "Specialization depth versus breadth", "Transition timing, risk and learning priorities"],
    actions: ["Compare current and target role responsibilities", "Identify three transferable strengths and three material gaps", "Build a transition project or work opportunity that proves readiness"],
    evidence: ["Transition gap analysis", "Target-role evidence plan", "Updated resume narrative and milestones"],
    questions: ["Why are you moving toward this specialization?", "How will you prove readiness without overstating your experience?"]
  }
};

const commonOutcomes = [
  "Explain the topic and its relevance to a DevOps career in clear, accurate language",
  "Connect the guidance to employer expectations and a realistic workplace situation",
  "Complete the practical career task and produce evidence that can be reviewed",
  "Communicate decisions, limitations and next steps honestly in an interview"
];

const commonChecklist = [
  "I can explain the topic without relying on memorized buzzwords",
  "I have completed the practical career task and reviewed the result",
  "My examples accurately distinguish personal work, team work and practice labs",
  "I have saved relevant evidence and identified one next improvement"
];

export function getCareerTopicContent(topic: string): CareerTopicContent {
  const plan = plans[topic];
  if (!plan) {
    return {
      overview: "This topic is part of the DevOps Career Center. Its dedicated content is being prepared; use the category navigation to explore related career guidance.",
      outcomes: commonOutcomes,
      skills: [],
      workflow: [],
      practice: [],
      evidence: [],
      interview: [],
      checklist: commonChecklist,
    };
  }

  return {
    overview: plan.overview,
    outcomes: commonOutcomes,
    skills: plan.focus,
    workflow: [
      "Clarify the career objective, target role and constraints before taking action",
      "Gather evidence from job descriptions, trusted company information or your own experience",
      "Apply the topic guidance and record the decision, action and outcome",
      "Review the result, request feedback where appropriate and define the next step"
    ],
    practice: plan.actions,
    evidence: plan.evidence,
    interview: plan.questions,
    checklist: commonChecklist,
  };
}
