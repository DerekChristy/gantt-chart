export enum Stages {
  Scoping = 'Scoping',
  Launched = 'Launched',
  Testing = 'Testing',
  Implementation = 'Implementation',
  NotStarted = 'Not started',
  Design = 'Design',
}

export const STAGES = [
  Stages.Design,
  Stages.Launched,
  Stages.Testing,
  Stages.Implementation,
  Stages.NotStarted,
  Stages.Scoping
]

export const PROJECTS_DATA = [
  {
    id: 1,
    project: 'Sports category on Netflix',
    priority: 'P0',
    stage: Stages.Scoping,
    progress: '10%',
    status: 'At risk',
    labels: ['revenue;', 'board', 'meeting;', 'TV;', 'mobile'],
    openRisks: 3,
    startDate: '11-1-2023',
    launchDate: '2-27-2024',
    owner: 'Prod1',
    participants: ['Eng1', 'Eng4', 'D1']
  },
  {
    id: 2,
    project: 'Public landing page',
    priority: 'P0',
    stage: Stages.Launched,
    progress: '100%',
    status: 'At risk',
    labels: ['mobile', 'users'],
    openRisks: 3,
    startDate: '9-4-2023',
    launchDate: '10-16-2023',
    owner: 'Prod1',
    participants: ['Eng1', 'Eng4', 'D1']
  },
  {
    id: 3,
    project: 'Search Box',
    priority: 'P0',
    stage: Stages.Testing,
    progress: '80%',
    status: 'On track',
    labels: ['desktop', 'mobile', 'users'],
    openRisks: 0,
    startDate: '10-9-2023',
    launchDate: '1-9-2024',
    owner: 'Prod1',
    participants: ['Eng2', 'Eng3', 'M1']
  },
  {
    id: 4,
    project: 'Search suggestions',
    priority: 'P1',
    stage: Stages.Implementation,
    progress: '60%',
    status: 'On track',
    labels: ['users', 'mobile', 'desktop'],
    openRisks: 3,
    startDate: '2-4-2023',
    launchDate: '10-16-2023',
    owner: 'Prod1',
    participants: ['Eng2', 'Eng3', 'M1']
  },
  {
    id: 5,
    project: 'Checkout page',
    priority: 'P0',
    stage: Stages.Implementation,
    progress: '40%',
    status: 'On Track',
    labels: ['users', 'mobile'],
    openRisks: 3,
    startDate: '11-6-2023',
    launchDate: '1-2-2024',
    owner: 'Prod2',
    participants: ['Eng3', 'Eng5', 'M2']
  },
  {
    id: 6,
    project: 'Payment gateway',
    priority: 'P0',
    stage: Stages.Design,
    progress: '20%',
    status: 'At risk',
    labels: ['users', 'desktop', 'board meeting', 'mobile'],
    openRisks: 3,
    startDate: '11-13-2023',
    launchDate: '1-8-2024',
    owner: 'Prod2',
    participants: ['Eng4', 'Eng5', 'Eng6']
  },
  {
    id: 7,
    project: 'Catalog sorting',
    priority: 'P1',
    stage: Stages.Implementation,
    progress: '50%',
    status: 'At risk',
    labels: ['desktop', 'AI', 'mobile'],
    openRisks: 0,
    startDate: '11-6-2023',
    launchDate: '11-30-2023',
    owner: 'Prod2',
    participants: ['Eng4', 'Eng5', 'Eng6']
  },
  {
    id: 8,
    project: 'Advanced catalog sorting',
    priority: 'P2',
    stage: Stages.NotStarted,
    progress: '0%',
    status: 'On track',
    labels: ['desktop', 'AI', 'mobile'],
    openRisks: 0,
    startDate: '11-1-2023',
    launchDate: '12-12-2023',
    owner: 'Prod2',
    participants: ['Eng4', 'Eng5', 'Eng6', 'M1']
  }

  // 	P0	Launched	100%	At risk	mobile; users	3	9-4-2023	10-16-2023	Prod1	Eng1; Eng 4; D1
  // Search box	P0	Testing	80%	On track	mobile; desktop; users	0	10-9-2023	1-9-2024	Prod1	Eng2; Eng3; M1
  // Search suggestions 	P1	Implementation	60%	On track	mobile; desktop; users	0	10-16-2023	1-16-2024	Prod1	Eng2; Eng3; M1
  // Checkout page	P0	Implementation	40%	On track	mobile; desktop; users; board meeting	2	11-6-2023	1-2-2024	Prod2	Eng3; Eng5; M2		Payment gateway
  // Payment gateway	P0	Design	20%	At risk	mobile; desktop; users; board meeting	1	11-13-2023	1-8-2024	Prod2	Eng4; Eng5; Eng6	Checkout page
  // Catalog sorting	P1	Implementation	50%	At risk	AI; mobile; desktop	0	11-6-2023	11-30-2023	Prod2	Eng4; Eng5; Eng6		Advanced catalog sorting
  // Advanced catalog sorting	P2	Not started	0%	On track	AI; mobile; desktop	0	11-1-2023	12-12-2023	Prod2	Eng4; Eng5; Eng6; M1	Catalog sorting
]

export const TEAMS = []

export const TEAM_MEMBERS = [
  'Eng1',
  'Eng2',
  'Eng3',
  'Eng4',
  'Eng5',
  'Eng6',
  'Prod1',
  'Prod2',
  'D1',
  'D2',
  'M1',
  'M2'
]

export const PROJECTS_DISTRIBUTION = [
  {
    name: 'Eng1',
    value: 2
  },
  {
    name: 'Eng2',
    value: 2
  },
  {
    name: 'Eng3',
    value: 3
  },
  {
    name: 'Eng4',
    value: 3
  },
  {
    name: 'Eng5',
    value: 4
  },
  {
    name: 'Eng6',
    value: 3
  },
  {
    name: 'Prod1',
    value: 4
  },
  {
    name: 'Prod2',
    value: 4
  },
  {
    name: 'D1',
    value: 2
  },
  {
    name: 'D2',
    value: 0
  },
  {
    name: 'M1',
    value: 3
  },
  {
    name: 'M2',
    value: 1
  }
]
